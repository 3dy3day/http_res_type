// ~/types/ApiResponse.ts
import type { User, ApiError } from './User';

export interface ApiResponseSuccess {
  response: 'success';
  data: User;
}

export interface ApiResponseError {
  response: 'error';
  data: ApiError;
}

export type ApiResponse = ApiResponseSuccess | ApiResponseError;
