import * as React from "react";
import { useState } from "react";

import { themeButton } from "shared/constants/AppConst";

import { Formik } from "formik";

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { CircularProgress, IconButton, TextField, ThemeProvider } from "@material-ui/core";
import {Alert, Tooltip} from "@mui/material";
import { ActionMode } from "shared/constants/AppEnums";
import useStyles from "./styles";
import {IWorkspaceAdd} from "../../../types/models/interface";
/*import {useEffect} from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../../redux/store";*/




const WorkspaceAdd: React.FC<IWorkspaceAdd> = (props) => {
    const classes = useStyles();

    const [loading,setLoading] = useState<boolean>(false)
    const [errorAction,setErrorAction] = useState<any>([])

    const handleCancel = () => props.cancelAction(false)



    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                "id":null,
                "name": "",
                "description": "",
            }}
            onSubmit={(values:any) => {
                setLoading(true)
                let valueJson = {
                    "description": values.description,
                    "id": values.id,
                    "name": values.name,

                }
                props.handleWorkspace(ActionMode.CREATION_MODE,valueJson,setLoading,setErrorAction)
            }}
        >
            {(formik) => {const {values,setFieldValue} = formik;
                return (
                    <div className={classes.add_container}>
                        <div className={classes.value_container}>
                            <div className={classes.value_container_form_firstElement}>
                                <div className={classes.value_container_form_Identifier}>
                                    <TextField
                                        fullWidth
                                        id={`input_name_workspace`}
                                        name="name_workspace"
                                        value={values.name}
                                        onChange={(event: any ) => {
                                            setFieldValue("name",event.target.value)
                                            setErrorAction([])
                                        }}
                                        size="small" label='Name' variant='outlined' className={classes.textFiled}
                                    />
                                </div>
                                <div className={classes.value_container_form_description}>
                                    <TextField
                                        fullWidth
                                        id={`input_workspacet_key_description_add`}
                                        name={`input_workspace_key_description$`}
                                        value={values.description}
                                        onChange={(event: any ) => {
                                            setFieldValue("description",event.target.value)
                                            setErrorAction([])
                                        }}
                                        size="small" label='Description' variant='outlined'
                                        className={classes.textFiled}
                                    />
                                </div>
                            </div>
                            <div className={classes.value_container_action}>
                                <div style={{display:'flex'}}>
                                    { loading === false ?
                                        <div style={{display:'flex'}}>
                                            <div className={classes.value_container_action_btn}>
                                                <Tooltip title={"Cancel"} arrow enterDelay={0} leaveDelay={100}>
                                                    <IconButton
                                                        id={`btn_cancel_workspace_add`}
                                                        className={classes.Add__btn}
                                                        color="secondary"
                                                        aria-label="cancelCreation"
                                                        onClick={()=>{
                                                            handleCancel()
                                                        }}>
                                                        <CloseIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                            <div className={classes.value_container_action_btn}>
                                                <ThemeProvider theme={themeButton}>
                                                    <Tooltip title={"Confirm"} arrow enterDelay={0} leaveDelay={100}>
                                                        <IconButton id={`btn_confirm_workspace_add`}
                                                                    className={classes.Add__btn} style={{marginRight:4}} color="primary"
                                                                    aria-label="confirmCreation"
                                                                    onClick={()=>{ formik.submitForm(); }} >
                                                            <CheckIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </ThemeProvider>
                                            </div>

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
                                (<Alert severity="error" key={index} className={classes.alert}>{row} </Alert>)
                            )}
                        </div>
                    </div>
                )}}
        </Formik>
    );

};

export default WorkspaceAdd;
