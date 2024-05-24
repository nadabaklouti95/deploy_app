import React from "react";

export const ContextConfig = [
  {
    auth: ["user"],
    routes: [
      {
        path: "/context",
        component: React.lazy(() => import("./Context")),
      },
    ],
  },
];
