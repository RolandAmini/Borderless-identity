'use client';

import { motion } from 'framer-motion';
import AIAssistant from '@/app/components/AIAssistant';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function AboutPage() {
  return (
     <>
        <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
      {/* Pattern de fond subtil vert */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          repeating-linear-gradient(45deg, transparent, transparent 20px, #10b98120 20px, #10b98120 21px),
          repeating-linear-gradient(-45deg, transparent, transparent 20px, #10b98120 20px, #10b98120 21px)
        `,
        backgroundSize: '30px 30px'
      }} />

      {/* Titre en haut - Style moderne Zuri */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-20 px-4"
      >
        
        
        {/* Sous-titre bulle Zuri */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 inline-block"
        >
        
        </motion.div>
      </motion.div>

      {/* Effets rayons verts style Zuri */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.08, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 1.2 }}
            className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-b from-[#0025a8] to-[#006B44]"
            style={{
              height: '180vh',
              transform: `rotate(${i * 30}deg)`,
              transformOrigin: 'center',
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>

      {/* ZURI AI Component - Layout horizontal optimisé */}
      <div className="relative z-10 w-full h-[90vh] flex items-start justify-center px-8 py-20">
        <div className="w-full max-w-7xl mx-auto">
          <AIAssistant />
        </div>
      </div>

      {/* Éléments décoratifs Zuri style */}
      


      {/* Bulles décoratives vertes flottantes */}
      <motion.div
        animate={{ y: [0, -25, 0], rotate: [0, 5, -5, 0] }}
        transition={{ 
          y: { repeat: Infinity, duration: 4 },
          rotate: { repeat: Infinity, duration: 6 }
        }}
        className="absolute top-1/4 left-8 w-20 h-20 bg-red-600 border-4 border-[#006B44] rounded-full shadow-[6px_6px_0px_0px_rgba(16,185,129,0.4)] opacity-80"
      />

      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -5, 5, 0] }}
        transition={{ 
          y: { repeat: Infinity, duration: 5, delay: 1 },
          rotate: { repeat: Infinity, duration: 7, delay: 1 }
        }}
        className="absolute bottom-1/4 right-12 w-24 h-24 bg-gradient-to-br from-emerald-400 to-[#006B44] border-4 border-emerald-600 rounded-full shadow-[6px_6px_0px_0px_rgba(6,182,212,0.4)] opacity-80"
      />

      {/* Particules flottantes Zuri */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.3
          }}
          className="absolute w-3 h-3 bg-[#947D1E] rounded-full opacity-60"
          style={{
            top: `${20 + i * 12}%`,
            right: `${10 + i * 8}%`,
            filter: 'blur(0.3px)'
          }}
        />
      ))}
    </div>
     <Footer />
       </>
  );
}
