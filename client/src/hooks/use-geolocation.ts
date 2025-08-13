import { useState, useEffect } from 'react';

interface GeolocationData {
  country?: string;
  isLoading: boolean;
  error?: string;
}

export function useGeolocation(): GeolocationData {
  const [data, setData] = useState<GeolocationData>({ isLoading: true });

  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Try multiple geolocation services for better reliability
        const services = [
          'https://ipapi.co/json/',
          'https://ip-api.com/json/',
          'https://ipinfo.io/json'
        ];

        for (const service of services) {
          try {
            const response = await fetch(service);
            if (!response.ok) continue;
            
            const result = await response.json();
            
            // Extract country code from different API formats
            const countryCode = result.country_code || result.countryCode || result.country;
            
            if (countryCode) {
              setData({ 
                country: countryCode.toLowerCase(), 
                isLoading: false 
              });
              return;
            }
          } catch (serviceError) {
            console.warn(`Geolocation service failed: ${service}`, serviceError);
            continue;
          }
        }
        
        // If all services fail, default to English
        setData({ 
          country: 'us', 
          isLoading: false, 
          error: 'Could not detect location, defaulting to English' 
        });
        
      } catch (error) {
        console.error('Geolocation detection failed:', error);
        setData({ 
          country: 'us', 
          isLoading: false, 
          error: 'Geolocation failed' 
        });
      }
    };

    detectCountry();
  }, []);

  return data;
}