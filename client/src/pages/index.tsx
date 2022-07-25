import Head from 'next/head';
import { useSocket } from '../hooks/useSocket';
import Messages from '../components/messages';
import Sidebar from '../components/sidebar';
import { useEffect, useRef } from 'react';
import styles from '../styles/home.module.css';

export default function Home() {
  const { socket, username, setUsername } = useSocket();
  const usernameRef = useRef(null);

  const handleSetUsername = () => {
    const value = usernameRef.current.value;
    if (!value) {
      return;
    }

    setUsername(value);

    localStorage.setItem('username', value);
  };

  useEffect(() => {
    if (usernameRef)
      usernameRef.current.value = localStorage.getItem('username') || '';
  }, []);

  return (
    <div className={styles.home}>
      <Head>
        <title>Chatlify | Chat App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!username && (
        <div>
          <h1 className={styles.mainTitle}>
            Chatlify | Lets chat with your friends
          </h1>
          <div className={styles.userSection}>
            <input
              className={styles.username}
              placeholder="Username"
              ref={usernameRef}
            />
            <button className={styles.start} onClick={handleSetUsername}>
              Start
            </button>
          </div>
        </div>
      )}
      {username && (
        <div className={styles.chatContainer}>
          <Sidebar />
          <Messages />
        </div>
      )}
    </div>
  );
}
