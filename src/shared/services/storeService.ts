import jwtAxios from "app/services/auth/jwt-auth/jwt-api"
import { toast } from "react-toastify";
import {truncateStoreName} from "../constants/TruncateStoreName";

export async function getStoreListMode(requestData:any,size:any,page:any) {
    return await jwtAxios.post<any>(`cs-store/get-stores-by-filter?page=${page}&size=${size}`,requestData).then((response:any)=>{
        if (response && response.status === 200) {
          return response.data
        }
    })
}

export async function updateStore(store:any) {
  return await jwtAxios.post("cs-store/update-store", store).then((response:any)=>{
    if (response && (response.status === 200 || response.status === 201)) {
      const notify = (storeName : String) => toast.success("The store "+truncateStoreName(storeName)+" is now updated!",{autoClose: 3000,theme :"colored" });
      notify(store.name as string);
    }

})}


export async function deleteStore(id:any){
  return await jwtAxios.delete(`cs-store/delete-store?storeId=${id}`).then((response:any)=>{
    return response
  })
}

export async function getStores() {
  return await jwtAxios.get<any>(`cs-store/get-stores`).then((response:any)=>{
      if (response && response.status === 200) {
        return response.data
      }
  })
}

export const getStoreStatistics = async(id:any) => {
  return await jwtAxios.get<any>(`cs-store/get-store-statistics?storeId=${id}`).then((response:any)=>{
      if (response && response.status === 200) {
        return response.data
      }
  })
}