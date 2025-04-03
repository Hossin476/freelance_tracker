<script setup lang="ts">
import { ref } from 'vue'
import { useClientsStore } from '@/stores/clientsStore'

const clientsStore = useClientsStore()
const name = ref('')
const contactPerson = ref('')
const email = ref('')
const phone = ref('')
const notes = ref('')
const isSubmitting = ref(false)

const emit = defineEmits(['close', 'client-added'])

function closeModal() {
    emit('close')
}

async function addClient() {
    isSubmitting.value = true
    try {
        await clientsStore.createClient({
            name: name.value,
            contactPerson: contactPerson.value,
            email: email.value,
            phone: phone.value,
            notes: notes.value,
        })
        emit('client-added')
        closeModal()
    } catch (error) {
        console.error('Error adding client:', error)
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
                class="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                <div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div
                                class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">Add Client</h3>
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
                <form @submit.prevent="addClient">
                    <div class="max-h-[60vh] overflow-y-auto px-6 py-4">
                        <div class="space-y-4">
                            <div>
                                <label for="name"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Company
                                    Name</label>
                                <div class="relative mt-1">
                                    <input id="name" v-model="name" type="text"
                                        class="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                        required placeholder="Enter company name" />
                                </div>
                            </div>
                            <div>
                                <label for="contactPerson"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Client
                                    Name</label>
                                <div class="relative mt-1">
                                    <input id="contactPerson" v-model="contactPerson" type="text"
                                        class="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                        placeholder="Client Name" />
                                </div>
                            </div>
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label for="email"
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <div class="relative mt-1">
                                        <input id="email" v-model="email" type="email"
                                            class="block w-full rounded-md border border-gray-300 pl-4 pr-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                            required placeholder="client@example.com" />
                                    </div>
                                </div>
                                <div>
                                    <label for="phone"
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                                    <div class="relative mt-1">
                                        <input id="phone" v-model="phone" type="tel"
                                            class="block w-full rounded-md border border-gray-300 pl-4 pr-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                            placeholder="(123) 456-7890" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label for="notes"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
                                <div class="relative mt-1">
                                    <textarea id="notes" v-model="notes" rows="3"
                                        class="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                        placeholder="Additional information about this client"></textarea>
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
                                <span v-if="isSubmitting">Saving...</span>
                                <span v-else>Add Client</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
