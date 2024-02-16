import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Flex, Heading, Text, Grid, Button } from "@chakra-ui/react";
import Spinner from "./Spinner";
import PdfBox from "./PdfBox";
import LoginAlert from "./LoginAlert";
import { backendUrl } from "../constants";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = ({ loggedIn }) => {
  const { userId } = useParams();
  const [pdfs, setPdfs] = useState([]);
  const [user, setUser] = useState({});
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState("Enter your name here");
  const navigate = useNavigate();

  
  useEffect(() => {
    if (loggedIn) {
      fetchUser();
    }
  }, [loggedIn]);

  const handleEditClick = () => {
    setIsEditable(true);
    setInputValue(user.name); // Setting input value to user's current name
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${backendUrl}user/profile`,
        { name: inputValue }, // Sending inputValue to the server
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUser({ ...user, name: inputValue }); // Updating user's name
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const fetchUser = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching user:", error);
      navigate("/login");
    }
  };

  const fetchAllPdfs = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsLoading(true);

      const response = await axios.get(`${backendUrl}pdfs/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let pdfData = response.data;
      pdfData = pdfData.filter((pdf) => pdf.userId === userId);

      setPdfs(pdfData);
      setFilteredPdfs(pdfData);

      if (!loggedIn) {
        setShowLoginAlert(true);
      }
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    } finally {
      setIsLoading(false);
    }
  };

 

  const onPdfChange = () => {
    fetchAllPdfs();
  };

  useEffect(() => {
    fetchAllPdfs();
  }, [loggedIn]);

  return (
    <Flex
      p={4}
      justifyContent={"center"}
      alignItems={"center"}
      alignSelf={"center"}
      justifySelf={"center"}
      flexDir={"column"}
    >
    
      {user && (
        <>
          <Flex alignItems="center">
            <Box mr={4}>
              <Text><b>Email:</b> {user.email}</Text>
              <Text><b>User ID:</b> {user.userId}</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" flexDir={'column'}>
            <Box>
              {isEditable ? (
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Enter your name here"
                  style={{
                    border: "1px solid black",
                    borderRadius: "5px",
                    marginRight: "8px",
                  }}
                />
              ) : (
                <Text
                  style={
                    isEditable
                      ? {
                          border: "1px solid black",
                          borderRadius: "5px",
                          marginRight: "8px",
                        }
                      : {
                        marginRight: "8px",
                      }
                  }
                ><b>Name : </b>
                  {user.name ? user.name : "Click edit to enter your name"}
                </Text>
              )}
            </Box>

            <Button onClick={isEditable ? handleSave : handleEditClick} marginTop={'5px'}>
              {isEditable ? "Save" : "Edit"}
            </Button>
          </Flex>
        </>
      )}

      <Box display="flex" flexDirection="column" minHeight="65vh" width="100%">
        <Box p={4} flex="1">
          <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
            Your files
          </Text>

          {isLoading ? (
            <Spinner msg="Loading PDFs..." />
          ) : (
            <>
              {showLoginAlert && <LoginAlert />}
              <Grid
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                gap={4}
                mt={4}
              >
                {filteredPdfs.map((pdf) => (
                  <PdfBox
                    key={pdf._id}
                    pdf={pdf}
                    onClick={() =>
                      window.open(`${backendUrl}files/${pdf.title}`, "_blank")
                    }
                    loggedIn={loggedIn}
                    onPdfChange={onPdfChange}
                  />
                ))}
              </Grid>
            </>
          )}
        </Box>
        <Text
          style={{
            marginTop: "10px",
            fontSize: "12px",
            color: "#888",
            alignSelf: "center",
          }}
        >
          &copy; 2024 Karthika Bingi. All rights reserved.
        </Text>
      </Box>
    </Flex>
  );
};

export default UserProfile;
