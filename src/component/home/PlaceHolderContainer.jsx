import React from "react";
import HomeCard from "./HomeCard";
import PlaceHolder from "./PlaceHolder";

const PlaceHolderContainer = () => {
    const placeNumbers = [...Array(12).keys()].slice(0);

    return (
      <section
        className="py-5"
        id="shop"
        style={{ backgroundColor: "#EFE3C2" }}
      >
        <h4 style={{ textAlign: "center" }}>Our Products</h4>

        <div className="container px-4 px-lg-5 mt-5">
          <div className="row row-cols-2 row-cols-sm-3 row-col-md-5 row-cols-lg-5 g-4 justify-content-center">
            {placeNumbers.map(num => <PlaceHolder key={num}/>)}
          </div>
        </div>
      </section>
    );
}

export default PlaceHolderContainer;
