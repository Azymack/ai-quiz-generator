import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Utility function for class merging
import { Dispatch, SetStateAction, useState } from "react";
import { PlayMode } from "../home";

type TabTriggerProps = {
  value: string;
  children: any;
  isActive: boolean;
  onClickAction: Dispatch<SetStateAction<PlayMode>>;
};

type TabsProps = {
  tabs: string[];
  onClickAction: Dispatch<SetStateAction<PlayMode>>;
};

const TabTrigger = ({
  value,
  children,
  isActive,
  onClickAction,
}: TabTriggerProps) => (
  <Tabs.Trigger
    value={value}
    className={cn(
      "relative px-4 py-2 text-gray-600 hover:text-white focus:outline-none",
      isActive && "text-white"
    )}
    onClick={() => onClickAction(value as PlayMode)}
  >
    {children}
    {isActive && (
      <motion.div
        layoutId="underline"
        className="absolute left-0 bottom-0 h-[2px] w-full bg-black underline"
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    )}
  </Tabs.Trigger>
);

export default function CustomTabs({ tabs, onClickAction }: TabsProps) {
  const [activeTab, setActiveTab] = useState("Flashcards");

  return (
    <Tabs.Root
      defaultValue="Flashcards"
      className="w-full max-w-md mx-auto"
      onValueChange={(value) => setActiveTab(value)}
    >
      <Tabs.List className="flex relative">
        {tabs.map((tab, key) => (
          <TabTrigger
            key={key}
            value={tab}
            isActive={activeTab === tab}
            onClickAction={onClickAction}
          >
            {tab}
          </TabTrigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
