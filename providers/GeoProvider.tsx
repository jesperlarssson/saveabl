"use client";

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

interface GeoData {
  city: string;
  country: string;
  postalCode: string;
  country_code: string;
  state: string;
  //url: string;
}

const GeoContext = createContext<GeoData | null>(null);

interface GeoProviderProps {
  children: React.ReactNode;
}

export const GeoProvider: React.FC<GeoProviderProps> = ({ children }) => {
  const [geoData, setGeoData] = useState<GeoData | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        try {
          const { data } = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=4d4dae32646a47439c90cf5a5452049a`
          );

          const components = data.results[0].components;
          //const url = data.results[0].properties.OSM.url;
          setGeoData({
            city: components.city || components.town,
            country: components.country,
            postalCode: components.postcode,
            country_code: components.country_code,
            state: components.state,
            //url: url,
          });
        } catch (error) {
          console.error("Failed to fetch geo data", error);
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return <GeoContext.Provider value={geoData}>{children}</GeoContext.Provider>;
};

export const useGeoData = () => React.useContext(GeoContext);
