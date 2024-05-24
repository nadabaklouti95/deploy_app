import jwtAxios from "app/services/auth/jwt-auth/jwt-api"
import {handleErrors} from "../../shared/constants/HandleErrors";


export const getPropertyTree = async (idTag:any,RequestData:any) =>{
    if (idTag !== undefined || idTag !== null) { 
         let tagId = RequestData.tagId
      return await jwtAxios.post<any>(`/cs-property/get-tree-properties-by-filter?tagId=${tagId}`,RequestData).then((response:any)=>{
        if (response && response.status === 200) {
          return response.data
        }
      }).catch(function (error) {
        handleErrors(error, true, null)

      })
    }
  }
