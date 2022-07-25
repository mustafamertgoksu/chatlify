import { useEffect, useRef } from 'react';
import { useSocket } from '../hooks/useSocket';
import styles from '../styles/messages.module.css';

function MessagesContainer() {
  const { socket, messages, roomId, username, setMessages } = useSocket();
  const newMessageRef = useRef(null);
  const messageEndRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = newMessageRef.current.value;

    if (!String(message).trim()) {
      return;
    }

    socket.emit('SEND_ROOM_MESSAGE', { roomId, message, username });

    const date = new Date();

    setMessages([
      ...messages,
      {
        username: 'You',
        message,
        time: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);

    newMessageRef.current.value = '';
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!roomId) {
    return <div />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.messages}>
        {messages.map(({ message, username, time }, index) => {
          return (
            <div className={styles.messageBox} key={index}>
              <div key={index}>
                <span className={styles.userTime}>
                  {username} - {time}
                </span>
                <span className={styles.message}>{message}</span>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>
      <div className={styles.bottomBar}>
        <form onSubmit={handleSendMessage}>
          <input placeholder="Type your message" ref={newMessageRef} />
          <button onClick={handleSendMessage}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default MessagesContainer;
