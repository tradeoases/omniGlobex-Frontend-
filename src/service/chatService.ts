// src/services/chatService.ts
import axios from 'axios';

// Fetch conversation history
export const fetchMessages = async () => {
  const response = await axios.get('/api/chat/messages');
  return response.data;
};

// Send a message to the chatbot backend
export const sendMessage = async (message: { text: string }) => {
  const response = await axios.post('/api/chat/send', message);
  return response.data;  
};
