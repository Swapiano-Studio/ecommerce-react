import React, { useEffect } from "react";
import placeholderStyles from "../../assets/css/PlaceHolder.module.css";
import { Minus, Plus } from "lucide-react";

const ProductPagePlaceHolder = () => {
  // Reset scroll position when placeholder mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: "#85A947" }}>
      <section className="py-3">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <div className={`${placeholderStyles.imgProductSkeleton}`}>
                <div className={placeholderStyles.shimmer}></div>
              </div>
            </div>
            <div className="col-md-6">
              <div className={placeholderStyles.textSkeleton}>
                <div className={placeholderStyles.slugProductSkeleton}>
                  <div className={placeholderStyles.shimmer}></div>
                </div>
                <div className={placeholderStyles.titleProductSkeleton}>
                  <div className={placeholderStyles.shimmer}></div>
                </div>
                <div className={placeholderStyles.priceProductSkeleton}>
                  <div className={placeholderStyles.shimmer}></div>
                </div>
                <div className={placeholderStyles.descriptionProductSkeleton}>
                  <div className={placeholderStyles.shimmer}></div>
                </div>
                <div className={placeholderStyles.descriptionProductSkeleton}>
                  <div className={placeholderStyles.shimmer}></div>
                </div>
                <div className={placeholderStyles.descriptionProductSkeleton}>
                  <div className={placeholderStyles.shimmer}></div>
                </div>
                <div className={placeholderStyles.descriptionProductSkeleton}>
                  <div className={placeholderStyles.shimmer}></div>
                </div>
                <div className="d-flex">
                  <div className="d-flex align-items-center border rounded me-3" style={{ height: '38px' }}>
                    <button
                      className="btn btn-link text-dark px-2"
                      disabled
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      className="form-control text-center border-0"
                      value="1"
                      disabled
                      style={{ width: '50px', padding: '0', appearance: 'textfield' }}
                    />
                    <button
                      className="btn btn-link text-dark px-2"
                      disabled
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    className="btn btn-outline-dark flex-shrink-0"
                    type="button"
                    disabled
                  >
                    <i className="bi-cart-fill me-1"></i>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPagePlaceHolder;