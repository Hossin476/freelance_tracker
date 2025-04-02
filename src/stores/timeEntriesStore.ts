import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TimeEntry } from '@/types'
import { apiService } from '../services/apiService'

export const useTimeEntriesStore = defineStore('timeEntries', () => {
    const timeEntries = ref<TimeEntry[]>([])

    const fetchTimeEntries = async () => {
        try {
            const fetchedEntries = await apiService.get('/timeEntries')
            timeEntries.value = fetchedEntries
        } catch (error) {
            console.error('Error fetching time entries:', error)
        }
    }

    const createTimeEntry = async (newEntry: Partial<TimeEntry>) => {
        try {
            const startTime = new Date(newEntry.startTime || '');
            const endTime = new Date(newEntry.endTime || '');

            if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
                throw new Error('Invalid start or end time');
            }

            const duration = (endTime.getTime() - startTime.getTime()) / 3600000;

            const createdEntry = await apiService.post('/timeEntries', {
                ...newEntry,
                duration,
            });
            timeEntries.value.push(createdEntry);
        } catch (error) {
            console.error('Error creating time entry:', error);
            throw error
        }
    }

    const updateTimeEntry = async (entryId: number, updatedFields: Partial<TimeEntry>) => {
        try {
            const updatedEntry = await apiService.put(`/timeEntries/${entryId}`, updatedFields)
            const index = timeEntries.value.findIndex(entry => entry.id === entryId)
            if (index !== -1) {
                timeEntries.value[index] = { ...timeEntries.value[index], ...updatedEntry }
            }
        } catch (error) {
            console.error('Error updating time entry:', error)
            throw error
        }
    }

    const deleteTimeEntry = async (entryId: number) => {
        try {
            await apiService.delete(`/timeEntries/${entryId}`)
            timeEntries.value = timeEntries.value.filter(entry => entry.id !== entryId)
        } catch (error) {
            console.error('Error deleting time entry:', error)
            throw error
        }
    }

    return {
        timeEntries,
        fetchTimeEntries,
        createTimeEntry,
        updateTimeEntry,
        deleteTimeEntry,
    }
})
