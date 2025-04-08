import { Status } from '../types/Status';


class Api {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async registerUser(name: string, email: string,
                            password: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  }

  public async loginUser(email: string, password: string) {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
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

  public async fetchTasks(token: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  }

  public async createTask(token: string, title: string,
                          description: string, status: Status): Promise<any> {
    const response = await fetch(`${this.baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, status }),
    });
    return response.json();
  }

  public async updateTask(
      token: string, taskId: number, title: string,
      description: string, status: Status): Promise<any> {
    const response = await fetch(`${this.baseUrl}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, status }),
    });
    return response.json();
  }

  public async deleteTask(token: string, taskId: number): Promise<any> {
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

