import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import Login from "../Pages/Login";

import SignUp from "../Pages/SignUp";
import SingleProduct from "../Pages/SingleProduct";
import Singleuser from "../Pages/Singleuser";

import PrivateRouteProvider from "../Components/PrivateAuth/PrivateRoute";
import Shop from "../Pages/Shop";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Shop />} />
      <Route path="/product/upload" element={<SingleProduct type="upload" />} />
      <Route path="/product/custom" element={<SingleProduct type="custom" />} />
      {/* <Route path="/product" element={<SingleProduct />} />
      <Route path="/products/:category" element={<Products />} /> */}
      <Route
        path="/products/:category/:id"
        element={
          <PrivateRouteProvider>
            <SingleProduct />
          </PrivateRouteProvider>
        }
      />
      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/singleuser"
        element={
          <PrivateRouteProvider>
            <Singleuser />
          </PrivateRouteProvider>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
