import { IWorkspace } from "../models/Workspace";

export const GET_WORKSPACE = "GET_WORKSPACE";
export const GET_WORKSPACE_INFOS = "GET_WORKSPACE_INFOS";
export interface WorkspaceType {
    type: typeof GET_WORKSPACE;
    workspaceslist: IWorkspace[];
}

export interface GetWorkspacesStateType {
    workspaceslist: IWorkspace[];
}
