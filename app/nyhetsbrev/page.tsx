"use client"
import React, { useState } from 'react';
import { db } from '@/firebase/firebaseNewsletterConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useLang } from "@/hooks/useLang";
import Image from 'next/image';
import MatkasseImage from '../../public/images/illustrations/Matkasse.png';
import morotImage from '../../public/images/illustrations/morot.png';
import HeaderImage from '../../public/images/subscribe_newsletter.png';
import VissteDuAttImageSE from "../../public/images/visste_du_att_svenska.png"; 
import VissteDuAttImageEN from "../../public/images/did_you_know_english.png";  
import VissteDuAttImageDK from "../../public/images/vidste_du_danske.png";  

const NewsletterForm = () => {
  const { lang, text } = useLang();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Funktion som väljer rätt bild beroende på språk
  const getVissteDuAttImage = () => {
    switch (lang) {
      case 'sv':
        return VissteDuAttImageSE;
      case 'en':
        return VissteDuAttImageEN;
      case 'da':
        return VissteDuAttImageDK;
      default:
        return VissteDuAttImageSE; // Standardbild om inget språk matchar
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!consent) {
      setError(text.newsletter.consent_error); // Antag att du har en översatt text för detta också
      return;
    }

    console.log('Submitting form with data:', { name, email, country });

    try {
      // Skapa ett dokument med användarens mejladress som ID
      await setDoc(doc(db, 'newsletter', email), {
        'Namn': name,
        'Mejl': email,
        'Land': country,
        timestamp: new Date().toISOString(),
      });

      console.log('Document successfully written with email as ID: ', email);

      setSubmitted(true);
      setName('');
      setEmail('');
      setCountry('');
      setConsent(false);
      setError('');
    } catch (error) {
      console.error('Error adding document:', error);
      setError(text.newsletter.error_message); // Hämta felmeddelandet från lang
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
  
  /* CSS för svenska */
  .visste-du-att-image.sv {
    display: block;
    position: absolute;
    top: 480px;
    left: 400px;
    width: 300px;
    z-index: 1;
  }
  
  /* CSS för engelska */
  .visste-du-att-image.en {
    display: block;
    position: absolute;
    top: 480px;
    left: 400px;
    width: 350px;
    z-index: 1;
  }
  
  /* CSS för danska */
  .visste-du-att-image.da {
    display: block;
    position: absolute;
    top: 480px;
    left: 400px;
    width: 300px;
    z-index: 1;
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
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 15px;
    margin-top: 20px;
    text-align: center;
    line-height: 1.3;
  }
  
  .page-subtitle {
    color: black;
    font-size: 19px;
    margin-top: 15px;
    margin-bottom: 30px;
    text-align: left;
  }
  
  .button-section {
    margin-bottom: 30px;
    display: flex;
    justify-content: left;
  }
  
  .form-button {
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
    display: block;
    margin: 0 auto;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .form-button:hover {
    background-color: rgba(244, 102, 74, 0.8);
  }
  
  .additional-section {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .additional-section h2 {
    color: #6e2936;
    font-size: 24px;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 10px;
  }

  .additional-section p {
    font-size: 19px;
    margin-bottom: 20px;
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
    width: calc(100% - 20px);
    max-width: 100%;
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
    margin-bottom: -10px;
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
    top: 650px;
    left: 120px;
    width: 300px;
    height: 300px;
  }
  
  .thank-you h2 {
    color: #6e2936;
    font-size: 45px;
    font-weight: bold;
    margin-bottom: 15px;
    margin-top: 5px;
    text-align: left;
  }
  
  .thank-you p {
    color: black;
    font-size: 20px;
    margin-top: 15px;
    margin-bottom: 40px;
    text-align: left;
  }
  
  /* Endast justeringar för mobilversionen */
  @media (max-width: 600px) {
    .container {
      width: 95%;
      margin: 10px auto;
      padding: 10px;
    }
  
    .page-title {
      font-size: 23px;
      margin-top: 25px;
      margin-bottom: 10px;
      text-align: left;
      line-height: 1.3;
    }
  
    .page-subtitle {
      font-size: 18px;
      margin-top: 10px;
      margin-bottom: 20px;
      text-align: left;
    }
  
    .form-button {
      font-size: 18px;
      padding: 10px 20px;
      width: 100%;
      text-align: center;
      margin-top: 10px;
    }
  
    .additional-section {
      margin-top: 10px;
      margin-bottom: 30px;
    }
  
    .additional-section h2 {
      color: #6e2936;
      font-size: 23px;
      font-weight: bold;
      margin-bottom: 7px;
      margin-top: 10px;
    }
  
    .additional-section p {
      font-size: 18px;
      margin-bottom: 20px;
    }
  
    .input-group {
      margin-bottom: 20px;
    }
  
    .input-group label {
      font-size: 16px;
      display: block;
      padding-left: 10px;
      margin-bottom: 5px;
    }
  
    input[type="text"],
    input[type="email"] {
      font-size: 16px;
      padding: 10px;
      width: calc(100% - 20px);
      margin-bottom: 15px;
    }
  
    .consent-container {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
    }
  
    .consent-container input[type="checkbox"] {
      margin-right: 10px;
      margin-top: 5px;
      transform: scale(1);
    }
  
    .consent-text {
      font-size: 14px;
    }
  
    .matkasse-image {
      display: none;
    }
  
    .morot-image-container {
    position: absolute;
    top: 80px;
    left: 330px;
    width: 60px;
    height: 60px;
    z-index: 10; 
    }
  
    .thank-you h2 {
      font-size: 30px;
      text-align: left;
    }
  
    .thank-you p {
      font-size: 18px;
      text-align: left;
    }

    
    /* CSS för svenska */
    .visste-du-att-image.sv {
      position: absolute;
      top: 105px;
      left: -7px;
      width: 180px;
      z-index: 1;
    }
    
    /* CSS för engelska */
    .visste-du-att-image.en {
      position: absolute;
      top: 110px;
      left: 2px;
      width: 230px;
      z-index: 1;
    }
    
    /* CSS för danska */
    .visste-du-att-image.da {
      position: absolute;
      top: 105px;
      left: -10px;
      width: 180px;
      z-index: 1;
    }
  
    .submit-button {
      margin-top: 35px;
      margin-bottom: 30px;
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
        {/* Använd getVissteDuAttImage för att få rätt bild baserat på språk, visas endast om formuläret inte är inskickat */}
        {!submitted && (
          <Image
            src={getVissteDuAttImage()}
            alt={lang === 'sv' ? 'Visste du att' : lang === 'en' ? 'Did you know' : 'Vidste du at'}
            className={`visste-du-att-image ${lang}`} // Dynamisk klass baserat på språk
            width={200}
            height={200}
          />
        )}
      </div>
      <div className="container">
        {!submitted && (
          <>
            <h1 className="page-title">{text.newsletter.header_title}</h1>
            <p className="page-subtitle">{text.newsletter.header_subtitle}</p>
            <div className="button-section">
            <a href="https://www.saveabl.com/bestall" target="_blank" rel="noopener noreferrer" className="form-button">
            {text.newsletter.additional_button}
            </a>
          </div>
            <div className="additional-section">
              <h2>{text.newsletter.new_section_title}</h2>
              <p>{text.newsletter.new_section_subtitle}</p>
            </div>
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
              <button type="submit" className="form-button submit-button">{text.newsletter.submit}</button>
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
