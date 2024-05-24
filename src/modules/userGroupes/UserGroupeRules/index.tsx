
import { CircularProgress, IconButton, ThemeProvider, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as React from "react";
import { useState } from "react";
import {  ActionAccessMode, ActionMode, EAccesRules, EAccesRulesLevel,  EAccesRulesType,  EStatus } from "shared/constants/AppEnums";
import { IUserGroupeRules } from "types/models/interface";
import useStyles from "./styles";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { generalRuleFirstRow, generalRuleSecondeRow, relatedRulesEnum, relatedUncheckRules, taskTypeRow, themeButton } from "shared/constants/AppConst";
import { toast } from "react-toastify";
import { Alert } from "@material-ui/lab";
import AccessCheckbox from "shared/components/AccessCheckbox";
//import { convertMapperData } from "shared/services/accesRulesService";
//import { accessRuleMapper } from "_helpers";


    let colors = ["#bad8f3", "#f5d5ce", "#cef5e5"];
    for (var i = 0; i < 100; i++) {
        colors.push("#bad8f3", "#f5d5ce", "#cef5e5");
    }

    const notification = () =>{
      let notify 
      notify = (value : String) => toast.success("Access Rules updated with success",{autoClose: 3000,theme :"colored",type:"success" });
        toast.dismiss();
        notify("" as string);
    }

    const getAllRules = (JSONElement:any,writeAccess:any) =>{
      try {      
        let listElement = convertJsonToArray(JSONElement)
        let result = []
        let readAppearance = 0;
        let writeAppearance = 0;
        for (let index = 0; index < listElement.length; index++) {
          const element = listElement[index].values;
          let foundWrite = element.find((obj:any) => obj === writeAccess)
          let foundRead = element.find((obj:any) => obj === EAccesRules.READ)
          if(foundWrite !== undefined){writeAppearance = writeAppearance + 1}
          if(foundRead !== undefined){readAppearance = readAppearance + 1}
        }
        if(listElement.length === writeAppearance){
          result.push(writeAccess)
        }
        if(listElement.length === readAppearance){
          result.push(EAccesRules.READ)
        }
        return result   
    } catch (error) {
        console.log("UserGroupeRules: errors in method getAllRules ")
    }      
    }

    const getAllRulesCheck = (listElement:any,writeAccess:any) =>{
      try {  
      let result = []
      let readAppearance = 0;
      let writeAppearance = 0;
      for (let index = 0; index < listElement.length; index++) {
        const element = listElement[index].values;
        let foundWrite = element.find((obj:any) => obj === writeAccess)
        let foundRead = element.find((obj:any) => obj === EAccesRules.READ)
        if(foundWrite !== undefined){writeAppearance = writeAppearance + 1}
        if(foundRead !== undefined){readAppearance = readAppearance + 1}
      }
      if(listElement.length === writeAppearance){
        result.push(writeAccess)
      }
      if(listElement.length === readAppearance){
        result.push(EAccesRules.READ)
      }
      return result     
    } catch (error) {
      console.log("UserGroupeRules:  errors in method getAllRulesCheck ")
    }     
    }

    const checkAllRules = (listAccess:any,writeAccess:any) =>{
      try {  
      let listElement = listAccess
      let result = []
      let readAppearance = 0;
      let writeAppearance = 0;
      for (let index = 0; index < listElement.length; index++) {
        const element = listElement[index].values;
        let foundWrite = element.find((obj:any) => obj === writeAccess)
        let foundRead = element.find((obj:any) => obj === EAccesRules.READ)
        if(foundWrite !== undefined){writeAppearance = writeAppearance + 1}
        if(foundRead !== undefined){readAppearance = readAppearance + 1}
      }
      if(listElement.length === writeAppearance){
        result.push(writeAccess)
      }
      if(listElement.length === readAppearance){
        result.push(EAccesRules.READ)
      }
      return result  
    } catch (error) {
      console.log("UserGroupeRules:  errors in method checkAllRules ")
    }         
    }

    const convertJsonToArray = (jsonElement:any)=>{
      try {
        let arrayData:any = Object.entries(jsonElement).map(([name, values]) => ({name, values}));
        return arrayData
      } catch (error) {
        console.log("UserGroupeRules:  errors in method convertJsonToArray ")
      } 
    }
    
    
    

const UserGroupeRules: React.FC<IUserGroupeRules> = (props) => {
    const classes = useStyles()
    const [colorAllCheck,setColorAllCheck] = useState<any>([])
    const [loading,setLoading] = useState<Boolean>(false)
    const [errorList,setErrorList] = useState([])
    let submitAction:any = undefined;

    const checkState = (listElement:any,accessRule:any)=>{
      try{
        if(listElement.length !== 0){
          let result = false
          let foundElement:any = listElement.find((obj:any)=> obj === accessRule)
          if(foundElement !== undefined){
            result = true
          }
          return result
        }else{
          return false
        }
      } catch(error) {
        console.log("UserGroupeRules: errors in method checkState ")
      } 
    }

    //const mapper = convertMapperData(accessRuleMapper)
    //console.log(mapper)

    const checkStateRules = (listElement:any,accessRule:any,elementName:any)=>{
      try{
      let elementFound:any = listElement.find((obj:any)=> obj.name === elementName)
      if(elementFound !== undefined){
        if(listElement.length !== 0){
          let result = false
          let foundElement:any = elementFound.values.find((obj:any)=> obj === accessRule)
          if(foundElement !== undefined){
            result = true
          }
          return result
        }else{
          return false
        }
      }else{
        return false
      }
    } catch(error) {
      console.log("UserGroupeRules: errors in method checkStateRules ")
    } 
    }

    

    const getColor = (levelAccess:any,value:any)=>{
      try{
      let resultColor = ""
      let coloredData = value === EAccesRules.READ ? "#6be50b" : '#fb0000'
      if(levelAccess === EAccesRulesLevel.ALL){
        let foundElement:any = colorAllCheck.find((obj:any)=>obj === value)
        resultColor = foundElement === undefined ? coloredData : "#74788d"
      }else{
        resultColor = coloredData
      }
      return resultColor
    } catch(error) {
      console.log("UserGroupeRules: errors in method getColor ")
    } 
    }


  const handleAccess =(listAccess:any,listAllAccess:any,levelAccess:EAccesRulesLevel,EAccesRuleValue:any,indexRule:any)=>{
    try{
      let accessRulesList:any = JSON.parse(JSON.stringify(listAccess))
      let accessAllRulesList:any = JSON.parse(JSON.stringify(listAllAccess))

      if(levelAccess === EAccesRulesLevel.ALL){
        
        let foundRules = listAllAccess.find((obj:any)=> obj === EAccesRuleValue)
        let actionBool = foundRules === undefined ? true : false
        accessAllRulesList = handleAccessRulesValue(accessAllRulesList,EAccesRuleValue,actionBool,EAccesRuleValue,true)
        accessRulesList = accessRulesList.map((objRules:any)=>{
          objRules.values = handleAccessRulesValue(objRules.values,EAccesRuleValue,actionBool,EAccesRuleValue,true)
          return objRules
        })

        return {'all':accessAllRulesList,'accessRules':accessRulesList}
      }else{
        
        let foundRules = accessRulesList[indexRule].values.find((obj:any)=> obj === EAccesRuleValue)
        let actionBool = foundRules === undefined ? true : false
        accessRulesList[indexRule].values = handleAccessRulesValue( accessRulesList[indexRule].values,EAccesRuleValue,actionBool,EAccesRuleValue)
        let foundAllRules = handleAllAccessAppearance(accessRulesList,EAccesRuleValue)
        return {'all':foundAllRules,'accessRules':accessRulesList}
      }
    } catch(error) {
      console.log("UserGroupeRules: errors in method handleAccess ")
    } 
  }

  const handleAllAccessAppearance = (listAccess:any,writeAccess:any) =>{
    try{
      let result = []
      let readAppearance = 0;
      let writeAppearance = 0;
      for (let index = 0; index < listAccess.length; index++) {
        const element = listAccess[index].values;
        let foundWrite = element.find((obj:any) => obj === writeAccess)
        let foundRead = element.find((obj:any) => obj === EAccesRules.READ)
        if(foundWrite !== undefined){writeAppearance = writeAppearance + 1}
        if(foundRead !== undefined){readAppearance = readAppearance + 1}
        }
        if(listAccess.length === writeAppearance){
          result.push(writeAccess)
        }
        if(listAccess.length === readAppearance){
          result.push(EAccesRules.READ)
        }
      return result  
    } catch(error) {
      console.log("UserGroupeRules: errors in method handleAllAccessAppearance ")
    } 
  }

  const handleAccessRulesValue = (listAccess:any,value:any,action:any,writeAccess:any,isAll?:any) => {
    try{
      let res = JSON.parse(JSON.stringify(listAccess))
      
      if(action){
        res.push(value)
        if(value === writeAccess){
          res = handleWriteAccess(res)
        }
      }else{
        if(isAll && value === EAccesRules.READ){
          res = res.filter((obj:any)=> obj !== EAccesRules.READ)
          res = res.filter((obj:any)=> obj !== EAccesRules.WRITE)
        }
        res = res.filter((obj:any)=> obj !== value)
        
      }
      res = res.filter((x:any, i:any) => res.indexOf(x) === i);
      return res;
    } catch(error) {
      console.log("UserGroupeRules: errors in method handleAccessRulesValue ")
    } 
  }

  const handleWriteAccess = (listAccess:any)=>{
    try{
    let res = JSON.parse(JSON.stringify(listAccess))
    let listInter:any = res.find((obj:any)=> obj === EAccesRules.READ)
    if(listInter === undefined){
      res.push(EAccesRules.READ)
    }
    return res
  } catch(error) {
    console.log("UserGroupeRules: errors in method handleWriteAccess ")
  }
  }

  const compareObjects = (obj1:any, obj2:any) => {
    try{
      let result:any = {}
    
      let arrayInit:any = convertJsonToArray(obj1)
      for (let index = 0; index < arrayInit.length; index++) {
        let element1:any = arrayInit[index]
        let element2:any = obj2[index]
        if(element1.values !== undefined && element2.values !== undefined){
          if(element1.values.length !== element2.values.length || (element2.values.length !== element1.values.length && element2.values !== element1.values) ){
            result[`${element1.name}`] = element2.values
          }
        }
      }
      return result
  } catch(error) {
    console.log("UserGroupeRules: errors in method compareObjects ")
  }
  }

  const handleRelatedWriteAccess = (taskList:any,entityList:any,accessName:any,typeRule:EAccesRulesType,value:any) => {
    try{
    let taskRulesList:any = JSON.parse(JSON.stringify(taskList))
    let entityRulesList:any = JSON.parse(JSON.stringify(entityList))

    let ListData:any = typeRule === EAccesRulesType.ENTITY ? entityRulesList : taskRulesList
    let indexItem:any = ListData.findIndex((obj:any)=>obj.name === accessName)
    let foundRules = ListData[indexItem].values.find((obj:any)=> obj === value)
    let actionBool = foundRules === undefined ? true : false
    ListData[indexItem].values = handleAccessRulesValue( ListData[indexItem].values,value,actionBool,value)
    if(typeRule === EAccesRulesType.ENTITY ){
      entityRulesList = ListData
    }else{
      taskRulesList = ListData
    }

    let relatedItem:any = relatedRulesEnum.find((obj:any)=>obj.name === accessName)
    if(relatedItem !== undefined){
      for (let index = 0; index < relatedItem.values.length; index++) {
        const element = relatedItem.values[index];
        let interList:any = element.type === EAccesRulesType.ENTITY ? entityRulesList : taskRulesList
        let indexElement:any = interList.findIndex((obj:any)=>obj.name === element.key)
        if(element.action === null){
          let foundReadAccess:any = interList[indexElement].values.find((obj:any)=> obj === EAccesRules.READ)
          if(foundReadAccess === undefined){
            interList[indexElement].values.push(EAccesRules.READ)
          }
        }else{
          if(element.action === EAccesRules.ALL){
            interList[indexElement].values = [EAccesRules.READ,EAccesRules.WRITE]
          }else{
            let foundReadAccess:any = interList[indexElement].values.find((obj:any)=> obj === element.action)
            if(foundReadAccess === undefined){
              interList[indexElement].values.push(element.action)
            }
          }
        }

        


        if(element.type === EAccesRulesType.ENTITY ){
          entityRulesList = interList
        }else{
          taskRulesList = interList
        }
      }
    }
    return {"taskList":taskRulesList,"entityList":entityRulesList}
    } catch(error) {
      console.log("UserGroupeRules: errors in method handleRelatedWriteAccess ")
    }
  }
  //handle read check 
  const handleRelatedReadAccess = (taskList:any,entityList:any,accessName:any,typeRule:EAccesRulesType,value:any) => {
    try{
    let taskRulesList:any = JSON.parse(JSON.stringify(taskList))
    let entityRulesList:any = JSON.parse(JSON.stringify(entityList))

    let ListData:any = typeRule === EAccesRulesType.ENTITY ? entityRulesList : taskRulesList
    let indexItem:any = ListData.findIndex((obj:any)=>obj.name === accessName)
    let foundRules = ListData[indexItem].values.find((obj:any)=> obj === value)
    let actionBool = foundRules === undefined ? true : false
    if(actionBool){
      ListData[indexItem].values.push(EAccesRules.READ)
      let relatedAccessId:any = relatedRulesEnum.findIndex((obj:any)=> obj.name === accessName)
      if(relatedAccessId !== (-1)){
        for (let index = 0; index < relatedRulesEnum[relatedAccessId].values.length; index++) {
          const item:any = relatedRulesEnum[relatedAccessId].values[index];
          let interList:any = item.type === EAccesRulesType.ENTITY ? entityRulesList : taskRulesList
          let foundReadAccessIndex:any = interList.findIndex((obj:any)=> obj.name === item.key)
          let foundReadAccess:any = interList[foundReadAccessIndex].values.find((obj:any)=> obj === EAccesRules.READ)
          if(foundReadAccess === undefined){
            interList[foundReadAccessIndex].values.push(EAccesRules.READ)
          }
        }
      }
      
    }else{
      let relatedAccessId:any = relatedUncheckRules.findIndex((obj:any)=> obj.name === accessName)
      
      if(relatedAccessId !== (-1)){
        for (let index = 0; index < relatedUncheckRules[relatedAccessId].values.length; index++) {
          const item:any = relatedUncheckRules[relatedAccessId].values[index];
          let interList:any = item.type === EAccesRulesType.ENTITY ? entityRulesList : taskRulesList
          let foundReadAccessIndex:any = interList.findIndex((obj:any)=> obj.name === item.key)
          interList[foundReadAccessIndex].values = []
        }
          ListData[indexItem].values = []
      }else{
        ListData[indexItem].values = handleAccessRulesValue( ListData[indexItem].values,value,actionBool,value)
        
      }
      ListData[indexItem].values = []
    }
    return {"taskList":taskRulesList,"entityList":entityRulesList}
  } catch(error) {
    console.log("UserGroupeRules: errors in method handleRelatedReadAccess ")
  }
  }

  const handleReadAllTask = (taskList:any, entityList:any, value:any) => {
    try{
    const taskInter = JSON.parse(JSON.stringify(taskList));
    const entityInter = JSON.parse(JSON.stringify(entityList));
  
    taskInter.forEach((task:any) => {
      if (value) {
        const findAccessRuleTask = task.values.find((obj:any) => obj === EAccesRules.READ);
        if (findAccessRuleTask === undefined) {
          task.values.push(EAccesRules.READ);
        }
  
        const relatedAccessId = relatedRulesEnum.findIndex((obj:any) => obj.name === task.name);
        if (relatedAccessId !== -1) {
          relatedRulesEnum[relatedAccessId].values.forEach((elementRelated:any) => {
            const indexEntityElement = entityInter.findIndex((obj:any) => obj.name === elementRelated.key);
            const foundEAccesRule = entityInter[indexEntityElement].values.find((objE:any) => objE === EAccesRules.READ);
            if (foundEAccesRule === undefined) {
              entityInter[indexEntityElement].values.push(EAccesRules.READ);
            }
          });
        }
      } else {
        task.values = [];
      }
    });
  
    return { taskId: taskInter, entityId: entityInter };
  } catch(error) {
    console.log("UserGroupeRules: errors in method handleReadAllTask ")
  }
  };

  const handleWriteAllTask = (taskList:any, entityList:any, value:any) => {
    try{
    const taskInter = JSON.parse(JSON.stringify(taskList));
    const entityInter = JSON.parse(JSON.stringify(entityList));
  
    taskInter.forEach((task:any) => {
      if (value) {
        task.values = [EAccesRules.READ, EAccesRules.EXECUTE];
  
        const relatedAccessId = relatedRulesEnum.findIndex((obj) => obj.name === task.name);
        if (relatedAccessId !== -1) {
          relatedRulesEnum[relatedAccessId].values.forEach((elementRelated:any) => {
            if (elementRelated.action !== null) {
              const indexEntityElement = entityInter.findIndex((obj:any) => obj.name === elementRelated.key);
              if (elementRelated.action === EAccesRules.ALL) {
                entityInter[indexEntityElement].values = [EAccesRules.READ, EAccesRules.WRITE];
              } else {
                const foundEAccesRule = entityInter[indexEntityElement].values.find((objE:any) => objE === elementRelated.action);
                if (foundEAccesRule === undefined) {
                  entityInter[indexEntityElement].values.push(elementRelated.action);
                }
              }
            }
          });
        }
      } else {
        task.values = task.values.filter((obj:any) => obj !== EAccesRules.EXECUTE);
      }
    });
  
    return { taskId: taskInter, entityId: entityInter };
  } catch(error) {
    console.log("UserGroupeRules: errors in method handleWriteAllTask ")
  }
  };

  const checkDirty = (values:any)=>{
    try{
      let entitiesAccess:any = compareObjects(props.accessRule.entitiesAccess,values.entityId)
      let tasksAccess:any =  compareObjects(props.accessRule.tasksAccess,values.taskTypeId)
      if(Object.keys(entitiesAccess).length !== 0 || Object.keys(tasksAccess).length ){
        return true
      }else{
        return false
      }
    } catch(error) {
      console.log("UserGroupeRules: errors in method checkDirty ")
    }
  }
  
    return (
      <div>
        { (props.accessRule !== undefined && props.accessRule !== null) &&
        <Formik
          enableReinitialize={true}
          initialValues={{
            taskAllRules:getAllRules(props.accessRule.tasksAccess,EAccesRules.EXECUTE),
            taskTypeId:convertJsonToArray(props.accessRule.tasksAccess),
            entityAllRUles:getAllRules(props.accessRule.entitiesAccess,EAccesRules.WRITE),
            entityId:convertJsonToArray(props.accessRule.entitiesAccess),
            generalAccessRuleId:props.accessRule.generalAccessRuleId,
          }}
          onSubmit={(values:any) => {
            if (submitAction === 'reset') {
              setLoading(false)
            }
            if (submitAction === 'submit') {
              let requestData:any = {
                entitiesAccess: compareObjects(props.accessRule.entitiesAccess,values.entityId),
                tasksAccess: compareObjects(props.accessRule.tasksAccess,values.taskTypeId),
                generalAccessRuleId:values.generalAccessRuleId
              }
            props.handleGeneralAccess(ActionMode.UPDATE_GENERAL_ACCESS,requestData,setLoading,setErrorList,notification)
            setColorAllCheck([])
            }

            
        }}
      >
        {(formik) => {const {values,setFieldValue,handleReset} = formik;
          return (
                <div className={classes.container}>
                 <div className={classes.container_context}>
                      <div style={{display:'flex',width:'100%',flexDirection:'column'}}>
                        <div className={classes.container_mainInfo} style={{padding:0}}>
                        <div className={classes.container_context_row}>
                          <div className={classes.container_context_row_label}>
                            <Typography style={{fontWeight:500}}>Entity :</Typography>
                          </div>
                          <div className={classes.container_context_action} >
                            <div className={classes.container_context_action_element} style={{fontStyle:'italic'}} >READ ALL</div>
                            <div className={classes.container_context_action_check}>
                              <AccessCheckbox
                                actionType={ActionAccessMode.WRITE_MODE}
                                id={`access_index_${props.indexAccess}_task_read`} 
                                disabled={props.status !== EStatus.DRAFT }
                                checked={checkState(values.entityAllRUles,EAccesRules.READ)}  
                                value={checkState(values.entityAllRUles,EAccesRules.READ)} 
                                style={{color:getColor(EAccesRulesLevel.ALL,EAccesRules.READ)}} size='small' className={classes.checkbox}
                                handleChange={(event: any ) => {
                                  let result:any = handleAccess(values.entityId,values.entityAllRUles,EAccesRulesLevel.ALL,EAccesRules.READ,null)
                                  setErrorList([])
                                  setFieldValue('entityAllRUles',result.all)
                                  setFieldValue('entityId',result.accessRules)
                                }} 
                              />
                            </div>
                          </div>
                          <div className={classes.container_context_action}>
                            <div className={classes.container_context_action_element} style={{fontStyle:'italic'}}>WRITE ALL</div>
                            <div className={classes.container_context_action_check}>
                              <AccessCheckbox
                                actionType={ActionAccessMode.WRITE_MODE}
                                id={`access_index_${props.indexAccess}_task_write`} 
                                disabled={props.status !== EStatus.DRAFT }
                                checked={checkState(values.entityAllRUles,EAccesRules.WRITE)}  
                                value={checkState(values.entityAllRUles,EAccesRules.WRITE)} 
                                style={{color:getColor(EAccesRulesLevel.ALL,EAccesRules.WRITE)}} size='small' className={classes.checkbox}
                                handleChange={(event: any ) => {
                                  let result:any = handleAccess(values.entityId,values.entityAllRUles,EAccesRulesLevel.ALL,EAccesRules.WRITE,null)
                                  setFieldValue('entityAllRUles',result.all)
                                  setFieldValue('entityId',result.accessRules)
                                  setErrorList([])
                                }} 
                              />
                            </div>
                          </div>
                        </div>
                        <div className={classes.container_action} style={{width:50,height:10}}>
                        {!loading ?
                        <div style={{display:'flex'}}>
                          {checkDirty(values)  &&
                            <div className={classes.value_container_action_btn}>
                              <IconButton 
                                id={`btn_cancel_index_${props.indexAccess}`}
                                className={classes.Add__btn} 
                                color="secondary" aria-label="cancelCreation" 
                                onClick={()=>{
                                  handleReset()
                                }}
                              >
                                <CloseIcon />
                              </IconButton>  
                            </div>
                          }
                          {checkDirty(values) &&
                            <div className={classes.value_container_action_btn}>
                              <ThemeProvider theme={themeButton}>
                                <IconButton id={`btn_confirm_index_${props.indexAccess}`} className={classes.Add__btn} style={{marginRight:4}} color="primary" aria-label="confirmCreation" 
                                  onClick={()=>{ 
                                    formik.submitForm();
                                    submitAction = "submit"
                                    }} >
                                  <CheckIcon />
                                </IconButton>
                              </ThemeProvider>
                            </div>
                          }
                        </div>
                        :
                        <div className={classes.progress}>
                          <CircularProgress disableShrink size={20}/>   
                        </div>
                        }
                        </div>
                        </div>
                        <div className={classes.divider_context}/>
                        <div className={classes.container_contextValue}>
                          {  generalRuleFirstRow?.map((elementTask:any,indexTask:any)=>
                            <div key={indexTask} style={{background: colors[indexTask]}} className={classes.container_contextValue_element}>
                              <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}} className={classes.container_context_row}>
                                <div className={classes.container_context_row_label}>
                                  <Typography style={{fontWeight:500}}>{elementTask.key}</Typography>
                                </div>
                                <div style={{display:'flex',flexDirection:'row'}}> 
                                <div className={classes.container_context_action} style={{marginLeft:0}}>
                                  <div className={classes.container_context_action_element} style={{fontStyle:'italic'}}>READ</div>
                                  <div className={classes.container_context_action_check}>
                                    <AccessCheckbox
                                      actionType={ActionAccessMode.WRITE_MODE}
                                      id={`access_index_${props.indexAccess}_task_index_${indexTask}_write`} 
                                      disabled={props.status !== EStatus.DRAFT }
                                      checked={checkStateRules(values.entityId,EAccesRules.READ,elementTask.name)}  
                                      value={checkStateRules(values.entityId,EAccesRules.READ,elementTask.name)} 
                                      style={{color:getColor(EAccesRulesLevel.contextKey,EAccesRules.READ)}} size='small' className={classes.checkbox}
                                      handleChange={(event: any ) => {
                                        setColorAllCheck([])
                                        let result:any = handleRelatedReadAccess(values.taskTypeId,values.entityId,elementTask.name,EAccesRulesType.ENTITY,EAccesRules.READ)
                                        let rulesAllEntity : any = checkAllRules(result.entityList,EAccesRules.WRITE)
                                        let rulesAllTask : any = checkAllRules(result.taskList,EAccesRules.EXECUTE)
                                        setErrorList([])
                                        setFieldValue('entityId',result.entityList)
                                        setFieldValue('taskTypeId',result.taskList)
                                        setFieldValue('taskAllRules',rulesAllTask)
                                        setFieldValue('entityAllRUles',rulesAllEntity)
                                      }} 
                                    />
                                  </div>
                                </div>
                                <div className={classes.container_context_action}>
                                  <div className={classes.container_context_action_element} style={{fontStyle:'italic'}}>WRITE</div>
                                  <div className={classes.container_context_action_check}>
                                    <AccessCheckbox
                                      actionType={ActionAccessMode.WRITE_MODE}
                                      id={`access_index_${props.indexAccess}_task_index_${indexTask}_read`} 
                                      disabled={props.status !== EStatus.DRAFT }
                                      checked={checkStateRules(values.entityId,EAccesRules.WRITE,elementTask.name)}  
                                      value={checkStateRules(values.entityId,EAccesRules.WRITE,elementTask.name)} 
                                      style={{color:getColor(EAccesRulesLevel.contextKey,EAccesRules.WRITE)}} size='small' className={classes.checkbox}
                                      handleChange={(event: any ) => {
                                        setColorAllCheck([])
                                        //let result:any = handleAccess(values.entityId,values.entityAllRUles,EAccesRulesLevel.contextKey,EAccesRules.WRITE,indexTask)
                                        let result:any = handleRelatedWriteAccess(values.taskTypeId,values.entityId,elementTask.name,EAccesRulesType.ENTITY,EAccesRules.WRITE)
                                        let rulesAllEntity : any = checkAllRules(result.entityList,EAccesRules.WRITE)
                                        let rulesAllTask : any = checkAllRules(result.taskList,EAccesRules.EXECUTE)
                                        setErrorList([])
                                        setFieldValue('entityId',result.entityList)
                                        setFieldValue('taskTypeId',result.taskList)
                                        setFieldValue('taskAllRules',rulesAllTask)
                                        setFieldValue('entityAllRUles',rulesAllEntity)
                                      }} 
                                    />
                                  </div>
                                </div>
                                </div>
                              </div>
                            </div>
                          )}                  
                        </div>
                        <div className={classes.container_contextValue}>
                          {  generalRuleSecondeRow?.map((elementTask:any,indexTask:any)=>
                            <div style={{background: colors[indexTask]}} className={classes.container_contextValue_element}>
                              <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}} className={classes.container_context_row}>
                                <div className={classes.container_context_row_label}>
                                  <Typography style={{fontWeight:500}}>{elementTask.key}</Typography>
                                </div>
                                <div style={{display:'flex',flexDirection:'row'}}> 
                                <div className={classes.container_context_action} style={{marginLeft:0}}>
                                  <div className={classes.container_context_action_element} style={{fontStyle:'italic'}}>READ</div>
                                  <div className={classes.container_context_action_check}>
                                    <AccessCheckbox
                                      actionType={ActionAccessMode.WRITE_MODE}
                                      id={`access_index_${props.indexAccess}_task_index_${indexTask}_write`} 
                                      disabled={props.status !== EStatus.DRAFT }
                                      checked={checkStateRules(values.entityId,EAccesRules.READ,elementTask.name)}  
                                      value={checkStateRules(values.entityId,EAccesRules.READ,elementTask.name)} 
                                      style={{color:getColor(EAccesRulesLevel.contextKey,EAccesRules.READ)}} size='small' className={classes.checkbox}
                                      handleChange={(event: any ) => {
                                        setColorAllCheck([])
                                        let result:any = handleRelatedReadAccess(values.taskTypeId,values.entityId,elementTask.name,EAccesRulesType.ENTITY,EAccesRules.READ)
                                        let allRulesEntity = getAllRulesCheck(result.entityList,EAccesRules.WRITE)
                                        setFieldValue('entityAllRUles',allRulesEntity)
                                        setFieldValue('entityId',result.entityList)
                                        setErrorList([])
                                      }}  
                                    />
                                  </div>
                                </div>
                                <div className={classes.container_context_action}>
                                  <div className={classes.container_context_action_element} style={{fontStyle:'italic'}}>WRITE</div>
                                  <div className={classes.container_context_action_check}>
                                    <AccessCheckbox
                                      actionType={ActionAccessMode.WRITE_MODE}
                                      id={`access_index_${props.indexAccess}_task_index_${indexTask}_read`} 
                                      disabled={props.status !== EStatus.DRAFT }
                                      checked={checkStateRules(values.entityId,EAccesRules.WRITE,elementTask.name)}  
                                      value={checkStateRules(values.entityId,EAccesRules.WRITE,elementTask.name)} 
                                      style={{color:getColor(EAccesRulesLevel.contextKey,EAccesRules.WRITE)}} size='small' className={classes.checkbox}
                                      handleChange={(event: any ) => {
                                        setColorAllCheck([])
                                        let result:any = handleRelatedWriteAccess(values.taskTypeId,values.entityId,elementTask.name,EAccesRulesType.ENTITY,EAccesRules.WRITE)
                                        let allRulesEntity = getAllRulesCheck(result.entityList,EAccesRules.WRITE)
                                        setFieldValue('entityAllRUles',allRulesEntity)
                                        setFieldValue('entityId',result.entityList)
                                        setErrorList([])
                                      }} 
                                    />
                                  </div>
                                </div>
                                </div>
                              </div>
                            </div>
                          )}                  
                        </div>
                        <div className={classes.divider_context}/>
                        <div className={classes.container_context_row}>
                          <div className={classes.container_context_row_label}>
                            <Typography style={{fontWeight:500}}>Task Type :</Typography>
                          </div>
                          <div className={classes.container_context_action} >
                            <div className={classes.container_context_action_element} style={{fontStyle:'italic'}} >READ ALL</div>
                            <div className={classes.container_context_action_check}>
                              <AccessCheckbox
                                actionType={ActionAccessMode.WRITE_MODE}
                                id={`access_index_${props.indexAccess}_entity_read`} 
                                disabled={props.status !== EStatus.DRAFT }
                                checked={checkState(values.taskAllRules,EAccesRules.READ)}  
                                value={checkState(values.taskAllRules,EAccesRules.READ)} 
                                style={{color:getColor(EAccesRulesLevel.ALL,EAccesRules.READ)}} size='small' className={classes.checkbox}
                                handleChange={(event: any ) => {
                                  let result:any = handleReadAllTask(values.taskTypeId,values.entityId,event.target.checked) 
                                  let allRulesTask = getAllRulesCheck(result.taskId,EAccesRules.EXECUTE)
                                  let allRulesEntity = getAllRulesCheck(result.entityId,EAccesRules.WRITE)
                                  setFieldValue('taskTypeId',result.taskId)
                                  setFieldValue('entityId',result.entityId)
                                  setFieldValue('entityAllRUles',allRulesEntity)
                                  setFieldValue('taskAllRules',allRulesTask)
                                  setErrorList([])
                                }} 
                              />
                            </div>
                          </div>
                          <div className={classes.container_context_action}>
                            <div className={classes.container_context_action_element} style={{fontStyle:'italic'}}>EXECUTE ALL</div>
                            <div className={classes.container_context_action_check}>
                              <AccessCheckbox
                                actionType={ActionAccessMode.WRITE_MODE}
                                id={`access_index_${props.indexAccess}_entity_write`} 
                                disabled={props.status !== EStatus.DRAFT }
                                checked={checkState(values.taskAllRules,EAccesRules.EXECUTE)}  
                                value={checkState(values.taskAllRules,EAccesRules.EXECUTE)} 
                                style={{color:getColor(EAccesRulesLevel.ALL,EAccesRules.WRITE)}} size='small' className={classes.checkbox}
                                handleChange={(event: any ) => {
                                  let result:any = handleWriteAllTask(values.taskTypeId,values.entityId,event.target.checked)
                                  let allRulesTask = getAllRulesCheck(result.taskId,EAccesRules.EXECUTE)
                                  let allRulesEntity = getAllRulesCheck(result.entityId,EAccesRules.WRITE)
                                  setFieldValue('taskTypeId',result.taskId)
                                  setFieldValue('entityId',result.entityId)
                                  setFieldValue('entityAllRUles',allRulesEntity)
                                  setFieldValue('taskAllRules',allRulesTask)
                                  setErrorList([])
                                }} 
                              />
                            </div>
                          </div>
                        </div>
                        <div className={classes.divider_context}/>
                        <div className={classes.container_contextValue}>
                          {  taskTypeRow?.map((elementEntity:any,indexEntity:any)=>
                            <div style={{background: colors[indexEntity]}} className={classes.container_contextValue_element}>
                              <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}} className={classes.container_context_row}>
                                <div className={classes.container_context_row_label}>
                                  <Typography style={{fontWeight:500}}>{elementEntity.key}</Typography>
                                </div>
                                <div style={{display:'flex',flexDirection:'row'}}> 
                                <div className={classes.container_context_action} style={{marginLeft:0}}>
                                  <div className={classes.container_context_action_element} style={{fontStyle:'italic'}}>READ</div>
                                  <div className={classes.container_context_action_check}>
                                    <AccessCheckbox
                                      actionType={ActionAccessMode.WRITE_MODE}
                                      id={`access_index_${props.indexAccess}_task_index_${indexEntity}_write`} 
                                      disabled={props.status !== EStatus.DRAFT }
                                      checked={checkStateRules(values.taskTypeId,EAccesRules.READ,elementEntity.name)}  
                                      value={checkStateRules(values.taskTypeId,EAccesRules.READ,elementEntity.name)} 
                                      style={{color:getColor(EAccesRulesLevel.contextKey,EAccesRules.READ)}} size='small' className={classes.checkbox}
                                      handleChange={(event: any ) => {
                                        let result:any = handleRelatedReadAccess(values.taskTypeId,values.entityId,elementEntity.name,EAccesRulesType.TASK,EAccesRules.READ)
                                        let allRulesTask = getAllRulesCheck(result.taskList,EAccesRules.EXECUTE)
                                        let allRulesEntity = getAllRulesCheck(result.entityList,EAccesRules.WRITE)
                                        setFieldValue('entityId',result.entityList)
                                        setFieldValue('taskTypeId',result.taskList)
                                        setFieldValue('entityAllRUles',allRulesEntity)
                                        setFieldValue('taskAllRules',allRulesTask)
                                        setErrorList([])
                                        
                                      }} 
                                    />
                                  </div>
                                </div>
                                <div className={classes.container_context_action}>
                                  <div className={classes.container_context_action_element} style={{fontStyle:'italic'}}>EXECUTE</div>
                                  <div className={classes.container_context_action_check}>
                                    <AccessCheckbox
                                      actionType={ActionAccessMode.WRITE_MODE}
                                      id={`access_index_${props.indexAccess}_task_index_${indexEntity}_read`} 
                                      disabled={props.status !== EStatus.DRAFT }
                                      checked={checkStateRules(values.taskTypeId,EAccesRules.EXECUTE,elementEntity.name)}  
                                      value={checkStateRules(values.taskTypeId,EAccesRules.EXECUTE,elementEntity.name)} 
                                      style={{color:getColor(EAccesRulesLevel.contextKey,EAccesRules.WRITE)}} size='small' className={classes.checkbox}
                                      handleChange={(event: any ) => {
                                        let result:any = handleRelatedWriteAccess(values.taskTypeId,values.entityId,elementEntity.name,EAccesRulesType.TASK,EAccesRules.EXECUTE)
                                        let allRulesTask = getAllRulesCheck(result.taskList,EAccesRules.EXECUTE)
                                        let allRulesEntity = getAllRulesCheck(result.entityList,EAccesRules.WRITE)
                                        setFieldValue('entityId',result.entityList)
                                        setFieldValue('taskTypeId',result.taskList)
                                        setFieldValue('entityAllRUles',allRulesEntity)
                                        setFieldValue('taskAllRules',allRulesTask)
                                        setErrorList([])
                                      }}  
                                    />
                                  </div>
                                </div>
                                </div>
                              </div>
                            </div>
                          )}                  
                        </div>
                        <div className={classes.PropertyKey_form_alert}>
                          {(errorList.length !== null) &&
                            errorList.map((row:any,index:any)=>
                              (<Alert severity="error"   key={index} className={classes.alert}>{row} </Alert>)
                          )}
                        </div>
                      </div>
                  </div>
                </div>     
       )
      }}
    </Formik>
      }
      </div>
    )
  };
export default UserGroupeRules;







