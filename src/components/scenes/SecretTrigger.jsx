import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import HydrangeaCluster from '../botanical/HydrangeaCluster';
import perritoImg from '../../assets/perrito.jpg';

export default function SecretTrigger({ triggerData, onUnlock }) {
  const [showLogin, setShowLogin] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [errorShake, setErrorShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const handleValidateAndEnter = () => {
    // Normalización: trim() y validación sin importar mayúsculas o minúsculas
    const clean = (inputValue || '').trim().toLowerCase();

    if (clean === 'oye') {
      setIsSuccess(true);
      setErrorMessage('');
      setTimeout(() => {
        onUnlock();
      }, 400);
    } else {
      setErrorShake(true);
      setErrorMessage('Contraseña incorrecta. Recuerda la referencia del perrito...');
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleValidateAndEnter();
    }
  };

  return (
    <section
      id="secret-trigger-section"
      style={{
        position: 'relative',
        padding: 'clamp(60px, 10vw, 96px) 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A0A0D',
        borderTop: '1px solid rgba(250, 218, 221, 0.12)',
        overflowX: 'hidden',
      }}
    >
      <div style={{ maxWidth: '460px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <AnimatePresence mode="wait">
          {!showLogin ? (
            <motion.div
              key="trigger-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}
            >
              <p className="font-serif italic" style={{ color: '#A1A0AB', fontSize: '1.15rem', maxWidth: '380px', lineHeight: 1.6 }}>
                {triggerData?.promptText || 'Espera... alguien dejó una nota fuera del archivo oficial.'}
              </p>

              <motion.button
                onClick={() => setShowLogin(true)}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } }}
                className="font-mono shadow-pink-glow"
                style={{
                  padding: '14px 36px',
                  borderRadius: '9999px',
                  backgroundColor: '#141419',
                  border: '1.5px solid #FADADD',
                  color: '#FADADD',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Sparkles style={{ width: '16px', height: '16px' }} />
                {triggerData?.buttonText || 'Entrar al rincón secreto'}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="mini-login-card"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
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
              {/* Flor decorativa de hortensia */}
              <div style={{ position: 'absolute', top: '-45px', right: '-45px', opacity: 0.25, pointerEvents: 'none' }}>
                <HydrangeaCluster interactive={false} size={140} />
              </div>

              {/* Avatar circular con el sticker de perrito */}
              <div
                style={{
                  width: '104px',
                  height: '104px',
                  margin: '0 auto 16px auto',
                  borderRadius: '9999px',
                  backgroundColor: '#0A0A0D',
                  border: '2px solid #FADADD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 0 20px rgba(250, 218, 221, 0.25)',
                }}
              >
                {!imgFailed ? (
                  <img
                    src={perritoImg}
                    alt="Sticker Perrito Oye"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={() => setImgFailed(true)}
                  />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '42px', lineHeight: 1 }}>🐶</span>
                  </div>
                )}
              </div>

              <p className="font-serif" style={{ color: '#FAFAFC', fontSize: '1.15rem', lineHeight: 1.55, margin: '0 0 8px 0' }}>
                {triggerData?.stickerCaption || 'Hay un rincón oculto en esta página que no pertenece a ninguna facción.'}
              </p>

              <p className="font-mono" style={{ color: '#A1A0AB', fontSize: '11px', letterSpacing: '0.06em', margin: '0 0 22px 0' }}>
                Solo tú conoces la palabra de este perrito.
              </p>

              {/* Campo para ingresar contraseña */}
              <motion.div
                animate={errorShake ? { x: [-8, 8, -6, 6, 0] } : {}}
                transition={{ duration: 0.4 }}
                style={{ position: 'relative', width: '100%', marginBottom: errorMessage ? '10px' : '16px' }}
              >
                <div style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', color: '#FADADD', pointerEvents: 'none' }}>
                  {isSuccess ? (
                    <CheckCircle2 style={{ width: '16px', height: '16px', color: '#A8FFB2' }} />
                  ) : (
                    <Lock style={{ width: '16px', height: '16px' }} />
                  )}
                </div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={triggerData?.inputPlaceholder || 'Escribe la palabra secreta...'}
                  className="font-mono"
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 44px',
                    backgroundColor: '#0A0A0D',
                    border: errorShake
                      ? '1px solid #FF8080'
                      : isSuccess
                      ? '1.5px solid #A8FFB2'
                      : '1px solid rgba(250, 218, 221, 0.4)',
                    borderRadius: '14px',
                    color: '#FAFAFC',
                    fontSize: '14px',
                    textAlign: 'left',
                    outline: 'none',
                    boxShadow: isSuccess ? '0 0 16px rgba(168, 255, 178, 0.4)' : undefined,
                  }}
                  autoFocus
                />
              </motion.div>

              {errorMessage && (
                <p className="font-mono" style={{ color: '#FF9EAA', fontSize: '12px', margin: '0 0 14px 0' }}>
                  {errorMessage}
                </p>
              )}

              {/* Botón de Entrar */}
              <motion.button
                onClick={handleValidateAndEnter}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="font-mono shadow-pink-glow"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '14px',
                  backgroundColor: '#FADADD',
                  color: '#0A0A0D',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.14em',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                }}
              >
                <Sparkles style={{ width: '16px', height: '16px' }} />
                ENTRAR
              </motion.button>

              <div>
                <button
                  onClick={() => {
                    setShowLogin(false);
                    setInputValue('');
                    setErrorMessage('');
                  }}
                  className="font-mono"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#71717A',
                    fontSize: '11px',
                    cursor: 'pointer',
                    padding: '4px 8px',
                  }}
                >
                  Volver
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
