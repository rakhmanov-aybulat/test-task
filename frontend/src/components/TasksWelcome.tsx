import styles from './TasksWelcome.module.css';


interface TaskWelcomeProps {
  userName: string | null;  
}

const TasksWelcome = ({ userName }: TaskWelcomeProps) => {
  return (
    <div className={styles.welcomeText}>
      <h1>Welcome{userName ?
        <>,<span className={styles.userName}> {userName}</span>.</>: ''}
      </h1>
    </div>
  );
};

export default TasksWelcome;

