'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import Image from 'next/image';

// Textes de présentation de la marque
const brandStory = [
  "Welcome to Borderless Identity.",
  "We are redefining fashion beyond borders, cultures, and conventions.",
  "Our collections celebrate individuality and global unity.",
  "Each piece is crafted to transcend boundaries and express your unique identity.",
  "Discover a world where style knows no limits.",
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

  // Apparition de l'assistant au chargement de la page
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Animation de typing pour chaque texte
  useEffect(() => {
    if (!isVisible || currentTextIndex >= brandStory.length) {
      if (currentTextIndex >= brandStory.length) {
        const timer = setTimeout(() => {
          setShowInput(true);
        }, 1000);
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
        setTimeout(() => {
          setCurrentTextIndex(prev => prev + 1);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [isVisible, currentTextIndex]);

  // Fonction pour envoyer la question à l'API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userQuestion.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: userQuestion,
    };

    setMessages(prev => [...prev, newMessage]);
    setUserQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `Tu es l'assistant élégant et futuriste de Borderless Identity, une marque de mode qui transcende les frontières et célèbre l'identité unique de chacun. Notre collection combine style urbain, minimalisme et influences globales. Réponds à cette question de manière concise et élégante (maximum 3 phrases) : ${userQuestion}`,
            },
          ],
        }),
      });

      const data = await response.json();
      
      const aiResponse: Message = {
        role: 'assistant',
        content: data.content[0].text,
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error calling AI:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again or contact us directly.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Avatar principal au centre - GRAND */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: 'spring', 
          stiffness: 200, 
          damping: 20,
          duration: 0.8,
        }}
        className="relative z-10"
      >
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
          <Image
            src="/assistant-ai_png.png"
            alt="Borderless Assistant"
            width={320}
            height={320}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        
        {/* Indicateur en ligne */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 right-8 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-lg"
        />
      </motion.div>

      {/* Bulles de parole style BD - À GAUCHE de l'avatar */}
      <AnimatePresence mode="wait">
        {currentTextIndex < brandStory.length && (
          <motion.div
            key={currentTextIndex}
            initial={{ opacity: 0, scale: 0.5, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: -50 }}
            transition={{ 
              type: 'spring',
              stiffness: 200,
              damping: 20
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 max-w-md ml-8"
          >
            {/* Bulle de dialogue style BD */}
            <div className="relative">
              {/* Triangle pointant vers l'avatar - style BD */}
              <svg 
                className="absolute -right-8 top-1/2 -translate-y-1/2 w-12 h-12" 
                viewBox="0 0 50 50"
              >
                {/* Contour noir */}
                <path 
                  d="M 5 15 Q 25 25 5 35 L 5 15" 
                  fill="black"
                  stroke="black"
                  strokeWidth="3"
                />
                {/* Remplissage blanc */}
                <path 
                  d="M 6 17 Q 22 25 6 33 L 6 17" 
                  fill="white"
                />
              </svg>

              {/* Contenu de la bulle - style bande dessinée */}
              <div className="relative bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
                <p className="text-xl md:text-2xl font-bold text-black leading-relaxed uppercase tracking-wide text-center">
                  {displayedText}
                  {isTyping && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-1 h-6 bg-black ml-1"
                    />
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages de chat - style BD */}
      {messages.length > 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 max-h-64 overflow-y-auto">
            {messages.map((message, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mb-4 last:mb-0 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div className={`inline-block max-w-[80%] p-4 rounded-2xl border-3 border-black ${
                  message.role === 'user'
                    ? 'bg-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-yellow-100 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                }`}>
                  <p className="text-base font-bold">{message.content}</p>
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-left"
              >
                <div className="inline-block bg-yellow-100 p-4 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                      className="w-3 h-3 bg-black rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                      className="w-3 h-3 bg-black rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                      className="w-3 h-3 bg-black rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Prompt pour poser une question */}
      {showInput && messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-8"
        >
          <div className="relative">
            {/* Triangle pointant vers le haut */}
            <svg 
              className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-8" 
              viewBox="0 0 50 30"
            >
              <path 
                d="M 25 5 L 5 25 L 45 25 Z" 
                fill="black"
              />
              <path 
                d="M 25 8 L 8 25 L 42 25 Z" 
                fill="white"
              />
            </svg>

            <div className="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 text-center">
              <p className="text-lg font-bold text-black uppercase mb-4">
                Any questions? 💬
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Input Form - style BD */}
      {showInput && (
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          onSubmit={handleSubmit}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xl px-8"
        >
          <div className="bg-white rounded-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-2 flex gap-2">
            <input
              type="text"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-6 py-3 text-lg font-bold focus:outline-none bg-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !userQuestion.trim()}
              className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <Send size={24} />
            </button>
          </div>
        </motion.form>
      )}
    </div>
  );
}