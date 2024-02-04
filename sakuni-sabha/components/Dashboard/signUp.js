import { useEffect, useState } from "react";
import { useMoonSDK } from "../Hooks/moon";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Center,
} from "@chakra-ui/react";
import Header from "../Header";

// Signup Component
function SignupPage() {
  const { moon, initialize, disconnect } = useMoonSDK();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const handleSignup = async () => {
    try {
      // Check if Moon SDK is properly initialized and user is authenticated
      if (!moon) {
        console.error("User not authenticated");
        return;
      }

      const message = await moon.getAuthSDK().emailSignup({
        email,
        password,
      });
      console.log(message);
    } catch (error) {
      console.error(error);
    }
  };

  // Use useEffect to initialize Moon SDK on component mount
  useEffect(() => {
    initialize();

    // Cleanup Moon SDK on component unmount
    return () => {
      disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <Center h="100vh">
        <Box w="md" p={8} borderWidth={1} borderRadius="lg" color={"#00fb0d"}>
          <VStack spacing={4}>
            <Heading as="h2" size="lg">
              Create Moon Account
            </Heading>
            <FormControl id="email">
              <FormLabel>Email:</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password:</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button onClick={handleSignup}>Sign up</Button>
          </VStack>
        </Box>
      </Center>
    </>
  );
}

export default SignupPage;
