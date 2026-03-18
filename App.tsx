import React, { useState, useEffect } from 'react';
import { GameState, QuizQuestion } from './types';
import { fetchQuizQuestions } from './services/geminiService';
import { StartView } from './components/StartView';
import { QuestionCard } from './components/QuestionCard';
import { ResultView } from './components/ResultView';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  // Load questions when entering Loading state
  useEffect(() => {
    if (gameState === GameState.LOADING) {
      const loadData = async () => {
        const fetchedQuestions = await fetchQuizQuestions();
        setQuestions(fetchedQuestions);
        // Use a small timeout to ensure loading animation is felt (smoother UX)
        setTimeout(() => {
          setGameState(GameState.PLAYING);
        }, 800);
      };
      loadData();
    }
  }, [gameState]);

  const handleStart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameState(GameState.LOADING);
  };

  const handleAnswer = (selectedIndex: number) => {
    const currentQ = questions[currentQuestionIndex];
    
    const isCorrect = Array.isArray(currentQ.correctOptionIndex) 
      ? currentQ.correctOptionIndex.includes(selectedIndex)
      : currentQ.correctOptionIndex === selectedIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setGameState(GameState.FINISHED);
    }
  };

  return (
    <div className="h-full w-full flex items-start justify-center bg-[#f5f5f5] font-sans">
      {/* Removed card styling (shadow, border, rounded) to make it seamless in iframe */}
      <div className="w-full h-full max-w-md mx-auto bg-[#f5f5f5] relative text-gray-900 flex flex-col overflow-y-auto no-scrollbar pb-8">
        
        {/* Loading Overlay */}
        {gameState === GameState.LOADING && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#f5f5f5]/95 backdrop-blur-sm relative overflow-hidden">
            {/* Decorative Easter elements */}
            <div className="absolute top-10 left-4 text-4xl opacity-30 animate-bounce">🐣</div>
            <div className="absolute bottom-20 right-8 text-4xl opacity-30 animate-pulse">🐰</div>
            <div className="absolute top-20 right-6 text-3xl opacity-30">🌷</div>
            <div className="absolute bottom-32 left-8 text-3xl opacity-30">🐥</div>

            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#F59E0B] mb-6"></div>
            <p className="text-gray-900 font-bold text-2xl animate-pulse">Laster påskequiz... 🐣</p>
          </div>
        )}

        {/* Views Switcher */}
        <main className="flex-grow w-full flex flex-col">
          {gameState === GameState.START && (
            <StartView onStart={handleStart} />
          )}

          {gameState === GameState.PLAYING && questions.length > 0 && (
            <QuestionCard
              key={currentQuestionIndex} /* Critical fix: Forces re-mount to clear button focus/hover states on mobile */
              question={questions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
            />
          )}

          {gameState === GameState.FINISHED && (
            <ResultView 
              score={score} 
              totalQuestions={questions.length} 
              onRestart={handleStart} 
            />
          )}
          
          {gameState === GameState.PLAYING && questions.length === 0 && (
             <div className="flex flex-col items-center justify-center h-full p-4 text-center my-auto">
                <p className="text-gray-900 text-lg">Noe gikk galt. Prøv igjen.</p>
                <button onClick={() => setGameState(GameState.START)} className="mt-4 text-[#F59E0B] font-bold text-lg">Hjem</button>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;