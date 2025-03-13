<script setup lang="ts">
import { BanknotesIcon } from '@heroicons/vue/24/outline'
import { onMounted, computed } from 'vue'
import { useTransactionsStore } from '../stores/transactions'

const transactionsStore = useTransactionsStore()

onMounted(async () => {
  await transactionsStore.fetchTransactions()
})

const totalTransactions = computed(() => transactionsStore.transactions.length)
</script>

<template>
  <div class="flex space-x-4">
    <div class="shadow rounded-lg p-4 bg-white">
      <div class="flex items-center space-x-4">
        <BanknotesIcon class="h-6 w-6 text-gray-500" aria-hidden="true" />
        <div>
          <p class="text-sm text-gray-500">Total transactions</p>
          <p class="text-xl font-semibold">{{ totalTransactions }}</p>
        </div>
      </div>
      <router-link to="/transactions" class="text-indigo-600 text-sm mt-2 block">
        View transactions
      </router-link>
    </div>
  </div>
</template>