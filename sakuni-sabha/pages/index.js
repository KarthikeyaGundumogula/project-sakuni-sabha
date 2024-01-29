import React from "react";
import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";
import GamesTable from "../components/Explore/GamesTable.js";
import Header from "../components/Header.js";

const Home = () => {
  return (
    <>
      <Header />
      <Box marginTop="-8">
        <GamesTable />
      </Box>
    </>
  );
};

export default Home;
