// Navbar.jsx
import React, { useState } from "react";
import {
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link as ChakraLink, 
} from "@chakra-ui/react";
import UploadPDF from "./UploadPDF";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Navbar = ({ loggedIn, onLogout }) => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenUploadModal = () => {
    setUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setUploadModalOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      width="100vw"
      p={4}
      bg="gray.500"
      color="white"
      fontSize="lg"
      fontFamily="sans-serif"
    >
      <ChakraLink
        as={RouterLink}
        to="/"
        _hover={{ textDecoration: "none", color: "whitesmoke"}}
      >
        <Flex>Class Library</Flex>
      </ChakraLink>

      <Flex justifyContent="space-around" alignItems="center" width="50vw">
        <ChakraLink
          as={RouterLink}
          to="/subjects"
          mx={4}
          _hover={{ textDecoration: "none", color: "whitesmoke"}}
        >
          Subjects
        </ChakraLink>

        {loggedIn && (
          <Button
            mx={4}
            colorScheme="gray"
            onClick={handleOpenUploadModal}
            _hover={{ bg: "gray.300" }}
          >
            +
          </Button>
        )}

        {!loggedIn ? (
          <>
            <ChakraLink
              as={RouterLink}
              to="/signup"
              mx={4}
              _hover={{ textDecoration: "none", color: "whitesmoke"}}
            >
              Signup
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/login"
              mx={4}
              _hover={{ textDecoration: "none", color: "whitesmoke" }}
            >
              Login
            </ChakraLink>
          </>
        ) : (
          <Button onClick={handleLogout} colorScheme="red" _hover={{ bg: "red.600" }}>
            Logout
          </Button>
        )}
      </Flex>

      <Modal isOpen={uploadModalOpen} onClose={handleCloseUploadModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload PDF</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UploadPDF onClose={handleCloseUploadModal} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Navbar;
