import React from 'react';
import styles from './ProductUI.module.css';

interface TaskListProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const TaskList: React.FC<TaskListProps> = ({ children, className = '', id }) => {
  return (
    <div className={`${styles.taskList} ${className}`} id={id}>
      {children}
    </div>
  );
};
