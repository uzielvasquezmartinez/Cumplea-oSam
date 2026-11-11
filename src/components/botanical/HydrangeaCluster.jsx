import React from 'react';
import { motion } from 'framer-motion';
import HydrangeaFloret from './HydrangeaFloret';

const CLUSTER_MAP = [
  { x: -68, y: -18, scale: 0.78, rot: 12, tone: 'deep' },
  { x: -52, y: -56, scale: 0.82, rot: -18, tone: 'medium' },
  { x: -12, y: -72, scale: 0.85, rot: 8, tone: 'light' },
  { x: 34, y: -64, scale: 0.80, rot: 28, tone: 'medium' },
  { x: 66, y: -32, scale: 0.76, rot: -14, tone: 'deep' },
  { x: 70, y: 14, scale: 0.82, rot: 22, tone: 'medium' },
  { x: 46, y: 54, scale: 0.78, rot: -25, tone: 'deep' },
  { x: 2, y: 68, scale: 0.84, rot: 15, tone: 'light' },
  { x: -44, y: 56, scale: 0.79, rot: -10, tone: 'medium' },
  { x: -66, y: 24, scale: 0.75, rot: 32, tone: 'deep' },
  { x: -34, y: -28, scale: 0.92, rot: -22, tone: 'light' },
  { x: 14, y: -36, scale: 0.95, rot: 18, tone: 'ivory' },
  { x: 38, y: -6, scale: 0.90, rot: -12, tone: 'light' },
  { x: 22, y: 32, scale: 0.93, rot: 25, tone: 'medium' },
  { x: -24, y: 30, scale: 0.91, rot: -16, tone: 'light' },
  { x: -40, y: 4, scale: 0.88, rot: 8, tone: 'ivory' },
  { x: -10, y: -8, scale: 1.02, rot: 14, tone: 'ivory' },
  { x: 12, y: 8, scale: 1.0, rot: -18, tone: 'light' },
  { x: 0, y: 0, scale: 1.08, rot: 4, tone: 'light' },
];

export default function HydrangeaCluster({
  className = '',
  size = 240,
  interactive = true,
  baseDelay = 0,
}) {
  return (
    <motion.div
      className={`hydrangea-glow select-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, position: 'relative' }}
      animate={{ rotate: [-1.5, 1.5, -1.5], y: [-4, 4, -4] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="-120 -120 240 240" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <path d="M -20,40 C -88,62 -110,15 -96,-22 C -60,-36 -25,10 -20,40 Z" fill="#1B231E" stroke="#3A443E" strokeWidth="1.2" />
        <path d="M 20,35 C 88,58 110,10 94,-26 C 58,-38 25,5 20,35 Z" fill="#161D19" stroke="#3A443E" strokeWidth="1.2" />
        {CLUSTER_MAP.map((floret, idx) => (
          <HydrangeaFloret
            key={idx}
            x={floret.x}
            y={floret.y}
            scale={floret.scale}
            rotation={floret.rot}
            tone={floret.tone}
            delay={baseDelay + idx * 0.04}
            interactive={interactive}
          />
        ))}
      </svg>
    </motion.div>
  );
}
