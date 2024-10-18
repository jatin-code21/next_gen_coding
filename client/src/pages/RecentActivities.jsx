import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Navbar from '../components/Navbar'
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const SubmissionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StatusBadge = styled(Badge)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: bold;
`

const Timestamp = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #666;
  font-size: 0.875rem;
`

const RecentActivities = () => {
  const [submissions, setSubmissions] = useState([]);
  // const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // const token = await getAccessTokenSilently();
        // console.log('token', token);
        const response = await api.get(`/api/submissions/recent`);
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[70vh]">
              <ActivityList>
                {submissions.map((submission) => (
                  <Card key={submission.submissionId}>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{submission.problem.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">Submitted by: {submission.user.name}</p>
                      <SubmissionInfo>
                        <StatusBadge variant={submission.status === 'ACCEPTED' ? 'success' : 'destructive'}>
                          {submission.status === 'ACCEPTED' ? (
                            <CheckCircle size={14} />
                          ) : (
                            <XCircle size={14} />
                          )}
                          {submission.status}
                        </StatusBadge>
                        <Timestamp>
                          <Clock size={14} />
                          {formatDate(submission.createdAt)}
                        </Timestamp>
                      </SubmissionInfo>
                    </CardContent>
                  </Card>
                ))}
              </ActivityList>
            </ScrollArea>
          </CardContent>
        </Card>
      </PageContainer>
    </>
  )
}

export default RecentActivities
