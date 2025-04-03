<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/authStore'
import { onMounted } from 'vue'


onMounted(() => {
  const authStore = useAuthStore()
  authStore.checkAuth()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <RouterView />
  </div>
</template>
