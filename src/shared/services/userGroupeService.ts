import jwtAxios from "app/services/auth/jwt-auth/jwt-api"
import {handleErrors} from "../constants/HandleErrors";
import {notification} from "./functionsService";


export async function getListUserGroupe(requestData:any,size:any,page:any,storeId:any) {
    return await jwtAxios.post<any>(`/cs-user-group/get-user-groups-by-filter?page=${page}&size=${size}&storeId=${storeId}`,requestData).then((response:any)=>{
        if (response && response.status === 200) {
          return response.data
        }
    })
}

export async function createUserGroupe(requestData:any,storeId:any) {
    return await jwtAxios.post<any>(`/cs-user-group/create-user-group?storeId=${storeId}`,requestData).then((response:any)=>{
        if (response && (response.status === 201 || response.status === 200)) {
          return response.data
        }
    })
}

export async function UpdateUserGroupe(requestData:any,storeId:any) {
    return await jwtAxios.put<any>(`/cs-user-group/Update-user-group?storeId=${storeId}`,requestData).then((response:any)=>{
        if (response && (response.status === 201 || response.status === 200)) {
          return response.data
        }
    })
}

export async function deleteUserGroupe(idUserGroupe:any,storeId:any) {
  return await jwtAxios.delete<any>(`/cs-user-group/delete-user-group?userGroupId=${idUserGroupe}&storeId=${storeId}`,).then((response:any)=>{
      if (response && (response.status === 201 || response.status === 200)) {
        return response.data
      }
  })
}


export async function deleteUser(idUser:any) {
  return await jwtAxios.delete<any>(`/cs-user/delete-user?userId=${idUser}`,).then((response:any)=>{
      if (response && (response.status === 201 || response.status === 200)) {
          notification("User deleted with success")
        return response.data
      }
  }).catch(function (error) {
      handleErrors(error,true,null)
  })
}
