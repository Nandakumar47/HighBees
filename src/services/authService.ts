import axios from "axios";

export interface RegisterData {
  username: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user?: {
    id: string;
    username: string;
  };
}

class AuthService {
  private baseURL = "/auth";

  // Register a new user
  async register(registerData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await axios.post(
        `${this.baseURL}/register`,
        registerData,
        {
          withCredentials: true, // Important for receiving httpOnly cookies
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  // Login user
  async login(loginData: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/login`, loginData, {
        withCredentials: true, // Important for sending httpOnly cookies
      });
      return response.data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }

  // Logout user (if needed for server-side logout)
  async logout(): Promise<void> {
    try {
      await axios.post(
        `${this.baseURL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error logging out user:", error);
      throw error;
    }
  }

  // Check if user is authenticated by making a request to a protected endpoint
  async checkAuth(): Promise<boolean> {
    try {
      await axios.get(`${this.baseURL}/me`, {
        withCredentials: true,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const authService = new AuthService();
