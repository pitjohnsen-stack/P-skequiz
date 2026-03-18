import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedIndex: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionClick = (index: number) => {
    // Hindrer dobbeltklikk
    if (selectedOption !== null) return;
    
    // Haptic feedback for mobile
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    setSelectedOption(index);
    
    // Vent litt før vi går videre for å vise animasjonen
    setTimeout(() => {
      onAnswer(index);
    }, 350);
  };

  return (
    <div className="flex flex-col min-h-full w-full max-w-md mx-auto p-6 md:p-8 animate-slide-up relative z-10 bg-white/80 backdrop-blur-md rounded-[3rem] shadow-2xl border-4 border-yellow-200 my-4 md:my-8">
      {/* Header / Progress */}
      <div className="flex flex-col mb-6 w-full">
        <div className="flex justify-between items-end mb-3">
           <span className="text-sm md:text-base font-extrabold text-orange-500 tracking-wider uppercase flex items-center gap-2">
            <span>Spørsmål {questionNumber}/{totalQuestions}</span>
            <span className="text-xl">🥚</span>
          </span>
        </div>
        <div className="h-3 md:h-4 w-full bg-yellow-100 rounded-full overflow-hidden border border-yellow-200">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 ease-out shadow-[0_0_10px_#F59E0B]"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-grow flex flex-col justify-start pt-6 md:pt-10">
        <h2 className="text-[27px] font-extrabold text-gray-800 mb-8 md:mb-12 leading-snug text-center drop-shadow-sm">
          {question.questionText}
        </h2>

        {/* Options */}
        <div className="space-y-4 md:space-y-5 w-full">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isAnySelected = selectedOption !== null;

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={isAnySelected}
                className={`
                  w-full text-center font-bold py-4 px-5 md:py-5 md:px-6 rounded-3xl shadow-md 
                  text-[20px] md:text-[22px] touch-manipulation focus:outline-none 
                  border-4 transition-all duration-200 transform
                  ${isSelected 
                    ? 'bg-orange-500 border-orange-600 text-white scale-[0.98]' 
                    : 'bg-yellow-50 border-yellow-300 text-gray-800'
                  }
                  ${!isAnySelected ? 'hover:bg-yellow-100 hover:border-yellow-400 hover:-translate-y-1 active:bg-yellow-200 active:border-yellow-500 active:translate-y-0' : ''}
                  ${isAnySelected && !isSelected ? 'opacity-40 cursor-not-allowed' : ''}
                `}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};