import React, { useState } from 'react';
import { HStack, IconButton, Input, Tag, TagCloseButton, TagLabel, Heading, Box, useColorModeValue } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

const AllergiesSection = () => {
  // Definir estados para allergies y newAllergy
  const [allergies, setAllergies] = useState([]);
  const [newAllergy, setNewAllergy] = useState("");

  const handleAddAllergy = () => {
    if (newAllergy.trim()) {
      setAllergies([...allergies, newAllergy]);
      setNewAllergy('');
    }
  };

  const handleRemoveAllergy = (allergy) => {
    setAllergies(allergies.filter(a => a !== allergy));
  };

  return (
    <Box as="section" w="full" p={4} borderWidth="1px" borderRadius="lg" bg={useColorModeValue("gray.50", "gray.800")}>
      <Heading size="md" color="teal.500" mb={4}>Alergias</Heading>
      <HStack>
        <Input
          placeholder="Añadir alergia"
          value={newAllergy}
          onChange={(e) => setNewAllergy(e.target.value)}
        />
        <IconButton icon={<FaPlus />} colorScheme="teal" onClick={handleAddAllergy} />
      </HStack>
      <Box mt={4}>
        {allergies.map((allergy, index) => (
          <Tag key={index} size="lg" colorScheme="red" m={1}>
            <TagLabel>{allergy}</TagLabel>
            <TagCloseButton onClick={() => handleRemoveAllergy(allergy)} />
          </Tag>
        ))}
      </Box>
    </Box>
  );
};

export default AllergiesSection;
