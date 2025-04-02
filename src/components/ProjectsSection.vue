<script setup lang="ts">
import { ref } from 'vue'
import { defineProps } from 'vue'
import type { Project } from '@/types'
import { useProjectsStore } from '@/stores/projectsStore'

defineProps<{
    projects: Project[];
}>()

const editingProjectId = ref<number | null>(null)
const updatedStatus = ref<'In Progress' | 'Active' | 'On Hold' | 'Completed'>('In Progress')

const projectsStore = useProjectsStore()

function startEditing(projectId: number, currentStatus: string) {
    editingProjectId.value = projectId
    updatedStatus.value = currentStatus as typeof updatedStatus.value
}

async function saveChanges(projectId: number) {
    try {
        await projectsStore.updateProject(projectId, { status: updatedStatus.value })
    } catch (error) {
        console.error('Error updating project:', error)
    } finally {
        editingProjectId.value = null
    }
}

function cancelEditing() {
    editingProjectId.value = null
}
</script>

<template>
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Projects</h3>
        </div>
        <div class="p-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="project in projects" :key="project.id"
                    class="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow hover:shadow-md transition-all duration-300">
                    <div class="p-5">
                        <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-1">{{ project.name }}
                        </h4>
                        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{{ project.description }}
                        </p>
                        <div class="space-y-3">
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-gray-500 dark:text-gray-400">Budget:</span>
                                <span class="font-medium text-gray-700 dark:text-gray-200">${{ project.budget }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-gray-500 dark:text-gray-400">Status:</span>
                                <span v-if="editingProjectId !== project.id" :class="{
                                    'px-2 py-1 rounded text-xs font-medium': true,
                                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': project.status === 'Active',
                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': project.status === 'On Hold',
                                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': project.status === 'Completed',
                                    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200': project.status === 'In Progress'
                                }">
                                    {{ project.status }}
                                </span>
                                <select v-else v-model="updatedStatus"
                                    class="block w-32 text-sm rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white">
                                    <option value="In Progress">In Progress</option>
                                    <option value="Active">Active</option>
                                    <option value="On Hold">On Hold</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="px-5 py-3 bg-gray-100 dark:bg-gray-600 flex justify-end space-x-2">
                        <button v-if="editingProjectId === project.id" @click="cancelEditing"
                            class="px-3 py-1.5 text-xs font-medium bg-gray-300 text-gray-700 rounded hover:bg-gray-400 dark:bg-gray-500 dark:text-gray-200 dark:hover:bg-gray-400 transition-colors cursor-pointer">
                            Cancel
                        </button>
                        <button v-if="editingProjectId === project.id" @click="saveChanges(project.id)"
                            class="px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors cursor-pointer">
                            Save
                        </button>
                        <button v-else @click="startEditing(project.id, project.status)"
                            class="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors cursor-pointer">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>