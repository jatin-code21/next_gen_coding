import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
  })

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`

const Title = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
`

const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
`

const ActivityItem = styled.li`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const ProblemInfo = styled.div`
  flex: 1;
`

const ProblemName = styled.h2`
  font-size: 18px;
  color: #4a4a4a;
  margin: 0 0 8px 0;
`

const SubmitterName = styled.p`
  font-size: 14px;
  color: #888;
  margin: 0;
`

const StatusBadge = styled.span`
  background-color: ${props => props.status === 'ACCEPTED' ? '#4caf50' : '#f44336'};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
`

const SubmissionTime = styled.span`
  font-size: 14px;
  color: #888;
  display: flex;
  align-items: center;
  margin-left: 0.6rem;
  gap: 4px;
`

const RecentActivities = () => {
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
            <Navbar/>
            <PageContainer>
                <Title>Recent Activity</Title>
                <ActivityList>
                    {submissions.map((submission) => (
                        <ActivityItem key={submission._id}>
                            <ProblemInfo>
                                <ProblemName>{submission.problem.title}</ProblemName>
                                <SubmitterName>Submitted by: {submission.user.name}</SubmitterName>
                            </ProblemInfo>
                            <StatusBadge status={submission.status}>
                                {submission.status === 'ACCEPTED' ? (
                                    <CheckCircle size={14} />
                                ) : (
                                    <XCircle size={14} />
                                )}
                                {submission.status}
                            </StatusBadge>
                            <SubmissionTime>
                                <Clock size={14} />
                                {formatDate(submission.createdAt)}
                            </SubmissionTime>
                        </ActivityItem>
                    ))}
                </ActivityList>
            </PageContainer>
        </>
    )
}

export default RecentActivities
