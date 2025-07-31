"use client";

import { useState } from "react";
import GenreSelect from "./GenreSelect";
import ThemeToggle from "./ThemeToggle";
import ShareCopyActions from "./ShareCopyActions";

// PUBLIC_INTERFACE
export default function StoryForm() {
  /** This is the main public component for story prompt input, genre, theming, and display. */
  const [prompt, setPrompt] = useState("");
  const [genre, setGenre] = useState("Adventure");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Minimum genres for demo, can expand!
  const genres = [
    "Adventure", "Fantasy", "Mystery", "Sci-Fi", "Horror", "Comedy",
    "Romance", "Historical", "Fairy Tale", "Drama",
  ];

  // PUBLIC_INTERFACE
  async function generateStory(event?: React.FormEvent) {
    if (event) event.preventDefault();
    if (!prompt.trim()) {
      setErrorMsg("Please enter a prompt.");
      setStory("");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    setStory("");
    try {
      // API call to backend (update the endpoint as needed - from env)
      const response = await fetch(
        process.env.NEXT_PUBLIC_STORY_API_ENDPOINT || "/api/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, genre }),
        },
      );
      if (!response.ok) throw new Error("Failed to fetch story.");
      const data = await response.json();
      setStory(data.story || "[No story returned]");
    } catch {
      setErrorMsg("Could not generate story. Please try again.");
      setStory("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-xl w-full mx-auto">
      <header className="flex justify-between items-center mb-8 w-full">
        <h1 className="font-bold text-2xl tracking-tight text-primary">
          storycraft
        </h1>
        <ThemeToggle />
      </header>
      <form
        className="flex flex-col gap-4 w-full mb-6"
        onSubmit={generateStory}
        autoComplete="off"
        aria-label="Short story generator input form"
      >
        <label htmlFor="prompt" className="font-semibold text-base">
          Your prompt
        </label>
        <textarea
          id="prompt"
          className="w-full rounded-md border border-foreground/10 bg-background p-3 text-base resize-none min-h-[56px] max-h-48 shadow-inner focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A child discovers a mysterious door in the garden…"
          required
        />
        <GenreSelect
          genres={genres}
          value={genre}
          onChange={setGenre}
        />
        {errorMsg && (
          <div className="text-xs text-red-500 font-mono">{errorMsg}</div>
        )}
        <button
          className="bg-primary text-white rounded-full py-2.5 px-8 font-semibold text-base shadow-md hover:bg-secondary transition-colors"
          type="submit"
          disabled={loading}
        >
          {loading ? "Generating…" : "Generate story"}
        </button>
      </form>
      <div
        className={`rounded-xl border border-primary/20 px-5 py-5 min-h-32 w-full bg-background shadow-inner transition-[box-shadow]`}
        aria-live="polite"
      >
        {loading ? (
          <div className="text-center font-mono text-primary">
            Crafting story...
          </div>
        ) : !!story ? (
          <>
            <div className="whitespace-pre-line font-sans text-lg text-foreground">
              {story}
            </div>
            <ShareCopyActions story={story} />
          </>
        ) : (
          <div className="italic text-foreground/60 text-sm">
            Your generated story will appear here.
          </div>
        )}
      </div>
    </section>
  );
}
