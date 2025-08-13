import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create context
const SocketContext = createContext(null);

// Socket.IO provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    // Connect to the root namespace with simplified configuration
    const socketInstance = io(socketUrl, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true,
      transports: ['websocket', 'polling']
      // Removed explicit path to use default Socket.IO configuration
    });

    // Socket event handlers
    socketInstance.on('connect', () => {
      console.log('Socket connected:', socketInstance.id);
      setConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnected(false);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setConnected(false);
    });

    // Set socket instance
    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  // Join a room
  const joinRoom = (room) => {
    if (socket && connected) {
      // Simplify room joining to match backend expectations
      if (room === 'cyberk-quiz') {
        socket.emit('join_quiz', room);
      } else if (room === 'leaderboard') {
        socket.emit('join_leaderboard');
      } else {
        // For any other room types
        socket.emit('join_room', room);
      }
      console.log(`Joined ${room} room`);
    }
  };

  // Leave a room
  const leaveRoom = (room) => {
    if (socket && connected) {
      socket.emit('leave_' + room);
      console.log(`Left ${room} room`);
    }
  };

  // Subscribe to an event
  const subscribe = (event, callback) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  // Unsubscribe from an event
  const unsubscribe = (event, callback) => {
    if (socket) {
      socket.off(event, callback);
    }
  };

  // Emit an event
  const emit = (event, data) => {
    if (socket && connected) {
      socket.emit(event, data);
    }
  };

  // Context value
  const value = {
    socket,
    connected,
    joinRoom,
    leaveRoom,
    subscribe,
    unsubscribe,
    emit
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket context
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};