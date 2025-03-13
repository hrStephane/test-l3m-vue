<script setup lang="ts">
import { ListBulletIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>


<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <router-link
                :to="{ name: 'dashboard' }"
              >
                <h1 class="text-xl font-bold text-gray-900">Dashboard</h1>
              </router-link>
            </div>
          </div>
          <div v-if="authStore.isAuthenticated" class="flex items-center">
            <div class="flex items-center">
              <router-link
                :to="{ name: 'user-details', params: { id: authStore.user?.id }}"
                class="mx-2"
              >
                <span class="text-gray-700 mr-4">{{ authStore.user?.name }}</span>
              </router-link>
              <button
                @click="handleLogout"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="flex h-[calc(100vh-4rem)]">
      <div class="w-64 bg-white shadow-sm">
        <nav class="mt-5 px-2 space-y-2">
          <router-link
            to="/transactions"
            class="group flex items-center px-3 py-2 text-sm font-medium rounded-md"
            :class="[
              $route.path.startsWith('/transactions')
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            <ListBulletIcon class="mr-3 h-5 w-5 flex-shrink-0" :class="[
              $route.path.startsWith('/transactions')
                ? 'text-indigo-600'
                : 'text-gray-400 group-hover:text-gray-500'
            ]" />
            Transactions
          </router-link>
        </nav>
      </div>

      <main class="flex-1 overflow-y-auto p-8">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
