import { useEffect, useState } from 'react'
import { getOrders, deleteOrder } from '../api/api'

function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const loadOrders = async () => {
        try {
            setLoading(true)
            const data = await getOrders()
            setOrders(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadOrders()
    }, [])

    const handleDelete = async (id) => {
        setError('')
        setSuccess('')

        try {
            await deleteOrder(id)
            setOrders((prev) => prev.filter((order) => order.id !== id))
            setSuccess('Order deleted successfully')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            <h1 className="page-title">Orders</h1>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            {loading ? (
                <div className="card">Loading orders...</div>
            ) : orders.length === 0 ? (
                <div className="card empty">No orders found</div>
            ) : (
                <div className="grid">
                    {orders.map((order) => (
                        <div className="card" key={order.id}>
                            <h3>Order #{order.id}</h3>
                            <p>User ID: {order.userId}</p>
                            <p>Product ID: {order.productId}</p>

                            <div className="button-row">
                                <button
                                    className="button button-danger"
                                    onClick={() => handleDelete(order.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default OrdersPage