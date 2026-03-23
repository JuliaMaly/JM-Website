import { useState } from 'react'
import { loginUser } from '../api/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const data = await loginUser(email, password)
            login(data.token, data.user)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="center-box">
            <div className="card">
                <h1 className="page-title">Login</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="button" type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>

                {error && <p className="error">{error}</p>}

                <p className="small-text" style={{ marginTop: '14px' }}>
                    Test login: <strong>admin@gmail.com</strong> / <strong>123456</strong>
                </p>
            </div>
        </div>
    )
}

export default LoginPage