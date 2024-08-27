"use client";
import React, { useState } from 'react';
import { useLang } from "@/hooks/useLang"; // Importera useLang hook

const ReferralCodeGenerator: React.FC = () => {
  const { lang, text } = useLang(); // Hämta språket och texten baserat på valt språk
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [referralCode, setReferralCode] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const generateReferralCode = () => {
    const standardizedKey = `${name.trim().toLowerCase()}|${email.trim().toLowerCase()}`;
    const code = predefinedCodes[standardizedKey];
    if (code) {
      setReferralCode(code);
    } else {
      setReferralCode(text.referral.not_found); // Visa "Kund ej hittad" på valt språk
    }
    setSubmitted(true);
  };

  const shareOnMessenger = () => {
    const baseUrl = "https://www.saveabl.com";
    const urlWithCode = `${baseUrl}?referralCode=${encodeURIComponent(referralCode)}`;
  
    // Hämta texten från lang
    const message = text.referral.messenger_message
      .replace("{referralCode}", referralCode)
      .replace("{urlWithCode}", urlWithCode);
  
    const messengerUrl = `fb-messenger://share?link=${encodeURIComponent(urlWithCode)}&app_id=123456789&quote=${encodeURIComponent(message)}`;
  
    window.location.href = messengerUrl;
  };

  const shareOnEmail = () => {
    const subject = encodeURIComponent(text.referral.email_subject);
    const body = encodeURIComponent(
      text.referral.email_body
        .replace("{referralCode}", referralCode)
        .replace("{userName}", name)
    );
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      alert(text.referral.copy_success); // Visa "Koden kopierades till urklipp!" på valt språk
    }).catch(err => {
      alert(text.referral.copy_fail + ': ' + err); // Visa felmeddelande på valt språk
    });
  };

  const styles = `
  form {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 10px; 
  }

  .input-group {
    position: relative;
    margin-bottom: 15px; 
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
    padding: 12px;
    border: 2px solid #6e2936;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
    text-align: left;
    background-color: #fcf7e8;
    transition: border-color 0.3s ease;
    margin-bottom: 15px; 
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

  .button-group {
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 15px; 
    margin-top: 15px; 
  }

  button.submit-button {
    background-color: #f4664a;
    color: #fcf7e8;
    border: none;
    padding: 12px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
    max-width: 300px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: normal;
    height: 50px;
    margin: 0 auto;
    margin-top: 15px; 
    transition: background-color 0.3s ease;
    font-weight: bold;
  }

  button.submit-button:hover {
    background-color: rgba(244, 102, 74, 0.8);
  }

  button.custom-button {
    background-color: #fcf7e8;
    color: #6E2936;
    border: 2px solid #6E2936;
    padding: 12px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: normal;
    height: 50px;
    transition: background-color 0.3s ease, color 0.3s ease;
    font-weight: bold;
    max-width: 300px;
    min-width: 240px;
  }

  button.custom-button:hover {
    background-color: #6E2936;
    color: #fcf7e8;
  }

  .thank-you {
    text-align: center;
    margin-top: 20px; 
  }

  .thank-you h2 {
    font-size: 35px;
    color: #6E2936;
    font-weight: bold;
    margin-bottom: 15px; 
  }

  .thank-you p {
    font-size: 18px;
    color: black;
    margin-bottom: 15px; 
  }

  @media (max-width: 600px) {
    .input-group {
      margin-bottom: 15px;
    }

    input[type="text"],
    input[type="email"] {
      font-size: 16px;
      padding: 15px;
      width: calc(100% - 20px);
      max-width: 100%;
      margin-bottom: 10px; 
      box-sizing: border-box;
    }

    .button-group {
      gap: 15px; 
    }

    button.submit-button {
      font-size: 16px;
      padding: 10px 15px;
      margin-bottom: 10px; 
      display: block;
      width: 100%;
      box-sizing: border-box;
      text-align: center;
      font-weight: bold;
    }

    .thank-you h2 {
      font-size: 28px;
      margin-bottom: 20px; 
    }

    .thank-you p {
      font-size: 16px;
      margin-bottom: 20px; 
    }
  }

  /* Anpassning för knapparna på större skärmar */
  @media (min-width: 601px) {
    .button-group {
      flex-direction: row;
      justify-content: center;
    }

    button.custom-button {
      max-width: 300px;
      min-width: 240px;
    }
  }
`;


  return (
    <div>
      <style>{styles}</style>
      {!submitted ? (
        <>
          <h1 className="page-title">{text.referral.header_title}</h1>
          <p className="page-subtitle">{text.referral.header_subtitle}</p> {/* Befintlig underrubrik */}
          <form onSubmit={(e) => { e.preventDefault(); generateReferralCode(); }}>
            <div className="input-group">
              <label>{text.referral.name_label}</label>
              <input
                type="text"
                placeholder={text.referral.name_placeholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>{text.referral.email_label}</label>
              <input
                type="email"
                placeholder={text.referral.email_placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">{text.referral.submit_button}</button>
          </form>
        </>
      ) : (
        <div className="thank-you">
          <h2>{text.referral.code_label}: {referralCode}</h2>
          <p>{text.referral.thank_you_subtitle}</p> {/* Lägg till underrubrik här */}
          <div className="button-group">
            <button onClick={copyToClipboard} className="custom-button">{text.referral.copy_button}</button>
            <button onClick={shareOnMessenger} className="custom-button">{text.referral.share_button}</button>
            <button onClick={shareOnEmail} className="custom-button">{text.referral.share_email_button}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralCodeGenerator;

const predefinedCodes: { [key: string]: string } = {
    'anna svensson|anna@example.com': 'ANNA1234',
    'erik karlsson|erik@example.com': 'ERIK5678',
    'maria andersson|maria@example.com': 'MARIA9101',
  };