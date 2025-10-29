import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Link } from "react-router";
import { Header } from "./components/Layout/Header/Header";
import { Footer } from "./components/Layout/Footer/Footer";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "icon",
    href: "/movieLogo.svg",
    type: "image/x-icon",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

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
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let isNotFound = "Oops!";
  if (isRouteErrorResponse(error)) {
    isNotFound = error.status === 404 ? "404" : "Error";
  }

  return (
    <>
      <Header />
      <main className="pt-16 p-4 container mx-auto">
        <div className="max-w-[1200px] m-auto text-center py-20">
          <h1 className="text-3xl font-bold mb-4">
            {isNotFound ? "Movie Not Found" : "Oops!"}
          </h1>
          <p className="text-gray-400 mb-6">
            {isNotFound
              ? "The movie you're looking for doesn't exist."
              : "Something went wrong. Please try again later."}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="px-4 py-1 bg-red-500 rounded hover:bg-red-600"
            >
              Go Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
