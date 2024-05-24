import { Formik } from "formik";
import * as React from "react";
import { useState } from "react";
import { ActionAccessMode, ActionMode } from "shared/constants/AppEnums";
import { IContextValue } from "types/interfaces/ContextInterface";
import Chips from "./Chip";
import useStyles from "./styles";

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import { themeButton } from "shared/constants/AppConst";
import AddNewValue from "./AddNewValue";
import { Alert } from "@mui/material";
import AccessButton from "shared/components/AccessButton";

let colors = ["#0A8FDC", "#eaa899", "#47dda5"];
for (var i = 0; i < 100; i++) {
  colors.push("#0A8FDC", "#eaa899", "#47dda5");
}


const ContextValue: React.FC<IContextValue> = (props) => {
  const classes = useStyles();
  const [loading,setLoading] = useState<boolean>(false)
  const [errorAction,setErrorAction] = useState<any>([])

 

  const handleValue = (actionMode:ActionMode,valueContext:any,indexElement:any,handleFormikValue:any,listValues:any)=>{
    let listContextValue:any = JSON.parse(JSON.stringify(listValues))
    setErrorAction([])
    let result ;
    if(actionMode === ActionMode.DELETE_MODE){
      console.log(listContextValue)
      listContextValue.splice(indexElement, 1); 
      handleFormikValue('values',listContextValue)
    }
    if(actionMode === ActionMode.EDIT_MODE){
       listContextValue[indexElement].value = valueContext
       result = listContextValue
      handleFormikValue('values',result)
    }
    if(actionMode === ActionMode.CREATION_MODE){
      listContextValue.push({id:null, keyId:props.contextKey.id, value:valueContext})
      result = listContextValue
      handleFormikValue('values',result)
   }
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
          values:props.contextKey.values
      }}
      onSubmit={(values:any) => {
        setLoading(true)
        let valueJson = {
          "keyId": props.contextKey.id,
          "values": values.values
        }
        props.handleValue(ActionMode.UPDATE_VALUE_MODE,valueJson,setLoading,setErrorAction)
      }}
    >
      {(formik) => {const {values,setFieldValue,dirty,handleReset } = formik;
        return (
          <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
            <div className={classes.container_contextValues}>
              <div className={classes.listChips_container}>
                <div className={classes.addNew_value}>
                  {values.values.map((element:any,index:any)=>(
                    <div className={classes.chips_element} key={`div_chips_${index}`}>
                      <Chips color={colors[index]} handleValue={handleValue} item={element} indexContext={props.indexElement} indexElement={index} handleFormikValue={setFieldValue} listValues={values.values}/>
                    </div>
                  ))}
                </div>
                <div className={classes.addNew_value}>
                  <AddNewValue 
                    handleValue={handleValue} 
                    item={{id:null,value:''}} 
                    indexContext={props.indexElement} 
                    indexElement={null} 
                    handleFormikValue={setFieldValue} 
                    listValues={values.values} 
                  />
                </div>
                
              </div>
              <div className={classes.action}>
                <div style={{display:'flex'}}>
                  {loading === false ?
                    <div style={{display:'flex'}}>
                      {dirty &&
                        <>
                          <div className={classes.value_container_action_btn}>
                            <Tooltip title={"Cancel"} arrow enterDelay={0} leaveDelay={100}>
                              <span>
                                <IconButton id={`btn_cancel_context_${props.indexElement}`} className={classes.Add__btn} color="secondary"  aria-label="cancelCreation"  onClick={()=>{ handleReset()}}>
                                <CloseIcon />
                              </IconButton>
                              </span>

                            </Tooltip>
                          </div>
                          <div className={classes.value_container_action_btn}>
                            <AccessButton 
                              id={`btn_confirm_context_${props.indexElement}`} 
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
            <div className={classes.PropertyKey_form_alert}>
            {(errorAction.length !== null) &&
              errorAction.map((row:any,index:any)=>
                (<Alert severity="error"  key={index} className={classes.alert}>{row} </Alert>)
            )}
          </div>
         </div>
        )
      }}
    </Formik>
  );
};


export default ContextValue;
