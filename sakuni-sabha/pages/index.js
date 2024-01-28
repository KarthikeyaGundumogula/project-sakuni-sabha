import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import GamesTable  from "./components/Explore/GamesTable.js";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#081223",
        color: "#00fB0D",
      },
    },
  },
});

const Home = () => {
  return (
    <ChakraProvider theme={theme}>
      <GamesTable />
    </ChakraProvider>
  );
};

export default Home;
