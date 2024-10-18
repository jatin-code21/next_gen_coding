import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Sparkles, Bell, Mail } from 'lucide-react'
import Navbar from '../components/Navbar'

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const PageContainer = styled.div`
  min-height: 100vh;
  margin:0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  font-family: 'Arial', sans-serif;
  color: white;
  text-align: center;
  padding: 0px;
`

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-out;
`

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 40px;
  animation: ${fadeIn} 1s ease-out 0.3s both;
`

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 40px;
  animation: ${fadeIn} 1s ease-out 0.6s both;
`

const FeatureItem = styled.li`
  font-size: 1.2rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 10px;
  }
`

const CountdownContainer = styled.div`
  font-size: 2rem;
  margin-bottom: 40px;
  animation: ${fadeIn} 1s ease-out 0.9s both;
`

const EmailInput = styled.input`
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 25px 0 0 25px;
  outline: none;
  width: 250px;
`

const SubscribeButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 0 25px 25px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  background-color: #4CAF50;
  color: white;
  border-radius: 5px;
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  &.show {
    opacity: 1;
    transform: translateY(0);
  }
`

export default function ComingSoonPage() {
  const [email, setEmail] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date('2024-10-28T00:00:00').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })

      if (distance < 0) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSubscribe = () => {
    if (email) {
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
      setEmail('')
    }
  }

  return (
    <>
    <Navbar/>
    <PageContainer>
      <Title>
        <Sparkles /> Exciting New Feature Coming Soon! <Sparkles />
      </Title>
      <Subtitle>Get ready for a coding experience like never before</Subtitle>
      <FeatureList>
        <FeatureItem><Sparkles /> Advanced AI-powered code suggestions</FeatureItem>
        <FeatureItem><Sparkles /> Real-Time Leaderboard</FeatureItem>
        <FeatureItem><Sparkles /> Integrated performance analytics</FeatureItem>
      </FeatureList>
      <CountdownContainer>
        Launching in: {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
      </CountdownContainer>
      <div>
        <EmailInput 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <SubscribeButton onClick={handleSubscribe}>
          <Bell size={16} /> Notify Me
        </SubscribeButton>
      </div>
      <NotificationContainer className={showNotification ? 'show' : ''}>
        <Mail size={16} /> Thanks for subscribing!
      </NotificationContainer>
    </PageContainer>
    </>
  )
}