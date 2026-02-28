'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Info, AlertTriangle, Lightbulb, Users,
  Search, ShieldCheck, Globe, History, Leaf, Database, Layers,
  Compass, Zap, BookOpen, Microscope, Book, CheckCircle, HelpCircle, MessageCircle, Volume2
} from 'lucide-react';

interface Slide {
  id: number;
  bg: string;
  layout: string;
  steps: number;
  title?: string;
  subtitle?: string;
  footer?: string;
  header?: string;
  subHeader?: string;
  questions?: (string | { q: string; link?: number; icon?: React.ReactNode })[];
  facts?: { label: string; text: string }[];
  content?: { title: string; text: string; highlight?: boolean }[];
  task?: string;
  prompts?: string[];
  icon?: React.ReactNode;
  question?: string;
  answer?: string;
  highlights?: string[];
  vocab?: { word: string; def: string }[];
  vocabList?: { icon: string; zh: string; en: string }[];
  wordBank?: string[];
  instruction?: string;
  points?: { title: string; text: string; icon: React.ReactNode }[];
  closing?: string;
  scenarios?: { q: string; keywords: string[]; icon: React.ReactNode; possibleAnswer?: string }[];
  returnTo?: number;
  colorTheme?: 'teal' | 'violet' | 'pink' | 'amber' | 'blue' | 'indigo' | 'emerald' | 'orange' | 'cyan' | 'red';
  audio?: string;
}

const getThemeColors = (slide: Slide) => {
  const themes = {
    teal: {
      primary: 'text-teal-400',
      bg: 'bg-teal-500',
      border: 'border-teal-500/30',
      glow: 'shadow-teal-500/20',
      gradient: 'from-teal-400 to-cyan-500',
      highlight: 'bg-teal-500/10',
      accent: 'teal-500'
    },
    violet: {
      primary: 'text-violet-400',
      bg: 'bg-violet-500',
      border: 'border-violet-500/30',
      glow: 'shadow-violet-500/20',
      gradient: 'from-violet-400 to-purple-500',
      highlight: 'bg-violet-500/10',
      accent: 'violet-500'
    },
    pink: {
      primary: 'text-pink-400',
      bg: 'bg-pink-500',
      border: 'border-pink-500/30',
      glow: 'shadow-pink-500/20',
      gradient: 'from-pink-400 to-rose-500',
      highlight: 'bg-pink-500/10',
      accent: 'pink-500'
    },
    amber: {
      primary: 'text-amber-400',
      bg: 'bg-amber-500',
      border: 'border-amber-500/30',
      glow: 'shadow-amber-500/20',
      gradient: 'from-amber-400 to-orange-500',
      highlight: 'bg-amber-500/10',
      accent: 'amber-500'
    },
    blue: {
      primary: 'text-blue-400',
      bg: 'bg-blue-500',
      border: 'border-blue-500/30',
      glow: 'shadow-blue-500/20',
      gradient: 'from-blue-400 to-indigo-500',
      highlight: 'bg-blue-500/10',
      accent: 'blue-500'
    },
    indigo: {
      primary: 'text-indigo-400',
      bg: 'bg-indigo-500',
      border: 'border-indigo-500/30',
      glow: 'shadow-indigo-500/20',
      gradient: 'from-indigo-400 to-violet-500',
      highlight: 'bg-indigo-500/10',
      accent: 'indigo-500'
    },
    emerald: {
      primary: 'text-emerald-400',
      bg: 'bg-emerald-500',
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-500/20',
      gradient: 'from-emerald-400 to-teal-500',
      highlight: 'bg-emerald-500/10',
      accent: 'emerald-500'
    },
    orange: {
      primary: 'text-orange-400',
      bg: 'bg-orange-500',
      border: 'border-orange-500/30',
      glow: 'shadow-orange-500/20',
      gradient: 'from-orange-400 to-red-500',
      highlight: 'bg-orange-500/10',
      accent: 'orange-500'
    },
    red: {
      primary: 'text-red-400',
      bg: 'bg-red-500',
      border: 'border-red-500/30',
      glow: 'shadow-red-500/20',
      gradient: 'from-red-400 to-orange-600',
      highlight: 'bg-red-500/10',
      accent: 'red-500'
    },
    cyan: {
      primary: 'text-cyan-400',
      bg: 'bg-cyan-500',
      border: 'border-cyan-500/30',
      glow: 'shadow-cyan-500/20',
      gradient: 'from-cyan-400 to-blue-500',
      highlight: 'bg-cyan-500/10',
      accent: 'cyan-500'
    }
  };

  if (slide.colorTheme && themes[slide.colorTheme]) {
    return themes[slide.colorTheme];
  }

  // Auto-detect based on layout or icons
  if (slide.layout === 'title') return themes.orange;
  if (slide.layout === 'vocabCheck' || slide.layout === 'fillBlanks') return themes.emerald;
  if (slide.layout === 'summary') return themes.orange;

  return themes.orange; // default for space theme
};

const slides: Slide[] = [
  {
    id: 1,
    bg: '/images/slide1.png',
    title: 'LIVING IN SPACE',
    subtitle: 'Humanity\'s Journey to the Stars',
    footer: 'Pre-reading Module',
    layout: 'title',
    steps: 3,
    colorTheme: 'orange'
  },
  {
    id: 2,
    bg: '/images/slide2.png',
    header: 'Think and Share',
    questions: [
      { q: 'If you were offered a one-way ticket to live on Mars, would you take it? Why or why not?', link: 2 },
      { q: 'What are the biggest challenges humans might face when living on another planet?', link: 3 }
    ],
    layout: 'questions',
    steps: 3,
    colorTheme: 'blue'
  },
  {
    id: 3,
    bg: '/images/slide3.png',
    header: 'Earth\'s Closest Neighbor',
    subHeader: 'Our First Stop: The Moon',
    facts: [
      { label: 'The Moon', text: 'It is the only place beyond Earth where humans have actually set foot.' },
      { label: 'Distance', text: 'It takes about three days to travel from Earth to the Moon.' },
      { label: 'Gateway', text: 'Scientists see the Moon as a "stepping stone" for deeper space exploration.' }
    ],
    layout: 'history',
    steps: 4,
    returnTo: 1,
    colorTheme: 'cyan'
  },
  {
    id: 4,
    bg: '/images/slide4.png',
    header: 'The Red Frontier',
    subHeader: 'Why Mars?',
    facts: [
      { label: 'Environment', text: 'Mars has a thin atmosphere and is much colder than Earth, but it\'s the most livable planet nearby.' },
      { label: 'Water', text: 'Evidence suggests Mars once had liquid water, which is essential for life.' },
      { label: 'The Dream', text: 'Visionaries like Elon Musk want to build a self-sustaining city of a million people there.' }
    ],
    layout: 'history',
    steps: 4,
    returnTo: 1,
    colorTheme: 'red'
  },
  {
    id: 5,
    bg: '/images/slide5.png',
    header: 'Look and Predict',
    task: 'Look at the title "Living in Space" and discuss with a partner:',
    prompts: [
      'Do you think living in space is a necessity for human survival or just a dream?',
      'Which famous scientist do you think the article will mention?',
      'What kind of "concerns" or problems might the author discuss regarding space travel?'
    ],
    layout: 'predict',
    steps: 3,
    colorTheme: 'amber'
  },
  {
    id: 6,
    bg: '/images/reading_main.png',
    header: 'Reading: Living in Space',
    audio: '/images/living_in_space.wav',
    icon: <Volume2 className="text-orange-400" size={32} />,
    question: 'How will humanity establish colonies in space?',
    answer: 'By building stations on the moon and later Mars, humans aim to create independent colonies. Visionaries like Elon Musk and scientists like Robert Zubrin believe this is essential for our survival.',
    highlights: ['independent colonies', 'colonize', 'survival', 'mission'],
    layout: 'qa',
    steps: 3,
    colorTheme: 'orange'
  },
  {
    id: 7,
    bg: '/images/slide6.png',
    header: 'Hawking\'s Vision',
    icon: <Search className="text-orange-400" size={32} />,
    question: 'What did Stephen Hawking believe humans must do to ensure our future is safe?',
    answer: 'He believed that we need to spread out into space and establish independent colonies.',
    highlights: ['establish independent colonies'],
    vocab: [
      { word: 'establish independent colonies', def: 'To create self-governing communities in a new place.' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'orange'
  },
  {
    id: 8,
    bg: '/images/slide7.png',
    header: 'Stepping Stone: The Moon',
    icon: <Globe className="text-blue-400" size={32} />,
    question: 'Why are several countries planning to build space stations on the Moon?',
    answer: 'These stations will prepare humans to visit and later live on Mars or other planets.',
    highlights: ['prepare humans to'],
    vocab: [
      { word: 'prepare sb to do', def: 'To get someone ready for a future activity.' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'blue'
  },
  {
    id: 9,
    bg: '/images/slide8.png',
    header: 'Colonizing the Red Planet',
    icon: <Layers className="text-orange-500" size={32} />,
    question: 'Why does Robert Zubrin think humans should colonize Mars?',
    answer: 'He believes it will show if humans can survive in a very different environment and create new societies.',
    highlights: ['colonize', 'environment'],
    vocab: [
      { word: 'colonize', def: 'To send people to live in and take control of a new area.' },
      { word: 'environment', def: 'The natural conditions in which a person or animal lives.' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'orange'
  },
  {
    id: 10,
    bg: '/images/slide9.png',
    header: 'Benefits for Earth',
    icon: <Zap className="text-amber-400" size={32} />,
    question: 'How will space exploration help the people who stay on Earth?',
    answer: 'Scientific advances in medicine and technology made in space will benefit people here at home.',
    highlights: ['advances', 'benefit'],
    vocab: [
      { word: 'advances', def: 'Improvements or developments in something.' },
      { word: 'benefit', def: 'To be useful or helpful to someone.' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'amber'
  },
  {
    id: 11,
    bg: '/images/slide10.png',
    header: 'A Million-Person Goal',
    icon: <Compass className="text-cyan-400" size={32} />,
    question: 'What is Elon Musk\'s long-term goal for Mars?',
    answer: 'He wants to put one million people on the planet instead of sending just "one little mission.".',
    highlights: ['long-term goal', 'mission'],
    vocab: [
      { word: 'long-term goal', def: 'Something you want to achieve over a long period of time.' },
      { word: 'mission', def: 'A specific task or journey into space.' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'cyan'
  },
  {
    id: 12,
    bg: '/images/slide11.png',
    header: 'Backup Plan & High Costs',
    icon: <ShieldCheck className="text-emerald-400" size={32} />,
    question: 'Why does SpaceX want to move people to Mars, and what is one major argument against it?',
    answer: 'They want a backup in case something bad happens on Earth. In addition, many people say it is too expensive.',
    highlights: ['in case', 'In addition'],
    vocab: [
      { word: 'in case', def: 'Because of the possibility of something happening.' },
      { word: 'In addition', def: 'Used to add another piece of information.' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'emerald'
  },
  {
    id: 13,
    bg: '/images/slide12.png',
    header: 'Dangerous Conditions',
    icon: <AlertTriangle className="text-red-400" size={32} />,
    question: 'What physical dangers would humans face on the Moon\'s surface?',
    answer: 'The sun\'s rays are extremely dangerous, so people would have to stay indoors most of the time.',
    highlights: ['surface', 'rays'],
    vocab: [
      { word: 'surface', def: 'The outside or top layer of something.' },
      { word: 'rays', def: 'Narrow beams of energy from the sun.' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'red'
  },
  {
    id: 14,
    bg: '/images/slide13.png',
    header: 'Certainty & New Cultures',
    icon: <MessageCircle className="text-emerald-400" size={32} />,
    question: 'Despite these concerns, what does the author predict for the future?',
    answer: 'Sending people into space seems certain, and we might see new human cultures on other planets.',
    highlights: ['concerns', 'cultures'],
    vocab: [
      { word: 'concerns', def: 'Worries or doubts about a situation.' },
      { word: 'cultures', def: 'The ideas and social behavior of a group of people.' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'emerald'
  },
  {
    id: 15,
    bg: '/images/slide14.png',
    header: 'Vocabulary Checkpoint 1',
    vocabList: [
      { icon: '🏘️', zh: '建立独立殖民地', en: 'establish independent colonies' },
      { icon: '🎓', zh: '准备做...', en: 'prepare sb to do' },
      { icon: '🚩', zh: '殖民/开拓', en: 'colonize' },
      { icon: '🌍', zh: '环境', en: 'environment' },
      { icon: '📈', zh: '进步/进展', en: 'advances' },
      { icon: '🎁', zh: '获益/对...有益', en: 'benefit' }
    ],
    layout: 'vocabCheck',
    steps: 7,
    colorTheme: 'emerald'
  },
  {
    id: 16,
    bg: '/images/slide15.png',
    header: 'Vocabulary Checkpoint 2',
    vocabList: [
      { icon: '🚀', zh: '任务/使命', en: 'mission' },
      { icon: '🎯', zh: '长期目标', en: 'long-term goal' },
      { icon: '🛡️', zh: '以防/万一', en: 'in case' },
      { icon: '➕', zh: '此外/而且', en: 'In addition' },
      { icon: '🌑', zh: '表面', en: 'surface' },
      { icon: '❓', zh: '担忧/顾虑', en: 'concerns' },
      { icon: '🎭', zh: '文化', en: 'cultures' },
      { icon: '☀️', zh: '射线/光线', en: 'rays' }
    ],
    layout: 'vocabCheck',
    steps: 9,
    colorTheme: 'emerald'
  },
  {
    id: 17,
    bg: '/images/slide16.png',
    header: 'Practice: The Future in Space',
    instruction: 'Fill in the blanks using the correct form of the words from the box.',
    wordBank: ['benefit', 'concerns', 'surface', 'colonize', 'advances', 'long-term goal', 'environment', 'in case'],
    layout: 'fillBlanks',
    steps: 9,
    colorTheme: 'emerald'
  },
  {
    id: 18,
    bg: '/images/slide3.png',
    header: 'Scenario 1: Moon Base',
    scenarios: [
      {
        q: "Several countries want to build space stations on the Moon. What is the reason?", 
        keywords: ['prepare sb to do', 'surface'],
        icon: <Globe className="text-blue-400" />,
        possibleAnswer: "They want to prepare humans to live on other planets while studying the Moon's surface."
      }
    ],
    layout: 'scenario',
    steps: 3,
    colorTheme: 'blue'
  },
  {
    id: 19,
    bg: '/images/slide4.png',
    header: 'Scenario 2: Mars Colony',
    scenarios: [
      {
        q: "Elon Musk wants to put one million people on Mars. What is his motivation?", 
        keywords: ['long-term goal', 'in case'],
        icon: <Layers className="text-orange-500" />,
        possibleAnswer: "His long-term goal is to build a city there in case something bad happens to us on Earth."
      }
    ],
    layout: 'scenario',
    steps: 3,
    colorTheme: 'orange'
  },
  {
    id: 20,
    bg: '/images/lunar_city.png',
    header: 'Scenario 3: New Society',
    scenarios: [
      {
        q: "Humans have finally moved into space. What will we see in the future?", 
        keywords: ['cultures', 'eventually'],
        icon: <Users className="text-emerald-400" />,
        possibleAnswer: "We will eventually create new human societies and cultures on other planets."
      }
    ],
    layout: 'scenario',
    steps: 3,
    colorTheme: 'emerald'
  },
  {
    id: 21,
    bg: '/images/slide17.png',
    header: 'Beyond the Stars',
    icon: <MessageCircle className="text-cyan-400" size={32} />,
    questions: [
      { q: "If we build a city on Mars, should we keep Earth's laws or create a whole new system?", icon: <ShieldCheck className="text-orange-400" /> },
      { q: "Do you think spending billions on space is better than spending it on fixing problems on Earth?", icon: <Globe className="text-blue-400" /> }
    ],
    layout: 'discussion',
    steps: 3,
    colorTheme: 'cyan'
  },
  {
    id: 22,
    bg: '/images/slide18.png',
    header: 'Summary: The Final Frontier',
    points: [
      { title: 'Survival', text: 'Expanding into space is an essential backup plan for humanity.', icon: <CheckCircle className="text-orange-400" /> },
      { title: 'Progress', text: 'Space technology brings major medical and technical benefits to Earth.', icon: <Microscope className="text-blue-400" /> },
      { title: 'Challenges', text: 'High costs and dangerous environments remain our biggest hurdles.', icon: <Zap className="text-red-400" /> }
    ],
    closing: "Space is for everybody. It's our new frontier out there.",
    layout: 'summary',
    steps: 5,
    colorTheme: 'orange'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (slides[currentSlide].audio && currentStep === 1) {
      if (audioRef.current) {
        audioRef.current.src = slides[currentSlide].audio!;
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
    }
  }, [currentSlide, currentStep]);

  const nextAction = useCallback(() => {
    const slide = slides[currentSlide];
    if (currentStep < slide.steps) {
      setCurrentStep(prev => prev + 1);
    } else if (currentSlide < slides.length - 1) {
      let nextIndex = currentSlide + 1;
      // Skip hidden detail slides (index 2 and 3) in normal flow
      if (currentSlide === 1) {
        nextIndex = 4;
      }
      setCurrentSlide(nextIndex);
      setCurrentStep(0);
    }
  }, [currentSlide, currentStep]);

  const prevAction = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else if (currentSlide > 0) {
      let prevIndex = currentSlide - 1;
      // Skip hidden detail slides when coming back from slide index 4
      if (currentSlide === 4) {
        prevIndex = 1;
      }
      const prevSlide = slides[prevIndex];
      setCurrentSlide(prevIndex);
      setCurrentStep(prevSlide.steps);
    }
  }, [currentSlide, currentStep]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setCurrentStep(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown' || e.key === 'ArrowDown') nextAction();
      if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp' || e.key === 'ArrowUp') prevAction();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextAction, prevAction]);

  const slide = slides[currentSlide];
  const theme = getThemeColors(slide);

  const highlightText = (text: string, words: string[] | undefined) => {
    if (!words || words.length === 0) return text;
    let result = text;
    // Sort words by length descending to avoid partial matches
    const sortedWords = [...words].sort((a, b) => b.length - a.length);
    
    sortedWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      result = result.replace(regex, (match) => `<span class="${theme.primary} font-black underline decoration-current/50 decoration-4 underline-offset-4">${match}</span>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <main className={`relative w-screen h-screen overflow-hidden bg-[#0a0a0c] text-white font-sans selection:${theme.bg} selection:text-white cursor-pointer`} onClick={nextAction}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(10,10,12,0.95) 100%), url(${slide.bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-6 md:px-12 h-full flex flex-col justify-center items-center text-center relative z-10">
            
            {slide.layout === 'title' && (
              <div className="relative group">
                {currentStep >= 1 && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient} rounded-3xl blur opacity-30`}></div>
                    <div className="relative px-8 py-12 md:px-20 md:py-24 bg-black/50 backdrop-blur-3xl rounded-3xl border border-white/10 ring-1 ring-white/20">
                      <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-6xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-6">{slide.title}</motion.h1>
                      {currentStep >= 2 && <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className={`h-1 w-24 ${theme.bg} mx-auto mb-8`} />}
                      {currentStep >= 2 && <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-xl md:text-3xl font-medium ${theme.primary}/90 uppercase tracking-[0.3em] mb-12`}>{slide.subtitle}</motion.p>}
                      {currentStep >= 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-[0.2em] text-gray-400 uppercase"><Info size={14} className={theme.primary} />{slide.footer}</motion.div>}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {slide.layout === 'questions' && (
              <div className="max-w-4xl w-full text-left">
                {currentStep >= 1 && <motion.h2 initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-5xl md:text-6xl font-black tracking-tight text-white mb-12 flex items-center gap-4"><Users className={theme.primary} size={32} />{slide.header}</motion.h2>}
                <div className="grid gap-6">
                  {slide.questions?.map((q, i) => currentStep >= i + 2 && (
                    <motion.div 
                      key={i} 
                      initial={{ x: 50, opacity: 0 }} 
                      animate={{ x: 0, opacity: 1 }} 
                      onClick={(e) => { 
                        if (typeof q !== 'string' && q.link !== undefined) {
                          e.stopPropagation();
                          goToSlide(q.link);
                        }
                      }}
                      className={`relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 ${typeof q !== 'string' && q.link !== undefined ? 'cursor-pointer hover:bg-white/10 group' : ''}`}
                    >
                      <p className="text-2xl italic text-gray-200">"{typeof q === 'string' ? q : q.q}"</p>
                      {typeof q !== 'string' && q.link !== undefined && (
                        <div className={`mt-4 flex items-center gap-2 ${theme.primary} text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity`}>
                          Explore more <ChevronRight size={16} />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {slide.layout === 'qa' && (
              <div className="max-w-5xl w-full text-left">
                {currentStep >= 1 && <motion.h2 initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-12 flex items-center gap-6"><div className="p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">{slide.icon}</div>{slide.header}</motion.h2>}
                <div className="space-y-8">
                  {currentStep >= 2 && <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="p-8 md:p-12 bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/10 shadow-xl"><p className="text-3xl md:text-4xl font-light text-white leading-tight">{highlightText(slide.question!, slide.highlights)}</p></motion.div>}
                  {currentStep >= 3 && <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className={`p-8 md:p-12 ${theme.highlight} backdrop-blur-3xl rounded-[40px] border ${theme.border} ${theme.glow} shadow-2xl`}><p className="text-2xl md:text-3xl font-medium text-gray-100 leading-relaxed">{highlightText(slide.answer!, slide.highlights)}</p></motion.div>}
                  {currentStep >= 4 && slide.vocab && (
                    <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-10 bg-black/40 backdrop-blur-2xl rounded-[32px] border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-left">
                      {slide.vocab.map((v, i) => (<div key={i} className="flex flex-col gap-2"><span className={`${theme.primary} font-black tracking-wide text-3xl`}>{v.word}</span><span className="text-gray-300 text-xl leading-snug">{v.def}</span></div>))}
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {slide.layout === 'vocabCheck' && (
              <div className="max-w-6xl w-full">
                {currentStep >= 1 && <motion.h2 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-5xl md:text-7xl font-black mb-16 tracking-tighter ${theme.primary}`}>{slide.header}</motion.h2>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  {slide.vocabList?.map((item, i) => (
                    currentStep >= 1 && (
                      <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
                        <span className="text-4xl">{item.icon}</span>
                        <div className="flex-1 flex justify-between items-center pr-4 border-l border-white/10 pl-6">
                          <span className="text-2xl text-gray-100 font-bold">{item.zh}</span>
                          <AnimatePresence>
                            {currentStep >= i + 2 && <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`text-4xl font-black ${theme.primary} tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]`}>{item.en}</motion.span>}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )
                  ))}
                </div>
              </div>
            )}

            {slide.layout === 'fillBlanks' && (
              <div className="max-w-6xl w-full text-left overflow-y-auto max-h-[90vh] py-8">
                {currentStep >= 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
                    <h2 className="text-5xl font-black mb-4">{slide.header}</h2>
                    <p className={`${theme.primary} font-bold uppercase tracking-widest text-sm mb-4`}>{slide.instruction}</p>
                    <div className="flex flex-wrap gap-3 p-6 bg-white/5 rounded-2xl border border-white/10 mb-6 backdrop-blur-sm shadow-xl">
                      <span className="text-white font-black mr-2 text-lg">Word Bank:</span>
                      {slide.wordBank?.map((word, i) => (
                        <span key={i} className={`px-4 py-2 ${theme.highlight} border ${theme.border} rounded-xl ${theme.primary} font-black text-xl tracking-wide`}>{word}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
                {currentStep >= 1 && (
                  <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white/5 backdrop-blur-3xl p-10 rounded-[40px] border border-white/10 shadow-2xl relative">
                    <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-200">
                      Many scientists believe we should (1) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 2 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>colonize</span> other planets to ensure human survival. Although the space (2) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 3 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>environment</span> is harsh, technical (3) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 4 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>advances</span> will help us live there. This work will (4) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 5 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>benefit</span> everyone on Earth. Elon Musk's (5) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 6 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>long-term goal</span> is to build a city on Mars (6) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 7 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>in case</span> something happens to Earth. However, we must survive on the dangerous (7) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 8 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>surface</span> of the moon first. Despite these (8) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 9 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>concerns</span>, sending people into space seems certain.
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {slide.layout === 'scenario' && (
              <div className="max-w-5xl w-full text-left">
                {currentStep >= 1 && <motion.h2 initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-5xl md:text-7xl font-black mb-16 tracking-tighter ${theme.primary} flex items-center gap-6`}>{slide.header}</motion.h2>}
                <div className="space-y-8">
                  {slide.scenarios?.map((s, i) => (
                    <div key={i} className="space-y-8">
                      {currentStep >= 1 && (
                        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="p-10 bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 flex gap-8 items-start shadow-xl">
                          <div className="p-4 bg-white/5 rounded-2xl">{s.icon}</div>
                          <p className="text-3xl md:text-4xl font-light leading-tight text-white">{s.q}</p>
                        </motion.div>
                      )}
                      {currentStep >= 2 && (
                        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`flex flex-wrap gap-6 items-center p-8 ${theme.highlight} border ${theme.border} rounded-3xl backdrop-blur-md`}>
                          <span className={`${theme.primary} font-black uppercase tracking-widest text-xl`}>Keywords to use:</span>
                          {s.keywords.map((word, idx) => (
                            <span key={idx} className="px-6 py-3 bg-black/40 rounded-xl text-white font-bold text-2xl border border-white/10">{word}</span>
                          ))}
                        </motion.div>
                      )}
                      {currentStep >= 3 && (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`p-10 ${theme.highlight} rounded-[40px] border ${theme.border} ${theme.glow}`}>
                           <span className={`${theme.primary} font-black uppercase tracking-widest text-sm mb-4 block`}>Possible Answer:</span>
                           <p className="text-3xl italic font-medium text-white leading-relaxed">{highlightText(s.possibleAnswer!, s.keywords)}</p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.layout === 'history' && (
              <div className="max-w-5xl w-full text-left">
                {currentStep >= 1 && (
                  <div className="mb-12 flex justify-between items-end">
                    <div>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${theme.primary} font-bold tracking-[0.3em] uppercase text-sm mb-2 block`}>{slide.subHeader}</motion.span>
                      <motion.h2 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl md:text-7xl font-black tracking-tighter">{slide.header}</motion.h2>
                    </div>
                    {slide.returnTo !== undefined && (
                      <motion.button 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        onClick={(e) => { e.stopPropagation(); goToSlide(slide.returnTo!); }}
                        className={`px-6 py-3 ${theme.highlight} hover:bg-white/10 border ${theme.border} rounded-2xl ${theme.primary} font-black flex items-center gap-2 transition-all mb-4 outline-none focus:ring-4 focus:ring-current/50 focus:border-current`}
                      >
                        <ChevronLeft size={20} /> Back to Menu
                      </motion.button>
                    )}
                  </div>
                )}
                <div className="grid md:grid-cols-3 gap-6">
                  {slide.facts?.map((f, i) => currentStep >= i + 2 && (
                    <motion.div key={i} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl hover:bg-white/10 transition-colors">
                      <div className={`absolute top-0 left-0 w-1 h-full ${theme.bg} shadow-[0_0_15px_rgba(255,255,255,0.3)]`}></div>
                      <span className={`text-xs font-black ${theme.primary} uppercase tracking-widest mb-6 block opacity-70`}>{f.label}</span>
                      <p className="text-xl md:text-2xl font-medium leading-snug text-gray-100">{f.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {slide.layout === 'predict' && (
              <div className="max-w-5xl w-full text-left">
                {currentStep >= 1 && <motion.h2 initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-6xl md:text-8xl font-black italic tracking-tighter bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-12 flex items-center gap-6`}>{slide.icon}{slide.header}</motion.h2>}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {currentStep >= 2 && <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-white/5 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"><p className="text-3xl font-light text-white leading-tight mb-0">{slide.task}</p></motion.div>}
                  {currentStep >= 3 && (
                    <ul className="space-y-4">
                      {slide.prompts?.map((p, i) => (
                        <motion.li key={i} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-6 p-5 bg-white/5 rounded-2xl border border-white/5 shadow-md">
                          <span className={`flex-shrink-0 w-10 h-10 rounded-full ${theme.highlight} border ${theme.border} flex items-center justify-center font-black ${theme.primary}`}>{i + 1}</span>
                          <p className="text-xl font-medium text-gray-200">{p}</p>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {slide.layout === 'discussion' && (
              <div className="max-w-5xl w-full text-left">
                {currentStep >= 1 && <motion.h2 initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl md:text-8xl font-black mb-16 tracking-tighter flex items-center gap-6">{slide.icon}{slide.header}</motion.h2>}
                <div className="space-y-8">
                  {slide.questions?.map((q, i) => currentStep >= i + 2 && (
                    <motion.div key={i} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="p-10 bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 flex gap-8 items-start shadow-xl">
                      {typeof q !== 'string' && q.icon && <div className="p-4 bg-white/5 rounded-2xl">{q.icon}</div>}
                      <p className="text-3xl font-light leading-tight text-white">{typeof q === 'string' ? q : q.q}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {slide.layout === 'summary' && (
              <div className="max-w-5xl w-full text-left">
                {currentStep >= 1 && <motion.h2 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`text-6xl md:text-8xl font-black mb-16 tracking-tighter bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>{slide.header}</motion.h2>}
                <div className="grid gap-6 mb-16">
                  {slide.points?.map((p, i) => currentStep >= i + 2 && (
                    <motion.div key={i} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex gap-6 items-center p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl">
                      <div className="p-3 bg-white/5 rounded-2xl">{p.icon}</div>
                      <div>
                        <h3 className={`text-2xl font-black ${theme.primary} uppercase tracking-widest`}>{p.title}</h3>
                        <p className="text-xl text-gray-300">{p.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {currentStep >= 5 && <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center"><p className={`text-3xl font-black italic ${theme.primary} ${theme.glow} px-8 py-4 ${theme.highlight} border ${theme.border} rounded-full inline-block`}>{slide.closing}</p></motion.div>}
              </div>
            )}
          </div>

          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
            <div className={`absolute -top-1/4 -left-1/4 w-1/2 h-1/2 ${theme.bg}/10 blur-[120px] rounded-full animate-pulse`}></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-white/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-1/4 z-50 px-4 group opacity-40 hover:opacity-100 transition-opacity duration-500">
        <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
          <motion.div 
            className={`absolute top-0 left-0 h-full ${theme.bg}/60`}
            initial={false}
            animate={{ width: `${(currentSlide / (slides.length - 1)) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-0">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goToSlide(i); }}
              className="w-3 h-3 rounded-full transition-all duration-300 relative group/dot"
            >
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${i <= currentSlide ? `${theme.primary}/60 scale-75` : 'bg-white/10 scale-50 group-hover/dot:scale-100 group-hover/dot:bg-white/30'}`} />
              {i === currentSlide && <div className={`absolute -inset-0.5 ${theme.bg}/20 rounded-full blur-sm`} />}
              <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 backdrop-blur-md rounded text-[10px] font-mono ${theme.primary}/80 border border-white/10 opacity-0 group-hover/dot:opacity-100 transition-opacity pointer-events-none whitespace-nowrap`}>P.{i + 1}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 left-12 z-50">
        <button onClick={(e) => { e.stopPropagation(); prevAction(); }} className="group relative p-5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-2xl">
          <ChevronLeft size={36} className={`relative z-10 text-gray-400 group-hover:${theme.primary} transition-colors`} />
        </button>
      </div>

      <div className="absolute bottom-12 right-12 z-50">
        <button onClick={(e) => { e.stopPropagation(); nextAction(); }} className="group relative p-5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-2xl">
          <ChevronRight size={36} className={`relative z-10 text-gray-400 group-hover:${theme.primary} transition-colors`} />
        </button>
      </div>

      <div className={`absolute top-8 left-12 flex items-center gap-4 text-xs font-bold tracking-[0.4em] ${theme.primary}/60 uppercase`}>
        <div className={`w-12 h-[1px] ${theme.bg}/40`}></div>
        Space Exploration
      </div>
      <div className="absolute top-8 right-12 text-sm font-mono tracking-[0.3em] text-white/30">
        <span className={`${theme.primary}/60 font-black`}>{String(currentSlide + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')}
        <span className={`ml-4 text-[10px] ${theme.primary}/40 uppercase`}>Step {currentStep} / {slide.steps}</span>
      </div>
      <audio ref={audioRef} className="hidden" />
    </main>
  );
}
