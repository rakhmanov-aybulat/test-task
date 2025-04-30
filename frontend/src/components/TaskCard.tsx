import { Status, StatusType } from '../types/Status';
import Task from '../types/Task';
import styles from './TaskCard.module.css';
import EditPencilIcon from '../assets/edit_pencil_icon.svg'; 
import DeleteCrossIcon from '../assets/delete_cross_icon.svg';


interface TaskCardProps {
  key: number;
  task: Task;
  onUpdateStatus: (newStatus: StatusType) => void;
  onEditButtonClick: () => void;
  onDeleteButtonClick: () => void;
}


const TaskCard = ({
  task,
  onUpdateStatus,
  onEditButtonClick,
  onDeleteButtonClick
}: TaskCardProps) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // TODO: fix glitching add instant status update
    const newStatus = e.target.value as StatusType;
    onUpdateStatus(newStatus);
  };

  const getStatusClassName = (): string => {
    switch (task.status) {
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
      <div className={styles.taskHeader}>
        <h3 className={styles.taskTitle}>{task.title}</h3>
        <div className={styles.buttonMenu}>
          <button
            onClick={onEditButtonClick}
            aria-label="Edit Task"
            >
            <img src={EditPencilIcon} alt="Edit Task" />
          </button>
          <button
            onClick={onDeleteButtonClick}
            aria-label="Delete Task"
          >
            <img src={DeleteCrossIcon} alt="Delete Task" />
          </button>
        </div>
      </div>
      <p className={styles.taskDescription}>{task.description}</p>
      <select
        className={`${styles.statusSelect} ${getStatusClassName()}`}
        value={task.status}
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
    </div>
  );
};

export default TaskCard;

