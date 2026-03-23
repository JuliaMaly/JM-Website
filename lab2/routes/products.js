const express = require('express')
const router = express.Router()
const db = require('../data/db')

let id = 1

router.get('/', (req, res) => {

    let products = [...db.products]

    // ФІЛЬТРАЦІЯ ПО НАЗВІ
    if (req.query.name) {
        products = products.filter(p =>
            p.name.toLowerCase().includes(req.query.name.toLowerCase())
        )
    }

    // ФІЛЬТРАЦІЯ ПО МІНІМАЛЬНІЙ ЦІНІ
    if (req.query.minPrice) {
        products = products.filter(p =>
            p.price >= Number(req.query.minPrice)
        )
    }

    // ФІЛЬТРАЦІЯ ПО МАКСИМАЛЬНІЙ ЦІНІ
    if (req.query.maxPrice) {
        products = products.filter(p =>
            p.price <= Number(req.query.maxPrice)
        )
    }

    // СОРТУВАННЯ
    if (req.query.sort === 'price') {
        products.sort((a, b) => a.price - b.price)
    }

    // ПАГІНАЦІЯ
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5

    const start = (page - 1) * limit
    const end = start + limit

    res.json(products.slice(start, end))
})

router.post('/', (req, res) => {

    const product = {
        id: id++,
        name: req.body.name,
        price: req.body.price
    }

    db.products.push(product)

    res.status(201).json(product)
})

router.put('/:id', (req, res) => {

    const product = db.products.find(p => p.id == req.params.id)

    if (!product) return res.status(404).json({message:"Product not found"})

    product.name = req.body.name
    product.price = req.body.price

    res.json(product)
})

router.delete('/:id', (req, res) => {

    const index = db.products.findIndex(p => p.id == req.params.id)

    if (index === -1) return res.status(404).json({message:"Product not found"})

    db.products.splice(index,1)

    res.status(204).send()
})

module.exports = router