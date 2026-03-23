import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function DashboardPage() {
    const { user } = useAuth()

    return (
        <div>
            <h1 className="page-title">Dashboard</h1>

            <div className="card">
                <h2>Welcome{user ? `, ${user.name}` : ''}!</h2>
                <p className="small-text">
                    This is the main page of the application. From here you can
                    navigate to products, orders, and manage your session.
                </p>
            </div>

            <div className="grid">
                <div className="card">
                    <h3>Products</h3>
                    <p className="small-text">
                        View the list of products, create new products, and delete existing ones.
                    </p>
                    <Link className="button" to="/products">
                        Go to Products
                    </Link>
                </div>

                <div className="card">
                    <h3>Orders</h3>
                    <p className="small-text">
                        View all orders and delete orders when needed.
                    </p>
                    <Link className="button" to="/orders">
                        Go to Orders
                    </Link>
                </div>

                <div className="card">
                    <h3>User Session</h3>
                    <p className="small-text">
                        Authentication state is stored in Context API and localStorage.
                    </p>
                    <span className="badge">Authorized User</span>
                </div>
            </div>

            <div className="card" style={{ marginTop: '20px' }}>
                <h3>Implemented Features</h3>
                <ul style={{ lineHeight: '1.8' }}>
                    <li>Authentication with login and token storage</li>
                    <li>Protected routes</li>
                    <li>Shared state using Context API</li>
                    <li>Integration with backend API</li>
                    <li>Products and Orders pages</li>
                    <li>Error handling and loading states</li>
                </ul>
            </div>
        </div>
    )
}

export default DashboardPage