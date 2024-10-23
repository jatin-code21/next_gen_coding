import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trophy, Home } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

const StyledDialogContent = styled(DialogContent)`
  max-width: 400px;
`

const WinnerSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

const WinnerName = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #4a90e2;
`

const RedirectMessage = styled.p`
  margin-bottom: 1rem;
  color: #666;
`

const BattleEndModal = ({ winner, onClose, showEndModal}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          clearInterval(timer)
          return 100
        }
        return oldProgress + 20
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (progress === 100) {
      const redirectTimer = setTimeout(() => {
        onClose()
      }, 1000)

      return () => clearTimeout(redirectTimer)
    }
  }, [progress, onClose])

  return (
    <Dialog open={showEndModal} onOpenChange={onClose}>
      <StyledDialogContent>
        <DialogHeader>
          <DialogTitle>Battle Ended</DialogTitle>
        </DialogHeader>
        <WinnerSection>
          <Trophy size={24} color="#FFD700" />
          <WinnerName>{winner}</WinnerName>
          <Trophy size={24} color="#FFD700" />
        </WinnerSection>
        <RedirectMessage>Redirecting to home page in 5 seconds...</RedirectMessage>
        <Progress value={progress} className="mb-4" />
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            <Home className="mr-2 h-4 w-4" /> Return to Home
          </Button>
        </DialogFooter>
      </StyledDialogContent>
    </Dialog>
  )
}

export default BattleEndModal