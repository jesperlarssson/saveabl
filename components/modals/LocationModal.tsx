"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import useLocationModal from "@/hooks/useLocationModal";
import Modal from "@/components/ui/Modal";
import { useGeoData } from "@/providers/GeoProvider";

const LocationModal = () => {
  const router = useRouter();
  const { onClose, isOpen } = useLocationModal();

  const geoData = useGeoData();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Din plats"
      description="Logga in för att hantera ditt konto."
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col w-full gap-4">
        <div>
          <p>Your city: {geoData?.city}</p>
          <p>Your country: {geoData?.country}</p>
          <p>Your state: {geoData?.state}</p>
          <p>Your postal code: {geoData?.postalCode}</p>
          <p>Your country code: {geoData?.country_code}</p>
          {/* <p>Your url: {geoData?.url}</p> */}
        </div>
      </div>
    </Modal>
  );
};
export default LocationModal;
