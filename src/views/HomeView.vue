<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

function navigateToDashboard() {
    router.push('/dashboard')
}

function navigateToLogin() {
    router.push('/login')
}

function navigateToRegister() {
    router.push('/register')
}
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <header class="bg-white dark:bg-gray-800 shadow">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div class="flex justify-between items-center">
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Freelance Manager</h1>
                    <div class="flex space-x-4">
                        <button v-if="isAuthenticated" @click="navigateToDashboard"
                            class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md cursor-pointer">
                            Dashboard
                        </button>
                        <button v-else @click="navigateToLogin"
                            class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md cursor-pointer">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <main class="flex-grow">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="text-center">
                    <h2
                        class="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Manage Your Freelance Business
                    </h2>
                    <p class="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300">
                        Track projects, log time, generate invoices, manage clients, and track expenses all in one
                        place.
                    </p>
                    <div class="mt-8 flex justify-center">
                        <div class="inline-flex rounded-md shadow">
                            <button v-if="isAuthenticated" @click="navigateToDashboard"
                                class="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md cursor-pointer">
                                Go to Dashboard
                            </button>
                            <button v-else @click="navigateToRegister"
                                class="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md cursor-pointer">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <div class="text-emerald-600 dark:text-emerald-400 text-2xl mb-4">
                            📊 Project Management
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Track Your Projects</h3>
                        <p class="mt-2 text-gray-500 dark:text-gray-300">
                            Create and manage projects, set budgets, track progress, and keep everything organized.
                        </p>
                    </div>

                    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <div class="text-emerald-600 dark:text-emerald-400 text-2xl mb-4">
                            ⏱️ Time Tracking
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Log Your Hours</h3>
                        <p class="mt-2 text-gray-500 dark:text-gray-300">
                            Track time spent on projects with a built-in timer or manual entries to ensure accurate
                            billing.
                        </p>
                    </div>

                    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <div class="text-emerald-600 dark:text-emerald-400 text-2xl mb-4">
                            💰 Invoice Generation
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Get Paid Faster</h3>
                        <p class="mt-2 text-gray-500 dark:text-gray-300">
                            Create professional invoices from your time entries and expenses with just a few clicks.
                        </p>
                    </div>
                </div>
            </div>
        </main>

        <footer class="bg-white dark:bg-gray-800 shadow">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <p class="text-center text-gray-500 dark:text-gray-300">
                    &copy; 2025 Freelance Manager. All rights reserved.
                </p>
            </div>
        </footer>
    </div>
</template>
