import React from 'react';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';

const SubjectBox = ({ subject, onClick }) => (
  <Box
    maxW="sm"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    transition="transform 0.2s"
    _hover={{ transform: 'scale(1.05)', bgColor: 'red.100',borderColor: 'red.300' }}
    style={{ borderStyle: 'solid', borderColor: 'gray.300', transformOrigin: '50% 50%', textDecoration: 'none' }}
    onClick={onClick}
    bgColor="gray.200" 
    color="black" 
  >
    <Box p="6">
      <Stack spacing={2}>
        <Heading fontSize="2xl">{subject.name}</Heading>
        <Text>{subject.description}</Text>
        <Text fontWeight="bold">Faculty: {subject.faculty}</Text>
      </Stack>
    </Box>
  </Box>
);

export default SubjectBox;
