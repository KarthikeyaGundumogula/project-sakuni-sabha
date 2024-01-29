import { Box, Text } from "@chakra-ui/react";

const Separator = () => (
  <Box position="relative">
    <svg width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="pattern"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="5"
            y1="45"
            x2="25"
            y2="45"
            stroke="white"
            stroke-width="2"
          />
          <polygon points="30,45 40,40 50,45 40,50" fill="white" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern)" />
    </svg>
  </Box>
);

export default Separator;
