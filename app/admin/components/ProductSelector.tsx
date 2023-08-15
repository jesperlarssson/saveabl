import { Price } from "@/types";
import React from "react";

interface ProductSelectorProps {
  onProductSelect: (productId: string) => void;
  pricesWithProducts: Price[];
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  onProductSelect,
  pricesWithProducts,
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {pricesWithProducts.map((price) => {
        return (
          <div key={price.id} className="bg-primary rounded-md p-8 shadow-lg m-4">
            <h2 className="text-2xl font-bold mb-4">{price.products?.name}</h2>
            <p className="text-lg mb-2">{price.products?.description}</p>
            <p className="text-lg mb-2">{(price.unit_amount! / 100).toFixed(2)} {price.currency?.toUpperCase()}</p>
            <p className="text-lg mb-2">Faktureras varje {price.interval_count} {price.interval}{price.interval_count! > 1 ? 's' : ''}</p>
            <button 
              className="mt-4 bg-secondary text-white rounded-md px-4 py-2"
              onClick={() => onProductSelect(price.id)}
            >
              Välj denna produkt
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductSelector;
