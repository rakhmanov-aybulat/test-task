import { useState } from 'react';
import { Status, StatusType } from '../types/Status';

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
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
      />
      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          border: 'none',
          backgroundColor: '#28a745',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;

