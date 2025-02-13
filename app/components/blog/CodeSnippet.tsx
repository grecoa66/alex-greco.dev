"use client";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect, useLayoutEffect } from "react";
import { twMerge } from "tailwind-merge";

// Then register the languages you need
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("react", xml);

export const CodeSnippet = ({
  code,
  language,
}: {
  code: string;
  language: "javascript" | "typescript" | "react";
}) => {
  const codeRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, [code]);
  return (
    <pre className="my-4">
      <code
        className={twMerge(
          "rounded-xl",
          language === "javascript" && "language-javascript",
          language === "typescript" && "language-typescript",
          language === "react" && "language-react",
        )}
        ref={codeRef}
      >
        {code}
      </code>
    </pre>
  );
};
