"use client";

import { useState } from "react";

type Props = {
  story: string;
};

// PUBLIC_INTERFACE
export default function ShareCopyActions({ story }: Props) {
  /** This public component renders sharing and copy actions for story text. */
  const [copied, setCopied] = useState(false);
  const isWebShare = typeof window !== "undefined" && !!navigator.share;

  // PUBLIC_INTERFACE
  async function copyStory() {
    try {
      await navigator.clipboard.writeText(story);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Failed to copy. Try again!");
    }
  }

  // PUBLIC_INTERFACE
  async function shareStory() {
    if (isWebShare) {
      try {
        await navigator.share({
          title: "My generated story",
          text: story,
        });
      } catch {
        // User cancelled or sharing failed
      }
    } else {
      copyStory();
    }
  }

  return (
    <div className="flex gap-2 items-center mt-2">
      <button
        onClick={copyStory}
        className="rounded border border-foreground/10 px-3 py-1 text-xs font-mono hover:bg-primary hover:text-white transition"
        aria-label="Copy story to clipboard"
        type="button"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <button
        onClick={shareStory}
        className="rounded border border-accent px-3 py-1 text-xs font-mono hover:bg-accent hover:text-white transition"
        aria-label="Share story"
        type="button"
      >
        Share
      </button>
    </div>
  );
}
