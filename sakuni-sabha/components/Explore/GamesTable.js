import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from "@chakra-ui/react";
import GameRow from "./Row";

const GamesTable = () => {
  return (
    <Box>
      <TableContainer width={"90%"} mx="auto" marginTop={0}>
        <Table size={"sm"} colorScheme={"whatsapp"}>
          <Thead>
            <Tr>
              <Th width={50} color="#00FB0D" fontSize={16} textAlign="center">
                Game-ID
              </Th>
              <Th width={50} color="#00FB0D" fontSize={16} textAlign="center">
                Entry-Fee
              </Th>
              <Th width={50} color="#00FB0D" fontSize={16} textAlign="center">
                Max-Raise
              </Th>
              <Th width={50} color="#00FB0D" fontSize={16} textAlign="center">
                Num-Of-Players
              </Th>
              <Th width={50} color="#00FB0D" fontSize={16} textAlign="center">
                Mode
              </Th>
              <Th width={50} color="#00FB0D" fontSize={16} textAlign="center">
                Status
              </Th>
              <Th
                width={50}
                color="#00FB0D"
                fontSize={16}
                textAlign="center"
              ></Th>
            </Tr>
          </Thead>
          <Tbody>
            <GameRow />
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GamesTable;
