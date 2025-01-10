import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AnimationProvider } from "./context/AnimationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ShopContextProvider>
          <AnimationProvider>
          <App />
          </AnimationProvider>
        </ShopContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
