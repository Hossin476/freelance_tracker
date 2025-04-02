<script setup lang="ts">
import { computed } from 'vue'
import { useTimeEntriesStore } from '@/stores/timeEntriesStore'

const timeEntriesStore = useTimeEntriesStore()
const timeEntries = computed(() => timeEntriesStore.timeEntries)
</script>

<template>
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Time Entries</h3>
        </div>
        <div class="p-6">
            <div v-if="timeEntries.length === 0" class="text-gray-500 dark:text-gray-400">
                No time entries available.
            </div>
            <ul v-else class="space-y-4">
                <li v-for="entry in timeEntries" :key="entry.id"
                    class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow">
                    <div class="flex justify-between">
                        <div>
                            <h4 class="text-lg font-medium text-gray-900 dark:text-white">{{ entry.description }}</h4>
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                {{ new Date(entry.startTime).toLocaleString() }} - {{ new
                                    Date(entry.endTime).toLocaleString() }}
                            </p>
                        </div>
                        <div class="text-sm text-gray-700 dark:text-gray-300">
                            Duration: {{ entry.duration }} hours
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
