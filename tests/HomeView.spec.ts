import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'

describe('HomeView.vue', () => {
    it('renders the home page correctly', async () => {
        let HomeView
        try {
            HomeView = (await import('../src/views/HomeView.vue')).default
        } catch (e) {
            expect.fail('HomeView.vue component not found. Create this component first.', e)
        }
        const pinia = createPinia()
        const wrapper = mount(HomeView, {
            global: {
                plugins: [pinia],
            },
        })

        // Check if the title is rendered
        expect(wrapper.text()).toContain('Manage Your Freelance Business')

        // Check if the "Get Started" button is rendered
        const button = wrapper.find('button')
        expect(button.exists()).toBe(true)
    })
})
