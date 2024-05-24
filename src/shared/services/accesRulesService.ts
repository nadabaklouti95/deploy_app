import jwtAxios from "app/services/auth/jwt-auth/jwt-api"
import { useHistory } from "react-router-dom";

export function useCustomHistory() {
  return useHistory();
}

export async function getListAccesRules(requestData:any,size:any,page:any) {
    return await jwtAxios.post<any>(`cs-access-rule/get-access-rules?page=${page}&size=${size}`,requestData).then((response:any)=>{
        if (response && (response.status === 200 || response.status === 201)) {
          return response.data
        }
    })
}


export async function updateAccesRules(requestData:any,storeId:any) {
  return await jwtAxios.post<any>(`cs-access-rule/update-access-rule?storeId=${storeId}`,requestData).then((response:any)=>{
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data
      }
  })
}

export async function updateGeneralAccessRules(requestData:any,storeId:any) {
  return await jwtAxios.post<any>(`cs-general-access-rule/update-general-access-rule?storeId=${storeId}`,requestData).then((response:any)=>{
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data
      }
  })
}

export async function getMapperAccess() {
  return await jwtAxios.get<any>(`cs-general-access-rule/get-general-access-dependency`).then((response:any)=>{
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data
      }
  })
}


export function convertMapperData(data:any) {
  const relatedRulesEnum = [];
  const relatedUncheckRules = [];

  // Iterate over entities
  for (const entity in data.entities) {
    const entityData = data.entities[entity];
    const readDependencies = entityData.read.depend_entities_read;
    const writeDependencies = entityData.write.depend_entities_read;

    // Add to relatedRulesEnum
    relatedRulesEnum.push({
      name: entity,
      values: readDependencies.map((dep:any) => ({
        key: dep,
        type: "ENTITY",
        action: null
      }))
    });

    // Add to relatedUncheckRules
    relatedUncheckRules.push({
      name: entity,
      values: writeDependencies.map((dep:any) => ({
        key: dep,
        type: "ENTITY"
      }))
    });
  }

  // Iterate over tasks
  for (const task in data.tasks) {
    const taskData = data.tasks[task];
    const readDependencies = taskData.read.depend_entities_read;
    const writeDependencies = taskData.execute.depend_entities_write;

    // Add to relatedRulesEnum
    relatedRulesEnum.push({
      name: task,
      values: readDependencies.map((dep:any) => ({
        key: dep,
        type: "ENTITY",
        action: "READ"
      }))
    });

    // Add to relatedUncheckRules
    relatedUncheckRules.push({
      name: task,
      values: writeDependencies.map((dep:any) => ({
        key: dep,
        type: "TASK"
      }))
    });
  }

  return {relatedRulesEnum: relatedRulesEnum,relatedUncheckRules: relatedUncheckRules };
}


export async function getUserAccessRules() {
  return await jwtAxios.get<any>(`cs-general-access-rule/get-general-access-rule-for-authenticated-user`).then((response:any)=>{
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data
      }
      if (response && (response.status === 401 || response.status === 401)) {
        const history = useCustomHistory(); 
        history.push('/signin');
        return "unauthorized"
      }
  }).catch((error)=>{
    const history = useCustomHistory(); 
    history.push('/signin');
  })
}