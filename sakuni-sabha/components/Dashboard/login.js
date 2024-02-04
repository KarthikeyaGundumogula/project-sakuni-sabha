import { use, useEffect, useState } from "react";
import { useMoonSDK } from "../Hooks/moon";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
} from "@chakra-ui/react";
import Header from "../Header";

// Signup Component
function LoginPage() {
  const { moon, initialize, disconnect } = useMoonSDK();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Check if Moon SDK is properly initialized and user is authenticated
      if (!moon) {
        console.error("User not authenticated");
        setIsLoading(false);
        return;
      }

      const message = await moon.getAuthSDK().emailLogin({
        email,
        password,
      });
      const { token, refreshToken } = message.data;

      moon.updateToken(token);
      moon.updateRefreshToken(refreshToken);
      console.log("User logged in successfully", token);
      // Get user's wallet address
      const accounts = await moon.listAccounts();
      console.log("User's wallet address", accounts);
      setWalletAddress(accounts.data.keys[0]);
      console.log("User's wallet address", accounts.data.keys[0]);
      const bal = await moon
        .getAccountsSDK()
        .getBalance(walletAddress, { chainId: "1891" });
      console.log("User's wallet balance", bal);
      router.push(`/dashboard/${accounts.data.keys[0]}`);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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
      <Modal isOpen={isLoading} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Box display="flex" justifyContent="center" alignItems="center" p={4}>
            <Spinner size="xl" color={"00fb0d"} />
          </Box>
        </ModalContent>
      </Modal>
      <Center h="100vh" mt={"-50"}>
        <Box w="md" p={8} borderWidth={1} borderRadius="lg" color={"#00fb0d"}>
          <VStack spacing={4}>
            <Heading as="h2" size="lg">
              LogIn Moon Account
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
            <Button onClick={handleLogin}>Sign up</Button>
          </VStack>
        </Box>
      </Center>
    </>
  );
}

export default LoginPage;
