"use client";
import React from 'react';
import ReferralCodeGenerator from './ReferralCodeGenerator'; // Importerar från samma mapp

const ReferralCodePage: React.FC = () => {
  const styles = `
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
      text-align: center;
    }

    .page-subtitle {
      color: black;
      font-size: 20px;
      margin-top: 15px;
      margin-bottom: 40px;
      text-align: left;
    }

    @media (max-width: 600px) {
      .container {
        width: 95%;
        margin: 10px auto;
        padding: 10px;
      }

      .page-title {
        font-size: 30px;
        margin-bottom: 10px;
        text-align: left;
      }

      .page-subtitle {
        font-size: 18px;
        margin-top: 5px;
        margin-bottom: 30px;
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

