import * as React from "react";
import { useState } from "react";
import { IContextKey } from "types/interfaces/ContextInterface";
import useStyles from "./styles";
import { themeButton } from "shared/constants/AppConst";
import { Formik } from "formik";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { CircularProgress, IconButton } from "@material-ui/core";
import { Alert, Tooltip } from "@mui/material";
import { ActionAccessMode, ActionMode } from "shared/constants/AppEnums";
import AccessButton from "shared/components/AccessButton";
import AccessTextField from "shared/components/AccessTextField";


const ContextKey: React.FC<IContextKey> = (props) => {
    const classes = useStyles();
    const [loading,setLoading] = useState<boolean>(false)
    const [errorAction,setErrorAction] = useState<any>([])

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                "name": props.contextKey.name,
                "description": props.contextKey.description,
                "storeId": null,
            }}
            onSubmit={(values:any) => {
                setLoading(true)
                let valueJson = {
                    "description": values.description,
                    "id": props.contextKey.id,
                    "name": values.name,
                    "priority": props.contextKey.priority,
                    "store": {id:props.contextKey.storeId},
                }
                props.handleKey(ActionMode.EDIT_MODE,valueJson,setLoading,setErrorAction)
            }}
        >
            {(formik) => {const {values,setFieldValue ,dirty,handleReset} = formik;
                return (
                    <div className={classes.contextContainer} >
                        <div className={classes.value_container}>
                            <div className={classes.value_container_form_firstElement}>
                                <div className={classes.value_container_form_Identifier}>
                                    <AccessTextField
                                        fullWidth={true}
                                        size="small"
                                        id={`input_Identifier_context_index_${props.indexElement}`}
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
                                    />
                                </div>
                                <div className={classes.value_container_form_description}>
                                    <AccessTextField
                                        fullWidth={true}
                                        size="small"
                                        id={`input_context_key_description_index_${props.indexElement}`}
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
                                    />
                                </div>
                            </div>
                            <div className={classes.value_container_action}>
                                <div style={{display:'flex'}}>
                                    { loading === false ?
                                        <div style={{display:'flex'}}>
                                            {  !dirty && props.stateAction !== ActionMode.CREATION_MODE ?
                                                <div></div>
                                                :
                                                <>
                                                    <div className={classes.value_container_action_btn}>
                                                        <Tooltip title={"Cancel"} arrow enterDelay={0} leaveDelay={100}>
                                                            <span>
                                                                <IconButton
                                                                    disabled={values.name === 'Latest'? true : false}
                                                                    id={`btn_cancel_value_index_${props.indexElement}`}
                                                                    className={classes.Add__btn}
                                                                    color="secondary"
                                                                    aria-label="cancelCreation"
                                                                    onClick={()=>{
                                                                        handleReset()
                                                                    }}>
                                                                    <CloseIcon />
                                                                </IconButton>
                                                            </span>
                                                        </Tooltip>
                                                    </div>
                                                    <div className={classes.value_container_action_btn}>
                                                        <AccessButton 
                                                            id={`btn_confirm_context_key_index_${props.indexElement}`} 
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
                        <div className={classes.PropertyKey_form_alert}>
                            {(errorAction.length !== null) &&
                                errorAction.map((row:any,index:any)=>
                                    (<Alert severity="error"   key={index} className={classes.alert}>{row} </Alert>)
                                )}
                        </div>
                    </div>
                )}}
        </Formik>
    );

};

export default ContextKey;