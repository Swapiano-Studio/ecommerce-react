import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import Spinner from "../ui/Spinner";
import useCartData from "../hooks/useCartData";

export const CartPage = ({ setNumberCartItems }) => {
  const [showSpinner, setShowSpinner] = useState(true);
  const {
    cartItems,
    setCartItems,
    cartTotal,
    setCartTotal,
    isLoading,
    error,
    tax,
  } = useCartData();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSpinner(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (showSpinner) {
    return <Spinner loading={true} />;
  }

  return (
    <div
      className="container my-3 py-3"
      style={{ height: "80vh", overflow: "auto" }}
    >
      <h5 className="mb-4">Shopping Cart</h5>
      <div className="row">
        <div className="col-md-8">
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                cartitems={cartItems}
                setCartTotal={setCartTotal}
                setCartItems={setCartItems}
                setNumberCartitems={setNumberCartItems}
              />
            ))
          ) : (
            <div className="alert alert-primary" role="alert">
              Your cart is empty. Please add items to your cart.
            </div>
          )}
        </div>

        <CartSummary cartTotal={cartTotal} tax={tax} />
      </div>
    </div>
  );
};
