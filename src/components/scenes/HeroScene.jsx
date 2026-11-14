import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import HydrangeaCluster from '../botanical/HydrangeaCluster';

function generateConstellationData(count = 520) {
  const canvas = document.createElement('canvas');
  canvas.width = 260;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 115px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('21', canvas.width / 2, canvas.height / 2);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const textPoints = [];

  for (let y = 0; y < canvas.height; y += 3) {
    for (let x = 0; x < canvas.width; x += 3) {
      const alpha = imageData[(y * canvas.width + x) * 4];
      if (alpha > 128) {
        textPoints.push({
          x: (x - canvas.width / 2) * 0.032,
          y: -(y - canvas.height / 2) * 0.032,
          z: (Math.random() - 0.5) * 0.45,
        });
      }
    }
  }

  const spherePositions = new Float32Array(count * 3);
  const targetPositions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const colorWhite = new THREE.Color('#FAFAFC');
  const colorPink = new THREE.Color('#FADADD');
  const colorDeepPink = new THREE.Color('#E2A9B2');
  const colorChampagne = new THREE.Color('#FDF0D5');

  for (let i = 0; i < count; i++) {
    const isInnerSphere = i % 3 === 0;
    const radius = isInnerSphere ? 1.55 : 2.75;
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;

    spherePositions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
    spherePositions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    spherePositions[i * 3 + 2] = radius * Math.cos(phi);

    if (i < count * 0.72 && textPoints.length > 0) {
      const pt = textPoints[i % textPoints.length];
      targetPositions[i * 3] = pt.x + (Math.random() - 0.5) * 0.06;
      targetPositions[i * 3 + 1] = pt.y + (Math.random() - 0.5) * 0.06;
      targetPositions[i * 3 + 2] = pt.z;
    } else {
      const auraRadius = 2.85 + (Math.random() - 0.5) * 0.3;
      targetPositions[i * 3] = auraRadius * Math.cos(theta) * Math.sin(phi);
      targetPositions[i * 3 + 1] = auraRadius * Math.sin(theta) * Math.sin(phi);
      targetPositions[i * 3 + 2] = auraRadius * Math.cos(phi);
    }

    const chosenColor =
      i % 9 === 0 ? colorChampagne : i % 4 === 0 ? colorPink : i % 7 === 0 ? colorDeepPink : colorWhite;
    colors[i * 3] = chosenColor.r;
    colors[i * 3 + 1] = chosenColor.g;
    colors[i * 3 + 2] = chosenColor.b;
  }

  return { spherePositions, targetPositions, colors, count };
}

function Constellation21({ morphed }) {
  const groupRef = useRef();
  const pointsRef = useRef();
  const linesRef = useRef();

  const { spherePositions, targetPositions, colors, count } = useMemo(
    () => generateConstellationData(520),
    []
  );

  const initialPositions = useMemo(() => new Float32Array(spherePositions), [spherePositions]);

  const lineIndices = useMemo(() => {
    const indices = [];
    for (let i = 0; i < count; i++) {
      let connections = 0;
      for (let j = i + 1; j < count; j++) {
        const dx = targetPositions[i * 3] - targetPositions[j * 3];
        const dy = targetPositions[i * 3 + 1] - targetPositions[j * 3 + 1];
        const dz = targetPositions[i * 3 + 2] - targetPositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 0.42 && connections < 3) {
          indices.push(i, j);
          connections++;
        }
      }
    }
    return new Uint16Array(indices);
  }, [targetPositions, count]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current?.geometry?.attributes?.position;
    const linePosAttr = linesRef.current?.geometry?.attributes?.position;

    if (posAttr && linePosAttr) {
      const pArr = posAttr.array;
      const lArr = linePosAttr.array;

      for (let i = 0; i < count * 3; i++) {
        const goal = morphed ? targetPositions[i] : spherePositions[i];
        pArr[i] += (goal - pArr[i]) * Math.min(delta * 3.2, 0.15);
        lArr[i] = pArr[i];
      }

      posAttr.needsUpdate = true;
      linePosAttr.needsUpdate = true;
    }

    if (groupRef.current) {
      const targetRotY = state.pointer.x * 0.35 + Math.sin(time * 0.35) * 0.12;
      const targetRotX = -state.pointer.y * 0.25 + Math.cos(time * 0.25) * 0.08;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.06;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={initialPositions} itemSize={3} />
          <bufferAttribute attach="index" count={lineIndices.length} array={lineIndices} itemSize={1} />
        </bufferGeometry>
        <lineBasicMaterial color="#FADADD" transparent opacity={0.18} blending={THREE.AdditiveBlending} />
      </lineSegments>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={initialPositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.065} vertexColors transparent opacity={0.95} blending={THREE.AdditiveBlending} sizeAttenuation />
      </points>
    </group>
  );
}

export default function HeroScene({ profile }) {
  const [morphed, setMorphed] = useState(false);
  const [isTouchDevice] = useState(() => {
    return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768);
  });

  useEffect(() => {
    const timer = setTimeout(() => setMorphed(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('brother-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100dvh',
        height: '100vh',
        width: '100%',
        backgroundColor: '#050507',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '-18%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '110vw',
          height: '55vh',
          background: 'radial-gradient(ellipse at center, rgba(250,218,221,0.22) 0%, rgba(255,255,255,0.08) 38%, rgba(5,5,7,0) 72%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <div style={{ position: 'absolute', top: '20px', right: '24px', opacity: 0.75, zIndex: 4, pointerEvents: 'none' }}>
        <HydrangeaCluster baseDelay={0.2} size={165} />
      </div>

      {/* Canvas 3D: en pantallas táctiles se desactiva pointerEvents para permitir el scroll natural del celular */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          cursor: isTouchDevice ? 'default' : 'grab',
          pointerEvents: isTouchDevice ? 'none' : 'auto',
          touchAction: 'pan-y',
        }}
      >
        <Canvas camera={{ position: [0, 0, 6.2], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={0.8} />
          <Constellation21 morphed={morphed} />
          {!isTouchDevice && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.4}
              rotateSpeed={0.5}
            />
          )}
        </Canvas>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '28px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#FADADD' }}>
          {profile?.editionTag}
        </span>

        <button
          onClick={() => setMorphed((prev) => !prev)}
          className="font-mono"
          style={{
            pointerEvents: 'auto',
            padding: '8px 16px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(20, 20, 25, 0.75)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(250, 218, 221, 0.3)',
            color: '#FAFAFC',
            fontSize: '11px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Sparkles style={{ width: '13px', height: '13px' }} color="#F5D79E" />
          {morphed ? 'Ver Esfera Orbital' : 'Formar el 21'}
        </button>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 8vw 11vh 8vw',
          maxWidth: '680px',
          pointerEvents: 'none',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-sans"
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: 600,
            color: '#FAFAFC',
            lineHeight: 1.08,
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          ¡Feliz Cumpleaños
          <span
            className="font-serif italic"
            style={{
              display: 'block',
              color: '#FADADD',
              fontWeight: 400,
              marginTop: '4px',
              textShadow: '0 0 25px rgba(250, 218, 221, 0.35)',
            }}
          >
            Sam!
          </span>
        </motion.h1>

        <motion.button
          onClick={handleScrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="font-mono"
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '11px',
            color: '#A1A0AB',
            marginTop: '16px',
            letterSpacing: '0.12em',
            cursor: 'pointer',
            padding: 0,
            pointerEvents: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          DESLIZA PARA SEGUIR EXPLORANDO
        </motion.button>
      </div>

      {/* Botón táctil explícito para deslizar/bajar */}
      <motion.button
        onClick={handleScrollDown}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Deslizar hacia abajo"
        style={{
          position: 'absolute',
          bottom: '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          pointerEvents: 'auto',
          backgroundColor: 'rgba(20, 20, 25, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(250, 218, 221, 0.3)',
          borderRadius: '9999px',
          padding: '8px 18px',
          color: '#FADADD',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          boxShadow: '0 0 16px rgba(250, 218, 221, 0.2)',
        }}
      >
        <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.14em' }}>
          DESLIZAR
        </span>
        <ChevronDown style={{ width: '15px', height: '15px' }} />
      </motion.button>
    </section>
  );
}
