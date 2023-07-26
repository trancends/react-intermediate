import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import { useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";

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
    <div
      className="m-0 p-0"
      style={{
        background: "url(https://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AdoptedPetContext.Provider value={adoptedPet}>
            <header className="mb-10 w-full bg-gradient-to-l from-sky-400 via-purple-500 to-rose-500 p-7 text-center">
              <Link to={"/"}>Adopt Me</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </AdoptedPetContext.Provider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
