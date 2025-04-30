import { useState, useEffect, useMemo } from 'react';
import TasksHeader from '../components/TasksHeader';
import TasksWelcome from '../components/TasksWelcome';
import TaskFilters from '../components/TaskFilters';
import TaskForm, { TaskFormMode, TaskFormData, defaultTaskFormData }
  from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { api, ApiResponse } from '../api/Api';
import { useAuth } from '../context/AuthProvider';
import Task from '../types/Task';
import { FilterType} from '../types/Filter';
import styles from './TasksPage.module.css';


const TasksPage = () => {
  const { token, userName, logout } = useAuth();
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

  const handleApiCall = async <T,>(
      apiCall: () => Promise<ApiResponse<T>>): Promise<ApiResponse<T>> => {
    const response = await apiCall();
    if (response.status === 'success') {
      return response;
    } else if (response.message.includes('Unauthorized access')) {
      logout();
      throw new Error('Unauthorized access');
    } else {
      throw new Error(response.message);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await handleApiCall(() => api.fetchTasks(token));
      if (response.data === undefined) {
        throw new Error('Data is undefined');
      }
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleCreateTask = async (newTask: Omit<Task, 'id'>) => {
    try {
      const response = await handleApiCall(() => api.createTask(token, newTask));
      if (response.data === undefined) {
        throw new Error('Data is undefined');
      }
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
    handleCloseTaskFormModal();  
  };
   
  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      await api.updateTask(token, updatedTask);
      setTasks(tasks.map(
        (task) => task.id === updatedTask.id ? updatedTask : task
      ));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
    handleCloseTaskFormModal();  
  };
  
  const handleDeleteTask = async (taskId: number) => {
    try {
      await handleApiCall(() => api.deleteTask(token, taskId));
      setTasks(tasks.filter( (task) => task.id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleOpenTaskFormModal = () => {
    setTaskFormModalOpen(true);
  }
  
  const handleCloseTaskFormModal = () => {
    setTaskFormData(defaultTaskFormData);
    setTaskFormModalOpen(false);
  }

  return (
    <div className={styles.wrapper}>
      <TasksHeader />
      <TasksWelcome userName={userName}/>
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
          onUpdateStatus={
            (newStatus) => handleUpdateTask({...task, status: newStatus})
          }
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

