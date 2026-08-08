import { ReactNode } from "react";

export function captionWords(text: string): ReactNode {
  const words = text.trim().split(/\s+/).filter(Boolean);

  return words.map((word, index) => (
    <span key={`${word}-${index}`} className="caption-word" aria-hidden="true">
      <span className="caption-word__inner">{word}</span>
    </span>
  ));
}

export function captionLine(text: string, className = "caption-line"): ReactNode {
  return <span className={className}>{captionWords(text)}</span>;
}
