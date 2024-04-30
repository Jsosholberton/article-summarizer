import OpenAI from "openai";

export const firstMessage = async (text: string) => {

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const gptResponse = await client.chat.completions.create({
    messages: [
      {role: "system", content: "You are a friendly assistant that helps to summarize articles."},
      {role: "user", content: text}
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(gptResponse.choices[0]);

  return gptResponse.choices[0].message.content;
};
