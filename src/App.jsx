import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, ChakraProvider, extendTheme, CSSReset, useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import Index from "./pages/Index.jsx";
import AddPost from "./pages/AddPost.jsx";

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [theme, setTheme] = useState(extendTheme({
    initialColorMode: "light",
    useSystemColorMode: false,
  }));

  useEffect(() => {
    const savedColorMode = localStorage.getItem("chakra-ui-color-mode");
    if (savedColorMode) {
      setTheme(extendTheme({
        initialColorMode: savedColorMode,
        useSystemColorMode: false,
      }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", colorMode);
  }, [colorMode]);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box textAlign="center" fontSize="xl">
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          position="fixed"
          top="1rem"
          right="1rem"
        />
        <Router>
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route path="/add-post" element={<AddPost />} />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
};

export default App;