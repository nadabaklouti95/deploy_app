import React from "react";

export const UserConfig = [
  {
    auth: ["user"],
    routes: [
      {
        path: "/user",
        component: React.lazy(() => import("./User/index")),
      },
    ],
  },
];
