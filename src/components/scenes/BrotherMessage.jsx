import React from 'react';
import { motion } from 'framer-motion';
import HydrangeaCluster from '../botanical/HydrangeaCluster';

export default function BrotherMessage({ content }) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        backgroundColor: '#0A0A0D',
      }}
    >
      <div style={{ position: 'absolute', left: '-40px', top: '18%', opacity: 0.45, pointerEvents: 'none' }}>
        <HydrangeaCluster baseDelay={0.2} size={190} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '640px', width: '100%', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="shadow-pink-glow"
          style={{
            backgroundColor: 'rgba(20, 20, 25, 0.88)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(250, 218, 221, 0.25)',
            borderRadius: '24px',
            padding: 'clamp(28px, 5vw, 48px)',
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <span className="font-mono uppercase" style={{ color: '#FADADD', fontSize: '11px', letterSpacing: '0.18em' }}>
              {content?.badge}
            </span>
            <h2 className="font-serif" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', color: '#FAFAFC', marginTop: '8px', fontWeight: 600 }}>
              {content?.title}
            </h2>
          </div>

          <div className="font-serif" style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '1.2rem', lineHeight: 1.75, color: '#D4D2D9' }}>
            {content?.paragraphs?.map((p, idx) => (
              <p key={idx} style={{ margin: 0 }}>{p}</p>
            ))}
          </div>

          <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid rgba(250, 218, 221, 0.14)', textAlign: 'right' }}>
            <span className="font-serif italic" style={{ color: '#FADADD', fontSize: '1.25rem' }}>
              {content?.signature}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
