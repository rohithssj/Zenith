import React from 'react';
import styles from './ProductUI.module.css';

interface ReflectionCardProps {
  prompt?: string;
  answer?: string;
}

export const ReflectionCard: React.FC<ReflectionCardProps> = ({ 
  prompt = "What went well today?", 
  answer = "Finished the DSA problems and finally pushed the Zanki landing page updates." 
}) => {
  return (
    <div className={styles.reflectionUI}>
      <div className={styles.reflectionPrompt}>{prompt}</div>
      <div className={`${styles.reflectionInput} reflection-text`}>{answer}</div>
    </div>
  );
};
