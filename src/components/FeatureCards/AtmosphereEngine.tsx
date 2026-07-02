import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './AtmosphereEngine.module.css';

interface AtmosphereEngineProps {
  activeIndex: number;
}

const AtmosphereEngine: React.FC<AtmosphereEngineProps> = ({ activeIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  // Render crossfades directly linked to the activeIndex.
  useGSAP(() => {
    layersRef.current.forEach((layer, i) => {
      if (!layer) return;
      if (i === activeIndex) {
        // Fade in
        gsap.to(layer, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        // Fade out
        gsap.to(layer, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });
  }, { dependencies: [activeIndex], scope: containerRef });

  // Ambient internal animations
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    // Streak Embers
    const embers = containerRef.current.querySelectorAll(`.${styles.ember}`);
    embers.forEach((ember) => {
      gsap.to(ember, {
        y: '-=150',
        x: 'random(-20, 20)',
        opacity: 0,
        duration: 'random(5, 10)',
        repeat: -1,
        ease: 'sine.inOut',
        delay: 'random(0, 4)'
      });
    });

    // Calendar Highlights
    const calHighlights = containerRef.current.querySelectorAll(`.${styles.calHighlight}`);
    calHighlights.forEach((hl) => {
      gsap.to(hl, {
        opacity: 'random(0.02, 0.08)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 'random(0, 5)'
      });
    });

    // Reflection Quotes floating
    const quotes = containerRef.current.querySelectorAll(`.${styles.reflectionQuote}`);
    quotes.forEach((quote) => {
      gsap.to(quote, {
        y: 'random(-15, 15)',
        rotation: 'random(-2, 2)',
        opacity: 'random(0.01, 0.03)',
        duration: 'random(6, 10)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 'random(0, 2)'
      });
    });

    const reflectSpotlight = containerRef.current.querySelector(`.${styles.reflectionSpotlight}`);
    if (reflectSpotlight) {
      gsap.to(reflectSpotlight, {
        x: 'random(-20, 20)',
        y: 'random(-20, 20)',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Focus Glow breathing
    const focusGlow = containerRef.current.querySelector(`.${styles.focusGlow}`);
    if (focusGlow) {
      gsap.to(focusGlow, {
        scale: 1.05,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Heatmap Cells
    const heatCells = containerRef.current.querySelectorAll(`.${styles.heatCell}`);
    heatCells.forEach((cell) => {
      // randomly pick a subset of cells to animate
      if (Math.random() > 0.85) {
        gsap.to(cell, {
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          duration: 'random(2, 5)',
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: 'random(0, 10)'
        });
      }
    });

    // Zero Lines
    const zeroLines = containerRef.current.querySelectorAll(`.${styles.zeroLine}`);
    zeroLines.forEach((line) => {
      gsap.to(line, {
        opacity: 0,
        duration: 'random(4, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 'random(0, 4)'
      });
    });

  }, { scope: containerRef });

  return (
    <div className={styles.engine} ref={containerRef}>
      {/* 1. Streak Layer */}
      <div className={`${styles.layer} ${styles.streakLayer}`} ref={(el) => (layersRef.current[0] = el)}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={styles.ember}
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${10 + Math.random() * 80}%`,
              top: `${50 + Math.random() * 50}%`,
            }}
          />
        ))}
      </div>

      {/* 2. Calendar Layer */}
      <div className={`${styles.layer} ${styles.calendarLayer}`} ref={(el) => (layersRef.current[1] = el)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={styles.calHighlight}
            style={{
              left: `${Math.floor(Math.random() * 25) * 40}px`,
              top: `${Math.floor(Math.random() * 25) * 40}px`,
            }}
          />
        ))}
      </div>

      {/* 3. Reflection Layer */}
      <div className={`${styles.layer} ${styles.reflectionLayer}`} ref={(el) => (layersRef.current[2] = el)}>
        <div className={styles.reflectionSpotlight} />
        <div className={styles.reflectionQuote} style={{ left: '15%', top: '20%' }}>"</div>
        <div className={styles.reflectionQuote} style={{ right: '15%', bottom: '20%' }}>"</div>
      </div>

      {/* 4. Focus Layer */}
      <div className={`${styles.layer} ${styles.focusLayer}`} ref={(el) => (layersRef.current[3] = el)}>
        <div className={styles.focusGlow} />
      </div>

      {/* 5. Heatmap Layer */}
      <div className={`${styles.layer} ${styles.heatmapLayer}`} ref={(el) => (layersRef.current[4] = el)}>
        {Array.from({ length: 150 }).map((_, i) => (
          <div key={i} className={styles.heatCell} />
        ))}
      </div>

      {/* 6. Zero Layer */}
      <div className={`${styles.layer} ${styles.zeroLayer}`} ref={(el) => (layersRef.current[5] = el)}>
         {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={styles.zeroLine}
            style={{
              width: i % 2 === 0 ? '100%' : '1px',
              height: i % 2 === 0 ? '1px' : '100%',
              left: i % 2 === 0 ? '0' : `${Math.random() * 100}%`,
              top: i % 2 === 0 ? `${Math.random() * 100}%` : '0',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AtmosphereEngine;
