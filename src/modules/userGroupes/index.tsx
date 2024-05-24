import React from "react";

export const UserGroupesConfig = [
  {
    auth: ["user"],
    routes: [
      {
        path: "/userGroupes",
        component: React.lazy(() => import("./UserGroupes/index")),
      },
    ],
  },
];
