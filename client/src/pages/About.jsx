import React from 'react'
import styled from 'styled-components'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Rocket, Code, Users, FileText, Zap, Activity, Swords } from 'lucide-react'
import Navbar from '@/components/Navbar'

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`

const FeatureIcon = styled.div`
  background-color: #e6f7ff;
  color: #0070f3;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`

const MissionSection = styled(Card)`
  margin-bottom: 3rem;
`

const CTASection = styled.section`
  text-align: center;
`

export default function AboutUs() {
  return (
    <>
    <Navbar/>
      <PageContainer>
        <Header>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            About Us
          </h1>
          <p className="text-xl text-muted-foreground">
            Welcome to our platform, where we aim to revolutionize the way you solve coding challenges!
          </p>
        </Header>

        <FeaturesGrid>
          {[
            { icon: <Code size={24} />, title: "Real-Time Code Execution", description: "Write, run, and test your code with instant feedback using our fast, secure code editor powered by Judge0 API." },
            { icon: <Rocket size={24} />, title: "AI-Driven Features", description: "Get AI-generated test cases to test your solutions on various scenarios and improve your code quality." },
            { icon: <Swords size={24} />, title: "Battle", description: "Engage in thrilling code duels with peers, where collaboration meets competition in real-time problem-solving!" },
            { icon: <FileText size={24} />, title: "Code Report", description: "Get detailed insights after every successful submission to help you understand and optimize your solutions." },
            { icon: <Zap size={24} />, title: "Pro Mode", description: "Engage with our AI assistant for personalized support and discover where your coding skills can be applied in the real world." },
            { icon: <Activity size={24} />, title: "User Activity Tracking", description: "Monitor your progress and submissions, helping you stay on track." },
          ].map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </FeaturesGrid>

        <MissionSection>
          <CardHeader>
            <CardTitle>Why We Built This Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              We understand the frustration of working with complex coding platforms that lack personalized support and engagement. Our mission is to create a space where learning is interactive and coding is collaborative.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Whether you're a beginner or an expert, our platform provides the tools you need to sharpen your coding skills while staying motivated and connected.
            </p>
          </CardContent>
        </MissionSection>

        <Separator className="my-8" />

        <CTASection>
          <Button size="lg">
            Join us and start coding!
          </Button>
        </CTASection>
      </PageContainer>
    </>
  )
}