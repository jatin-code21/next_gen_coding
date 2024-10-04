import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../components/Navbar';
import { CheckCircle } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

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
  text-align: center;
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
const ProblemsList1 = () => {
    const [problems, setProblems] = useState([]);
    const [solvedProblems, setSolvedProblems] = useState({})
    const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated) {
                try {
                    const token = await getAccessTokenSilently();
                    console.log('The token is', token);
                    const [problemsResponse, solvedResponse] = await Promise.all([
                        api.get('/api/problems/getAllProblems', {
                            headers: { Authorization: `Bearer ${token}` }
                        }),
                        api.get('/api/submissions/solved', {
                            headers: { Authorization: `Bearer ${token}` }
                        })
                    ]);

                    setProblems(problemsResponse.data);
                    // console.log('The problem Response is', problemsResponse.data);
                    console.log('Solved response is', solvedResponse.data.solvedProblems);

                    // Convert the array of solved problems into an object for easier lookup
                    const solvedMap = solvedResponse.data.solvedProblems.reduce((acc, _id) => {
                        acc[_id] = true;
                        return acc;
                    }, {});
                    setSolvedProblems(solvedMap);
                    console.log(solvedProblems);
                } catch (error) {
                    console.error('Error fetching data', error);
                }
            } else {
                try {
                    const problemResponse = await api.get('/api/problems/getAllProblems');
                    setProblems(problemResponse.data);
                } catch (error) {
                    console.error('Error fetching the problem without user sign-in', error);
                }
            }
        };
        fetchData();
    }, [getAccessTokenSilently, user]);
    const capitalFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    return (
        <>
            <Navbar />
            <MainContent>
                <SectionTitle>Problems:</SectionTitle>
                <ProblemList>
                    {problems.map((problem) => (
                        <ProblemCard key={problem.problemId}>
                            <ProblemInfo>
                                <ProblemTitle>{problem.title}</ProblemTitle>
                                <ProblemDifficulty level={capitalFirstChar(problem.difficulty)}>{capitalFirstChar(problem.difficulty)}</ProblemDifficulty>
                            </ProblemInfo>
                            <SolveButton to={`/problems/${problem.title.toLowerCase().replace(/\s+/g, '-')}/${problem.problemId}`}>{solvedProblems[problem._id] && <CheckCircle size={21} />}Solve</SolveButton>
                        </ProblemCard>
                    ))}
                </ProblemList>
            </MainContent>
        </>
    )
}

export default ProblemsList1
