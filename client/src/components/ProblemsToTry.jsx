import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const api = axios.create({
    baseURL: 'http://localhost:8000',
})

const ProblemListContainer = styled.div`
  max-width: 800px;
  margin: 5rem auto;
  padding: 20px;
`;

const ProblemItem = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 15px;
  margin-top: 1rem;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SolveButton = styled(Link)`
  background-color: #3498db;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const ProblemsToTry = () => {
    const [problems, setProblems] = useState([]);
    const [topProblems, setTopProblems] = useState([]);
    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await api.get('/api/problems/getAllProblems');
                setProblems(response.data);
                const selectedTopProblems = response.data.slice(0, 5);
                setTopProblems(selectedTopProblems);
            } catch (error) {
                console.error('Error fetching the Problem', error);
            }
        }
        fetchProblem();
    }, [])
    return (
        <>
            <ProblemListContainer>
                <h1>Problems to Try:</h1>
                {topProblems.map((problem) => (
                    <ProblemItem key={problem.problemId}>
                        <div>
                            <h3>{problem.title}</h3>
                            <p>Difficulty: {problem.difficulty}</p>
                        </div>
                        <SolveButton to={`/problems/${problem.title.toLowerCase().replace(/\s+/g, '-')}/${problem.problemId}`}>
                            Solve
                        </SolveButton>
                    </ProblemItem>
                ))}
            </ProblemListContainer>
        </>
    )
}

export default ProblemsToTry
