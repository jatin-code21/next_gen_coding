import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

const ChatContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 400px;
  margin-top: 20px;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  font-weight: bold;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 15px;
`;

const Message = styled.div`
  background-color: ${props => props.sender === 'user' ? '#007bff' : '#e9ecef'};
  color: ${props => props.sender === 'user' ? 'white' : 'black'};
  border-radius: 18px;
  padding: 8px 15px;
  margin-bottom: 10px;
  max-width: 80%;
  align-self: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
  word-wrap: break-word;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: white;
  border-top: 1px solid #dee2e6;
`;

const ChatInput = styled.input`
  flex: 1;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }
`;

const SendButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const QuestionsLeft = styled.span`
  font-size: 12px;
  color: #6c757d;
  margin-left: 10px;
`;

const AIChat = ({ problemId }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [questionsLeft, setQuestionsLeft] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const { getAccessTokenSilently} = useAuth0();
    const messagesEndRef = useRef(null);
    console.log('Left:', questionsLeft);
    useEffect(() => {
        fetchQuestionsLeft();
    }, [problemId]);

    console.log('Left after:', questionsLeft);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchQuestionsLeft = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await api.get(`/api/ai-chat/questions-left?problemId=${problemId}`, { headers: { Authorization: `Bearer ${token}` } });
            console.log(response);
            setQuestionsLeft(response.data.questionsLeft);
        } catch (error) {
            console.error('Error fetching questions left:', error);
        }
    };

    const sendMessage = async () => {
        const token = await getAccessTokenSilently();
        if (input.trim() === '' || questionsLeft <= 0 || isLoading) return;

        const newMessage = { text: input, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await api.post('/api/ai-chat/ask', {
                question: input,
                problemId
            }, { headers: { Authorization: `Bearer ${token}` } });
            const aiResponse = { text: response.data.answer, sender: 'ai' };
            setMessages(prevMessages => [...prevMessages, aiResponse]);
            setQuestionsLeft(response.data.questionsLeft);
        } catch (error) {
            console.error('Error sending message to AI:', error);
            setMessages(prevMessages => [...prevMessages, { text: "Sorry, I couldn't process your request. Please try again later.", sender: 'ai' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <ChatContainer>
            <ChatHeader>AI Assistant</ChatHeader>
            <ChatMessages>
                {messages.map((message, index) => (
                    <Message key={index} sender={message.sender}>
                        {message.text}
                    </Message>
                ))}
                <div ref={messagesEndRef} />
            </ChatMessages>
            <InputContainer>
                <ChatInput
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a question..."
                    disabled={isLoading || questionsLeft <= 0}
                />
                <SendButton onClick={sendMessage} disabled={isLoading || questionsLeft <= 0}>
                    {isLoading ? 'Sending...' : 'Send'}
                </SendButton>
                <QuestionsLeft>({questionsLeft} left)</QuestionsLeft>
            </InputContainer>
        </ChatContainer>
    );
};

export default AIChat;