import { useState } from 'react';
import { Status, StatusType } from '../types/Status';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  onCreate: (title: string, description: string, status: StatusType) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onCreate(title, description, Status.ASSIGNED);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.titleInput}
      />
      <input
        type="text"
        placeholder="Add a description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.descriptionTextArea}
      />
      <button
        type="submit"
        className={styles.createTaskButton}
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;

