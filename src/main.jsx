import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "../ui/ErrorFallback.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary
    FallbackComponent={ErrorBoundaryFallback}
    onReset={() => {
      window.location.replace = "/";
    }}
  >
    <App />
  </ErrorBoundary>
);
