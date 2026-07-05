import React from 'react';
import styles from './ProductUI.module.css';

interface DashboardHeaderProps {
  title: string;
  progress?: number;
  progressBarClass?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, progress = 0, progressBarClass = 'progress-bar' }) => {
  return (
    <header className={styles.mainHeader}>
      <h2>{title}</h2>
      <div className={styles.progressContainer}>
        <div 
          className={`${styles.progressBar} ${progressBarClass}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </header>
  );
};
