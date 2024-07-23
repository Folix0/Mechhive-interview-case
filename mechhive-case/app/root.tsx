import { Links, Meta, Outlet, Scripts, ScrollRestoration, useNavigate, useLocation } from "@remix-run/react";
import { AuthProvider, useAuth } from "./services/authContext";
import { useEffect } from "react";
import "./styles/tailwind.css";

//checking if the user is authenticated. If not, we redirect the user to sign-in page
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/" && location.pathname !== "/sign-in") {
      navigate("/sign-in");
    }
  }, [isAuthenticated, navigate, location.pathname]);

  if (!isAuthenticated && location.pathname !== "/" && location.pathname !== "/sign-in") {
    return <div>Redirecting to sign-in...</div>;
  }

  return <>{children}</>;
}

//HTML structure defined
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    </AuthProvider>
  );
}