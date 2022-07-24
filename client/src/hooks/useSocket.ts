import { useContext } from 'react';
import { SocketContext } from '../context/socket.context';

export const useSocket = () => useContext(SocketContext);
