import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import IVRVerification from "./pages/IVRVerification";
import InAppCheckout from "./pages/InAppCheckout";

function Router() {
  const path = window.location.pathname;
  if (path.startsWith("/ivr")) return <IVRVerification />;
  if (path.startsWith("/in-app-checkout")) return <InAppCheckout />;
  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
