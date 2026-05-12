type CustomFetchOptions = Omit<RequestInit, 'cache'> & {
  params?: Record<string, string | number | boolean>;
  cache?: RequestCache;
};

async function customFetch<T = unknown>(
  input: string | URL,
  options?: CustomFetchOptions
): Promise<T> {
  const { params, ...fetchOptions } = options ?? {};

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }
  const url = new URL(input.toString(), baseUrl);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString(), {
    cache: 'no-store',
    ...fetchOptions,
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(
      result.message || `API Error: ${response.status} ${response.statusText}`
    );
    Object.assign(error, { status: response.status, data: result });
    throw error;
  }

  return result as T;
}

export default customFetch;