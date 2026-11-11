import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Eye,
} from 'lucide-react';
import HydrangeaCluster from '../botanical/HydrangeaCluster';

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export default function DivergentGarden({ gardenData, onBack }) {
  const allCards = useMemo(() => {
    let counter = 0;
    const deck = [];
    gardenData?.letters?.forEach((group) => {
      group?.quotes?.forEach((quoteText) => {
        deck.push({
          id: `${group.id}-${counter}`,
          index: counter,
          roman: ROMAN_NUMERALS[counter] || `${counter + 1}`,
          groupId: group.id,
          categoryTitle: group.title,
          factionTag: group.factionTag,
          whenToRead: group.whenToRead,
          quote: quoteText,
        });
        counter++;
      });
    });
    return deck;
  }, [gardenData]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [readCardIds, setReadCardIds] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedCardId, setFlippedCardId] = useState(null);

  const filteredCards = useMemo(() => {
    if (selectedCategory === 'all') return allCards;
    return allCards.filter((c) => c.groupId === selectedCategory);
  }, [allCards, selectedCategory]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setActiveIndex(0);
    setFlippedCardId(null);
  };

  const currentCard = filteredCards[activeIndex] || filteredCards[0];

  const handleNext = useCallback(() => {
    setFlippedCardId(null);
    setActiveIndex((prev) => (prev + 1) % filteredCards.length);
  }, [filteredCards.length]);

  const handlePrev = useCallback(() => {
    setFlippedCardId(null);
    setActiveIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  }, [filteredCards.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev]);

  const toggleFlip = (card) => {
    if (flippedCardId === card.id) {
      setFlippedCardId(null);
    } else {
      setFlippedCardId(card.id);
      if (!readCardIds.includes(card.id)) {
        setReadCardIds((prev) => [...prev, card.id]);
      }
    }
  };

  const words = useMemo(() => {
    return currentCard ? currentCard.quote.split(' ') : [];
  }, [currentCard]);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '36px 20px 80px 20px',
        backgroundColor: '#0A0A0D',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient cluster */}
      <div style={{ position: 'absolute', top: '10px', right: '-60px', opacity: 0.35, pointerEvents: 'none' }}>
        <HydrangeaCluster baseDelay={0.1} size={260} />
      </div>

      <div style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Top bar with back button & edition tag (No traditional navbar) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
            paddingBottom: '20px',
            borderBottom: '1px solid rgba(250, 218, 221, 0.12)',
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

          <div
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(20, 20, 25, 0.65)',
              border: '1px solid rgba(250, 218, 221, 0.22)',
            }}
          >
            <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.18em', color: '#FADADD' }}>
              {gardenData?.headerTag}
            </span>
          </div>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 700,
              color: '#FAFAFC',
              margin: '0 0 12px 0',
              lineHeight: 1.15,
            }}
          >
            {gardenData?.title}
          </h2>

          <p
            className="font-serif italic"
            style={{
              color: '#A1A0AB',
              fontSize: '1.2rem',
              maxWidth: '640px',
              margin: '0 auto 24px auto',
              lineHeight: 1.6,
            }}
          >
            {gardenData?.subtitle}
          </p>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <button
              onClick={() => handleCategoryChange('all')}
              className="font-mono"
              style={{
                padding: '7px 16px',
                borderRadius: '9999px',
                fontSize: '11px',
                cursor: 'pointer',
                backgroundColor: selectedCategory === 'all' ? '#FADADD' : '#141419',
                color: selectedCategory === 'all' ? '#0A0A0D' : '#FAFAFC',
                border: '1px solid rgba(250, 218, 221, 0.3)',
                fontWeight: selectedCategory === 'all' ? 700 : 400,
                transition: 'all 0.2s ease',
              }}
            >
              Todas ({allCards.length})
            </button>

            {gardenData?.letters?.map((group) => (
              <button
                key={group.id}
                onClick={() => handleCategoryChange(group.id)}
                className="font-mono"
                style={{
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === group.id ? '#FADADD' : '#141419',
                  color: selectedCategory === group.id ? '#0A0A0D' : '#FAFAFC',
                  border: '1px solid rgba(250, 218, 221, 0.3)',
                  fontWeight: selectedCategory === group.id ? 700 : 400,
                  transition: 'all 0.2s ease',
                }}
              >
                {group.title}
              </button>
            ))}

            <span
              className="font-mono"
              style={{
                padding: '7px 14px',
                borderRadius: '9999px',
                fontSize: '11px',
                backgroundColor: 'rgba(20,20,25,0.6)',
                color: '#FADADD',
                border: '1px dashed rgba(250,218,221,0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Eye style={{ width: '13px', height: '13px' }} />
              Leídas: {readCardIds.length} / {allCards.length}
            </span>
          </div>
        </div>

        {/* 3D LINEAR CAROUSEL STAGE */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '560px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1400px',
            perspectiveOrigin: '50% 50%',
            margin: '20px 0 30px 0',
            userSelect: 'none',
          }}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Carta anterior"
            className="shadow-pink-glow"
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 40,
              width: '46px',
              height: '46px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(20, 20, 25, 0.85)',
              border: '1px solid rgba(250, 218, 221, 0.4)',
              color: '#FADADD',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }}
          >
            <ChevronLeft style={{ width: '22px', height: '22px' }} />
          </button>

          <button
            onClick={handleNext}
            aria-label="Siguiente carta"
            className="shadow-pink-glow"
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 40,
              width: '46px',
              height: '46px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(20, 20, 25, 0.85)',
              border: '1px solid rgba(250, 218, 221, 0.4)',
              color: '#FADADD',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }}
          >
            <ChevronRight style={{ width: '22px', height: '22px' }} />
          </button>

          {/* Cards Track */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transformStyle: 'preserve-3d',
            }}
          >
            {filteredCards.map((card, idx) => {
              const offset = idx - activeIndex;
              const isCenter = offset === 0;
              const isFlipped = flippedCardId === card.id;
              const isRead = readCardIds.includes(card.id);

              // Don't render cards far away to keep 60 FPS
              if (Math.abs(offset) > 2) return null;

              // Calculate 3D transforms
              const xOffset = offset * 280;
              const scale = isCenter ? 1 : Math.max(0.72, 1 - Math.abs(offset) * 0.18);
              const zTranslate = Math.abs(offset) * -120;
              const baseRotateY = offset < 0 ? 30 : offset > 0 ? -30 : 0;
              const currentRotateY = isCenter && isFlipped ? 180 : baseRotateY;
              const opacity = isCenter ? 1 : Math.max(0.35, 1 - Math.abs(offset) * 0.42);
              const zIndex = 30 - Math.abs(offset) * 5;

              return (
                <motion.div
                  key={card.id}
                  style={{
                    position: 'absolute',
                    width: 'min(380px, 86vw)',
                    height: '490px',
                    transformStyle: 'preserve-3d',
                    cursor: isCenter ? 'pointer' : 'pointer',
                    zIndex,
                  }}
                  animate={{
                    x: xOffset,
                    scale,
                    rotateY: currentRotateY,
                    z: zTranslate,
                    opacity,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 160,
                    damping: 22,
                    mass: 0.9,
                  }}
                  onClick={() => {
                    if (isCenter) {
                      toggleFlip(card);
                    } else {
                      setFlippedCardId(null);
                      setActiveIndex(idx);
                    }
                  }}
                  drag={isCenter ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset: dragOffset, velocity }) => {
                    if (dragOffset.x > 70 || velocity.x > 300) {
                      handlePrev();
                    } else if (dragOffset.x < -70 || velocity.x < -300) {
                      handleNext();
                    }
                  }}
                >
                  {/* FRONT FACE */}
                  <div
                    className={isCenter ? 'shadow-pink-glow-lg' : 'shadow-pink-glow'}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '26px',
                      backgroundColor: '#121217',
                      border: isCenter
                        ? '1.8px solid rgba(250, 218, 221, 0.7)'
                        : '1px solid rgba(250, 218, 221, 0.25)',
                      padding: '28px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      overflow: 'hidden',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg)',
                    }}
                  >
                    {/* Top card info */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.18em', color: '#FADADD' }}>
                        CARTA {card.roman}
                      </span>

                      {isRead ? (
                        <span
                          className="font-mono"
                          style={{
                            fontSize: '10px',
                            color: '#0A0A0D',
                            backgroundColor: '#FADADD',
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <CheckCircle2 style={{ width: '11px', height: '11px' }} /> LEÍDA
                        </span>
                      ) : (
                        <span
                          className="font-mono"
                          style={{
                            fontSize: '10px',
                            color: '#A1A0AB',
                            border: '1px solid rgba(250,218,221,0.25)',
                            padding: '2px 8px',
                            borderRadius: '9999px',
                          }}
                        >
                          OCULTA
                        </span>
                      )}
                    </div>

                    {/* Floral Emblem Center */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '10px 0',
                      }}
                    >
                      <div
                        style={{
                          width: '90px',
                          height: '90px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(10, 10, 13, 0.85)',
                          border: '1.5px solid rgba(250, 218, 221, 0.45)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 35px rgba(250, 218, 221, 0.25)',
                          marginBottom: '20px',
                        }}
                      >
                        <svg viewBox="-35 -35 70 70" style={{ width: '56px', height: '56px' }}>
                          <path d="M 0,-3 C -13,-14 -15,-28 0,-30 C 15,-28 13,-14 0,-3 Z" fill="#FADADD" />
                          <path d="M 0,3 C -13,14 -15,28 0,30 C 15,28 13,14 0,3 Z" fill="#E2A9B2" />
                          <path d="M -3,0 C -14,-13 -28,-15 -30,0 C -28,15 -14,13 -3,0 Z" fill="#FCEEF2" />
                          <path d="M 3,0 C 14,-13 28,-15 30,0 C 28,15 14,13 3,0 Z" fill="#FADADD" />
                          <circle cx="0" cy="0" r="4.5" fill="#0A0A0D" />
                          <circle cx="0" cy="0" r="1.8" fill="#FDF0D5" />
                          <circle cx="0" cy="0" r="0.9" fill="#F5D79E" />
                        </svg>
                      </div>

                      <span className="font-serif" style={{ fontSize: '1.75rem', color: '#FAFAFC', fontWeight: 600 }}>
                        {card.categoryTitle}
                      </span>
                      <span className="font-mono" style={{ fontSize: '10px', color: '#FADADD', letterSpacing: '0.14em', marginTop: '6px' }}>
                        {card.factionTag}
                      </span>
                      <span className="font-serif italic" style={{ fontSize: '0.95rem', color: '#A1A0AB', marginTop: '10px' }}>
                        {card.whenToRead}
                      </span>
                    </div>

                    {/* Bottom CTA */}
                    <div style={{ textAlign: 'center' }}>
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '11px',
                          color: '#FAFAFC',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: 'rgba(250, 218, 221, 0.08)',
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          border: '1px solid rgba(250, 218, 221, 0.25)',
                        }}
                      >
                        <Sparkles style={{ width: '13px', height: '13px' }} color="#F5D79E" />
                        {isCenter ? 'Toca para voltear en 3D' : 'Toca para centrar'}
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE (REVEALED 180 DEGREE) */}
                  <div
                    className="shadow-pink-glow-lg"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '26px',
                      backgroundColor: '#121217',
                      border: '1.8px solid #FADADD',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      padding: '28px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Corner Hydrangeas */}
                    <div style={{ position: 'absolute', top: '-45px', right: '-45px', opacity: 0.5, pointerEvents: 'none' }}>
                      <HydrangeaCluster baseDelay={0.2} interactive={false} size={150} />
                    </div>
                    <div style={{ position: 'absolute', bottom: '-45px', left: '-45px', opacity: 0.35, pointerEvents: 'none' }}>
                      <HydrangeaCluster baseDelay={0.3} interactive={false} size={140} />
                    </div>

                    {/* Back header */}
                    <div style={{ position: 'relative', zIndex: 5, borderBottom: '1px solid rgba(250, 218, 221, 0.2)', paddingBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-mono" style={{ fontSize: '11px', color: '#FADADD', letterSpacing: '0.18em' }}>
                          CARTA ELEGIDA // {card.roman}
                        </span>
                        <Sparkles style={{ width: '15px', height: '15px' }} color="#F5D79E" />
                      </div>
                      <h4 className="font-serif" style={{ fontSize: '1.35rem', color: '#FAFAFC', margin: '4px 0 0 0' }}>
                        {card.categoryTitle}
                      </h4>
                    </div>

                    {/* Word-by-word quote */}
                    <div style={{ position: 'relative', zIndex: 5, margin: 'auto 0', padding: '16px 4px', textAlign: 'center' }}>
                      <p
                        className="font-serif italic"
                        style={{
                          fontSize: 'clamp(1.15rem, 2.8vw, 1.35rem)',
                          lineHeight: 1.65,
                          color: '#FAFAFC',
                          margin: 0,
                        }}
                      >
                        <span style={{ color: '#FADADD', fontSize: '1.6rem', marginRight: '4px' }}>“</span>
                        {isFlipped &&
                          words.map((word, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                              transition={{ duration: 0.35, delay: 0.2 + i * 0.038 }}
                              style={{ display: 'inline-block', marginRight: '5px' }}
                            >
                              {word}
                            </motion.span>
                          ))}
                        <span style={{ color: '#FADADD', fontSize: '1.6rem', marginLeft: '2px' }}>”</span>
                      </p>
                    </div>

                    {/* Back Footer Actions */}
                    <div
                      style={{
                        position: 'relative',
                        zIndex: 5,
                        borderTop: '1px solid rgba(250, 218, 221, 0.18)',
                        paddingTop: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(card);
                        }}
                        className="font-mono"
                        style={{
                          padding: '8px 14px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(10, 10, 13, 0.85)',
                          border: '1px solid rgba(250, 218, 221, 0.3)',
                          color: '#FADADD',
                          fontSize: '11px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <RotateCcw style={{ width: '12px', height: '12px' }} /> Voltear
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                        className="font-mono"
                        style={{
                          flex: 1,
                          padding: '9px 14px',
                          borderRadius: '10px',
                          backgroundColor: '#FADADD',
                          border: 'none',
                          color: '#0A0A0D',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          cursor: 'pointer',
                        }}
                      >
                        SIGUIENTE CARTA →
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Indicator (Roman Numerals) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            margin: '10px 0 40px 0',
          }}
        >
          {filteredCards.map((card, idx) => {
            const isCurrent = idx === activeIndex;
            const isRead = readCardIds.includes(card.id);

            return (
              <button
                key={card.id}
                onClick={() => {
                  setFlippedCardId(null);
                  setActiveIndex(idx);
                }}
                className="font-mono"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '9999px',
                  backgroundColor: isCurrent ? '#FADADD' : 'rgba(20, 20, 25, 0.8)',
                  color: isCurrent ? '#0A0A0D' : isRead ? '#FADADD' : '#A1A0AB',
                  border: isCurrent
                    ? '2px solid #FDF0D5'
                    : isRead
                    ? '1px solid rgba(250, 218, 221, 0.45)'
                    : '1px solid rgba(250, 218, 221, 0.15)',
                  fontSize: '11px',
                  fontWeight: isCurrent ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s ease',
                  boxShadow: isCurrent ? '0 0 18px rgba(245, 215, 158, 0.45)' : 'none',
                }}
              >
                {card.roman}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
