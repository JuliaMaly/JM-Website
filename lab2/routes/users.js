const express = require('express')
const router = express.Router()
const db = require('../data/db')

let id = 1

router.get('/', (req, res) => {
    res.status(200).json(db.users)
})

router.get('/:id', (req, res) => {
    const user = db.users.find(u => u.id == req.params.id)

    if (!user) return res.status(404).json({message: "User not found"})

    res.json(user)
})

router.get('/:id/orders', (req, res) => {

    const userOrders = db.orders.filter(
        order => order.userId == req.params.id
    )

    res.json(userOrders)
})

router.post('/', (req, res) => {
    const user = {
        id: id++,
        name: req.body.name,
        email: req.body.email
    }

    db.users.push(user)

    res.status(201).json(user)
})

router.put('/:id', (req, res) => {
    const user = db.users.find(u => u.id == req.params.id)

    if (!user) return res.status(404).json({message: "User not found"})

    user.name = req.body.name
    user.email = req.body.email

    res.json(user)
})

router.delete('/:id', (req, res) => {
    const index = db.users.findIndex(u => u.id == req.params.id)

    if (index === -1) return res.status(404).json({message: "User not found"})

    db.users.splice(index, 1)

    res.status(204).send()
})

module.exports = router