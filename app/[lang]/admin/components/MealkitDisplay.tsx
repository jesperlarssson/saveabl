import { Mealkit } from "@/types";
import React from "react";

interface MealkitDisplayProps {
  mealkit: any;
}

const MealkitDisplay: React.FC<MealkitDisplayProps> = ({ mealkit }) => {
  const { start, end } = mealkit.delivery_range || {};
  const { cut_off_time } = mealkit;

  const cutOffDate = new Date(cut_off_time * 1000).toLocaleString();
  const startDate = start ? new Date(start * 1000).toLocaleString() : "N/A";
  const endDate = end ? new Date(end * 1000).toLocaleString() : "N/A";

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-2">Mealkit Information</h2>
      <p>
        <strong>ID:</strong> {mealkit.id}
      </p>
      <p>
        <strong>Price ID:</strong> {mealkit.price_id}
      </p>

      <p>
        <strong>Cut off time:</strong> {cutOffDate}
      </p>
      <p>
        <strong>Delivery Start:</strong> {startDate}
      </p>
      <p>
        <strong>Delivery End:</strong> {endDate}
      </p>
      <p>
        <strong>Quantity:</strong> {mealkit.quantity}
      </p>
      <p>
        <strong>Product Name:</strong> {mealkit.name}
      </p>
    </div>
  );
};

export default MealkitDisplay;
