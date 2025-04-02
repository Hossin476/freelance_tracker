<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const name = ref('')
const email = ref('')
const hourlyRate = ref(75)
const currency = ref('USD')
const theme = ref('light')
const invoicePrefix = ref('INV-')

const isSubmitting = ref(false)

const currencies = [
    { code: 'USD', name: 'US Dollar ($)' },
    { code: 'EUR', name: 'Euro (€)' },
    { code: 'GBP', name: 'British Pound (£)' },
    { code: 'CAD', name: 'Canadian Dollar (C$)' },
    { code: 'AUD', name: 'Australian Dollar (A$)' },
]

const formattedHourlyRate = computed(() => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency.value
    }).format(hourlyRate.value)
})

onMounted(() => {
    if (user.value) {
        name.value = user.value.name || ''
        email.value = user.value.email || ''
        hourlyRate.value = user.value.hourlyRate || 75
        currency.value = user.value.currency || 'USD'
        theme.value = user.value.preferences?.theme || 'light'
        invoicePrefix.value = user.value.preferences?.invoicePrefix || 'INV-'
    } else {
        authStore.fetchUserProfile().then(() => {
            if (user.value) {
                name.value = user.value.name || ''
                email.value = user.value.email || ''
                hourlyRate.value = user.value.hourlyRate || 75
                currency.value = user.value.currency || 'USD'
                theme.value = user.value.preferences?.theme || 'light'
                invoicePrefix.value = user.value.preferences?.invoicePrefix || 'INV-'
            }
        })
    }
})

async function saveProfile() {
    isSubmitting.value = true

    try {
        const updatedUser = {
            name: name.value,
            hourlyRate: hourlyRate.value,
            currency: currency.value,
            preferences: {
                theme: theme.value as 'light' | 'dark',
                invoicePrefix: invoicePrefix.value,
            },
        }

        await authStore.updateUserProfile(updatedUser)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error)
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
        <header class="bg-white dark:bg-gray-800 shadow">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">Personal Information</h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                        Update your account settings and preferences.
                    </p>
                </div>

                <form @submit.prevent="saveProfile" class="px-4 py-5 sm:p-6">
                    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <input id="name" v-model="name" type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input id="email" v-model="email" type="email" disabled
                                class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm" />
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Email cannot be changed
                            </p>
                        </div>

                        <div>
                            <label for="hourly-rate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Default Hourly Rate
                            </label>
                            <div class="mt-1 relative rounded-md shadow-sm">
                                <input id="hourly-rate" v-model.number="hourlyRate" type="number" min="0" step="0.01"
                                    class="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
                            </div>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Your default rate: {{ formattedHourlyRate }}
                            </p>
                        </div>

                        <div>
                            <label for="currency" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Currency
                            </label>
                            <select id="currency" v-model="currency"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                                <option v-for="curr in currencies" :key="curr.code" :value="curr.code">
                                    {{ curr.name }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label for="theme" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Theme
                            </label>
                            <select id="theme" v-model="theme"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>

                        <div>
                            <label for="invoice-prefix"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Invoice Prefix
                            </label>
                            <input id="invoice-prefix" v-model="invoicePrefix" type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Example: {{ invoicePrefix }}2025001
                            </p>
                        </div>
                    </div>

                    <div class="mt-6">
                        <button type="submit" :disabled="isSubmitting"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-400">
                            <span v-if="isSubmitting">Saving...</span>
                            <span v-else>Save Changes</span>
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>
</template>