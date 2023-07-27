import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import AdoptedPetContext from "./AdoptedPetContext";

// eslint-disable-next-line react-refresh/only-export-components
const Details = lazy(() => import("./Details"));
// eslint-disable-next-line react-refresh/only-export-components
const SearchParams = lazy(() => import("./SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <div className="loading-pane">
              <h2 className="loader">🐶</h2>
            </div>
          }
        >
          <BrowserRouter>
            <AdoptedPetContext.Provider value={adoptedPet}>
              <header>
                <Link to={"/"}>Adopt Me</Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </AdoptedPetContext.Provider>
          </BrowserRouter>
        </Suspense>
      </QueryClientProvider>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
