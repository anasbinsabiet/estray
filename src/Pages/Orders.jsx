import React, { useContext } from "react";
import { Heading } from "@chakra-ui/react";
import { CartContext } from "../Context/CartContext/CartContext";
import "./cartpage.css";
import Navbar from "../Components/Navbar/Navbar";
import CartItem from "../Components/CartItem/CartItem";
import CustomFooter from "../Components/Navbar/CustomFooter";
const Orders = () => {
  const { orders } = useContext(CartContext);
  console.log("orders are", orders);
  clearInterval(+localStorage.getItem("setIntervalID"));

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <div className="row">
        <Heading className="ordertitle" size={"xl"} textAlign="center">
          {orders.length
            ? `Your Orders (${orders.length} items)`
            : `You don't have any Orders yet`}
        </Heading>
        <div className="cart-container d-block">
          <div className="row">
            <div className="col-md-8 mx-auto">
              {orders.map((el) => (
                <CartItem product={el} isOrder={true} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <CustomFooter />
    </>
  );
};

export default Orders;
