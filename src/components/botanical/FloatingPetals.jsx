import React from 'react';
import { motion } from 'framer-motion';

const PETALS = [
  { id: 1, left: '12%', top: '18%', size: 16, duration: 9, delay: 0 },
  { id: 2, left: '84%', top: '26%', size: 20, duration: 11, delay: 1.5 },
  { id: 3, left: '22%', top: '68%', size: 14, duration: 10, delay: 0.8 },
  { id: 4, left: '76%', top: '75%', size: 18, duration: 12, delay: 2.2 },
  { id: 5, left: '48%', top: '12%', size: 12, duration: 8, delay: 1.1 },
];

export default function FloatingPetals() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {PETALS.map((petal) => (
        <motion.div
          key={petal.id}
          style={{ position: 'absolute', left: petal.left, top: petal.top, width: petal.size, height: petal.size, opacity: 0.35 }}
          animate={{ y: [-18, 22, -18], x: [-10, 12, -10], rotate: [0, 45, -15, 0] }}
          transition={{ duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: 'easeInOut' }}
        >
          <svg viewBox="-20 -20 40 40" style={{ width: '100%', height: '100%' }}>
            <path d="M 0,-2 C -9,-10 -11,-18 0,-19 C 11,-18 9,-10 0,-2 Z" fill="#FADADD" />
            <path d="M 0,2 C -9,10 -11,18 0,19 C 11,18 9,10 0,2 Z" fill="#E2A9B2" />
            <path d="M -2,0 C -10,-9 -18,-11 -19,0 C -18,11 -10,9 -2,0 Z" fill="#FCEEF2" />
            <path d="M 2,0 C 10,-9 18,-11 19,0 C 18,11 10,9 2,0 Z" fill="#FADADD" />
            <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
