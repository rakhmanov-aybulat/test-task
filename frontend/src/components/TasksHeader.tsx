import { useAuth } from '../context/AuthProvider';
import styles from './TasksHeader.module.css';


const TasksHeader = () => {
  const { logout } = useAuth();

  return (
    <header className={styles.wrapper}>
      <span className={styles.logoText}>TODO</span>
      <button
        onClick={logout}
        className={styles.logoutButton}
      >
        Log out
      </button>
    </header>
  );
};

export default TasksHeader;

