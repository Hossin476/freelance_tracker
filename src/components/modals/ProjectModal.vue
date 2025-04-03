<script setup lang="ts">
import { ref } from 'vue'
import { useProjectsStore } from '../../stores/projectsStore'

const projectsStore = useProjectsStore()
const name = ref('')
const description = ref('')
const budget = ref(0)
const status = ref<'In Progress' | 'Active' | 'On Hold' | 'Completed'>('In Progress')
const isSubmitting = ref(false)

const emit = defineEmits(['close'])

function closeModal() {
    emit('close')
}

async function createProject() {
    isSubmitting.value = true
    try {
        await projectsStore.createProject({
            name: name.value,
            description: description.value,
            budget: budget.value,
            status: status.value,
        })
        closeModal()
    } catch (error) {
        console.error('Error creating project:', error)
    } finally {
        isSubmitting.value = false
    }
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
                            <div
                                class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">Create New Project
                            </h3>
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
                <form @submit.prevent="createProject">
                    <div class="px-6 py-4">
                        <div class="space-y-4">
                            <div>
                                <label for="name"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Project
                                    Name</label>
                                <div class="relative mt-1">
                                    <input id="name" v-model="name" type="text"
                                        class="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                        required placeholder="Enter project name" />
                                </div>
                            </div>
                            <div>
                                <label for="description"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <div class="relative mt-1">
                                    <textarea id="description" v-model="description" rows="3"
                                        class="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                        placeholder="Describe your project"></textarea>
                                </div>
                            </div>
                            <div>
                                <label for="budget"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Budget</label>
                                <div class="relative mt-1 rounded-md shadow-sm">
                                    <input id="budget" v-model.number="budget" type="number" min="0" step="0.01"
                                        class="block w-full rounded-md border border-gray-300 pl-4 pr-4 py-2 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                        placeholder="0.00" />
                                </div>
                            </div>
                            <div>
                                <label for="status"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                <div class="relative mt-1">
                                    <select id="status" v-model="status"
                                        class="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700">
                                        <option value="In Progress">In Progress</option>
                                        <option value="Active">Active</option>
                                        <option value="On Hold">On Hold</option>
                                        <option value="Completed">Completed</option>
                                    </select>
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
                                <span v-if="isSubmitting">Creating...</span>
                                <span v-else>Create Project</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
