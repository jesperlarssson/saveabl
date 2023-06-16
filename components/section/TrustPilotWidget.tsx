import React from "react";

const TrustBox = () => {
  return (
    <div
      className="trustpilot-widget" // Renamed this to className.
      data-locale="sv-SE"
      data-template-id="5419b6ffb0d04a076446a9af"
      data-businessunit-id="61b0938702c51682297ba186"
      data-style-height="20px"
      data-style-width="100%"
      data-theme="light"
      id="Trustpilot"
    >
      <a
        href="https://www.trustpilot.com/review/saveabl.se"
        target="_blank"
        rel="noopener"
      >
        Trustpilot
      </a>
    </div>
  );
};

export default TrustBox;
