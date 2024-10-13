// src/components/icons/HalfFilledIcon.jsx

import React, { useId } from 'react';
import { useColorModeValue } from '@chakra-ui/react';

const HalfFilledIcon = (props) => {
  const id = useId();
  const fillColor = useColorModeValue('black', 'white');
  const strokeColor = useColorModeValue('black', 'white');

  // Definimos un color de contorno que contraste con el relleno
  const outlineColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <defs>
        <clipPath id={`half-${id}`}>
          <rect x="0" y="0" width="12" height="24" />
        </clipPath>
      </defs>
      <g>
        {/* Dibuja el contorno */}
        <circle cx="4.5" cy="9.5" r="2.5" fill="none" stroke={outlineColor} />
        <circle cx="9" cy="5.5" r="2.5" fill="none" stroke={outlineColor} />
        <circle cx="15" cy="5.5" r="2.5" fill="none" stroke={outlineColor} />
        <circle cx="19.5" cy="9.5" r="2.5" fill="none" stroke={outlineColor} />

        <path
            d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"
          fill="none"
          stroke={outlineColor}
        />

      </g>
      <g clipPath={`url(#half-${id})`}>
        {/* Rellena la mitad izquierda */}
        <circle cx="4.5" cy="9.5" r="2.5" fill={fillColor} stroke="none" />
        <circle cx="9" cy="5.5" r="2.5" fill={fillColor} stroke="none" />
        <circle cx="15" cy="5.5" r="2.5" fill={fillColor} stroke="none" />
        <circle cx="19.5" cy="9.5" r="2.5" fill={fillColor} stroke="none" />
        <path
            d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z" 
          fill={fillColor}
          stroke="none"
        />
      </g>
    </svg>
  );
};

export default HalfFilledIcon;
