import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import generouted from "@generouted/tanstack-react-router";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
    generouted(),
    tsconfigPaths(),
  ],
});
