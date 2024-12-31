import React, { useState } from 'react';
import styles from '../styles/ChatInput.module.css';

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() === '') return;
    onSend(input);
    setInput('');
  };

  return (
    <div className={styles.chatInput}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tapez votre message ici..."
        className={styles.inputField}
      />
      <button onClick={handleSubmit} className={styles.sendButton}>
        Envoyer
      </button>
    </div>
  );
}
