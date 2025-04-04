import { getAuthToken } from '../utils/jwt';

class Api {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(url: string, options?: RequestInit,
                           requiresAuth: boolean = true): Promise<T> {

    const headers = new Headers(options?.headers);

    if (requiresAuth) {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No token found');
      }
      headers.append('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  }

  public async fetchUserData(): Promise<any> {
    return this.request('/api/me');
  }

  public async registerUser(userData: { email: string;
                            password: string; name: string }): Promise<any> {
    return this.request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }, false);
  }

  public async loginUser(credentials: { email: string;
                         password: string }): Promise<any> {
    return this.request('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }, false);
  }

  public async fetchTasks(): Promise<any> {
    return this.request('/api/tasks');
  }

  public async createTask(taskData: { title: string }): Promise<any> {
    return this.request('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
  }

  public async updateTask(taskId: string, updatedData: { title?: string;
                          completed?: boolean }): Promise<any> {
    return this.request(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
  }

  public async deleteTask(taskId: string): Promise<any> {
    return this.request(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }
}

export default Api;
