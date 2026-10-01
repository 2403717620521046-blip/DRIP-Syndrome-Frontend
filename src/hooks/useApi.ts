import { useState, useEffect, useCallback } from 'react';
import { isDemoMode } from '../services/api';

interface UseApiOptions<T> {
  immediate?: boolean;
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  errorMessage: string | null;
  refetch: () => Promise<T | null>;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
  isDemo: boolean;
}

export function useApi<T>(
  apiFn: () => Promise<T>,
  deps: any[] = [],
  options: UseApiOptions<T> = {}
): UseApiResult<T> {
  const { immediate = true, initialData = null, onSuccess, onError } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState<boolean>(isDemoMode());

  // Listen to demo mode change events to automatically reload
  useEffect(() => {
    const handleModeChange = () => {
      setIsDemo(isDemoMode());
      execute();
    };
    window.addEventListener('wealth_resource_demo_mode_changed', handleModeChange);
    return () => window.removeEventListener('wealth_resource_demo_mode_changed', handleModeChange);
  }, []);

  const execute = useCallback(async (): Promise<T | null> => {
    setLoading(true);
    setError(null);
    setErrorMessage(null);
    try {
      const result = await apiFn();
      setData(result);
      if (onSuccess) onSuccess(result);
      return result;
    } catch (err: any) {
      const parsedError = err instanceof Error ? err : new Error(String(err));
      setError(parsedError);
      
      let msg = "Unable to connect to the ML backend.";
      if (err.response?.data?.message) {
        msg = err.response.data.message;
      } else if (err.code === 'ECONNABORTED' || err.message?.includes('Network Error')) {
        msg = "Unable to connect to the ML backend. Ensure the Python API service is running on the specified port.";
      }
      setErrorMessage(msg);
      if (onError) onError(parsedError);
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiFn, ...deps]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    data,
    loading,
    error,
    errorMessage,
    refetch: execute,
    setData,
    isDemo,
  };
}

export default useApi;
