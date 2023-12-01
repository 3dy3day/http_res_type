class APIError extends Error {
    public statusCode: number;
    public details: any;
  
    constructor(message: string, statusCode: number | undefined, details: any) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode ?? 500;
      this.details = details;
    }
}

export async function getAPI(endpoint: string) {
try {
    const { data, error } = await useFetch<any>(endpoint, { method: "GET" });
    if (error.value) {
    throw new APIError('Error fetching data from API', error.value.statusCode, error.value);
    }
    return { data: data.value || [] };

} catch (e) {
    if (e instanceof Error) {
      console.error('An error occurred', e.message);
      return { data: [], error: e.message };
    } else {
      console.error('An unknown error occurred', e);
      return { data: [], error: 'An unknown error occurred' };
    }
  }
}