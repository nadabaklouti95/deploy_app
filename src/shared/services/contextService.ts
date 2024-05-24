import jwtAxios from "app/services/auth/jwt-auth/jwt-api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {handleErrors} from "../constants/HandleErrors";

  export const LoadContextByStoreId = (id: number) => {
    const [context, setContext] = useState<any>([]);
    const [loadingContext, setLoadingContext] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
      let isMounted = true;
  
      const fetchData = async (Id: number) => {
        if (id !== undefined) {
          try {
            const res = await jwtAxios.get(`cs-context/get-contexts-by-store?storeId=${Id}`);
            if (res && res.status === 200) {
              setContext(res.data);
            }
          } catch (err) {
            handleErrors(err,true,null)

          } finally {
            isMounted && setLoadingContext(true);
          }
        }
      };
  
      fetchData(id);
  
      const cleanup = () => {
        isMounted = false;
      };
  
      return cleanup;
    }, [id, dispatch]);
  
    return { context, loadingContext };
  };

  export const getContextByStoreId = async (storeId:any) => {
    return await jwtAxios.get(`/cs-context/get-contexts-by-store?storeId=${storeId}`).then(async (response:any)=>{
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data
      }
    })
  }

  export const deleteContextKey = async (idContext:any,storeId:any) =>{
    return jwtAxios.delete(`/cs-context/delete-context-key-values?keyId=${idContext}&storeId=${storeId}`).then((response:any)=>{
     return response.data
    })
  }

  export const updateContextKey = async (RequestData:any,storeId:any) => {
    return await jwtAxios.put(`cs-context/update-context-key?storeId=${storeId}`,RequestData).then(async (response:any)=>{
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data
      }
    })
  }

  export const updateContextValue = async (RequestData:any,storeId:any) => {
    return await jwtAxios.put(`cs-context/update-context-values?storeId=${storeId}`,RequestData).then(async (response:any)=>{
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data
      }
    })
  }

  export const createContextKeyValue = async (RequestData:any) => {
    return await jwtAxios.post(`cs-context/create-context-key-values?storeId=${RequestData.store.id}`,RequestData).then(async (response:any)=>{
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data
      }
    })
  }

  export const updatePriority = async (RequestData:any) => {
    return await jwtAxios.put(`cs-context/update-context-key-priority?storeId=${RequestData.storeId}`,RequestData).then(async (response:any)=>{
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data
      }
    })
  }

  export const updateContext = async (RequestData:any) => {
    return await jwtAxios.post(`cs-update-context/update-context-store?storeId=${RequestData.updateContextTaskDTO.storeId}`,RequestData).then(async (response:any)=>{
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data
      }
    })
  }

  export const handleContextPriority = (listContext:any,contextValue:any) =>{
    let interList:any = JSON.parse(JSON.stringify(contextValue))
    let testList:any = []
    let result = []
    if(listContext.length > 0){
      for (let index = 0; index < listContext.length; index++) {
        const element = listContext[index];
        let foundElement:any = interList.find((obj:any)=>obj.key === element.name)
        if(foundElement !== undefined){
          result.push(foundElement)
          testList.push(foundElement)
        }
        
      }
      if(testList.length < interList.length ){
        let myArray = interList.filter( function( el:any ) {
          return testList.indexOf( el ) < 0;
        } );
        result = result.concat(myArray);
      }
    }
    return result

  }
