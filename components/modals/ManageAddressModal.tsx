"use client";

import React, { useState } from "react";
import useManageAddressModal from "@/hooks/useManageAddressModal";
import Modal from "@/components/ui/Modal";
import MessageModal from "@/components/modals/MessageModal"; 
import axios from "axios";
import { useLang } from "@/hooks/useLang";
import useMessageModal from "@/hooks/useMessageModal"; 
import { twMerge } from "tailwind-merge"; // För Tailwind-klasser

const ManageAddressModal = () => {
  const { isOpen, onClose, customerEmail, customerId, phone, address } = useManageAddressModal();
  const [newAddress, setNewAddress] = useState(address || "");
  const [newCity, setNewCity] = useState("");
  const [newPostalCode, setNewPostalCode] = useState("");
  const [newPhone, setNewPhone] = useState(phone || "");
  const { text } = useLang();

  const { onOpen: openMessageModal, forMessage } = useMessageModal(); 

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Skicka POST-begäran till API-routen med adressändringsdata
      await axios.post('/api/add-todo', {
        customer_id: customerId,
        customer_email: customerEmail,
        actions: "ADDRESS_CHANGE",
        wish: "Kunden har uppdaterat sin adress",
        new_address: `${newAddress}, ${newCity}, ${newPostalCode}, ${newPhone}`,
      });

      forMessage(true, text.my_pages.success_message);
      openMessageModal();
      onClose(); 
    } catch (error) {
      forMessage(false, text.my_pages.error_message);
      openMessageModal(); 
    }
  };

  return (
    <>
  <Modal
    title={text.my_pages.change_address_modal_title || "Uppdatera din adress"}
    description={text.my_pages.change_address_modal_desc || "Ange din nya adress och telefonnummer nedan."}
    isOpen={isOpen}
    onChange={onClose}
  >
    {/* Lägg till utrymme under beskrivningen */}
    <div className="mb-4"> {/* Skapar mer utrymme under beskrivningen */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Input-fält för ny adress med flytande etikett */}
        <div className="relative mt-2">
          <input
            type="text"
            id="address"
            placeholder={text.my_pages.street_address_placeholder || "Ange gatuadress"}
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="w-full p-3 border border-primary bg-transparent rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-[#6E2936] focus:ring-opacity-50 focus:ring-2 focus:outline-none focus:border-[#6E2936]" 
          />
          <label
            htmlFor="address"
            className="absolute left-2 -top-2.5 px-1 bg-[#F9F4E8] text-secondary font-bold transition-all duration-200 text-sm"
          >
            {text.my_pages.street_address || "Gatuadress"}
          </label>
        </div>

        {/* Input-fält för postnummer med flytande etikett */}
        <div className="relative">
          <input
            type="text"
            id="postal_code"
            placeholder={text.my_pages.postal_code_placeholder || "Ange postnummer"}
            value={newPostalCode}
            onChange={(e) => setNewPostalCode(e.target.value)}
            className="w-full p-3 border border-primary bg-transparent rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-[#6E2936] focus:ring-opacity-50 focus:ring-2 focus:outline-none focus:border-[#6E2936]" 
          />
          <label
            htmlFor="postal_code"
            className="absolute left-2 -top-2.5 px-1 bg-[#F9F4E8] text-secondary font-bold transition-all duration-200 text-sm"
          >
            {text.my_pages.postal_code || "Postnummer"}
          </label>
        </div>

        {/* Input-fält för stad med flytande etikett */}
        <div className="relative">
          <input
            type="text"
            id="city"
            placeholder={text.my_pages.city_placeholder || "Ange stad"}
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            className="w-full p-3 border border-primary bg-transparent rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-[#6E2936] focus:ring-opacity-50 focus:ring-2 focus:outline-none focus:border-[#6E2936]" 
          />
          <label
            htmlFor="city"
            className="absolute left-2 -top-2.5 px-1 bg-[#F9F4E8] text-secondary font-bold transition-all duration-200 text-sm"
          >
            {text.my_pages.city || "Stad"}
          </label>
        </div>

        {/* Input-fält för telefonnummer med flytande etikett */}
        <div className="relative">
          <input
            type="text"
            id="phone"
            placeholder={text.my_pages.phone_placeholder || "Ange telefonnummer"}
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            className="w-full p-3 border border-primary bg-transparent rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-[#6E2936] focus:ring-opacity-50 focus:ring-2 focus:outline-none focus:border-[#6E2936]" 
          />
          <label
            htmlFor="phone"
            className="absolute left-2 -top-2.5 px-1 bg-[#F9F4E8] text-secondary font-bold transition-all duration-200 text-sm"
          >
            {text.my_pages.phone || "Telefonnummer"}
          </label>
        </div>

        {/* Uppdatera-knapp */}
        <button
          type="submit"
          className="w-full py-2 mt-2 rounded-md bg-[#F4664A] text-[#FCF7E8] font-bold"
        >
          {text.my_pages.update_button || "Uppdatera"}
        </button>
      </form>
    </div>
  </Modal>

  {/* MessageModal för framgång eller fel */}
  <MessageModal />
</>


  );
};

export default ManageAddressModal;
