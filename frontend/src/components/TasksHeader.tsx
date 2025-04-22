import { useAuth } from '../context/AuthProvider';

const TasksHeader: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <div>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>TODO</span>
      </div>
      <div>
        <button
          onClick={logout}
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            backgroundColor: '#ff4d4d',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Log out
        </button>
      </div>
    </header>
  );
};

export default TasksHeader;

