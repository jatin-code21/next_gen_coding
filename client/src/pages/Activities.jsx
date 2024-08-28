import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

const ActivityContainer = styled.div`
  max-width: 1200px;
  margin: 6rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const SubmissionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SubmissionItem = styled.li`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProblemInfo = styled.div`
  flex: 1;
`;

const ProblemTitle = styled.h3`
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 0;
`;

const UserName = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin: 0;
`;

const SubmissionDetails = styled.div`
  display: flex;
  align-items: center;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  margin-right: 1rem;
  ${({ status }) => {
    switch (status) {
      case 'ACCEPTED':
        return 'background-color: #2ecc71; color: #fff;';
      case 'REJECTED':
        return 'background-color: #e74c3c; color: #fff;';
      default:
        return 'background-color: #f39c12; color: #fff;';
    }
  }}
`;

const SubmissionTime = styled.span`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const Activities = () => {
  const [submissions, setSubmissions] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log('token', token);
        const response = await api.get(`/api/submissions/recent`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, [getAccessTokenSilently]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <ActivityContainer>
        <Title>Recent Activity</Title>
        <SubmissionList>
          {submissions.map((submission) => (
            <SubmissionItem key={submission._id}>
              <ProblemInfo>
                <ProblemTitle>{submission.problem.title}</ProblemTitle>
                <UserName>Submitted by: {submission.user.name}</UserName>
              </ProblemInfo>
              <SubmissionDetails>
                <StatusBadge status={submission.status}>{submission.status}</StatusBadge>
                <SubmissionTime>{formatDate(submission.createdAt)}</SubmissionTime>
              </SubmissionDetails>
            </SubmissionItem>
          ))}
        </SubmissionList>
      </ActivityContainer>
    </>
  );
};

export default Activities;