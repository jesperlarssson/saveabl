import React, { useState } from "react";

interface QuantitySelectorProps {
  onQuantityChanged: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ onQuantityChanged }) => {
  const [quantity, setQuantity] = useState<number>(50);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedQuantity = parseInt(event.target.value);
    setQuantity(selectedQuantity);
    onQuantityChanged(selectedQuantity);
  };

  return (
    <div className="flex flex-col items-start">
      <label className="mb-2 font-bold text-lg">Välj kvantitet: </label>
      <input 
        type="number" 
        value={quantity} 
        onChange={handleQuantityChange} 
        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default QuantitySelector;
