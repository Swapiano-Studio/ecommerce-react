import React from 'react'
import { Link } from 'react-router-dom'
import { MEDIA_URL } from '../../api'
import formatPrice from '../../FormattedPriceID'

const OrderItem = ({ item }) => {
  const { product, quantity, total } = item
  const price = formatPrice(product.price)
  const totalPrice = formatPrice(total)

  return (
    <div
      className="d-flex align-items-center mb-3 p-3 shadow-sm"
      style={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        border: '1px solid #e0e0e0',
      }}
    >
      <img
        src={`${MEDIA_URL}${product.image}`}
        alt={product.name}
        className="img-thumbnail"
        style={{
          width: '80px',
          height: '80px',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />
      <div className="ms-3 flex-grow-1">
        <h6 className="fw-bold mb-1">{product.name}</h6>
        <p className="mb-0 text-muted">{price} x {quantity}</p>
        <Link
          to={`/products/${product.slug}`}
          className="small text-decoration-none text-primary"
        >
          Lihat Produk
        </Link>
      </div>
      <div className="fw-semibold text-end">
        {totalPrice}
      </div>
    </div>
  )
}

export default OrderItem
