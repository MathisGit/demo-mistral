import React from 'react';
import styles from '../styles/Message.module.css';

export default function Message({ isUser, text }) {
  return (
    <div className={isUser ? styles.userMessage : styles.botMessage}>
      <strong>{isUser ? 'You' : 'Bot'}:</strong> {text}
    </div>
  );
}
