import { useEffect, useState } from 'react'
import { getProducts, createProduct, deleteProduct } from '../api/api'

function ProductsPage() {
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const loadProducts = async () => {
        try {
            setLoading(true)
            const data = await getProducts()
            setProducts(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadProducts()
    }, [])

    const handleCreate = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!name || !price) {
            setError('Please fill in all fields')
            return
        }

        try {
            const newProduct = await createProduct({
                name,
                price: Number(price),
            })

            setProducts((prev) => [...prev, newProduct])
            setName('')
            setPrice('')
            setSuccess('Product created successfully')
        } catch (err) {
            setError(err.message)
        }
    }

    const handleDelete = async (id) => {
        setError('')
        setSuccess('')

        try {
            await deleteProduct(id)
            setProducts((prev) => prev.filter((product) => product.id !== id))
            setSuccess('Product deleted successfully')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            <h1 className="page-title">Products</h1>

            <div className="card">
                <h3>Add new product</h3>
                <form onSubmit={handleCreate}>
                    <input
                        className="input"
                        placeholder="Product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        className="input"
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <button className="button" type="submit">
                        Create Product
                    </button>
                </form>

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </div>

            {loading ? (
                <div className="card">Loading products...</div>
            ) : products.length === 0 ? (
                <div className="card empty">No products found</div>
            ) : (
                <div className="grid">
                    {products.map((product) => (
                        <div className="card" key={product.id}>
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p className="small-text">ID: {product.id}</p>

                            <div className="button-row">
                                <button
                                    className="button button-danger"
                                    onClick={() => handleDelete(product.id)}
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

export default ProductsPage