import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { useTokenStore } from './token'

interface User {
  id: number
  email: string
  name: string
}

interface LoginResponse {
  user: User
  token: string
}

export const useAuthStore = defineStore('auth', () => {
  const tokenStore = useTokenStore()
  const user = ref<User | null>(null)

  const apiEndpoint = import.meta.env.VITE_API_BASE_URL

  const isAuthenticated = computed(() => !!tokenStore.token)

  watch(
    () => tokenStore.token,
    (newToken) => {
      if (newToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      } else {
        delete axios.defaults.headers.common['Authorization']
      }
    },
    { immediate: true }
  )

  async function login(email: string, password: string) {
    try {
      const response = await axios.post<LoginResponse>(`${apiEndpoint}/api/auth/login`, {
        email,
        password
      })

      user.value = response.data.user
      tokenStore.setToken(response.data.token)

      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  async function register(email: string, password: string, name: string) {
    try {
      const response = await axios.post<LoginResponse>(`${apiEndpoint}/api/auth/register`, {
        email,
        password,
        name
      })

      user.value = response.data.user
      tokenStore.setToken(response.data.token)

      return true
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    }
  }

  async function logout() {
    try {
      await axios.post(`${apiEndpoint}/api/auth/logout`)
      user.value = null
      tokenStore.clearToken()
    } catch (error) {
      console.error('Logout failed:', error)
      return false
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout
  }
})