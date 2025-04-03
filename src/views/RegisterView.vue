<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

async function handleSubmit() {
    if (!name.value || !email.value || !password.value) {
        errorMessage.value = 'Please fill in all required fields'
        return
    }

    if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match'
        return
    }

    isSubmitting.value = true
    errorMessage.value = ''

    try {
        const success = await authStore.register(name.value, email.value, password.value)

        if (success) {
            router.push('/dashboard')
        } else {
            errorMessage.value = authStore.error || 'Registration failed'
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        errorMessage.value = error.message || 'An unexpected error occurred'
        console.error(error)
    } finally {
        isSubmitting.value = false
    }
}

function navigateToLogin() {
    router.push('/login')
}

function togglePasswordVisibility() {
    showPassword.value = !showPassword.value
}

function toggleConfirmPasswordVisibility() {
    showConfirmPassword.value = !showConfirmPassword.value
}
</script>

<template>
    <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <div class="flex w-full items-center justify-center px-4 sm:px-6 lg:w-1/2 lg:px-8">
            <div class="w-full max-w-md space-y-8">
                <div class="text-center">
                    <h2 class=" text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Create a new account
                    </h2>
                    <p class=" text-center text-sm text-gray-600 dark:text-gray-400">
                        Or
                        <button @click="navigateToLogin"
                            class="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 cursor-pointer">
                            sign in to your existing account
                        </button>
                    </p>
                </div>

                <form class="space-y-2 " @submit.prevent="handleSubmit">
                    <div class="space-y-2">
                        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Full Name
                        </label>
                        <div class="relative">
                            <input id="name" v-model="name" name="name" type="text" required
                                class="block w-full rounded-md border border-gray-300 bg-white px-4 py-1 pl-4 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                placeholder="John Doe" />
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label for="email-address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email address
                        </label>
                        <div class="relative">
                            <input id="email-address" v-model="email" name="email" type="email" autocomplete="email"
                                required
                                class="block w-full rounded-md border border-gray-300 bg-white px-4 py-1 pl-4 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                placeholder="john@example.com" />
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <div class="relative">
                            <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
                                name="password" autocomplete="new-password" required
                                class="block w-full rounded-md border border-gray-300 bg-white px-4 py-1 pl-4 pr-10 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                placeholder="••••••••" />
                            <button type="button" @click="togglePasswordVisibility"
                                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
                                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                        clip-rule="evenodd" />
                                    <path
                                        d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fill-rule="evenodd"
                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Password must be at least 8 characters long
                        </p>
                    </div>
                    <div class="space-y-2">
                        <label for="confirm-password"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirm Password
                        </label>
                        <div class="relative">
                            <input id="confirm-password" v-model="confirmPassword"
                                :type="showConfirmPassword ? 'text' : 'password'" name="confirm-password"
                                autocomplete="new-password" required
                                class="block w-full rounded-md border border-gray-300 bg-white px-4 py-1 pl-4 pr-10 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-700"
                                placeholder="••••••••" />
                            <button type="button" @click="toggleConfirmPasswordVisibility"
                                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
                                <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                        clip-rule="evenodd" />
                                    <path
                                        d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fill-rule="evenodd"
                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input id="terms" name="terms" type="checkbox" required
                            class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700" />
                        <label for="terms" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            I agree to the <a href="#"
                                class="text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">Terms of
                                Service</a> and <a href="#"
                                class="text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">Privacy Policy</a>
                        </label>
                    </div>

                    <div>
                        <button type="submit" :disabled="isSubmitting"
                            class="group relative flex w-full justify-center rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-emerald-400 dark:focus:ring-offset-gray-900">
                            <span v-if="isSubmitting" class="flex items-center">
                                Creating account...
                            </span>
                            <span v-else>Create account</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
. {
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>