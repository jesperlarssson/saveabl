"use client";
import React, { useState } from 'react';
import { useLang } from "@/hooks/useLang";
import Link from 'next/link'; // Importera Link från Next.js för att skapa länkar

const MailchimpBanner = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { text } = useLang();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      {/* Banner */}
      <div style={{
        backgroundColor: "#6E2936",
        color: '#fff',
        textAlign: 'center',
        padding: '10px 0',
        cursor: 'pointer'
      }}>
        {text && text.subscribe_newsletter}, <span onClick={openModal} style={{
          color: '#2980b9',
          textDecoration: 'underline'
        }}>{text && text.click_here}</span>
      </div>

      {/* Modal */}
      {modalIsOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: '#EECFAA',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '500px'
          }}>
            <button onClick={closeModal} style={{
              float: 'right',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer'
            }}>X</button>
            {/* Modal content */}
            <h2>{text && text.follow_journey}</h2>
            <form>
              {/* Form content */}
            </form>
          </div>
        </div>
      )}

      {/* Länk till sidan /newsletter */}
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Link href="/newsletter">
          <a style={{ color: '#2980b9', textDecoration: 'underline' }}>Gå till nyhetsbrevssidan</a>
        </Link>
      </div>
    </div>
  );
};

export default MailchimpBanner;
