import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const { token, user, logout } = useAuth()
    const navigate = useNavigate()

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link className="nav-link" to="/">
                    Login
                </Link>

                {token && (
                    <>
                        <Link className="nav-link" to="/dashboard">
                            Dashboard
                        </Link>
                        <Link className="nav-link" to="/products">
                            Products
                        </Link>
                        <Link className="nav-link" to="/orders">
                            Orders
                        </Link>
                    </>
                )}
            </div>

            <div className="nav-right">
                {user && <span className="badge">{user.name}</span>}
                {token && (
                    <button
                        className="button button-secondary"
                        style={{ width: 'auto' }}
                        onClick={() => {
                            logout()
                            navigate('/')
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar