import {Request, Response} from "express";
import {getArticle} from "../helpers/parseArticle";
import {getUser} from "../middleware/getUser";
import Chat from "../models/Chat";
import {firstMessage} from "../services/OpenAI";

export const getSummary = async (req: Request, res: Response) => {
  // 1. Get the URL from the request body
  const {url} = req.body;

  const auth = req.headers.authorization.split(" ")[1];

  if (!auth) return res.status(401).json({error: "Unauthorized"});

  const user = await getUser(auth);

  if (!user) return res.status(404).json({msg: "User not found"});

  // Check if the URL is provided
  if (!url) return res.status(400).json({error: "URL is required"});

  // 2. Get the article from the url and parse the html content
  const article = await getArticle(url);

  // Check if the article is fetched
  if (!article) return res.status(400).json({error: "Failed to fetch the article"});

  // Check the length of the article
  if (article.length < 100) return res.status(400).json({error: "Article is too short"});

  // 3. process the article with OPENAI API and get the summary
  const summary = await firstMessage(article);

  // 4. Save the chat to the database
  const chat = new Chat({
    user: user._id,
    messages: [
      {message: url, role: "user"},
      {message: summary, role: "system"}
    ],
    title: `Summary of ${url}`
  });

  await chat.save();

  // 4. Return the summary
  return res.status(200).json(chat);
}

export const getAllChats = async (req: Request, res: Response) => {

  const token = req.headers.authorization.split(" ")[1];
  const user = await getUser(token);

  if (!user) return res.status(404).json({msg: "User not found"});

  const chats = await Chat.find({user: user._id}).select("-user -messages -__v");

  return res.status(200).json({chats});

}

export const getChat = async (req: Request, res: Response) => {
  // 1. Get the chat id from the request params
  const {id} = req.params;

  // 2. Get the chat from the database
  const chat = await Chat.findById(id);

  // Check if the chat is found
  if (!chat) return res.status(404).json({msg: "Chat not found"});

  // 3. Return the chat
  return res.status(200).json({chat});
}