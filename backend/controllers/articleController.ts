import {Request, Response} from "express";
import {getArticle} from "../helpers/parseArticle";
import {getUser} from "../middleware/getUser";
import Chat from "../models/Chat";
import {firstMessage, nextMessageIA} from "../services/OpenAI";

export const getSummary = async (req: Request, res: Response) => {
  // 1. Get the URL from the request body
  const {url} = req.body;

  const auth = req.headers.authorization.split(" ")[1];

  if (!auth) return res.status(401).json({error: "Unauthorized"});

  const user = await getUser(auth);

  if (!user) return res.status(404).json({error: "User not found"});

  // Check if the URL is provided
  if (!url) return res.status(400).json({error: "URL is required"});

  // 2. Get the article from the url and parse the html content
  const article = await getArticle(url);

  // Check if the article is fetched and parsed
  if (!article) return res.status(400).json({error: "Failed to parse the article, try with another link"});

  // Check the length of the article
  if (article.body.length < 100) return res.status(400).json({error: "Article is too short"});

  // 3. process the article with OPENAI API and get the summary reduced to 50000 characters max
  const summary = await firstMessage(article.body.slice(0, 50000));

  if (!summary) return res.status(500).json({error: "Failed to summarize the article, error with the AI model"});

  // 4. Save the chats to the database
  const chat = new Chat({
    user: user._id,
    messages: [
      {content: url, role: "user"},
      {content: summary, role: "assistant"}
    ],
    title: article.title ?? article.body.slice(0, 20),
  });

  await chat.save();

  // 4. Return the summary
  return res.status(200).json(chat);
}

export const getAllChats = async (req: Request, res: Response) => {

  const token = req.headers.authorization.split(" ")[1];
  const user = await getUser(token);

  if (!user) return res.status(404).json({error: "User not found"});

  const chats = await Chat.find({
    user: user._id,
  }).select("-user -messages -__v").sort({createdAt: -1});

  return res.status(200).json({chats});

}

export const getChat = async (req: Request, res: Response) => {
  // 1. Get the chats id from the request params
  const {id} = req.params;

  const token = req.headers.authorization.split(" ")[1];

  const user = await getUser(token);

  // 2. Get the chats from the database
  const chat = await Chat.findOne({_id: id, user: user._id});

  // Check if the chats is found
  if (!chat) return res.status(404).json({error: "Chat not found"});

  // 3. Return the chats
  return res.status(200).json({chat});
}

export const nextMessage = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {message} = req.body;

  const chat = await Chat.findById(id).select("-messages._id");


  interface ChatMessage {
    content: string,
    role: "system" | "user" | "assistant"
  }

  if (!chat) return res.status(404).json({error: "Chat not found"});

  const initialMsg = chat.messages[1] as ChatMessage;

  const reducedChat = chat.messages.length > 4
    ? [initialMsg, ...chat.messages.slice(-3)] as ChatMessage[]
    : chat.messages as ChatMessage[]

  const response = await nextMessageIA(message, reducedChat);

  chat.messages.push({content: message, role: "user"});
  chat.messages.push({content: response, role: "assistant"});

  await chat.save();

  res.status(200).json({chat: {content: response, role: "assistant"}});
}

export const deleteChat = async (req: Request, res: Response) => {
  const {id} = req.params;

  const chat = await Chat.findByIdAndDelete(id);

  if (!chat) return res.status(404).json({error: "Chat not found"});

  return res.status(200).json({msg: "Chat deleted"});
}

export const archiveChat = async (req: Request, res: Response) => {
  const {id} = req.params;

  const chat = await Chat.findById(id);

  if (!chat) return res.status(404).json({error: "Chat not found"});

  chat.hasArchive = !chat.hasArchive;

  await chat.save();

  return res.status(200).json({msg: "Chat archived"});
}
