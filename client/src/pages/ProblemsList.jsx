import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
// import dotenv from 'dotenv';
// dotenv.config();

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
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

const SolvedIcon = styled.span`
  color: #2ecc71;
  font-size: 1.5em; /* Increased font size */
  font-weight: bold; /* Made the tick bolder */
  margin-left: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  border: 2px solid #2ecc71; /* Optional: Adds a border to highlight the tick */
`;

const ProblemsList = () => {
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState({});
  const [alertShown, setAlertShown] = useState(false);
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

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
  return (
    <>
      <Navbar />
      <ProblemListContainer>
        <h1>Problems</h1>
        {problems.map((problem) => (
          <ProblemItem key={problem.problemId}>
            <div>
              <h3>{problem.title}</h3>
              <p>Difficulty: {problem.difficulty}</p>
            </div>
            <div>
              <SolveButton to={`/problems/${problem.title.toLowerCase().replace(/\s+/g, '-')}/${problem.problemId}`}>
                Solve
              </SolveButton>
              {solvedProblems[problem._id] && <SolvedIcon>✓</SolvedIcon>}
            </div>
          </ProblemItem>
        ))}
      </ProblemListContainer>
    </>
  );
};

export default ProblemsList;