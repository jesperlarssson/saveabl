"use client";
import React, { useState } from 'react';
import { useLang } from "@/hooks/useLang";
import { db } from '@/firebase/firebaseNewsletterConfig';
import { collection, addDoc } from 'firebase/firestore';
import Image from 'next/image';
import HeaderImage from '../../public/images/subscribe_newsletter.png';

const PopupNewsletterForm = ({ onClose }: { onClose: () => void }) => {
    console.log('PopupNewsletterForm component rendered');
    const { lang, text = { popup: {} } } = useLang();



  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!consent) {
      setError(text.popup.error_example);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'newslettersubscribers'), {
        'Namn': name,
        'Mejl': email,
        'Land': country,
        timestamp: new Date().toISOString(),
      });

      console.log('Document written with ID: ', docRef.id);

      setSubmitted(true);
      setName('');
      setEmail('');
      setCountry('');
      setConsent(false);
      setError('');
    } catch (error) {
      console.error('Error adding document:', error);
      setError(text.popup.error);
    }
  };

  // Inline styles
  const styles = `
  .popup {
    display: flex;
    position: fixed;
    bottom: 10px; /* Placera popupen närmare botten */
    right: 10px; /* Placera i det högra hörnet */
    width: 500px; /* Bredd på popupen */
    max-height: 90vh; /* Maximal höjd för popupen, 80% av viewportens höjd */
    background-color: rgba(0, 0, 0, 0.7); /* Mörkare bakgrund för popupen */
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow: hidden; /* Döljer överflödigt innehåll utanför popupen */
}

.popup-content {
    background-color: #fcf7e8;
    padding: 20px; /* Ökad padding för mer utrymme */
    border-radius: 8px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto; /* Lägg till scrollbar för överflödigt innehåll */
}

.close {
    position: absolute;
    top: 10px; /* Justera så den är nära kanten */
    right: 10px; /* Justera så den är nära kanten */
    cursor: pointer;
    font-size: 24px; /* Större storlek på tecknet */
    color: #EECFAA; /* Färg på tecknet */
    font-weight: bold;
    border: 2px solid #EECFAA; /* Färg på ringens kant */
    border-radius: 50%; /* Gör knappen rund */
    width: 30px; /* Diameter på knappen */
    height: 30px; /* Diameter på knappen */
    text-align: center;
    line-height: 30px; /* Vertikal centrering av tecknet */
    background-color: #FCF7E8; /* Bakgrundsfärg på knappen */
    z-index: 2; /* Se till att knappen är ovanpå bilden */
    display: flex;
    align-items: center;
    justify-content: center;
}

.header-image-container {
    width: 100%;
    height: 150px; /* Justera höjd på bildens container */
    position: relative;
    overflow: hidden; /* Döljer överflödigt innehåll utanför bildens container */
}

.header-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.container {
    width: 100%;
    padding: 5px; /* Ökad padding */
    background-color: #fcf7e8;
    text-align: left;
}

.page-title {
    color: #6e2936;
    font-size: 25px; /* Större storlek på rubriken */
    font-weight: bold;
    margin-bottom: 5px;
}

.page-subtitle {
    color: black;
    font-size: 15px; /* Större storlek på undertiteln */
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 10px; /* Minska marginalen mellan formuläret och popup-innehållet */
}

.input-group {
    position: relative;
    margin-bottom: 15px; /* Större mellanrum mellan input-fält */
}

.input-group label {
    position: absolute;
    top: -10px;
    left: 5px;
    background-color: #fcf7e8;
    padding: 0 5px;
    color: #6e2936;
    font-weight: bold;
    font-size: 13px; /* Större storlek på etiketten */
}

input[type="text"],
input[type="email"] {
    width: calc(100% - 10px);
    padding: 12px; /* Större padding */
    border: 2px solid #6e2936;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 12px; /* Större textstorlek för input-fält */
    background-color: #fcf7e8;
    transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus {
    border-color: #eecfaa;
    outline: none;
    box-shadow: 0 0 0 2px rgba(238, 207, 170, 0.5);
}

input::placeholder {
    color: #d3a181;
    font-size: 12px; /* Större textstorlek för placeholder */
}

.consent-container {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.consent-container input[type="checkbox"] {
    margin-right: 10px;
    transform: scale(1.2); /* Större checkbox */
}

.consent-text {
    font-size: 12px;
}

button[type="submit"] {
    background-color: #f4664a;
    color: #fcf7e8;
    border: none;
    padding: 12px; /* Större padding */
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px; /* Större textstorlek för knappen */
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    margin-top: 5px; /* Minska avståndet ovanför knappen */
    transition: background-color 0.3s ease;
    font-weight: bold;
}

button[type="submit"]:hover {
    background-color: rgba(244, 102, 74, 0.8);
}

.thank-you h2 {
    color: #6e2936;
    font-size: 30px; /* Större storlek på tack-rubrik */
    font-weight: bold;
    margin-bottom: 8px;
}

.thank-you p {
    color: #6e2936;
    font-size: 17px; /* Större storlek på tack-meddelande */
    margin-bottom: 25px;
}

@media (max-width: 600px) {
    .popup {
        width: 100%;
        height: 100vh;
        bottom: 0;
        right: 0;
        border-radius: 0;
    }

    .header-image-container {
        height: 15vh; /* Justerad höjd för att minska utrymmet */
        margin-bottom: 0; /* Ta bort eventuella marginaler */
    }

    .page-title {
        font-size: 18px;
        margin-top: 5px; /* Minska övre marginalen */
        margin-bottom: 5px; /* Justera nedre marginalen */
    }

    .page-subtitle {
        font-size: 12px;
        margin-top: 0; /* Minska övre marginalen */
        margin-bottom: 10px; /* Justera nedre marginalen */
    }

    .input-group {
        margin-bottom: 12px;
    }

    .input-group label {
        font-size: 12px; /* Justerat för bättre läsbarhet */
    }

    input[type="text"],
    input[type="email"] {
        font-size: 12px; /* Justerat för bättre läsbarhet */
        padding: 12px;
    }

    .consent-container {
        margin-bottom: 12px;
    }

    .consent-container input[type="checkbox"] {
        margin-right: 7px;
    }

    .consent-text {
        font-size: 12px; /* Justerat för bättre läsbarhet */
    }

    button[type="submit"] {
        font-size: 14px; /* Större för bättre synlighet */
        padding: 15px; /* Ökad padding för bättre klickyta */
        font-weight: bold;
    }

    .thank-you h2 {
        font-size: 16px; /* Justerat för bättre synlighet */
    }

    .thank-you p {
        font-size: 12px; /* Justerat för bättre läsbarhet */
    }
}
  `;

  return (
    <div className="popup">
      <style>{styles}</style>
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="header-image-container">
          <Image src={HeaderImage} alt="Header" className="header-image" layout="responsive" />
        </div>
        <div className="container">
          {!submitted && (
            <>
              <h1 className="page-title">{text.popup.first_title}</h1>
              <p className="page-subtitle">{text.popup.first_subtitle}</p>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>{text.popup.email_explain}</label>
                  <input type="email" placeholder={text.popup.emailexample} value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="input-group">
                  <label>{text.popup.name_explain}</label>
                  <input type="text" placeholder={text.popup.nameexample} value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="input-group">
                  <label>{text.popup.country_explain}</label>
                  <input type="text" placeholder={text.popup.countryoption} value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>

                <div className="consent-container">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
                  <span className="consent-text">{text.popup.consent_explain}</span>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">{text.popup.submit_now}</button>
              </form>
            </>
          )}

          {submitted && (
            <div className="thank-you">
              <h2>{text.popup.thank_you}</h2>
              <p>{text.popup.thank_you_subtitle}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupNewsletterForm;