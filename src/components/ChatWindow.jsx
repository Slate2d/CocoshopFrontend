import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import "../css/chat.css";

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load chat room ID from localStorage if exists
    const savedRoomId = localStorage.getItem('chatRoomId');
    if (savedRoomId) {
      loadChatRoom(savedRoomId);
    }
  }, []);

  const loadChatRoom = async (roomId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/chat/${roomId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      const room = await response.json();
      setChatRoom(room);
      
      // Load messages
      const messagesResponse = await fetch(`http://localhost:8000/api/chat/${roomId}/messages/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      const messagesData = await messagesResponse.json();
      setMessages(messagesData);
    } catch (error) {
      console.error('Error loading chat:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializeChat = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/chat/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        }
      });
      const room = await response.json();
      setChatRoom(room);
      localStorage.setItem('chatRoomId', room.id);

      // Load messages
      if (room.id) {
        const messagesResponse = await fetch(`http://localhost:8000/api/chat/${room.id}/messages/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          }
        });
        const messagesData = await messagesResponse.json();
        setMessages(messagesData);
      }
    } catch (error) {
      console.error('Error initializing chat:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !chatRoom) {
      const savedRoomId = localStorage.getItem('chatRoomId');
      if (savedRoomId) {
        loadChatRoom(savedRoomId);
      } else {
        initializeChat();
      }
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!message.trim() || !chatRoom) return;

    try {
      const response = await fetch(`http://localhost:8000/api/chat/${chatRoom.id}/send_message/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message.trim() })
      });

      const newMessage = await response.json();
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="chat-button"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <div className="chat-window">
          <div className="chat-header">
            <h3 className="font-medium">Chat with Support</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="chat-messages">
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-500">
                Start a conversation with our support team
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender_name === localStorage.getItem('username') ? 'message-user' : 'message-support'}`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <span className="text-xs opacity-75">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
