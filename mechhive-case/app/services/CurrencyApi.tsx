import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getApiConfig } from "~/utils/getApiConfig";

const { API_KEY, API_HOST } = getApiConfig();

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  const amount = url.searchParams.get("amount");

  //if all params are present, fetch currency symbols
  if (from && to && amount) {
    const response = await fetch(
      `https://${API_HOST}/convert?from=${from}&to=${to}&amount=${amount}`,
      {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
      }
    );

    if (!response.ok) {
      throw new Response("Failed to fetch currency exchange", {
        status: response.status,
      });
    }

    const data = await response.json();
    return json(data);
  } else {
    // Check localStorage for cached symbols
    // TODO: won't work for now since it is checked on the server and not on the client. 
    const cachedSymbols = localStorage.getItem("availableCurrencies");
    if (cachedSymbols) {
      return json(JSON.parse(cachedSymbols));
    }

    const response = await fetch(`https://${API_HOST}/symbols`, {
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST,
      },
    });

    if (!response.ok) {
      throw new Response("Failed to fetch available currencies", {
        status: response.status,
      });
    }

    const data = await response.json();
    // Cache the symbols in localStorage
    localStorage.setItem("availableCurrencies", JSON.stringify(data.symbols));
    return json(data.symbols);
  }
};
