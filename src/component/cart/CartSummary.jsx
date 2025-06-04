import { Link } from 'react-router-dom'
import formatPrice from '../../FormattedPriceID'

const CartSummary = ({ cartTotal, tax }) => {
  const subTotal = Number(cartTotal)
  const cartTax = Number(tax)
  const total = subTotal + cartTax

  const subTotalPrice = formatPrice(subTotal)
  const cartTaxPrice = formatPrice(cartTax)
  const totalPrice = formatPrice(total)

  return (
    <div className="col-md-4 align-self-start">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-semibold">Cart Summary</h5>
          <hr />
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>{subTotalPrice}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Tax:</span>
            <span>{cartTaxPrice}</span>
          </div>
          <div className="d-flex justify-content-between fw-bold text-dark border-top pt-3 mb-3">
            <span>Total:</span>
            <span>{totalPrice}</span>
          </div>
          <Link to="/checkout">
            <button
              className="btn btn-primary w-100"
              style={{
                backgroundColor: '#6050DC',
                borderColor: '#6050DC',
              }}
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartSummary
