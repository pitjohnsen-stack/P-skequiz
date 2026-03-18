import React from 'react';

interface StartViewProps {
  onStart: () => void;
}

export const StartView: React.FC<StartViewProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full py-6 px-6 space-y-6 md:space-y-10 text-center animate-fade-in relative overflow-hidden">
      {/* Decorative Easter elements */}
      <div className="absolute top-10 left-4 text-4xl opacity-30 animate-pulse">🐣</div>
      <div className="absolute bottom-20 right-8 text-4xl opacity-30 animate-bounce">🐰</div>
      <div className="absolute top-20 right-6 text-3xl opacity-30">🌷</div>
      <div className="absolute bottom-32 left-8 text-3xl opacity-30">🐥</div>

      <div className="bg-[#F59E0B] p-6 md:p-8 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-20 md:w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      
      <div className="flex flex-col gap-4 z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Påskequiz 🐣</h1>
        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
          Test dine kunnskaper om elsikkerhet i påsken!
        </p>
        <p className="text-lg md:text-xl text-[#F59E0B] font-bold leading-relaxed px-2">
          Svar rett på alle spørsmålene, og du kan vinne en premie! 🎁
        </p>
      </div>

      <div className="w-full flex justify-center pt-4 z-10">
        <button
          onClick={onStart}
          className="w-full max-w-xs bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition active:scale-95 text-xl md:text-2xl tracking-wide"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};