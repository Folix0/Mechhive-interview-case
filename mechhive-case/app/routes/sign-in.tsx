import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { useAuth } from "../services/authContext";
import { useNavigate } from "@remix-run/react";
import logo from "../assets/logo.svg";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign In" },
    { name: "description", content: "Please sign in to proceed!" },
    { name: "keywords", content: "sign in, login, authentication" },
    { property: "og:title", content: "Sign In" },
    { property: "og:description", content: "Please sign in to proceed!" },
    { property: "og:type", content: "website" },
  ];
};

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Pass username and password to the login function
    login({ username, password });
    navigate("/"); // Redirect to homepage after successful login
  };

  return (
    <div>
      <div
        id="background"
        className="min-h-screen text-center flex flex-col items-center justify-center text-white bg-gradient-to-b from-primary to-secondary pb-12 xl:pb-0"
      >
        <img src={logo} alt="Logo" className="absolute top-1 left-1 ml-8 mt-4 w-16 h-16 xl:ml-32 xl:mt-8 xl:w-24 xl:h-24"/>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
          <p className="mt-1 mb-1 text-white italic">Psst! Try 'admin' and 'password'</p>
          <input
            type="text"
            id="convertBox"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className=""
          />
          <input
            type="password"
            id="convertBox"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-black/50 xl:shadow-black/40"
          />
          <button type="submit" className="">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}