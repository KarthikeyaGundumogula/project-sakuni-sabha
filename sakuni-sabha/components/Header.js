import React from "react";
import { Box, Heading, Flex, Text, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Separator from "./Separator";

const Header = () => {
  const router = useRouter();
  const activeTab = router.pathname.split("/")[1];
  return (
    <Box textAlign="center" py={4}>
      <Heading fontSize="44px" fontWeight="bold" color="white">
        Sakuni Sabha
      </Heading>
      <Flex justifyContent="center" mt={4}>
        <Link href="/about">
          <NavItem isActive={activeTab === "about"}>About</NavItem>
        </Link>
        <Link href="/explore">
          <NavItem isActive={activeTab === "explore"}>Games</NavItem>
        </Link>
        <Link href="/dashboard">
          <NavItem isActive={activeTab === "dashboard"}>Dashboard</NavItem>
        </Link>
      </Flex>
      <Box mt={"-2"}>
        <Separator />
      </Box>
    </Box>
  );
};

const NavItem = ({ isActive, children }) => {
  return (
    <Text
      px={4}
      py={2}
      mx={2}
      fontSize={20}
      fontWeight={isActive ? "bold" : "normal"}
      color={isActive ? "white" : "gray.500"}
      borderBottom={isActive ? "2px solid #00FB0D" : "none"}
      _hover={{ cursor: "pointer", color: "white" }}
    >
      {children}
    </Text>
  );
};

export default Header;
