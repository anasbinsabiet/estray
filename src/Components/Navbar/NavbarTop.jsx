import { Flex, Center } from "@chakra-ui/react";
import "../CartDropdown/CartDropdown.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../Context/AuthContext/AuthContextProvider";
import CartDropdown from "../CartDropdown/CartDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@chakra-ui/react";

const NavbarTop = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const auth = useContext(AuthContext);
  const { user, logOut, isAdmin, isAuth } = auth;
  console.log("isAdmin is", isAdmin);
  const logoutHandler = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex
      width={"100vw"}
      backgroundColor="#212529"
      color={"white"}
      justifyContent="space-between"
      height={"max-content"}
      alignItems={"center"}
      className="navTop"
    >
      <Center className="px-5 py-3">
        <Link to={"/"}>
          Welcome to
          {/* <Image
            height={"60px"}
            src={imageAddress}
            alt="website-logo"
            borderColor={"white"}
          /> */}
        </Link>
      </Center>
      {/* <Center>
        <Flex className="section-button">MEN</Flex>
        <Flex className="section-button">WOMEN</Flex>
      </Center>
      <Center>
        <Stack spacing={24} width="50vw">
          <InputGroup>
            <Input
              placeholder="Search for Items and Brands"
              backgroundColor="white"
              color={"gray"}
              borderRadius={"100px"}
            />
            <InputRightElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children={<SearchIcon />}
            />
          </InputGroup>
        </Stack>
      </Center> */}
      <Flex
        fontSize={"l"}
        width={isMobile ? "50vw" : "10vw"}
        justifyContent={"space-around"}
        alignItems="center"
      >
        <div className="user">
          <FontAwesomeIcon icon={faUser} size="sm" />
          <div className="user-menu">
            <div className="login-user">
              <Link to={"/login"}>
                {user ? user.displayName || "Guest" : "Login"}
              </Link>
              <p className="admin-text">{isAdmin && isAuth ? "admin" : null}</p>
            </div>
            <div className="login-menu">
              <div>
                <i className="fa-regular fa-user"></i>
              </div>
              <div>
                <Link to={"/singleuser"}>My Account</Link>
              </div>
            </div>
            <div className="login-menu">
              <div>
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
              <div>
                <Link to={"/orders"}>My Orders</Link>
              </div>
            </div>
            {isAdmin && isAuth ? (
              <div className="login-menu">
                <div>
                  <i className="fa-solid fa-user-tie"></i>
                </div>
                <div>
                  <Link to={"/adminpanel"}>Admin Panel</Link>
                </div>
              </div>
            ) : null}
            <div className="login-menu">
              <div>
                <i className="fa-regular fa-circle-question"></i>
              </div>
              <div>Return Information</div>
            </div>
            <div className="login-menu">
              <div>
                <i className="fa-solid fa-chalkboard-user"></i>
              </div>
              <div>Contact Preferances</div>
            </div>
            {user ? (
              <div className="login-user" onClick={logoutHandler}>
                <Link to={"/login"}>Logout</Link>
              </div>
            ) : null}
          </div>
        </div>
        <div>
          <Link to={"/wishlist"}>
            <FontAwesomeIcon icon={faHeart} size="sm" />
          </Link>
        </div>
        <CartDropdown />
      </Flex>
    </Flex>
  );
};

export default NavbarTop;
