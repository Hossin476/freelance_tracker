import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'

describe('RegisterView.vue', () => {
    it('renders the registration form correctly', async () => {
        let RegisterView
        try {
            RegisterView = (await import('../src/views/RegisterView.vue')).default
        } catch (e) {
            expect.fail('RegisterView.vue component not found. Create this component first.', e)
        }
        const pinia = createPinia();
        const wrapper = mount(RegisterView, {
            global: {
                plugins: [pinia]
            }
        })

        // Check if the form fields are rendered
        expect(wrapper.find('input#name').exists()).toBe(true)
        expect(wrapper.find('input#email-address').exists()).toBe(true)
        expect(wrapper.find('input#password').exists()).toBe(true)
        expect(wrapper.find('input#confirm-password').exists()).toBe(true)

        // Check if the submit button is rendered
        const button = wrapper.find('button[type="submit"]')
        expect(button.exists()).toBe(true)
        expect(button.text()).toContain('Create account')
    })

    it('shows error message when required fields are empty', async () => {
        let RegisterView
        try {
            RegisterView = (await import('../src/views/RegisterView.vue')).default
        } catch (e) {
            expect.fail('RegisterView.vue component not found. Create this component first.', e)
        }

        const wrapper = mount(RegisterView)

        await wrapper.find('button[type="submit"]').trigger('click')
    })
})
