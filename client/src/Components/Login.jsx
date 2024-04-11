import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import {backendUrl} from "../constants.js"
const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleLogin = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      setAlert({ type: "warning", message: "Please fill in all fields" });
      return;
    }
    if (!emailPattern.test(email)) {
      setAlert({ type: "error", message: "Please enter a valid email address" });
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}auth/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
        console.log(response)
      localStorage.setItem("token", response.data.token);
      setLoggedIn(true);
      setAlert({ type: "success", message: "Login successful" });
    } catch (error) {
      console.error(error);
      setAlert({
        type: "error",
        message: error.response?.data.error || "Incorrect password",
      });
    }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="20vh"
      p="4"
      borderRadius="md"
      borderColor={"gray.500"}
      borderWidth="2px"
    >
      <Heading mb="4" textAlign="center">
        Login
      </Heading>
      <FormControl id="email" mb="4">
        <FormLabel>Email: </FormLabel>
        <Input
          type="email"
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" mb="4">
        <FormLabel>Password: </FormLabel>
        <Input
          type="password"
          placeholder="Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <Button
       bgColor="gray.400"
        mx="auto"
        display="block"
        onClick={handleLogin}
      >
        Login
      </Button>

      {alert.type && (
        <Alert
          mt="4"
          status={alert.type === "success" ? "success" : "error"}
          borderRadius="5px"
          padding="10px"
          color={"black"}
          backgroundColor={alert.type === "success" ? "#c6f6d5" : "#fed7d7"}
          marginTop="10px"
        >
          <AlertIcon />
          {alert.message}
        </Alert>
      )}
    </Box>
  );
};

export default Login;
