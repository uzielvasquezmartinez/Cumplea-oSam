import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import HydrangeaCluster from '../botanical/HydrangeaCluster';

export default function DivergentGarden({ gardenData, onBack }) {
  const cards = useMemo(() => gardenData?.cards || [], [gardenData]);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCard = cards[activeIndex] || cards[0];

  // Generar la cola circular lineal con las otras cartas (empezando por la siguiente a la activa)
  const queueCards = useMemo(() => {
    if (!cards.length) return [];
    const result = [];
    for (let i = 1; i < cards.length; i++) {
      const idx = (activeIndex + i) % cards.length;
      result.push({ ...cards[idx], originalIndex: idx });
    }
    return result;
  }, [cards, activeIndex]);

  const handleSelectCard = (index) => {
    setActiveIndex(index);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  // Navegación por teclado opcional y accesible (flechas izquierda/derecha)
  useEffect(() => {
    if (!cards.length) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % cards.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cards.length]);

  const words = useMemo(() => {
    return activeCard?.quote ? activeCard.quote.split(' ') : [];
  }, [activeCard]);

  if (!activeCard) return null;

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#07070A',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(250, 218, 221, 0.22)',
      }}
    >
      {/* 1. ESCENARIO DE FONDO: LA CARTA SELECCIONADA SE ABRE COMPLETAMENTE */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeCard.id}
          layoutId={`card-container-${activeCard.id}`}
          initial={{ opacity: 0.4, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: `radial-gradient(circle at 25% 40%, ${activeCard.accent} 0%, rgba(10, 10, 14, 0.94) 58%, #07070A 100%)`,
            overflow: 'hidden',
          }}
        >
          {/* Número Romano Monumental de Marca de Agua en el Fondo */}
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 0.06, x: 0 }}
            transition={{ duration: 0.9 }}
            className="font-serif select-none"
            style={{
              position: 'absolute',
              top: '6%',
              left: '4%',
              fontSize: 'clamp(10rem, 26vw, 22rem)',
              fontWeight: 700,
              color: '#FADADD',
              lineHeight: 0.85,
              pointerEvents: 'none',
            }}
          >
            {activeCard.roman}
          </motion.span>

          {/* Hortensias Botánicas del Escenario Expandido */}
          <div
            style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              opacity: 0.55,
              pointerEvents: 'none',
            }}
          >
            <HydrangeaCluster baseDelay={0.1} interactive={false} size={280} />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '18%',
              left: '-60px',
              opacity: 0.3,
              pointerEvents: 'none',
            }}
          >
            <HydrangeaCluster baseDelay={0.25} interactive={false} size={220} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 2. BARRA SUPERIOR CON BOTÓN REGRESAR */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          padding: '24px clamp(20px, 5vw, 56px) 0 clamp(20px, 5vw, 56px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        {onBack && (
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.95 }}
            className="font-mono shadow-pink-glow"
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(20, 20, 25, 0.85)',
              border: '1px solid rgba(250, 218, 221, 0.3)',
              color: '#FADADD',
              fontSize: '11px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              letterSpacing: '0.1em',
            }}
          >
            <ArrowLeft style={{ width: '13px', height: '13px' }} />
            Regresar al inicio
          </motion.button>
        )}
      </div>

      {/* 3. CONTENIDO PRINCIPAL: INFORMACIÓN ABIERTA (IZQUIERDA) + CARRUSEL LINEAL (DERECHA/ABAJO) */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(24px, 5vw, 56px)',
          gap: '36px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            alignItems: 'end',
            gap: '40px',
            width: '100%',
            maxWidth: '1380px',
            margin: '0 auto',
          }}
        >
          {/* PANEL IZQUIERDO: INFORMACIÓN COMPLETA Y FRASE DE LA CARTA ABIERTA */}
          <div
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            style={{ maxWidth: '640px' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${activeCard.id}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                {/* Etiqueta de Facción y Número de Carta */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '14px',
                    padding: '5px 14px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(20, 20, 25, 0.85)',
                    border: '1px solid rgba(250, 218, 221, 0.35)',
                  }}
                >
                  <span className="font-mono" style={{ fontSize: '11px', color: '#FADADD', fontWeight: 700 }}>
                    CARTA {activeCard.roman} / XV
                  </span>
                  <span style={{ color: 'rgba(250,218,221,0.3)' }}>|</span>
                  <span className="font-mono" style={{ fontSize: '11px', color: '#FAFAFC', letterSpacing: '0.12em' }}>
                    {activeCard.faction}
                  </span>
                </div>

                {/* Título */}
                <h2
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
                    fontWeight: 700,
                    color: '#FAFAFC',
                    lineHeight: 1.05,
                    margin: '0 0 8px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    textShadow: '0 0 35px rgba(250, 218, 221, 0.25)',
                  }}
                >
                  {activeCard.title}
                </h2>

                <p
                  className="font-mono"
                  style={{
                    fontSize: '12px',
                    color: '#FADADD',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    margin: '0 0 24px 0',
                  }}
                >
                  {activeCard.subtitle}
                </p>

                {/* Contenedor de la Frase Completa con Revelado Palabra por Palabra */}
                <div
                  className="shadow-pink-glow"
                  style={{
                    backgroundColor: 'rgba(16, 16, 22, 0.82)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(250, 218, 221, 0.28)',
                    borderRadius: '20px',
                    padding: 'clamp(20px, 3.5vw, 30px)',
                  }}
                >
                  <p
                    className="font-serif italic"
                    style={{
                      fontSize: 'clamp(1.25rem, 2.3vw, 1.6rem)',
                      lineHeight: 1.65,
                      color: '#FAFAFC',
                      margin: 0,
                    }}
                  >
                    <span style={{ color: '#FADADD', fontSize: '1.6rem', marginRight: '4px' }}>"</span>
                    {words.map((word, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.35, delay: 0.15 + idx * 0.032 }}
                        style={{ display: 'inline-block', marginRight: '6px' }}
                      >
                        {word}
                      </motion.span>
                    ))}
                    <span style={{ color: '#FADADD', fontSize: '1.6rem', marginLeft: '2px' }}>"</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* PANEL DERECHO: CARRUSEL LINEAL ANIMADO DE LAS SIGUIENTES CARTAS */}
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <span className="font-mono" style={{ fontSize: '11px', color: '#A1A0AB', letterSpacing: '0.14em' }}>
                SELECCIONA O DESLIZA UNA CARTA PARA ABRIRLA →
              </span>
            </div>

            {/* Pista Horizontal Deslizable con las Cartas en Espera */}
            <motion.div
              drag="x"
              dragConstraints={{ left: -Math.max(0, (queueCards.length - 2) * 205), right: 0 }}
              style={{
                display: 'flex',
                gap: '16px',
                cursor: 'grab',
                paddingBottom: '12px',
              }}
            >
              {queueCards.map((card, idx) => (
                <motion.div
                  key={card.id}
                  layoutId={`card-container-${card.id}`}
                  onClick={() => handleSelectCard(card.originalIndex)}
                  whileHover={{ y: -10, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                  className="shadow-pink-glow"
                  style={{
                    flexShrink: 0,
                    width: '185px',
                    height: '265px',
                    borderRadius: '18px',
                    backgroundColor: '#141419',
                    backgroundImage: `radial-gradient(circle at 80% 20%, ${card.accent} 0%, #121217 75%)`,
                    border: idx === 0
                      ? '1.5px solid #FADADD'
                      : '1px solid rgba(250, 218, 221, 0.25)',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  {/* Mini Hortensia Decorativa en la Tarjeta de la Cola */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-32px',
                      right: '-32px',
                      opacity: 0.45,
                      pointerEvents: 'none',
                    }}
                  >
                    <HydrangeaCluster interactive={false} size={105} />
                  </div>

                  {/* Número Romano de la Mini-Carta */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '10px',
                        color: '#FADADD',
                        letterSpacing: '0.15em',
                        display: 'block',
                      }}
                    >
                      CARTA {card.roman}
                    </span>
                    <span
                      className="font-serif"
                      style={{
                        fontSize: '2.2rem',
                        fontWeight: 700,
                        color: 'rgba(250, 250, 252, 0.22)',
                        lineHeight: 1,
                      }}
                    >
                      {card.roman}
                    </span>
                  </div>

                  {/* Título e Identificador en la parte inferior de la Mini-Carta */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '9px',
                        color: '#FADADD',
                        letterSpacing: '0.1em',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      {card.faction}
                    </span>
                    <h4
                      className="font-serif"
                      style={{
                        fontSize: '1.2rem',
                        color: '#FAFAFC',
                        margin: 0,
                        lineHeight: 1.2,
                        fontWeight: 600,
                      }}
                    >
                      {card.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Barra Inferior de Controles + Línea de Tiempo + Contador */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginTop: '18px',
              }}
            >
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handlePrev}
                  aria-label="Carta anterior"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(20, 20, 25, 0.9)',
                    border: '1px solid rgba(250, 218, 221, 0.35)',
                    color: '#FAFAFC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronLeft style={{ width: '18px', height: '18px' }} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Siguiente carta"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(20, 20, 25, 0.9)',
                    border: '1px solid rgba(250, 218, 221, 0.35)',
                    color: '#FAFAFC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronRight style={{ width: '18px', height: '18px' }} />
                </button>
              </div>

              {/* Barra de Progreso Discreta por Posición (Sin temporizador) */}
              <div
                style={{
                  flex: 1,
                  height: '3px',
                  backgroundColor: 'rgba(250, 218, 221, 0.14)',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${((activeIndex + 1) / cards.length) * 100}%`,
                    backgroundColor: '#FADADD',
                    borderRadius: '9999px',
                    boxShadow: '0 0 8px rgba(250, 218, 221, 0.35)',
                    transition: 'width 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </div>

              {/* Numeración Grande Derecha (01 / 15) */}
              <span
                className="font-serif"
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#FADADD',
                  minWidth: '64px',
                  textAlign: 'right',
                }}
              >
                {String(activeIndex + 1).padStart(2, '0')}
                <span style={{ fontSize: '1rem', color: '#A1A0AB', fontWeight: 400 }}>
                  /{cards.length}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
