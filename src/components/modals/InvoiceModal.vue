<script setup lang="ts">
import { ref } from 'vue'
import { useProjectsStore } from '../../stores/projectsStore'
import { useClientsStore } from '@/stores/clientsStore'

const projectsStore = useProjectsStore()
const clientsStore = useClientsStore();

const clientId = ref('')
const projectId = ref('')
const issueDate = ref('')
const dueDate = ref('')
const items = ref([{ description: '', quantity: 1, rate: 0 }])
const isSubmitting = ref(false)

const emit = defineEmits(['close', 'invoice-created'])

function closeModal() {
    emit('close')
}

function addItem() {
    items.value.push({ description: '', quantity: 1, rate: 0 })
}

function removeItem(index: number) {
    items.value.splice(index, 1)
}

async function createInvoice() {
    isSubmitting.value = true
    try {
        emit('invoice-created')
        closeModal()
    } catch (error) {
        console.error('Error creating invoice:', error)
    } finally {
        isSubmitting.value = false
    }
}

function calculateTotal() {
    return items.value.reduce((total, item) => {
        return total + (item.quantity * item.rate);
    }, 0).toFixed(2);
}
</script>

<template>
    <div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" aria-hidden="true"
                @click="closeModal"></div>
            <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
            <div
                class="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle -up">
                <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                <div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div
                                class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">Create Invoice</h3>
                        </div>
                        <button type="button" @click="closeModal"
                            class="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none dark:hover:bg-gray-700 dark:hover:text-gray-300">
                            <span class="sr-only">Close</span>
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <form @submit.prevent="createInvoice">
                    <div class="max-h-[60vh] overflow-y-auto px-6 py-4">
                        <div class="space-y-5">
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label for="clientId"
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">Client</label>
                                    <div class="relative mt-1">
                                        <select id="clientId" v-model="clientId"
                                            class="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                            required>
                                            <option value="" disabled selected>Select a client</option>
                                            <option v-for="client in clientsStore.clients || []" :key="client.id"
                                                :value="client.id">
                                                {{ client.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label for="projectId"
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">Project</label>
                                    <div class="relative mt-1">
                                        <select id="projectId" v-model="projectId"
                                            class="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                            required>
                                            <option value="" disabled selected>Select a project</option>
                                            <option v-for="project in projectsStore.projects" :key="project.id"
                                                :value="project.id">
                                                {{ project.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label for="issueDate"
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">Issue
                                        Date</label>
                                    <div class="relative mt-1">
                                        <input id="issueDate" v-model="issueDate" type="date"
                                            class="block w-full rounded-md border border-gray-300 pl-4 pr-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                            required />
                                    </div>
                                </div>
                                <div>
                                    <label for="dueDate"
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">Due
                                        Date</label>
                                    <div class="relative mt-1">
                                        <input id="dueDate" v-model="dueDate" type="date"
                                            class="block w-full rounded-md border border-gray-300 pl-4 pr-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                            required />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="mb-3 flex items-center justify-between">
                                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Invoice Items</h4>
                                    <button type="button" @click="addItem"
                                        class="inline-flex items-center rounded-md border border-transparent bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        Add Item
                                    </button>
                                </div>
                                <div
                                    class="hidden rounded-t-md bg-gray-50 px-4 py-2 dark:bg-gray-700/30 sm:grid sm:grid-cols-12 sm:gap-2">
                                    <div class="col-span-6 text-xs font-medium text-gray-500 dark:text-gray-400">
                                        Description</div>
                                    <div class="col-span-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                                        Quantity</div>
                                    <div class="col-span-3 text-xs font-medium text-gray-500 dark:text-gray-400">Rate
                                    </div>
                                    <div class="col-span-1 text-xs font-medium text-gray-500 dark:text-gray-400"></div>
                                </div>
                                <div class="space-y-2">
                                    <div v-for="(item, index) in items" :key="index"
                                        class="rounded-md border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-12 sm:gap-2">
                                            <div class="sm:col-span-6">
                                                <label :for="`item-desc-${index}`"
                                                    class="block text-xs font-medium text-gray-500 dark:text-gray-400 sm:hidden">Description</label>
                                                <input :id="`item-desc-${index}`" v-model="item.description" type="text"
                                                    class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700 sm:mt-0"
                                                    placeholder="Item description" required />
                                            </div>
                                            <div class="sm:col-span-2">
                                                <label :for="`item-qty-${index}`"
                                                    class="block text-xs font-medium text-gray-500 dark:text-gray-400 sm:hidden">Quantity</label>
                                                <input :id="`item-qty-${index}`" v-model.number="item.quantity"
                                                    type="number" min="1"
                                                    class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700 sm:mt-0"
                                                    placeholder="Qty" required />
                                            </div>
                                            <div class="sm:col-span-3">
                                                <label :for="`item-rate-${index}`"
                                                    class="block text-xs font-medium text-gray-500 dark:text-gray-400 sm:hidden">Rate</label>
                                                <div class="relative mt-1 sm:mt-0">
                                                    <div
                                                        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <span class="text-gray-500 sm:text-sm">$</span>
                                                    </div>
                                                    <input :id="`item-rate-${index}`" v-model.number="item.rate"
                                                        type="number" min="0" step="0.01"
                                                        class="block w-full rounded-md border border-gray-300 pl-7 pr-3 py-1.5 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                                        placeholder="0.00" required />
                                                </div>
                                            </div>
                                            <div class="flex items-center justify-end sm:col-span-1">
                                                <button type="button" @click="removeItem(index)"
                                                    class="inline-flex items-center rounded-md border border-transparent text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 focus:outline-none dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                        viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd"
                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                            clip-rule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-4 flex justify-end">
                                    <div class="rounded-md bg-gray-50 px-4 py-2 dark:bg-gray-700/30">
                                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Total:
                                        </span>
                                        <span class="text-lg font-bold text-gray-900 dark:text-white">${{
                                            calculateTotal() }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-6 py-4 dark:bg-gray-700/30">
                        <div class="flex justify-end space-x-3">
                            <button type="button" @click="closeModal"
                                class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                                Cancel
                            </button>
                            <button type="submit" :disabled="isSubmitting"
                                class="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                                <svg v-if="isSubmitting" class="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                <span v-if="isSubmitting">Creating...</span>
                                <span v-else>Create Invoice</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>