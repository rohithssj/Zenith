import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from '../ProductUI/ProductUI.module.css';
import { 
  BrowserFrame, 
  Sidebar, 
  StreakBadge, 
  DashboardHeader, 
  TaskList, 
  TaskCard 
} from '../ProductUI';

const ProductPreview: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // 1. Initial fade up and scale
    gsap.to(previewRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.5,
      ease: "power3.out",
      delay: 1.0,
      onComplete: initDemoAnimation
    });

    // 2. Continuous Loop Animation
    function initDemoAnimation() {
      if (window.innerWidth <= 768) return;
      
      const getPos = (id: string) => {
        const el = document.querySelector(id);
        const container = document.querySelector(`.${styles.appUi}`);
        if (!el || !container) return { x: 0, y: 0 };
        
        const elRect = el.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        
        return {
          x: elRect.left - contRect.left + (elRect.width / 2) - 10,
          y: elRect.top - contRect.top + (elRect.height / 2) - 10
        };
      };

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      
      tl.set('.demo-cursor', { x: 400, y: 400, opacity: 0 })
        .set('#circle-3', { backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.2)" })
        .set('#circle-4', { backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.2)" })
        .set('.progress-bar', { width: "50%" })
        .set('#streak-text', { innerText: "12 day streak" })
        .set('.ember', { opacity: 0, y: 0, x: 0 })
        .set('#task-3', { filter: "brightness(1)" })
        .set('#task-4', { filter: "brightness(1)" });

      tl.to({}, { duration: 1 });

      tl.to('.demo-cursor', { opacity: 1, duration: 0.4 })
        .to('.demo-cursor', { 
          x: () => getPos("#circle-3").x, 
          y: () => getPos("#circle-3").y, 
          duration: 1.2, 
          ease: "power2.inOut" 
        });
        
      tl.to('.demo-cursor', { scale: 0.85, duration: 0.1 })
        .to('.demo-cursor', { scale: 1, duration: 0.1 });
        
      tl.to('#circle-3', { backgroundColor: "var(--accent)", borderColor: "var(--accent)", duration: 0.2 }, "<")
        .to('#task-3', { filter: "brightness(0.7)", duration: 0.3 }, "<")
        .to('.progress-bar', { width: "75%", duration: 0.8, ease: "power2.out" }, "<");
        
      tl.to('.demo-cursor', { 
          x: () => getPos("#circle-4").x, 
          y: () => getPos("#circle-4").y, 
          duration: 1.2, 
          ease: "power2.inOut" 
        }, "+=0.3");
        
      tl.to('.demo-cursor', { scale: 0.85, duration: 0.1 })
        .to('.demo-cursor', { scale: 1, duration: 0.1 });
        
      tl.to('#circle-4', { backgroundColor: "var(--accent)", borderColor: "var(--accent)", duration: 0.2 }, "<")
        .to('#task-4', { filter: "brightness(0.7)", duration: 0.3 }, "<")
        .to('.progress-bar', { width: "100%", duration: 0.8, ease: "power2.out" }, "<");

      tl.to('#streak-text', { 
          opacity: 0, 
          y: -5, 
          duration: 0.3, 
          onComplete: () => {
            const streakText = document.getElementById("streak-text");
            if(streakText) streakText.innerText = "13 day streak";
          }
        }, "+=0.2")
        .set('#streak-text', { y: 5 })
        .to('#streak-text', { opacity: 1, y: 0, duration: 0.4 });
        
      tl.to('.ember', {
          opacity: () => Math.random() * 0.6 + 0.4,
          y: () => -10 - Math.random() * 20,
          x: () => (Math.random() - 0.5) * 30,
          duration: 1.5,
          stagger: 0.1,
          ease: "power1.out",
        }, "<")
        .to('.ember', { opacity: 0, duration: 0.8 }, "-=0.8");

      tl.to('.demo-cursor', { opacity: 0, duration: 0.5, delay: 0.5 });
    }
  }, { scope: previewRef });

  return (
    <section className={styles.previewSection} ref={previewRef}>
      <div className={styles.glowEffect}></div>
      <div className={styles.previewContainer}>
        <BrowserFrame>
          <Sidebar>
            <StreakBadge streak={12} />
          </Sidebar>
          <main className={styles.mainContent}>
            <DashboardHeader title="Good morning, Rohith" progress={50} />
            <TaskList>
              <TaskCard text="Morning revision — DSA" completed={true} />
              <TaskCard text="Push Zanki landing page" completed={true} />
              <TaskCard text="Review PRD and update roadmap" id="task-3" circleId="circle-3" />
              <TaskCard text="30 min evening walk" id="task-4" circleId="circle-4" />
            </TaskList>
          </main>
          <div className={`${styles.demoCursor} demo-cursor`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#FAFAFA" stroke="#000000" strokeWidth="1.5">
              <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L5.85 2.86a.5.5 0 0 0-.85.35Z"></path>
            </svg>
          </div>
        </BrowserFrame>
      </div>
    </section>
  );
};

export default ProductPreview;
