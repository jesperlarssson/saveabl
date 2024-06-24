"use client"

import React, { useState, useEffect, FormEvent } from 'react';
import { useLang } from '@/hooks/useLang';

const NewsletterForm = () => {
  const [newsletterText, setNewsletterText] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const { text } = useLang();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await text.newsletter;
        setNewsletterText(data);
      } catch (error) {
        console.error('Error fetching newsletter data:', error);
      }
    };

    fetchData();
  }, [text]);

  const translateCountryValue = (value: FormDataEntryValue): string => {
    const stringValue = value.toString().toLowerCase();
    console.log('Original value:', stringValue);
    if (stringValue === 'sverige') return 'sweden';
    if (stringValue === 'danmark') return 'denmark';
    return stringValue; // Om ingen översättning behövs, returnera samma värde
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const translatedFormData = new FormData();

    for (const [name, value] of formData.entries()) {
      if (name === 'MMERGE2') {
        const translatedValue = translateCountryValue(value);
        console.log('Translated value for MMERGE2:', translatedValue);
        translatedFormData.append(name, translatedValue);
      } else {
        translatedFormData.append(name, value.toString());
      }
    }

    try {
      console.log('Form submitted');
      await fetch(form.action, {
        method: form.method,
        body: translatedFormData,
      });

      // Anta att formuläret skickades korrekt, eftersom vi inte kan verifiera via `no-cors`
      console.log('Form successfully submitted');
      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting form to Mailchimp:', error);
      setIsSuccess(false);
    }
  };

  if (!newsletterText) {
    return <div>Loading...</div>; // Loader component while data is fetching
  }

  return (
    <div id="mc_embed_shell">
      <div id="mc_embed_signup">
        <form
          action="https://saveabl.us7.list-manage.com/subscribe/post?u=5facf7154c63e29f04ee4d772&amp;id=93da3beb99&amp;f_id=007fa6e4f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_self"
          onSubmit={handleSubmit}

        >
          <div id="mc_embed_signup_scroll">
            <h2>{newsletterText.title}</h2>
            <div className="subtitle">{newsletterText.subtitle}</div>
            <div className="indicates-required"><span className="asterisk">*</span> {newsletterText.indicatesRequired}</div>
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL">{newsletterText.emailLabel} <span className="asterisk">*</span></label>
              <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required={true} />
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-FNAME">{newsletterText.nameLabel}</label>
              <input type="text" name="FNAME" className="text" id="mce-FNAME" />
            </div>
            <div className="mc-field-group input-group">
              <strong>{newsletterText.locationLabel} <span className="asterisk">*</span></strong>
              <ul>
                {newsletterText.locations.map((location: any) => (
                  <li key={location.value}>
                    <input type="radio" name="MMERGE2" id={`mce-MMERGE2-${location.value}`} value={location.value} required />
                    <label htmlFor={`mce-MMERGE2-${location.value}`}>{location.label}</label>
                  </li>
                ))}
              </ul>
            </div>
            <div id="mce-responses" className="clear">
              <div className="response" id="mce-error-response" style={{ display: isSuccess === false ? 'block' : 'none' }}>
                {newsletterText.errorMessage || 'An error occurred. Please try again.'}
              </div>
              <div className="response" id="mce-success-response" style={{ display: isSuccess === true ? 'block' : 'none' }}>
                {newsletterText.successMessage || 'Thank you for subscribing!'}
              </div>
            </div>
            <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
              <input type="text" name="b_5facf7154c63e29f04ee4d772_93da3beb99" tabIndex={-1} value="" />
            </div>
            <div className="clear">
              <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button" value={newsletterText.subscribeButton} />
            </div>
          </div>
        </form>
      </div>

      <style type="text/css">
        {`
          #mc_embed_signup {
            background: #FCF7E8;
            font: 14px;
            width: 80%;
            max-width: 600px;
            padding: 20px;
            border-radius: 10px;
            box-shadow: none;
          }
          #mc_embed_signup h2 {
            color: #6E2936;
            font-size: 24px;
            margin-bottom: 10px;
            text-align: left;
            font-weight: bold;
          }

          #mc_embed_signup .subtitle {
            color: #6E2936;
            font-size: 16px;
            margin-bottom: 20px;
            text-align: left;
          }

          #mc_embed_signup .indicates-required {
            text-align: right;
          }

          #mc_embed_signup .asterisk {
            color: #6E2936;
          }

          #mc_embed_signup label {
            color: #6E2936;
            display: block;
            text-align: left;
          }

          #mc_embed_signup input[type="email"],
          #mc_embed_signup input[type="text"] {
            color: #6E2936;
            width: 100%;
            padding: 10px;
            margin-bottom: 25px;
            border: 1px solid #6E2936;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 16px;
            text-align: left;
          }

          #mc_embed_signup .mc-field-group.input-group ul {
            padding: 0;
            margin: 0;
            list-style: none;
          }

          #mc_embed_signup .mc-field-group.input-group ul li {
            margin-bottom: 10px;
          }

          #mc_embed_signup .mc-field-group.input-group ul li input {
            margin-right: 10px;
          }

          #mc_embed_signup .mc-field-group.input-group label {
            color: #6E2936;
          }

          #mc_embed_signup input[type="submit"] {
            background-color: #6E2936;
            color: #FCF7E8;
            border: none;
            padding: 15px 0;
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
            height: 60px;
          }

          #mc_embed_signup input[type="submit"]:hover {
            background-color: rgba(94, 47, 56, 0.8); /* Bakgrundsfärg med opacity */
            color: #6E2936; /* Textfärg */
          }

          #mc_embed_signup .mc-field-group.input-group strong {
            color: #6E2936;
            display: block;
            text-align: left;
            margin-bottom: 10px;
          }

        `}
      </style>
      <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
      <script type="text/javascript">
        {`
          (function($) {
            window.fnames = new Array();
            window.ftypes = new Array();
            fnames[0]='EMAIL';ftypes[0]='email';
            fnames[1]='FNAME';ftypes[1]='text';
            fnames[2]='MMERGE2';ftypes[2]='radio';
          }(jQuery));
          var $mcj = jQuery.noConflict(true);
        `}
      </script>
    </div>
  );
};

export default NewsletterForm;
