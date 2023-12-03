import { ref, watchEffect } from 'vue';
import type { User, ApiError, FetchState } from '~/types/User';
import type { ApiResponse } from '~/types/ApiResponse';

export function getUser() {
  const user: Ref<User | null> = ref(null);
  const error: Ref<ApiError | null> = ref(null);
  const state: Ref<FetchState> = ref('unknown');

  const fetchUser = async (userId: number) => {
    state.value = 'loading';
    try {
      const { data, error: fetchError } = await useFetch<ApiResponse>(`http://127.0.0.1:3001/api/users/${userId}`, { method: "GET" });
      console.log(data.value);

      if (fetchError.value) {
        setError('Connection failed or server error', 'fetchUser');
        return;
      }

      if (!data.value) {
        setError('No data received', 'fetchUser');
        return;
      }

      switch (data.value.response) {
        case 'success':
          if (isUser(data.value.data)) {
            user.value = data.value.data;
            state.value = 'success';
          } else {
            setError('Data received is not a valid user', 'fetchUser');
          }
          break;

        case 'error':
          setError(data.value.data.errorMessage, data.value.data.functionName);
          break;

        default:
          setError('Unexpected error occurred', 'fetchUser');
      }
    } catch (err) {
      setError('Network or server error', 'fetchUser');
    }
  };

  const isUser = (data: any): data is User => {
    return typeof data === 'object' && 
           data !== null &&
           typeof data.id === 'number' && 
           typeof data.name === 'string' && 
           typeof data.email === 'string';
  };

  const setError = (message: string, functionName: string) => {
    error.value = { functionName, errorMessage: message };
    state.value = 'error';
  };

  return { user, error, state, fetchUser };
}