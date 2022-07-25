import { useRef } from 'react';
import { useSocket } from '../hooks/useSocket';
import styles from '../styles/room.module.css';

function Rooms() {
  const { socket, roomId, rooms } = useSocket();
  const newRoomRef = useRef(null);

  const handleCreateRoom = () => {
    
    const roomName = newRoomRef.current.value || '';

    if (!String(roomName).trim()) return;

    socket.emit('CREATE_ROOM', { roomName });

    newRoomRef.current.value = '';
  }

  const handleJoinRoom = (key) => {
    if (key === roomId) return;

    socket.emit('JOIN_ROOM', key);
  }

  return (
    <nav>
      <div className={styles.room}>
        <input className={styles.roomInput} ref={newRoomRef} placeholder="Room name" />
        <button className={styles.create} onClick={handleCreateRoom}>
          Create Room
        </button>
      </div>

      <ul className={styles.list}>
        {Object.keys(rooms).map((key) => {
          return (
            <div key={key}>
              <button
                disabled={key === roomId}
                title={`Join ${rooms[key].name}`}
                onClick={() => handleJoinRoom(key)}
              >
                {rooms[key].name}
              </button>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}

export default Rooms;
