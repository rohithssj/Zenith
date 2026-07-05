import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero title line by line reveal
    gsap.to('.hero-line-inner', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.2
    });

    // Hero subtitle fade up
    gsap.to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.6
    });

    // Hero buttons fade up
    gsap.to('.hero-buttons', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.8
    });
  }, { scope: heroRef });

  return (
    <header className={styles.hero} ref={heroRef}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          <span className={styles.line}>
            <span className={`${styles.lineInner} hero-line-inner`}>Show up today.</span>
          </span>
          <br />
          <span className={styles.line}>
            <span className={`${styles.lineInner} hero-line-inner`}>
              Build a <span className={styles.highlight}>streak</span> that lasts.
            </span>
          </span>
        </h1>
        
        <p className={`${styles.heroSubtitle} hero-subtitle`}>
          Zanki is a productivity system built around one idea:<br />
          Consistency beats complexity.<br />
          No workspaces. No clutter. Just your work, every day.
        </p>
        
        <div className={`${styles.heroButtons} hero-buttons`}>
          <a href="#start" className={`${styles.btn} ${styles.btnPrimary}`}>Start for free</a>
          <a href="#demo" className={`${styles.btn} ${styles.btnSecondary}`}>See how it works</a>
        </div>
      </div>
    </header>
  );
};

export default Hero;
