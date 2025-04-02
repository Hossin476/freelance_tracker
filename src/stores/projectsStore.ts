import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Project } from '@/types'
import { apiService } from '../services/apiService'

export const useProjectsStore = defineStore('projects', () => {
    const projects = ref<Project[]>([])

    const fetchProjects = async () => {
        try {
            projects.value = await apiService.get('/projects')
        } catch (error) {
            console.error('Error fetching projects:', error)
        }
    }

    const createProject = async (newProject: Partial<Project>) => {
        try {
            const createdProject = await apiService.post('/projects', {
                ...newProject,
                status: newProject.status || 'In Progress', // Default to 'In Progress'
            });
            projects.value.push(createdProject);
        } catch (error) {
            console.error('Error creating project:', error)
            throw error
        }
    }

    const updateProject = async (projectId: number, updatedFields: Partial<Project>) => {
        try {
            const updatedProject = await apiService.put(`/projects/${projectId}`, updatedFields)
            const index = projects.value.findIndex(project => project.id === projectId)
            if (index !== -1) {
                projects.value[index] = { ...projects.value[index], ...updatedProject }
            }
        } catch (error) {
            console.error('Error updating project:', error)
            throw error
        }
    }

    return {
        projects,
        fetchProjects,
        createProject,
        updateProject,
    }
})
