import { createContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../socket';

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages?: { message: string; time: string; username: string }[];
  setMessages: Function;
  roomId?: string;
  rooms: object;
}

const socket = io(SOCKET_URL);

export const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
  messages: [],
});

function SocketProvider(props: any) {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState([]);

  socket.on('ROOMS', (value) => {
    setRooms(value);
  });

  socket.on('JOINED_ROOM', (value) => {
    setRoomId(value);

    setMessages([]);
  });

  useEffect(() => {
    socket.on('ROOM_MESSAGE', ({ message, username, time }) => {
      if (!document.hasFocus()) {
        document.title = 'New message...';
      }

      setMessages((messages) => [...messages, { message, username, time }]);
    });
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}

export default SocketProvider;
