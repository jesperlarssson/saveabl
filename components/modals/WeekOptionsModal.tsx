"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import useWeekOptionsModal from "@/hooks/useWeekOptionsModal";
import Modal from "@/components/ui/Modal";
import { useGeoData } from "@/providers/GeoProvider";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { Mealkit, Price } from "@/types";
import { updateMealkit } from "@/actions/updateMealkit";

const WeekOptionsModal = () => {
  const router = useRouter();
  const { onClose, isOpen, mealkit, productOptions } = useWeekOptionsModal();

  const [newQuantity, setNewQuantity] = React.useState<number>(
    mealkit.quantity
  );
  const [newProductId, setNewProductId] = React.useState<string | undefined>(
    mealkit.product_id
  );
  const [newActiveStatus, setNewActiveStatus] = React.useState<
    boolean | undefined
  >(true);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    setNewQuantity(mealkit.quantity);
  }, [mealkit]);

  const handleSubmit = async () => {
    try {
      //TODO: Update mealkit
      const mealkitToUpdate: Mealkit = {
        id: mealkit.id,
        week_number: mealkit.week_number,
        cut_off_time: mealkit.cut_off_time,
        delivery_range: mealkit.delivery_range,
        active: newActiveStatus ?? mealkit.active,

        quantity: newQuantity,
        product_id: mealkit.product_id,
      };
      await updateMealkit(mealkitToUpdate);
      router.refresh();
      toast.success("Mealkit uppdaterad");
      onClose();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Modal
      title={`Uppdatera vecka ${mealkit.week_number}`}
      description="Justera kvantitet för veckan eller kopplad produkt från stripe."
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col w-full gap-4">
        <p>{mealkit.id}</p>
        <input
          placeholder="Antal"
          type="number"
          className="p-2 rounded-md text-center"
          defaultValue={mealkit.quantity}
          onChange={(e) => {
            e.preventDefault();
            setNewQuantity(parseInt(e.target.value));
          }}
        />
        <select
          onChange={(e) => {
            e.preventDefault();
            setNewProductId(e.target.value);
          }}
          className="p-2 rounded-md text-center"
        >
          {productOptions &&
            productOptions
              ?.reduce((unique: any, price: Price) => {
                return unique.some(
                  (item: any) => item.products.id === price?.products?.id
                )
                  ? unique
                  : [...unique, price];
              }, [])
              .map((price: any) => (
                <option key={price.products.id} value={price.products.id}>
                  {price.products.name + " " + price.unit_amount / 100 + " kr"}
                </option>
              ))}
        </select>
        <Button onClick={handleSubmit}>Spara</Button>
      </div>
    </Modal>
  );
};
export default WeekOptionsModal;
