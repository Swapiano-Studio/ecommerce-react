import { useEffect, useState } from "react";
import api from "../../api";

const useCartData = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const tax = 10000;

  useEffect(() => {
    const cartCode = localStorage.getItem("cart_code");

    if (!cartCode) {
      setCartItems([]);
      setCartTotal(0);
      setIsLoading(false);
      return;
    }

    api
      .get(`get_cart?cart_code=${cartCode}`)
      .then(({ data }) => {
        setCartItems(data.items);
        setCartTotal(data.sum_total);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err.message);
        setError("Failed to fetch cart data. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    cartItems,
    setCartItems,
    cartTotal,
    setCartTotal,
    isLoading,
    error,
    tax,
  };
};

export default useCartData;
