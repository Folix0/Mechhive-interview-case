//hook to fetch retrieving our exchange rate
import axios from "axios";

const API_KEY = process.env.RAPIDAPI_KEY;
const API_HOST = 'currency-conversion-and-exchange-rates.p.rapidapi.com';

const axiosInstance = axios.create({
  baseURL: `https://${API_HOST}`,
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': API_HOST
  }
});

export const fetchCurrencyExchange = async (from: string, to: string, amount: number) => {
  const options = {
    method: "GET",
    url: "/convert",
    params: { from, to, amount: amount.toString() }
  };

  try {
    const response = await axiosInstance.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAvailableCurrencies = async () => {
  const options = {
    method: "GET",
    url: "/symbols"
  };

  try {
    const response = await axiosInstance.request(options);
    if (response.data.success && response.data.symbols) {
      return response.data.symbols;
    } else {
      throw new Error("Failed to fetch available currencies");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};