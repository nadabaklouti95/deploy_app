import React from "react";

export const StoreConfig = [
  {
    auth: ["user"],
    routes: [
      {
        path: "/store",
        component: React.lazy(() => import("./Store")),
      },
      {
        path: "/storeCreation",
        component: React.lazy(() => import("./StoreCreation/Store")),
      },
    ],
  },
];
