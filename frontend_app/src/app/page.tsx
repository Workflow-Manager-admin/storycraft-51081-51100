"use client";

import StoryForm from "@/components/StoryForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-background px-4 sm:px-0 pt-12 pb-8">
      <main className="flex flex-col justify-center flex-1 w-full">
        <StoryForm />
      </main>
      <footer className="w-full flex justify-center mt-auto pt-8 text-xs text-foreground/60 font-mono">
        &copy; {new Date().getFullYear()} storycraft
      </footer>
    </div>
  );
}
