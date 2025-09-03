import React, { useState } from 'react';
import './Chat.css';

const dummyUsers = [
  { id: 1, name: 'Farmer A' },
  { id: 2, name: 'Buyer B' },
  { id: 3, name: 'Farmer C' },
];

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, type: 'sent' }]);
    setInput('');

    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'Received: ' + input, type: 'received' }]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="chat-list">
        <h2>Contacts</h2>
        {dummyUsers.map(user => (
          <div
            key={user.id}
            className={`chat-user ${selectedUser?.id === user.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedUser(user);
              setMessages([]); // clear messages when switching
            }}
          >
            {user.name}
          </div>
        ))}
      </div>

      {/* Chat window */}
      <div className="chat-window">
        <div className="messages">
          {selectedUser ? (
            messages.map((msg, i) => (
              <div key={i} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))
          ) : (
            <p style={{ padding: 20 }}>Select a contact to start chatting</p>
          )}
        </div>

        {selectedUser && (
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
}
