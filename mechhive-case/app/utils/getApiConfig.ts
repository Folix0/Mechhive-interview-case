import { useEnv } from "~/hooks/useEnv";

export const getApiConfig = () => {
  const { REACT_APP_RAPIDAPI_KEY } = useEnv();

  if (!REACT_APP_RAPIDAPI_KEY) {
    throw new Error("REACT_APP_RAPIDAPI_KEY is not defined");
  }

  return {
    API_KEY: REACT_APP_RAPIDAPI_KEY,
    API_HOST: 'currency-conversion-and-exchange-rates.p.rapidapi.com',
  };
};