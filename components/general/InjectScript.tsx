"use client";

import { useEffect } from "react";

const InjectScriptComponent = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
    script.async = true;

    // Append the script tag to the document body
    document.body.appendChild(script);

    // Cleanup function to remove the script element on unmount
    return () => {
      // Check if the script is still in the document body before removing
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []); // Empty dependency array ensures this runs once after initial render

  return null; // This component does not render anything
};

export default InjectScriptComponent;
