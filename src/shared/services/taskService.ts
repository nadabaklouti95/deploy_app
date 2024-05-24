import jwtAxios from "app/services/auth/jwt-auth/jwt-api"
import routesConfig from "modules/routesConfig"
import { ComboBoxRoutes, taskAccessList } from "shared/constants/AppConst"

export async function getListTask(requestData:any,size:any,page:any) {
    return await jwtAxios.post<any>(`cs-task/get-tasks-by-filter?page=${page}&size=${size}&tagId=${requestData.tagId}`,requestData).then((response:any)=>{
        if (response && response.status === 200) {
          return response.data
        }
    })
}

export async function getListTaskAdmin(requestData:any,size:any,page:any) {
  return await jwtAxios.post<any>(`cs-task/get-tasks-for-admin-filter?page=${page}&size=${size}&tagId=${requestData.tagId}`,requestData).then((response:any)=>{
      if (response && response.status === 200) {
        return response.data
      }
  })
}


export async function getTaskLog(tagId:any,taskId:any) {
  return await jwtAxios.get<any>(`cs-task-log/get-task-log?tagId=${tagId}&taskId=${taskId}`).then((response:any)=>{
    if (response && response.status === 200) {
      return response.data
    }
  })
}


export const handleRouteBasedOnAccessRules = (accessRules:any) => {
  let resultRead = []
  let resultWrite = []
  let resultTaskExecute = []
  let indexTask = 0

  const accessRoutesWrite:any = {
    "Workspace":"/workspace",
    "Store":  ["/store", "/storeCreation"],
    "Tag": "/tags",
    "Context": "/context",
    "Property": "/properties",
    "Token": "/token",
    "User group": "/userGroupes",
    "User": "/user",
    "Update context": "/csTask",
    "Publication": "/publish",
    "Upload": "/upload",
    "Export": "/export",
    "Merge tag":"/mergeTag"
  };

  const accessRoutesRead:any = {
    "Workspace":"/workspace",
    "Store": "/store",
    "Tag": "/tags",
    "Context": "/context",
    "Property": ["/properties", "/revision/property"],
    "Token": "/token",
    "User group": "/userGroupes",
    "User": "/user",
    "Publication": "/publish",
    "Upload": "/upload",
    "Export": "/export",
    "Merge tag":"/mergeTag"
  };

  const arrayTask = ["Update context","Publication","Upload","Export","Merge tag"]

  if(accessRules !== null && accessRules !== undefined ){
    if(accessRules.entitiesAccess !== null && accessRules.entitiesAccess !== undefined ){
      for (const entity in accessRules.entitiesAccess) {
        if (accessRules.entitiesAccess[entity].includes("READ")) {
          if (accessRoutesRead[entity]) { 
            if (Array.isArray(accessRoutesRead[entity])) {
              resultRead.push(...accessRoutesRead[entity]);
            } else {
              resultRead.push(accessRoutesRead[entity]);
            }
          }
        }
        if (accessRules.entitiesAccess[entity].includes("WRITE")) {
          if (Array.isArray(accessRoutesWrite[entity])) {
            resultWrite.push(...accessRoutesWrite[entity]);
          } else {
            resultWrite.push(accessRoutesWrite[entity]);
          }
        }
      }

      for (const task in accessRules.tasksAccess) {
        if(arrayTask.includes(task)){
        if (accessRules.tasksAccess[task].includes("READ")) {
          indexTask++;
          if (Array.isArray(accessRoutesRead[task])) {
            
            resultRead.push(...accessRoutesRead[task]);
          } else {
            resultRead.push(accessRoutesRead[task]);
          }
        }
        if (accessRules.tasksAccess[task].includes("EXECUTE")) {
          if (accessRoutesRead[task]) {
            indexTask++;
            resultWrite.push(accessRoutesWrite[task]);
            resultTaskExecute.push(task);
          }
        }
      }
      }


        if (accessRules.entitiesAccess["Tag"].includes("READ") && Object.keys(accessRules.tasksAccess).length === indexTask) {
          // Add the additional URLs for "READ" access
          resultRead.push("/csTask");
        }
        resultRead = resultRead.filter((elementUrl:any)=>elementUrl !== undefined)
      let resultAccess:any = {
        write : resultWrite,
        read : resultRead.filter((elementUrl:any)=>elementUrl !== undefined),
        execute : resultTaskExecute
      }
    return resultAccess
  }else{
    return {
      write : ComboBoxRoutes,
      read : ComboBoxRoutes,
      execute : taskAccessList
    }
  }
  }else{
    return {
      write : ComboBoxRoutes,
      read : ComboBoxRoutes,
      execute : taskAccessList
    }
  }
}




export const getNavList = (accessRoutes: any) => {
  if (accessRoutes !== undefined) {
    let filteredRoutesConfig = routesConfig.filter((route: any) => {
      if (route.url) {
        // If the route has a URL property, check if it's in the result array
        return accessRoutes.includes(route.url);
      } else if (route.children) {
        // If it's a collapse type with children, filter the collapse type route itself
        route.children = route.children.filter((child: any) => accessRoutes.includes(child.url));
        return route.children.length > 0;
      } else {
        // If it doesn't have a URL or children, keep it in the config
        return true;
      }
    });
    return filteredRoutesConfig;
  } else {
    return routesConfig;
  }
};