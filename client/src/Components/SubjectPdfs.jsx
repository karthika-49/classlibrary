import React, { useState, useEffect } from 'react';
import { Box, Grid, Text, Flex } from '@chakra-ui/react';
import PdfBox from './PdfBox';
import SearchBar from './SearchBar';
import Spinner from './Spinner'; // Import the Spinner component
import { backendUrl } from '../constants';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SubjectPdfs = ({ loggedIn }) => {
  const { subjectName } = useParams();
  const [pdfs, setPdfs] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPdfs = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${backendUrl}pdfs/${subjectName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const pdfData = response.data;

      const sortedPdfs = pdfData.sort((a, b) => a.originalName.localeCompare(b.originalName));
      const files = sortedPdfs.filter((pdf) => !pdf.originalName.includes("SYLLABUS"));
      setPdfs(files);
      setFilteredPdfs(files);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, [subjectName]);

  const handleSearch = (searchTerm) => {
    const filteredPdfData = pdfs.filter((pdf) => {
      const subjectLower = pdf.subject.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      return subjectLower.includes(searchTermLower) || subjectLower.indexOf(searchTermLower) !== -1;
    });
    setFilteredPdfs(filteredPdfData);
  };

  const onPdfChange = () => {
    fetchPdfs();
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="90vh">
      <Box p={4} flex="1">
        <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
          Files for {subjectName}
        </Text>
        <SearchBar onSearch={handleSearch} />

        {isLoading ? (
          <Spinner msg="Loading PDFs..." />
        ) : filteredPdfs.length === 0 ? ( // Check if no PDFs are available for the subject
          <Text fontSize="xl" mt='25vh' textAlign="center" fontFamily={'cursive'}>
           Oops! No files have been uploaded for this subject.
          </Text>
        ) : (
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4} mt={4}>
            {filteredPdfs.map((pdf) => (
              <PdfBox
                key={pdf._id}
                pdf={pdf}
                onClick={() => window.open(`${backendUrl}files/${pdf.title}`, '_blank')}
                loggedIn={loggedIn}
                userId={pdf.userId}
                onPdfChange={onPdfChange}
              />
            ))}
          </Grid>
        )}
      </Box>
      <Text
        style={{ marginTop: '10px', fontSize: '12px', color: '#888', alignSelf: 'center' }}
      >
        &copy; 2024 Karthika Bingi. All rights reserved.
      </Text>
    </Box>
  );
};

export default SubjectPdfs;
