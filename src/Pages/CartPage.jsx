import { Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { CartContext } from "../Context/CartContext/CartContext";
import "./cartpage.css";
import CartItem from "../Components/CartItem/CartItem";
import Coupons from "../Components/Coupons/Coupons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import CustomNav from "../Components/Navbar/CustomNav";
import CustomFooter from "../Components/Navbar/CustomFooter";
import "../Assets/cart.css";

const CartPage = () => {
  const toast = useToast();
  const { cartItems, addItemToCart, discountedPrice, subtotal, checkoutCart } =
    useContext(CartContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate();
  clearInterval(+localStorage.getItem("setIntervalID"));
  console.log("cartItems are", cartItems);
  return (
    <>
      <CustomNav />
      <br />
      <br />
      <br />
      <div className="row mt-5">
        <h6 className="text-center">
          {cartItems.length
            ? `Your Cart 🛒 (${cartItems.length} items)`
            : `Your Cart is Empty! 😟`}
        </h6>
        <div className="cart-container d-block">
          <div className="row">
            <div className="col-md-8 mx-auto">
              {cartItems.map((el) => (
                <CartItem product={el} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="cart-subtotal row pb-5">
        <div>
          <h6>
            SubTotal:{" "}
            <span
              className="discountless"
              style={
                discountedPrice && subtotal != 0
                  ? { textDecoration: "line-through", color: "gray" }
                  : null
              }
            >
              {subtotal}
            </span>
            <span
              className="discounted"
              style={
                discountedPrice && subtotal != 0
                  ? { display: "inline" }
                  : { display: "none" }
              }
            >
              {discountedPrice}
            </span>
          </h6>
        </div>
        <div>
          {/* <button className="checkout">CHECKOUT</button> */}
          <Button
            disabled={cartItems.length === 0}
            colorScheme="blue"
            padding={"20px 70px"}
            onClick={onOpen}
          >
            CHECKOUT
          </Button>

          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Proceed to Checkout!
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to checkout? You can't undo this action
                  afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      console.log(cartItems);
                      let sizeSelected = cartItems.filter(
                        (el) => el.size === ""
                      );
                      // console.log("size selected", sizeSelected);
                      if (sizeSelected.length) {
                        toast({
                          title: "Please select size of all items!",
                          status: "error",
                          isClosable: true,
                          position: "top",
                          duration: 3000,
                        });
                      } else {
                        checkoutCart();
                        toast({
                          title: "Your Order has been successfully Placed!",
                          status: "success",
                          isClosable: true,
                          position: "top",
                          duration: 3000,
                        });
                        onClose();
                        setTimeout(() => {
                          navigate("/");
                        }, 3000);
                      }
                    }}
                    ml={3}
                  >
                    Checkout
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </div>
      </div>
      <CustomFooter />
    </>
  );
};

export default CartPage;
