import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// ==================== TYPE DEFINITIONS ====================
interface User {
  id: string;
  username: string;
  createdAt?: string;
}

interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

interface VerifyResponse {
  message: string;
  isAuthenticated: boolean;
  user: User;
}

interface ProfileResponse {
  message: string;
  user: User;
}

interface LogoutResponse {
  message: string;
}

// ==================== AXIOS INSTANCE ====================
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==================== AUTH ENDPOINTS ====================
export const authAPI = {
  signup: async (username: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/signup', { username, password });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Signup failed' };
    }
  },

  login: async (username: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { username, password });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  verify: async (): Promise<VerifyResponse> => {
    try {
      const response = await api.get<VerifyResponse>('/auth/verify');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Verification failed' };
    }
  },

  logout: async (): Promise<LogoutResponse> => {
    try {
      const response = await api.post<LogoutResponse>('/auth/logout');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Logout failed' };
    }
  },
};

// ==================== USER ENDPOINTS ====================
export const userAPI = {
  getProfile: async (): Promise<ProfileResponse> => {
    try {
      const response = await api.get<ProfileResponse>('/user/profile');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to get profile' };
    }
  },

  updateProfile: async (data: { username: string }): Promise<ProfileResponse> => {
    try {
      const response = await api.put<ProfileResponse>('/user/profile', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },
};

export default api;
