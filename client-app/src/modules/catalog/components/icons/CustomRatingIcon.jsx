// src/components/icons/CustomRatingIcon.jsx

import React from 'react';
import { HStack, useColorModeValue } from '@chakra-ui/react';
import FilledIcon from './FilledIcon';
import OutlineIcon from './OutlineIcon';
import HalfFilledIcon from './HalfFilledIcon';

const CustomRatingIcon = ({ rating }) => {
  const icons = [];
  const colorFilled = 'yellow.400';
  const colorEmpty = useColorModeValue('gray.300', 'gray.600');

  const filledStars = Math.floor(rating);
  const decimalPart = rating - filledStars;
  const hasHalfStar = decimalPart >= 0.25 && decimalPart <= 0.75;
  const totalIcons = 5;

  for (let i = 1; i <= totalIcons; i++) {
    if (i <= filledStars) {
      // Estrellas completas
      icons.push(<FilledIcon key={i} color={colorFilled} />);
    } else if (hasHalfStar && i === filledStars + 1) {
      // Media estrella
      icons.push(<HalfFilledIcon key={i} color={colorFilled} />);
    } else {
      // Estrellas vacías
      icons.push(<OutlineIcon key={i} color={colorEmpty} />);
    }
  }

  return <HStack spacing={0}>{icons}</HStack>;
};

export default CustomRatingIcon;
