import axios from 'axios';


const API_URL = 'http://localhost:5000/api';

export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected'

export interface FriendRequest {
  _id: string;
  senderUsername: string;
  receiverUsername: string;
  status: FriendRequestStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface Friendship {
  _id: string;
  firstUsername: string;
  secondUsername: string;
  createdAt?: string;
  updatedAt?: string;
}
// create interface use interface to define the structure of 
//
//
export interface User {
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

interface FriendResponse {
  message: string;
}

interface FriendRequestsResponse {
  message: string;
  data: FriendRequest[];
}

// ==================== AXIOS ====================
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

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

// ==================== AUTH ====================
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

// ==================== USER ====================
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

  
  createFriendRequest: async (receiverUsername: string): Promise<FriendResponse> => {
    
    
    try {
      const response = await api.post<FriendResponse>('/friend-requests', { receiverUsername: receiverUsername });
      
      return response.data;

    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to create friend request' };

    }
  },

  acceptFriendRequest: async (senderUsername: string): Promise<FriendResponse> => {
    try {
      const response = await api.patch<FriendResponse>(`/friend-requests/${senderUsername}`, { status: 'accepted' });
      console.log(response.data);
      
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to accept friend request' };

    }
  },
  rejectFriendRequest: async (senderUsername: string): Promise<FriendResponse> => {
    try {
      const response = await api.patch<FriendResponse>(`/friend-requests/${senderUsername}`, { status: 'rejected' });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to reject friend request' };

    }
  },
  getFriendRequests: async(): Promise<FriendRequestsResponse>=>{
    try {
      const response = await api.get<FriendRequestsResponse>(`/friend-requests`);
      return response.data;
    } catch (error:any) {
      throw error.response?.data || { message: 'Failed to get friend requests' };
      
    }
  },
  removeFriend: async(friendUsername: string): Promise<FriendResponse>=>{
    try {
      const response = await api.delete<FriendResponse>(`/friends/remove/${friendUsername}`);
      return response.data;
    } catch (error:any) {
      throw error.response?.data || { message: 'Failed to remove friend' };
      
    }
  },
  getFriends: async(): Promise<Friendship[]>=>{
    try {
      const response = await api.get<Friendship[]>(`/friends`);
      return response.data;
      } catch (error:any) {
      if (error.response?.status === 400 && error.response?.data?.message === 'No Friendships Found') {
        return [];
      }
      throw error.response?.data || { message: 'Failed to get friends' };
        
      }
    }



}




export default api;
