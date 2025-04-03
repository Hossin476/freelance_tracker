import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'

describe('DashboardView.vue', () => {
    it('renders the dashboard correctly', async () => {
        let DashboardView
        try {
            DashboardView = (await import('../src/views/DashboardView.vue')).default
        } catch (error) {
            expect.fail('DashboardView.vue component not found. Create this component first.', error)
        }
        const pinia = createPinia();
        const wrapper = mount(DashboardView, {
            global: {
                plugins: [pinia],
            },
        })

        // Check if the title is rendered
        expect(wrapper.text()).toContain('Dashboard')

        // Check if the sections are rendered
        expect(wrapper.text()).toContain('Projects')
        expect(wrapper.text()).toContain('Time Entries')
        expect(wrapper.text()).toContain('Quick Actions')
    })
})
