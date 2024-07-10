"use client"
import React, { useState } from 'react';
import { db } from '@/firebase/firebaseNewsletterConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useLang } from "@/hooks/useLang";
import Image from 'next/image'; // Importera next/image
import MatkasseImage from '../../public/images/illustrations/Matkasse.png';
import morotImage from '../../public/images/illustrations/morot.png';


import HeaderImage from '../../public/images/newsletter_header.png';

const NewsletterForm = () => {
  const { lang, text } = useLang(); // Hämta lang och text från useLang

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
    /* Inkludera Poppins font */
    * {
      font-family: 'Poppins';
    }

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

/* Container för rubrik och underrubrik samt formulär */
.container {
  width: 80%;
  max-width: 750px;
  margin: 40px auto;
  padding: 20px;
  background-color: #FCF7E8;
  text-align: left;
  position: relative;
}

/* Rubriken */
.page-title {
  color: #6E2936;
  font-size: 45px;
  font-weight: bold;
  margin-bottom: 15px;
  margin-top: 5px;
  text-align: center;
}

/* Underrubriken */
.page-subtitle {
  color: black;
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 40px;
}

/* Formulärstyling */
form {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 10px;
}

/* Stil för inmatningsfälten */
.input-group {
  position: relative;
  margin-bottom: 40px;
}

.input-group label {
  position: absolute;
  top: -12px;
  left: 10px;
  background-color: #FCF7E8;
  padding: 0 5px;
  color: #6E2936;
  font-weight: bold;
  font-size: 19px;
}

input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 15px;
  border: 2px solid #6E2936;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
  text-align: left;
  background-color: #FCF7E8;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus {
  border-color: #EECFAA;
  outline: none;
  box-shadow: 0 0 0 3px rgba(238, 207, 170, 0.5);
}

input::placeholder {
  text-align: left;
  color: #D3A181;
  font-size: 16px;
  opacity: 0.5;
}

/* Stil för kryssrutan */
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

/* Stil för consent texten */
.consent-text {
  font-size: 16px;
}

/* Stil för skicka-knappen */
button[type="submit"] {
  background-color: #F4664A;
  color: #FCF7E8;
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
  justify-content: center; /* Centrera horisontellt */
  align-items: center; /* Centrera vertikalt */
  line-height: normal;
  height: 60px;
  margin-top: 10px;
  margin-left: auto; /* Lägger till denna rad för att skapa mellanrum till höger */
  margin-right: auto; /* Lägger till denna rad för att skapa mellanrum till vänster */
  transition: background-color 0.3s ease;
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

/* Stil för morot.png */
.morot-image-container {
  position: absolute;
  top: 250px;
  left: 170px;
  width: 300px;
  height: 300px;
}

.thank-you {
  text-align: center;
  margin-top: 50px;
}

.thank-you h2 {
  color: #6E2936;
  font-size: 45px;
  font-weight: bold;
  margin-bottom: 15px;
  margin-top: 3px;
}

.thank-you p {
  color: black;
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 40px;
}

/* Media Query för mobilvisning */
@media screen and (max-width: 768px) {
  .container {
    width: 90%; /* Öka bredden för bättre användning av skärmutrymme på mindre skärmar */
  }

  .page-title {
    font-size: 36px; /* Justera rubrikstorleken för bättre läsbarhet */
  }

  .page-subtitle {
    font-size: 18px; /* Justera undertitelstorleken för bättre läsbarhet */
    margin-bottom: 30px; /* Minska avståndet mellan undertitel och formulär */
  }

  .input-group label {
    font-size: 16px; /* Justera etikettstorleken för bättre läsbarhet */
  }

  input[type="text"],
  input[type="email"] {
    padding: 12px; /* Minska padding för att passa bättre på mindre enheter */
  }

  .consent-container {
    margin-bottom: 30px; /* Minska avståndet för bättre layout */
  }

  .consent-container input[type="checkbox"] {
    margin-right: 8px; /* Justera mellanrummet för bättre layout */
  }

  .consent-text {
    font-size: 14px; /* Justera textstorleken för bättre läsbarhet */
  }

  button[type="submit"] {
    padding: 14px 22px; /* Minska padding för bättre layout */
    border-radius: 8px; /* Justera border-radius för bättre utseende */
    font-size: 18px; /* Justera knappens textstorlek för bättre läsbarhet */
    height: 50px; /* Justera höjden för bättre layout */
    margin-top: 40px; /* Justera utrymmet ovanför knappen för bättre layout */
  }

  .matkasse-image {
    right: -200px; /* Justera högerplacering för bättre layout */
    width: 180px; /* Justera bildstorleken för bättre layout */
    height: 180px; /* Justera bildstorleken för bättre layout */
  }

  .morot-image-container {
    top: 200px; /* Justera topposition för bättre layout */
    left: 120px; /* Justera vänsterplacering för bättre layout */
    width: 240px; /* Justera bildstorleken för bättre layout */
    height: 240px; /* Justera bildstorleken för bättre layout */
  }

  .thank-you {
    margin-top: 40px; /* Justera utrymmet ovanför rubriken för bättre layout */
  }

  .thank-you h2 {
    font-size: 36px; /* Justera rubrikstorleken för bättre läsbarhet */
    margin-bottom: 10px; /* Justera avståndet under rubriken för bättre layout */
    margin-top: 2px; /* Justera avståndet över rubriken för bättre layout */
  }

  .thank-you p {
    font-size: 16px; /* Justera textstorleken för bättre läsbarhet */
    margin-top: 10px; /* Justera utrymmet över texten för bättre layout */
    margin-bottom: 30px; /* Justera utrymmet under texten för bättre layout */
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
        {!submitted ? (
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
        ) : (
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

