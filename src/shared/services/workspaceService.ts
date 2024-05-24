import jwtAxios from "app/services/auth/jwt-auth/jwt-api"
import {toast} from "react-toastify";
import {truncateStoreName} from "../constants/TruncateStoreName";


export const createWorkspace = async (requestData:any) => {
    return await jwtAxios.post(`cs-workspace/create-workspace`,requestData).then(async (response:any)=>{
        if (response && (response.status === 200 || response.status === 201)) {
            return response.data
        }
    })
}
export async function getWorkspaces() {
    return await jwtAxios.get<any>(`cs-workspace/get-workspaces`).then((response:any)=>{
        if (response && (response.status === 200 || response.status === 201)) {
            return response.data
        }
    })
}

export async function getWorkspacesByFilter(requestData:any,size:any,page:any) {
    return await jwtAxios.post<any>(`cs-workspace/get-workspaces-by-filter?size=${size}&page=${page}`,requestData).then((response:any)=>{
        if (response && (response.status === 200 || response.status === 201)) {
            return {
                itemNumbers: response.data.itemNumbers,
                pagesNumber: response.data.pagesNumber,
                workSpaceViewDTOS: response.data.workSpaceViewDTOS
            }
        }
    })
}

export async function updateWorkspace(workspace:any) {
    return await jwtAxios.post("cs-workspace/update-workspace", workspace).then((response:any)=>{
        if (response && (response.status === 200 || response.status === 201)) {
            const notify = (name : String) => toast.success("The workspace "+truncateStoreName(name)+" is now updated!",{autoClose: 3000,theme :"colored" });
            notify(workspace.name as string);
        }

    })}


export async function deleteWorkspace(id:any){
    return await jwtAxios.delete(`cs-workspace/delete-workspace?workspaceId=${id}`).then((response:any)=>{
        if (response && (response.status === 200 || response.status === 201)) {
            return response
        }
    })
}

