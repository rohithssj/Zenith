import React from 'react';
import styles from './ProductUI.module.css';

interface BrowserFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({ children, className = '' }) => {
  return (
    <div className={`${styles.browserFrame} ${className}`}>
      <div className={styles.browserHeader}>
        <div className={styles.browserDots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={styles.appUi}>
        {children}
      </div>
    </div>
  );
};
