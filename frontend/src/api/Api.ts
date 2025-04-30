import User from '../types/User';
import Task from '../types/Task';


export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>
}


class Api {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async registerUser(newUser: Omit<User, 'id'>)
      : Promise<ApiResponse<{user: User, token: string}>> {
    const response = await fetch(`${this.baseUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    return response.json();
  }

  public async loginUser(userData: Omit<User, 'id' | 'name'>)
      : Promise<ApiResponse<{user: User, token: string}>> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return response.json();
  }

  public async fetchMe(token: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  }

  public async fetchTasks(token: string): Promise<ApiResponse<Task[]>> {
    const response = await fetch(`${this.baseUrl}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  }

  public async createTask(
      token: string, task: Omit<Task, 'id'>): Promise<ApiResponse<Task>> {
    const response = await fetch(`${this.baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
          title: task.title,
          description: task.description,
          status: task.status
      }),
    });
    return response.json();
  }

  public async updateTask(
      token: string, task: Task): Promise<ApiResponse<undefined>> {
    const response = await fetch(`${this.baseUrl}/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
          title: task.title,
          description: task.description,
          status: task.status
      }),
    });
    return response.json();
  }

  public async deleteTask(
      token: string, taskId: number): Promise<ApiResponse<undefined>> {
    const response = await fetch(`${this.baseUrl}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  }
}


export const api = new Api('http://localhost/api');

