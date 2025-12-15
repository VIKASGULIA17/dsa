import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Auth
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
  profile: '/auth/profile',

  // Problems
  problems: '/problems',
  problem: (id) => `/problems/${id}`,
  problemSubmissions: (id) => `/problems/${id}/submissions`,

  // Contests
  contests: '/contests',
  contest: (id) => `/contests/${id}`,
  contestSubmissions: (id) => `/contests/${id}/submissions`,
  contestLeaderboard: (id) => `/contests/${id}/leaderboard`,

  // Visualizer
  visualizeAlgorithm: '/visualizer/algorithm',
};

// API functions
export const api = {
  // Auth API
  auth: {
    login: (credentials) => apiClient.post(endpoints.login, credentials),
    register: (userData) => apiClient.post(endpoints.register, userData),
    logout: () => apiClient.post(endpoints.logout),
    refreshToken: (refreshToken) => 
      apiClient.post(endpoints.refresh, { refreshToken }),
    getProfile: () => apiClient.get(endpoints.profile),
  },

  // Problems API
  problems: {
    getAll: (params = {}) => apiClient.get(endpoints.problems, { params }),
    getById: (id) => apiClient.get(endpoints.problem(id)),
    submitSolution: (id, solution) => 
      apiClient.post(endpoints.problemSubmissions(id), solution),
    getSubmissions: (id) => apiClient.get(endpoints.problemSubmissions(id)),
  },

  // Contests API
  contests: {
    getAll: (params = {}) => apiClient.get(endpoints.contests, { params }),
    getById: (id) => apiClient.get(endpoints.contest(id)),
    submitSolution: (id, solution) => 
      apiClient.post(endpoints.contestSubmissions(id), solution),
    getSubmissions: (id) => apiClient.get(endpoints.contestSubmissions(id)),
    getLeaderboard: (id) => apiClient.get(endpoints.contestLeaderboard(id)),
  },

  // Visualizer API
  visualizer: {
    visualizeAlgorithm: (algorithm, data) => 
      apiClient.post(endpoints.visualizeAlgorithm, { algorithm, data }),
  },
};