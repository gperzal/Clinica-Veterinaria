// src/pages/dashboard/components/DateRangePicker.jsx
import React from 'react';
import { Input, Flex } from '@chakra-ui/react';

const DateRangePicker = ({ onDateRangeChange }) => {
  const handleDateChange = (e, type) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    onDateRangeChange(prev => ({ ...prev, [type]: date }));
  };

  return (
    <Flex>
      <Input
        type="date"
        onChange={(e) => handleDateChange(e, 'startDate')}
        mr={2}
      />
      <Input
        type="date"
        onChange={(e) => handleDateChange(e, 'endDate')}
      />
    </Flex>
  );
};

export default DateRangePicker;