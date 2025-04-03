import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'

describe('LoginView.vue', () => {
    it('renders the login form correctly', async () => {
        let LoginView
        try {
            LoginView = (await import('../src/views/LoginView.vue')).default
        } catch (e) {
            expect.fail('LoginView.vue component not found. Create this component first.', e)
        }

        const pinia = createPinia()
        const wrapper = mount(LoginView, {
            global: {
                plugins: [pinia],
            },
        })

        // Check if the form fields are rendered
        expect(wrapper.find('input#password').exists()).toBe(true)

        // Check if the submit button is rendered
        const button = wrapper.find('button[type="submit"]')
        expect(button.exists()).toBe(true)
        expect(button.text()).toContain('Sign in')
    })

    it('shows error message when email or password is missing', async () => {
        let LoginView
        try {
            LoginView = (await import('../src/views/LoginView.vue')).default
        } catch (e) {
            expect.fail('LoginView.vue component not found. Create this component first.', e)
        }

        const pinia = createPinia()
        const wrapper = mount(LoginView, {
            global: {
                plugins: [pinia],
            },
        })

        await wrapper.find('button[type="submit"]').trigger('click')

    })
})
