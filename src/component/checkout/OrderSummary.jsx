import React from "react";
import OrderItem from "./OrderItem";
import formatPrice from "../../FormattedPriceID";

const OrderSummary = ({ cartItems, cartTotal, error, tax }) => {
  const subTotal = Number(cartTotal);
  const cartTax = Number(tax);
  const total = subTotal + cartTax;

  const subTotalPrice = formatPrice(subTotal);
  const orderTaxPrice = formatPrice(cartTax);
  const totalPrice = formatPrice(total);

  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h4 className="bg-dark text-white p-3 rounded mb-4">Order Sumarry</h4>
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : cartItems.length === 0 ? (
          <div className="alert alert-info" role="alert">
            Cart item no yet.
          </div>
        ) : (
          cartItems.map((item) => <OrderItem key={item.id} item={item} />)
        )}
        <hr />
      <div className="d-flex justify-content-between">
        <span className="text-muted">Subtotal</span>
        <span className="fw-medium">{subTotalPrice}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span className="text-muted">Tax</span>
        <span className="fw-medium">{orderTaxPrice}</span>
      </div>
      <div className="d-flex justify-content-between fw-bold mt-2">
        <span>Total</span>
        <span>{totalPrice}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
