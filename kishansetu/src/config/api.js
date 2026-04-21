const DEFAULT_API_BASE_URL = 'https://kishansetu-backend.onrender.com';

const isLocalApiUrl = (value) => /localhost|127\.0\.0\.1/i.test(value);

const resolveApiBaseUrl = () => {
  const rawValue = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
  const candidates = rawValue
    .split('||')
    .map((value) => value.trim())
    .filter(Boolean);

  if (candidates.length === 0) {
    return DEFAULT_API_BASE_URL;
  }

  if (import.meta.env.DEV) {
    return candidates[0];
  }

  return candidates.find((value) => !isLocalApiUrl(value)) || candidates[0];
};

export const API_BASE_URL = resolveApiBaseUrl().replace(/\/$/, '');

export const apiUrl = (path) => `${API_BASE_URL}${path}`;
