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
      className="grid"
      templateColumns="repeat(12, 1fr)"
      autoRows="minmax(100px, auto)"
    >
      <Box as="nav" gridColumn={["1 / 4", "1 / 4", "1 / 3"]} bg="red.500">
        SideBar
      </Box>
      <Box
        as="main"
        gridColumn={["5 / 13", "5 / 13", "5 / 13"]}
        bg="yellow.500"
      >
        Content
      </Box>
    </Grid>
  );
};

export default App;
export { TurnOnColorMode };
