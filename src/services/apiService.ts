/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = 'https://freelancetracker-production.up.railway.app'

class ApiService {
    async get(endpoint: string) {
        return this.request(endpoint, 'GET')
    }

    async post(endpoint: string, data?: any) {
        return this.request(endpoint, 'POST', data)
    }

    async put(endpoint: string, data?: any) {
        return this.request(endpoint, 'PUT', data)
    }

    async delete(endpoint: string) {
        return this.request(endpoint, 'DELETE')
    }

    private async request(endpoint: string, method: string, data?: any) {
        const url = `${API_URL}${endpoint}`
        const token = localStorage.getItem('token')

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }

        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        const config: RequestInit = {
            method,
            headers,
            body: data ? JSON.stringify(data) : undefined,
        }

        try {
            const response = await fetch(url, config)

            const contentType = response.headers.get('content-type')
            if (!response.ok) {
                let errorMessage = `API error: ${response.status}`;

                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                }

                throw new Error(errorMessage);
            }
            if (response.status === 204 || !contentType || !contentType.includes('application/json')) {
                return {};
            }

            return await response.json();
        } catch (error: any) {
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                throw new Error('Network error: Unable to connect to the server');
            }
            throw error;
        }
    }
}

export const apiService = new ApiService()