import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Trophy, DollarSign } from 'lucide-react';

const WordScrambleGame = () => {
  // 1. Static word list
  const originalWords = useMemo(
    () => [
      { word: 'ECOSYSTEM', hint: 'A community of interacting organisms and their environment' },
      { word: 'NOSTALGIA', hint: 'Longing for the past' },
      { word: 'RESOLUTION', hint: 'An official decision that is made after a group or organization has voted' },
      { word: 'OBFUSCATE', hint: 'To make something less clear and harder to understand, especially intentionally' },
      { word: 'RHETORIC', hint: 'Using language effectively to please or persuade' },
      { word: 'AVERSION', hint: 'A feeling of intense dislike' },
      { word: 'OBSEQUIOUS', hint: 'Too eager to praise or obey someone' },
      { word: 'LIBERTY', hint: 'Freedom from restriction' },
      { word: 'QUANTUM', hint: 'The smallest possible discrete unit of any physical property' },
      { word: 'ENTROPY', hint: 'A measure of disorder in a system' },
      { word: 'ANALOGY', hint: 'A comparison between two things for explanation' },
      { word: 'ARTICULATE', hint: 'Able to express ideas clearly and effectively' },
      { word: 'MARKET', hint: 'Place where goods are sold' },
      { word: 'BENEFICIARY', hint: 'A person who receives benefits' },
      { word: 'HERITAGE', hint: 'Property or traditions passed down from earlier generations' },
      { word: 'PENCIL', hint: 'Tool used for writing' },
      { word: 'INTEGRITY', hint: 'The quality of being honest and having strong moral principles' },
      { word: 'RECIPE', hint: 'Instructions for cooking' },
      { word: 'SENTIMENT', hint: 'A view or attitude toward a situation or event' },
      { word: 'PARADIGM', hint: 'A typical example or pattern of something' },
      { word: 'SCRUTINIZE', hint: 'Examine or inspect closely and thoroughly' },
      { word: 'HOCKEY', hint: 'Sport played on ice' },
      { word: 'BASKET', hint: 'Container for carrying things' },
      { word: 'JUNGLE', hint: 'Dense tropical forest' },
      { word: 'SPIDER', hint: 'Eight-legged creature' },
      { word: 'ROCKET', hint: 'Vehicle for space travel' },
      { word: 'BROCHURE', hint: 'A small booklet or pamphlet containing information' },
      { word: 'PIRATE', hint: 'Sea robber' },
      { word: 'CONFESSION', hint: 'A formal statement admitting guilt or fault' },
      { word: 'INSOMNIA', hint: 'Habitual inability to sleep' },
      { word: 'LANDMARK', hint: 'An object or feature that is easily seen and recognized' },
      { word: 'MAGNET', hint: 'Object that attracts metal' },
      { word: 'EMPATHY', hint: 'The ability to understand and share feelings' },
      { word: 'PARADOX', hint: 'A seemingly contradictory statement that may be true' },
      { word: 'DISCREPANCY', hint: 'A lack of compatibility or similarity between facts' },
      { word: 'EXEMPLARY', hint: 'Serving as a desirable model' },
      { word: 'INCUMBENT', hint: 'Currently holding office or position' },
      { word: 'VOYAGE', hint: 'Long journey by sea' },
      { word: 'WIZARD', hint: 'Magical person in stories' },
      { word: 'PERSEVERANCE', hint: 'Continued effort to do or achieve something, even when this is difficult or takes a long time' }
    ],
    []
  );

  // 2. Shuffle helper (Fisher–Yates)
  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // 3. Randomize word order once per participant
  const wordsListRef = useRef(shuffleArray(originalWords));
  const wordsList = wordsListRef.current;

  // 4. Determine progress display type from URL (?type=bar or ?type=circle)
  const params = new URLSearchParams(window.location.search);
  const progressBarType = params.get('type') === 'circle' ? 'circle' : 'bar';

  // 5. Component state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [ended, setEnded] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const scrambleRef = useRef([]);
  const dontKnowTimer = useRef(null);

  const currentWord = wordsList[currentIndex];

  // 6. Initialize each round
  useEffect(() => {
    if (!currentWord) return;
    let letters = currentWord.word.split('');
    do {
      letters = shuffleArray(letters);
    } while (letters.join('') === currentWord.word);
    const objs = letters.map((l, i) => ({ letter: l, id: `${l}-${i}` }));
    scrambleRef.current = objs;
    setAvailableLetters(objs);
    setSelectedLetters([]);
    setIsCorrect(false);
    setWrongAnswer(false);
    setShowCorrect(false);
    if (dontKnowTimer.current) {
      clearTimeout(dontKnowTimer.current);
      dontKnowTimer.current = null;
    }
  }, [currentIndex, currentWord]);

  // 7. Auto-check answer
  useEffect(() => {
  if (
    selectedLetters.length === 0 ||
    isCorrect ||
    wrongAnswer ||
    showCorrect ||
    availableLetters.length === currentWord.word.length
  ) return;
    if (selectedLetters.length === currentWord.word.length) {
      const attempt = selectedLetters.map((l) => l.letter).join('');
      if (attempt === currentWord.word) {
        setIsCorrect(true);
        setScore((s) => +(s + 0.04).toFixed(2));
        setTimeout(() => {
          setIsCorrect(false);
          if (currentIndex < wordsList.length - 1) setCurrentIndex((i) => i + 1);
          else setGameComplete(true);
        }, 1000);
      } else {
        setWrongAnswer(true);
        setTimeout(() => {
          setAvailableLetters(scrambleRef.current);
          setSelectedLetters([]);
          setWrongAnswer(false);
        }, 1000);
      }
    }
  }, [selectedLetters, isCorrect, wrongAnswer, showCorrect, currentIndex, currentWord, wordsList.length]);

  // 8. Handlers
  const pickLetter = (letter) => {
    if (!isCorrect && !wrongAnswer && !showCorrect && selectedLetters.length < currentWord.word.length) {
      setSelectedLetters((s) => [...s, letter]);
      setAvailableLetters((a) => a.filter((x) => x.id !== letter.id));
    }
  };
  const removeLetter = (letter, idx) => {
    if (!isCorrect && !wrongAnswer && !showCorrect && letter) {
      setAvailableLetters((a) => [...a, letter]);
      setSelectedLetters((s) => s.filter((_, i) => i !== idx));
    }
  };
  const handleDontKnow = () => {
    if (showCorrect) return;
    setShowCorrect(true);
    const correct = currentWord.word.split('').map((l, i) => ({ letter: l, id: `correct-${i}` }));
    setSelectedLetters(correct);
    dontKnowTimer.current = setTimeout(() => {
      setShowCorrect(false);
      if (currentIndex < wordsList.length - 1) setCurrentIndex((i) => i + 1);
      else setGameComplete(true);
    }, 3000);
  };
  const handleEnd = () => {
    if (dontKnowTimer.current) clearTimeout(dontKnowTimer.current);
    setEnded(true);
  };


// 9. Circular progress component
const CircularProgress = ({ pct }) => {
  const r = 50;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
        {/* 渐变定义 */}
        <defs>
          <linearGradient id="circle-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        {/* 背景白色圆环 */}
        <circle cx="60" cy="60" r={r} stroke="#ffffff" strokeWidth="20" fill="none" />
        {/* 渐变色圆环 */}
        <circle
          cx="60" cy="60" r={r}
          stroke="url(#circle-gradient)" strokeWidth="20" fill="none"
          strokeDasharray={c} strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
    </div>
  );
};




  // 10. End screen
  if (ended) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Thanks for participating!</h2>
      </div>
    </div>
  );
}

 if (gameComplete) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Game Complete</h1>
        <p className="mt-6 text-lg text-gray-800">You have gone through all 40 words.</p>
        <p className="mt-2 text-base text-gray-600">Thanks for participating!</p>
      </div>
    </div>
  );
}

  // 12. Main game UI
  const percentComplete = (currentIndex / wordsList.length) * 100;
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">Word Scramble Game</h1>
          <div className="flex justify-end mb-4">
            <span className="text-green-600 font-bold">${score.toFixed(2)}</span>
          </div>
        </div>

        {/* Progress (hidden on first) */}
        {currentIndex > 0 && (
          <>
            <div className="mb-2">
              {progressBarType === 'bar' ? (
                <div className="w-full bg-white rounded-full h-4" style={{ boxShadow: 'none' }}>
                  <div
                    className="h-4 rounded-full transition-all duration-500 bg-gradient-to-r from-purple-500 to-blue-500"
                    style={{ width: `${percentComplete}%`, boxShadow: 'none' }}
                  />
                </div>
              ) : (
                <CircularProgress pct={percentComplete} />
              )}
            </div>
            <div className="text-center mb-6"><span className="text-sm text-gray-600">current progress</span></div>
          </>
        )}

        {/* Hint */}
        <div className="text-center mb-6"><p className="text-gray-700 text-lg font-medium">{currentWord.hint}</p></div>

        {/* Answer Boxes */}
        <div className="mb-6 flex justify-center">
          <div className="flex flex-wrap gap-2 max-w-4xl justify-center">
            {Array.from({ length: currentWord.word.length }).map((_, idx) => (
              <div
                key={idx}
                className={`w-10 h-10 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${
                  wrongAnswer
                    ? 'border-red-400 bg-red-50 animate-pulse'
                    : isCorrect
                    ? 'border-green-400 bg-green-50'
                    : showCorrect
                    ? 'border-blue-400 bg-blue-50'
                    : selectedLetters[idx]
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-400 hover:border-purple-400'
                }`}
                onClick={() => removeLetter(selectedLetters[idx], idx)}
              >
                {selectedLetters[idx] && <span className="text-lg font-bold text-gray-800">{selectedLetters[idx].letter}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Letter Tiles */}
        <div className="flex flex-wrap gap-3 justify-center mb-4">
          {availableLetters.map((l) => (
            <button
              key={l.id}
              onClick={() => pickLetter(l)}
              disabled={isCorrect || wrongAnswer || showCorrect}
              className={`w-16 h-16 bg-white border-2 border-gray-300 rounded-xl text-2xl font-bold transition-all duration-200 ${
                isCorrect || wrongAnswer || showCorrect
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:border-purple-500 hover:bg-purple-50 hover:scale-105 cursor-pointer'
              }`}>
              {l.letter}
            </button>
          ))}
        </div>

        {/* Instructions */}
        <p className="text-center text-gray-600 text-sm mb-4">Click letters to form the correct word • Click selected letters to remove them</p>

        {/* Actions (bottom) */}
        <div className="flex justify-center gap-4 mb-2">
          <button onClick={handleDontKnow} className="px-4 py-2 bg-yellow-400 text-white rounded">I Don't Know</button>
          <button onClick={handleEnd} className="px-4 py-2 bg-red-500 text-white rounded">End</button>
        </div>

        {/* Feedback */}
        {wrongAnswer && <div className="text-center mt-4"><p className="text-red-700 font-semibold">Try again!</p></div>}
        {isCorrect && <div className="text-center mt-4"><p className="text-green-700 font-semibold">Correct! +$0.04 bonus</p></div>}
        {showCorrect && <div className="text-center mt-4"><p className="text-blue-700 font-semibold">This is the correct answer. (No bonus)</p></div>}
      </div>
    </div>
  );
};

export default WordScrambleGame;
