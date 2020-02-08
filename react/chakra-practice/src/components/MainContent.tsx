import React from "react";
import { Box } from "@chakra-ui/core";

const MainContent: React.FC = () => {
  return (
    <Box as="main" gridColumn={"5 / 13"} bg="yellow.500">
      Content
    </Box>
  );
};

export { MainContent };
