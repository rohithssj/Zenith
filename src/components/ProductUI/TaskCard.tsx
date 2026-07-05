import React from 'react';
import styles from './ProductUI.module.css';

interface TaskCardProps {
  text: string;
  completed?: boolean;
  id?: string;
  circleId?: string;
  className?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({ text, completed = false, id, circleId, className = '' }) => {
  return (
    <div className={`${styles.taskItem} ${completed ? styles.completed : ''} ${className}`} id={id}>
      <div 
        className={`${styles.circle} ${completed ? styles.filled : styles.outline}`} 
        id={circleId}
      ></div>
      <span className={styles.taskText}>{text}</span>
    </div>
  );
};
