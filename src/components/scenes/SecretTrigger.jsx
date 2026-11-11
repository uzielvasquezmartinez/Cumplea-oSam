import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, AlertCircle } from 'lucide-react';
import HydrangeaCluster from '../botanical/HydrangeaCluster';

export default function SecretTrigger({ triggerData, onUnlock, isUnlocked = false }) {
  const [showSticker, setShowSticker] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [errorShake, setErrorShake] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const normalizeText = (text) =>
    text
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    const normalizedInput = normalizeText(val);
    const matched = triggerData.acceptedPasswords.some(
      (pass) => normalizeText(pass) === normalizedInput
    );

    if (matched) {
      setTimeout(() => {
        onUnlock();
      }, 350);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const normalizedInput = normalizeText(inputValue);
      const matched = triggerData.acceptedPasswords.some(
        (pass) => normalizeText(pass) === normalizedInput
      );

      if (!matched) {
        setErrorShake(true);
        setShowHint(true);
        setTimeout(() => setErrorShake(false), 500);
      }
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        padding: '96px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A0A0D',
        borderTop: '1px solid rgba(250, 218, 221, 0.12)',
      }}
    >
      <div style={{ maxWidth: '460px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        {!showSticker ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
          >
            <p className="font-serif italic" style={{ color: '#A1A0AB', fontSize: '1.1rem' }}>
              {triggerData?.promptText}
            </p>
            {isUnlocked ? (
              <motion.button
                onClick={onUnlock}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } }}
                className="font-mono shadow-pink-glow-lg"
                style={{
                  padding: '14px 34px',
                  borderRadius: '9999px',
                  backgroundColor: '#FADADD',
                  border: 'none',
                  color: '#0A0A0D',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Sparkles style={{ width: '16px', height: '16px' }} />
                ENTRAR AL JARDÍN SECRETO
              </motion.button>
            ) : (
              <motion.button
                onClick={() => setShowSticker(true)}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } }}
                className="font-mono shadow-pink-glow"
                style={{
                  padding: '14px 36px',
                  borderRadius: '9999px',
                  backgroundColor: '#141419',
                  border: '1px solid #FADADD',
                  color: '#FADADD',
                  fontSize: '14px',
                  letterSpacing: '0.15em',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Sparkles style={{ width: '16px', height: '16px' }} />
                {triggerData?.buttonText}
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 16 }}
            className="shadow-pink-glow-lg"
            style={{
              backgroundColor: '#141419',
              border: '1px solid rgba(250, 218, 221, 0.35)',
              padding: '36px 28px',
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: '-45px', right: '-45px', opacity: 0.25, pointerEvents: 'none' }}>
              <HydrangeaCluster interactive={false} size={140} />
            </div>

            <div
              style={{
                width: '104px',
                height: '104px',
                margin: '0 auto 18px auto',
                borderRadius: '9999px',
                backgroundColor: '#0A0A0D',
                border: '2px solid #FADADD',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {!imgFailed ? (
                <img
                  src={triggerData?.stickerUrl}
                  alt="Sticker Oye"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '36px', lineHeight: 1 }}>🐶</span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '10px',
                      backgroundColor: '#FADADD',
                      color: '#0A0A0D',
                      padding: '1px 6px',
                      borderRadius: '6px',
                      fontWeight: 700,
                      marginTop: '4px',
                    }}
                  >
                    OYE
                  </span>
                </div>
              )}
            </div>

            <p className="font-serif" style={{ color: '#FAFAFC', fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '24px' }}>
              {triggerData?.stickerCaption}
            </p>

            <motion.div
              animate={errorShake ? { x: [-8, 8, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
              style={{ position: 'relative', marginBottom: '16px' }}
            >
              <div style={{ position: 'absolute', top: '50%', left: '14px', transform: 'translateY(-50%)', color: '#FADADD', pointerEvents: 'none' }}>
                <Lock style={{ width: '16px', height: '16px' }} />
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={triggerData?.inputPlaceholder}
                className="font-mono"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 40px',
                  backgroundColor: '#0A0A0D',
                  border: '1px solid rgba(250, 218, 221, 0.4)',
                  borderRadius: '14px',
                  color: '#FAFAFC',
                  fontSize: '14px',
                  textAlign: 'center',
                  outline: 'none',
                }}
                autoFocus
              />
            </motion.div>

            <button
              onClick={() => setShowHint(true)}
              className="font-mono"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#A1A0AB',
                fontSize: '11px',
                textDecoration: 'underline',
                cursor: 'pointer',
                marginBottom: showHint ? '12px' : '0',
              }}
            >
              ¿Necesitas una pista?
            </button>

            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    textAlign: 'left',
                    backgroundColor: 'rgba(10, 10, 13, 0.75)',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1px solid rgba(250, 218, 221, 0.22)',
                  }}
                >
                  <AlertCircle style={{ width: '16px', height: '16px', color: '#FADADD', flexShrink: 0, marginTop: '2px' }} />
                  <span className="font-serif italic" style={{ fontSize: '0.95rem', color: '#D4D2D9' }}>
                    {triggerData?.hintText}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
