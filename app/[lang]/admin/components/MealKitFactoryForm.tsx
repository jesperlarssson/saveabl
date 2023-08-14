"use client";
import React, { useState } from "react";

import { Mealkit, Price } from "@/types";
import ProductSelector from "./ProductSelector";
import WeekSelector from "./WeekSelector";
import QuantitySelector from "./QuantitySelector";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import MealkitDisplay from "./MealkitDisplay";
import { upsertMealkitRecord } from "@/lib/supabaseAdmin";

interface MealKitFactoryFormProps {
  pricesWithProducts: Price[];
}

const MealKitFactoryForm: React.FC<MealKitFactoryFormProps> = ({
  pricesWithProducts,
}) => {
  const [mealkit, setMealkit] = useState<Mealkit>({
    id: "",
    name: "",
    description: "",
    price_id: "",
    cut_off_time: 0,
    delivery_range: {
      start: 0,
      end: 0,
    },
    quantity: 0,
    week_number: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleWeekChange = (
    weekNumber: number,
    epochThursday: number,
    epochSaturday: number,
    epochMonday: number
  ) => {
    setMealkit({
      ...mealkit,
      week_number: weekNumber,
      cut_off_time: epochThursday,
      delivery_range: {
        start: epochSaturday,
        end: epochMonday,
      },
    });
  };

  const handleProductSelect = (priceId: string) => {
    setMealkit({
      ...mealkit,
      price_id: priceId,
    });
  };

  const handleQuantityChanged = (quantity: number) => {
    setMealkit({
      ...mealkit,
      quantity,
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMealkit({
      ...mealkit,
      name: event.target.value,
    });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMealkit({
      ...mealkit,
      description: event.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
     
    } catch (error) {}
  };

  return (
    <Section>
      <h1>MealKitFactoryForm</h1>
      <MealkitDisplay mealkit={mealkit} />
      <ProductSelector
        onProductSelect={handleProductSelect}
        pricesWithProducts={pricesWithProducts}
      />
      <WeekSelector onWeekChange={handleWeekChange} />
      <QuantitySelector onQuantityChanged={handleQuantityChanged} />
      <div className="flex flex-col">
        <input
          type="text"
          value={mealkit.name || ""}
          onChange={handleNameChange}
          placeholder="Name"
        />
        <textarea
          value={mealkit.description || ""}
          onChange={handleDescriptionChange}
          placeholder="Description"
        />
        <Button onClick={handleSubmit} disabled={loading}>
          Submit
        </Button>
      </div>
    </Section>
  );
};

export default MealKitFactoryForm;
