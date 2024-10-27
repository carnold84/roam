/* @refresh reload */
import { Router } from "@solidjs/router";
import { lazy } from "solid-js";
import { render } from "solid-js/web";

import AuthProvider from "./context/AuthProvider";
import "./index.css";
import MainLayout from "./layouts/MainLayout";

const routes = [
  {
    children: [
      {
        component: lazy(() => import("./routes/HomeRoute")),
        path: "/",
      },
      {
        path: "trips/:tripId",
        children: [
          {
            component: lazy(() => import("./routes/trip/TripRoute")),
            path: "/",
          },
          {
            component: lazy(() => import("./routes/LocationRoute")),
            path: "locations/:locationId",
          },
        ],
      },
    ],
    component: MainLayout,
    path: "/",
  },
];

const root = document.getElementById("root");

render(
  () => (
    <AuthProvider>
      <Router>{routes}</Router>
    </AuthProvider>
  ),
  root!,
);
