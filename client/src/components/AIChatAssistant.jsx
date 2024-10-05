import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { Send, Bot, User, Loader, FileText } from 'lucide-react'
import { useAuth0 } from '@auth0/auth0-react';
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

const ChatContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const ChatHeader = styled.div`
  background-color: #4a90e2;
  color: white;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ChatTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
`

const TabContainer = styled.div`
  display: flex;
`

const Tab = styled.button`
  background-color: ${props => props.active ? '#3a7bd5' : 'transparent'};
  color: white;
  border: none;
  padding: 8px 16px;
  margin-left: 8px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3a7bd5;
  }
`

const ChatBody = styled.div`
  height: 400px;
  overflow-y: auto;
  padding: 16px;
`

const Message = styled.div`
  max-width: 80%;
  margin-bottom: 16px;
  padding: 12px 16px;
  border-radius: 20px;
  line-height: 1.4;
  font-size: 16px;
  ${props => props.isUser ? `
    background-color: #e6f2ff;
    color: #333;
    align-self: flex-end;
    margin-left: auto;
  ` : `
    background-color: #f0f0f0;
    color: #333;
  `}
`

const MessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
`

const IconContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.isUser ? '#4a90e2' : '#f0f0f0'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`

const InputContainer = styled.div`
  display: flex;
  padding: 16px;
  border-top: 1px solid #e0e0e0;
`

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #4a90e2;
  }
`

const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3a7bd5;
  }

  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
`

const SendButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  margin-left: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3a7bd5;
  }

  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
`

const RemainingQuestions = styled.span`
  font-size: 14px;
  color: #666;
  margin-left: 12px;
  align-self: center;
`

const TestCaseContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`

const TestCaseTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 12px;
`

const TestCase = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 12px;
  margin-top: 1rem;
  margin-bottom: 8px;
`

const AIChatAssistant = ({ problemId }) => {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [remainingQuestions, setRemainingQuestions] = useState(5)
    const [activeTab, setActiveTab] = useState('chat')
    const [testCases, setTestCases] = useState([])
    const chatBodyRef = useRef(null)
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        fetchQuestionsLeft();
    }, [problemId]);
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
        }
    }, [messages, testCases])

    const fetchQuestionsLeft = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await api.get(`/api/ai-chat/questions-left?problemId=${problemId}`, { headers: { Authorization: `Bearer ${token}` } });
            console.log(response);
            setRemainingQuestions(response.data.questionsLeft);
        } catch (error) {
            console.error('Error fetching questions left:', error);
        }
    };

    const handleSend = async () => {
        const token = await getAccessTokenSilently();
        if (input.trim() === '' || remainingQuestions <= 0 || isLoading) return;

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
            setRemainingQuestions(response.data.questionsLeft);
        } catch (error) {
            console.error('Error sending message to AI:', error);
            setMessages(prevMessages => [...prevMessages, { text: "Sorry, I couldn't process your request. Please try again later.", sender: 'ai' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const generateTestCases = async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`/api/aitestcases/generate-test-cases/${problemId}`);
            setTestCases(response.data.testCases);
        } catch (error) {
            console.error('Error generating test cases:', error);
        }
        setIsLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend()
        }
    }
    return (
        <>
            <ChatContainer>
                <ChatHeader>
                    <ChatTitle>AI Assistant</ChatTitle>
                    <TabContainer>
                        <Tab active={activeTab === 'chat'} onClick={() => setActiveTab('chat')}>AI Chat</Tab>
                        <Tab active={activeTab === 'testgen'} onClick={() => setActiveTab('testgen')}>Test Cases Generator</Tab>
                    </TabContainer>
                </ChatHeader>
                <ChatBody ref={chatBodyRef}>
                    {activeTab === 'chat' ? (
                        <>
                            {messages.map((message, index) => (
                                <MessageContainer key={index}>
                                    <IconContainer isUser={message.isUser}>
                                        {message.isUser ? <User size={18} color="white" /> : <Bot size={18} color="#4a90e2" />}
                                    </IconContainer>
                                    <Message isUser={message.isUser}>{message.text}</Message>
                                </MessageContainer>
                            ))}
                            {isLoading && (
                                <MessageContainer>
                                    <IconContainer>
                                        <Loader size={18} color="#4a90e2" />
                                    </IconContainer>
                                    <Message>Thinking...</Message>
                                </MessageContainer>
                            )}
                        </>
                    ) : (
                        <TestCaseContainer>
                            <TestCaseTitle>AI-Generated Test Cases</TestCaseTitle>
                            <Button onClick={generateTestCases} disabled={isLoading}>
                                {isLoading ? <Loader size={18} /> : <FileText size={18} />}
                                {isLoading ? 'Generating...' : 'Generate Test Cases'}
                            </Button>
                            {testCases.map((testCase, index) => (
                                <TestCase key={index}>
                                    {/* <strong>Test Case {index + 1}:</strong>  */}
                                   {testCase}
                                </TestCase>
                            ))}
                            {/* {testCases.length > 0 && (
                                <Message>
                                    These test cases are generated while keeping in mind the constraints and input format mentioned in the problem statement.
                                </Message>
                            )} */}
                        </TestCaseContainer>
                    )}
                </ChatBody>
                {activeTab === 'chat' && (
                    <InputContainer>
                        <Input
                            type="text"
                            placeholder="Ask a question..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <SendButton onClick={handleSend} disabled={!input.trim() || remainingQuestions === 0}>
                            <Send size={24} />
                        </SendButton>
                        <RemainingQuestions>{remainingQuestions} left</RemainingQuestions>
                    </InputContainer>
                )}
            </ChatContainer>
        </>
    )
}

export default AIChatAssistant
