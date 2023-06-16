"use client";

import { use, useEffect } from "react";

const InjectScriptComponent = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');

    // Set its src attribute
    script.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
    script.async = true;

    // Append the script tag to the document body
    document.body.appendChild(script);

    // Cleanup function: remove the script element on unmount
    return () => {
      document.body.removeChild(script);
    }
  }, []); // Empty dependency array ensures this runs once after initial render

  return (
    // The component's JSX goes here
    <div></div>
  );
};

export default InjectScriptComponent;
