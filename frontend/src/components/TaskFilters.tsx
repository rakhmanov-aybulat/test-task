import { Filter, FilterType} from '../types/Filter';
import styles from './TaskFilters.module.css';


interface TaskFiltersProps {
  onFilterChange: (filter: FilterType) => void;
}


const TaskFilters = ({ onFilterChange }: TaskFiltersProps) => {
  return (
    <div className={styles.filterButtonList}>
      {Object.values(Filter).map(value => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={styles.filterButton}
        >
          {value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' ')}
        </button>
      ))}

    </div>
  );
};

export default TaskFilters;

