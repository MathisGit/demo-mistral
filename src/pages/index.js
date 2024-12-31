import React, { useState } from 'react';
import ChatBox from '../components/ChatBox';
import ChatInput from '../components/ChatInput';
import Message from '../components/Message';

export default function Home() {
  const [messages, setMessages] = useState([]);


const sendMessage = async (input) => {
  const newMessages = [
    ...messages, // Historique actuel
    { role: 'user', content: input }, // Nouveau message utilisateur
  ];

  setMessages(newMessages); // Met à jour l'état local avec le nouveau message

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: newMessages }), // Envoie l'historique complet
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'appel à l\'API.');
    }

    const data = await response.json();

    // Ajoute la réponse du bot à l'historique
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: data.reply },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: 'Erreur : impossible de joindre le bot.' },
    ]);
    console.error('Erreur API locale :', error);
  }
};
  

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Chatbot</h1>
      <ChatBox messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
