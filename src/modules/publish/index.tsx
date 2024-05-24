import React from "react";

export const PublishConfig = [
  {
    auth: ["user"],
    routes: [
      {
        path: "/publish",
        component: React.lazy(() => import("./Publish/index")),
      },
    ],
  },
];
