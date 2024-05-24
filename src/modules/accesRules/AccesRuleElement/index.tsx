
import * as React from "react";
import { useState } from "react";

import useStyles from "./styles";
import { ActionAccessMode, ActionMode, EAccesRules, EAccesRulesLevel, EStatus } from "shared/constants/AppEnums";
import { IAccessRulesValue } from "types/models/interface";
import {  themeButton } from "shared/constants/AppConst";

import { CircularProgress, IconButton, ThemeProvider,  Typography } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { Formik } from "formik";
import { toast } from "react-toastify";
import AccessCheckbox from "shared/components/AccessCheckbox";

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


const AccesRuleElement: React.FC<IAccessRulesValue> = (props) => {
  const classes = useStyles()
  const [colorAllCheck,setColorAllCheck] = useState<any>([])
  const [colorContextKeyList,setColorContextKeyList] = useState<any>([])
  const [loading,setLoading] = useState<Boolean>(false)
  const [dirtyFormik,setDirtyFormik] = useState<any>(false)
  const [errorList,setErrorList] = useState([])
  const checkAccess = (accessRules:any,value:EAccesRules)=>{
    try {
    let result = false;
    let foundElement = accessRules.find((obj:any)=> obj === value)
    if(foundElement !== undefined){result = true}
    return result
    } catch (error) {
      console.log("AccessRuleElement:error in method checkAccess")
    }
  }

  

  

  

  const getColor = (levelAccess:any,value:any,indexKey:any)=>{
    try{
    let resultColor = ""
    let coloredData = value === EAccesRules.READ ? "#6be50b" : '#fb0000'
    if(levelAccess === EAccesRulesLevel.ALL){
      let foundElement:any = colorAllCheck.find((obj:any)=>obj === value)
      resultColor = foundElement === undefined ? coloredData : "#74788d"
    }
    if(levelAccess === EAccesRulesLevel.contextKey){
      if(colorContextKeyList.length !== 0){
        let foundElement:any = colorContextKeyList.find((obj:any)=>obj.key === indexKey)
        if(foundElement !== undefined){
          let foundRules:any = foundElement.values.find((obj:any)=> obj === value)
          resultColor = foundRules === undefined ? coloredData : "#74788d"
        }else{
          resultColor = coloredData
        }
        
      }else{
        resultColor = coloredData
      }
    }
    if(levelAccess === EAccesRulesLevel.contextValue){
      resultColor = coloredData
    }
    return resultColor
  } catch (error) {
    console.log("error in method getColor")
  }
  }
  const handleAccessColor = (levelAccess:any,value:any,indexKey:any) => {
    try{
    let allColor:any = colorAllCheck
    let KeysColor:any = colorContextKeyList
    if(levelAccess === EAccesRulesLevel.ALL){     
        allColor = allColor.filter((obj:any)=> obj !== value)
        KeysColor = KeysColor.map((obj:any)=>{
          obj.values = obj.values.filter((obj:any)=> obj !== value)
          return obj
        })
    }
    if(levelAccess === EAccesRulesLevel.contextKey){
      let foundElement:any = colorAllCheck.find((obj:any)=>obj === value)
      if(foundElement === undefined){
        allColor.push(value)
      }
      let foundColorKeysIndex:any = KeysColor.findIndex((el:any)=> el.key === indexKey)
      if(foundColorKeysIndex !== (-1)){
        KeysColor[foundColorKeysIndex].values = KeysColor[foundColorKeysIndex].values.filter((obj:any)=> obj !== value)
      }
    }
    if(levelAccess === EAccesRulesLevel.contextValue){
      let foundElement:any = colorAllCheck.find((obj:any)=>obj === value)
      if(foundElement === undefined){
        allColor.push(value)
      }
      let foundColorKeysIndex:any = KeysColor.findIndex((el:any)=> el.key === indexKey)
      if(foundColorKeysIndex !== (-1)){
        let colorKeyFound:any = KeysColor[foundColorKeysIndex].values.find((obj:any)=> obj === value)
        if(colorKeyFound === undefined){
          KeysColor[foundColorKeysIndex].values.push(value)
        }
      }else{
        KeysColor.push({key:indexKey,values:[value]})
      }
    }
    setColorAllCheck(allColor)
    setColorContextKeyList(KeysColor)
  } catch (error) {
    console.log("AccessRuleElement:error in method handleAccessColor")
  }
  }
 

  

  let submitAction:any = undefined;
  
  const handleAccess =(listAccess:any,levelAccess:EAccesRulesLevel,EAccesRuleValue:any,indexKey:any,indexValue:any)=>{
    try{
      let accessRulesList:any = JSON.parse(JSON.stringify(listAccess))
    if(levelAccess === EAccesRulesLevel.ALL){
      let foundRules = accessRulesList.accessRuleType.find((obj:any)=> obj === EAccesRuleValue)
      let actionBool = foundRules === undefined ? true : false
      accessRulesList.accessRuleType = handleAccessRulesValue(accessRulesList.accessRuleType,EAccesRuleValue,actionBool)
      accessRulesList.contextKeys = accessRulesList.contextKeys.map((objRules:any)=>{
        objRules.accessRuleType = handleAccessRulesValue(objRules.accessRuleType,EAccesRuleValue,actionBool)
        objRules.contextValues = objRules.contextValues.map((objRulesValue:any)=>{
          objRulesValue.accessRuleType = handleAccessRulesValue(objRulesValue.accessRuleType,EAccesRuleValue,actionBool)
          return objRulesValue
        })
        return objRules
      })
      handleAccessColor(EAccesRulesLevel.ALL,EAccesRuleValue,null)
      return accessRulesList
      
    }
    if(levelAccess === EAccesRulesLevel.contextKey){
      setColorAllCheck(false)
      accessRulesList.accessRuleType = handleAccessRulesValue(accessRulesList.accessRuleType,EAccesRuleValue,false)
      let foundRules = accessRulesList.contextKeys[indexKey].accessRuleType.find((obj:any)=> obj === EAccesRuleValue)
      let actionBool = foundRules === undefined ? true : false
      accessRulesList.contextKeys[indexKey].accessRuleType = handleAccessRulesValue(accessRulesList.contextKeys[indexKey].accessRuleType,EAccesRuleValue,actionBool)
      accessRulesList.contextKeys[indexKey].contextValues = accessRulesList.contextKeys[indexKey].contextValues.map((objRulesValue:any)=>{
        objRulesValue.accessRuleType = handleAccessRulesValue(objRulesValue.accessRuleType,EAccesRuleValue,actionBool)
        return objRulesValue
      })
      handleAccessColor(EAccesRulesLevel.contextKey,EAccesRuleValue,indexKey)
      return accessRulesList
    }
    if(levelAccess === EAccesRulesLevel.contextValue){
      setColorAllCheck(false)
      setColorContextKeyList([])
      accessRulesList.accessRuleType = handleAccessRulesValue(accessRulesList.accessRuleType,EAccesRuleValue,false)
      accessRulesList.contextKeys[indexKey].accessRuleType = handleAccessRulesValue(accessRulesList.contextKeys[indexKey].accessRuleType,EAccesRuleValue,false)
      let foundRules = accessRulesList.contextKeys[indexKey].contextValues[indexValue].accessRuleType.find((obj:any)=> obj === EAccesRuleValue)
      let actionBool = foundRules === undefined ? true : false
      accessRulesList.contextKeys[indexKey].contextValues[indexValue].accessRuleType =  handleAccessRulesValue(accessRulesList.contextKeys[indexKey].contextValues[indexValue].accessRuleType,EAccesRuleValue,actionBool)
      handleAccessColor(EAccesRulesLevel.contextValue,EAccesRuleValue,indexKey)
      return accessRulesList
    }
  } catch (error) {
    console.log("AccessRuleElement:error in method handleAccess")
  }
  }

  const handleAccessRulesValue = (listAccess:any,value:any,action:any) => {
    try{
    let res = JSON.parse(JSON.stringify(listAccess))
    
    if(action){
      if(value === EAccesRules.WRITE){
        res = [EAccesRules.READ,EAccesRules.WRITE]
      }else{
      res.push(value)
    }
    }else{
      res = res.filter((obj:any)=> obj !== value)
    }
    res = res.filter((x:any, i:any) => res.indexOf(x) === i);
    return res;
  } catch (error) {
    console.log("AccessRuleElement:error in method handleAccessRulesValue")
  }
  }

  const checkAllRules = (listValue:any,indexElement:any)=>{
    try{
    let listAccess:any = JSON.parse(JSON.stringify(listValue))
    let result = []
    let readAppearance = 0;
      let writeAppearance = 0;
      if(indexElement !== null){
        for (let index = 0; index < listAccess.contextKeys[indexElement].contextValues.length; index++) {
          const element = listAccess.contextKeys[indexElement].contextValues[index];
          let foundWrite = element.accessRuleType.find((obj:any) => obj === EAccesRules.WRITE)
          let foundRead = element.accessRuleType.find((obj:any) => obj === EAccesRules.READ)
          if(foundWrite !== undefined){writeAppearance = writeAppearance + 1}
          if(foundRead !== undefined){readAppearance = readAppearance + 1}
        }
        if(listAccess.contextKeys[indexElement].contextValues.length === writeAppearance){
          result.push(EAccesRules.WRITE)
        }
        if(listAccess.contextKeys[indexElement].contextValues.length === readAppearance){
          result.push(EAccesRules.READ)
        }
        return result
      }else{
        let nbrContextValues = 0
        for (let index = 0; index < listAccess.contextKeys.length; index++) {
          const element = listAccess.contextKeys[index];
          for (let indexVal = 0; indexVal < element.contextValues.length; indexVal++) {
            const elementVal:any = element.contextValues[indexVal];
            nbrContextValues = nbrContextValues + 1;
            let foundWrite = elementVal.accessRuleType.find((obj:any) => obj === EAccesRules.WRITE)
            let foundRead = elementVal.accessRuleType.find((obj:any) => obj === EAccesRules.READ)
            if(foundWrite !== undefined){writeAppearance = writeAppearance + 1}
            if(foundRead !== undefined){readAppearance = readAppearance + 1}
          }
        }
        if(nbrContextValues === writeAppearance){
          result.push(EAccesRules.WRITE)
        }
        if(nbrContextValues === readAppearance){
          result.push(EAccesRules.READ)
        }
        return result
      }
    } catch (error) {
      console.log("AccessRuleElement:error in method checkAllRules")
    }
  }

  
  

  return (
    <div>
      { (props.accessRule !== undefined && props.accessRule !== null) &&
      <Formik
      enableReinitialize={true}
      initialValues={{
        accessRuleId:props.accessRule.accessRuleId,
        storeId:props.accessRule.storeId,
        accessRuleContextDTO:JSON.parse(JSON.stringify(props.accessRule.accessRuleContextDTO)),
        userGroupsName:props.accessRule.userGroupsName,
    }}
      onSubmit={(values:any) => {
        if (submitAction === 'reset') {
                    setDirtyFormik(false)
                    setLoading(false)
        }
        if (submitAction === 'submit') {
          console.log(errorList)
        props.handleAccessRule(ActionMode.EDIT_MODE,values,setLoading,setErrorList,notification)
        setDirtyFormik(false)
        setColorAllCheck([])
        setColorContextKeyList([])
        console.log(dirtyFormik)
        }
      }}
    >
      {(formik) => {const {values,setFieldValue,dirty,handleReset} = formik;
        return (
              <div className={classes.container}>
               <div className={classes.container_context}>
                <div className={classes.container_mainInfo} style={{padding:0}}>
                  <div className={classes.container_context_row}>
                    <div className={classes.container_context_row_label}>
                      <Typography style={{fontWeight:500}}>Acces Right per Context</Typography>
                    </div>
                    <div className={classes.container_context_action}>
                      <div className={classes.container_context_action_element} style={{fontStyle:'italic'}}>READ ALL</div>
                      <div className={classes.container_context_action_check}>
                        <AccessCheckbox
                          actionType={ActionAccessMode.WRITE_MODE}
                          id={`access_index_${props.indexAccess}_readAll`}
                          disabled={props.status !== EStatus.DRAFT }
                          checked={checkAccess(values.accessRuleContextDTO.accessRuleType,EAccesRules.READ)}  
                          value={checkAccess(values.accessRuleContextDTO.accessRuleType,EAccesRules.READ)} 
                          style={{color:getColor(EAccesRulesLevel.ALL,EAccesRules.READ,null)}}  size='small' className={classes.checkbox}
                          handleChange={(event: any ) => {
                            let acces:any = JSON.parse(JSON.stringify(values.accessRuleContextDTO))
                            let result = handleAccess(acces,EAccesRulesLevel.ALL,EAccesRules.READ,null,null)
                            setFieldValue('accessRuleContextDTO',result)
                          }} 
                        />
                      </div>
                    </div>
                    <div className={classes.container_context_action}>
                      <div className={classes.container_context_action_element} style={{fontStyle:'italic'}}>WRITE ALL</div>
                      <div className={classes.container_context_action_check}>
                        <AccessCheckbox
                          actionType={ActionAccessMode.WRITE_MODE}
                          id={`access_index_${props.indexAccess}_writeAll`} 
                          disabled={props.status !== EStatus.DRAFT }
                          checked={checkAccess(values.accessRuleContextDTO.accessRuleType,EAccesRules.WRITE)}  
                          value={checkAccess(values.accessRuleContextDTO.accessRuleType,EAccesRules.WRITE)} 
                          style={{color:getColor(EAccesRulesLevel.ALL,EAccesRules.WRITE,null)}}  
                          size='small' 
                          className={classes.checkbox}
                          handleChange={(event: any ) => {
                            let acces:any = JSON.parse(JSON.stringify(values.accessRuleContextDTO))
                            let result = handleAccess(acces,EAccesRulesLevel.ALL,EAccesRules.WRITE,null,null)
                            setFieldValue('accessRuleContextDTO',result)
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                  <div className={classes.container_action} style={{width:50,height:10}}>
                        {!loading ?
                        <div style={{display:'flex'}}>
                          {dirty  &&
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
                          {dirty &&
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
                  {(values.accessRuleContextDTO.contextKeys.length !== undefined) && values.accessRuleContextDTO.contextKeys?.map((elementKeys:any,indexContext:any)=>
                    <div style={{display:'flex',width:'100%',flexDirection:'column'}}>
                      <div className={classes.container_context_row}>
                        <div className={classes.container_context_row_label}>
                          <Typography style={{fontWeight:500}}>{elementKeys.contextKey}</Typography>
                        </div>
                        <div className={classes.container_context_action} >
                          <div className={classes.container_context_action_element} style={{fontStyle:'italic'}} >READ</div>
                          <div className={classes.container_context_action_check}>
                            <AccessCheckbox
                              actionType={ActionAccessMode.WRITE_MODE}
                              id={`access_index_${props.indexAccess}_context_index_${indexContext}_read`} 
                              disabled={props.status !== EStatus.DRAFT }
                              checked={checkAccess(values.accessRuleContextDTO.contextKeys[indexContext].accessRuleType,EAccesRules.READ)}  
                              value={checkAccess(values.accessRuleContextDTO.contextKeys[indexContext].accessRuleType,EAccesRules.READ)} 
                              style={{color:getColor(EAccesRulesLevel.contextKey,EAccesRules.READ,indexContext)}} 
                              size='small' 
                              className={classes.checkbox}
                              handleChange={(event: any ) => {
                                let acces:any = JSON.parse(JSON.stringify(values.accessRuleContextDTO))
                                let result = handleAccess(acces,EAccesRulesLevel.contextKey,EAccesRules.READ,indexContext,null)
                                result.accessRuleType = checkAllRules(result,null)
                                setFieldValue('accessRuleContextDTO',result)
                              }} 
                            />
                          </div>
                        </div>
                        <div className={classes.container_context_action}>
                          <div className={classes.container_context_action_element} style={{fontStyle:'italic'}}>WRITE</div>
                          <div className={classes.container_context_action_check}>
                            <AccessCheckbox
                              actionType={ActionAccessMode.WRITE_MODE}
                              id={`access_index_${props.indexAccess}_context_index_${indexContext}_write`} 
                              disabled={props.status !== EStatus.DRAFT }
                              checked={checkAccess(values.accessRuleContextDTO.contextKeys[indexContext].accessRuleType,EAccesRules.WRITE)}  
                              value={checkAccess(values.accessRuleContextDTO.contextKeys[indexContext].accessRuleType,EAccesRules.WRITE)} 
                              style={{color:getColor(EAccesRulesLevel.contextKey,EAccesRules.WRITE,indexContext)}} size='small' className={classes.checkbox}
                              handleChange={(event: any ) => {
                                let acces:any = JSON.parse(JSON.stringify(values.accessRuleContextDTO))
                                let result = handleAccess(acces,EAccesRulesLevel.contextKey,EAccesRules.WRITE,indexContext,null)
                                result.accessRuleType = checkAllRules(result,null)
                                setFieldValue('accessRuleContextDTO',result)
                              }} 
                            />
                          </div>
                        </div>
                      </div>
                      <div className={classes.divider_context}/>
                      <div className={classes.container_contextValue}>
                        { elementKeys.contextValues?.map((elementContextValue:any,indexContextValue:any)=>
                          <div style={{background: colors[indexContextValue]}} className={classes.container_contextValue_element}>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}} className={classes.container_context_row}>
                              <div className={classes.container_context_row_label}>
                                <Typography style={{fontWeight:500}}>{elementContextValue.contextValue}</Typography>
                              </div>
                              <div style={{display:'flex',flexDirection:'row'}}> 
                              <div className={classes.container_context_action} style={{marginLeft:0}}>
                                <div className={classes.container_context_action_element} style={{fontStyle:'italic'}}>READ</div>
                                <div className={classes.container_context_action_check}>
                                  <AccessCheckbox
                                    actionType={ActionAccessMode.WRITE_MODE}
                                    id={`access_index_${props.indexAccess}_context_index_${indexContext}_value_index_${indexContextValue}_write`} 
                                    disabled={props.status !== EStatus.DRAFT }
                                    checked={checkAccess(values.accessRuleContextDTO.contextKeys[indexContext].contextValues[indexContextValue].accessRuleType,EAccesRules.READ)}  
                                    value={checkAccess(values.accessRuleContextDTO.contextKeys[indexContext].contextValues[indexContextValue].accessRuleType,EAccesRules.READ)} 
                                    style={{color:getColor(EAccesRulesLevel.contextValue,EAccesRules.READ,indexContext)}} size='small' className={classes.checkbox}
                                    handleChange={(event: any ) => {
                                      let acces:any = JSON.parse(JSON.stringify(values.accessRuleContextDTO))
                                      let result = handleAccess(acces,EAccesRulesLevel.contextValue,EAccesRules.READ,indexContext,indexContextValue)
                                      result.accessRuleType = checkAllRules(result,null)
                                      setFieldValue('accessRuleContextDTO',result)
                                    }} 
                                  />
                                </div>
                              </div>
                              <div className={classes.container_context_action}>
                                <div className={classes.container_context_action_element} style={{fontStyle:'italic'}}>WRITE</div>
                                <div className={classes.container_context_action_check}>
                                  <AccessCheckbox
                                    actionType={ActionAccessMode.WRITE_MODE}
                                    id={`access_index_${props.indexAccess}_context_index_${indexContext}_value_index_${indexContextValue}_read`} 
                                    disabled={props.status !== EStatus.DRAFT }
                                    checked={checkAccess(values.accessRuleContextDTO.contextKeys[indexContext].contextValues[indexContextValue].accessRuleType,EAccesRules.WRITE)}  
                                    value={checkAccess(values.accessRuleContextDTO.contextKeys[indexContext].contextValues[indexContextValue].accessRuleType,EAccesRules.WRITE)} 
                                    style={{color:getColor(EAccesRulesLevel.contextValue,EAccesRules.WRITE,indexContext)}} size='small' className={classes.checkbox}
                                    handleChange={(event: any ) => {
                                      let acces:any = JSON.parse(JSON.stringify(values.accessRuleContextDTO))
                                      let result = handleAccess(acces,EAccesRulesLevel.contextValue,EAccesRules.WRITE,indexContext,indexContextValue)
                                      result.contextKeys[indexContext].accessRuleType = checkAllRules(result,indexContext)
                                      result.accessRuleType = checkAllRules(result,null)
                                      setFieldValue('accessRuleContextDTO',result)
                                    }} 
                                  />
                                </div>
                              </div>
                              </div>
                            </div>
                          </div>
                        )}                  
                      </div>
                      
                      {indexContext !== (values.accessRuleContextDTO.contextKeys.length - 1 ) && <div className={classes.divider_context}/>}
                    </div>
                  )}
                </div>
              </div>     
     )
    }}
  </Formik>
    }
    </div>
  )
};
export default AccesRuleElement;
