import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: { name: '' }
  }),
  actions: {
    login(userData) {
      this.isAuthenticated = true
      this.user = userData
      localStorage.setItem('token', 'true') // o el JWT real
      localStorage.setItem('username', userData.name)
    },
    logout() {
      this.isAuthenticated = false
      this.user = { name: '' }
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
    loadSession() {
      const token = localStorage.getItem('token')
      const name = localStorage.getItem('username')
      if (token && name) {
        this.isAuthenticated = true
        this.user = { name }
      }
    }
  }
})

