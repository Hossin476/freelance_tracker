import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Client } from '@/types'
import { apiService } from '../services/apiService'

export const useClientsStore = defineStore('clients', () => {
    const clients = ref<Client[]>([])

    const fetchClients = async () => {
        try {
            clients.value = await apiService.get('/clients');
        } catch (error) {
            console.error('Error fetching clients:', error)
        }
    }

    const createClient = async (newClient: Partial<Client>) => {
        try {
            const createdClient = await apiService.post('/clients', newClient)
            clients.value.push(createdClient)
        } catch (error) {
            console.error('Error creating client:', error)
            throw error
        }
    }

    return {
        clients,
        fetchClients,
        createClient,
    }
})
