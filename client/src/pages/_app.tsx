import '../styles/globals.css';
import SocketProvider from '../context/socket.context';

function MyApp({ Component, pageProps }) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default MyApp;
