import api from './api';

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async register(email: string, password: string, username: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', { email, password, username });
    localStorage.setItem('authToken', data.token);
    return data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
    localStorage.setItem('authToken', data.token);
    return data;
  },

  async getCurrentUser(): Promise<{ user: User }> {
    const { data } = await api.get<{ user: User }>('/auth/me');
    return data;
  },

  logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  },

  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
