import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Trophy, DollarSign } from 'lucide-react';

// 这个函数用来读取URL里的参数（比如 ?rid=xxx&group=circle）
function getUrlParams() {
  return Object.fromEntries(new URLSearchParams(window.location.search).entries());
}

const WordScrambleGame = () => {
  const params = getUrlParams();
  
  // 1. Static word list - 131 words
  const originalWords = useMemo(
    () => [
      { word: 'SIMPLE', hint: 'Easy to understand or do' },
      { word: 'NATURE', hint: 'The physical world around us' },
      { word: 'FRIEND', hint: 'Someone you like and trust' },
      { word: 'GARDEN', hint: 'Area where plants grow' },
      { word: 'WINDOW', hint: 'Opening in a wall to let light in' },
      { word: 'COFFEE', hint: 'Popular morning drink' },
      { word: 'TRAVEL', hint: 'To go from one place to another' },
      { word: 'CAMERA', hint: 'Device for taking pictures' },
      { word: 'PUZZLE', hint: 'Game that tests your thinking' },
      { word: 'BRIDGE', hint: 'Structure built over water' },
      { word: 'PLANET', hint: 'Large body orbiting a star' },
      { word: 'FOREST', hint: 'Large area covered with trees' },
      { word: 'MARKET', hint: 'Place where goods are sold' },
      { word: 'CANDLE', hint: 'Wax stick that burns for light' },
      { word: 'FLOWER', hint: 'Colorful part of a plant' },
      { word: 'PENCIL', hint: 'Tool used for writing' },
      { word: 'RECIPE', hint: 'Instructions for cooking' },
      { word: 'SCHOOL', hint: 'Place of learning' },
      { word: 'DOCTOR', hint: 'Medical professional' },
      { word: 'TICKET', hint: 'Pass to enter an event' },
      { word: 'HOCKEY', hint: 'Sport played on ice' },
      { word: 'BASKET', hint: 'Container for carrying things' },
      { word: 'JUNGLE', hint: 'Dense tropical forest' },
      { word: 'SPIDER', hint: 'Eight-legged creature' },
      { word: 'ROCKET', hint: 'Vehicle for space travel' },
      { word: 'TEMPLE', hint: 'Religious building' },
      { word: 'PIRATE', hint: 'Sea robber' },
      { word: 'VIOLIN', hint: 'String musical instrument' },
      { word: 'BAKERY', hint: 'Shop that sells bread' },
      { word: 'WINTER', hint: 'Coldest season of the year' },
      { word: 'MAGNET', hint: 'Object that attracts metal' },
      { word: 'TURKEY', hint: 'Large bird eaten at Thanksgiving' },
      { word: 'SCREEN', hint: 'Display surface for images' },
      { word: 'NEPHEW', hint: 'Son of your sibling' },
      { word: 'OXYGEN', hint: 'Gas we breathe to live' },
      { word: 'VOYAGE', hint: 'Long journey by sea' },
      { word: 'WIZARD', hint: 'Magical person in stories' },
      { word: 'PILLOW', hint: 'Soft object used to rest your head' },
      { word: 'LADDER', hint: 'Structure for climbing up or down' },
      { word: 'BALLET', hint: 'Graceful style of dancing' },
      { word: 'BUTTON', hint: 'Small object used to fasten clothes' },
      { word: 'BOTTLE', hint: 'Container used to hold liquids' },
      { word: 'BEACH', hint: 'Sandy area near the ocean' },
      { word: 'UMBRELLA', hint: 'Used to stay dry in the rain' },
      { word: 'MONKEY', hint: 'A playful animal with a tail' },
      { word: 'ORANGE', hint: 'A fruit and a color' },
      { word: 'PRINCE', hint: 'Son of a king or queen' },
      { word: 'MOTHER', hint: 'Female parent' },
      { word: 'SUMMER', hint: 'Warmest season of the year' },
      { word: 'NURSE', hint: 'Person who cares for the sick' },
      { word: 'FARMER', hint: 'Person who grows crops or raises animals' },
      { word: 'ISLAND', hint: 'Land surrounded by water' },
      { word: 'STUDENT', hint: 'Person who learns at school' },
      { word: 'MIRROR', hint: 'Reflective surface' },
      { word: 'BRAIN', hint: 'Organ used for thinking' },
      { word: 'TOOTH', hint: 'Hard part in your mouth used for chewing' },
      { word: 'GLOVE', hint: 'Clothing for the hands' },
      { word: 'FATHER', hint: 'Male parent' },
      { word: 'SINGER', hint: 'Person who sings' },
      { word: 'TABLE', hint: 'Furniture with a flat surface' },
      { word: 'ZEBRA', hint: 'Black and white striped animal' },
      { word: 'SPOON', hint: 'Tool for eating soup or cereal' },
      { word: 'CUSHION', hint: 'Soft pad for sitting or leaning' },
      { word: 'ENGINE', hint: 'Machine that powers vehicles' },
      { word: 'FOSSIL', hint: 'Remains of ancient life in rock' },
      { word: 'WALLET', hint: 'Small pouch for holding money' },
      { word: 'POETRY', hint: 'Writing in verse, often with rhythm' },
      { word: 'BRUSH', hint: 'Tool for cleaning or painting' },
      { word: 'CLOCK', hint: 'Device for telling time' },
      { word: 'CALENDAR', hint: 'Chart showing days and months' },
      { word: 'COMPUTER', hint: 'Electronic device for work or play' },
      { word: 'HOSPITAL', hint: 'Place for treating the sick' },
      { word: 'CHERRY', hint: 'A fruit' },
      { word: 'BARBECUE', hint: 'Outdoor meal cooked on a grill' },
      { word: 'BIRTHDAY', hint: 'Celebration of your birth' },
      { word: 'FESTIVAL', hint: 'Public celebration with events' },
      { word: 'CANADA', hint: 'A country' },
      { word: 'CLASSROOM', hint: 'Room where students learn' },
      { word: 'PANDA', hint: 'An animal (mascot in China)  ' },
      { word: 'LAPTOP', hint: 'A portable computer' },
      { word: 'TEACHER', hint: 'Person who gives lessons' },
      { word: 'BLACKBOARD', hint: 'Board used to write with chalk' },
      { word: 'BATTERY', hint: 'Provides power to devices' },
      { word: 'HEADPHONE', hint: 'Worn on the head to listen to sound' },
      { word: 'ELEVATOR', hint: 'Moves people between floors' },
      { word: 'SUBMARINE', hint: 'Underwater vehicle' },
      { word: 'THEATER', hint: 'Place to watch plays or performances' },
      { word: 'MUSEUM', hint: 'Place that displays historical or artistic items' },
      { word: 'VOLCANO', hint: 'Mountain that erupts lava' },
      { word: 'GAMBLE', hint: 'Money that is risked for possible monetary gain' },
      { word: 'FOOTBALL', hint: 'Sport with kicking a ball to score goals' },
      { word: 'BASKETBALL', hint: 'Sport of shooting a ball into a hoop' },
      { word: 'BOXING', hint: 'Fighting with the fists' },
      { word: 'LAUGHTER', hint: 'The sound you make when happy or amused' },
      { word: 'NERVOUS', hint: 'Feeling worried or anxious' },
      { word: 'BRAVERY', hint: 'Being brave, not afraid' },
      { word: 'BOTHER', hint: 'To annoy or disturb' },
      { word: 'IGNORE', hint: 'To pay no attention' },
      { word: 'OPTION', hint: 'A possible choice' },
      { word: 'BROWSE', hint: 'Look through casually' },
      { word: 'ADVICE', hint: 'Helpful recommendation' },
      { word: 'RESCUE', hint: 'To save from danger' },
      { word: 'CREATE', hint: 'To make something new' },
      { word: 'TARIFF', hint: 'A government tax on imports or exports' },
      { word: 'ESCAPE', hint: 'Get away from danger or confinement' },
      { word: 'PROCESS', hint: 'A series of steps or actions' },
      { word: 'EXAMPLE', hint: 'Something used to show or explain' },
      { word: 'CONCERN', hint: 'A feeling of worry or interest' },
      { word: 'WARNING', hint: 'Statement of potential danger' },
      { word: 'MEETING', hint: 'People gathering to discuss something' },
      { word: 'SUPPORT', hint: 'To help or hold up' },
      { word: 'PROBLEM', hint: 'Something that needs a solution' },
      { word: 'RELEASE', hint: 'To let go or make public' },
      { word: 'UPGRADE', hint: 'To improve something to a better version' },
      { word: 'CAPTURE', hint: 'To catch or take control' },
      { word: 'FORGIVE', hint: 'To stop feeling angry at someone' },
      { word: 'CONTACT', hint: 'To get in touch with someone' },
      { word: 'ROBOT', hint: 'A mechanism that can move automatically' },
      { word: 'REMOVE', hint: 'The act of taking something away' },
      { word: 'REVERSE', hint: 'To go backward or do the opposite' },
      { word: 'INSIGHT', hint: 'Clear and deep understanding of something' },
      { word: 'REVENUE', hint: 'Money earned by a business' },
      { word: 'DEADLINE', hint: 'Due date for a task or project' },
      { word: 'CONTRACT', hint: 'Legal agreement' },
      { word: 'OFFLINE', hint: 'Not connected to the internet' },
      { word: 'JUSTIFY', hint: 'To give a reason or explanation' },
      { word: 'APOLOGY', hint: 'Saying sorry for a mistake' },
      { word: 'VISITOR', hint: 'Someone who comes to see a place or person' },
      { word: 'RESERVE', hint: 'To book or keep something for future use' },
      { word: 'STRANGER', hint: 'Someone you do not know' },
      { word: 'LIBERTY', hint: 'Freedom from restriction' }
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
  const progressBarType = new URLSearchParams(window.location.search).get('type') === 'circle' ? 'circle' : 'bar';

  // 5. Component state - UPDATED WITH POPUP STATES
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [ended, setEnded] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [responses, setResponses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupAnswers, setPopupAnswers] = useState({ pleasing: null, energized: null, close: null });
  const [currentPopupCorrectCount, setCurrentPopupCorrectCount] = useState(0);
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);
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
    setIsProcessingAnswer(false); // Reset processing flag for new word
    
    if (dontKnowTimer.current) {
      clearTimeout(dontKnowTimer.current);
      dontKnowTimer.current = null;
    }
    
    return () => {
      if (dontKnowTimer.current) {
        clearTimeout(dontKnowTimer.current);
        dontKnowTimer.current = null;
      }
    };
  }, [currentIndex, currentWord]);

  // 7. Auto-check answer - UPDATED WITH POPUP LOGIC
  useEffect(() => {
    if (
      selectedLetters.length === 0 ||
      isCorrect ||
      wrongAnswer ||
      showCorrect ||
      availableLetters.length === currentWord.word.length ||
      isProcessingAnswer ||
      showPopup
    ) return;
    
    if (selectedLetters.length === currentWord.word.length) {
      const attempt = selectedLetters.map((l) => l.letter).join('');
      
      if (attempt === currentWord.word) {
        setIsProcessingAnswer(true); // Prevent multiple processing
        setIsCorrect(true);
        setScore(s => +(s + 0.04).toFixed(2));
        const newCorrectCount = correctCount + 1;
        setCorrectCount(newCorrectCount);
        
        setTimeout(() => {
          setIsCorrect(false);
          
          // Save current word response first
          const responseData = {
            word: currentWord.word,
            userAnswer: selectedLetters.map(l => l.letter).join(''),
            correct: true,
            type: 'submit',
            index: currentIndex + 1,
            correctCount: newCorrectCount,
            timestamp: Date.now(),
            urlParams: params,
          };
          setResponses(prev => [...prev, responseData]);
          sendDataToQualtrics(responseData);
          
          // Check if we need to show popup questions
          const popupTriggers = [10, 20, 30, 33, 36];
          if (popupTriggers.includes(newCorrectCount)) {
            setCurrentPopupCorrectCount(newCorrectCount);
            setShowPopup(true);
            setIsProcessingAnswer(false); // Reset processing flag
            return; // Stop here, don't continue to next word yet
          }
          
          // Check if we've reached 40 correct answers
          if (newCorrectCount >= 40) {
            setGameComplete(true);
          } else {
            // Continue to next word
            setCurrentIndex((i) => i + 1);
          }
          setIsProcessingAnswer(false); // Reset processing flag
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
  }, [selectedLetters, isCorrect, wrongAnswer, showCorrect, currentIndex, currentWord, correctCount, params, isProcessingAnswer, showPopup]);

  // 8. 当游戏完成时，通知 Qualtrics 显示下一步按钮
  useEffect(() => {
    if (gameComplete) {
      window.parent.postMessage({ type: 'showNextButton' }, '*');
    }
  }, [gameComplete]);

  // 9. Helper function to send data to Qualtrics
  const sendDataToQualtrics = (responseData) => {
    try {
      window.parent.postMessage({
        type: 'wordScrambleData',
        data: responseData
      }, '*');
    } catch (error) {
      console.log('Could not send data to parent:', error);
    }
  };

  // 10. Handlers
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
    const responseData = {
      word: currentWord.word,
      userAnswer: '',
      correct: false,
      type: 'dont_know',
      index: currentIndex + 1,
      correctCount: correctCount,
      timestamp: Date.now(),
      urlParams: params,
    };
    setResponses(prev => [...prev, responseData]);
    sendDataToQualtrics(responseData);
    const correct = currentWord.word.split('').map((l, i) => ({ letter: l, id: `correct-${i}` }));
    setSelectedLetters(correct);
    
    dontKnowTimer.current = setTimeout(() => {
      setShowCorrect(false);
      setCurrentIndex((i) => i + 1);
    }, 3000);
  };

  const handleEnd = () => {
    if (dontKnowTimer.current) clearTimeout(dontKnowTimer.current);
    const responseData = {
      word: currentWord.word,
      userAnswer: selectedLetters.map(l => l.letter).join(''),
      correct: selectedLetters.map(l => l.letter).join('') === currentWord.word,
      type: 'end',
      index: currentIndex + 1,
      correctCount: correctCount,
      timestamp: Date.now(),
      urlParams: params,
    };
    setResponses(prev => [...prev, responseData]);
    sendDataToQualtrics(responseData);
    window.parent.postMessage({ type: 'showNextButton' }, '*');
    setEnded(true);
  };

  // NEW: Handle popup responses
  const handlePopupSubmit = () => {
    if (popupAnswers.pleasing === null || popupAnswers.energized === null || popupAnswers.close === null) {
      alert('Please answer all three questions before continuing.');
      return;
    }

    // Save popup responses
    const popupResponseData = {
      type: 'popup_response',
      correctCount: currentPopupCorrectCount,
      pleasingScore: popupAnswers.pleasing,
      energizedScore: popupAnswers.energized,
      closeScore: popupAnswers.close,
      timestamp: Date.now(),
      urlParams: params,
    };
    setResponses(prev => [...prev, popupResponseData]);
    sendDataToQualtrics(popupResponseData);

    // Reset popup state
    setShowPopup(false);
    setPopupAnswers({ pleasing: null, energized: null, close: null });

    // Check if game should complete or continue
    if (currentPopupCorrectCount >= 40) {
      setGameComplete(true);
    } else {
      // Simply move to next word WITHOUT any bonus/progress changes
      // The bonus and progress were already updated when the user got the answer correct
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(responses, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "responses.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 11. Circular progress component
  const CircularProgress = ({ pct }) => {
    const r = 50;
    const c = 2 * Math.PI * r;
    const offset = c - (pct / 100) * c;
    
    return (
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto">
        <svg className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 -rotate-90" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="circle-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r={r} stroke="#ffffff" strokeWidth="20" fill="none" />
          <circle
            cx="60"
            cy="60"
            r={r}
            stroke="url(#circle-gradient)"
            strokeWidth="20"
            fill="none"
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
      </div>
    );
  };

  // NEW: Popup Questions Component
  const PopupQuestions = () => {
    return (
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Quick Questions</h2>
        
        {/* Question 1 */}
        <div className="mb-8">
          <p className="text-gray-700 mb-4 text-sm sm:text-base font-bold text-left">
            Before continuing, how pleasing is it to see your current progress?
          </p>
          <div className="flex justify-between items-center mb-2 text-xs sm:text-sm">
            <span className="text-gray-600">Not at all pleasing</span>
            <span className="text-gray-600">Extremely pleasing</span>
          </div>
          <div className="flex justify-between">
            {[1,2,3,4,5,6,7,8,9].map(num => (
              <button
                key={num}
                onClick={() => setPopupAnswers(prev => ({...prev, pleasing: num}))}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-all text-xs sm:text-sm ${
                  popupAnswers.pleasing === num 
                    ? 'bg-purple-500 text-white border-purple-500' 
                    : 'border-gray-300 hover:border-purple-300'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
        
        {/* Question 2 */}
        <div className="mb-8">
          <p className="text-gray-700 mb-4 text-sm sm:text-base font-bold text-left">
            Right now, how energized do you feel?
          </p>
          <div className="flex justify-between items-center mb-2 text-xs sm:text-sm">
            <span className="text-gray-600">Not energized at all</span>
            <span className="text-gray-600">Extremely energized</span>
          </div>
          <div className="flex justify-between">
            {[1,2,3,4,5,6,7,8,9].map(num => (
              <button
                key={num}
                onClick={() => setPopupAnswers(prev => ({...prev, energized: num}))}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-all text-xs sm:text-sm ${
                  popupAnswers.energized === num 
                    ? 'bg-purple-500 text-white border-purple-500' 
                    : 'border-gray-300 hover:border-purple-300'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
        
        {/* Question 3 */}
        <div className="mb-8">
          <p className="text-gray-700 mb-4 text-sm sm:text-base font-bold text-left">
            At this moment, how close do you feel to completing your goal of spelling 40 words?
          </p>
          <div className="flex justify-between items-center mb-2 text-xs sm:text-sm">
            <span className="text-gray-600">Very far away</span>
            <span className="text-gray-600">Very close</span>
          </div>
          <div className="flex justify-between">
            {[1,2,3,4,5,6,7,8,9].map(num => (
              <button
                key={num}
                onClick={() => setPopupAnswers(prev => ({...prev, close: num}))}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-all text-xs sm:text-sm ${
                  popupAnswers.close === num 
                    ? 'bg-purple-500 text-white border-purple-500' 
                    : 'border-gray-300 hover:border-purple-300'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
        
        {/* Submit button */}
        <div className="text-center">
          <button
            onClick={handlePopupSubmit}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm sm:text-base"
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  // 12. End screen
  if (ended) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 max-w-md w-full text-center shadow-md">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4 text-gray-800">Thanks for participating!</h2>
        </div>
      </div>
    );
  }

  // 13. Game complete screen
  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 max-w-md w-full text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">Game Complete</h1>
          <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-gray-800">You have correctly spelled all 40 words.</p>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600">Thanks for participating!</p>
          <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500">Click the arrow below to continue to the next page.</p>
          {params.admin === '1' && (
            <button
              onClick={handleExport}
              className="px-3 py-2 bg-blue-500 text-white rounded mt-2 sm:mt-4 text-sm"
            >
              导出数据
            </button>
          )}
        </div>
      </div>
    );
  }

  // 14. Main game UI
  const percentComplete = (correctCount / 40) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2 sm:mb-4">
            Word Scramble Game
          </h1>
          <div className="flex justify-end mb-2 sm:mb-4">
            <span className="text-green-600 font-bold text-sm sm:text-base">${score.toFixed(2)}</span>
          </div>
        </div>

        {/* Progress (hidden on first correct answer, not first word) */}
        {correctCount > 0 && (
          <>
            <div className="mb-2">
              {progressBarType === 'bar' ? (
                <div className="w-full bg-white rounded-full h-3 sm:h-4">
                  <div
                    className="h-3 sm:h-4 rounded-full transition-all duration-500 bg-gradient-to-r from-purple-500 to-blue-500"
                    style={{ width: `${percentComplete}%` }}
                  />
                </div>
              ) : (
                <CircularProgress pct={percentComplete} />
              )}
            </div>
            <div className="text-center mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-gray-600">Your progress is shown above</span>
            </div>
          </>
        )}

        {/* Show popup questions in-page OR normal game content */}
        {showPopup ? (
          <PopupQuestions />
        ) : (
          <>
            {/* Hint */}
            <div className="text-center mb-4 sm:mb-6">
              <p className="text-gray-700 text-sm sm:text-base md:text-lg font-medium px-2">{currentWord.hint}</p>
            </div>

            {/* Answer Boxes */}
            <div className="mb-4 sm:mb-6 flex justify-center">
              <div className="flex flex-wrap gap-1 sm:gap-2 max-w-4xl justify-center">
                {Array.from({ length: currentWord.word.length }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-8 sm:w-10 sm:h-10 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${
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
                    {selectedLetters[idx] && (
                      <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">
                        {selectedLetters[idx].letter}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Letter Tiles */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-3 sm:mb-4">
              {availableLetters.map((l) => (
                <button
                  key={l.id}
                  onClick={() => pickLetter(l)}
                  disabled={isCorrect || wrongAnswer || showCorrect}
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white border-2 border-gray-300 rounded-xl text-lg sm:text-xl md:text-2xl font-bold transition-all duration-200 ${
                    isCorrect || wrongAnswer || showCorrect
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:border-purple-500 hover:bg-purple-50 hover:scale-105 cursor-pointer'
                  }`}
                >
                  {l.letter}
                </button>
              ))}
            </div>

            {/* Instructions */}
            <p className="text-center text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 px-2">
              Click letters to form the correct word • Click selected letters to remove them
            </p>

            {/* Actions (bottom) */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-2">
              <button
                onClick={handleDontKnow}
                className="px-3 py-2 bg-yellow-400 text-white rounded text-sm sm:text-base"
              >
                I Don't Know
              </button>
              <button
                onClick={handleEnd}
                className="px-3 py-2 bg-red-500 text-white rounded text-sm sm:text-base"
              >
                End
              </button>
            </div>

            {/* Feedback */}
            {wrongAnswer && (
              <div className="text-center mt-3 sm:mt-4">
                <p className="text-red-700 font-semibold text-sm sm:text-base">Try again!</p>
              </div>
            )}
            {isCorrect && (
              <div className="text-center mt-3 sm:mt-4">
                <p className="text-green-700 font-semibold text-sm sm:text-base">Correct! +$0.04 bonus</p>
              </div>
            )}
            {showCorrect && (
              <div className="text-center mt-3 sm:mt-4">
                <p className="text-blue-700 font-semibold text-sm sm:text-base">This is the correct answer. (No bonus)</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WordScrambleGame;