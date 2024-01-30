import React from "react";
import Header from "@/components/Header";
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Code,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

const DicePokerGame = () => {
  return (
    <div>
      <Header />
      <Box p={4} color={"AppWorkspace"} width={"96%"} mx="auto" mt={"-20"}>
        <Heading as="h2" size="lg" mt={4} mb={2} color={"AppWorkspace"}>
          Tokens
        </Heading>
        <UnorderedList color={"#00FB0D"}>
          <ListItem>
            <Text>
              <strong>Plutons</strong> - 10
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <strong>Auroras</strong> - 5
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <strong>Nexos</strong> - 3
            </Text>
          </ListItem>
        </UnorderedList>

        <Heading as="h2" size="lg" mt={4} mb={2}>
          Assets
        </Heading>

        <Text>
          <strong>Maneuvers</strong>
        </Text>

        <UnorderedList color={"#00FB0D"}>
          <ListItem>
            <Text>
              <strong>Fortress</strong> - 25,000
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <strong>Castle</strong> - 20,000
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <strong>Stronghold</strong> - 10,000
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <strong>Bastion</strong> - 7,500
            </Text>
          </ListItem>
        </UnorderedList>

        <Text>
          <strong>Conquest</strong>
        </Text>

        <UnorderedList color={"#00FB0D"}>
          <ListItem>
            <Text>
              <strong>Imperial Apex</strong> - 100,000
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <strong>Citadel</strong> - 75,000
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <strong>Grandeur</strong> - 50,000
            </Text>
          </ListItem>
        </UnorderedList>

        <Heading as="h2" size="lg" mt={4} mb={2}>
          Modes
        </Heading>

        <Text>There are two modes to play this game:</Text>

        <UnorderedList color={"#00FB0D"}>
          <ListItem>
            <Text>
              <strong>Expedition</strong>
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <strong>Siege</strong>
            </Text>
          </ListItem>
        </UnorderedList>

        <Heading as="h3" size="md" mt={4} mb={2}>
          Expedition Mode
        </Heading>

        <Text color={"#00FB0D"}>
          In this mode, a host creates a game, sets the total number of rounds
          (up to 5 max), and the bet for that game. Interested players join the
          game using the game code or from the explore. Players then place their
          bets, and the host starts the game by rolling dice. After each round,
          players can raise the bet as like in poker, but the rise value cannot
          be more than the . After five rounds, the player with the highest
          score wins the board, and the game concludes.
        </Text>

        <Heading as="h3" size="md" mt={4} mb={2}>
          Siege Mode
        </Heading>

        <Text color={"#00FB0D"}>
          This is a multilevel version of Expedition mode, consisting of three
          levels:
        </Text>

        <UnorderedList color={"#00FB0D"}>
          <ListItem>
            <Text>Bootcamp - 3 rounds</Text>
          </ListItem>
          <ListItem>
            <Text>Maneuver - 2 rounds</Text>
          </ListItem>
          <ListItem>
            <Text>Conquest - 1 round</Text>
          </ListItem>
        </UnorderedList>

        <Text color={"#00FB0D"}>
          After Bootcamp, the winner gets 25% of the total bet and moves to
          Maneuver. In this level, players can bet assets. If anyone can't
          afford, they have to drop at the beginning. If all players drop, the
          player with the highest score wins the board, and the game is over.
          After the Maneuver level, the winners get 50% of the total bet and
          then move to Conquest. In this level, players can bet more expensive
          assets like Citadel, Grandeur, and Imperial Apex. For Maneuver, the
          player must have a Maneuver Asset, and for Conquest, the player must
          have a Conquest Asset. A player can buy an asset during the game as
          well.
        </Text>

        <Heading as="h2" size="lg" mt={4} mb={2}>
          Poker Hand Values
        </Heading>

        <Text color={"#00FB0D"}>
          This table outlines the values assigned to different poker hands and
          additional bonuses within the game. Use this reference to understand
          the scoring system and strategize your way to victory in the eternal
          war.
        </Text>

        <Heading as="h2" size="lg" mt={4} mb={2}>
          Dice Combinations Table
        </Heading>

        <Table variant="simple" w={"60%"} mx="auto">
          <Thead>
            <Tr color={"#00FEBD"}>
              <Th>Poker Hands</Th>
              <Th>Example</Th>
              <Th>Points</Th>
            </Tr>
          </Thead>
          <Tbody color={"#00FB0D"}>
            <Tr>
              <Td>Pair</Td>
              <Td>Two 5s, Two 4s</Td>
              <Td>5</Td>
            </Tr>
            <Tr>
              <Td>Two Pairs</Td>
              <Td>Two 2s + Two 5s</Td>
              <Td>10</Td>
            </Tr>
            <Tr>
              <Td>Three of a Kind</Td>
              <Td>Three 6s, Three 8s, Three 4s</Td>
              <Td>15</Td>
            </Tr>
            <Tr>
              <Td>Straight</Td>
              <Td>1-2-3-4 (4 Order sequence)</Td>
              <Td>20</Td>
            </Tr>
            <Tr>
              <Td>Royal Flush</Td>
              <Td>1-2-3-4-5 (5 order sequence)</Td>
              <Td>25</Td>
            </Tr>
            <Tr>
              <Td>Full House</Td>
              <Td>Three 2s + Two 3s, Three 4s + Two 4s</Td>
              <Td>30</Td>
            </Tr>
            <Tr>
              <Td>Four of a Kind</Td>
              <Td>Four 5s</Td>
              <Td>40</Td>
            </Tr>
            <Tr>
              <Td>Five of a Kind</Td>
              <Td>Five 6s, Five 2s</Td>
              <Td>50</Td>
            </Tr>
            <Tr>
              <Td>Steal one die (Conquest)</Td>
              <Td>All of a kind (activated at the advanced level)</Td>
              <Td>--</Td>
            </Tr>
            <Tr>
              <Td>Lock values of a dice (Conquest)</Td>
              <Td>All Null</Td>
              <Td>--</Td>
            </Tr>
            <Tr>
              <Td>Retreat (get an extra reroll)</Td>
              <Td>Any straight (Activated at the advanced level)</Td>
              <Td>--</Td>
            </Tr>
            <Tr>
              <Td>Bust dice (Maneuver and Conquest)</Td>
              <Td>Get a replacement die from the house for tokens</Td>
              <Td>--</Td>
            </Tr>
          </Tbody>
        </Table>

        <Heading as="h2" size="lg" mt={4} mb={2}>
          How to Use
        </Heading>

        <UnorderedList>
          <ListItem>
            <Text color={"#00FB0D"}>
              <strong>Example:</strong> For a Pair of 4s, refer to the "Pair"
              row and find the corresponding example and points.
            </Text>
          </ListItem>
        </UnorderedList>
      </Box>
    </div>
  );
};

export default DicePokerGame;
