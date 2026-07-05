import React from 'react';
import styles from './ProductUI.module.css';

interface StreakBadgeProps {
  streak: number;
  id?: string;
  textId?: string;
  badgeId?: string;
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({ streak, id = "ember-container", textId = "streak-text", badgeId = "streak-badge" }) => {
  return (
    <div className={styles.streakBadge} id={badgeId}>
      <span className={styles.fireIcon}>🔥</span>
      <span className={styles.streakCount} id={textId}>{streak} day streak</span>
      <div className={styles.emberContainer} id={id}>
        <div className={`${styles.ember} ember`}></div>
        <div className={`${styles.ember} ember`}></div>
        <div className={`${styles.ember} ember`}></div>
        <div className={`${styles.ember} ember`}></div>
      </div>
    </div>
  );
};
