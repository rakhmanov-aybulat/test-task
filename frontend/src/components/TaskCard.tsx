import { useState } from 'react';
import { Status, StatusType } from '../types/Status';
import Task from '../types/Task';
import styles from './TaskCard.module.css';


interface TaskCardProps {
  task: Task;
  onUpdateStatus: (newStatus: StatusType) => void;
  onEditButtonClick: () => void;
  onDeleteButtonClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = (
    { task, onUpdateStatus, onEditButtonClick, onDeleteButtonClick}) => {
  const [currentStatus, setCurrentStatus] = useState(task.status);

  // TODO: improve naming
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      <h3 className={styles.taskTitle}>{task.title}</h3>
      <p className={styles.taskDescription}>{task.description}</p>
      <select
        className={`${styles.statusSelect} ${getStatusClassName()}`}
        value={currentStatus}
        onChange={handleStatusChange}
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
      <button
        className={styles.deleteButton}
        onClick={onDeleteButtonClick}
        aria-label="Delete task"
        >
        Delete
      </button>
    </div>
  );
};

export default TaskCard;

