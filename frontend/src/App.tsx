/* eslint-disable @typescript-eslint/no-unused-vars */
// File: src/App.jsx
import { useState, useRef, useEffect } from "react";
import "./App.css";
import ChatMessage from "./components/ChatMessage";

function App() {
  const [messages, setMessages] = useState<
    {
      role: "user" | "error" | "model" | "assistant";
      content: string;
      id?: number;
    }[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to chat
    const userMessage: {
      role: "user" | "error" | "model" | "assistant";
      content: string;
      id?: number;
    } = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Clear input
    setInput("");

    // Start loading state
    setIsLoading(true);

    try {
      // Create placeholder for AI response
      const aiMessageId = Date.now();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", id: aiMessageId },
      ]);
      const formattedPrompt = input.replace(/```/g, "\\`\\`\\`");
      // Stream the response
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: formattedPrompt }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (!response.body) {
        throw new Error("Response body is null");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        // Decode the chunk and update the message
        const chunk = decoder.decode(value, { stream: true });
        aiResponse += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId ? { ...msg, content: aiResponse } : msg
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "error",
          content: "Sorry, there was an error connecting to the AI service.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-900">
      <header className="bg-zinc-900 shadow-sm">
        <div className="max-w-3xl mx-auto p-4 flex items-center gap-2">
          {/* <BoltIcon className="w-8 h-8 text-blue-600" /> */}
          <h1 className="text-2xl font-bold text-gray-300">Bolt AI Chat</h1>
        </div>
      </header>

      <main className="flex-1 overflow-hidden max-w-3xl  w-full p-4 ">
        <div className="h-full flex flex-col ">
          <div className="flex-1 overflow-auto  rounded-lg bg-zinc-800 shadow-sm mb-4">
            <div className="p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-8 ">
                  <h2 className="text-2xl font-semibold text-gray-300 mb-2">
                    Welcome to Bolt AI!
                  </h2>
                  <p className="text-gray-400">
                    Ask me anything about programming, development, or tech.
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative rounded-lg shadow-lg bg-zinc-900 "
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
              ref={inputRef}
              className="w-full pr-12 pl-4 py-3 rounded-lg border border-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 p-2 text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              send
              {/* <SendIcon class="w-6 h-6" /> */}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
