import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  RefreshCw,
  FileText,
  CheckIcon,
  CrossIcon,
  XIcon,
} from "lucide-react";
import { Question } from "@/lib/schemas";

type QuizProps = {
  questions: Question[];
};

const QuestionCard: React.FC<{
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  isSubmitted: boolean;
  showCorrectAnswer: boolean;
}> = ({ question, selectedAnswer, onSelectAnswer, showCorrectAnswer }) => {
  const answerLabels = ["A", "B", "C", "D"];

  return (
    <div className="space-y-6  flex-1 flex flex-col justify-around border rounded-lg shadow-lg shadow-gray-700 p-6">
      <h2 className="text-lg font-semibold leading-tight">
        {question.question}
      </h2>
      <div className="space-y-6">
        <div>
          {selectedAnswer ? (
            selectedAnswer === question.answer ? (
              <div className="text-green-600">Correct!</div>
            ) : (
              <div className="text-orange-600">
                No sweat! You are still learning.
              </div>
            )
          ) : (
            <div className="text-gray-600">Choose matching definition.</div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={"outline"}
              className={`h-auto py-6 px-4 justify-start text-left whitespace-normal ${
                !!selectedAnswer
                  ? question.answer === answerLabels[index]
                    ? "border border-dashed border-green-600"
                    : selectedAnswer === answerLabels[index] &&
                      selectedAnswer !== question.answer
                    ? "border border-red-500"
                    : ""
                  : ""
                // !!selectedAnswer && answerLabels[index] === question.answer
                //   ? "bg-green-600 hover:bg-green-700"
                //   : showCorrectAnswer &&
                //     selectedAnswer === answerLabels[index] &&
                //     selectedAnswer !== question.answer
                //   ? "bg-red-600 hover:bg-red-700"
                //   : ""
              }`}
              onClick={() => onSelectAnswer(answerLabels[index])}
              disabled={!!selectedAnswer}
            >
              <span className="text-lg font-medium mr-4 shrink-0">
                {answerLabels[index]}
              </span>
              <span className="flex-grow">{option}</span>
              {!!selectedAnswer ? (
                question.answer === answerLabels[index] ? (
                  <CheckIcon className="text-green-600" />
                ) : selectedAnswer === answerLabels[index] &&
                  selectedAnswer !== question.answer ? (
                  <XIcon className="text-red-600" />
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
              {/* {(showCorrectAnswer && answerLabels[index] === question.answer) ||
                (selectedAnswer === answerLabels[index] && (
                  <Check className="ml-2 shrink-0 text-white" size={20} />
                ))}
              {showCorrectAnswer &&
                selectedAnswer === answerLabels[index] &&
                selectedAnswer !== question.answer && (
                  <X className="ml-2 shrink-0 text-white" size={20} />
                )} */}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Learn({ questions }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill(null)
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((currentQuestionIndex / questions.length) * 100);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, questions.length]);

  const handleSelectAnswer = (answer: string) => {
    if (!isSubmitted) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = answer;
      setAnswers(newAnswers);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const correctAnswers = questions.reduce((acc, question, index) => {
      return acc + (question.answer === answers[index] ? 1 : 0);
    }, 0);
    setScore(correctAnswers);
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(null));
    setIsSubmitted(false);
    setScore(null);
    setCurrentQuestionIndex(0);
    setProgress(0);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl flex-1 flex flex-col">
      <div className="relative flex-1 flex flex-col">
        {!isSubmitted && (
          <div className="grid grid-cols-[15%_85%] items-center  mb-6">
            <span className="text-sm font-medium col">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
            <Progress value={progress} className="h-1 col" />
          </div>
        )}
        <div className="min-h-[400px] flex-1 flex flex-col">
          {" "}
          {/* Prevent layout shift */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isSubmitted ? "results" : currentQuestionIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className=" flex-1 flex flex-col"
            >
              {!isSubmitted ? (
                <div className="space-y-8 flex-1 flex flex-col">
                  <QuestionCard
                    question={currentQuestion}
                    selectedAnswer={answers[currentQuestionIndex]}
                    onSelectAnswer={handleSelectAnswer}
                    isSubmitted={isSubmitted}
                    showCorrectAnswer={false}
                  />
                  <motion.div
                    initial="hidden"
                    animate={
                      answers[currentQuestionIndex] !== null
                        ? "visible"
                        : "hidden"
                    }
                    variants={{
                      visible: { y: 0, opacity: 1 },
                      hidden: { y: "100%", opacity: 0 },
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-center pt-4">
                      <Button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        variant="ghost"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                      </Button>
                      <Button
                        onClick={handleNextQuestion}
                        disabled={answers[currentQuestionIndex] === null}
                        variant="ghost"
                      >
                        {currentQuestionIndex === questions.length - 1
                          ? "Quit"
                          : "Next"}{" "}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <>
                  <div className="space-y-8 flex-1 flex flex-col items-center justify-center">
                    <div className="text-2xl">All done!</div>
                    <div>
                      You have answered {score} question(s) correclty out of{" "}
                      {questions.length}
                    </div>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="bg-muted hover:bg-muted/80"
                    >
                      <RefreshCw className="h-4 w-4" /> Try Again!
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
