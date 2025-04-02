<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['new-project', 'track-time', 'new-invoice', 'new-client'])
</script>

<template>
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">Quick Actions</h3>
        </div>
        <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                <button @click="emit('new-project')"
                    class="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <div class="text-emerald-600 dark:text-emerald-400 text-2xl mb-2">➕</div>
                    <h4 class="text-base font-medium text-gray-900 dark:text-white">New Project</h4>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Create a new project</p>
                </button>
                <button @click="emit('track-time')"
                    class="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <div class="text-emerald-600 dark:text-emerald-400 text-2xl mb-2">⏱️</div>
                    <h4 class="text-base font-medium text-gray-900 dark:text-white">Track Time</h4>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Log hours for a project</p>
                </button>
                <button @click="emit('new-invoice')"
                    class="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <div class="text-emerald-600 dark:text-emerald-400 text-2xl mb-2">📄</div>
                    <h4 class="text-base font-medium text-gray-900 dark:text-white">New Invoice</h4>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Generate an invoice</p>
                </button>
                <button @click="emit('new-client')"
                    class="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <div class="text-emerald-600 dark:text-emerald-400 text-2xl mb-2">👤</div>
                    <h4 class="text-base font-medium text-gray-900 dark:text-white">New Client</h4>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Add a new client</p>
                </button>
            </div>
        </div>
    </div>
</template>
