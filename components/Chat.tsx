'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePartySocket } from "partysocket/react";

export default function Chat() {
  const [messages, setMessages] = useState<{ id: number; text: string; sender: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Verbinden...');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const socket = usePartySocket({
    host: process.env.NEXT_PUBLIC_PARTYKIT_HOST,
    room: "my-chat-room",
    onOpen: () => setConnectionStatus('Verbunden'),
    onClose: () => setConnectionStatus('Getrennt'),
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    },
    onError: (error) => console.error('WebSocket Fehler:', error)
  });

  const sendMessage = useCallback(() => {
    if (inputValue.trim() !== '' && socket.readyState === WebSocket.OPEN) {
      const message = { id: Date.now(), text: inputValue, sender: 'Ich' };
      socket.send(JSON.stringify(message));
      setMessages((prev) => [...prev, message]);
      setInputValue('');
    }
  }, [inputValue, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl">Chat App</h1>
        <p>Status: {connectionStatus}</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-2 p-2 rounded ${msg.sender === 'Ich' ? 'bg-blue-100 text-right' : 'bg-gray-100'}`}>
            <strong>{msg.sender}: </strong>{msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="w-full p-2 border rounded"
          placeholder="Nachricht eingeben..."
        />
        <button 
          onClick={sendMessage} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          disabled={socket.readyState !== WebSocket.OPEN}
        >
          Senden
        </button>
      </div>
    </div>
  );
}