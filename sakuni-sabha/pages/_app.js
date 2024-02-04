import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          backgroundColor: "#081223",
        },
      },
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
