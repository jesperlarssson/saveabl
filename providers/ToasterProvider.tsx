"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return ( 
    <Toaster 
      position="bottom-left"
      toastOptions={{
        style: {
          background: '#eecfaa',
          color: '#6e2936',
        }
      }}
    /> 
  );
}
 
export default ToasterProvider;