import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './HowItWorks.module.css';
import { 
  BrowserFrame, 
  Sidebar, 
  StreakBadge, 
  DashboardHeader, 
  TaskList, 
  TaskCard,
  ReflectionCard
} from '../ProductUI';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Create your space",
    desc: "Create your account in seconds.\nNo setup wizard.\nNo complicated onboarding.\nJust open Zanki and begin."
  },
  {
    num: "02",
    title: "Focus on today",
    desc: "Add only today's tasks.\nNo projects.\nNo endless folders.\nJust today's work."
  },
  {
    num: "03",
    title: "Build momentum",
    desc: "Complete your work.\nProtect your streak.\nMomentum grows one day at a time."
  },
  {
    num: "04",
    title: "Reflect",
    desc: "Every evening,\nanswer one simple question.\n\nSmall reflections become a story of your growth."
  }
];

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;

    // 1. Background Transition from FeatureCards
    gsap.to(bgRef.current, {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", // when section top hits viewport bottom
        end: "top 30%",      // fully transitioned when section top is at 30% of viewport
        scrub: true,
        onUpdate: (self) => {
          // Attempt to fade out atmosphere engine if it exists
          const atmosphere = document.getElementById("atmosphere-engine");
          if (atmosphere) {
            atmosphere.style.opacity = `${1 - self.progress}`;
          }
        }
      }
    });

    // 2. Header Entrance Animation
    gsap.to(headerRef.current, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    if (!isMobile) {
      const cards = cardsRef.current;
      
      // Initialize first card
      gsap.set(cards[0], { autoAlpha: 1, boxShadow: "0 0 60px rgba(255,122,24,0.05)" });

      // Master Timeline for pinned section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          pin: true,
          scrub: 1, // Smooth scrub
          start: "center center",
          end: "+=400%", // 4 full viewports of scroll
          onUpdate: (self) => {
            const p = self.progress;
            // Map progress to active step based on our 15-unit timeline
            // (3 stay, 1 transition) * 4 = 15 total units
            let step = 0;
            if (p > 3.5/15) step = 1;
            if (p > 7.5/15) step = 2;
            if (p > 11.5/15) step = 3;
            setActiveStep(step);
            
            // Animate progress lines smoothly during transitions
            const lines = document.querySelectorAll(`.${styles.progressLineInner}`);
            lines.forEach((line, i) => {
               const startP = (3 + i * 4) / 15;
               const endP = (4 + i * 4) / 15;
               let lineP = (p - startP) / (endP - startP);
               if (lineP < 0) lineP = 0;
               if (lineP > 1) lineP = 1;
               (line as HTMLElement).style.width = `${lineP * 100}%`;
            });

            // Handle Streak text update explicitly for Step 3 during its active phase
            if (step === 2 && p > 7.5/15 && p < 11.5/15) {
               // Timeline unit for step 3 is from 8/15 to 11/15
               const step3Progress = (p - 8/15) / (3/15);
               const streakVal = Math.min(12, Math.floor(Math.max(0, step3Progress) * 12));
               const el = document.getElementById("streak-timeline");
               if (el) {
                 el.innerText = streakVal > 0 ? `Day ${streakVal} → 🔥${streakVal}` : "Day 0";
               }
            }
          }
        }
      });

      cards.forEach((card, i) => {
        if(!card) return;

        if (i > 0) {
          // Transition phase (1 unit)
          const label = `transition-${i}`;
          
          // Outgoing card
          tl.to(cards[i-1], {
            autoAlpha: 0,
            y: -40,
            scale: 0.98,
            rotateX: -3,
            filter: "blur(4px)",
            boxShadow: "0 0 0px rgba(255,122,24,0)",
            duration: 1,
            ease: "power2.inOut"
          }, label);

          // Incoming card
          tl.fromTo(card, {
            autoAlpha: 0,
            y: 40,
            scale: 0.98,
            rotateX: 3,
            filter: "blur(4px)",
            boxShadow: "0 0 0px rgba(255,122,24,0)"
          }, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            filter: "blur(0px)",
            boxShadow: "0 0 60px rgba(255,122,24,0.05)",
            duration: 1,
            ease: "power2.inOut"
          }, label);

          // Parallax inner elements
          tl.fromTo(card.querySelectorAll('.parallax-el'), {
            y: (index, target) => target.dataset.y || 20,
            scale: (index, target) => target.dataset.scale || 1,
            autoAlpha: 0
          }, {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out"
          }, label);
        }

        // Stay phase (3 units)
        // Except for step 3 animations which we want to scrub during the stay phase
        if (i === 1) {
          // Step 2 inner animations scrub during stay
          tl.fromTo(".step2-task", { x: 20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.3, duration: 1, ease: "back.out(1.2)" }, `stay-${i}`);
          tl.to({}, { duration: 2 }, `stay-${i}+=1`); // Pad the rest of the 3 units
        } else if (i === 2) {
          // Step 3 inner animations scrub during stay
          tl.to(".step3-circle", { backgroundColor: "var(--accent)", borderColor: "var(--accent)", duration: 0.3, stagger: 0.2 }, `stay-${i}`)
            .to(".step3-task", { filter: "brightness(0.7)", duration: 0.3, stagger: 0.2 }, `<`)
            .to(".step3-progress", { width: "100%", duration: 1.5, ease: "power2.out" }, `stay-${i}`);
          tl.to({}, { duration: 1.5 }, `stay-${i}+=1.5`);
        } else if (i === 3) {
           tl.fromTo(".reflection-text", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.5, ease: "none" }, `stay-${i}`);
           tl.to({}, { duration: 1.5 }, `stay-${i}+=1.5`);
        } else {
          // Default Stay for card 0
          tl.to({}, { duration: 3 }, `stay-${i}`);
          
          if (i === 0) {
            // Step 1 inner animation scrub
            tl.fromTo(".s1-cursor", { x: 30, y: 50, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" }, `stay-0`)
              .to(".s1-cursor", { scale: 0.85, duration: 0.2 }, `stay-0+=0.5`)
              .to(".s1-btn", { scale: 0.95, duration: 0.2 }, `<`)
              .to(".s1-cursor", { scale: 1, duration: 0.2 }, `stay-0+=0.7`)
              .to(".s1-btn", { scale: 1, duration: 0.2 }, `<`)
              .to(".s1-cursor", { autoAlpha: 0, duration: 0.5 }, `stay-0+=1.2`);
          }
        }
      });
        
    } else {
      // Mobile vertical animations
      cardsRef.current.forEach((card) => {
        if(!card) return;
        gsap.fromTo(card, 
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1, y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef} id="how-it-works">
      {/* Background Transition Layer */}
      <div className={styles.sectionBackground} ref={bgRef}></div>

      {/* Header completely outside pin container */}
      <div className={styles.header} ref={headerRef}>
        <h2 className={styles.headline}>How Zanki Works</h2>
        <p className={styles.subtitle}>Three simple steps.<br/>Build momentum one day at a time.</p>
      </div>

      <div className={styles.pinContainer} ref={pinRef}>
        <div className={styles.cardsContainer}>
          
          {/* STEP 1 */}
          <div className={styles.cardWrapper} ref={(el) => (cardsRef.current[0] = el)}>
            <div className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.stepNum}>{steps[0].num}</div>
                <h3 className={styles.cardTitle}>{steps[0].title}</h3>
                <p className={styles.cardDesc}>{steps[0].desc}</p>
              </div>
              <div className={styles.cardPreview}>
                <BrowserFrame>
                  <div className={styles.authForm}>
                    <div className={`${styles.authTitle} parallax-el`} data-y="10">Zanki</div>
                    <div className={`${styles.inputGroup} parallax-el`} data-y="15">
                      <label>Email address</label>
                      <input type="email" placeholder="you@example.com" />
                    </div>
                    <div className={`${styles.inputGroup} parallax-el`} data-y="20">
                      <label>Password</label>
                      <input type="password" placeholder="••••••••" />
                    </div>
                    <button className={`${styles.authBtn} s1-btn parallax-el`} data-scale="0.95">Continue</button>
                  </div>
                  <div className={`${styles.demoCursor} s1-cursor`} style={{ position: 'absolute', zIndex: 100 }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#FAFAFA" stroke="#000000" strokeWidth="1.5">
                      <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L5.85 2.86a.5.5 0 0 0-.85.35Z"></path>
                    </svg>
                  </div>
                </BrowserFrame>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className={styles.cardWrapper} ref={(el) => (cardsRef.current[1] = el)}>
            <div className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.stepNum}>{steps[1].num}</div>
                <h3 className={styles.cardTitle}>{steps[1].title}</h3>
                <p className={styles.cardDesc}>{steps[1].desc}</p>
              </div>
              <div className={styles.cardPreview}>
                <BrowserFrame>
                  <div className="parallax-el" data-y="15">
                    <Sidebar>
                      <StreakBadge streak={0} id="s2-ember" textId="s2-streak" badgeId="s2-badge" />
                    </Sidebar>
                  </div>
                  <div style={{ flex: 1, padding: "2rem", display: "flex", flexDirection: "column" }}>
                    <DashboardHeader title="Good morning, Rohith" progress={0} progressBarClass="step2-progress" />
                    <TaskList>
                      <TaskCard className="step2-task" text="Finish Assignment" id="t2-1" circleId="c2-1" />
                      <TaskCard className="step2-task" text="Gym" id="t2-2" circleId="c2-2" />
                      <TaskCard className="step2-task" text="Read DSA" id="t2-3" circleId="c2-3" />
                    </TaskList>
                  </div>
                </BrowserFrame>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className={styles.cardWrapper} ref={(el) => (cardsRef.current[2] = el)}>
            <div className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.stepNum}>{steps[2].num}</div>
                <h3 className={styles.cardTitle}>{steps[2].title}</h3>
                <p className={styles.cardDesc}>{steps[2].desc}</p>
              </div>
              <div className={styles.cardPreview}>
                <BrowserFrame>
                  <div className="parallax-el" data-y="15">
                    <Sidebar>
                      <div className={styles.streakTimeline} id="streak-timeline">Day 0</div>
                    </Sidebar>
                  </div>
                  <div style={{ flex: 1, padding: "2rem", display: "flex", flexDirection: "column" }}>
                    <DashboardHeader title="Good morning, Rohith" progress={0} progressBarClass="step3-progress" />
                    <TaskList>
                      <div className="parallax-el" data-y="10"><TaskCard className="step3-task" text="Finish Assignment" id="t3-1" circleId="c3-1" /></div>
                      <div className="parallax-el" data-y="15"><TaskCard className="step3-task" text="Gym" id="t3-2" circleId="c3-2" /></div>
                      <div className="parallax-el" data-y="20"><TaskCard className="step3-task" text="Read DSA" id="t3-3" circleId="c3-3" /></div>
                    </TaskList>
                  </div>
                </BrowserFrame>
              </div>
            </div>
          </div>

          {/* STEP 4 */}
          <div className={styles.cardWrapper} ref={(el) => (cardsRef.current[3] = el)}>
            <div className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.stepNum}>{steps[3].num}</div>
                <h3 className={styles.cardTitle}>{steps[3].title}</h3>
                <p className={styles.cardDesc}>{steps[3].desc}</p>
              </div>
              <div className={styles.cardPreview}>
                <BrowserFrame>
                  <div className="parallax-el" data-y="15">
                    <Sidebar>
                      <StreakBadge streak={12} id="s4-ember" textId="s4-streak" badgeId="s4-badge" />
                    </Sidebar>
                  </div>
                  <div style={{ flex: 1, padding: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className="parallax-el" data-y="20">
                      <ReflectionCard />
                    </div>
                  </div>
                </BrowserFrame>
              </div>
            </div>
          </div>

        </div>

        <div className={styles.progressIndicator}>
          {[0, 1, 2, 3].map((step, i) => (
            <React.Fragment key={step}>
              <span className={`${styles.progressDot} ${activeStep === step ? styles.active : ''}`}>
                0{step + 1}
              </span>
              {i < 3 && (
                <span className={styles.progressLine}>
                  <div className={styles.progressLineInner}></div>
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
