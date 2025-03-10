import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Question } from "./schemas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAnswerText(question: Question) {
  const index = { A: 0, B: 1, C: 2, D: 3 }[question.answer];
  return question.options[index];
}
