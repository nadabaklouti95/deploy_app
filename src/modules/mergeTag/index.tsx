import React from "react";

export const MergeTagConfig = [
  {
    auth: ["user"],
    routes: [
      {
        path: "/mergeTag",
        component: React.lazy(() => import("./MergeTag/index")),
      },
    ],
  },
];
