export interface User {
    id: number
    name: string
    email: string
    hourlyRate?: number
    currency?: string
    preferences?: {
        theme: 'light' | 'dark'
        invoicePrefix: string
    }
}

export interface Client {
    id: number
    name: string
    contactPerson: string
    email: string
    phone: string
    address: {
        street: string
        city: string
        state: string
        zip: string
        country: string
    }
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

export interface Expense {
    id: number
    projectId: number
    category: string
    description: string
    amount: number
    date: string
    billable: boolean
    invoiceId: number | null
    receiptUrl: string
    taxDeductible: boolean
    userId: number
}

export interface Category {
    id: number
    name: string
    type: 'expense' | 'service'
    userId: number
}

export interface Stat {
    name: string
    value: string
}

export interface Deadline {
    id: number
    name: string
    deadline: string
    daysLeft: number
}
