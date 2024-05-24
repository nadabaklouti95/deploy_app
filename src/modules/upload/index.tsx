import React from "react";

export const UploadConfig = [
  {
    auth: ["user"],
    routes: [
      {
        path: "/upload",
        component: React.lazy(() => import("./Upload/index")),
      },
    ],
  },
];
