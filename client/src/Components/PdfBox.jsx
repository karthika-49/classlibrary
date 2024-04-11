import React, { useEffect, useState } from 'react';
import { Box, Heading, Image, useDisclosure, CloseButton } from '@chakra-ui/react';
import pdfLogo from '../assets/pdf_logo.png';
import wordLogo from '../assets/doc_logo.png'; // Import different logos for different file formats
import LoginAlert from './LoginAlert';
import { backendUrl } from '../constants';
import axios from 'axios';

const PdfBox = ({ pdf, onClick, loggedIn, onPdfChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [userId, setUserId] = useState("");

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

      if (!response.data || !response.data.user) {
        throw new Error("User profile data not found.");
      }

      setUserId(response.data.user.userId);
      console.log(pdf.userId, userId);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleDeletePdf = async () => {
    if (!loggedIn) {
      onOpen(); 
      return;
    }
    
    const shouldDelete = window.confirm('Are you sure you want to delete this PDF?');

    if (shouldDelete) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${backendUrl}pdfs/${pdf._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        onPdfChange();
      } catch (error) {
        console.error('Error deleting PDF:', error.response);
      }
    }
  };

  useEffect(() => {
    if (loggedIn && !isInitialRender) {
      onClose();
    }
    setIsInitialRender(false);
  }, [loggedIn, onClose, isInitialRender]);

 
  const getFileExtension = (filename) => {
    return filename.split('.').pop();
  };

  const getLogoForFormat = (filename) => {
    const extension = getFileExtension(filename).toLowerCase();
    switch (extension) {
      case 'pdf':
        return pdfLogo;
      case 'doc':
      case 'docx':
        return wordLogo;
      default:
        return null; 
    }
  };

  return (
    <Box
      key={pdf._id}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      cursor="pointer"
      position="relative"
      bgColor="gray.200"
      color="black"
      transition="transform 0.2s"
      _hover={{ transform: 'scale(1.05)', bgColor: 'red.100', borderColor: 'red.300' }}
      onClick={() => (loggedIn ? onClick() : onOpen())}
    >
     
      {loggedIn && pdf.userId === userId && (
        <CloseButton
          position="absolute"
          top="0"
          right="0"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleDeletePdf();
          }}
        />
      )}

      <Image src={getLogoForFormat(pdf.originalName)} alt="Logo" maxH="100px" mb={2} />
      <Heading fontSize="xs" textAlign="center">
        {pdf.originalName}
      </Heading>

      <LoginAlert isOpen={isOpen} onClose={onClose} msg={"Login to delete"} />
    </Box>
  );
};

export default PdfBox;
