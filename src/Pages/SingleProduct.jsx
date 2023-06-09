import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import CustomFooter from "../Components/Navbar/CustomFooter";
import html2canvas from "html2canvas";
import { CartContext } from "../Context/CartContext/CartContext";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { styled } from "styled-components";
import pdfMake from "pdfmake";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEnvelope,
  faInfo,
  faLink,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

const SingleProduct = () => {
  const toast = useToast();
  const { id, category } = useParams();
  // const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [formItem, setFormItem] = useState({});

  const { checkoutCart } = useContext(CartContext);

  const [rightImageFile, setRightImageFile] = useState(null);
  const [rightImagePreviewURL, setRightImagePreviewURL] = useState(null);

  const [bottomImageFile, setBottomImageFile] = useState(null);
  const [bottomImagePreviewURL, setBottomImagePreviewURL] = useState(null);

  const [websiteIconFile, setWebsiteIconFile] = useState(null);
  const [websiteIconPreviewURL, setWebsiteIconPreviewURL] = useState(null);

  const [websiteLogoFile, setWebsiteLogoFile] = useState(null);
  const [websiteLogoPreviewURL, setWebsiteLogoPreviewURL] = useState(null);

  const [iconFile, setIconFile] = useState(null);
  const [iconPreviewURL, setIconPreviewURL] = useState(null);

  const [customDesignFile, setCustomDesignFile] = useState(null);
  const [customDesignPreviewURL, setCustomDesignPreviewURL] = useState(null);

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

  function handleRightImageUpload(event) {
    const file = event.target.files[0];

    // Store the file in state
    setRightImageFile(file);

    // Generate a preview URL for the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setRightImagePreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleBottomImageUpload(event) {
    const file = event.target.files[0];

    // Store the file in state
    setBottomImageFile(file);

    // Generate a preview URL for the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setBottomImagePreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleWebsiteIconUpload(event) {
    const file = event.target.files[0];

    // Store the file in state
    setWebsiteIconFile(file);

    // Generate a preview URL for the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setWebsiteIconPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleWebsiteLogoUpload(event) {
    const file = event.target.files[0];

    // Store the file in state
    setWebsiteLogoFile(file);

    // Generate a preview URL for the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setWebsiteLogoPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleIconUpload(event) {
    const file = event.target.files[0];

    // Store the file in state
    setIconFile(file);

    // Generate a preview URL for the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setIconPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleCustomDesignUpload(event) {
    const file = event.target.files[0];

    // Store the file in state
    setCustomDesignFile(file);

    // Generate a preview URL for the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setCustomDesignPreviewURL(reader.result);
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
      padding-top: ${formItem?.size === "12/12" ? "101px" : "132px"};
      margin-left: ${formItem?.size === "12/12" ? "-87px" : "-123px"};
      border-width: ${formItem?.size === "12/12" ? "90px" : "125px"};
      border-bottom: ${formItem?.size === "12/12" ? "145px" : "200px"} solid
        ${formItem?.inSideColor} !important;
    }
    .text1 {
      margin-top: ${formItem?.size === "12/12" ? "20px" : "50px"} !important;
      color: ${formItem?.text1Color};
    }
    .text2 {
      top: ${formItem?.size === "12/12" ? "250px" : "37.5em"};
      color: ${formItem?.text2Color};
    }
    img.icon {
      margin-top: ${formItem?.size === "12/12" ? "12px" : "30px"};
      margin-left: ${formItem?.size === "12/12" ? "-37px" : "-31px"};
      width: ${formItem?.size === "12/12" ? "75px" : "70px"} !important;
    }
    .logo1 {
      margin-left: ${formItem?.size === "12/12" ? "-59px" : "-90px"};
      top: ${formItem?.size === "12/12" ? "280px" : "11.7em"};
    }
    img.logo2 {
      top: ${formItem?.size === "12/12" ? "165px" : "223px"};
      left: ${formItem?.size === "12/12" ? "120px" : "116px"};
    }
    img.logo3 {
      top: ${formItem?.size === "12/12" ? "170px" : "225px"};
      left: ${formItem?.size === "12/12" ? "262px" : "301px"};
    }
    .triangle2 img {
      width: ${formItem?.size === "12/12" ? "20%" : "30%"};
    }
    .triangle2.back {
      border-bottom-color: ${formItem?.inSideColorBack} !important;
    }
    .triangle.back {
      border-bottom-color: ${formItem?.outSideColorBack} !important;
    }
    .left-side p.link1 {
      color: ${formItem?.website_title_color};
    }
    .left-side p.link2 {
      color: ${formItem?.website_link_color};
    }
    .left-side p.link3 {
      color: ${formItem?.email_color};
    }
    p.textBase {
      color: ${formItem?.slug_color};
    }
    img.logo3.back {
      top: unset;
      bottom: ${formItem?.size === "12/12" ? "20.9em" : "11.9em"};
    }
    .left-side .row {
      left: ${formItem?.size === "12/12" ? "105px" : "104px"};
      bottom: ${formItem?.size === "12/12" ? "337px" : "185px"};
      width: ${formItem?.size === "12/12" ? "180px" : "233px"};
    }
    p.textBase {
      margin-top: ${formItem?.size === "12/12" ? "158px" : "221px"};
    }
  `;
  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="container mt-5">
        <h4 style={{ marginLeft: "-15px" }}>{product.cardDetails}</h4>
        <div className="row w-100">
          <div className="col pr-3 pl-0" id="divToPrint">
            <div
              className={`${
                window.innerWidth > 768
                  ? "px-5 py-4 border bg-light"
                  : "py-4 border bg-light"
              }`}
            >
              {customDesignPreviewURL && (
                <img
                  className="custom-design-preview w-100"
                  alt="customDesignPreview"
                  src={customDesignPreviewURL}
                  height="58"
                  width="73"
                />
              )}
              {!customDesignPreviewURL && (
                <>
                  <Div id="divToPrint1">
                    <div className="triangle">
                      <div className="triangle2">
                        <p className="text1">{formItem.text1}</p>
                        <img
                          className="smoke1"
                          alt="logo"
                          src="../../Assets/smoke1.png"
                          height="58"
                        />
                        {iconPreviewURL && (
                          <img
                            className="icon"
                            alt="icon"
                            src={iconPreviewURL}
                            height="58"
                            width="73"
                          />
                        )}
                        <p className="text2">{formItem.text2}</p>
                        {bottomImagePreviewURL && (
                          <img
                            className="logo1"
                            alt="Bottom"
                            src={bottomImagePreviewURL}
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
                        {rightImagePreviewURL && (
                          <img
                            className="logo3"
                            alt="logo"
                            src={rightImagePreviewURL}
                            width="73"
                          />
                        )}
                      </div>
                    </div>
                  </Div>
                  <br />
                  <Div id="divToPrint2">
                    <div className="triangle back">
                      <div className="triangle2 back">
                        <p className="textBase">{formItem.slug}</p>
                        <div className="left-side">
                          <div className="row">
                            <div className="col-md-6">
                              {formItem.website_title && (
                                <p className="link1">
                                  <FontAwesomeIcon
                                    icon={faInfo}
                                    className="link1icon fa-circle"
                                  />{" "}
                                  {formItem.website_title}
                                </p>
                              )}

                              {formItem.website_link && (
                                <p className="link2">
                                  <FontAwesomeIcon
                                    icon={faLink}
                                    className="link1icon fa-circle"
                                  />
                                  {formItem.website_link}
                                </p>
                              )}
                              {formItem.email && (
                                <p className="link3">
                                  <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="link1icon fa-circle"
                                  />
                                  {formItem.email}
                                </p>
                              )}
                            </div>
                            <div className="col-md-6 text-right">
                              {websiteIconPreviewURL && (
                                <img
                                  className="icon1"
                                  alt="icon"
                                  src={websiteIconPreviewURL}
                                  height="58"
                                  width="73"
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        {websiteLogoPreviewURL && (
                          <img
                            className="logo3 back"
                            alt="websiteLogo"
                            src={websiteLogoPreviewURL}
                            width="73"
                          />
                        )}
                      </div>
                    </div>
                  </Div>
                </>
              )}
            </div>
          </div>
          <div className="col form-side p-0">
            <div className="p-3 border bg-light">
              <div className="row w-100">
                <div className="col-md-6">
                  <b className="lh-lg">Upload your Design</b>
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    type="file"
                    onChange={handleCustomDesignUpload}
                  />
                </div>
              </div>

              <hr className="my-hr" />

              <div className="row w-100">
                <div className="col-md-6">
                  <span>
                    <b>Price: </b>
                  </span>
                </div>
                <div className="col-md-6">
                  <span className="price">{product.price} $</span>
                </div>

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
              {!customDesignPreviewURL && (
                <>
                  <hr className="my-hr" />
                  <div className="row w-100">
                    <div className="col-md-6">
                      <b className="lh-lg">Title</b>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
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

                    <div className="col-md-6">
                      <b className="lh-lg">Subtitle</b>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
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

                    <div className="col-md-6">
                      <b className="lh-lg">Left Image</b>
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="file"
                        onChange={handleImageUpload}
                      />
                    </div>

                    <div className="col-md-6">
                      <b className="lh-lg">Right Image</b>
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="file"
                        onChange={handleRightImageUpload}
                      />
                    </div>

                    <div className="col-md-6">
                      <b className="lh-lg">Bottom Image</b>
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="file"
                        onChange={handleBottomImageUpload}
                      />
                    </div>

                    <div className="col-md-6">
                      <b className="lh-lg">Icon</b>
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="file"
                        onChange={handleIconUpload}
                      />
                    </div>
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
                  <hr className="my-hr" />
                  <div className="row w-100">
                    <div className="col-md-6">
                      <b className="lh-lg">Website Title</b>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="text"
                          name="website_title"
                          value={formItem.website_title}
                          onChange={handleChange}
                        />
                        <span className="input-group-addon color">
                          <input
                            className="form-control"
                            type="color"
                            name="website_title_color"
                            value={formItem.website_title_color}
                            onChange={handleChange}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <b className="lh-lg">Website Link</b>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="text"
                          name="website_link"
                          value={formItem.website_link}
                          onChange={handleChange}
                        />
                        <span className="input-group-addon color">
                          <input
                            className="form-control"
                            type="color"
                            name="website_link_color"
                            value={formItem.website_link_color}
                            onChange={handleChange}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <b className="lh-lg">Email</b>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="text"
                          name="email"
                          value={formItem.email}
                          onChange={handleChange}
                        />
                        <span className="input-group-addon color">
                          <input
                            className="form-control"
                            type="color"
                            name="email_color"
                            value={formItem.email_color}
                            onChange={handleChange}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <b className="lh-lg">Website Icon</b>
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="file"
                        onChange={handleWebsiteIconUpload}
                      />
                    </div>
                    <div className="col-md-6">
                      <b className="lh-lg">Website Logo</b>
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="file"
                        onChange={handleWebsiteLogoUpload}
                      />
                    </div>
                    <div className="col-md-6">
                      <b className="lh-lg">Slug</b>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="text"
                          name="slug"
                          value={formItem.slug}
                          onChange={handleChange}
                        />
                        <span className="input-group-addon color">
                          <input
                            className="form-control"
                            type="color"
                            name="slug_color"
                            value={formItem.slug_color}
                            onChange={handleChange}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <b className="lh-lg">Outside Color</b>
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control form-sm"
                        type="color"
                        name="outSideColorBack"
                        value={formItem.outSideColorBack}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <b className="lh-lg">Inside Color</b>
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control form-sm"
                        type="color"
                        name="inSideColorBack"
                        value={formItem.inSideColorBack}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="row quantity mt-4 w-100">
                <div className="col-md-6"></div>
                <div
                  className={`${
                    window.innerWidth < 768
                      ? "col-md-6 justify-content-between d-flex pl-4 pr-0"
                      : "col-md-6 justify-content-between d-flex"
                  }`}
                >
                  <button
                    className="add-to-basket btn btn-outline-primary"
                    onClick={printToPdf}
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </button>
                  <button
                    className="add-to-basket btn btn-outline-primary"
                    onClick={() => {
                      checkoutCart();
                      toast({
                        title: "Your Order has been successfully Placed!",
                        status: "success",
                        isClosable: true,
                        position: "top",
                        duration: 3000,
                      });
                    }}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomFooter />
    </>
  );
};

export default SingleProduct;
