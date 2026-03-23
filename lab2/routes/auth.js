const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' })
    }

    if (email === 'admin@gmail.com' && password === '123456') {
        return res.status(200).json({
            token: 'fake-jwt-token-123456',
            user: {
                email: 'admin@gmail.com',
                name: 'Admin'
            }
        })
    }

    return res.status(401).json({ message: 'Invalid email or password' })
})

module.exports = router