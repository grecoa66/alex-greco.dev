"use client";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";

// Then register the languages you need
hljs.registerLanguage("javascript", javascript);

export const CodeSnippet = ({ code }: { code: string }) => {
  const codeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, []);
  return (
    <pre>
      <code className="javascript atom-one-dark rounded-xl" ref={codeRef}>
        {code}
      </code>
    </pre>
  );
};
