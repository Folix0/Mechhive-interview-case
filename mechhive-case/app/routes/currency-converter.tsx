import type { MetaFunction } from "@remix-run/node";
import logo from "../assets/logo.svg";
import CurrencySelector from "~/components/ConvertWindow";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getApiConfig } from "~/utils/getApiConfig";

//Fetch from, to, and amount
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  const amount = url.searchParams.get("amount");

  //If all are present, calculate exchange rate
  let exchangeRate = null;
  if (from && to && amount) {
    const response = await fetch(`https://${API_HOST}/convert?from=${from}&to=${to}&amount=${amount}`, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
      }
    });

    if (!response.ok) {
      throw new Response("Failed to fetch currency exchange", { status: response.status });
    }

    const result = await response.json();
    exchangeRate = result.result;
  }

  const response = await fetch(`https://${API_HOST}/symbols`, {
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST
    }
  });

  if (!response.ok) {
    throw new Response("Failed to fetch available currencies", { status: response.status });
  }

  const availableCurrencies = await response.json();
  return json({ availableCurrencies: availableCurrencies.symbols, exchangeRate });
};

export default function Homepage() {
  const { availableCurrencies, exchangeRate } = useLoaderData<typeof loader>();

  return (
    <div>
      <div
        id="background"
        className="min-h-screen text-center flex flex-col items-center justify-center text-white bg-gradient-to-b from-primary to-secondary pb-12 xl:pb-0"
      >
        <img
          src={logo}
          alt="Logo"
          className="absolute top-1 left-1 ml-4 mt-4 w-16 h-16 xl:ml-32 xl:mt-8 xl:w-24 xl:h-24"
        />
        <h1 className="mt-10">Currency Converter</h1>
        <h3>Check live foreign currency exchange rates</h3>
        <CurrencySelector availableCurrencies={availableCurrencies} initialExchangeRate={exchangeRate} />
      </div>
    </div>
  );
}