import jwtAxios from "app/services/auth/jwt-auth/jwt-api"

export const getAudit = async (value:any,size:any,page:any) =>{
  if(value.storeId !== undefined){
    return await jwtAxios.post(`/cs-entity-audit/get-properties-audit?page=${page}&size=${size}`, value).then(async (response:any)=>{
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data
      }
    })
  }
    
  }
  

  export const getPropertyAudit = async (PropertId:any) =>{
    return await jwtAxios.get(`/cs-entity-audit/get-property-audit?sourceId=${PropertId}`).then(async (response:any)=>{
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data
      }
    })
  }
  