import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react"
import logo from "../assets/logo.svg";
import { useAuth } from "~/services/authContext";

export const meta: MetaFunction = () => {
  return [
    { title: "Homepage" },
    { name: "description", content: "Welcome to the Homepage!" },
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
        className="min-h-screen text-center flex flex-col items-center justify-center text-white bg-gradient-to-b from-primary to-secondary pb-12 md:pb-0"
      >
        <img src={logo} alt="Logo" className="absolute top-1 left-1 ml-8 mt-4 w-16 h-16 md:ml-32 md:mt-8 md:w-24 md:h-24"   />
        
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
          <button onClick={handleLogout} className="mt-4 md:mt-8 p-2 text-xs md:text-sm text-black absolute top-1 right-1 mr-8 md:mr-24 w-18 md:w-24 h-9 md:h-12">
            Sign Out
          </button>
        )}       
      </div>
    </div>
  );
}
