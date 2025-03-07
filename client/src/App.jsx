import React, { useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function reviewCode() {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/ai/get-review`,
        { code }
      );
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Failed to fetch review. Please check the console for errors.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div
            onClick={!isLoading ? reviewCode : undefined}
            className="review"
            style={{
              opacity: isLoading ? 0.6 : 1,
              pointerEvents: isLoading ? "none" : "auto",
            }}
          >
            {isLoading ? "Loading..." : "Review"}
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
