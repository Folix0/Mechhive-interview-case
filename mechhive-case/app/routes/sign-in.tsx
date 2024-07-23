export {}

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign In" },
    { name: "description", content: "Please sign in to proceed!" },
  ];
};

export default function SignIn() {
    return (
      <div>
        <div
          id="background"
          className="min-h-screen text-center flex flex-col items-center justify-center bg-gray-900 text-white z-0"
        >
          <h1 className="text-xl text-gray-200 max-w-96 z-20">Sign In Page</h1>
        </div>
      </div>
    );
  }