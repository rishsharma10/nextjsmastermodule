export async function apiClient<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: unknown
  ): Promise<T> {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    console.log(res,'responseeeee');
    
  
    if (!res.ok) return res.json();
  
    return res.json();
  }
  