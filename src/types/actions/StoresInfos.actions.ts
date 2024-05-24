import { IStoreInfos } from "types/models/StoreInfos";

export const GET_STORE_INFOS = "GET_STORE_INFOS";

export interface loadstoreinfosType {
  type: typeof GET_STORE_INFOS;
  storelistsinfos: IStoreInfos[];
}

export interface GetStoresInfosType {
  storeslistinfos: IStoreInfos[];
}
