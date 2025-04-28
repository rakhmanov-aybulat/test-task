import { useState } from 'react';
import { Status, StatusType } from '../types/Status';
import styles from './TaskCard.module.css';


interface TaskCardProps {
  title: string;
  description: string;
  status: StatusType;
  onUpdateStatus: (newStatus: StatusType) => void;
  onEditButtonClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = (
    { title, description, status, onUpdateStatus, onEditButtonClick}) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as StatusType;
    setCurrentStatus(newStatus);
    onUpdateStatus(newStatus);
  };

  const getStatusClassName = (): string => {
    switch (currentStatus) {
      case (Status.ASSIGNED):
        return styles['statusSelectAssigned'];
      case (Status.IN_PROGRESS):
        return styles['statusSelectInProgress'];
      case (Status.COMPLETED):
        return styles['statusSelectCompleted'];
      case (Status.CANCELLED):
        return styles['statusSelectCanceled'];
      default:
        return '';
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.taskTitle}>{title}</h3>
      <p className={styles.taskDescription}>{description}</p>
      <select
        className={`${styles.statusSelect} ${getStatusClassName()}`}
        value={currentStatus}
        onChange={handleChange}
      >
      {Object.values(Status).map(value => (
        <option
          key={value}
          value={value}
        >
          {value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' ')}
        </option>
      ))}
      </select>
      <button
        className={styles.editButton}
        onClick={onEditButtonClick}
        aria-label="Edit task"
        >
        Edit
      </button>
    </div>
  );
};

export default TaskCard;

