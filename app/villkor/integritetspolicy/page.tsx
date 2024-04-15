"use client";

import React, { useState, useEffect } from 'react';
import { useLang } from '@/hooks/useLang';

const Integritetspolicy = () => {
  const [integrityPolicyData, setIntegrityPolicyData] = useState<any>(null); // Använd 'any' här

  const { text } = useLang();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await text.integrity_policy;
        setIntegrityPolicyData(data);
      } catch (error) {
        console.error('Error fetching integrity policy data:', error);
      }
    };

    fetchData();
  }, [text]);

  if (!integrityPolicyData) {
    return <div>Loading...</div>; // Loader component while data is fetching
  }

  const styles = {
    container: {
      textAlign: 'left',
      marginLeft: '5%',
      marginRight: '5%',
    },
    sectionTitle: {
      color: '#6E2936',
      fontWeight: 'bold',
      fontSize: '2rem',
      marginBottom: '10px',
      marginTop: '20px',
    },
    subtitle: {
      color: '#6E2936',
      fontWeight: 'bold',
      fontSize: '1.4rem', // Större storlek för subtitle
      marginBottom: '5px',
      marginTop: '20px',
    },
    subsubtitle: {
      color: '#6E2936',
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      fontSize: '1rem', // Mindre storlek för subsubtitle
      marginBottom: '5px',
      marginTop: '20px',
    },
    text: {
      color: 'black',
      fontSize: '1rem',
      marginBottom: '5px',
    },
    lastText: {
      marginBottom: '40px', // Margin bottom för sista texten
    },
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      {/* Titel */}
      <h2 style={styles.sectionTitle}>{integrityPolicyData.introduction}</h2>
      
      {/* Loop genom textobjektet och rendera mellanrubriker, brödtext och länkar */}
      {Object.keys(integrityPolicyData).map((key) => {
        if (key.startsWith('section')) {
          const section = integrityPolicyData[key];
          return (
            <div key={key}>
              {/* Rendera huvudrubrik */}
              <h3 style={styles.subtitle}>{section.title}</h3> 
              {/* Rendera brödtext */}
              <div style={styles.text}>{section.description}</div>
              {/* Loop genom eventuella underavdelningar */}
              {Object.keys(section).map((subKey) => {
                if (subKey.startsWith('subsection')) {
                  const subsection = section[subKey];
                  return (
                    <div key={subKey}>
                      {/* Rendera underrubrik */}
                      <h4 style={styles.subsubtitle}>{subsection.title}</h4>
                      {/* Rendera underavdelningens beskrivning */}
                      <div style={styles.text}>{subsection.description}</div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          );
        }
        // Lägg till länken efter avsnittet "3.1 Rätt till tillgång"
        if (key === 'section_3') {
          return (
            <div key={key}>
              <h3 style={styles.subsubtitle}>{integrityPolicyData.section_3.title}</h3>
              <div style={styles.text}>{integrityPolicyData.section_3.description}</div>
              <div style={styles.text}>Har du ytterligare frågor? Kontakta oss på <a href="mailto:hello@saveabl.se">hello@saveabl.se</a>.</div>
            </div>
          );
        }
        return null;
      })}
      {/* Lägg till marginBottom för sista texten */}
      <div style={styles.lastText}></div>
    </div>
  );
};

export default Integritetspolicy;


