import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../../Context/CartContext/CartContext";
import "./CartItem.css";
const CartItem = ({ product, isOrder }) => {
  const { id, outImage, cardDetails, price, quantity, size, category } =
    product;
  const { addRemoveItem } = useContext(CartContext);
  const [item, setItem] = useState(product);
  console.log("product in cart is", product);
  // console.log("quantity changed", item);
  // let category;
  // if (id <= 40) category = "products";
  // else if (id > 40 && id <= 106) category = "shoes";
  useEffect(() => {
    addRemoveItem(item);
  }, [item]);
  return (
    <div className="incart-item">
      <div>
        <Link to={`/products/${category}/${id}`}>
          {" "}
          <img src={outImage} />
        </Link>
      </div>
      <div className="item-details">
        <h2>{cardDetails}</h2>
        <table>
          <tbody>
            <tr>
              <th>Size</th>
              <td>
                {product.size ? (
                  <span>{product.size}</span>
                ) : (
                  <Link
                    style={{ color: "resd" }}
                    to={`/products/${category}/${id}`}
                  >
                    Please select size
                  </Link>
                )}
              </td>
            </tr>
            <tr>
              <th>Category</th>
              <td>{category}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>{price}</td>
            </tr>
            <tr>
              <th>Quantity</th>
              <td>
                <div className="item-quantity">
                  {!isOrder ? (
                    <button
                      onClick={() =>
                        setItem({ ...item, quantity: item.quantity - 1 })
                      }
                    >
                      <span>-</span>
                    </button>
                  ) : null}
                  <span className="px-3">{item.quantity}</span>
                  {!isOrder ? (
                    <button
                      onClick={() =>
                        setItem({ ...item, quantity: item.quantity + 1 })
                      }
                    >
                      <span>+</span>
                    </button>
                  ) : null}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartItem;
