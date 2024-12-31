import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({ apiKey: apiKey });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body; // L'ensemble des messages précédents

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  try {
    const chatResponse = await client.chat.complete({
      model: 'mistral-large-latest',
      messages: messages, // On passe tout l'historique des messages
    });

    res.status(200).json({
      reply: chatResponse.choices[0].message.content,
    });
  } catch (error) {
    console.error('Erreur API :', error);
    res.status(500).json({ error: 'Erreur lors de l\'appel à l\'API Mistral.' });
  }
}
