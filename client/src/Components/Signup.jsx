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
import { backendUrl } from "../constants";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${backendUrl}auth/signup`, {
        email: email,
        password: password,
      });
      console.log(response.data)
      if (response.data.msg === "Success") {
        setAlert({ type: "success", message: "Signup successful!" });
      } else {
        setAlert({ type: "error", message: response.data.msg });
      }
    } catch (error) {
      console.error("Error during signup:", error.message);

      if (error.response) {
        if (error.response.status === 409) {
          setAlert({ type: "error", message: "Email already exists!" });
        } else {
          setAlert({ type: "error", message: error.response.data.message });
        }
      } else if (error.request) {
        setAlert({
          type: "error",
          message: "No response received from the server",
        });
      } else {
        setAlert({ type: "error", message: "An unexpected error occurred" });
      }
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
        Signup
      </Heading>
      <FormControl id="email" mb="4">
        <FormLabel>Email: </FormLabel>
        <Input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" mb="4">
        <FormLabel>Password: </FormLabel>
        <Input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <Button
        bgColor="gray.400"
        mx="auto"
        display="block"
        onClick={handleSignup}
      >
        Signup
      </Button>

      {alert.type && (
        <Alert
          mt="4"
          status={alert.type === "success" ? "success" : "error"}
          borderRadius="5px"
          padding="10px"
          color={"black"}
          marginTop="10px"
          backgroundColor={alert.type === "success" ? "#c6f6d5" : "#fed7d7"}
        >
          <AlertIcon />
          {alert.message}
        </Alert>
      )}
    </Box>
  );
};

export default Signup;
