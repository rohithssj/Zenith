import React from 'react';
import { Calendar, LayoutGrid, Target, LineChart } from 'lucide-react';
import styles from './ProductUI.module.css';

interface SidebarProps {
  children?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.sidebarNav}>
        <div className={`${styles.navItem} ${styles.active}`} aria-label="Today">
          <LayoutGrid size={20} />
          <span className={styles.navText}>Today</span>
        </div>
        <div className={styles.navItem} aria-label="Calendar">
          <Calendar size={20} />
          <span className={styles.navText}>Calendar</span>
        </div>
        <div className={styles.navItem} aria-label="Focus">
          <Target size={20} />
          <span className={styles.navText}>Focus</span>
        </div>
        <div className={styles.navItem} aria-label="Insights">
          <LineChart size={20} />
          <span className={styles.navText}>Insights</span>
        </div>
      </nav>
      {children}
    </aside>
  );
};
