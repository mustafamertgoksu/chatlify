import { nanoid } from 'nanoid';
import { Server, Socket } from 'socket.io';

const rooms: Record<string, { name: string }> = {};

const socket = ({ io }: { io: Server }) => {

  io.on('connection', (socket: Socket) => {

    socket.emit('ROOMS', rooms);
    socket.on('CREATE_ROOM', ({ roomName }) => {
      const roomId = nanoid();
      rooms[roomId] = {
        name: roomName,
      };

      socket.join(roomId);

      socket.broadcast.emit('ROOMS', rooms);

      socket.emit('ROOMS', rooms);
      socket.emit('JOINED_ROOM', roomId);
    });

    socket.on(
      'ROOM_MESSAGE',
      ({ roomId, message, username }) => {
        const date = new Date();

        socket.to(roomId).emit('ROOM_MESSAGE', {
          message,
          username,
          time: `${date.getHours()}:${date.getMinutes()}`,
        });
      }
    );

    /*
     * When a user joins a room
     */
    socket.on('JOIN_ROOM', (roomId) => {
      socket.join(roomId);

      socket.emit('JOINED_ROOM', roomId);
    });
  });
}

export default socket;
