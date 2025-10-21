// Generouted, changes to this file will be overridden
import { Fragment } from "react";
import {
  Outlet,
  RouterProvider,
  createLazyRoute,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import App from "./pages/_app";

const root = createRootRoute({ component: App || Outlet });
const _404 = createRoute({
  getParentRoute: () => root,
  path: "*",
  component: Fragment,
});
const auth = createRoute({ getParentRoute: () => root, path: "auth" }).lazy(
  () =>
    import("./pages/auth/_layout").then((m) =>
      createLazyRoute("/auth")({ component: m.default }),
    ),
);
const authlogin = createRoute({ getParentRoute: () => auth, path: "login" });
const authloginindex = createRoute({
  getParentRoute: () => authlogin,
  path: "/",
}).lazy(() =>
  import("./pages/auth/login/index").then((m) =>
    createLazyRoute("/auth/login")({ component: m.default }),
  ),
);
const app = createRoute({
  getParentRoute: () => root,
  path: "app",
  // @ts-ignore
  loader: (...args) =>
    import("./pages/app/_layout").then((m) => m.Loader(...args)),
}).lazy(() =>
  import("./pages/app/_layout").then((m) =>
    createLazyRoute("/app")({ component: m.default }),
  ),
);
const appusers = createRoute({ getParentRoute: () => app, path: "users" });
const appusersindex = createRoute({
  getParentRoute: () => appusers,
  path: "/",
}).lazy(() =>
  import("./pages/app/users/index").then((m) =>
    createLazyRoute("/app/users")({ component: m.default }),
  ),
);
const appindex = createRoute({ getParentRoute: () => app, path: "/" }).lazy(
  () =>
    import("./pages/app/index").then((m) =>
      createLazyRoute("/app")({ component: m.default }),
    ),
);
const appfood = createRoute({ getParentRoute: () => app, path: "food" });
const appfoodindex = createRoute({
  getParentRoute: () => appfood,
  path: "/",
}).lazy(() =>
  import("./pages/app/food/index").then((m) =>
    createLazyRoute("/app/food")({ component: m.default }),
  ),
);
const index = createRoute({
  getParentRoute: () => root,
  path: "/",
  // @ts-ignore
  loader: (...args) => import("./pages/index").then((m) => m.Loader(...args)),
}).lazy(() =>
  import("./pages/index").then((m) =>
    createLazyRoute("/")({ component: m.default }),
  ),
);

const config = root.addChildren([
  auth.addChildren([authlogin.addChildren([authloginindex])]),
  app.addChildren([
    appusers.addChildren([appusersindex]),
    appindex,
    appfood.addChildren([appfoodindex]),
  ]),
  index,
  _404,
]);

const router = createRouter({ routeTree: config });
export const routes = config;
export const Routes = () => <RouterProvider router={router} />;

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
