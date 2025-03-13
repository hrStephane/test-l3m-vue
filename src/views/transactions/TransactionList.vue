<script setup>
import { ref } from 'vue';
import { TailwindPagination } from 'laravel-vue-pagination';
import { useTransactionsStore } from '../../stores/transactions';
import { useAuthStore } from '../../stores/auth'

const transactionsStore = useTransactionsStore();
const transactions = ref({});
const perPage = ref(10);
const isLoading = ref(true);
const authStore = useAuthStore()

const perPageOptions = [1,5,10,50,100]

const getTransactions = async (page = 1) => {
  isLoading.value = true;
  const response = await transactionsStore.fetchTransactions(page, perPage.value);
  transactions.value = response;
  isLoading.value = false;

  // console.log("transactions",response);
  // console.log("auth", authStore.user)
};

const changePerPage = () => {
  getTransactions();
};

getTransactions();

</script>

<template>
  <div>
    <div>
      <h1 class="text-xl font-semibold">Transactions</h1>
    </div>

    <div v-if="isLoading" class="mt-8 text-center">
      <span>Loading...</span>
    </div>

    <div v-else class="mt-8">
      <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold">Date</th>
              <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold">Reference</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold">Type</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold">Status</th>
              <th class="relative py-3.5 pl-3 pr-4">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="transaction in transactions.data" :key="transaction.id">
              <td class="py-4 pl-4 pr-3 text-sm">{{ transaction.date }}</td>
              <td class="py-4 pl-4 pr-3 text-sm">{{ transaction.reference }}</td>
              <td class="px-3 py-4 text-sm">{{ transaction.type }}</td>
              <td class="px-3 py-4 text-sm">{{ transaction.status }}</td>
              <td class="text-right py-4 pr-4 text-sm">
                <router-link :to="{ name: 'transaction-details', params: { id: transaction.id }}" class="text-indigo-600 hover:text-indigo-900 mr-4">View</router-link>
              </td>
            </tr>
          </tbody>
        </table>

        <TailwindPagination
          :data="transactions"
          @pagination-change-page="getTransactions"
        />
      </div>
    </div>

    <div class="mt-4">
      <label for="perPage" class="mr-2">Items per page:</label>
      <select v-model="perPage" @change="changePerPage" id="perPage">
        <option v-for="value in perPageOptions" :key="value" :value="value">{{ value }}</option>
      </select>
    </div>
  </div>
</template>
