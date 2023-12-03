// ~/types/User.ts
export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface ApiError {
    functionName: string;
    errorMessage: string;
  }
  
  export type FetchState = 'loading' | 'success' | 'error' | 'unknown';
  