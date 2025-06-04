import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./component/home/HomePage";
import NotFoundPage from "./component/ui/NotFoundPage";
import ProductPage from "./component/product/ProductPage";
import { useEffect, useState } from "react";
import api from "./api";
import { CartPage } from "./component/cart/CartPage";
import CheckoutPage from "./component/checkout/CheckoutPage";
import LoginPage from "./component/user/LoginPage";
import ProtectedRoute from "./component/ui/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import UserProfilePage from "./component/user/UserProfilePage";
import RegisterPage from "./component/user/RegisterPage";

const App = () => {
  const [numCartItems, setNumberCartItems] = useState(0);
  const cart_code = localStorage.getItem("cart_code");

  useEffect(function () {
    if (cart_code) {
      api
        .get(`get_cart_stat?cart_code=${cart_code}`)
        .then((response) => {
          setNumberCartItems(response.data.num_of_items);
        })

        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout numCartItems={numCartItems} />}>
            <Route index element={<HomePage />} />
            <Route
              path="products/:slug"
              element={<ProductPage setNumberCartItems={setNumberCartItems} />}
            />
            <Route
              path="cart"
              element={<CartPage setNumberCartItems={setNumberCartItems} />}
            />
            <Route
              path="checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
          </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
