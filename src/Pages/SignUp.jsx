import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContextProvider";
import "./authentication.css";
import { Heading, Center } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Navbars from "../Components/Navbar/Navbar";
import CustomFooter from "../Components/Navbar/CustomFooter";
const SignUp = () => {
  const initialUser = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  clearInterval(+localStorage.getItem("setIntervalID"));
  const Authentication = useContext(AuthContext);
  const { signUp, logIn } = Authentication;
  // console.log("Authentication is ", Authentication);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(user.email, user.password);
      toast({
        title: "Registration Successful",
        status: "success",
        isClosable: true,
        position: "top",
      });
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
    axios.post(`http://localhost:8080/users`, user);
  };
  useEffect(() => {
    error &&
      toast({
        title: error,
        status: "error",
        isClosable: true,
        position: "top",
      });
  }, [error]);
  return (
    <>
      <Navbars />
      <br />
      <br />
      <br />
      <div id="login">
        <Center>
          <Heading marginTop={10} className="text-white">
            Signup
          </Heading>
        </Center>
        <div className="login-container signup-container">
          <div className="logo-image">
            <Link to="/">
              <h6>Estray Store</h6>
            </Link>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type={"email"}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
                placeholder="Enter Email"
              />
              <input
                type={"password"}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter Password"
              />
              <input type={"submit"} id="submit" />
            </form>
            <div>
              <p>
                Already have an account? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <CustomFooter />
    </>
  );
};

export default SignUp;
