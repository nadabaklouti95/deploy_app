import jwtAxios from "app/services/auth/jwt-auth/jwt-api"
import { toast } from "react-toastify";


export const exportFile = async (data:any,fileName:any)=>{
  let requestData = data
let tagId = data.fileExportTaskDTO.tagId
  return await jwtAxios.post(`cs-export/export?tagId=${tagId}`,requestData)
      .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${fileName}`);
          document.body.appendChild(link);
          link.click();
          link.remove();
          return response.status
      })
}


export const getExportedFile = async (data:any,row:any,page:any)=>{
let requestData = data
let tagId = data.tagId
return await jwtAxios.post(`cs-export/get-exported-files-by-filter?page=${page}&size=${row}&tagId=${tagId}`,requestData)
    .then((response) => {
        if(response.status === 200 || response.status === 201){
            return response.data
       }
    })
}



export const getTags = async (id: number)=>{
    if (id !== undefined) {
    return await jwtAxios.get<any>(`/cs-tag/get-all-tags?storeId=${id}`).then((response:any)=>{
        if (response.status === 200) {
         return response.data
        }
      }).catch(function (error) {
        if (error.request) {
          // The request was made but no response was received
          let notify:any 
          notify = (value : String) => toast.success(`Erreur ${value} occurred, please contact your administrator!`,{autoClose: 2000,theme :"colored" ,type:"error"});
          notify(error.request.response.status as string);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      })
    }
}

