<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/authStore'
// import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const authStore = useAuthStore()
// const { isAuthenticated } = storeToRefs(authStore)

onMounted(() => {
  authStore.checkAuth()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <RouterView />
  </div>
</template>
