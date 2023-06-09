import { AuthContext } from "../Context/AuthContext/AuthContextProvider";
import "./authentication.css";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heading, Center } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import Navbars from "../Components/Navbar/Navbar";
import CustomFooter from "../Components/Navbar/CustomFooter";
const Login = () => {
  // const initialData = {
  //   email: "",
  //   password: "",
  // };
  // const [user, setUser] = useState(initialData);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  clearInterval(+localStorage.getItem("setIntervalID"));
  const navigate = useNavigate();
  const authentication = useContext(AuthContext);
  const { logIn, googleSignIn, setUserAsAdmin, isAdmin } = authentication;
  const toast = useToast();
  console.log("isAdmin is ", isAdmin);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      console.log("user signed in");
      toast({
        title: "login successfull",
        status: "success",
        isClosable: true,
        position: "top",
      });
      document.querySelector("form").reset();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn()
        .then((res) => res.user)
        .then((res) => {
          console.log(res);
          toast({
            title: "login successfull",
            status: "success",
            isClosable: true,
            position: "top",
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        });
    } catch (error) {
      setError(error.message);
    }
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
          <Heading className="text-white" marginTop={10}>
            Login
          </Heading>
        </Center>
        <div className="login-container">
          <div className="logo-image">
            <Link to="/">
              <h6>NYA Worldwide</h6>
            </Link>
          </div>
          <div>
            {error && <div className="error">{error}</div>}
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type={"email"}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
              />
              <input
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
              <div className="admin-check">
                <input
                  type="checkbox"
                  placeholder="Login as admin"
                  onClick={() => setUserAsAdmin()}
                  id="admin"
                />
                <label htmlFor="admin">Login as admin</label>
              </div>
              <input type={"submit"} id="submit" />
            </form>
            <div>
              <p>
                Don't have an account? <Link to={"/signup"}>Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <CustomFooter />
    </>
  );
};

export default Login;
