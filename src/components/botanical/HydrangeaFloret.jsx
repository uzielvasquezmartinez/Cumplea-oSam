import React from 'react';
import { motion } from 'framer-motion';

const PALETTES = {
  light: { main: '#FADADD', inner: '#FCEEF2', center: '#FFFFFF', stroke: '#E2A9B2' },
  medium: { main: '#F3B8C2', inner: '#FADADD', center: '#FFF5F7', stroke: '#C98A95' },
  deep: { main: '#E2A9B2', inner: '#F3B8C2', center: '#FADADD', stroke: '#B57681' },
  ivory: { main: '#FAFAFC', inner: '#FADADD', center: '#E2A9B2', stroke: '#FADADD' },
};

export default function HydrangeaFloret({
  x = 0,
  y = 0,
  scale = 1,
  rotation = 0,
  tone = 'light',
  delay = 0,
  interactive = false,
}) {
  const colors = PALETTES[tone] || PALETTES.light;

  return (
    <motion.g
      initial={{ scale: 0, opacity: 0, rotate: rotation - 20 }}
      whileInView={{ scale, opacity: 1, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 110, damping: 14, delay }}
      whileHover={interactive ? { scale: scale * 1.15, rotate: rotation + 10 } : undefined}
      transform={`translate(${x}, ${y})`}
      style={{ cursor: interactive ? 'pointer' : 'default' }}
    >
      <path d="M 0,-2 C -13,-14 -15,-29 0,-31 C 15,-29 13,-14 0,-2 Z" fill={colors.main} stroke={colors.stroke} strokeWidth="0.7" />
      <path d="M 0,2 C -13,14 -15,29 0,31 C 15,29 13,14 0,2 Z" fill={colors.inner} stroke={colors.stroke} strokeWidth="0.7" />
      <path d="M -2,0 C -14,-13 -29,-15 -31,0 C -29,15 -14,13 -2,0 Z" fill={colors.inner} stroke={colors.stroke} strokeWidth="0.7" />
      <path d="M 2,0 C 14,-13 29,-15 31,0 C 29,15 14,13 2,0 Z" fill={colors.main} stroke={colors.stroke} strokeWidth="0.7" />
      <line x1="0" y1="-4" x2="0" y2="-21" stroke={colors.stroke} strokeWidth="0.5" opacity="0.55" />
      <line x1="0" y1="4" x2="0" y2="21" stroke={colors.stroke} strokeWidth="0.5" opacity="0.55" />
      <line x1="-4" y1="0" x2="-21" y2="0" stroke={colors.stroke} strokeWidth="0.5" opacity="0.55" />
      <line x1="4" y1="0" x2="21" y2="0" stroke={colors.stroke} strokeWidth="0.5" opacity="0.55" />
      <circle cx="0" cy="0" r="3.4" fill={colors.center} />
      <circle cx="0" cy="0" r="1.8" fill="#FDF0D5" />
      <circle cx="0" cy="0" r="0.9" fill="#F5D79E" />
    </motion.g>
  );
}
