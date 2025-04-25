import { useAuth } from '../context/AuthProvider';
import styles from './TasksWelcome.module.css';


const TasksWelcome: React.FC = () => {
  const { userName } = useAuth();
  return (
    <div className={styles.welcomeText}>
      <h1>Welcome{userName ?
        <>,<span className={styles.userName}> {userName}</span>.</>: ''}
      </h1>
    </div>
  );
};

export default TasksWelcome;

