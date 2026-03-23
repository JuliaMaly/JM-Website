const BASE_URL = 'http://localhost:3000'

export async function loginUser(email, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Login failed')
    }

    return data
}

export async function getProducts() {
    const response = await fetch(`${BASE_URL}/products`)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Error fetching products')
    }

    return data
}

export async function createProduct(product) {
    const response = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Error creating product')
    }

    return data
}

export async function deleteProduct(id) {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        throw new Error('Error deleting product')
    }
}

export async function getOrders() {
    const response = await fetch(`${BASE_URL}/orders`)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Error fetching orders')
    }

    return data
}

export async function deleteOrder(id) {
    const response = await fetch(`${BASE_URL}/orders/${id}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        throw new Error('Error deleting order')
    }
}