import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Stack,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { backendUrl } from "../constants";

const UploadPDF = ({ loggedIn, onClose }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [pdfTitle, setPdfTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [userId, setUserId] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showEmptyFieldsAlert, setShowEmptyFieldsAlert] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      fetchUser();
      fetchSubjects();
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
      console.log(response.data.userId);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${backendUrl}subjects/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error.message);
    }
  };

  const handleUploadPDF = async () => {
    try {
      if (!selectedSubject || !pdfTitle || !pdfFile) {
        console.error("Please fill in all fields.");
        setShowEmptyFieldsAlert(true);
        setTimeout(() => {
          setShowEmptyFieldsAlert(false);
        }, 1000);
        return;
      }

      setUploadSuccess(true);

      const formData = new FormData();
      formData.append("subject", selectedSubject);
      formData.append("title", pdfTitle);
      formData.append("userId", userId); // Add userId to the form data
      formData.append("url", "temp-url"); 
      formData.append("file", pdfFile);

      const token = localStorage.getItem("token");
      await axios.post(`${backendUrl}pdfs/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        setUploadSuccess(false);
      }, 1000); 
      onClose();
    } catch (error) {
      console.error("Error uploading PDF:", error.message);
    }
  };
  
  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>Subject</FormLabel>
        <Select
          placeholder="Select subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {subjects.map((subject) => (
            <option key={subject._id} value={subject.name}>
              {subject.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>File Title</FormLabel>
        <Input
          type="text"
          placeholder="Enter File title"
          value={pdfTitle}
          onChange={(e) => setPdfTitle(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Upload File</FormLabel>
        <Input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setPdfFile(e.target.files[0])}
        />
        <Text fontSize="sm" mt="2"> 
          Please upload a file. (RELOAD AFTER UPLOADING)
        </Text>
      </FormControl>

      <Button bgColor={"gray.400"} onClick={handleUploadPDF}>
        Upload
      </Button>
      {showEmptyFieldsAlert && (
        <Alert status="warning">
          <AlertIcon />
          Please fill in all fields.
        </Alert>
      )}
      {uploadSuccess && (
        <Alert status="success">
          <AlertIcon />
          PDF uploaded successfully!
        </Alert>
      )}
    </Stack>
  );
};

export default UploadPDF;
