import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import IVRVerification from "./pages/IVRVerification";

function Router() {
  const path = window.location.pathname;
  if (path.startsWith("/ivr")) return <IVRVerification />;
  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
