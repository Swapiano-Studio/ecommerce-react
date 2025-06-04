import React from "react";
import styles from "../../assets/css/HomeCard.module.css";
import { Link } from "react-router-dom";
import { MEDIA_URL } from "../../api";
import formatPrice from "../../FormattedPriceID";

const HomeCard = ({ product }) => {
  const price = formatPrice(product.price)

  // Clean up image path: remove any leading 'img/', '/img/', or 'img\\'
  let imagePath = product.image || "";
  imagePath = imagePath.replace(/^img[\\/]/i, "").replace(/^\/img[\\/]/i, "").replace(/^img\\/i, "").replace(/^\/img\\/i, "");
  const imageSrc = imagePath.startsWith("http")
    ? imagePath
    : `${MEDIA_URL}img/${imagePath}`;

  return (
    <div className={`${styles.col}`}>
      <Link to={`/products/${product.slug}`} className={styles.link}>
        <div className={styles.card}>
          <div className={styles.cardImgWrapper}>
            <img
              src={imageSrc}
              alt={product.name}
              className={styles.cardImgTop}
            />
          </div>
          <div className={styles.cardBody}>
            <h5 className={`${styles.cardTitle} mb-1 text-center`}>
              {product.name}
            </h5>
            <h6 className={styles.cardText}>{price}</h6>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeCard;
