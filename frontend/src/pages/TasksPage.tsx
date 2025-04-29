import { useState, useEffect, useMemo } from 'react';
import TasksHeader from '../components/TasksHeader';
import TasksWelcome from '../components/TasksWelcome';
import TaskFilters from '../components/TaskFilters';
import TaskForm, { TaskFormMode, TaskFormData, defaultTaskFormData }
  from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { api } from '../api/Api';
import { useAuth } from '../context/AuthProvider';
import Task from '../types/Task';
import { StatusType } from '../types/Status';
import { FilterType} from '../types/Filter';
import styles from './TasksPage.module.css';


const TasksPage: React.FC = () => {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const filteredTasks = useMemo(
    () => tasks.filter(task => filter == 'all' ? true : task.status == filter).reverse() 
    , [filter, tasks]
  );
  const [isTaskFormModalOpen, setTaskFormModalOpen] = useState(false);
  const [taskFormMode, setTaskFormMode] = useState<TaskFormMode>('create');
  const [taskFormData, setTaskFormData] = useState<TaskFormData>(defaultTaskFormData);

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
        throw new Error(response.errors);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleCreateTask = async (newTask: Omit<Task, 'id'>) => {
    try {
      const response = await api.createTask(token, newTask);
      if (response.status == 'success') {
        const newTask = response.data
        setTasks([...tasks, newTask]);
      } else if ('Unauthorized access' in response.message) {
          logout();
      } else {
        throw new Error(response.errors);
      }
    } catch (error) {
      console.error('Failed to create task:', error);
    }
    handleCloseTaskFormModal();  
  };
  
  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const response = await api.updateTask(token, updatedTask);
      if (response.status == 'success') {
        setTasks(tasks.map(
          (task) => task.id === updatedTask.id ? updatedTask : task
        ));
      } else if ('Unauthorized access' in response.message) {
          logout();
      } else {
        throw new Error(response.errors);
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
    handleCloseTaskFormModal();  
  };

  
  const handleDeleteTask = async (taskId: number) => {
    try {
      const response = await api.deleteTask(token, taskId);
      if (response.status == 'success') {
        setTasks(tasks.filter( (task) => task.id !== taskId));
      } else if ('Unauthorized access' in response.message) {
          logout();
      } else {
        throw new Error(response.errors);
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };


  const handleOpenTaskFormModal = () => {
    setTaskFormModalOpen(true);
  }
  
  const handleCloseTaskFormModal = () => {
    setTaskFormData(defaultTaskFormData);
    console.log(taskFormData);
    setTaskFormModalOpen(false);
  }



  return (
    <div className={styles.wrapper}>
      <TasksHeader />
      <TasksWelcome />
      <TaskFilters onFilterChange={setFilter} />
      <button
        className={styles.createTaskButton}
        onClick={() => {
          setTaskFormData(defaultTaskFormData);
          setTaskFormMode('create');
          handleOpenTaskFormModal();
        }}
      >
        New Task
      </button>
      <TaskForm
        isOpen={isTaskFormModalOpen}
        modalData={taskFormData}
        taskFormMode={taskFormMode}
        onClose={handleCloseTaskFormModal}
        onCreate={handleCreateTask}
        onUpdate={handleUpdateTask}        
      />
      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdateStatus={(newStatus) => handleUpdateTask({...task, status: newStatus})}
          onEditButtonClick={() => {
            setTaskFormData({task: task});
            setTaskFormMode('edit');
            handleOpenTaskFormModal();
          }}
          onDeleteButtonClick={() => handleDeleteTask(task.id)}
        />
      ))}
    </div>
  );
};

export default TasksPage;

