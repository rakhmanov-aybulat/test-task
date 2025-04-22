import { useState } from 'react';
import { Status, StatusType } from '../types/Status';


interface TaskCardProps {
  title: string;
  description: string;
  status: StatusType;
  onUpdateStatus: (newStatus: StatusType) => void;
}

const TaskCard: React.FC<TaskCardProps> = (
    { title, description, status, onUpdateStatus }) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as StatusType;
    setCurrentStatus(newStatus);
    onUpdateStatus(newStatus);
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
      }}
    >
      <h3>{title}</h3>
      <p style={{ fontSize: '0.9rem', color: '#555' }}>{description}</p>
      <select value={currentStatus} onChange={handleChange}>
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

