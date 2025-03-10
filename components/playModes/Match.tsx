// import { Question } from "@/lib/schemas";
// import { cn, getAnswerText } from "@/lib/utils";
// import { useEffect, useMemo, useState } from "react";
// import { Button } from "../ui/button";

// type MatchProps = {
//   questions: Question[];
// };

// export default function Match({ questions }: MatchProps) {
//   // Memoize these arrays to prevent recreation on every render
//   const queries = useMemo(
//     () =>
//       questions.map((question, key) => ({ [`q_${key}`]: question.question })),
//     [questions]
//   );

//   const answers = useMemo(
//     () =>
//       questions.map((question, key) => ({
//         [`a_${key}`]: getAnswerText(question),
//       })),
//     [questions]
//   );

//   // Memoize the shuffled combination
//   const shuffledItems = useMemo(
//     () => [...queries, ...answers].sort(() => Math.random() - 0.5),
//     [queries, answers]
//   ); // Only reshuffle when questions change
//   const [isStarted, setIsStarted] = useState(false);
//   const [isFinished, setIsFinished] = useState(false);
//   const [time, setTime] = useState(0);
//   const [prevSelection, setPrevSelection] = useState("");
//   const [nextSelection, setNextSelection] = useState("");
//   const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);

//   const handleClick = (objKey: string) => {
//     if (prevSelection) {
//       const type = objKey.split("_")[0];
//       const index = objKey.split("_")[1];
//       const prevType = prevSelection.split("_")[0];
//       const prevIndex = prevSelection.split("_")[1];
//       if (type !== prevType && index === prevIndex) {
//         setAnsweredQuestions([...answeredQuestions, index]);
//       } else {
//         setNextSelection(objKey);
//       }
//       setPrevSelection("");
//     } else {
//       setPrevSelection(objKey);
//     }
//   };

//   useEffect(() => {
//     setNextSelection("");
//   }, [nextSelection]);

//   useEffect(() => {
//     if (answeredQuestions.length === questions.length) {
//       setIsFinished(true);
//     }
//   }, [answeredQuestions]);

//   useEffect(() => {
//     let interval = null;

//     if (isStarted && !isFinished) {
//       interval = setInterval(() => {
//         setTime((prevTime) => prevTime + 100);
//       }, 100);
//     } else {
//       if (interval) clearInterval(interval);
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [isStarted, isFinished]);

//   return (
//     <>
//       {!isStarted && !isFinished && (
//         <div className="absolute top-0 left-0 min-w-[100vw] min-h-screen backdrop-blur-xl z-50 flex justify-center items-center">
//           <Button variant={"outline"} onClick={() => setIsStarted(true)}>
//             Start
//           </Button>
//         </div>
//       )}
//       <div className="container mx-auto px-4 py-12 max-w-4xl flex-1 flex flex-col">
//         <div className="mb-8 text-center text-foreground">
//           {(time / 1000).toFixed(1)}
//         </div>
//         <div className="relative flex-1 grid grid-cols-4 gap-4">
//           {!isFinished ? (
//             shuffledItems.map((item, key) => {
//               let objKey = Object.keys(item)[0];
//               let type = objKey.split("_")[0];
//               let index = objKey.split("_")[1];
//               return (
//                 <Button
//                   key={key}
//                   className={cn(
//                     "col border rounded-lg p-3 flex justify-center items-center w-full h-full text-wrap transition-opacity duration-300",
//                     objKey === prevSelection
//                       ? !!nextSelection
//                         ? "border-orange-500"
//                         : "border-blue-600"
//                       : "",
//                     answeredQuestions.includes(index) &&
//                       "opacity-0! pointer-events-none invisible"
//                   )}
//                   variant={"outline"}
//                   onClick={() => handleClick(Object.keys(item)[0])}
//                   disabled={answeredQuestions.includes(index)}
//                 >
//                   {Object.values(item)[0]}
//                 </Button>
//               );
//             })
//           ) : (
//             <div>Well done!</div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import { Question } from "@/lib/schemas";
import { cn, getAnswerText } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";

type MatchProps = {
  questions: Question[];
};

export default function Match({ questions }: MatchProps) {
  // Memoize these arrays to prevent recreation on every render
  const queries = useMemo(
    () =>
      questions.map((question, key) => ({ [`q_${key}`]: question.question })),
    [questions]
  );

  const answers = useMemo(
    () =>
      questions.map((question, key) => ({
        [`a_${key}`]: getAnswerText(question),
      })),
    [questions]
  );

  // Memoize the shuffled combination
  const shuffledItems = useMemo(
    () => [...queries, ...answers].sort(() => Math.random() - 0.5),
    [queries, answers]
  ); // Only reshuffle when questions change
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [time, setTime] = useState(0);
  const [prevSelection, setPrevSelection] = useState("");
  const [nextSelection, setNextSelection] = useState("");
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [rumble, setRumble] = useState<string[]>([]);

  const handleClick = (objKey: string) => {
    if (prevSelection) {
      const type = objKey.split("_")[0];
      const index = objKey.split("_")[1];
      const prevType = prevSelection.split("_")[0];
      const prevIndex = prevSelection.split("_")[1];
      if (type !== prevType && index === prevIndex) {
        setAnsweredQuestions([...answeredQuestions, index]);
      } else if (type === prevType && index === prevIndex) {
        return;
      } else {
        setRumble([prevSelection, objKey]);
        setTimeout(() => {
          setRumble([]);
        }, 500); // Reset rumble after animation
        setNextSelection(objKey);
      }
      setPrevSelection("");
    } else {
      setPrevSelection(objKey);
    }
  };

  useEffect(() => {
    setNextSelection("");
  }, [nextSelection]);

  useEffect(() => {
    if (answeredQuestions.length === questions.length) {
      setIsFinished(true);
    }
  }, [answeredQuestions]);

  useEffect(() => {
    let interval = null;

    if (isStarted && !isFinished) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStarted, isFinished]);

  return (
    <>
      {!isStarted && !isFinished && (
        <div className="absolute top-0 left-0 min-w-[100vw] min-h-screen backdrop-blur-xl z-50 flex justify-center items-center">
          <Button variant={"outline"} onClick={() => setIsStarted(true)}>
            Start
          </Button>
        </div>
      )}
      <div className="container mx-auto px-4 py-12 max-w-4xl flex-1 flex flex-col">
        <div className="mb-8 text-center text-foreground">
          {(time / 1000).toFixed(1)}
        </div>
        <div className="relative flex-1 grid grid-cols-4 gap-4">
          {!isFinished ? (
            shuffledItems.map((item, key) => {
              let objKey = Object.keys(item)[0];
              let type = objKey.split("_")[0];
              let index = objKey.split("_")[1];
              return (
                <Button
                  key={key}
                  className={cn(
                    "col border rounded-lg p-3 flex justify-center items-center w-full h-full text-wrap transition-opacity duration-50",
                    objKey === prevSelection && !nextSelection
                      ? "border-blue-600"
                      : "",
                    answeredQuestions.includes(index)
                      ? "fade-out border-green-600"
                      : "",
                    rumble.includes(objKey) ? "rumble border-orange-700" : ""
                  )}
                  variant={"outline"}
                  onClick={() => handleClick(Object.keys(item)[0])}
                  disabled={answeredQuestions.includes(index)}
                >
                  {Object.values(item)[0]}
                </Button>
              );
            })
          ) : (
            <div>Well done!</div>
          )}
        </div>
      </div>
    </>
  );
}
