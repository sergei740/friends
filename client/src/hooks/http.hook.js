import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    setLoading(true);
    try {
      if (body) {
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(url, {
        method, // *GET, POST, PUT, DELETE, etc.
        body,
        headers, // body data type must match "Content-Type" header
      });
      const data = await response.json(); // parses JSON response into native JavaScript objects
      setLoading(false);
      return data;
    } catch (error) {
      return error;
    }
  }, []);
  return { loading, request };
};
