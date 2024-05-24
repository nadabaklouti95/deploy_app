import * as React from "react";
import { useState } from "react";

import { IContextStepAdd } from "types/interfaces/ContextInterface";
import { themeButton } from "shared/constants/AppConst";

import { Formik } from "formik";

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { CircularProgress, IconButton, TextField, ThemeProvider, Tooltip } from "@material-ui/core";
import { Alert } from "@mui/material";
import { ActionMode } from "shared/constants/AppEnums";
import useStyles from "./styles";
import AddNewValue from "modules/context/ContextValue/AddNewValue";
import Chips from "modules/context/ContextValue/Chip";
import {maxLengthValue} from "../../../../shared/constants/MaxLength";

let colors = ["#0A8FDC", "#eaa899", "#47dda5"];
for (var i = 0; i < 100; i++) {
  colors.push("#0A8FDC", "#eaa899", "#47dda5");
}

const ContextStep: React.FC<IContextStepAdd> = (props) => {
  const classes = useStyles();
  const [loading,setLoading] = useState<boolean>(false)
  const [errorAction,setErrorAction] = useState<any>([])
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

  const handleDelete = () => {
    props.handleContext(ActionMode.DELETE_MODE,null,props.indexElement,setLoading,setErrorAction)
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
            "id":props.context.id,
            "name": props.context.name,
            "description": props.context.description,
            "storeId": props.storeId,
            "values":props.context.value
      }}
      onSubmit={(values:any) => {
        setLoading(true)
        let valueJson = {
          "description": values.description,
          "id": values.id,
          "name": values.name,
          "priority": 0,
          "storeId": values.storeId,
          "values":values.values
        }
        props.handleContext(ActionMode.CREATION_MODE,valueJson,props.indexElement,setLoading,setErrorAction)
      }}
    >
    {(formik) => {const {values,setFieldValue ,dirty,handleReset} = formik;
      return (
        <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
            <div className={classes.value_container}>
                <div className={classes.value_container_form_firstElement}>
                  <div className={classes.value_container_form_Identifier}>
                    <TextField 
                      fullWidth 
                      disabled={values.name === 'Latest'? true : false}
                      id={`input_Identifier_context_${props.indexId}`}
                      name="name_Identifier_context" 
                      value={values.name} 
                      onChange={(event: any ) => { 
                        setFieldValue("name",event.target.value) 
                        setErrorAction([])                            
                      }} 
                      size="small" label='Identifier' variant='outlined' className={classes.textFiled}
                      inputProps={{ maxLength: maxLengthValue }}
                    />  
                  </div>
                  <div className={classes.value_container_form_description}>
                    <TextField 
                      disabled={values.name === 'Latest'? true : false}
                      fullWidth 
                      id={`input_context_key_description_${props.indexId}`}
                      name={`input_context_key_description$`}
                      value={values.description} 
                      onChange={(event: any ) => { 
                        setFieldValue("description",event.target.value) 
                        setErrorAction([])                            
                      }} 
                      size="small" label='Description' variant='outlined' 
                      className={classes.textFiled}
                      inputProps={{ maxLength: maxLengthValue }}
                    />  
                  </div>
                </div>
                <div className={classes.value_container_action}>
                    <div style={{display:'flex'}}>
                        { loading === false ?
                        <div style={{display:'flex'}}>
                            {  !dirty && props.stateAction !== ActionMode.CREATION_MODE ?
                            <Tooltip title={"Delete Context"} arrow enterDelay={0} leaveDelay={200}>
                                <span>
                                    <IconButton style={{padding:0}} disabled={values.name === 'Latest'? true : false} id={`btn_delete_context_key_${props.indexId}`} onClick={handleDelete}>
                                    <HighlightOffIcon color="secondary" />
                                </IconButton>
                                </span>

                            </Tooltip>:
                            <>
                                <div className={classes.value_container_action_btn}>
                                    <Tooltip title={"Cancel"} arrow enterDelay={0} leaveDelay={100}>
                                        <span>
                                            <IconButton
                                                disabled={values.name === 'Latest'? true : false}
                                                id={`btn_cancel_context_${props.indexId}`}
                                                className={classes.Add__btn}
                                                color="secondary"
                                                aria-label="cancelCreation"
                                                onClick={()=>{
                                                    if(props.stateAction !== ActionMode.CREATION_MODE){
                                                        handleReset()
                                                    }else{
                                                        handleDelete()
                                                    }

                                                }}>
                                            <CloseIcon />
                                        </IconButton>
                                        </span>

                                    </Tooltip>
                                </div>
                                <div className={classes.value_container_action_btn}>
                                    <ThemeProvider theme={themeButton}>
                                        <Tooltip title={"Confirm"} arrow enterDelay={0} leaveDelay={100}>
                                            <span>
                                               <IconButton disabled={values.name === 'Latest'? true : false} id={`btn_confirm_context_${props.indexId}`} className={classes.Add__btn} style={{marginRight:4}} color="primary" aria-label="confirmCreation" onClick={()=>{ formik.submitForm(); }} >
                                                <CheckIcon />
                                            </IconButton>
                                            </span>

                                        </Tooltip>
                                    </ThemeProvider>
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
                    <div className={classes.chips_element} key={index}>
                      <Chips indexContext={props.indexId} handleValue={handleValue} item={element} indexElement={index} handleFormikValue={setFieldValue} listValues={values.values} color={colors[index]}/>
                    </div>
                  ))}
                </div>
                <div className={classes.addNew_value}>
                  <AddNewValue indexContext={props.indexId} handleValue={handleValue} item={{id:null,value:''}} indexElement={null} handleFormikValue={setFieldValue} listValues={values.values} />
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

export default ContextStep;
