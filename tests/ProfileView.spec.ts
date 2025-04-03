import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'

describe('ProfileView.vue', () => {
    it('renders the profile form correctly', async () => {
        let ProfileView
        try {
            ProfileView = (await import('../src/views/ProfileView.vue')).default
        } catch (e) {
            expect.fail('ProfileView.vue component not found. Create this component first.', e)
        }
        const pinia = createPinia();
        const wrapper = mount(ProfileView, {
            global: {
                plugins: [pinia]
            }
        })

        // Check if the form fields are rendered
        expect(wrapper.find('input#name').exists()).toBe(true)
        expect(wrapper.find('input#email').exists()).toBe(true)
        expect(wrapper.find('input#hourly-rate').exists()).toBe(true)
        expect(wrapper.find('select#currency').exists()).toBe(true)
        expect(wrapper.find('select#theme').exists()).toBe(true)
        expect(wrapper.find('input#invoice-prefix').exists()).toBe(true)

        // Check if the save button is rendered
        const button = wrapper.find('button[type="submit"]')
        expect(button.exists()).toBe(true)
        expect(button.text()).toContain('Save Changes')
    })
})
