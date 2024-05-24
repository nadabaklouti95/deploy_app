import React from "react";

export const csTaskConfig = [
  {
    auth: ["user"],
    routes: [
      {
        path: "/csTask",
        component: React.lazy(() => import("./CsTask/index")),
      },
    ],
  },
];
