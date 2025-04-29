import styles from './TasksWelcome.module.css';

interface TaskWelcomeProps {
  userName: string | null;  
}

const TasksWelcome: React.FC<TaskWelcomeProps> = ({ userName}) => {
  return (
    <div className={styles.welcomeText}>
      <h1>Welcome{userName ?
        <>,<span className={styles.userName}> {userName}</span>.</>: ''}
      </h1>
    </div>
  );
};

export default TasksWelcome;

