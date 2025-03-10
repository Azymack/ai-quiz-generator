"use client";

import { Question } from "@/lib/schemas";
import React, { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { BookIcon, IdCardIcon, PaperclipIcon, PlayIcon } from "lucide-react";
import Flashcards from "./playModes/Flashcards";
import CustomTabs from "./ui/tabs";
import Learn from "./playModes/Learn";
import Match from "./playModes/Match";

type HomeProps = {
  title: string;
  questions: Question[];
};

type PlayCardProps = {
  icon: ReactNode;
  text: PlayMode;
  onClickAction?: () => void;
};

export type PlayMode = "Flashcards" | "Test" | "Learn" | "Match";

// const PlayCard = ({ icon, text, onClickAction }: PlayCardProps) => {
//   return (
//     // <Button
//     //   className="border rounded-lg flex items-center justify-center gap-4 cursor-pointer"
//     //   onClick={onClickAction}
//     // >
//     //   <div>{icon}</div>
//     //   <div>{text}</div>
//     // </Button>
//     <CustomTabs
//       tabs={["Flashcards", "Test", "Learn", "Match"]}
//       onClickAction={}
//     />
//   );
// };

export default function Home({ questions, title }: HomeProps) {
  const playModeArr: PlayCardProps[] = [
    { icon: <IdCardIcon />, text: "Flashcards" },
    { icon: <BookIcon />, text: "Learn" },
    { icon: <PaperclipIcon />, text: "Test" },
    { icon: <PlayIcon />, text: "Match" },
  ];
  const [playMode, setPlayMode] = useState<PlayMode>("Flashcards");
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="container mx-auto px-4 py-12 max-w-4xl flex-1 flex flex-col">
        <h1 className="text-3xl font-bold mb-8 text-center text-foreground">
          {title}
        </h1>
        <div className="grid grid-cols-4 gap-4">
          {/* {playModeArr.map((playMode, key) => (
            <PlayCard
              key={key}
              icon={playMode.icon}
              text={playMode.text}
              onClickAction={() => setPlayMode(playMode.text)}
            />
            
          ))} */}

          <CustomTabs
            tabs={["Flashcards", "Test", "Learn", "Match"]}
            onClickAction={setPlayMode}
          />
        </div>
        <div className="flex-1 flex flex-col">
          {playMode === "Flashcards" && <Flashcards questions={questions} />}
          {playMode === "Learn" && <Learn questions={questions} />}
          {playMode === "Match" && <Match questions={questions} />}
        </div>
      </main>
    </div>
  );
}
