export interface IWorkspace {
    workSpaceDTO: IWorkspaceDTO,
    storeList: IWorkspaceStore[]
}

export interface IWorkspaceDTO {
  id: number;
  name: string;
  description: string;
  delete: any;

}

export interface IWorkspaceStore {
    id: number;
    name: string;
}


