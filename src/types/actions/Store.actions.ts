import { IStore } from "../models/Store";

export const GET_STORE = "GET_STORE";
export const GET_STORE_INFOS = "GET_STORE_INFOS";
export interface StoreType {
  type: typeof GET_STORE;
  storeslist: IStore[];
}

export interface GetStoresStateType {
  storeslist: IStore[];
}
