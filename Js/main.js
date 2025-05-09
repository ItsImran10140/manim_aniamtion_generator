import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import express from "express";
import cors from "cors";
import { BASE_PROMPT, getSystemPrompt } from "./manim_prompt.js";
import fs from "fs/promises";
import path from "path";
import { spawn } from "child_process";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.G_API });

async function generateManimVideo() {
    return new Promise((resolve, reject) => {
        const pythonPath = process.platform === 'win32'
            ? path.join('python_env', 'Scripts', 'python')
            : path.join('python_env', 'bin', 'python');

        const manimProcess = spawn(pythonPath, [
            '-m', 'manim',
            '-ql',  // Medium quality
            path.join('python_scripts', 'text_manim.py'),
            'CreateCircle',
            // Output file
        ]);

        let output = '';

        manimProcess.stdout.on('data', (data) => {
            output += data.toString();
            console.log(`MANIM: ${data}`);
        });

        manimProcess.stderr.on('data', (data) => {
            console.error(`ERROR: ${data}`);
        });

        manimProcess.on('close', (code) => {
            if (code === 0) {
                const match = output.match(/File ready at (.*\.mp4)/);
                resolve(match ? match[1] : 'Video generated (path not found)');
            } else {
                reject(`Manim process exited with code ${code}`);
            }
        });
    });
}

app.post("/api/chat", async (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const prompt = req.body.prompt;
    let generatedCode = "";
    console.log(prompt);
    const chat = ai.chats.create({
        model: "gemini-2.0-flash",
        history: [
            {
                role: "user",
                parts: [{ text: BASE_PROMPT }],
            },
            {
                role: "model",
                parts: [
                    {
                        text: "Give me only the main executable code of manim and without any error.",
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
        generatedCode += chunk.text;
        res.write(chunkText);
        console.log(chunkText);
    }

    const cleanedCode = generatedCode
        .replace(/^```\s*python\s*\n?/gm, "")  // Remove starting markers
        .replace(/```\s*$/gm, "")              // Remove ending markers
        .trim();

    const filePath = path.join(process.cwd(), "python_scripts", "text_manim.py");
    await fs.writeFile(filePath, cleanedCode + "\n");
    console.log("Code written to:", filePath);

    // Run the animation
    generateManimVideo()
        .then(videoPath => console.log('Video generated at:', videoPath))
        .catch(err => console.error('Error:', err));

    res.end()
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
