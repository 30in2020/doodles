import React from "react";
import {
  Box,
  Button,
  ThemeProvider,
  ColorModeProvider,
  useColorMode,
  CSSReset,
  Grid
} from "@chakra-ui/core";
import customTheme from "./theme";
import "./App.css";

function TurnOnColorMode({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <ColorModeProvider>{children}</ColorModeProvider>
    </ThemeProvider>
  );
}

const color = { light: "white", dark: "gray.800" };

const App: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(colorMode);
  return (
    // <Box textAlign="center" p={10} bg={color[colorMode]}>
    //   <header>
    //     <Button
    //       bg={colorMode === "light" ? "gray.800" : "white"}
    //       color={colorMode === "light" ? "white" : "gray.800"}
    //       _hover={{
    //         bg: colorMode === "light" ? "gray.800" : "white"
    //       }}
    //       onClick={toggleColorMode}
    //     >
    //       Toggle {colorMode === "light" ? "Dark" : "Light"}
    //     </Button>
    //   </header>
    // </Box>

    <Grid
      // TODO: How to write templateAreas inline?
      // templateAreas={[
      //   "header header header header header header header header header header header header",
      //   "sidebar sidebar sidebar . main main main main main main main main",
      //   "footer footer footer footer footer footer footer footer footer footer footer footer"
      // ]}
      className="grid"
      templateRows="100px 400px 50px"
      templateColumns="repeat(12, 1fr)"
      gap={6}
    >
      <Box gridArea="header" w="100%" bg="blue.500" />
      <Box gridArea="sidebar" w="100%" bg="red.500">
        SideBar
      </Box>
      <Box gridArea="main" w="100%" bg="yellow.500">
        Content
      </Box>
      <Box gridArea="footer" w="100%" bg="green.500" />
    </Grid>
  );
};

export default App;
export { TurnOnColorMode };