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
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  name,
  currencies,
}) => {
  return (
    <div>
      <select id="convertBox" name={name} className="">
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

  //Check if currency symbols are already fetched. If not, then we fetch them from our API
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
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
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
            <CurrencySelector name="from" currencies={currencies} />
          </div>
          <div className="flex items-end mb-1">
            <img
              src={swapArrows}
              alt="SwapArrows"
              className="max-w-14 max-h-14"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-left mb-2 text-white text-xl font-bold">To</p>
            <CurrencySelector name="to" currencies={currencies} />
          </div>
        </div>
        <div id="ExchangeInfo" className="flex flex-row">
          <div className="flex flex-col mt-auto items-baseline justify-end text-white">
            <div className="text-white text-xl font-bold flex flex-row items-baseline">
              {exchangeRate !== null && (
                <div className="ml-2 text-3sxl font-bold flex flex-col">                  
                  <>
                    <div className=" flex flex-row items-baseline">
                    <p className="text-xl">1.00 US Dollar=</p>
                  <p className="ml-2 text-3xl ">{exchangeRate} Euros</p>
                    </div>
                    <div className="flex">
                      <p className="flex text-base text-white ">
                        1 EUR = {exchangeRate/10 + 1} USD
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
      {/* {exchangeRate !== null && (
        <div>
          <p>Exchange Rate: {exchangeRate}</p>
        </div>
      )} */}
    </div>
  );
};

export default ConvertWindow;
