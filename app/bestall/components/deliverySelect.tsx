import React from 'react';
import Select from 'react-select';

interface DeliverySelectProps {
  times: Array<{ value: string, label: string, start: number, end: number }>;
  onSelectionChange: (selectedValue: any) => void;
}

const DeliverySelect: React.FC<DeliverySelectProps> = ({ times, onSelectionChange }) => {
  const handleChange = (selectedOption: any) => {
    onSelectionChange(selectedOption);
  };

  return (
    <Select
      options={times}
      isSearchable={false}
      onChange={handleChange}
    />
  );
};

export default DeliverySelect