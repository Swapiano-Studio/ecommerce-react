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
      console.warn("Cart code not found in localStorage");
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
        setError("Gagal memuat keranjang.");
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
