"use client";
import hljs from "highlight.js/lib/core";

import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useLayoutEffect } from "react";
import { twMerge } from "tailwind-merge";

// Then register the languages you need
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);

export const CodeSnippet = ({ code }: { code: string }) => {
  const codeRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, [code]);
  return (
    <pre className="my-4">
      <code className={twMerge("rounded-xl")} ref={codeRef}>
        {code}
      </code>
    </pre>
  );
};
