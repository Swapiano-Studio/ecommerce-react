import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import api, { MEDIA_URL } from '../../api'
import formatPrice from '../../FormattedPriceID'

const CartItem = ({ item, setCartTotal, cartitems, setNumberCartitems, setCartItems }) => {
  const [quantity, setQuantity] = useState(item.quantity)
  const [loading, setLoading] = useState(false)
  const price = formatPrice(item.product.price)

  let imagePath = item.product.image || "";
    imagePath = imagePath.replace(/^img[\\/]/i, "").replace(/^\/img[\\/]/i, "").replace(/^img\\/i, "").replace(/^\/img\\/i, "");
    const imageSrc = imagePath.startsWith("http")
      ? imagePath
      : `${MEDIA_URL}/img/${imagePath}`;

  const handleUpdate = () => {
    const itemData = { quantity: Number(quantity), item_id: item.id }
    setLoading(true)

    api
      .patch('update_quantity/', itemData)
      .then((res) => {
        setLoading(false)
        toast.success("CartItem updated succesfully") 
        const updatedItem = res.data.data

        const updatedCart = cartitems.map((cartitem) =>
          cartitem.id === item.id ? updatedItem : cartitem
        )

        const total = updatedCart.reduce((acc, curr) => acc + curr.total, 0)
        const totalQty = updatedCart.reduce((acc, curr) => acc + curr.quantity, 0)

        setCartTotal(total)
        setNumberCartitems(totalQty)
      })
      .catch((err) => {
        setLoading(false)
        console.error('Error updating item quantity:', err.message)
      })
  }

  const handleDelete = () => {
    const cartCode = localStorage.getItem('cart_code')
    if (!cartCode) return

    api
    .delete(`delete_items/?cart_code=${cartCode}&product_id=${item.product.id}`)
    .then(() => {
      const updatedCart = cartitems.filter(cartitem => cartitem.id !== item.id)
      const newTotal = updatedCart.reduce((acc, curr) => acc + curr.total, 0)
      const newQty = updatedCart.reduce((acc, curr) => acc + curr.quantity, 0)
      toast.success("CartItem deleted successfully")
      setCartItems(updatedCart)
      setCartTotal(newTotal)
      setNumberCartitems(newQty)
    })
    .catch((err) => {
      console.error('Error deleting item:', err.message)
    })
  }

  return (
    <div
      className="cart-item d-flex align-items-center mb-4 p-3 shadow-sm"
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        border: '1px solid #e0e0e0',
      }}
    >
      <img
        src={imageSrc}
        alt={item.product.name}
        className="img-thumbnail"
        style={{
          width: '90px',
          height: '90px',
          objectFit: 'cover',
          borderRadius: '10px',
        }}
      />
      <div className="ms-3 flex-grow-1">
        <h6 className="fw-semibold mb-1">{item.product.name}</h6>
        <p className="mb-1 text-muted">{price}</p>
        <Link
          to={`/products/${item.product.slug}`}
          className="text-decoration-none text-primary small"
        >
          Lihat Detail Produk
        </Link>
      </div>
      <div
        className="d-flex align-items-center gap-1 mt-2 mt-md-0 w-100 flex-row flex-wrap flex-sm-nowrap justify-content-end"
        style={{ minWidth: 110, maxWidth: 180 }}
      >
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="form-control form-control-sm text-center flex-shrink-0"
          style={{ width: '44px', minWidth: 0, fontSize: '0.95rem', padding: '2px 6px' }}
        />
        <button
          className="btn btn-sm py-1 px-2 w-auto d-flex justify-content-center align-items-center"
          onClick={handleUpdate}
          disabled={loading}
          style={{ backgroundColor: '#4b3bcb', color: 'white', minWidth: 38, fontSize: '0.97rem', padding: '2px 10px', textAlign: 'center' }}
        >
          {loading ? 'Updating' : 'Update'}
        </button>
        <button
          className="btn btn-outline-danger btn-sm py-1 px-2 w-auto d-flex justify-content-center align-items-center"
          onClick={handleDelete}
          style={{ minWidth: 38, fontSize: '0.97rem', padding: '2px 10px', textAlign: 'center' }}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default CartItem
