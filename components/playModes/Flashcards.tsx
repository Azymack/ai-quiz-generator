"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Question } from "@/lib/schemas";
import { getAnswerText } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type FlashcardsProps = {
  questions: Question[];
};

export default function Flashcards({ questions }: FlashcardsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((currentQuestionIndex / questions.length) * 100);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, questions.length]);

  const handleNextQuestion = () => {
    setFlipped(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    setFlipped(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl flex-1 flex flex-col">
      <div className="relative flex-1 flex flex-col">
        {/* Prevent layout shift */}
        <AnimatePresence mode="wait">
          <motion.div
            className=" flex-1 flex flex-col mb-3"
            key={isSubmitted ? "results" : currentQuestionIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {!isSubmitted ? (
              <div className="space-y-8 flex-1 flex flex-col">
                {/* <QuestionCard
                      question={currentQuestion}
                      selectedAnswer={answers[currentQuestionIndex]}
                      onSelectAnswer={handleSelectAnswer}
                      isSubmitted={isSubmitted}
                      showCorrectAnswer={false}
                    /> */}
                {/* <div className="flex-1">
                  {questions[currentQuestionIndex].question}
                </div> */}
                <div
                  className="relative flex-1 flex items-center justify-center "
                  onClick={() => setFlipped(!flipped)}
                >
                  <motion.div
                    className="absolute w-full h-full text-white flex items-center justify-center text-xl font-bold cursor-pointer border rounded-lg shadow-lg shadow-gray-700 p-6"
                    initial={false}
                    animate={{ rotateX: flipped ? 180 : 0 }}
                    transition={{ duration: 0.1 }}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {questions[currentQuestionIndex].question}
                  </motion.div>
                  <motion.div
                    className="absolute w-full h-full text-white flex items-center justify-center text-xl font-bold cursor-pointer border rounded-lg shadow-lg shadow-gray-700 p-6"
                    initial={false}
                    animate={{ rotateX: flipped ? 0 : -180 }}
                    transition={{ duration: 0.1 }}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {getAnswerText(questions[currentQuestionIndex])}
                  </motion.div>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <Button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    variant="ghost"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  <span className="text-sm font-medium">
                    {currentQuestionIndex + 1} / {questions.length}
                  </span>
                  <Button onClick={handleNextQuestion} variant="ghost">
                    {currentQuestionIndex === questions.length - 1
                      ? "Quit"
                      : "Next"}{" "}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-8 flex-1 flex items-center justify-center">
                  <h1>All done!</h1>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentQuestionIndex(questions.length - 1);
                    }}
                    disabled={currentQuestionIndex === 0}
                    variant="ghost"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to the last
                    question
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
        {!isSubmitted && <Progress value={progress} className="h-1 mb-8" />}
      </div>
    </div>
  );
}
