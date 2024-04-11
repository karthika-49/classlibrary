import React from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = ({ onSearch }) => {
  return (
    <InputGroup mt={4} mx="auto" maxW="400px"> {/* Set max width and center the search bar */}
      <Input
        variant='filled'
        size='sm'
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        borderRadius="full"
      />
      <InputLeftElement
        pointerEvents="none"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <SearchIcon color="gray.900" />
      </InputLeftElement>
    </InputGroup>
  );
};

export default SearchBar;
