/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types/index'
import { apiService } from '../services/apiService'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)
    const error = ref<string | null>(null)

    const isAuthenticated = computed(() => !!token.value)

    async function login(email: string, password: string) {
        error.value = null

        try {
            const response = await apiService.post('/login', { email, password })
            user.value = response.user
            token.value = response.token
            localStorage.setItem('token', response.token)
            return true
        } catch (err: any) {
            error.value = err.message || 'Failed to login'
            return false
        }
    }

    async function register(name: string, email: string, password: string) {
        error.value = null

        try {
            const response = await apiService.post('/register', { name, email, password })
            user.value = response.user
            token.value = response.token
            localStorage.setItem('token', response.token)
            return true
        } catch (err: any) {
            error.value = err.message || 'Failed to register'
            return false
        }
    }

    function logout() {
        user.value = null
        token.value = null
        localStorage.removeItem('token')
    }

    function checkAuth() {
        const savedToken = localStorage.getItem('token')
        if (savedToken) {
            token.value = savedToken
            fetchUserProfile()
        }
    }

    async function fetchUserProfile() {
        if (!token.value) return

        error.value = null

        try {
            const response = await apiService.get('/user/profile')
            user.value = {
                id: response.id,
                name: response.name,
                email: response.email,
                hourlyRate: response.hourlyRate,
                currency: response.currency,
                preferences: response.preferences,
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch user profile'
            logout()
        }
    }
    // Partial makes all properties of a template optional
    async function updateUserProfile(updatedUser: Partial<User>) {
        error.value = null

        try {
            const response = await apiService.put('/user/profile', updatedUser)
            user.value = { ...user.value, ...response }
        } catch (err: any) {
            error.value = err.message || 'Failed to update profile'
            throw err
        }
    }

    return {
        user,
        token,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        checkAuth,
        fetchUserProfile,
        updateUserProfile,
    }
})