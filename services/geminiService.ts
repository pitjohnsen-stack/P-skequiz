import { QuizQuestion } from "../types";

// Faste spørsmål om ladevett og brannsikkerhet
const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    questionText: "Hva bør du gjøre før du bruker en elektrisk ovn i påsken?",
    options: [
      "Skru den på fullt med en gang",
      "Sjekke at ledning og støpsel er i god stand",
      "Legge den på gulvet"
    ],
    correctOptionIndex: 1
  },
  {
    questionText: "Hva betyr det hvis en sikring går ofte?",
    options: [
      "Alt er helt normalt",
      "Du spiller for høy jazzmusikk",
      "Det kan være feil eller overbelastning"
    ],
    correctOptionIndex: 2
  },
  {
    questionText: "Kan du bruke skjøteledning ute i snøen?",
    options: [
      "Ja, alltid",
      "Bare hvis den er godkjent for utendørs bruk",
      "Nei, aldri lov"
    ],
    correctOptionIndex: 1
  },
  {
    questionText: "Hva skal du gjøre hvis du kjenner lukt av brent plast fra et elektrisk apparat?",
    options: [
      "Ignorere det",
      "Skru av apparatet og trekke ut støpselet",
      "Spraye parfyme"
    ],
    correctOptionIndex: 1
  },
  {
    questionText: "Hva er farlig med å bruke en ødelagt ledning?",
    options: [
      "Den bruker mer strøm",
      "Du kan få elektrisk støt eller brann",
      "Den blir kortere"
    ],
    correctOptionIndex: 1
  },
  {
    questionText: "Hva er viktig når du lader mobilen om natten?",
    options: [
      "Legge den under puta",
      "Ha den på et hardt, luftig underlag",
      "Lade i fryseren"
    ],
    correctOptionIndex: 1
  },
  {
    questionText: "Hva skal du gjøre hvis du får støt fra et apparat?",
    options: [
      "Fortsette å bruke det",
      "Slutte å bruke det og få det sjekket",
      "Gi det i gave til svigermor"
    ],
    correctOptionIndex: 1
  },
  {
    questionText: "Kan du koble mange skjøteledninger etter hverandre?",
    options: [
      "Ja, ubegrenset",
      "Nei, det kan føre til overbelastning og brann",
      "Bare hvis de er hvite"
    ],
    correctOptionIndex: 1
  },
  {
    questionText: "Hva bør du gjøre hvis du brenner deg på ett støpsel?",
    options: [
      "Ignorere det",
      "Trekke ut kontakten og få det sjekket",
      "Blåse på den"
    ],
    correctOptionIndex: 1
  },
  {
    questionText: "Hva gjør du hvis mobilladeren begynner å ryke?",
    options: [
      "Legg deg og sove",
      "Trekker den ut av stikkontakten",
      "Åpne vinduet så den får frisk luft"
    ],
    correctOptionIndex: 1
  },
  {
    questionText: "Er det lurt å tørke klær på en panelovn?",
    options: [
      "Ja, perfekt tørkestativ",
      "Bare hvis de er ull",
      "Nei, det kan føre til brann"
    ],
    correctOptionIndex: 2
  },
  {
    questionText: "Hva gjør du hvis sikringen går midt i påskekrimmen? 📺",
    options: [
      "Blir sur og gir opp",
      "Skrur på alt igjen med en gang",
      "Slår av noe utstyr før du setter den på igjen"
    ],
    correctOptionIndex: 2
  },
  {
    questionText: "Hva bør du gjøre med elektriske apparater før du drar fra hytta eller huset?",
    options: [
      "La alt stå på",
      "Trekke ut støpsler eller slå av",
      "Skru opp varmen maks"
    ],
    correctOptionIndex: 1
  },
  {
    questionText: "Hva bør du sjekke før du låser og drar?",
    options: [
      "At TV-en står på",
      "At levende lys og elektriske apparater er av",
      "At døra står litt åpen"
    ],
    correctOptionIndex: 1
  },
  {
    questionText: "Hva er den sikreste måten å lade elbilen på hjemme eller på hytta?",
    options: [
      "Vanlig stikkontakt hele tiden",
      "Godkjent ladeboks (hjemmelader)",
      "Skjøteledning fra stua"
    ],
    correctOptionIndex: 1
  },
  {
    questionText: "Har du byttet røykvarslerbatteri siste 12 måneder?",
    options: [
      "Ja, selvfølgelig",
      "Nei",
      "Nei, men skal gjøre det nå"
    ],
    correctOptionIndex: [0, 2]
  }
];

export const fetchQuizQuestions = async (): Promise<QuizQuestion[]> => {
  // Simulerer en kort lasteperiode for UI-flyt
  await new Promise(resolve => setTimeout(resolve, 500));

  // Vi skiller ut det siste spørsmålet (bonusspørsmålet)
  const regularQuestions = [...QUIZ_QUESTIONS.slice(0, -1)];
  const bonusQuestion = { ...QUIZ_QUESTIONS[QUIZ_QUESTIONS.length - 1] };

  // Fisher-Yates shuffle algoritme for å stokke de vanlige spørsmålene
  for (let i = regularQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [regularQuestions[i], regularQuestions[j]] = [regularQuestions[j], regularQuestions[i]];
  }

  // Velg ut et antall spørsmål (for eksempel 5 tilfeldige + bonusspørsmålet)
  const selectedQuestions = regularQuestions.slice(0, 5);

  // Stokk svaralternativene for de valgte spørsmålene (slik at riktig svar ikke alltid er på samme plass)
  const questionsWithOptionsShuffled = selectedQuestions.map(q => {
    const optionsWithOriginalIndex = q.options.map((text, index) => ({ text, originalIndex: index }));
    
    // Stokk alternativene
    for (let i = optionsWithOriginalIndex.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsWithOriginalIndex[i], optionsWithOriginalIndex[j]] = [optionsWithOriginalIndex[j], optionsWithOriginalIndex[i]];
    }

    // Finn den nye indeksen til det riktige svaret
    let newCorrectOptionIndex: number | number[];
    if (Array.isArray(q.correctOptionIndex)) {
      newCorrectOptionIndex = q.correctOptionIndex.map(origIdx => 
        optionsWithOriginalIndex.findIndex(o => o.originalIndex === origIdx)
      );
    } else {
      newCorrectOptionIndex = optionsWithOriginalIndex.findIndex(o => o.originalIndex === q.correctOptionIndex);
    }

    return {
      ...q,
      options: optionsWithOriginalIndex.map(o => o.text),
      correctOptionIndex: newCorrectOptionIndex
    };
  });

  // Legg til bonusspørsmålet til slutt (uten å stokke alternativene for at det skal gi mening logisk)
  questionsWithOptionsShuffled.push(bonusQuestion);

  return questionsWithOptionsShuffled;
};