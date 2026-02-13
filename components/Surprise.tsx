
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfettiPiece = ({ color, x }: { color: string, x: number }) => (
  <motion.div
    initial={{ y: -20, opacity: 1 }}
    animate={{ 
      y: '100vh', 
      x: x + (Math.random() - 0.5) * 100, 
      rotate: 360,
      opacity: [1, 1, 0]
    }}
    transition={{ duration: 3, ease: "linear" }}
    className="fixed top-0 w-3 h-3 z-[100]"
    style={{ backgroundColor: color, borderRadius: '2px', left: `${x}%` }}
  />
);

export const Surprise: React.FC = () => {
  const [step, setStep] = useState<'button' | 'proposal' | 'success'>('button');
  const [confetti, setConfetti] = useState<any[]>([]);

  const triggerConfetti = () => {
    const pieces = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      color: ['#ff4d6d', '#ff758f', '#ffb3c1', '#fce4ec'][Math.floor(Math.random() * 4)],
      x: Math.random() * 100
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 3000);
  };

  const handleProposal = (choice: string) => {
    triggerConfetti();
    setStep('success');
  };

  return (
    <section className="py-32 px-4 flex flex-col items-center justify-center text-center relative">
      <AnimatePresence>
        {confetti.map((p) => <ConfettiPiece key={p.id} {...p} />)}
      </AnimatePresence>

      <motion.div
        layout
        className="max-w-xl w-full"
      >
        {step === 'button' && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-8"
          >
            <h2 className="font-playfair text-4xl text-pink-600">I have a secret for you...</h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setStep('proposal')}
              className="text-9xl cursor-pointer drop-shadow-2xl inline-block"
            >
              🎁
            </motion.button>
            <p className="text-pink-400 italic">Click the gift to open it</p>
          </motion.div>
        )}

        {step === 'proposal' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-10 rounded-[3rem] shadow-2xl space-y-8 border-4 border-pink-100"
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-pink-600 leading-tight">
              Shreya, will you be mine forever?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleProposal('yes')}
                className="px-10 py-4 bg-pink-500 text-white rounded-full font-bold shadow-lg hover:bg-pink-600 transition-colors"
              >
                YES ❤️
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleProposal('always')}
                className="px-10 py-4 bg-white text-pink-500 border-2 border-pink-500 rounded-full font-bold shadow-lg hover:bg-pink-50 transition-colors"
              >
                ALWAYS 💍
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="font-playfair text-6xl text-pink-600">YAY! ❤️</h2>
            <p className="text-2xl text-pink-400 italic font-medium">You've made me the happiest person in the world!</p>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-8xl py-8"
            >
              💖
            </motion.div>
            <p className="text-pink-500 font-playfair text-2xl italic tracking-wide">
              "Our forever starts today."
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
