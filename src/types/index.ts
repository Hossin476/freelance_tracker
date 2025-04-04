export interface User {
    id: number
    name: string
    email: string
    hourlyRate?: number
    currency?: string
    preferences?: {
        invoicePrefix: string
    }
}

export interface Client {
    id: number
    name: string
    contactPerson: string
    email: string
    phone: string
    notes: string
    active: boolean
    userId: number
}

export interface Project {
    id: number
    name: string
    description: string
    status: 'In Progress' | 'Active' | 'On Hold' | 'Completed' | string
    budget: number
    userId: number
}

export interface TimeEntry {
    id: number
    projectId: number
    description: string
    startTime: string
    endTime: string
    duration: number
    billable: boolean
    invoiceId: number | null
    userId: number
}

export interface Invoice {
    id: number
    number: string
    clientId: number
    projectId: number
    issueDate: string
    dueDate: string
    items: InvoiceItem[]
    subtotal: number
    taxRate: number
    taxAmount: number
    total: number
    notes: string
    status: 'Draft' | 'Sent' | 'Paid' | 'Overdue'
    paidDate: string | null
    paidAmount: number
    userId: number
}

export interface InvoiceItem {
    description: string
    quantity: number
    rate: number
    amount: number
}