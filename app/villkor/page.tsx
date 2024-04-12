"use client";


import React from 'react';
import { useLang } from '@/hooks/useLang';

const Villkor = () => {
  const { text } = useLang();

  return (
    <div
     style={{ textAlign: 'left', marginLeft: '5%', marginRight: '5%' }} >
      
      {/* Titel */}
      <h2 style={{ color: '#6E2936', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '2rem', marginBottom: '10px', marginTop: '20px',  }}>{text.terms.title}</h2>
      
      {/* Mellanrubrik */}
      <p style={{ color: '#6E2936', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1rem', marginBottom: '5px', }}>{text.terms.subtitle1}</p>
      
      {/* Brödtext */}
      <p style={{ color: 'black', fontFamily: 'Poppins', fontSize: '1rem' }}>{text.terms.description1}</p>

      {/* Mellanrubrik */}
      <p style={{ color: '#6E2936', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1rem', marginBottom: '5px', marginTop: '20px' }}>{text.terms.subtitle2}</p>
      
      {/* Brödtext */}
      <p style={{ color: 'black', fontFamily: 'Poppins', fontSize: '1rem' }}>{text.terms.description2}</p>

      {/* Mellanrubrik */}
      <p style={{ color: '#6E2936', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1rem', marginBottom: '5px', marginTop: '20px' }}>{text.terms.subtitle3}</p>
      
      {/* Brödtext */}
      <p style={{ color: 'black', fontFamily: 'Poppins', fontSize: '1rem' }}>{text.terms.description3}</p>

      {/* Mellanrubrik */}
      <p style={{ color: '#6E2936', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1rem', marginBottom: '5px', marginTop: '20px' }}>{text.terms.subtitle4}</p>
      
      {/* Brödtext */}
      <p style={{ color: 'black', fontFamily: 'Poppins', fontSize: '1rem' }}>{text.terms.description4}</p>

      {/* Mellanrubrik */}
      <p style={{ color: '#6E2936', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1rem', marginBottom: '5px', marginTop: '20px' }}>{text.terms.subtitle5}</p>
      
      {/* Brödtext */}
      <p style={{ color: 'black', fontFamily: 'Poppins', fontSize: '1rem' }}>{text.terms.description5} <a href="mailto:hello@saveabl.se" style={{ color: 'inherit', textDecoration: 'underline' }}>hello@saveabl.se</a>.
      </p>

      {/* Mellanrubrik */}
      <p style={{ color: '#6E2936', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1rem', marginBottom: '5px', marginTop: '20px' }}>{text.terms.subtitle6}</p>
      
      {/* Brödtext */}
      <p style={{ color: 'black', fontFamily: 'Poppins', fontSize: '1rem' }}>{text.terms.description6}</p>

      {/* Mellanrubrik */}
      <p style={{ color: '#6E2936', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1rem', marginBottom: '5px', marginTop: '20px' }}>{text.terms.subtitle7}</p>
      
      {/* Brödtext */}
      <p style={{ color: 'black', fontFamily: 'Poppins', fontSize: '1rem' }}>{text.terms.description7}</p>

      {/* Mellanrubrik */}
      <p style={{ color: '#6E2936', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1rem', marginBottom: '5px', marginTop: '20px' }}>{text.terms.subtitle8}</p>
      
      {/* Brödtext */}
      <p style={{ color: 'black', fontFamily: 'Poppins', fontSize: '1rem' }}>{text.terms.description8} <a href="https://www.saveabl.com/villkor/integreringspolicy" style={{ color: 'inherit', textDecoration: 'underline' }}>integritetspolicy</a>.
      </p>

      {/* Mellanrubrik */}
      <p style={{ color: '#6E2936', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1rem', marginBottom: '5px', marginTop: '20px' }}>{text.terms.subtitle9}</p>
      
      {/* Brödtext */}
      <p style={{ color: 'black', fontFamily: 'Poppins', fontSize: '1rem' }}>{text.terms.description9}</p>

      {/* Mellanrubrik */}
      <p style={{ color: '#6E2936', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1rem', marginBottom: '5px', marginTop: '20px' }}>{text.terms.subtitle10}</p>
      
      {/* Brödtext */}
      <p style={{ color: 'black', fontFamily: 'Poppins', fontSize: '1rem', marginBottom: '40px' }}>{text.terms.description10}</p>
    </div>
  );
};

export default Villkor;

