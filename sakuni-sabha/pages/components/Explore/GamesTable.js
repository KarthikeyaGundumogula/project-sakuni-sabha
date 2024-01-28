import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import GameRow from "./Row";

const GamesTable = () => {
  return (
    <Box>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "0 20px" }}
      >
        <Table colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Field 1</Th>
              <Th>Field 2</Th>
              <Th>Field 3</Th>
              <Th>Field 4</Th>
              <Th>Field 5</Th>
              <Th>Field 6</Th>
            </Tr>
          </Thead>
          <Tbody>
            <GameRow />
            <GameRow />
            <GameRow />
            <GameRow />
            <GameRow />
          </Tbody>
        </Table>
      </div>
    </Box>
  );
};

export default GamesTable;
