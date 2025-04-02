<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useProjectsStore } from '../stores/projectsStore'
import { useClientsStore } from '@/stores/clientsStore'
import { storeToRefs } from 'pinia'
import ProjectsSection from '../components/ProjectsSection.vue'
import QuickActionsSection from '../components/QuickActionsSection.vue'
import ProjectModal from '../components/modals/ProjectModal.vue'
import TimeTrackingModal from '../components/modals/TimeTrackingModal.vue'
import InvoiceModal from '../components/modals/InvoiceModal.vue'
import ClientModal from '../components/modals/ClientModal.vue'
import TimeEntriesSection from '../components/TimeEntriesSection.vue'
import { useTimeEntriesStore } from '@/stores/timeEntriesStore'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const clientsStore = useClientsStore();

const projectsStore = useProjectsStore()
const { projects } = storeToRefs(projectsStore)


const timeEntriesStore = useTimeEntriesStore()
const { timeEntries } = timeEntriesStore

const showProjectModal = ref(false)
const showTimeTrackingModal = ref(false)
const showInvoiceModal = ref(false)
const showClientModal = ref(false)

onMounted(() => {
    projectsStore.fetchProjects()
    clientsStore.fetchClients()
    timeEntriesStore.fetchTimeEntries()
})

function handleNewProject() {
    showProjectModal.value = true
}

function handleTrackTime() {
    showTimeTrackingModal.value = true
}

function handleNewInvoice() {
    showInvoiceModal.value = true
}

function handleNewClient() {
    showClientModal.value = true
}

async function updateProject(updatedProject: { id: number; status: string }) {
    try {
        await projectsStore.updateProject(updatedProject.id, { status: updatedProject.status })
        projectsStore.fetchProjects()
    } catch (error) {
        console.error('Error updating project:', error)
    }
}
</script>

<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
        <header class="bg-white dark:bg-gray-800 shadow">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div class="flex justify-between items-center">
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <div class="flex items-center">
                        <span class="text-sm text-gray-500 dark:text-gray-300 mr-4">Welcome, {{ user?.name
                            }}</span>
                        <button @click="authStore.logout()"
                            class="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm cursor-pointer">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="mt-8">
                <ProjectsSection :projects="projects" @update-project="updateProject" />
            </div>
            <div class="mt-8">
                <TimeEntriesSection :timeEntries="timeEntries" />
            </div>
            <div class="mt-8">
                <QuickActionsSection @new-project="handleNewProject" @track-time="handleTrackTime"
                    @new-invoice="handleNewInvoice" @new-client="handleNewClient" />
            </div>
            <ProjectModal v-if="showProjectModal" @close="showProjectModal = false" />
            <TimeTrackingModal v-if="showTimeTrackingModal" @close="showTimeTrackingModal = false" />
            <InvoiceModal v-if="showInvoiceModal" @close="showInvoiceModal = false" />
            <ClientModal v-if="showClientModal" @close="showClientModal = false" />
        </main>
    </div>
</template>
