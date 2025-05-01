import { useState, useEffect } from 'react';

type FetchOptions = RequestInit & { skip?: boolean };

export function useFetch<T = unknown>(url: string, options: FetchOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(!options.skip);

  const fetchData = async () => {
    debugger
    try {
      setLoading(true);
      const res = await fetch(url, { ...options, cache: 'no-store' });
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      const json = await res.json();
      setData(json.data as T);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!options.skip) fetchData();
  }, [url]);

  const refetch = () => fetchData();

  return { data, error, loading, refetch };
}
