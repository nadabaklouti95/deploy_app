import React from "react";

export const exportConfig = [
  {
    auth: ["user"],
    routes: [
      {
        path: "/export",
        component: React.lazy(() => import("./Export/index")),
      },
    ],
  },
];
