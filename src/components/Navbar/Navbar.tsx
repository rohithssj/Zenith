import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useGSAP(() => {
    gsap.to(`.${styles.navbar}`, {
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.1
    });
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLeft}>
          <a href="#" className={styles.logo}>Zanki</a>
        </div>
        
        <ul className={styles.navLinks}>
          <li><a href="#features" className={styles.navLink}>Features</a></li>
          <li><a href="#how-it-works" className={styles.navLink}>How it Works</a></li>
          <li><a href="#pricing" className={styles.navLink}>Pricing</a></li>
        </ul>
        
        <div className={styles.navRight}>
          <a href="#get-started" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnNav}`}>Get Started</a>
          <button 
            className={styles.mobileMenuBtn} 
            onClick={toggleMenu}
            aria-label="Toggle Menu" 
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.isActive : ''}`}>
        <ul className={styles.mobileNavLinks}>
          <li><a href="#features" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Features</a></li>
          <li><a href="#how-it-works" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>How it Works</a></li>
          <li><a href="#pricing" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Pricing</a></li>
        </ul>
        <a href="#get-started" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnMobileCta}`} onClick={() => setIsMobileMenuOpen(false)}>Get Started</a>
      </div>
    </nav>
  );
};

export default Navbar;
