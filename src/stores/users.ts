import axios from 'axios'
import { defineStore } from 'pinia'

export interface User {
  id: number
  name: string
  email: string
}

export interface UserCreation {
  name: string
  email: string
  password?: string
}

const apiEndpoint = import.meta.env.VITE_API_BASE_URL;

export const useUsersStore = defineStore('users', () => {

  async function getUser(id: number, transactionsPage: number = 1, transactionPerPage: number = 10) {

    try {
      const response = await axios.get(`${apiEndpoint}/api/users/${id}`, {
        headers: {
          Accept: 'application/json'
        },
        params: {
          page: transactionsPage,
          limit: transactionPerPage
        }
      })

      if(response.data.error){
        throw new Error(response.data.error)
      }

      return {
        'user': response.data.user,
        'transactions': response.data.transactions
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  }


  return {
    getUser,
  }
})