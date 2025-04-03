<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const name = ref('')
const email = ref('')
const hourlyRate = ref(75)
const currency = ref('USD')
const invoicePrefix = ref('INV-')
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const currencies = [
    { code: 'USD', name: 'US Dollar ($)' },
    { code: 'EUR', name: 'Euro (€)' },
    { code: 'GBP', name: 'British Pound (£)' },
    { code: 'CAD', name: 'Canadian Dollar (C$)' },
    { code: 'AUD', name: 'Australian Dollar (A$)' },
]

onMounted(() => {
    if (user.value) {
        name.value = user.value.name || ''
        email.value = user.value.email || ''
        hourlyRate.value = user.value.hourlyRate || 75
        currency.value = user.value.currency || 'USD'
        invoicePrefix.value = user.value.preferences?.invoicePrefix || 'INV-'
    } else {
        authStore.fetchUserProfile().then(() => {
            if (user.value) {
                name.value = user.value.name || ''
                email.value = user.value.email || ''
                hourlyRate.value = user.value.hourlyRate || 75
                currency.value = user.value.currency || 'USD'
                invoicePrefix.value = user.value.preferences?.invoicePrefix || 'INV-'
            }
        })
    }
})

async function saveProfile() {
    isSubmitting.value = true
    errorMessage.value = ''
    successMessage.value = ''

    try {
        const updatedUser = {
            name: name.value,
            hourlyRate: hourlyRate.value,
            currency: currency.value,
            preferences: {
                invoicePrefix: invoicePrefix.value,
            },
        }

        await authStore.updateUserProfile(updatedUser)
        successMessage.value = 'Profile updated successfully'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        errorMessage.value = error.message || 'Failed to update profile'
        console.error(error)
    } finally {
        isSubmitting.value = false
    }
}

function navigateToDashboard() {
    router.push('/dashboard')
}

function handleLogout() {
    authStore.logout()
    router.push('/login')
}
</script>

<template>
    <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <div class="flex w-full items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-md space-y-8">
                <div class="text-center">
                    <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Your Profile
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Manage your account settings and preferences
                    </p>
                </div>

                <form class="mt-8 space-y-6" @submit.prevent="saveProfile">
                    <div v-if="successMessage" class="rounded-md bg-green-50 p-4 dark:bg-green-900/30">
                        <div class="flex">
                            <div >
                                <p class="text-sm font-medium text-green-800 dark:text-green-200">{{ successMessage }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Full Name
                        </label>
                        <div class="relative">
                            <input id="name" v-model="name" type="text" required
                                class="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                placeholder="John Doe" />
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email address
                        </label>
                        <div class="relative">
                            <input id="email" v-model="email" type="email" disabled
                                class="block w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                placeholder="you@example.com" />
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Email cannot be changed</p>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label for="hourly-rate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Default Hourly Rate
                        </label>
                        <div class="relative">
                            <input id="hourly-rate" v-model.number="hourlyRate" type="number" min="0" step="0.01"
                                required
                                class="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700" />
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label for="currency" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Currency
                        </label>
                        <div class="relative">
                            <select id="currency" v-model="currency" required
                                class="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700">
                                <option v-for="curr in currencies" :key="curr.code" :value="curr.code">{{ curr.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label for="invoice-prefix" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Invoice Prefix
                        </label>
                        <div class="relative">
                            <input id="invoice-prefix" v-model="invoicePrefix" type="text" required
                                class="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                placeholder="INV-" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" :disabled="isSubmitting"
                            class="group relative flex w-full justify-center rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-emerald-400 dark:focus:ring-offset-gray-900">
                            <span v-if="isSubmitting" class="flex items-center">
                                Saving...
                            </span>
                            <span v-else>Save Changes</span>
                        </button>
                    </div>

                    <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button type="button" @click="navigateToDashboard"
                            class="text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300">
                            Back to Dashboard
                        </button>
                        <button type="button" @click="handleLogout"
                            class="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                            Sign Out
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
