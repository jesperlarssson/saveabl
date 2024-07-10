"use client"
import React, { useState } from 'react';
import { db } from '@/firebase/firebaseNewsletterConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useLang } from "@/hooks/useLang";
import Image from 'next/image';
import MatkasseImage from '../../public/images/illustrations/Matkasse.png';
import morotImage from '../../public/images/illustrations/morot.png';
import HeaderImage from '../../public/images/newsletter_header.png';

const NewsletterForm = () => {
  const { lang, text } = useLang();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!consent) {
      setError('You must consent to receive marketing emails.');
      return;
    }

    console.log('Submitting form with data:', { name, email, country });

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
      setError('Something went wrong, please try again later.');
    }
  };

  const styles = `
    .header-image-container {
      width: 100%;
      height: auto;
      position: relative;
    }
    
    .header-image {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
    
    .container {
      width: 80%;
      max-width: 750px;
      margin: 40px auto;
      padding: 20px;
      background-color: #fcf7e8;
      text-align: left;
      position: relative;
    }
    
    .page-title {
      color: #6e2936;
      font-size: 45px;
      font-weight: bold;
      margin-bottom: 15px;
      margin-top: 5px;
      text-align: center;
    }
    
    .page-subtitle {
      color: black;
      font-size: 20px;
      margin-top: 15px;
      margin-bottom: 40px;
      text-align: left
    }
    
    form {
      display: flex;
      flex-direction: column;
      text-align: center; /* Centrera texten i formuläret */
      margin-bottom: 10px;
    }
    
    .input-group {
      position: relative;
      margin-bottom: 40px;
    }
    
    .input-group label {
      position: absolute;
      top: -12px;
      left: 10px;
      background-color: #fcf7e8;
      padding: 0 5px;
      color: #6e2936;
      font-weight: bold;
      font-size: 19px;
    }
    
    input[type="text"],
    input[type="email"] {
      width: 100%;
      padding: 15px;
      border: 2px solid #6e2936;
      border-radius: 5px;
      box-sizing: border-box;
      font-size: 16px;
      text-align: left;
      background-color: #fcf7e8;
      transition: border-color 0.3s ease;
    }
    
    input[type="text"]:focus,
    input[type="email"]:focus {
      border-color: #eecfaa;
      outline: none;
      box-shadow: 0 0 0 3px rgba(238, 207, 170, 0.5);
    }
    
    input::placeholder {
      text-align: left;
      color: #d3a181;
      font-size: 16px;
      opacity: 0.5;
    }
    
    .consent-container {
      display: flex;
      align-items: flex-start;
      margin-bottom: 40px;
    }
    
    .consent-container input[type="checkbox"] {
      margin-right: 10px;
      margin-top: 5px;
      transform: scale(1.2);
    }
    
    .consent-text {
      font-size: 16px;
    }
    
    button[type="submit"] {
      background-color: #f4664a;
      color: #fcf7e8;
      border: none;
      padding: 15px 25px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 20px;
      text-align: center;
      max-width: 300px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: normal;
      height: 60px;
      margin-top: 50px;
      transition: background-color 0.3s ease;
      margin: 0 auto;
    }
    
    button[type="submit"]:hover {
      background-color: rgba(244, 102, 74, 0.8);
    }
    
    .matkasse-image {
      position: absolute;
      bottom: 10px;
      right: -250px;
      width: 230px;
      height: 230px;
    }
    
    .morot-image-container {
      position: absolute;
      top: 250px;
      left: 170px;
      width: 300px;
      height: 300px;
    }
    
    .thank-you h2 {
      color: #6e2936;
      font-size: 45px;
      font-weight: bold;
      margin-bottom: 15px;
      margin-top: 5px;
      text-align: center;
    }
    
    .thank-you p {
      color: black;
      font-size: 20px;
      margin-top: 15px;
      margin-bottom: 40px;
      text-align: center; /* Centrera tack-texten */
    }
    @media (max-width: 600px) {
      .container {
        width: 95%;
        margin: 10px auto;
        padding: 10px;
      }
    
      .page-title {
        font-size: 24px; /* Anpassad storlek för mindre skärmar */
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: center; /* Centrera titeln på mindre skärmar */
      }
    
      .page-subtitle {
        font-size: 16px; /* Anpassad storlek för mindre skärmar */
        margin-top: 5px;
        margin-bottom: 20px;
        text-align: center; /* Centrera underrubrik på mindre skärmar */
      }
    
      .input-group {
        margin-bottom: 15px; /* Behåll avståndet mellan fälten */
      }
    
      .input-group label {
        font-size: 14px; /* Anpassad storlek för mindre skärmar */
        display: block;
        text-align: left;
        margin-bottom: 5px;
      }
    
      input[type="text"],
      input[type="email"] {
        font-size: 14px;
        padding: 10px;
        width: calc(100% - 20px); /* Anpassa bredden för fälten */
        max-width: 100%;
        margin-bottom: 15px;
        box-sizing: border-box;
      }
    
      .consent-container {
        margin-bottom: 15px; /* Behåll avståndet mellan fälten */
      }
    
      .consent-container label {
        font-size: 14px; /* Anpassad storlek för mindre skärmar */
        display: flex;
        align-items: center; /* Centrera texten vertikalt med checkbox */
        margin-bottom: 5px;
      }
    
      .consent-container input[type="checkbox"] {
        margin-right: 10px;
        transform: scale(1);
      }
    
      .consent-text {
        font-size: 14px; /* Anpassad storlek för mindre skärmar */
        text-align: left;
      }
    
      button[type="submit"] {
        font-size: 16px; /* Anpassad storlek för mindre skärmar */
        padding: 10px 20px;
        margin-bottom: 10px;
        width: 100%;
        box-sizing: border-box;
        text-align: center;
      }
    
      .matkasse-image,
      .morot-image-container {
        display: none; /* Göm bilder på mindre skärmar */
      }
    
      .thank-you h2,
      .thank-you p {
        font-size: 18px; /* Anpassad storlek för mindre skärmar */
        text-align: center; /* Centrera texten på mindre skärmar */
      }
    }
    
    
    
    
  `;



  return (
    <div>
      <style>{styles}</style>
      <div className="header-image-container">
        <Image src={HeaderImage} alt="Header" className="header-image" layout="responsive" />
        <div className="morot-image-container">
          <Image src={morotImage} alt="morot" layout="fixed" width={150} height={150} />
        </div>
      </div>
      <div className="container">
        {!submitted && (
          <>
            <h1 className="page-title">{text.newsletter.header_title}</h1>
            <p className="page-subtitle">{text.newsletter.header_subtitle}</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>{text.newsletter.email_label}</label>
                <input type="email" placeholder={text.newsletter.email} value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
  
              <div className="input-group">
                <label>{text.newsletter.name_label}</label>
                <input type="text" placeholder={text.newsletter.name} value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
  
              <div className="input-group">
                <label>{text.newsletter.country_label}</label>
                <input type="text" placeholder={text.newsletter.country} value={country} onChange={(e) => setCountry(e.target.value)} required />
              </div>
  
              <div className="consent-container">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
                <span className="consent-text">{text.newsletter.consent_text}</span>
              </div>
  
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button type="submit">{text.newsletter.submit}</button>
              {/* Lägg till Matkasse.png bredvid formuläret */}
              <div className="matkasse-image-container">
                <Image src={MatkasseImage} alt="Matkasse" className="matkasse-image" layout="fixed" width={100} height={100} />
              </div>
            </form>
          </>
        )}
  
        {submitted && (
          <div className="thank-you">
            <h2>{text.newsletter.thank_you_title}</h2>
            <p>{text.newsletter.thank_you_message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterForm;
