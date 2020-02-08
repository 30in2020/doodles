import React from "react";
import { Box } from "@chakra-ui/core";

const GridLayer: React.FC = () => {
  return (
    <>
      <Box gridColumn="1 / 2" bg="blue.500" />
      <Box gridColumn="2 / 3" bg="blue.500" />
      <Box gridColumn="3 / 4" bg="blue.500" />
      <Box gridColumn="4 / 5" bg="blue.500" />
      <Box gridColumn="5 / 6" bg="blue.500" />
      <Box gridColumn="6 / 7" bg="blue.500" />
      <Box gridColumn="7 / 8" bg="blue.500" />
      <Box gridColumn="8 / 9" bg="blue.500" />
      <Box gridColumn="9 / 10" bg="blue.500" />
      <Box gridColumn="10 / 11" bg="blue.500" />
      <Box gridColumn="11 / 12" bg="blue.500" />
      <Box gridColumn="12 / 13" bg="blue.500" />
    </>
  );
};

export { GridLayer };
