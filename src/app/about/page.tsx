'use client';

import { motion } from 'framer-motion';
import AIAssistant from '@/app/components/AIAssistant';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-yellow-100 relative overflow-hidden">
      {/* Pattern de fond style BD */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 2px, black 2px, black 3px),
          repeating-linear-gradient(90deg, transparent, transparent 2px, black 2px, black 3px)
        `,
        backgroundSize: '50px 50px'
      }} />

      {/* Titre en haut - style BD */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-20"
      >
        <div className="relative inline-block">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-black uppercase relative z-10"
            style={{
              textShadow: '4px 4px 0px rgba(0,0,0,0.2), -2px -2px 0px white',
              WebkitTextStroke: '2px black'
            }}
          >
            BORDERLESS
          </h1>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black uppercase relative z-10 mt-2"
            style={{
              textShadow: '3px 3px 0px rgba(0,0,0,0.2), -1px -1px 0px white',
              WebkitTextStroke: '1.5px black'
            }}
          >
            IDENTITY
          </h2>
        </div>
        
        {/* Sous-titre dans une bulle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 inline-block"
        >
          <div className="bg-yellow-300 border-4 border-black rounded-full px-8 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-lg font-bold text-black uppercase tracking-wider">
              Meet Our AI Assistant
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Effet de rayons style BD */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 1 }}
            className="absolute top-1/2 left-1/2 w-1 bg-yellow-400"
            style={{
              height: '150vh',
              transform: `rotate(${i * 45}deg)`,
              transformOrigin: 'center'
            }}
          />
        ))}
      </div>

      {/* Assistant AI Component - Centré */}
      <div className="relative z-10 w-full h-screen flex items-center justify-center px-4">
        <AIAssistant />
      </div>

      {/* Éléments décoratifs style BD */}
      <motion.div
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-24 right-12 text-6xl"
      >
        ✨
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 180 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-24 left-12 text-6xl"
      >
        💬
      </motion.div>

      {/* Bulles décoratives */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute top-1/4 left-12 w-16 h-16 bg-white border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      />

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
        className="absolute bottom-1/4 right-12 w-20 h-20 bg-yellow-300 border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      />
    </div>
  );
}