import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom'
import { Grid, Stack, Text, Box } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import SubjectBox from './SubjectBox';
import { backendUrl } from '../constants';
import Spinner from './Spinner';

const Library = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem('token');

        setIsLoading(true);
        
        const response = await axios.get(`${backendUrl}subjects/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubjectClick = (subjectName) => {
    navigate(`/subjects/${subjectName}`);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="90vh">
      <Stack spacing={{ base: '20px', md: '50px' }} align="center" p={{ base: '20px', md: '100px' }}>
        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" mt={4} textAlign="center">
          Select a subject
        </Text>
        {isLoading ? (
          <Spinner msg="Loading subjects..." />
        ) : (
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={4}
          >
            {subjects.map((subject, index) => (
              <Link key={subject._id} to={`/subjects/${subject.name}`}>
                <SubjectBox subject={subject} />
              </Link>
            ))}
          </Grid>
        )}
      </Stack>
      <Text
        style={{ marginTop: 'auto', fontSize: '12px', color: '#888', alignSelf: 'center' }}
      >
        &copy; 2024 Karthika Bingi. All rights reserved.
      </Text>
    </Box>
  );
};

export default Library;
