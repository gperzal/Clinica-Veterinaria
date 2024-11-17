import React from 'react';
import { HStack, Icon, Box } from '@chakra-ui/react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

function Rating({ rating, numReviews }) {
  const MAX_STARS = 5;
  const stars = [];

  for (let i = 0; i < MAX_STARS; i++) {
    const difference = rating - i;

    if (difference >= 1) {
      stars.push(<Icon as={BsStarFill} key={i} color="teal.500" />);
    } else if (difference >= 0.5) {
      stars.push(<Icon as={BsStarHalf} key={i} color="teal.500" />);
    } else {
      stars.push(<Icon as={BsStar} key={i} color="teal.500" />);
    }
  }

  return (
    <HStack spacing="1">
      {stars}
      {numReviews !== undefined && (
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          ({numReviews})
        </Box>
      )}
    </HStack>
  );
}

export default Rating;
