<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useTransactionsStore, Transaction } from "../../stores/transactions";

const route = useRoute();
const transactionsStore = useTransactionsStore();

const transaction = ref<Transaction | null>(null);

const id = parseInt(route.params.id as string);

onMounted(async () => {
  transaction.value = await transactionsStore.getTransaction(id);
});
</script>

<template>
    <div v-if="transaction">
      <h3 class="text-lg font-medium">Transaction Information</h3>
      <div class="flex space-x-4">
        <div class="shadow rounded-lg p-4 bg-white flex-1">
          <dl>
            <div class="px-4 py-5">
              <dt class="text-sm font-medium">Reference</dt>
              <dd class="text-sm">{{ transaction.reference }}</dd>
            </div>
            <div class="px-4 py-5">
              <dt class="text-sm font-medium">Date</dt>
              <dd class="text-sm">{{ transaction.date }}</dd>
            </div>
            <div class="px-4 py-5">
              <dt class="text-sm font-medium">Type</dt>
              <dd class="text-sm">{{ transaction.type }}</dd>
            </div>
            <div class="px-4 py-5">
              <dt class="text-sm font-medium">Amount</dt>
              <dd class="text-sm">{{ transaction.amount }}</dd>
            </div>
            <div class="px-4 py-5">
              <dt class="text-sm font-medium">Status</dt>
              <dd class="text-sm">{{ transaction.status }}</dd>
            </div>
            <div class="px-4 py-5">
              <dt class="text-sm font-medium">Description</dt>
              <dd class="text-sm">{{ transaction.description }}</dd>
            </div>
          </dl>
        </div>
  
        <div class="shadow rounded-lg p-4 bg-white flex-1">
          <dl>
            <div class="px-4 py-5">
              <dt class="text-sm font-medium">Utilisateur</dt>
              <dd class="text-sm">{{ transaction.user.name }}</dd>
            </div>
            <div class="px-4 py-5">
              <dt class="text-sm font-medium">Email</dt>
              <dd class="text-sm">{{ transaction.user.email }}</dd>
            </div>
            <div class="px-4 py-3 text-right">
              <router-link :to="{ name: 'user-details', params: { id: transaction.user.id }}" class="text-indigo-600 hover:text-indigo-900">View user</router-link>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </template>
  