import { useState, useEffect, useMemo } from 'react';
import TasksHeader from '../components/TasksHeader';
import TasksWelcome from '../components/TasksWelcome';
import TaskFilters from '../components/TaskFilters';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { api } from '../api/Api';
import { useAuth } from '../context/AuthProvider';
import Task from '../types/Task';
import { Status, StatusType } from '../types/Status';
import { FilterType} from '../types/Filter';
import styles from './TasksPage.module.css';


const TasksPage: React.FC = () => {
  const { token, userName, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const filteredTasks = useMemo(
    () => tasks.filter(task => filter == 'all' ? true : task.status == filter) 
    , [filter, tasks]
    // TODO: add sort newest first
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.fetchTasks(token);
      if (response.status == 'success') {
          setTasks(response.data);
      } else if ('Unauthorized access' in response.message) {
          logout();
      } else {
        // TODO: refactor
        console.error('Failed to fetch tasks:', response.errors);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleCreateTask = async (title: string, description: string) => {
    try {
      const response = await api.createTask(
          token, title, description, Status.ASSIGNED
      );
      if (response.status == 'success') {
        const newTask = response.data
        setTasks([newTask, ...tasks]);
      } else if ('Unauthorized access' in response.message) {
          logout();
      } else {
        // TODO: refactor
        console.error('Failed to fetch tasks:', response.errors);
      }
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };
  
  const handleUpdateStatus = (taskId: number, newStatus: StatusType) => {
    setTasks(tasks.map(
        (task) => task.id === taskId ? { ...task, status: newStatus } : task
    ));

    console.log("TODO: update status handler")
  };


  return (
    <div className={styles.wrapper}>
      <TasksHeader />
      <TasksWelcome userName={userName}/>
      <TaskFilters onFilterChange={setFilter} />
      <TaskForm onCreate={handleCreateTask} />
      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          onUpdateStatus={(newStatus) => handleUpdateStatus(task.id, newStatus)}
        />
      ))}
    </div>
  );
};

export default TasksPage;

