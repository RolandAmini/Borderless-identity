'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const brandStory = [
  "Hi, I'm the Borderless Identity assistant! We're more than a clothing brand, we're a movement.",
  "We stand for culture without limits. Heritage without restriction. Expression without permission. In a world divided by lines on maps, we celebrate one truth: identity cannot be contained by borders. We're connected to the world.",
  "Our mission is to empower you to express your unique identity through fashion that transcends boundaries. We blend global influences with local craftsmanship to create pieces as diverse and dynamic as the people who wear them.",
  "Wear Culture. Live Without Borders."
];

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export default function AIAssistant() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible || currentTextIndex >= brandStory.length) {
      if (currentTextIndex >= brandStory.length) {
        const timer = setTimeout(() => setShowInput(true), 1500);
        return () => clearTimeout(timer);
      }
      return;
    }

    setIsTyping(true);
    setDisplayedText('');
    const currentText = brandStory[currentTextIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex < currentText.length) {
        setDisplayedText(currentText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTimeout(() => setCurrentTextIndex(prev => prev + 1), 1500);
      }
    }, 60);

    return () => clearInterval(typingInterval);
  }, [isVisible, currentTextIndex]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    const newMessage: Message = { role: 'user', content: userQuestion };
    setMessages(prev => [...prev, newMessage]);
    setUserQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `l'assistante élégante de Borderless Identity. Réponds de manière concise et stylée (max 3 phrases) : ${userQuestion}`
          }],
        }),
      });

      const data = await response.json();
      const aiResponse: Message = {
        role: 'assistant',
        content: data.content[0].text,
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Oops ! Je rencontre un petit problème. Réessayez ou contactez-nous ! 💬"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-full h-full flex items-start justify-center px-4 md:px-8 py-8 md:py-12">
      
      {/* ── MOBILE : colonne centrée  ── LAPTOP : ligne comme avant ── */}
      <div className="flex flex-col items-center md:flex-row md:items-start gap-6 md:gap-8 max-w-4xl w-full">

        {/* ── AVATAR ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: -50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
          className="relative flex-shrink-0"
        >
          <div className="relative">
            <Image
              src="/assistant-ai.png.png"
              alt="Smart Assistant"
              width={320}
              height={400}
              /* Mobile : plus petit / Laptop : taille originale */
              className="w-44 h-56 md:w-72 md:h-96 object-contain drop-shadow-2xl"
              priority
            />

            {/* Main levée animée */}
            <motion.div
              animate={{
                y: [0, -5, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                y: { repeat: Infinity, duration: 2 },
                rotate: { repeat: Infinity, duration: 3 }
              }}
              className="absolute -top-4 -right-6 md:-right-8 w-14 h-18 md:w-20 md:h-24 bg-[#0025a8] rounded-lg border border-gray-300 flex items-center justify-center shadow-lg"
              style={{ clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 0% 80%)' }}
            >
              <div className="w-2 h-2 md:w-3 md:h-3 bg-[#947D1E] rounded-full shadow-md" />
            </motion.div>
          </div>
        </motion.div>

        {/* ── BULLE + CHAT (colonne sur mobile, côte à côte sur laptop) ── */}
        <div className="flex flex-col items-center md:items-start w-full gap-6">

          {/* Bulle de texte */}
          <AnimatePresence mode="wait">
            {currentTextIndex < brandStory.length && (
              <motion.div
                key={currentTextIndex}
                initial={{ opacity: 0, scale: 0.3, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.3, y: 30 }}
                /* Sur laptop on retrouve l'animation x */
                // @ts-ignore
                style={{ '--x-desktop': '100px' }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="relative w-full max-w-lg md:max-w-lg"
              >
                <div className="bg-[#006B44] rounded-3xl p-5 md:p-8 shadow-2xl border-4 border-green-600/50 drop-shadow-[0_20px_20px_rgba(34,197,94,0.3)]">
                  <div className="bg-white/90 rounded-2xl p-4 md:p-6 border-2 border-[#947D1E]">
                    <p className="text-base md:text-xl lg:text-2xl font-bold text-gray-800 leading-relaxed tracking-wide">
                      {displayedText}
                      {isTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="inline-block w-2 h-6 md:w-3 md:h-8 bg-[#006B44] ml-2 rounded"
                        />
                      )}
                    </p>
                  </div>
                </div>

                {/* Queue de bulle — cachée sur mobile, visible sur laptop */}
                <svg
                  className="hidden md:block absolute -left-16 top-1/2 -translate-y-1/2 w-16 h-16"
                  viewBox="0 0 60 60"
                  fill="none"
                >
                  <path
                    d="M 10 20 Q 30 30 10 40 L 10 20"
                    fill="url(#gradient)"
                    stroke="#059669"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#16a34a" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages du chat */}
          {messages.length > 0 && (
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2 w-full max-w-lg">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl shadow-lg max-w-sm ${
                    msg.role === 'user'
                      ? 'bg-gray-900 text-white ml-auto'
                      : 'bg-green-100 text-gray-800 border-l-4 border-[#006B44]'
                  }`}
                >
                  <p className="font-semibold text-sm md:text-base">{msg.content}</p>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-2 p-4 bg-green-100 rounded-2xl">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-[#006B44] rounded-full"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bouton Shop Now */}
          {showInput && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-xs md:max-w-none"
            >
              <Link href="/shop" className="group block">
                <div className="flex border border-white/40 hover:border-white/60 transition-colors duration-300">
                  <div className="bg-transparent px-8 md:px-12 py-4 flex items-center justify-center">
                    <span className="text-base md:text-[20px] tracking-[0.25em] md:tracking-[0.35em] font-medium text-black uppercase whitespace-nowrap">
                      Shop Now
                    </span>
                  </div>
                  <div className="bg-[#947D1E] w-14 h-14 md:w-16 md:h-16 flex items-center justify-center group-hover:bg-[#0025a8] transition-colors duration-300 rounded-lg">
                    <ShoppingCart className="text-white w-5 h-5 md:w-6 md:h-6 transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}