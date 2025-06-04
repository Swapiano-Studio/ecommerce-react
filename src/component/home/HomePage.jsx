import Header from './Header';
import CardContainer from './CardContainer';
import api from '../../api';
import { useEffect, useState } from 'react';
import Error from '../ui/Error';
import PlaceHolderContainer from './PlaceHolderContainer';
import { randomValue } from '../../GenerateCartCode';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(""); // Using empty string
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const setCartCode = async () => {
      if (localStorage.getItem("cart_code") === null)  {
        localStorage.setItem("cart_code", randomValue);
      }
    };
  
    setCartCode();
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Set loading true before fetch
        const response = await api.get("products");
        setProducts(response.data);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading false after completion
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      {error && <Error message={error} />} {/* Fix prop name */}
      {loading ? (
        <PlaceHolderContainer loading={loading} />
      ) : (
        <CardContainer products={products} />
      )}
    </>
  );
}

export default HomePage;
