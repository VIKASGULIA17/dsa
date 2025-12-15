import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { api } from '../lib/apiClient';

const AuthContext = createContext();

// Auth state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  token: null,
};

// Auth actions
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  SET_TOKEN: 'SET_TOKEN',
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case AUTH_ACTIONS.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
          const response = await api.auth.getProfile();
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: {
              user: response.data,
              token,
            },
          });
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch({ type: AUTH_ACTIONS.LOGOUT });
        }
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      const response = await api.auth.login(credentials);
      const { user, accessToken, refreshToken } = response.data;

      // Store tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          user,
          token: accessToken,
        },
      });

      return { success: true };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  }, []);

  // Register function
  const register = useCallback(async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      const response = await api.auth.register(userData);
      const { user, accessToken, refreshToken } = response.data;

      // Store tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          user,
          token: accessToken,
        },
      });

      return { success: true };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error);
    } finally {
      // Clear tokens regardless of API response
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (userData) => {
    try {
      const response = await api.auth.getProfile(); // This would be a PUT in real API
      dispatch({
        type: AUTH_ACTIONS.UPDATE_USER,
        payload: response.data,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Profile update failed',
      };
    }
  }, []);

  // Check if user has specific permission/role
  const hasPermission = useCallback((permission) => {
    if (!state.user) return false;
    return state.user.permissions?.includes(permission) || false;
  }, [state.user]);

  // Context value
  const value = {
    // State
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    token: state.token,

    // Actions
    login,
    register,
    logout,
    updateProfile,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hooks
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Hook for protected routes
export const useRequireAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading };
};

// Hook for optional auth
export const useOptionalAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  return { isAuthenticated, isLoading };
};