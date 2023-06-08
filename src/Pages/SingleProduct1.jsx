import { Center, Heading } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { CartContext } from "../Context/CartContext/CartContext";
import "./SingleProduct.css";
import { useToast } from "@chakra-ui/react";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { Spinner } from "@chakra-ui/react";
import CustomFooter from "../Components/Navbar/CustomFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake";
import styled from "styled-components";

const SingleProduct = () => {
  const toast = useToast();
  const { id, category } = useParams();
  // const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [formItem, setFormItem] = useState({
    outSideColor: "#A68C67",
    inSideColor: "#676b8e",
    previewURL: "../../Assets/logo1.png",
    text1: "Hello",
    text2: "Welcome",
    text1Color: "#ffffff",
    text2Color: "#ffffff",
    size: "16/16",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("../../Assets/logo1.png");
  const { addSingleItemToCart } = useContext(CartContext);
  // const [product, setProduct] = useState(null);
  const product = {
    cardDetails: "Smart Design Estray",
    category: "Vape",
    gender: "Female",
    price: "179",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/59826149_009_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    id: "estray",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/59826149_009_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    size: "XS",
    quantity: 1,
  };
  clearInterval(+localStorage.getItem("setIntervalID"));
  const productsItemsCollectionRef = collection(db, "products");

  const getProducts = async () => {
    const data = await getDocs(productsItemsCollectionRef);
    try {
      const datareceived = data.docs.map((el) => ({
        ...el.data(),
        id: el.id,
      }));
      // console.log("data received after getting is", datareceived);
      let itemreceived = datareceived.filter((el) => {
        return el.id === id && el.category === category;
      });
      console.log("itemreceived is ", itemreceived);
      if (itemreceived.length) console.log("ok");
      // setProduct({ ...itemreceived[0], size: "XS", quantity: 1 });
      else setError("No Item found");
    } catch (error) {
      setError(error.message);
    }
  };
  console.log("error is ", error);

  function handleImageUpload(event) {
    const file = event.target.files[0];

    // Store the file in state
    setImageFile(file);

    // Generate a preview URL for the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    // getProducts();
  }, []);
  console.log("product is ", product);

  const handleChange = (e) => {
    setFormItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(e.target.name, e.target.value);
  };

  const printToPdf = () => {
    try {
      html2canvas(document.getElementById("divToPrint"), {
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        const data = canvas.toDataURL();
        const pdfExportSetting = {
          content: [
            {
              image: data,
              width: 500,
            },
          ],
        };
        const pdfName = `${new Date().getFullYear()}_${new Date().getDate()}_${new Date().getMilliseconds()}.pdf`;
        pdfMake.createPdf(pdfExportSetting).download(pdfName);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Div = styled.div`
    .triangle {
      border-width: ${formItem?.size === "12/12" ? "200px" : "250px"};
      border-bottom: ${formItem?.size === "12/12" ? "300px" : "400px"} solid
        ${formItem?.outSideColor} !important;
    }
    .triangle2 {
      padding-top: ${formItem?.size === "12/12" ? "113px" : "130px"};
      margin-left: ${formItem?.size === "12/12" ? "-69px" : "-118px"};
      border-width: ${formItem?.size === "12/12" ? "73px" : "120px"};
      border-bottom: ${formItem?.size === "12/12" ? "120px" : "200px"} solid
        ${formItem?.inSideColor} !important;
    }
    .text1 {
      margin-top: ${formItem?.size === "12/12" ? "20px" : "64px"} !important;
      color: ${formItem?.text1Color};
    }
    .text2 {
      bottom: ${formItem?.size === "12/12" ? "210px" : "160px"};
      color: ${formItem?.text2Color};
    }
    img.icon {
      margin-left: ${formItem?.size === "12/12" ? "-37px" : "-55px"};
      width: ${formItem?.size === "12/12" ? "75px" : "100px"} !important;
    }
    .logo1 {
      margin-left: ${formItem?.size === "12/12" ? "-50px" : "-80px"};
      bottom: ${formItem?.size === "12/12" ? "130px" : "54px"};
    }
    img.logo2 {
      top: ${formItem?.size === "12/12" ? "260px" : "235px"};
      left: ${formItem?.size === "12/12" ? "142px" : "96px"};
    }
    img.logo3 {
      top: ${formItem?.size === "12/12" ? "264px" : "235px"};
      left: ${formItem?.size === "12/12" ? "282px" : "277px"};
    }
    .triangle2 img {
      width: ${formItem?.size === "12/12" ? "20%" : "30%"};
    }
  `;

  console.log(formItem);

  return (
    <>
      <Navbar />
      <div className="row mt-5 pt-5">
        {product && !error ? (
          <div className="singleproduct ordertitle" id={product.id}>
            <Div id="divToPrint">
              <div className="triangle">
                <div className="triangle2">
                  <p className="text1">{formItem.text1}</p>
                  <img
                    className="smoke1"
                    alt="logo"
                    src="../../Assets/smoke1.png"
                    height="58"
                  />
                  {previewURL && (
                    <img
                      className="icon"
                      alt="icon"
                      src={previewURL || "../../Assets/logo1.png"}
                      height="58"
                      width="73"
                    />
                  )}
                  <p className="text2">{formItem.text2}</p>
                  {previewURL && (
                    <img
                      className="logo1"
                      alt="logo"
                      src={previewURL}
                      height="58"
                      width="73"
                    />
                  )}
                  {previewURL && (
                    <img
                      className="logo2"
                      alt="logo"
                      src={previewURL}
                      width="73"
                    />
                  )}
                  {previewURL && (
                    <img
                      className="logo3"
                      alt="logo"
                      src={previewURL}
                      width="73"
                    />
                  )}
                </div>
              </div>
            </Div>
            <div>
              <div>
                <h2>{product.cardDetails}</h2>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <span>
                    <b>Price: </b>
                  </span>
                </div>
                <div className="col-md-6">
                  <span className="price">{product.price} $</span>
                </div>
              </div>
              {/* <div className="row my-2">
                <div className="col-md-6">
                  <b>Category:</b>
                </div>
                <div className="col-md-6">
                  <span>{product.category}</span>
                </div>
              </div> */}

              <div className="row">
                <div className="col-md-6">
                  <span>
                    <b className="lh-lg">Size</b>
                  </span>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control form-sm"
                    name="size"
                    onChange={handleChange}
                  >
                    <option value="16/16">16/16</option>
                    <option value="12/12">12/12</option>
                  </select>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-md-6">
                  <b className="lh-lg">Quantity</b>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control form-sm"
                    name=""
                    id="qty"
                    onChange={
                      (e) => console.log("ok")
                      // setProduct({ ...product, quantity: +e.target.value })
                    }
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <b className="lh-lg">Text 1</b>
                </div>
                <div className="col-md-6">
                  <div class="input-group">
                    <input
                      className="form-control"
                      type="text"
                      name="text1"
                      value={formItem.text1}
                      onChange={handleChange}
                    />
                    <span className="input-group-addon color">
                      <input
                        className="form-control"
                        type="color"
                        name="text1Color"
                        value={formItem.text1Color}
                        onChange={handleChange}
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-md-6">
                  <b className="lh-lg">Text 2</b>
                </div>
                <div className="col-md-6">
                  <div class="input-group">
                    <input
                      className="form-control"
                      type="text"
                      name="text2"
                      value={formItem.text2}
                      onChange={handleChange}
                    />
                    <span className="input-group-addon color">
                      <input
                        className="form-control"
                        type="color"
                        name="text2Color"
                        value={formItem.text2Color}
                        onChange={handleChange}
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-md-6">
                  <b className="lh-lg">Outside Color</b>
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control form-sm"
                    type="color"
                    name="outSideColor"
                    value={formItem.outSideColor}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row my-2">
                <div className="col-md-6">
                  <b className="lh-lg">Inside Color</b>
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control form-sm"
                    type="color"
                    name="inSideColor"
                    value={formItem.inSideColor}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <b className="lh-lg">Image</b>
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    type="file"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              <div className="quantity">
                <span>
                  <button
                    className="add-to-basket"
                    onClick={() => {
                      addSingleItemToCart(product);
                      toast({
                        title: `Item added to cart`,
                        status: "info",
                        isClosable: true,
                        position: "top",
                        duration: 3000,
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faUpload} />
                  </button>
                </span>
                <span className="m-4">
                  <button className="add-to-basket" onClick={printToPdf}>
                    <FontAwesomeIcon icon={faDownload} />
                  </button>
                </span>
                <span className="m-4">
                  <button
                    className="add-to-basket"
                    onClick={() => {
                      addSingleItemToCart(product);
                      toast({
                        title: `Item added to cart`,
                        status: "info",
                        isClosable: true,
                        position: "top",
                        duration: 3000,
                      });
                    }}
                  >
                    ADD TO BASKET
                  </button>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <Center size={"2xl"} margin="15%" textAlign={"center"}>
            {!error ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            ) : (
              <Heading>{error}</Heading>
            )}
          </Center>
        )}
      </div>
      <CustomFooter />
    </>
  );
};

export default SingleProduct;
