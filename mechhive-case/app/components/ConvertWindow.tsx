import { useState, useEffect } from "react";
import {
  fetchAvailableCurrencies,
  fetchCurrencyExchange,
} from "~/services/CurrencyApi";
import CurrencySelector from "./CurrencySelector";
import swapArrows from "../assets/swapArrows.svg";

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
      className="mt-3 md:mt-16 pl-2 md:pl-4 pr-2 md:pr-4 py-2 md:py-4 px-8 md:px-16 rounded-2xl md:shadow-custom-inner-outer md:bg-gradient-to-b from-tertiary via-tertiary via-50% to-secondary"
    >
      <form
        onSubmit={handleSubmit}
        className="text-black mt-4 md:mt-12 mr-1 md:mr-2 ml-1 md:ml-2 md:mb-14"
      >
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex flex-col order-first md:order-1">
            <p className="text-left mb-2 text-white text-xl font-semibold">From</p>
            <CurrencySelector
              name="from"
              currencies={currencies}
              onChange={handleFromCurrencyChange}
              value={fromCurrency}
            />
          </div>
          <div className="flex justify-center md:items-end md:mb-1 order-1 md:order-0">
            <img
              src={swapArrows}
              alt="SwapArrows"
              className="max-w-14 max-h-14 cursor-pointer"
              onClick={handleSwapCurrencies}
            />
          </div>
          <div className="flex flex-col order-3 md:order-last">
            <p className="text-left mb-2 text-white text-xl font-semibold">To</p>
            <CurrencySelector
              name="to"
              currencies={currencies}
              onChange={handleToCurrencyChange}
              value={toCurrency}
            />
          </div>
          <div className="flex flex-col order-3 md:order-first">
            <p className="text-left mb-2 text-white text-xl font-semibold">Amount</p>
            <input
              id="convertBox"
              className="w-80"
              name="amount"
              type="number"
              placeholder="Amount"
              required
            />
          </div>
        </div>
        <div id="ExchangeInfo" className="flex flex-col md:flex-row">
          <div className="flex flex-col mt-auto items-baseline justify-end text-white">
            <div className="text-white text-xl font-bold flex flex-row items-baseline">
              {exchangeRate !== null && (
                <div className="ml-1 md:ml-2 text-4xl md:text-3xl mt-5 md:mt-0 flex flex-col font-normal">
                  <>
                    <div className="flex flex-col md:flex-row md:items-baseline">
                      <p id="from" className="text-xl mr-auto">
                        {amount.toFixed(2)} {fromCurrency} =
                      </p>
                      <p id="to" className="ml-0 md:ml-2 font-bold ">
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
            className="flex flex-col md:flex-row mt-8 md:mt-12 ml-auto mr-auto md:mr-0 w-60 md:w-44 max-h-16 md:max-h-16 font-semibold items-center justify-center"
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
