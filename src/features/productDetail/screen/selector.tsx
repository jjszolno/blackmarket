import React, { useState } from 'react';

import { Picker } from '@react-native-picker/picker';

const QuantitySelector = () => {
  const [selectedQuantity, setSelectedQuantity] = useState('1');

  const handleQuantityChange = (itemValue: string) => {
    setSelectedQuantity(itemValue);
  };

  return (
    <Picker selectedValue={selectedQuantity} onValueChange={handleQuantityChange}>
      {Array.from({ length: 10 }, (_, index) => (
        <Picker.Item key={index + 1} label={`${index + 1}`} value={`${index + 1}`} />
      ))}
    </Picker>
  );
};

export default QuantitySelector;
