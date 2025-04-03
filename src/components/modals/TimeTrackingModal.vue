<script setup lang="ts">
import { ref } from 'vue'
import { useTimeEntriesStore } from '../../stores/timeEntriesStore'

const timeEntriesStore = useTimeEntriesStore()
const description = ref('')
const startTime = ref('')
const endTime = ref('')
const isSubmitting = ref(false)

const emit = defineEmits(['close'])

function closeModal() {
    emit('close')
}

async function trackTime() {
    isSubmitting.value = true;
    try {
        const start = new Date(startTime.value);
        const end = new Date(endTime.value);

        if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
            throw new Error('Invalid start or end time');
        }

        const duration = (end.getTime() - start.getTime()) / 3600000; // Convert ms to hours

        await timeEntriesStore.createTimeEntry({
            description: description.value,
            startTime: startTime.value,
            endTime: endTime.value,
            duration,
        });
        closeModal();
    } catch (error) {
        console.error('Error tracking time:', error);
    } finally {
        isSubmitting.value = false;
    }
}

function calculateDuration() {
    if (!startTime.value || !endTime.value) return '';

    const start = new Date(startTime.value);
    const end = new Date(endTime.value);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';

    const diffMs = end.getTime() - start.getTime();
    if (diffMs < 0) return '';

    const diffHrs = Math.floor(diffMs / 3600000);
    const diffMins = Math.round((diffMs % 3600000) / 60000);

    return `${diffHrs}h ${diffMins}m`;
}
</script>

<template>
    <div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" aria-hidden="true"
                @click="closeModal"></div>
            <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
            <div
                class="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-md sm:align-middle -up">
                <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                <div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">Track Time</h3>
                        </div>
                        <button type="button" @click="closeModal"
                            class="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none dark:hover:bg-gray-700 dark:hover:text-gray-300 cursor-pointer">
                            <span class="sr-only">Close</span>
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <form @submit.prevent="trackTime">
                    <div class="px-6 py-4">
                        <div class="space-y-4">
                            <div>
                                <label for="description"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <div class="relative mt-1">
                                    <input id="description" v-model="description" type="text"
                                        class="block w-full rounded-md border border-gray-300 pl-4 pr-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                        required placeholder="What are you working on?" />
                                </div>
                            </div>
                            <div>
                                <label for="startTime"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Start
                                    Time</label>
                                <div class="relative mt-1">
                                    <input id="startTime" v-model="startTime" type="datetime-local"
                                        class="block w-full rounded-md border border-gray-300 pl-4 pr-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                        required />
                                </div>
                            </div>
                            <div>
                                <label for="endTime"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">End Time</label>
                                <div class="relative mt-1">
                                    <input id="endTime" v-model="endTime" type="datetime-local"
                                        class="block w-full rounded-md border border-gray-300 pl-4 pr-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                        required />
                                </div>
                            </div>
                            <div v-if="calculateDuration()" class="rounded-md bg-emerald-50 p-3 dark:bg-emerald-900/20">
                                <div class="flex items-center">
                                    <div class="ml-3">
                                        <h3 class="text-sm font-medium text-emerald-800 dark:text-emerald-200">Duration
                                        </h3>
                                        <div class="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
                                            {{ calculateDuration() }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-6 py-4 dark:bg-gray-700/30">
                        <div class="flex justify-end space-x-3">
                            <button type="button" @click="closeModal"
                                class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" :disabled="isSubmitting"
                                class="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer">
                                <span v-if="isSubmitting">Saving...</span>
                                <span v-else>Save Time Entry</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
