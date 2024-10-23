import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

const RoomButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 2rem;
`

const RoomButton = () => {
    const [showJoinRoom, setShowJoinRoom] = useState(false);
    const [roomId, setRoomId] = useState('');
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const handleCreateRoom = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await api.post('/api/rooms', {}, { headers: { 'Authorization': `Bearer ${token}` } });
            const roomId = response.data.roomId; // this roomId is coming from the backend
            navigate(`/battle/${roomId}`);
        } catch (error) {
            console.error('Error creating room', error);
            alert('Failed to create room');
        }
    }

    const handleJoinRoom = async (e) => {
        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();
            await api.post(`/api/rooms/${roomId}`, {}, { headers: { Authorization: `Bearer ${token}` } }); // this roomId is coming from the frontend in the join room form
            navigate(`/battle/${roomId}`);
        } catch (error) {
            console.error('Error joining room', error);
            alert('Failed to join room');
        }
    }

    return (
        <>
            <RoomButtons>
                <Button onClick={handleCreateRoom}>Create Battle Room</Button>
                <Dialog open={showJoinRoom} onOpenChange={setShowJoinRoom}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Join Battle Room</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Join Room</DialogTitle>
                        </DialogHeader>
                        <Input
                            placeholder="Enter Room ID"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                        />
                        <Button onClick={handleJoinRoom}>Join</Button>
                    </DialogContent>
                </Dialog>
            </RoomButtons>
        </>
    )
}

export default RoomButton;

