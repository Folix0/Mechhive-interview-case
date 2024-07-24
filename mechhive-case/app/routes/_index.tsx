import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react"
import logo from "../assets/logo.svg";
import { useAuth } from "~/services/authContext";

export const meta: MetaFunction = () => {
  return [
    { title: "Homepage" },
    { name: "description", content: "Welcome to the Homepage!" },
    { name: "keywords", content: "homepage, currency, converter, money transfer" },
    { property: "og:title", content: "Homepage" },
    { property: "og:description", content: "Welcome to the Homepage!" },
    { property: "og:type", content: "website" },
  ];
};

export default function Homepage() {
  let navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div
        id="background"
        className="min-h-screen text-center flex flex-col items-center justify-center text-white bg-gradient-to-b from-primary to-secondary pb-12 xl:pb-0"
      >
        <img src={logo} alt="Logo" className="absolute top-1 left-1 ml-8 mt-4 w-16 h-16 xl:ml-32 xl:mt-8 xl:w-24 xl:h-24"   />
        
        <h1>
          Trusted Global Currency Converter & Money Transfer Solutions
        </h1>
        <h3 className="ml-8 mr-8">
        Best source for currency conversion, sending money online and tracking exchange rates
        </h3>
        <button onClick={() => navigate("/currency-converter")}>
          Convert
        </button> 
        {isAuthenticated && (
          <button onClick={handleLogout} className="mt-4 xl:mt-8 p-2 text-xs xl:text-sm text-black absolute top-1 right-1 mr-8 xl:mr-24 w-18 xl:w-24 h-9 xl:h-12">
            Sign Out
          </button>
        )}       
      </div>
    </div>
  );
}
