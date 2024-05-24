import React from "react";

export const PropertiesConfig = [
  {
    auth: ["user"],
    routes: [
      {
        path: "/properties",
        component: React.lazy(() => import("./Properties")),
      },
    ],
  },
];
