import React from "react";

export const ProperyRevisionConfig = [
  {
    auth: ["user"],
    routes: [
      {
        path: "/revision/property",
        component: React.lazy(() => import("./PropertyRevision")),
      },
    ],
  },
];