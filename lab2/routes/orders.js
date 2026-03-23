const express = require('express')
const router = express.Router()
const db = require('../data/db')

let id = 1

router.get('/', (req, res) => {
    res.json(db.orders)
})

router.post('/', (req, res) => {

    const order = {
        id: id++,
        userId: req.body.userId,
        productId: req.body.productId
    }

    db.orders.push(order)

    res.status(201).json(order)
})

router.delete('/:id', (req, res) => {

    const index = db.orders.findIndex(o => o.id == req.params.id)

    if(index === -1) return res.status(404).json({message:"Order not found"})

    db.orders.splice(index,1)

    res.status(204).send()
})

module.exports = router