/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ChatMessage({ message }: { message: any }) {
  const isUser = message.role === "user";
  const isError = message.role === "error";
  const isAssistant = message.role === "assistant";
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} ${
        isError ? "justify-center" : ""
      } mb-4 `}
    >
      <div
        className={`max-w-[80%] bg-zinc-800 text-white rounded-lg p-4 ${
          isUser
            ? "bg-zinc-700 text-white "
            : isError
            ? "bg-red-100 text-red-800 border border-red-200"
            : "bg-gray-50 text-gray-800"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({
              inline,
              className,
              children,
              ...props
            }: {
              inline?: boolean;
              className?: string;
              children?: React.ReactNode;
            }) {
              const match = /language-(\w+)/.exec(className || "");

              return !inline && match ? (
                <div className="rounded-lg overflow-hidden my-2  shadow">
                  <div className="bg-zinc-700 px-4 py-2 flex justify-between  items-center">
                    <span className="text-sm text-gray-400 ">{match[1]}</span>
                    <div className="flex space-x-2 ">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                  </div>
                  <SyntaxHighlighter
                    wrapLines
                    lineProps={{ style: { whiteSpace: "pre-wrap" } }}
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    className="p-4 text-sm"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code
                  className="px-1.5 py-0.5 bg-zinc-700 rounded text-sm font-mono text-red-300"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            ul: ({ children }) => (
              <ul className="list-disc pl-6 mb-2">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 mb-2">{children}</ol>
            ),
            li: ({ children }) => <li className="mb-1">{children}</li>,
            table: ({ children }) => (
              <table className="w-full border-collapse my-2">{children}</table>
            ),
            th: ({ children }) => (
              <th className="border border-gray-300 px-3 py-1.5 bg-zinc-700 text-left">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-gray-300 px-3 py-1.5">{children}</td>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300  pl-4 my-2 text-gray-600">
                {children}
              </blockquote>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
