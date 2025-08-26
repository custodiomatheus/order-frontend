import axios from 'axios'

export function createHttpClient({ baseURL, timeoutMs = 15000 }) {
  const instance = axios.create({
    baseURL,
    timeout: timeoutMs,
    withCredentials: true,
  })

  return instance
}
