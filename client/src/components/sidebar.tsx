import Rooms from './rooms';
import styles from '../styles/sidebar.module.css';

export default function sidebar() {
  return (
    <div className={styles.sidebar}>
      <Rooms />
    </div>
  );
}
