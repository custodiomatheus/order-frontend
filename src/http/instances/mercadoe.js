import { createHttpClient } from '../createHttpClient'

export default createHttpClient({
  baseURL: import.meta.env.VITE_CORE_MERCADOE_API_URL,
})
