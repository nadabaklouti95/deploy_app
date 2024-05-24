import React from "react";
import { Redirect } from "react-router-dom";

import { createRoutes } from "../app/utility/Utils";
import { samplePagesConfig } from "./sample";
import { errorPagesConfigs } from "./errorPages";
import { authRouteConfig } from "./auth";
import { initialUrl } from "../shared/constants/AppConst";
import { StoreConfig } from "./store";
import { ContextConfig } from "./context";
import { TagsConfig } from "./tags";
import { PropertiesConfig } from "./properties";
import { TokenConfig } from "./token";
import { UploadConfig } from "./upload";
import { PublishConfig } from "./publish";
import { UserConfig } from "./user";
import { exportConfig } from "./export";
import { UserGroupesConfig } from "./userGroupes";
import { csTaskConfig } from "./csTask";
import { ProperyRevisionConfig } from "./propertyRevision";
import { CsTaskAdminConfig } from "./csTaskAdmin";
import { MergeTagConfig } from "./mergeTag";
import {WorkspaceConfig} from "./workspace";

 const routeConfigs = [
  ...samplePagesConfig,
  ...ContextConfig,
  ...errorPagesConfigs,
  ...authRouteConfig,
  ...StoreConfig,
  ...TagsConfig,
  ...PropertiesConfig,
  ...TokenConfig,
  ...UploadConfig,
  ...PublishConfig,
  ...UserConfig,
  ...exportConfig,
  ...UserGroupesConfig,
  ...csTaskConfig,
  ...ProperyRevisionConfig,
  ...ProperyRevisionConfig,
  ...CsTaskAdminConfig,
  ...MergeTagConfig,
  ...WorkspaceConfig,
];

const routes = [
  ...createRoutes(routeConfigs),
  {
    path: "/",
    exact: true,
    component: () => <Redirect to={initialUrl} />,
  },
  {
      path: "/workspace",
      exact: true,
      component: () => <Redirect to="/workspace" />,
  },
  {
    path: "/context",
    exact: true,
    component: () => <Redirect to="/context" />,
  },
  {
    path: "/tags",
    exact: true,
    component: () => <Redirect to="/tags" />,
  },
  {
    path: "/properties",
    exact: true,
    component: () => <Redirect to="/properties" />,
  },
  {
    path: "/token",
    exact: true,
    component: () => <Redirect to="/token" />,
  },
  {
    path: "/upload",
    exact: true,
    component: () => <Redirect to="/upload" />,
  },
  {
    path: "/publish",
    exact: true,
    component: () => <Redirect to="/publish" />,
  },
  {
    path: "/user",
    exact: true,
    component: () => <Redirect to="/user" />,
  },
  {
    path: "/userGroupes",
    exact: true,
    component: () => <Redirect to="/userGroupes" />,
  },
  {
    path: "/errorPages/Error404",
    exact: true,
    component: () => <Redirect to="/error-pages/error-404" />,
  },
  {
    path: "/errorPages/Error403",
    exact: true,
    component: () => <Redirect to="/error-pages/error-403" />,
  },
  {
    path: "/export",
    exact: true,
    component: () => <Redirect to="/export" />,
  },
  {
    path: "/csTask",
    exact: true,
    component: () => <Redirect to="/csTask" />,
  },
  {
    path: "/revision/property",
    exact: true,
    component: () => <Redirect to="/propertyRevision" />,
  },
  {
    path: "/task/admin",
    exact: true,
    component: () => <Redirect to="/task/admin" />,
  },
  
  {
    path: "/mergeTag",
    exact: true,
    component: () => <Redirect to="/mergeTag" />,
  },
];

export default routes;
