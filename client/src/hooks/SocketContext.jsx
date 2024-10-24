import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const connectSocket = useCallback(() => {
        const newSocket = io(import.meta.env.VITE_BASE_URL, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,    
            autoConnect: false, // We'll manually connect
        });

        newSocket.on('connect', () => {
            console.log('Socket connected');
            setIsConnected(true);
            setSocket(newSocket);
        });

        newSocket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
            setIsConnected(false);
        });

        newSocket.on('connect_error', (error) => {
            console.error('Connection error:', error);
            setIsConnected(false);
        });

        newSocket.connect(); // Manually connect

        return newSocket;
    }, []);

    useEffect(() => {
        const newSocket = connectSocket();

        return () => {
            if (newSocket) newSocket.disconnect(); // discxoonecct the socket when the component unmounts to prevent memory leaks
        };
    }, [connectSocket]);

    const reconnect = useCallback(() => {
        if (socket) {
            socket.disconnect();
        }
        connectSocket();
    }, [socket, connectSocket]);

    return (
        <SocketContext.Provider value={{ socket, isConnected, reconnect }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};
