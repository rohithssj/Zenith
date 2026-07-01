document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconMenu = document.querySelector(".icon-menu");
  const iconClose = document.querySelector(".icon-close");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
      
      if (!isExpanded) {
        mobileMenu.classList.add("is-active");
        mobileMenuBtn.setAttribute("aria-expanded", "true");
        iconMenu.style.display = "none";
        iconClose.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
      } else {
        mobileMenu.classList.remove("is-active");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        iconMenu.style.display = "block";
        iconClose.style.display = "none";
        document.body.style.overflow = "";
      }
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll(".nav-link, .btn-mobile-cta");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("is-active");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        iconMenu.style.display = "block";
        iconClose.style.display = "none";
        document.body.style.overflow = "";
      });
    });
  }

  // 2. Initial Page Load Animations
  setTimeout(() => {
    // Navbar fade in
    gsap.to(".navbar", {
      opacity: 1,
      duration: 1.2,
      ease: "power2.out"
    });

    // Hero title line by line reveal
    gsap.to(".line-inner", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.2
    });

    // Hero subtitle fade up
    gsap.to(".hero-subtitle.fade-up", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.6
    });

    // Hero buttons fade up
    gsap.to(".hero-buttons.fade-up", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.8
    });

    // Preview section fade and scale
    gsap.to(".preview-section.fade-up-scale", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.5,
      ease: "power3.out",
      delay: 1.0,
      onComplete: initDemoAnimation
    });
  }, 100);

  // 3. Product Demo Loop Animation
  function initDemoAnimation() {
    // Only run on desktop/tablet where cursor is visible
    if (window.innerWidth <= 768) return;
    
    // Helper to get relative coordinates for the cursor
    const getPos = (id) => {
      const el = document.querySelector(id);
      const container = document.querySelector(".app-ui");
      if (!el || !container) return { x: 0, y: 0 };
      
      const elRect = el.getBoundingClientRect();
      const contRect = container.getBoundingClientRect();
      
      return {
        x: elRect.left - contRect.left + (elRect.width / 2) - 10,
        y: elRect.top - contRect.top + (elRect.height / 2) - 10
      };
    };

    // Master Timeline for the Loop
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    
    // Setup initial states before each loop
    tl.set("#demo-cursor", { x: 400, y: 400, opacity: 0 })
      .set("#circle-3", { backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.2)" })
      .set("#circle-4", { backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.2)" })
      .set("#progress-bar", { width: "50%" })
      .set("#streak-text", { innerText: "12 day streak" })
      .set(".ember", { opacity: 0, y: 0, x: 0 })
      .set("#task-3", { filter: "brightness(1)" })
      .set("#task-4", { filter: "brightness(1)" });

    // Wait 1 second
    tl.to({}, { duration: 1 });

    // Cursor appears and moves to task 3
    tl.to("#demo-cursor", { opacity: 1, duration: 0.4 })
      .to("#demo-cursor", { 
        x: () => getPos("#circle-3").x, 
        y: () => getPos("#circle-3").y, 
        duration: 1.2, 
        ease: "power2.inOut" 
      })
      
    // Clicks task 3
    tl.to("#demo-cursor", { scale: 0.85, duration: 0.1 })
      .to("#demo-cursor", { scale: 1, duration: 0.1 })
      
    // Task 3 completes
    tl.to("#circle-3", { backgroundColor: "var(--accent)", borderColor: "var(--accent)", duration: 0.2 }, "<")
      .to("#task-3", { filter: "brightness(0.7)", duration: 0.3 }, "<")
      .to("#progress-bar", { width: "75%", duration: 0.8, ease: "power2.out" }, "<")
      
    // Cursor moves to task 4
    tl.to("#demo-cursor", { 
        x: () => getPos("#circle-4").x, 
        y: () => getPos("#circle-4").y, 
        duration: 1.2, 
        ease: "power2.inOut" 
      }, "+=0.3")
      
    // Clicks task 4
    tl.to("#demo-cursor", { scale: 0.85, duration: 0.1 })
      .to("#demo-cursor", { scale: 1, duration: 0.1 })
      
    // Task 4 completes
    tl.to("#circle-4", { backgroundColor: "var(--accent)", borderColor: "var(--accent)", duration: 0.2 }, "<")
      .to("#task-4", { filter: "brightness(0.7)", duration: 0.3 }, "<")
      .to("#progress-bar", { width: "100%", duration: 0.8, ease: "power2.out" }, "<")

    // The Streak Moment
    tl.to("#streak-text", { 
        opacity: 0, 
        y: -5, 
        duration: 0.3, 
        onComplete: () => {
          const streakText = document.getElementById("streak-text");
          if(streakText) streakText.innerText = "13 day streak";
        }
      }, "+=0.2")
      .set("#streak-text", { y: 5 })
      .to("#streak-text", { opacity: 1, y: 0, duration: 0.4 })
      
    // Embers
    tl.to(".ember", {
        opacity: () => Math.random() * 0.6 + 0.4,
        y: () => -10 - Math.random() * 20,
        x: () => (Math.random() - 0.5) * 30,
        duration: 1.5,
        stagger: 0.1,
        ease: "power1.out",
      }, "<")
      .to(".ember", { opacity: 0, duration: 0.8 }, "-=0.8")

    // Cursor disappears
    tl.to("#demo-cursor", { opacity: 0, duration: 0.5, delay: 0.5 });
    
    // Automatically loops after repeatDelay (2 seconds)
  }

});
