import React, { useEffect, useState} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Navbar from '@/components/Navbar';
import { parse } from 'dotenv';
import { useSocket } from '@/hooks/SocketContext';
import { set } from 'mongoose';
import BattleEndModal from '@/components/BattleEndModal';
const api = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

const MainContent = styled.main`
  padding: 3rem 5%;
`

const SectionTitle = styled.h2`
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 2rem;
`

const ProblemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const ProblemCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`

const SolveButton = styled(Link)`
  background-color: #000000;
  color: white;
  border: none;
  text-decoration: none;
  padding: 0.7rem 1.5rem;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #3a7bd5;
  }
`

const ProblemInfo = styled.div`
  flex: 1;
`

const ProblemTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`
const TimeCounter = styled.h4`
    font-weight:bold;
    margin-bottom: 3px;
`

const ProblemDifficulty = styled.span`
  font-size: 0.9rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-weight: bold;
  ${props => {
        switch (props.level) {
            case 'Easy':
                return 'background-color: #e1f5fe; color: #0288d1;';
            case 'Medium':
                return 'background-color: #fff3e0; color: #f57c00;';
            case 'Hard':
                return 'background-color: #ffebee; color: #d32f2f;';
            default:
                return 'background-color: #e8eaf6; color: #3f51b5;';
        }
    }}
`

const BattlePage = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [submissionData, setSubmissionData] = useState(null);
    const [battleStartTime, setBattleStartTime] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeleft, setTimeLeft] = useState(5 * 60); // intial time 5 minutes
    const [battleResult, setBattleResult] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const { socket, isConnected, reconnect } = useSocket();
    // const [showEndModal, setShowEndModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket || !isConnected) {
            console.log('Socket not connected, attempting to reconnect...');
            reconnect();
            return;
        }
        // console.log('Socket:', socket);
        socket.emit('joinRoom', roomId);

        socket.on('battleStart', (data) => {
            setQuestions(data.questions);
            setBattleStartTime(data.startTime);
            localStorage.setItem(`battleQuestions_${roomId}`, JSON.stringify(data.questions));
            localStorage.setItem(`battleStartTime_${roomId}`, data.startTime);
            console.log('Battle Questions', data.questions);
        })

        socket.on('submissionResult', (data) => {
            setSubmissionData(data);
            if (data.isAccepted === true) {
                alert('Opponents submission has been accepted');
            } else {
                alert('Opponents submission has been rejected');
            }
            console.log('SubmitResult socket', data);
        }, [roomId, submissionData]);
        // these sockets are defined in roomController.js
        socket.on('battleEnd', (data) => {
            setBattleResult(data);
            setShowEndModal(true);
            localStorage.removeItem(`battleQuestions_${roomId}`);
            localStorage.removeItem(`battleStartTime_${roomId}`);
            setTimeout(() => {navigate('/')}, 5000); // Redirect to home page after 5 seconds
        })


        return () => {
            socket.emit('leaveRoom', roomId);
            socket.disconnect();
        }
    }, [roomId, socket, isConnected, reconnect]);

    const handleCloseModal = () => {
        setShowEndModal(false);
        navigate('/');
    }

    useEffect(() => {
        const fetchRoomStatus = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await api.get(`/api/rooms/${roomId}`, { headers: { Authorization: `Bearer ${token}` } });
                setRoom(response.data);

                if (questions.length === 0) {
                    const storedQuestions = localStorage.getItem(`battleQuestions_${roomId}`);
                    if (storedQuestions) {
                        setQuestions(JSON.parse(storedQuestions));
                    }
                }

                if (!battleStartTime) {
                    const storedStartTime = localStorage.getItem(`battleStartTime_${roomId}`);
                    if (storedStartTime) {
                        setBattleStartTime(parseInt(storedStartTime));
                    }
                }
            } catch (error) {
                console.error('Error fetching room status:', error);
            }
        };
        fetchRoomStatus();
        const interval = setInterval(fetchRoomStatus, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, [roomId, getAccessTokenSilently, questions.length, battleStartTime]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (battleStartTime) {
                const now = Date.now();
                const elapsed = Math.floor((now - battleStartTime) / 1000);
                const remaining = Math.max(5 * 60 - elapsed, 0);
                setTimeLeft(remaining);

                if (remaining === 0) {
                    clearInterval(timer);
                }
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [battleStartTime]);

    const formatTime = (time) => {
        return `${Math.floor(time / 60)}:${time % 60}`; // minutes:seconds
    }
    const capitalFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    return (
        <>
            <Navbar />
            <MainContent>
                <SectionTitle>Battle Room: {roomId}</SectionTitle>
                <TimeCounter>Time Remaining: {formatTime(timeleft)}</TimeCounter>
                <ProblemList>
                    {questions.map((question) => (
                        <ProblemCard key={question.problemId}>
                            <ProblemInfo>
                                <ProblemTitle>{question.title}</ProblemTitle>
                                <ProblemDifficulty level={capitalFirstChar(question.difficulty)}>{capitalFirstChar(question.difficulty)}</ProblemDifficulty>
                            </ProblemInfo>
                            <SolveButton to={`/battle/${roomId}/${question.title.toLowerCase().replace(/\s+/g, '-')}/${question.problemId}`}>Solve</SolveButton>
                        </ProblemCard>
                    ))}
                </ProblemList>
            </MainContent>
            {showEndModal && (
                <BattleEndModal isOpen={isModalOpen} winner={battleResult.winner} onClose={() =>setIsModalOpen(false)}/>
            )}
        </>
    )
}

export default BattlePage
