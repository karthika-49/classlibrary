import React, { useState, useEffect } from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';
import Spinner from './Spinner'; // Import the Spinner component
import PdfBox from './PdfBox';
import LoginAlert from './LoginAlert';
import SearchBar from './SearchBar';
import { backendUrl } from '../constants';
import axios from 'axios';
// import Chatbot from './Chatbot';

const HomePage = ({ loggedIn }) => {
  const [pdfs, setPdfs] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllPdfs = async () => {
    try {
      const token = localStorage.getItem('token');
      setIsLoading(true);

      const response = await axios.get(`${backendUrl}pdfs/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const pdfData = response.data;
      const syllabus = pdfData.filter((pdf)=>pdf.originalName.includes("SYLLABUS"))
      // console.log(syllabus)
      setPdfs(syllabus);
      setFilteredPdfs(syllabus);

      if (!loggedIn) {
        setShowLoginAlert(true);
      }
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    const filteredPdfData = pdfs.filter((pdf) =>
      pdf.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPdfs(filteredPdfData);
  };

  const onPdfChange = () => {
    fetchAllPdfs();
  };

  useEffect(() => {
    fetchAllPdfs();
  }, [loggedIn]);

  return (
    <Box display="flex" flexDirection="column" minHeight="90vh">
      <Box p={4} flex="1">
        <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
          Syllabus
        </Text>
        <SearchBar onSearch={handleSearch} />

        {isLoading ? (
          <Spinner msg="Loading Files..." />
        ) : (
          <>
            {showLoginAlert && <LoginAlert />}
            <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4} mt={'20px'}>
              {filteredPdfs.map((pdf) => (
                <PdfBox
                  key={pdf._id}
                  pdf={pdf}
                  onClick={() => window.open(`${backendUrl}files/${pdf.title}`, '_blank')}
                  loggedIn={loggedIn}
                  onPdfChange={onPdfChange}
                />
              ))}
            </Grid>
          </>
        )}
      </Box>
      <Text
        style={{ marginTop: '10px', fontSize: '12px', color: '#888', alignSelf: 'center' }}
      >
        &copy; 2024 Karthika Bingi. All rights reserved.
      </Text>
      {/* <Chatbot/> */}
    </Box>
  );
};

export default HomePage;
