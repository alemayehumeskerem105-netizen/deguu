import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';

export default function ChatPage() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const { farmerId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

  const chatId =
    user && farmerId
      ? user.uid < farmerId
        ? `${user.uid}_${farmerId}`
        : `${farmerId}_${user.uid}`
      : null;

  // 🔁 useEffect always runs — even if user is not ready, to avoid hook order error
  useEffect(() => {
    if (!chatId) return;

    const msgRef = collection(db, 'chats', chatId, 'messages');
    const q = query(msgRef, orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (!text.trim() || !user || !chatId) return;

    const chatDocRef = doc(db, 'chats', chatId);
    const chatDocSnap = await getDoc(chatDocRef);
    if (!chatDocSnap.exists()) {
      await setDoc(chatDocRef, {
        participants: [user.uid, farmerId],
        lastMessage: text,
        timestamp: serverTimestamp(),
      });
    }

    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      senderId: user.uid,
      name: user.name,
      role: user.role,
      text,
      timestamp: serverTimestamp(),
    });

    await setDoc(chatDocRef, {
      lastMessage: text,
      timestamp: serverTimestamp(),
    }, { merge: true });

    setText('');
  };

  // 🛑 Only return UI after checking user
  if (!user) {
    return <p>Please log in to chat</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>💬 Chat with Farmer</h2>
      <div style={{ maxHeight: 400, overflowY: 'auto', marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.senderId === user.uid ? 'right' : 'left',
              marginBottom: 8
            }}
          >
            <strong>{msg.name} ({msg.role}):</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={text}
        placeholder="Type your message..."
        onChange={(e) => setText(e.target.value)}
        style={{ width: '80%', padding: 8 }}
      />
      <button onClick={sendMessage} style={{ padding: 8, marginLeft: 10 }}>
        Send
      </button>
    </div>
  );
}
