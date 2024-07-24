import { useState, useEffect } from "react";
import CurrencySelector from "./CurrencySelector";
import swapArrows from "../assets/swapArrows.svg";
import { getApiConfig } from "~/utils/getApiConfig";

const { API_KEY, API_HOST } = getApiConfig();

const ConvertWindow: React.FC<{ availableCurrencies: { [key: string]: string }, initialExchangeRate: number | null }> = ({ availableCurrencies, initialExchangeRate }) => {
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [amount, setAmount] = useState<number>(1);
  const [exchangeRate, setExchangeRate] = useState<number | null>(initialExchangeRate);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  useEffect(() => {
    if (amount === 0 || amount === undefined) {
      setExchangeRate(null);
    } else if (exchangeRate !== null) {
      setConvertedAmount(amount * exchangeRate);
    }
  }, [exchangeRate, amount]);

  const handleFromCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(event.target.value);
    setExchangeRate(null);
  };

  const handleToCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(event.target.value);
    setExchangeRate(null);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
  setAmount(value === "" ? 0 : parseFloat(value));
};

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setExchangeRate(null);
  };

  //Fetching the base exchange rate between the two currencies
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://${API_HOST}/convert?from=${fromCurrency}&to=${toCurrency}&amount=1`, {
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': API_HOST
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch currency exchange");
      }

      const result = await response.json();
      setExchangeRate(result.result);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  return (
    <div
      id="ConvertForm"
      className="mt-3 xl:mt-16 pl-2 xl:pl-4 pr-2 xl:pr-4 py-2 xl:py-4 px-8 xl:px-16 rounded-2xl xl:shadow-custom-inner-outer xl:bg-gradient-to-b from-tertiary via-tertiary via-50% to-secondary"
    >
      <form onSubmit={handleSubmit} className="text-black mt-4 xl:mt-12 mr-1 xl:mr-2 ml-1 xl:ml-2 xl:mb-14">
        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex flex-col order-first xl:order-1">
            <p className="text-left mb-2 text-white text-xl font-semibold">From</p>
            <CurrencySelector
              name="from"
              currencies={availableCurrencies}
              onChange={handleFromCurrencyChange}
              value={fromCurrency}
            />
          </div>
          <div className="flex justify-center xl:items-end xl:mb-1 order-1 xl:order-0">
            <img
              src={swapArrows}
              alt="SwapArrows"
              className="max-w-14 max-h-14 cursor-pointer"
              onClick={handleSwapCurrencies}
            />
          </div>
          <div className="flex flex-col order-3 xl:order-last">
            <p className="text-left mb-2 text-white text-xl font-semibold">To</p>
            <CurrencySelector
              name="to"
              currencies={availableCurrencies}
              onChange={handleToCurrencyChange}
              value={toCurrency}
            />
          </div>
          <div className="flex flex-col order-3 xl:order-first">
            <p className="text-left mb-2 text-white text-xl font-semibold">Amount</p>
            <input
              id="convertBox"
              className="w-80"
              name="amount"
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={handleAmountChange}
              required
            />
          </div>
        </div>
        <div id="ExchangeInfo" className="flex flex-col xl:flex-row">
          <div className="flex flex-col mt-auto items-baseline justify-end text-white">
            <div className="text-white text-xl font-bold flex flex-row items-baseline">
              {exchangeRate !== null && (
                <div className="ml-1 xl:ml-2 text-4xl xl:text-3xl mt-5 xl:mt-0 flex flex-col font-normal">
                  <>
                    <div className="flex flex-col xl:flex-row xl:items-baseline">
                      <p id="from" className="text-xl mr-auto">
                        {amount.toFixed(2)} {fromCurrency} =
                      </p>
                      <p id="to" className="ml-0 xl:ml-2 font-bold ">
                        {convertedAmount?.toFixed(8)} {toCurrency}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="flex text-base text-white ">
                        1 {toCurrency} = {(1 / exchangeRate).toFixed(6)} {fromCurrency}
                      </p>
                    </div>
                  </>
                </div>
              )}
            </div>
          </div>
          <button
            className="flex flex-col xl:flex-row mt-8 xl:mt-12 ml-auto mr-auto xl:mr-0 w-60 xl:w-44 max-h-16 xl:max-h-16 font-semibold items-center justify-center"
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