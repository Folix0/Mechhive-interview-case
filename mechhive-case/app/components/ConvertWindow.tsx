import React, { useEffect, useState } from "react";
import {
  fetchAvailableCurrencies,
  fetchCurrencyExchange,
} from "~/services/CurrencyApi";
import swapArrows from "../assets/swapArrows.svg";
import "node_modules/flag-icons/css/flag-icons.min.css";

interface CurrencySelectorProps {
  name: string;
  currencies: { [key: string]: string };
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  name,
  currencies,
  onChange,
  value,
}) => {
  return (
    <div>
      <select
        id="convertBox"
        name={name}
        className=""
        onChange={onChange}
        value={value}
      >
        {Object.entries(currencies).map(([code, name]) => (
          <option key={code} value={code}>
            {code} - {name}
          </option>
        ))}
      </select>
    </div>
  );
};

const ConvertWindow: React.FC = () => {
  const [currencies, setCurrencies] = useState<{ [key: string]: string }>({});
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [amount, setAmount] = useState<number>(0);

  //Fetch currencies from API only if they aren't already in localStorage
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const storedCurrencies = localStorage.getItem("currencies");
        if (storedCurrencies) {
          setCurrencies(JSON.parse(storedCurrencies));
        } else {
          const availableCurrencies = await fetchAvailableCurrencies();
          setCurrencies(availableCurrencies);
          localStorage.setItem(
            "currencies",
            JSON.stringify(availableCurrencies)
          );
        }
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const amount = parseFloat(formData.get("amount") as string);
    const from = formData.get("from") as string;
    const to = formData.get("to") as string;

    try {
      const result = await fetchCurrencyExchange(from, to, amount);
      setExchangeRate(result.result);
      setAmount(amount);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  //clear any previous conversion calculations if from or to fields are changed
  const handleFromCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setExchangeRate(null);
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setExchangeRate(null);
    setToCurrency(event.target.value);
  };

  //swap the currencies when swapArrows are clicked
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setExchangeRate(null);
  };

  return (
    <div
      id="ConvertForm"
      className="mt-16 pl-4 pr-4 py-4 px-16 rounded-2xl shadow-custom-inner-outer bg-gradient-to-b from-tertiary via-tertiary via-50% to-secondary"
    >
      <form
        onSubmit={handleSubmit}
        className="text-black mt-12 mr-2 ml-2 mb-14"
      >
        <div className="flex flex-row gap-6">
          <div className="flex flex-col">
            <p className="text-left mb-2 text-white text-xl font-bold">
              Amount
            </p>
            <input
              id="convertBox"
              className="w-80"
              name="amount"
              type="number"
              placeholder="Amount"
              required
            />
          </div>
          <div className="flex flex-col">
            <p className="text-left mb-2 text-white text-xl font-bold">From</p>
            <CurrencySelector
              name="from"
              currencies={currencies}
              onChange={handleFromCurrencyChange}
              value={fromCurrency}
            />
          </div>
          <div className="flex items-end mb-1">
            <img
              src={swapArrows}
              alt="SwapArrows"
              className="max-w-14 max-h-14 cursor-pointer"
              onClick={handleSwapCurrencies}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-left mb-2 text-white text-xl font-bold">To</p>
            <CurrencySelector
              name="to"
              currencies={currencies}
              onChange={handleToCurrencyChange}
              value={toCurrency}
            />
          </div>
        </div>
        <div id="ExchangeInfo" className="flex flex-row">
          <div className="flex flex-col mt-auto items-baseline justify-end text-white">
            <div className="text-white text-xl font-bold flex flex-row items-baseline">
              {exchangeRate !== null && (
                <div className="ml-2 text-3sxl flex flex-col font-normal">
                  <>
                    <div className="flex flex-row items-baseline">
                      <p id="from" className="text-xl">
                        {amount.toFixed(2)} {fromCurrency} =
                      </p>
                      <p id="to" className="ml-2 text-3xl font-bold ">
                        {exchangeRate.toFixed(8)} {toCurrency}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="flex text-base text-white ">
                        1 {toCurrency} = {(amount / exchangeRate).toFixed(6)}{" "}
                        {fromCurrency}
                      </p>
                    </div>
                  </>
                </div>
              )}
            </div>
          </div>
          <button
            className="flex mt-12 ml-auto max-w-44 max-h-14 font-semibold items-center justify-center"
            type="submit"
          >
            Convert
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConvertWindow;
