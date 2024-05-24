import React from "react";

export const TagsConfig = [
  {
    auth: ["user"],
    routes: [
      {
        path: "/tags",
        component: React.lazy(() => import("./Tag")),
      },
    ],
  },
];
