import React from 'react';
import { User } from '../types/User';

interface TasksPageProps {
  user: User;
}

const TasksPage: React.FC<TasksPageProps> = ({ user }) => {
  return (
    <div>
      <h1>Tasks Page</h1>
      <p>Welcome, {user.name}!</p>
    </div>
  );
};

export default TasksPage;

