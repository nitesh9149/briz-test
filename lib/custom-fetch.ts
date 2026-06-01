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

  // Preserve the base path (e.g. "/api/v1/"): guarantee a trailing slash on the
  // base and strip any leading slash on the input, so neither segment is dropped
  // by URL resolution (a leading slash would make the input absolute).
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const path = input.toString().replace(/^\/+/, '');
  const url = new URL(path, base);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString(), {
    cache: 'no-store',
    ...fetchOptions,
  });

  // Parse defensively: an empty (e.g. 204) or non-JSON body would make
  // response.json() throw and mask the real HTTP status.
  const raw = await response.text();
  const result = raw ? safeJsonParse(raw) : null;

  if (!response.ok) {
    const message =
      isRecord(result) && typeof result.message === 'string'
        ? result.message
        : `API Error: ${response.status} ${response.statusText}`;
    const error = new Error(message);
    Object.assign(error, { status: response.status, data: result });
    throw error;
  }

  return result as T;
}

function safeJsonParse(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export default customFetch;
