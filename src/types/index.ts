// 1. Union Types for strict status tracking
export type Role = 'Admin' | 'Editor' | 'Viewer';
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// 2. Interface with Optional Properties
export interface Member {
  id: number;
  name: string;
  email: string;
  role: Role;
  bio?: string; // Optional
}

// 3. Type Alias for API Responses
export type APIResponse<T> = {
  data: T | null;
  error: string | null;
};