import { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import PaymentSection from "./PaymentSection";
import Spinner from "../ui/Spinner";
import useCartData from "../hooks/useCartData";

const CheckoutPage = () => {
  const [showSpinner, setShowSpinner] = useState(true);

  const {
    cartItems,
    cartTotal,
    isLoading,
    error,
    tax,
  } = useCartData();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowSpinner(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (showSpinner) {
    return <Spinner loading={true} />;
  }

  return (
    <div className="container my-3 py-3">
      <h5 className="mb-4">Checkout</h5>
      <div className="row">
        <div className="col-lg-8">
          <OrderSummary
            cartItems={cartItems}
            cartTotal={cartTotal}
            error={error}
            tax={tax}
          />
        </div>

        <div className="col-lg-4">
          <PaymentSection />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
