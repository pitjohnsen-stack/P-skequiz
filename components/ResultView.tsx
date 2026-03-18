import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ResultViewProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  bonusAnswer?: string;
}

export const ResultView: React.FC<ResultViewProps> = ({ score, totalQuestions, onRestart, bonusAnswer }) => {
  const isWinner = score === totalQuestions;
  const mistakes = totalQuestions - score;

  const isChick = bonusAnswer === "Nei, men skal gjøre det nå";

  useEffect(() => {
    if (isWinner) {
      // Fyrverkeri-effekt for vinner
      const duration = 5000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          ...defaults, 
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#F59E0B', '#FCD34D', '#86EFAC', '#F472B6'] // Easter colors
        });
        confetti({
          ...defaults, 
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#F59E0B', '#FCD34D', '#86EFAC', '#F472B6'] // Easter colors
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isWinner]);

  if (isWinner) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full p-4 text-center animate-pop-in w-full relative z-10">
        
        {/* Animerende Trofé */}
        <div className="mb-6 relative animate-bounce">
            <div className={`absolute inset-0 rounded-full blur-xl opacity-40 animate-pulse ${isChick ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
            <div className={`relative p-6 rounded-full border-4 border-white flex items-center justify-center w-[115px] h-[115px] md:w-[154px] md:h-[154px] text-[72px] md:text-[115px] ${isChick ? 'bg-gradient-to-br from-red-400 to-red-600 shadow-[0_0_40px_rgba(239,68,68,0.5)]' : 'bg-gradient-to-br from-yellow-300 to-orange-500 shadow-[0_0_40px_rgba(245,158,11,0.5)]'}`}>
              {isChick ? '🐥' : '🐰'}
            </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600 mb-2 drop-shadow-sm">
          Gratulerer! 🐣
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-800 mb-8 font-bold max-w-xs mx-auto">
          Du er en mester på elsikkerhet! God påske! 🌷
        </p>

        {/* Premiekort / Gullbillett */}
        <div className="relative w-full max-w-sm group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <div className="relative bg-gray-900 ring-1 ring-gray-900/5 rounded-2xl leading-none flex flex-col items-center justify-center p-8 space-y-4 border-2 border-yellow-500/30">
                <span className="text-yellow-400 text-base font-bold uppercase tracking-widest">Vis denne skjermen</span>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
                <p className="font-black text-5xl sm:text-6xl md:text-7xl tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap">
                    VINNER
                </p>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
                <div className="flex items-center gap-2 text-yellow-500">
                    <span className="text-xl">🥚</span>
                    <span className="font-bold text-lg tracking-widest">PREMIEBEVIS</span>
                    <span className="text-xl">🥚</span>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // Taper-visning
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 text-center animate-pop-in relative z-10">
      
      <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-2 drop-shadow-sm">Au da! 🐰</h1>
      <p className="text-xl md:text-2xl text-gray-800 mb-8 font-bold">
        Du hadde <span className="text-orange-600 text-3xl">{mistakes}</span> feil.
      </p>

      {/* Advarsel-kort / Fare-kort */}
      <div className="relative w-full max-w-sm mb-10 group">
         <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-3xl blur opacity-40 animate-pulse"></div>
         <div className="relative bg-white/90 backdrop-blur-sm border-4 border-dashed border-orange-400 rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl">
             <div className="bg-orange-100 p-4 rounded-full text-4xl">
                🐣
             </div>
             <p className="text-gray-800 text-xl font-bold">Du må ha alt rett for å vinne påskeegget!</p>
         </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full max-w-xs bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 font-extrabold py-5 px-8 rounded-full shadow-xl transform transition hover:-translate-y-1 active:scale-95 active:translate-y-0 text-2xl border-4 border-white"
      >
        Prøv på nytt 🥚
      </button>
    </div>
  );
};