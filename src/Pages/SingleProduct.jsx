import React, { useState, useRef } from "react";
import Navbar from "../Components/Navbar/Navbar";
import CustomFooter from "../Components/Navbar/CustomFooter";
import html2canvas from "html2canvas";
import { useToast } from "@chakra-ui/react";
import { styled } from "styled-components";
import pdfMake from "pdfmake";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faDownload,
  faEnvelope,
  faInfo,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const SingleProduct = ({ type }) => {
  const form = useRef();
  const toast = useToast();
  const [imageFile, setImageFile] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [previewURL, setPreviewURL] = useState("../../Assets/nyalogo.png");
  const [formItem, setFormItem] = useState({
    outSideColorBack: "#0E2140",
    outSideColor: "#B08A5D",
    inSideColorBack: "#BF9D68",
    inSideColor: "#0F2743",
    website_title: "NyaWorldwide",
    website_link: "NyaWorldwide.net",
    email: "info@nyaWorldwide.net",
    website_title_color: "#c8bfa7",
    website_link_color: "#c8bfa7",
    email_color: "#c8bfa7",
    slug: "Choose the Best - Leave the Rest",
    slug_color: "#c8bfa7",
    text1: "KEEP IT SMOKEY",
    text2: "CUSTOMER FOCUSED RESULT DRIVEN",
  });

  const [rightImageFile, setRightImageFile] = useState(null);
  const [rightImagePreviewURL, setRightImagePreviewURL] = useState(
    "../../Assets/nyalogo.png"
  );

  const [bottomImageFile, setBottomImageFile] = useState(null);
  const [bottomImagePreviewURL, setBottomImagePreviewURL] = useState(
    "../../Assets/nyalogo.png"
  );

  const [websiteIconFile, setWebsiteIconFile] = useState(null);
  const [websiteIconPreviewURL, setWebsiteIconPreviewURL] = useState(
    "../../Assets/nwicon.png"
  );

  const [websiteLogoFile, setWebsiteLogoFile] = useState(null);
  const [websiteLogoPreviewURL, setWebsiteLogoPreviewURL] = useState(
    "../../Assets/nyalogo.png"
  );

  const [iconFile, setIconFile] = useState(null);
  const [iconPreviewURL, setIconPreviewURL] = useState();

  const [customDesignFile, setCustomDesignFile] = useState(null);
  const [customDesignPreviewURL, setCustomDesignPreviewURL] = useState(null);

  const [customDesignFileBack, setCustomDesignFileBack] = useState(null);
  const [customDesignPreviewURLBack, setCustomDesignPreviewURLBack] =
    useState(null);

  const product = {
    cardDetails: "Custom Design Ashtray",
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

  function handleCustomDesignUploadBack(event) {
    const file = event.target.files[0];

    // Store the file in state
    setCustomDesignFileBack(file);

    // Generate a preview URL for the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setCustomDesignPreviewURLBack(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsClicked(true);
    if (type === "custom") {
      const canvas1 = await html2canvas(document.getElementById("divToPrint1"));
      const [, data1] = canvas1.toDataURL().split(",", 2);
      const canvas2 = await html2canvas(document.getElementById("divToPrint2"));
      const [, data2] = canvas2.toDataURL().split(",", 2);
      sendData(data1, data2);
    } else if (type === "upload") {
      const [, data1] = customDesignPreviewURL.split(",", 2);
      const [, data2] = customDesignPreviewURLBack.split(",", 2);
      sendData(data1, data2);
    }
  };

  const sendData = async (data1, data2) => {
    await axios
      .post("https://ashtry.onrender.com/api/v1/ashtry/mail_sent", {
        front_image: data1,
        back_image: data2,
      })
      .then((response) => {
        if (response.data.message) {
          toast({
            title: response.data.message,
            status: "success",
            isClosable: true,
            position: "top",
            duration: 3000,
          });
        }
      });
  };

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
        console.log();
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
      border-width: ${formItem?.size === "15/4" ? "200px" : "250px"};
      border-bottom: ${formItem?.size === "15/4" ? "300px" : "400px"} solid
        ${formItem?.outSideColor} !important;
    }
    .triangle2 {
      padding-top: ${formItem?.size === "15/4" ? "101px" : "132px"};
      margin-left: ${formItem?.size === "15/4" ? "-87px" : "-123px"};
      border-width: ${formItem?.size === "15/4" ? "90px" : "125px"};
      border-bottom: ${formItem?.size === "15/4" ? "145px" : "200px"} solid
        ${formItem?.inSideColor} !important;
    }
    .text1 {
      margin-top: ${formItem?.size === "15/4" ? "30px" : "55px"} !important;
      color: ${formItem?.text1Color};
    }
    .text2 {
      top: ${formItem?.size === "15/4" ? "250px" : "42em"};
      color: ${formItem?.text2Color};
    }
    img.icon {
      margin-top: ${formItem?.size === "15/4" ? "12px" : "30px"};
      margin-left: ${formItem?.size === "15/4" ? "-37px" : "-31px"};
      width: ${formItem?.size === "15/4" ? "75px" : "70px"} !important;
    }
    .logo1 {
      margin-left: ${formItem?.size === "15/4" ? "-59px" : "-90px"};
      top: ${formItem?.size === "15/4" ? "280px" : "11.7em"};
    }
    img.logo2 {
      top: ${formItem?.size === "15/4" ? "165px" : "223px"};
      left: ${formItem?.size === "15/4" ? "120px" : "116px"};
    }
    img.logo3 {
      top: ${formItem?.size === "15/4" ? "170px" : "225px"};
      left: ${formItem?.size === "15/4" ? "262px" : "301px"};
    }
    .triangle2 img {
      width: ${formItem?.size === "15/4" ? "20%" : "30%"};
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
      bottom: ${formItem?.size === "15/4" ? "26.9em" : "18.9em"};
    }
    .left-side .row {
      left: ${formItem?.size === "15/4" ? "106px" : "106px"};
      bottom: ${formItem?.size === "15/4" ? "26.5rem" : "18.3rem"};
      width: ${formItem?.size === "15/4" ? "180px" : "233px"};
    }
    p.textBase {
      margin-top: ${formItem?.size === "15/4" ? "158px" : "221px"};
    }
  `;
  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="container mt-5">
        <h4 style={{ marginLeft: "-15px" }} className="mt-2">
          {product.cardDetails}
        </h4>
        <form ref={form} onSubmit={sendEmail}>
          <div className="row w-100">
            <div className="col pr-3 pl-0" id="divToPrint">
              <div
                className={`${
                  window.innerWidth > 768
                    ? "px-5 py-4 border bg-light"
                    : "py-4 border bg-light"
                }`}
              >
                {type === "upload" && customDesignPreviewURL ? (
                  <img
                    className="custom-design-preview w-100"
                    alt="customDesignPreview"
                    src={customDesignPreviewURL}
                    height="58"
                    width="73"
                  />
                ) : (
                  ""
                )}
                {type === "upload" && customDesignPreviewURLBack ? (
                  <img
                    className="custom-design-preview w-100 mt-3"
                    alt="customDesignPreview"
                    src={customDesignPreviewURLBack}
                    height="58"
                    width="73"
                  />
                ) : (
                  ""
                )}
                {type === "upload" && !customDesignPreviewURL ? (
                  <h2 className="text-center py-5">No file choosen!</h2>
                ) : (
                  ""
                )}
                {type === "custom" && (
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
                              <div className="col-md-6 col-sm-6">
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
                              <div className="col-md-6 col-sm-6 text-right">
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
                {type === "upload" && (
                  <>
                    <h6 className="text-bold">Upload your Design</h6>
                    <hr className="my-hr" />
                    <div className="row w-100">
                      <div className="col-md-6">
                        <b className="lh-lg">Front Image</b>
                      </div>
                      <div className="col-md-6">
                        <input
                          className="form-control"
                          type="file"
                          onChange={handleCustomDesignUpload}
                        />
                      </div>
                    </div>
                    <div className="row w-100">
                      <div className="col-md-6">
                        <b className="lh-lg">Back Image</b>
                      </div>
                      <div className="col-md-6">
                        <input
                          className="form-control"
                          type="file"
                          onChange={handleCustomDesignUploadBack}
                        />
                      </div>
                    </div>
                    <hr className="my-hr" />
                  </>
                )}

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
                      <option value="15/15">15/15</option>
                      <option value="15/4">15/4</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <b className="lh-lg">Quantity</b>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-control form-sm"
                      name="qty"
                      id="qty"
                      onChange={
                        (e) => console.log("ok")
                        // setProduct({ ...product, quantity: +e.target.value })
                      }
                    >
                      <option value="500">500</option>
                      <option value="1000">1000</option>
                      <option value="1500">1500</option>
                      <option value="2000">2000</option>
                    </select>
                  </div>
                </div>
                {type === "custom" && (
                  <>
                    <hr className="my-hr" />
                    <div className="row w-100">
                      <div className="col-md-6">
                        <b className="lh-lg">Top Title</b>
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
                        <b className="lh-lg">Bottom Title</b>
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
                        <b className="lh-lg">Left side upload logo</b>
                      </div>
                      <div className="col-md-6">
                        <input
                          className="form-control"
                          type="file"
                          onChange={handleImageUpload}
                        />
                      </div>

                      <div className="col-md-6">
                        <b className="lh-lg">Right side upload logo</b>
                      </div>
                      <div className="col-md-6">
                        <input
                          className="form-control"
                          type="file"
                          onChange={handleRightImageUpload}
                        />
                      </div>

                      <div className="col-md-6">
                        <b className="lh-lg">Bottom upload logo</b>
                      </div>
                      <div className="col-md-6">
                        <input
                          className="form-control"
                          type="file"
                          onChange={handleBottomImageUpload}
                        />
                      </div>

                      <div className="col-md-6">
                        <b className="lh-lg">
                          Middle of Ashtray insert picture
                        </b>
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
                        <b className="lh-lg">Type Company Name</b>
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
                        <b className="lh-lg">Type Web Address</b>
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
                        <b className="lh-lg">Type email</b>
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
                        <b className="lh-lg">
                          Right Side of Ashtray Upload Logo
                        </b>
                      </div>
                      <div className="col-md-6">
                        <input
                          className="form-control"
                          type="file"
                          onChange={handleWebsiteLogoUpload}
                        />
                      </div>
                      <div className="col-md-6">
                        <b className="lh-lg">Bottom Type Tagline</b>
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
                    {type === "custom" && (
                      <button
                        type="button"
                        className="add-to-basket btn btn-custom"
                        onClick={printToPdf}
                      >
                        <FontAwesomeIcon icon={faDownload} />
                      </button>
                    )}
                    <button
                      disabled={isClicked}
                      type="submit"
                      className="add-to-basket btn btn-custom"
                      // onClick={() => {
                      //   toast({
                      //     title: "Your Order has been successfully Placed!",
                      //     status: "success",
                      //     isClosable: true,
                      //     position: "top",
                      //     duration: 3000,
                      //   });
                      // }}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <CustomFooter />
    </>
  );
};

export default SingleProduct;
