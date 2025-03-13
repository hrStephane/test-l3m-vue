import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTokenStore = defineStore('token', () => {
  const token = ref<string | null>(null) 
  function setToken(newToken: string | null) {
    token.value = newToken
    // if (newToken) {
    //   localStorage.setItem('token', newToken)
    // } else {
    //   localStorage.removeItem('token')
    // }
  }

  function getToken(): string | null {
    return token.value
  }

  function clearToken() {
    token.value = null
  }

  const isAuthenticated = computed(() => !!token.value)

  return {
    token,
    setToken,
    getToken,
    clearToken,
    isAuthenticated
  }
})