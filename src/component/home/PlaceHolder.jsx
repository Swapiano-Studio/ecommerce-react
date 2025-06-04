import React from "react";
import placeholderStyles from "../../assets/css/PlaceHolder.module.css";
import { Link } from "react-router-dom";

const PlaceHolder = () => {
  return (
    <div className={placeholderStyles.col}>
      <Link to="/" className={placeholderStyles.link}>
        <div className={placeholderStyles.card}>
          <div className={placeholderStyles.cardSkeleton}>
            <div className={`${placeholderStyles.cardImgWrapperSkeleton}`}>
              <div className={placeholderStyles.shimmer} />
            </div>
            <div className={placeholderStyles.textSkeleton}>
              <div className={placeholderStyles.titleSkeleton}>
                <div className={placeholderStyles.shimmer} />
              </div>
              <div className={placeholderStyles.priceSkeleton}>
                <div className={placeholderStyles.shimmer} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaceHolder;
