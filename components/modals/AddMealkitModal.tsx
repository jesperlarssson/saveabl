"use client";

import React, { useEffect, useState } from "react";

import useAddMealkitModal from "@/hooks/useAddMealkitModal";
import Modal from "@/components/ui/Modal";
import instance from "@/lib/apiAxios";
import { set } from "video.js/dist/types/tech/middleware";
import toast from "react-hot-toast";
import Button from "../ui/Button";

const AddMealkitModal = () => {
  const { onClose, isOpen, week, postalCode, subscriptionId } = useAddMealkitModal();
  const [loading, setLoading] = useState<boolean>(false);
  const [deliveryWindows, setDeliveryWindows] = useState<any[]>([]);
  const [selectedDeliveryWindow, setSelectedDeliveryWindow] =
    useState<any>(null);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const getDeliveryWindowsForPostalCode = async () => {
    setLoading(true);
    if (!postalCode || postalCode.length < 5) {
      setLoading(false);
      toast.error("Kunde inte hämta leveransfönster.");
      return;
    }
    try {
      const res = await instance.get(
        `checkout/deliverywindow/se/${postalCode}`
      );
      setDeliveryWindows(res.data.windows);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDeliveryWindowsForPostalCode();
  }, [postalCode]);

  const handleAdd = async () => {
    if (!selectedDeliveryWindow) {
      toast.error("Du måste välja ett leveransfönster.");
      return;
    }
    if (!subscriptionId) {
      toast.error("Kunde inte lägga till matkassen.");
      return;
    }
    try {
      const res = await instance.post(`subscriptions/${subscriptionId}/mealkits`, {
        deliveryWindows: {
          start: selectedDeliveryWindow.start,
          end: selectedDeliveryWindow.end,
        },
      });
      console.log(res.data);
      toast.success("Matkassen lades till!");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Kunde inte lägga till matkassen.");
    }
  };

  return (
    <Modal
      title="Lägg till matkasse"
      description={`Lägg till matkassen vecka ${week} till din prenumeration!`}
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col w-full gap-4">
        {selectedDeliveryWindow ? (
          <div className="flex flex-col w-full gap-4">
            Vill du ha matkassen för vecka {week} tillagd med leverans{" "}
            {selectedDeliveryWindow.label}?
            <div className="grid grid-cols-2">
              <button onClick={() => setSelectedDeliveryWindow(null)}>
                Avbryt
              </button>
              <Button onClick={handleAdd}>Bekräfta</Button>
            </div>
          </div>
        ) : (
          <>
            {" "}
            <h3 className="font-poppins text-secondary">
              Välj leveranstid för denna kasse:
            </h3>
            {loading ? (
              <p>Laddar...</p>
            ) : (
              deliveryWindows.map((deliveryWindow, index) => {
                return (
                  <div
                    className="w-full p-2 bg-primary text-secondary rounded-md bg-opacity-60 hover:bg-opacity-100 cursor-pointer"
                    key={`deliverywindow-${index}`}
                    onClick={() => setSelectedDeliveryWindow(deliveryWindow)}
                  >
                    <p>{deliveryWindow.label}</p>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </Modal>
  );
};
export default AddMealkitModal;
