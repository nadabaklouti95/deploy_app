import React from "react";

export const TokenConfig = [
  {
    auth: ["user"],
    routes: [
      {
        path: "/token",
        component: React.lazy(() => import("./Token/index")),
      },
    ],
  },
];
