import "./index.css";
import { createRoot } from "react-dom/client";
import { Routes } from "./routes.gen";
// import { Routes } from '@generouted/react-router/lazy' // route-based code-splitting

createRoot(document.getElementById("root")!).render(<Routes />);
