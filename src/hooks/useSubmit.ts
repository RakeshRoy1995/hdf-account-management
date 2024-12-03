// useFetch.js
import { useState } from "react";
import { submitFormData } from "../api/Reqest";

const authToken = localStorage.getItem("customer_login_auth") || "";

const token: any = authToken ? JSON.parse(authToken) : "";

const useSubmit = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmitFormData = async (url: any , options = {}) => {
    setError(null)
    setLoading(true)
    try {
      const { data }: any = await submitFormData( url , options );
      setData(data)
    } catch (error) {
        setError(error.response);
    }
    setLoading(false)
  };

  return { data, loading, error, handleSubmitFormData };
};

export default useSubmit;
