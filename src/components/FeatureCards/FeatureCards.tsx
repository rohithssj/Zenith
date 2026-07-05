import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './FeatureCards.module.css';
import AtmosphereEngine from './AtmosphereEngine';

gsap.registerPlugin(ScrollTrigger);

const FeatureCards: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const activeIndexRef = useRef(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Refs for micro-animations
  const streakNumRef = useRef<HTMLDivElement>(null);
  const focusRingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pinRef.current) return;
    
    // Header fade in
    gsap.fromTo('.fc-header', 
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out', scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      }}
    );

    // Setup Master Timeline for pinning and card transitions
    const totalCards = cardsRef.current.length;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinRef.current,
        start: 'top top',
        end: `+=${totalCards * 90}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (self.progress < 0.01) {
            if (activeIndexRef.current !== -1) {
              activeIndexRef.current = -1;
              setActiveIndex(-1);
            }
            return;
          }
          
          let newIndex = Math.floor((self.progress * totalCards) + 0.1); 
          if (newIndex >= totalCards) newIndex = totalCards - 1;
          if (newIndex < 0) newIndex = 0;
          
          if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex;
            setActiveIndex(newIndex);
          }
        }
      }
    });

    // Build the crossfade sequence
    cardsRef.current.forEach((card, i) => {
      if (i === 0) {
        gsap.set(card, { autoAlpha: 0, scale: 0.98, y: 40, filter: 'blur(0px)' });
        tl.to(card, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.out',
        });
      } else {
        // Prepare next card
        gsap.set(card, { autoAlpha: 0, scale: 0.98, y: 40, filter: 'blur(0px)' });
        
        // Pause to let the user read the current card before transitioning
        tl.to({}, { duration: 0.2 });
        
        // Transition: Fade out previous card
        tl.to(cardsRef.current[i - 1], {
          autoAlpha: 0,
          y: -40,
          scale: 0.98,
          filter: 'blur(8px)',
          duration: 1,
          ease: 'power2.inOut',
        }, `+=${0.05}`);

        // Transition: Fade in current card (overlapping)
        tl.to(card, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.inOut',
        }, '<0.2');
      }
    });
    
    // Final pause
    tl.to({}, { duration: 0.4 });
    
  }, { scope: containerRef });

  // Micro animations
  useEffect(() => {
    // Continuous rotation for focus ring
    if (focusRingRef.current) {
      gsap.to(focusRingRef.current, {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: 'linear'
      });
    }

    // Number count up for streak
    let interval: number;
    if (streakNumRef.current) {
      let count = 0;
      interval = window.setInterval(() => {
        count++;
        if (count > 12) count = 0;
        if (streakNumRef.current) {
          streakNumRef.current.innerText = count.toString();
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <section className={styles.container} ref={containerRef} id="features">
      <div className={`${styles.header} fc-header`}>
        <h2 className={styles.headerTitle}>
          Everything you need.<br/>
          Nothing you don't.
        </h2>
        <p className={styles.headerSubtitle}>
          Six ideas, working together quietly.
        </p>
      </div>

      <div className={styles.pinContainer} ref={pinRef}>
        <AtmosphereEngine activeIndex={activeIndex} />
        
        {/* CARD 01 - Streak */}
        <div className={styles.card} ref={(el) => (cardsRef.current[0] = el)}>
          <div className={styles.cardContent}>
            <div className={styles.textSection}>
              <div className={styles.num}>01 — streak system</div>
              <h3 className={styles.title}>Every day you<br/>show up, counts.</h3>
              <p className={styles.desc}>A completed day adds to your streak. Watch consistency become something you can see, not just something you hope for.</p>
            </div>
            <div className={styles.visualSection}>
              <div className={styles.frame}>
                <div className={styles.streakcard}>
                  <div className={styles.flame}>🔥</div>
                  <div className={styles.streaknum} ref={streakNumRef}>12</div>
                  <div className={styles.streaklabel}>day streak — personal best</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 02 - Calendar */}
        <div className={styles.card} ref={(el) => (cardsRef.current[1] = el)}>
          <div className={styles.cardContent}>
            <div className={styles.textSection}>
              <div className={styles.num}>02 — story calendar</div>
              <h3 className={styles.title}>Your calendar tells<br/>the story of your past.</h3>
              <p className={styles.desc}>Not a planner for the future. A record of what you actually did. Hover any day to relive it.</p>
            </div>
            <div className={styles.visualSection}>
              <div className={styles.frame}>
                <div className={styles.calmini}>
                  {Array.from({ length: 35 }).map((_, i) => {
                    const isHi = [3, 8, 12, 15, 16, 17, 22, 27].includes(i);
                    return (
                      <div key={i} className={`${styles.dcell} ${isHi ? styles.hi : ''}`}>
                        {i + 1 <= 30 ? i + 1 : ''}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 03 - Reflection */}
        <div className={styles.card} ref={(el) => (cardsRef.current[2] = el)}>
          <div className={styles.cardContent}>
            <div className={styles.textSection}>
              <div className={styles.num}>03 — daily reflection</div>
              <h3 className={styles.title}>One question.<br/>Every evening.</h3>
              <p className={styles.desc}>What went well today? A single short reflection, stored quietly with your work, forever.</p>
            </div>
            <div className={styles.visualSection}>
              <div className={styles.frame}>
                <div className={styles.reflectbox}>
                  <div className={styles.rq}>What went well today?</div>
                  <div className={styles.rtext}>"Pushed the landing page earlier than expected. Felt good to finish before dinner."</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 04 - Focus */}
        <div className={styles.card} ref={(el) => (cardsRef.current[3] = el)}>
          <div className={styles.cardContent}>
            <div className={styles.textSection}>
              <div className={styles.num}>04 — focus mode</div>
              <h3 className={styles.title}>One task.<br/>Nothing else.</h3>
              <p className={styles.desc}>No tabs, no sidebar, no noise. Your screen shows exactly one thing — the thing you said mattered most.</p>
            </div>
            <div className={styles.visualSection}>
              <div className={styles.frame}>
                <div className={styles.focusbox}>
                  <div className={styles.focustask}>Push Zanki landing page</div>
                  <div className={styles.focusring} ref={focusRingRef}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 05 - Heatmap */}
        <div className={styles.card} ref={(el) => (cardsRef.current[4] = el)}>
          <div className={styles.cardContent}>
            <div className={styles.textSection}>
              <div className={styles.num}>05 — heatmap</div>
              <h3 className={styles.title}>Months of effort.<br/>One glance.</h3>
              <p className={styles.desc}>A GitHub-style heatmap of every day you've shown up. Density becomes proof of consistency.</p>
            </div>
            <div className={styles.visualSection}>
              <div className={styles.frame}>
                <div className={styles.heat}>
                  {Array.from({ length: 70 }).map((_, i) => {
                    const r = Math.random();
                    let bg = 'rgba(255,255,255,0.06)';
                    if (r > 0.8) bg = '#F97316';
                    else if (r > 0.6) bg = 'rgba(249,115,22,0.6)';
                    else if (r > 0.4) bg = 'rgba(249,115,22,0.3)';
                    else if (r > 0.25) bg = 'rgba(249,115,22,0.12)';
                    return <div key={i} className={styles.hcell} style={{ background: bg }}></div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 06 - Zero Complexity */}
        <div className={styles.card} ref={(el) => (cardsRef.current[5] = el)}>
          <div className={styles.cardContent}>
            <div className={styles.textSection}>
              <div className={styles.num}>06 — zero complexity</div>
              <h3 className={styles.title}>What we left out<br/>matters too.</h3>
              <p className={styles.desc}>No workspaces. No kanban boards. No AI chat bolted on for the sake of it. Just you, today, and tomorrow's streak.</p>
            </div>
            <div className={styles.visualSection}>
              <div className={styles.frame}>
                <div className={styles.zerolist}>
                  <div className={styles.zitem}>Workspaces</div>
                  <div className={styles.zitem}>Kanban boards</div>
                  <div className={styles.zitem}>Team chat</div>
                  <div className={styles.zitem}>AI chatbot</div>
                  <div className={styles.zitem}>File storage</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeatureCards;
