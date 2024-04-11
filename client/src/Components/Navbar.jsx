import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoLogOutOutline,IoPersonOutline } from "react-icons/io5";
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import UploadPDF from "./UploadPDF";
import { backendUrl } from "../constants";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Navbar = ({ loggedIn, onLogout }) => {
  const [user, setUser] = useState({});
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      fetchUser();
    }
  }, [loggedIn]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${backendUrl}user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.data) {
        navigate("/login");
        return;
      }

      setUser(response.data.user);
      // console.log(response.data.user)
    } catch (error) {
      console.error("Error fetching user:", error);
      navigate("/login");
    }
  };

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
        _hover={{ textDecoration: "none", color: "whitesmoke" }}
      >
        <Flex>Class Library</Flex>
      </ChakraLink>

      <Flex justifyContent="space-around" alignItems="center" width="50vw">
        <ChakraLink
          as={RouterLink}
          to="/subjects"
          mx={3}
          _hover={{ textDecoration: "none", color: "whitesmoke" }}
        >
          Subjects
        </ChakraLink>

        {loggedIn && (
          <Button
            mx={3}
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
              mx={3}
              _hover={{ textDecoration: "none", color: "whitesmoke" }}
            >
              Signup
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/login"
              mx={3}
              _hover={{ textDecoration: "none", color: "whitesmoke" }}
            >
              Login
            </ChakraLink>
          </>
        ) : (
          <Menu>
            <MenuButton>
              <Avatar size="sm" name={user.email} />
            </MenuButton>
            <MenuList>
              <MenuItem
                style={{ color: "black", fontSize: "15px" }}
                as={RouterLink}
                to={`/user/${user.userId}`}
              >
                 <Text marginRight={'5px'}>My Profile </Text><IoPersonOutline />

              </MenuItem>
              <MenuItem
                style={{ color: "black", fontSize: "15px" }}
                onClick={handleLogout}
              >
                <Text marginRight={'5px'}>Logout </Text><IoLogOutOutline />

              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>

      <Modal isOpen={uploadModalOpen} onClose={handleCloseUploadModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UploadPDF loggedIn={loggedIn} onClose={handleCloseUploadModal} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Navbar;
