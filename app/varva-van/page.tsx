"use client";
import React from 'react';
import ReferralCodeGenerator from './ReferralCodeGenerator'; // Importerar från samma mapp

const ReferralCodePage: React.FC = () => {
  const styles = `
    .container {
      width: 100%;
      max-width: 750px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fcf7e8;
      text-align: left;
      position: relative;
    }

    .page-title {
      color: #6e2936;
      font-size: 35px;
      font-weight: bold;
      margin-bottom: 15px; /* Behåll detta som tidigare */
      text-align: center;
    }

    .page-subtitle {
      color: black;
      font-size: 20px;
      margin-top: 5px; /* Behåll detta som tidigare */
      margin-bottom: 40px; /* Öka denna marginal för mer avstånd */
      text-align: center;
    }

    @media (max-width: 600px) {
      .container {
        width: 95%;
        margin: 10px auto;
        padding: 10px;
      }

      .page-title {
        font-size: 35px;
        margin-bottom: 5px;
        text-align: left;
      }

      .page-subtitle {
        font-size: 20px;
        margin-top: 10px;
        margin-bottom: 30px; /* Öka denna marginal för mer avstånd på mobilen */
        text-align: left;
      }
    }
  `;

  return (
    <div>
      <style>{styles}</style>
      <div className="container">
        <ReferralCodeGenerator />
      </div>
    </div>
  );
};

export default ReferralCodePage;

