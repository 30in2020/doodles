import React from "react";
import { Box } from "@chakra-ui/core";

const SideBar: React.FC = () => {
  return (
    <Box as="nav" gridColumn={"1 / 4"} bg="red.500">
      SideBar
    </Box>
  );
};

export { SideBar };
