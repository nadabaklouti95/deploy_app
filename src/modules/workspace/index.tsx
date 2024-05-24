import React from "react";

export const WorkspaceConfig = [
    {
        auth: ["user"],
        routes: [
            {
                path: "/workspace",
                component: React.lazy(() => import("./Workspace")),
            },
        ],
    },
];
