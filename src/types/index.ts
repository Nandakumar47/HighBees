export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  destination: string;
  departureCity: string;
  departureDate: string;
  duration: string;
  budget: string;
  status: string;
  submittedAt: string;
  message?: string;
  communicationHistory?: Array<{
    date: string;
    type: 'email' | 'phone' | 'note';
    content: string;
    agent: string;
  }>;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  submittedAt: string;
  priority: string;
  communicationHistory?: Array<{
    date: string;
    type: 'email' | 'phone' | 'note';
    content: string;
    agent: string;
  }>;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}