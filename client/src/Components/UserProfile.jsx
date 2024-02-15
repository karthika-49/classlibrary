
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Flex, Heading, Text, Grid } from "@chakra-ui/react";
import Spinner from "./Spinner"; 
import PdfBox from "./PdfBox";
import SearchBar from "./SearchBar";
import LoginAlert from "./LoginAlert";
import { backendUrl } from "../constants";
import { useNavigate,useParams } from "react-router-dom";
const UserProfile = ({ loggedIn }) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    const filteredPdfData = pdfs.filter((pdf) =>
      pdf.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPdfs(filteredPdfData);
  };

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
      console.log(user,"user");
      fetchUserPdfs(response.data.user.userId);
    } catch (error) {
      console.error("Error fetching user:", error);
      navigate("/login");
    }
  };

  const fetchUserPdfs = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${backendUrl}pdfs/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.data) {
        console.log("No PDFs found for the user");
        return;
      }

      setPdfs(response.data);
      setFilteredPdfs(response.data);
    } catch (error) {
      console.error("Error fetching user PDFs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const onPdfChange = () => {
    fetchUserPdfs(user.userId); // Pass the userId when invoking fetchUserPdfs
  };

  return (
    <Flex
      p={4}
      justifyContent={"center"}
      alignItems={"center"}
      alignSelf={"center"}
      justifySelf={"center"}
      flexDir={"column"}
    >
      <Heading as="h1" size="lg" mb={4}>
        User Profile
      </Heading>
      
      {user && (
        <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
          <Text fontWeight="bold">Email:</Text>
          <Text>{user.email}</Text>
          <Text fontWeight="bold" mt={2}>
            User ID:
          </Text>
          <Text>{user.userId}</Text>
        </Box>
      )}

      <Box display="flex" flexDirection="column" minHeight="90vh" width="90%">
        <Box p={4} flex="1">
          <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
            Your files
          </Text>
          <SearchBar onSearch={handleSearch} />

          {isLoading ? (
            <Spinner msg="Loading PDFs..." />
          ) : (
            <>
              {showLoginAlert && <LoginAlert />}
              <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4} mt={4}>
                {filteredPdfs.map((pdf) => (
                  <PdfBox
                    key={pdf._id}
                    pdf={pdf}
                    onClick={() => window.open(`${backendUrl}files/${pdf.title}`, "_blank")}
                    loggedIn={loggedIn}
                    onPdfChange={onPdfChange} // Pass onPdfChange function
                  />
                ))}
              </Grid>
            </>
          )}
        </Box>
        <Text
          style={{ marginTop: "10px", fontSize: "12px", color: "#888", alignSelf: "center" }}
        >
          &copy; 2024 Karthika Bingi. All rights reserved.
        </Text>
      </Box>
    </Flex>
  );
};

export default UserProfile;
