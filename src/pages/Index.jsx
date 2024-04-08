import React, { useState } from "react";
import { Box, Button, Center, Heading, Input, List, ListItem, Text, VStack } from "@chakra-ui/react";

const values = ["Honesty", "Loyalty", "Respect", "Responsibility", "Compassion", "Courage", "Perseverance", "Integrity", "Gratitude", "Forgiveness", "Humility", "Patience", "Kindness", "Generosity", "Creativity"];

const Index = () => {
  const [stage, setStage] = useState("home");
  const [selectedValues, setSelectedValues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rankings, setRankings] = useState([]);

  const handleStart = () => {
    setStage("selection");
  };

  const handleSelect = (value) => {
    if (selectedValues.length < 10 && !selectedValues.includes(value)) {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleCompare = () => {
    setStage("comparison");
  };

  const handleComparison = (value1, value2) => {
    const newRankings = [...rankings];
    const index1 = newRankings.findIndex((item) => item.value === value1);
    const index2 = newRankings.findIndex((item) => item.value === value2);

    if (index1 === -1) {
      newRankings.push({ value: value1, wins: 1 });
    } else {
      newRankings[index1].wins++;
    }

    if (index2 === -1) {
      newRankings.push({ value: value2, wins: 0 });
    }

    setRankings(newRankings);

    if (newRankings.length === 10 && newRankings.every((item) => item.wins + item.losses === 9)) {
      setStage("ranking");
    }
  };

  const filteredValues = values.filter((value) => value.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box>
      {stage === "home" && (
        <Center h="100vh">
          <VStack spacing={8}>
            <Heading>Welcome to the Value Rating App</Heading>
            <Text>Discover your top values by selecting and comparing them in this simple app.</Text>
            <Button colorScheme="blue" onClick={handleStart}>
              Start Rating
            </Button>
          </VStack>
        </Center>
      )}

      {stage === "selection" && (
        <Box p={8}>
          <Heading mb={8}>Select Your Top 10 Values</Heading>
          <Input placeholder="Search values..." mb={4} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <List spacing={2}>
            {filteredValues.map((value) => (
              <ListItem key={value} cursor="pointer" onClick={() => handleSelect(value)} color={selectedValues.includes(value) ? "blue.500" : "inherit"}>
                {value}
              </ListItem>
            ))}
          </List>
          {selectedValues.length === 10 && (
            <Button mt={8} colorScheme="blue" onClick={handleCompare}>
              Compare Values
            </Button>
          )}
        </Box>
      )}

      {stage === "comparison" && (
        <Box p={8}>
          <Heading mb={8}>Compare Values</Heading>
          {selectedValues.map((value1, index1) =>
            selectedValues.slice(index1 + 1).map((value2, index2) => (
              <Box key={`${value1}-${value2}`} mb={4}>
                <Text>
                  Which is more important to you: {value1} or {value2}?
                </Text>
                <Button mr={4} onClick={() => handleComparison(value1, value2)}>
                  {value1}
                </Button>
                <Button onClick={() => handleComparison(value2, value1)}>{value2}</Button>
              </Box>
            )),
          )}
        </Box>
      )}

      {stage === "ranking" && (
        <Box p={8}>
          <Heading mb={8}>Your Value Rankings</Heading>
          <List spacing={2}>
            {rankings
              .sort((a, b) => b.wins - a.wins)
              .map((item, index) => (
                <ListItem key={item.value}>
                  {index + 1}. {item.value} (Wins: {item.wins})
                </ListItem>
              ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Index;
