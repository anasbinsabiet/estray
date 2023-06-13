import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import CustomFooter from "../Components/Navbar/CustomFooter";
import { Link } from "react-router-dom";

const Shop = () => {
  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="container mt-5 shop-container">
        <h4 className="mt-4">Custom Design Estray</h4>
        <div className="row w-100">
          <div className="col-sm-12 col-md-4 p-3 pl-0">
            <div
              className={`${
                window.innerWidth > 768
                  ? "px-5 py-4 border bg-light"
                  : "py-4 border bg-light"
              }`}
            >
              <img
                className="shop-preview-img w-100"
                alt="customDesignPreview"
                src="../../Assets/preview1.png"
                height="226"
                width="73"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-4 p-3 pl-0">
            <div
              className={`${
                window.innerWidth > 768
                  ? "px-5 py-4 border bg-light"
                  : "py-4 border bg-light"
              }`}
            >
              <img
                className="shop-preview-img w-100"
                alt="customDesignPreview"
                src="../../Assets/banner.png"
                height="226"
                width="73"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-4 p-3 pl-0">
            <div
              className={`${
                window.innerWidth > 768
                  ? "px-5 py-4 border bg-light"
                  : "py-4 border bg-light"
              }`}
            >
              <img
                className="shop-preview-img w-100"
                alt="customDesignPreview"
                src="../../Assets/preview3.png"
                height="226"
                width="73"
              />
            </div>
          </div>
        </div>
        <div className="row w-100 mt-3 mb-2 pl-3">
          <div className="col pr-3 pl-0 text-center">
            <Link className="nav-link" to="/product/upload">
              <button type="button" className="btn btn-secondary btn-block">
                Upload Your Design
              </button>
            </Link>
          </div>
          <div className="col pr-3 pl-0 text-center">
            <Link className="nav-link" to="/product/custom">
              <button type="button" className="btn btn-primary btn-block">
                Create Your Design
              </button>
            </Link>
          </div>
        </div>
      </div>
      <CustomFooter />
    </>
  );
};

export default Shop;
