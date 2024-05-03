import OpenAI from "openai";

export const firstMessage = async (text: string) => {

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const gptResponse = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a friendly assistant that helps to summarize articles. your responses must be with MD (markdown)."
      },
      {role: "user", content: text}
    ],
    model: "gpt-3.5-turbo",
  });

  return gptResponse.choices[0].message.content;
};

export const nextMessageIA = async (text: string, chat: {
  role: "system" | "user" | "assistant",
  content: string
}[]) => {

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const gptResponse = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a friendly assistant that helps to summarize articles and response questions about it, your responses must be with MD (markdown)."
      },
      ...chat,
      {role: "user", content: text}
    ],
    model: "gpt-3.5-turbo",
  });

  return gptResponse.choices[0].message.content;
}
