// PdfBox.jsx
import React, { useEffect, useState } from 'react';
import { Box, Heading, Image, useDisclosure, CloseButton } from '@chakra-ui/react';
import logo from '../assets/pdf_logo.png';
import LoginAlert from './LoginAlert';
import { backendUrl } from '../constants';
import axios from 'axios';

const PdfBox = ({ pdf, onClick, loggedIn, onPdfChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isInitialRender, setIsInitialRender] = useState(true);

  const handleDeletePdf = async () => {
    if (!loggedIn) {
      onOpen(); // Show LoginAlert if not logged in
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

      <Image src={logo} alt="Logo" maxH="100px" mb={2} />
      <Heading fontSize="md" textAlign="center">
        {pdf.originalName}
      </Heading>

      <LoginAlert isOpen={isOpen} onClose={onClose} msg={"Login to delete"}/>
    </Box>
  );
};

export default PdfBox;
