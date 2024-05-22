"use client";
import React, { useState } from 'react';
import { useLang } from "@/hooks/useLang";

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
            <form action="https://saveabl.us7.list-manage.com/subscribe/post?u=5facf7154c63e29f04ee4d772&amp;id=93da3beb99&amp;f_id=007fa6e4f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank">
              <div id="mc_embed_signup_scroll">
                <h2>Follow the journey! </h2>
                <div className="indicates-required">
                  <span className="asterisk">*</span> indicates required
                </div>
                <div className="mc-field-group">
                  <label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span></label>
                  <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required={true} value="" />
                </div>
                <div className="mc-field-group">
                  <label htmlFor="mce-FNAME">Name </label>
                  <input type="text" name="FNAME" className="text" id="mce-FNAME" value="" />
                </div>
                <div className="mc-field-group input-group">
                  <strong>Where do you live? <span className="asterisk">*</span></strong>
                  <ul>
                    <li>
                      <input type="radio" name="MMERGE2" id="mce-MMERGE20" value="Sweden" tabIndex={0} />
                      <label htmlFor="mce-MMERGE20">Sweden</label>
                    </li>
                    <li>
                      <input type="radio" name="MMERGE2" id="mce-MMERGE21" value="Denmark" tabIndex={0} />
                      <label htmlFor="mce-MMERGE21">Denmark</label>
                    </li>
                  </ul>
                </div>
                <div id="mce-responses" className="clear">
                  <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
                  <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
                </div>
                <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                  <input type="text" name="b_5facf7154c63e29f04ee4d772_93da3beb99" tabIndex={-1} value="" />
                </div>
                <div className="clear">
                  <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button" value="Subscribe" />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MailchimpBanner;

