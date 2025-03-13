import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { User } from './users'

export interface Transaction {
  id: number
  reference: string
  user_id: number
  amount: number
  type: string
  status: string
  date: string
  description: string
  created_at: string
  user: User
}

const apiEndpoint = import.meta.env.VITE_API_BASE_URL;

export const useTransactionsStore = defineStore('transactions', () => {
  const transactions = ref<Transaction[]>([])
  const totalPages = ref(0)

  async function fetchTransactions(page: number = 1, limit: number = 10) {
    try {
      const response = await axios.get(`${apiEndpoint}/api/user/transactions`, {
        headers: {
          Accept: 'application/json'
        },
        params: {
          page,
          limit
        }
      })
      
      transactions.value = response.data.data;
      totalPages.value = response.data.last_page;

      console.log(response.data)

      return response.data
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  function getTransactions() {
    return transactions.value
  }

  async function getTransaction(id: number) {
    try {
      const response = await axios.get(`${apiEndpoint}/api/transactions/${id}`, {
        headers: {
          Accept: 'application/json'
        }
      })

      if (response.data.error) {
        throw new Error(response.data.error)
      }

      console.log(response.data)

      const transaction = response.data.data
      const formattedTransaction = {
        ...transaction,
        date: new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hourCycle: 'h23'
        }).format(new Date(transaction.date.replace(' ', 'T')))
      };
  
      console.log("formattedTransaction",formattedTransaction);
  
      return formattedTransaction;
    } catch (error) {
      console.error('Error fetching transaction:', error)
      throw error
    }
  }

  async function updateTransaction(id: number, data: Partial<Transaction>) {
    try {
      const response = await axios.put(`${apiEndpoint}/api/transactions/${id}`, data, {
        headers: {
          Accept: 'application/json'
        }
      })

      const index = transactions.value.findIndex(tx => tx.id === id)
      if (index !== -1) {
        transactions.value[index] = { ...transactions.value[index], ...response.data }
      }
      console.log('Transaction updated:', response.data)
    } catch (error) {
      console.error('Error updating transaction:', error)
      throw error
    }
  }

  onMounted(() => {
    fetchTransactions()
  })

  return {
    transactions,
    totalPages,
    fetchTransactions,
    getTransactions,
    getTransaction,
    updateTransaction
  }
})
