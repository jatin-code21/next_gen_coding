import React, { useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from '../components/Navbar'
import ProblemsToTry from '../components/ProblemsToTry'
import Footer from '../components/Footer'
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

const Container = styled.div`
  color: #333;
  background-color: #f0f4f8;
  min-height: 100vh;
`
export default function HomePage() {
  const { user, isAuthenticated } = useAuth0();
  useEffect(() => {
    if (isAuthenticated && user) {
      const userData = {
        sub: user.sub,
        email: user.email,
        name: user.name
      }

      console.log('isAunthenticated', isAuthenticated);
      console.log('User', user);
      console.log('UserData', userData);

      async function storeData() {
        try {
          const response = await api.post('/api/users/login', userData)
          console.log('User data has been saved successfully', response.data);

        } catch (error) {
          alert('Not able to store the data');
          console.error('Error storing the user Data', error);
        }
      }
      storeData();
    }
  }, [isAuthenticated, user]);
  return (
    <Container>
      <Navbar />
      <ProblemsToTry />
      <Footer />
    </Container>
  )
}