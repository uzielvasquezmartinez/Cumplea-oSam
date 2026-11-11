import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import HydrangeaCluster from '../botanical/HydrangeaCluster';

export default function CinematicFinale({ finaleData }) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '96px 20px',
        backgroundColor: '#0A0A0D',
        textAlign: 'center',
        overflow: 'hidden',
        borderTop: '1px solid rgba(250, 218, 221, 0.12)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.25, pointerEvents: 'none' }}>
        <HydrangeaCluster baseDelay={0.1} size={380} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '720px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif italic"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#A1A0AB', marginBottom: '16px' }}
        >
          {finaleData?.step1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="font-serif italic"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#A1A0AB', marginBottom: '28px' }}
        >
          {finaleData?.step2}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="font-serif"
          style={{
            fontSize: 'clamp(3rem, 7vw, 5rem)',
            fontWeight: 700,
            color: '#FAFAFC',
            margin: '0 0 16px 0',
            textShadow: '0 0 35px rgba(250, 218, 221, 0.3)',
          }}
        >
          {finaleData?.mainHighlight}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="font-serif italic"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#FADADD', marginBottom: '48px' }}
        >
          {finaleData?.subHighlight}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.95 }}
          className="font-mono uppercase shadow-champagne-glow"
          style={{
            fontSize: '11px',
            color: '#FDF0D5',
            letterSpacing: '0.22em',
            padding: '8px 24px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(20, 20, 25, 0.75)',
            border: '1px solid rgba(245, 215, 158, 0.35)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Sparkles style={{ width: '13px', height: '13px' }} color="#F5D79E" />
          {finaleData?.closingWish}
        </motion.div>
      </div>
    </section>
  );
}
