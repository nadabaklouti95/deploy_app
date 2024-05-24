import React from "react";

export const CsTaskAdminConfig = [
  {
    auth: ["user"],
    routes: [
      {
        path: "/task/admin",
        component: React.lazy(() => import("./CsTaskAdmin")),
      },
    ],
  },
];