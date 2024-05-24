import * as React from "react";
import { useState } from "react";

import { IContextAdd } from "types/interfaces/ContextInterface";
import { themeButton, themeDeleteButton } from "shared/constants/AppConst";

import { Formik } from "formik";

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { CircularProgress, IconButton } from "@material-ui/core";
import { Alert, Tooltip } from "@mui/material";
import { ActionAccessMode, ActionMode } from "shared/constants/AppEnums";
import useStyles from "./styles";
import AddNewValue from "../ContextValue/AddNewValue";
import Chips from "../ContextValue/Chip";
import AccessButton from "shared/components/AccessButton";
import AccessTextField from "shared/components/AccessTextField";
import {maxLengthValue} from "../../../shared/constants/MaxLength";

let colors = ["#0A8FDC", "#eaa899", "#47dda5"];
for (var i = 0; i < 100; i++) {
  colors.push("#0A8FDC", "#eaa899", "#47dda5");
}

const ContextAdd: React.FC<IContextAdd> = (props) => {
  const classes = useStyles();

  const [loading,setLoading] = useState<boolean>(false)
  const [errorAction,setErrorAction] = useState<any>([])
  
  const deleteContext = () =>{}
  const handleValue = (actionMode:ActionMode,valueContext:any,indexElement:any,handleFormikValue:any,listValues:any)=>{
    setErrorAction([])
    let listContextValue:any = JSON.parse(JSON.stringify(listValues))
    let result ;
    if(actionMode === ActionMode.DELETE_MODE){
      listContextValue.splice(indexElement, 1); 
      handleFormikValue('values',listContextValue)
    }
    if(actionMode === ActionMode.EDIT_MODE){
       listContextValue[indexElement].value = valueContext
       result = listContextValue
      handleFormikValue('values',result)
    }
    if(actionMode === ActionMode.CREATION_MODE){
      listContextValue.push({id:null, keyId:null, value:valueContext})
      result = listContextValue
      handleFormikValue('values',result)
   }
  }

  const handleCancel = () => props.cancelAction(false)
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
            "id":null,
            "name": "",
            "description": "",
            "storeId": props.storeId,
            "values":[]
      }}
      onSubmit={(values:any) => {
        setLoading(true)
        let valueJson = {
          "description": values.description,
          "id": values.id,
          "name": values.name,
          "priority": 0,
          "store": {id:values.storeId},
          "values":values.values
        }
        props.handleContext(ActionMode.CREATION_MODE,valueJson,setLoading,setErrorAction)
      }}
    >
    {(formik) => {const {values,setFieldValue ,dirty} = formik;
      return (
        <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
            <div className={classes.value_container}>
                <div className={classes.value_container_form_firstElement}>
                  <div className={classes.value_container_form_Identifier}>
                    <AccessTextField
                      fullWidth={true}
                      size="small"
                      id={`input_Identifier_context_add`}
                      name="name_Identifier_context" 
                      value={values.name}
                      handleChange={(event: any ) => { 
                        setFieldValue("name",event.target.value) 
                        setErrorAction([])                            
                      }}
                      label='Identifier'
                      variant='outlined'
                      className={classes.textFiled}
                      actionType={ActionAccessMode.WRITE_MODE}
                      disabled={values.name === 'Latest'? true : false}
                      InputProps={{ maxLength: maxLengthValue }}
                    />
                  </div>
                  <div className={classes.value_container_form_description}>
                    <AccessTextField
                      fullWidth={true}
                      size="small"
                      id={`input_context_key_description_add`}
                      name={`input_context_key_description$`}
                      value={values.description}
                      handleChange={(event: any ) => { 
                        setFieldValue("description",event.target.value) 
                        setErrorAction([])                            
                      }}
                      label='Description'
                      variant='outlined'
                      className={classes.textFiled}
                      actionType={ActionAccessMode.WRITE_MODE}
                      disabled={values.name === 'Latest'? true : false}
                      InputProps={{ maxLength: maxLengthValue }}
                    />
                  </div>
                </div>
                <div className={classes.value_container_action}>
                    <div style={{display:'flex'}}>
                        { loading === false ?
                        <div style={{display:'flex'}}>
                            {  !dirty && props.stateAction !== ActionMode.CREATION_MODE ?
                            <AccessButton 
                              id={`btn_delete_context_key_add`} 
                              disabled={values.name === 'Latest'? true : false}
                              actionType={ActionAccessMode.WRITE_MODE} 
                              className={classes.Add__btn} 
                              style={{padding:0}}
                              color={"primary"}
                              ariaLabel={"confirmCreation"}
                              handleClick={deleteContext}
                              iconButton={true}
                              theme={themeDeleteButton}
                              tooltip={"Delete Context"}
                            >
                              <HighlightOffIcon color="secondary" />
                            </AccessButton>
                            :
                            <>
                                <div className={classes.value_container_action_btn}>
                                    <Tooltip title={"Cancel"} arrow enterDelay={0} leaveDelay={100}>
                                        <span>
                                        <IconButton 
                                            disabled={values.name === 'Latest'? true : false}
                                            id={`btn_cancel_context_add`}
                                            className={classes.Add__btn} 
                                            color="secondary" 
                                            aria-label="cancelCreation" 
                                            onClick={()=>{
                                              handleCancel()  
                                            }}>
                                            <CloseIcon />
                                        </IconButton>
                                        </span>
                                    </Tooltip>
                                </div>
                                <div className={classes.value_container_action_btn}>
                                  <AccessButton 
                                    id={`btn_confirm_context_add`} 
                                    disabled={values.name === 'Latest'? true : false}
                                    actionType={ActionAccessMode.WRITE_MODE} 
                                    className={classes.Add__btn} 
                                    style={{marginRight:4}}
                                    color={"primary"}
                                    ariaLabel={"confirmCreation"}
                                    handleClick={()=>{ formik.submitForm(); }}
                                    iconButton={true}
                                    theme={themeButton}
                                    tooltip={"Confirm"}
                                  >
                                    <CheckIcon />
                                  </AccessButton>
                                </div>
                            </>
                            }
                        </div>
                        :
                        <div className={classes.progress}>
                            <CircularProgress disableShrink size={20}/>   
                        </div>
                        }
                    </div>
                </div>
            </div>
            <div className={classes.value_container}>
              <div className={classes.listChips_container}>
                <div className={classes.addNew_value}>
                  {values.values.map((element:any,index:any)=>(
                    <div className={classes.chips_element} key={"context_value_"+index}>
                      <Chips color={colors[index]} indexContext={"add"} handleValue={handleValue} item={element} indexElement={index} handleFormikValue={setFieldValue} listValues={values.values}/>
                    </div>
                  ))}
                </div>
                <div className={classes.addNew_value}>
                  <AddNewValue indexContext={"add"} handleValue={handleValue} item={{id:null,value:''}} indexElement={null} handleFormikValue={setFieldValue} listValues={values.values} />
                </div>
              </div>
            </div>
          <div className={classes.PropertyKey_form_alert}>
            {(errorAction.length !== null) &&
              errorAction.map((row:any,index:any)=>
                (<Alert severity="error" key={index} className={classes.alert}>{row} </Alert>)
            )}
          </div>
        </div>
      )}}  
    </Formik> 
  );
  
};

export default ContextAdd;
