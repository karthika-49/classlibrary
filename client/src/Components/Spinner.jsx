import { Flex, Progress, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { RotatingSquare} from "react-loader-spinner";

const Spinner = ({ msg}) => {
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems="center"
      height={"full"}
      px={10}
    >
      <RotatingSquare color="#718096" height={80} width={80} />
      <Text fontSize={25} textAlign="center" px={2}>
        {msg}
      </Text>
 
    </Flex>
  );
};

export default Spinner;