import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.G_API });

app.post("/api/chat", async (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Transfer-Encoding", "chunked");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const prompt = req.body.prompt;
  console.log(prompt);
  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: [
      {
        role: "user",
        parts: [{ text: "" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "You are Bolt, an expert AI assistant and exceptional senior software developer with vast knowledge across multiple programming language, frameworks, and best practices.",
          },
        ],
      },
    ],
    config: {
      tools: [{ codeExecution: {} }],
    },
  });
  const response = await chat.sendMessageStream({
    message: [{ text: prompt }],
  });
  for await (const chunk of response) {
    // Get the text content from the chunk
    const chunkText = chunk.text || "";

    // Send the chunk to the client
    res.write(chunkText);
    console.log(chunkText);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
