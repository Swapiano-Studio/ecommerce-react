import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Minus, Plus } from "lucide-react";

import api, { MEDIA_URL } from "../../api";
import formatPrice from "../../FormattedPriceID";

import ProductPagePlaceHolder from "./ProductPagePlaceHolder";
import RelatedProducts from "./RelatedProducts";
import { toast } from "react-toastify";

const ProductPage = ({ setNumberCartItems }) => {
  const { slug } = useParams();
  const productRef = useRef(null);

  const [product, setProduct] = useState({});
  const [similiarProducts, setSimiliarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const cart_code = localStorage.getItem("cart_code");

  let imagePath = product.image || "";
    imagePath = imagePath.replace(/^img[\\/]/i, "").replace(/^\/img[\\/]/i, "").replace(/^img\\/i, "").replace(/^\/img\\/i, "");
    const imageSrc = imagePath.startsWith("http")
      ? imagePath
      : `${MEDIA_URL}img/${imagePath}`;

  /** Quantity handler */
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value < 1 ? 1 : value);
  };

  /** Fetch product detail on slug change */
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`product_detail/${slug}`);
        setProduct(data);
        setSimiliarProducts(data.similiar_products || []);
      } catch (err) {
        console.error("Error fetching product:", err.message);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchProductDetails();
  }, [slug]);

  /** Check if product is already in cart */
  useEffect(() => {
    if (product.id && cart_code) {
      api
        .get(`product_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
        .then((res) => setInCart(res.data.product_in_cart))
        .catch((err) => console.error("Error checking cart:", err.message));
    }
  }, [product.id, cart_code]);

  /** Add product to cart */
  const addItem = async () => {
    if (!cart_code || !product.id)
      return console.error("Missing cart_code or product_id");

    const newItem = {
      cart_code,
      product_id: product.id,
      quantity,
    };

    try {
      await api.post("add_item/", newItem);
      setInCart(true);
      toast.success("Product added to cart");
      const cartStatRes = await api.get(`get_cart_stat?cart_code=${cart_code}`);
      setNumberCartItems(cartStatRes.data.num_of_items);
    } catch (err) {
      console.error("Error adding item:", err.message);
    }
  };

  if (loading) return <ProductPagePlaceHolder />;

  return (
    <div style={{ backgroundColor: "#85A947" }} ref={productRef}>
      <section className="py-3">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            {/* Product Image */}
            <div className="col-md-6">
              <img
                src={imageSrc}
                alt={product.name}
                className="card-img-top mb-5 mb-md-0"
              />
            </div>

            {/* Product Details */}
            <div className="col-md-6">
              <div className="small mb-1 text-muted">{slug}</div>
              <h1 className="display-5 fw-bolder">{product.name}</h1>
              <div className="fs-5 mb-5">
                <span>{formatPrice(product.price)}</span>
              </div>
              <p className="lead">{product.description}</p>

              {/* Quantity and Add to Cart */}
              <div className="d-flex">
                {/* Quantity Selector */}
                <div
                  className="d-flex align-items-center border rounded me-3"
                  style={{ height: "38px" }}
                >
                  <button
                    className="btn btn-link text-dark px-2"
                    onClick={handleDecrement}
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    className="form-control text-center border-0"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    style={{
                      width: "50px",
                      padding: "0",
                      backgroundColor: "transparent",
                      appearance: "textfield",
                    }}
                  />
                  <button
                    className="btn btn-link text-dark px-2"
                    onClick={handleIncrement}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  className="btn btn-outline-dark flex-shrink-0"
                  type="button"
                  onClick={addItem}
                  disabled={inCart}
                >
                  <i className="bi-cart-fill me-1"></i>
                  {inCart ? "Product in cart" : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts products={similiarProducts} />
    </div>
  );
};

export default ProductPage;
