// LoginAlert.jsx
import React from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";

const LoginAlert = ({ isOpen, onClose }) => (
  <AlertDialog isOpen={isOpen} onClose={onClose}>
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Login Required
        </AlertDialogHeader>

        <AlertDialogBody>
          You need to login!
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button bgColor="gray.400" onClick={onClose}>
            Close
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
);

export default LoginAlert;
