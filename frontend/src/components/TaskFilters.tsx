import { Filter, FilterType} from '../types/Filter';


interface TaskFiltersProps {
  onFilterChange: (filter: FilterType) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ onFilterChange }) => {

  return (
    <div style={{ marginBottom: '1rem' }}>
      {Object.values(Filter).map(value => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          style={{
            padding: '0.5rem 1rem',
            margin: '0 0.5rem',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          {value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' ')}
        </button>
      ))}

    </div>
  );
};

export default TaskFilters;

