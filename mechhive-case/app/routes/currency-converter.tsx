import type { MetaFunction } from "@remix-run/node";
import logo from "../assets/logo.svg";
import CurrencySelector from "~/components/ConvertWindow";

export const meta: MetaFunction = () => {
  return [
    { title: "Exchange Converter" },
    {
      name: "description",
      content: "A tool with which you can calculate your exchange rate!",
    },
  ];
};

export default function Homepage() {
  return (
    <div>
      <div
        id="background"
        className="min-h-screen text-center flex flex-col items-center justify-center text-white bg-gradient-to-b from-primary to-secondary pb-12 md:pb-0"
      >
        <img
          src={logo}
          alt="Logo"
          className="absolute top-1 left-1 ml-4 mt-4 w-16 h-16 md:ml-32 md:mt-8 md:w-24 md:h-24"
        />
        <h1 className="mt-10">Currency Converter</h1>
        <h3>Check live foreign currency exchange rates</h3>
        <CurrencySelector />
      </div>
    </div>
  );
}
