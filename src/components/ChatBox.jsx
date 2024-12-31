import React from 'react';
import Message from './Message';
import styles from '../styles/ChatBox.module.css';

export default function ChatBox({ messages }) {
  return (
    <div className={styles.chatBox}>
      {messages.map((message, index) => (
        <Message
          key={index}
          isUser={message.role === 'user'}
          text={message.content}
        />
      ))}
    </div>
  );
}
