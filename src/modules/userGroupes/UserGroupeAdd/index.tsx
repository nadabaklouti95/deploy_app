
import * as React from "react";
import { useState } from "react";

import useStyles from "./styles";
import {  themeDeleteButton } from "shared/constants/AppConst";
import { ActionAccessMode, ActionMode } from "shared/constants/AppEnums";

import { CircularProgress, IconButton, Typography, createTheme } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Formik } from "formik";
import ConfirmPopup from "shared/components/ConfirmPopup";
import { Alert } from '@material-ui/lab';
import { labelField } from "shared/constants/AppCssCons";
import { IUserGroupeAdd } from "types/models/interface";
import AccessTextField from "shared/components/AccessTextField";
import AccessButton from "shared/components/AccessButton";
import { green } from "@material-ui/core/colors";
import AccessCheckbox from "shared/components/AccessCheckbox";
import CheckIcon from '@material-ui/icons/Check';

const theme = createTheme({ palette: { primary: green}});

const UserGroupeAdd: React.FC<IUserGroupeAdd> = (props) => {
    const classes = useStyles();
    const [loading,setLoading] = useState<boolean>(false)
    const [openConfirmdialog, setOpenDialog] = React.useState(false);
    const [headerConfirmPopup,setHeaderPopup]= React.useState<string>("");
    const [contentConfirmPopup,setContentPopup] = React.useState<string>("");
    const [errorAction,setErrorAction] = React.useState<any>([])


    const handleOpenConfirmPopup = () => {

            setHeaderPopup("Delete user groupe")
            setContentPopup("Are you sure u want to delete this user groupe")
            setOpenDialog(true);
    };
    const handleCloseConfirmPopup = () => {
        setOpenDialog(false);
    };
    const DeletePrporty = ()=>{
        props.handleValue(ActionMode.DELETE_MODE,props.csUserGroupDTO.id)
    };



  return (
    <div className={classes.addContainer}>
        <Formik
            enableReinitialize={true}
            initialValues={{
                "attachedToStore": props.csUserGroupDTO.attachedToStore,
                "description": props.csUserGroupDTO.description,
                "id": props.csUserGroupDTO.id,
                "name": props.csUserGroupDTO.name,
                "storeId":props.csUserGroupDTO.storeId
            }}
            onSubmit={(values:any) => {
                setLoading(true)
                    props.handleValue(props.actionMode,values,setLoading,setErrorAction)
            }}
        >
                {(formik) => {const {values,setFieldValue ,dirty} = formik;
                    return (
                        <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
                            <div className={classes.value_container}>
                                <div className={classes.value_container_form}>
                                    <div className={classes.value_container_form_firstElement}>
                                        <div className={classes.value_container_form_firstElement_name}> 
                                            <AccessTextField
                                                fullWidth={true}
                                                id={`name_user_groupe`}
                                                name="name_user_groupe" 
                                                value={values.name} 
                                                handleChange={(event: any ) => { 
                                                    setFieldValue("name",event.target.value)  
                                                    setErrorAction([])                             
                                                }} 
                                                size="small"  
                                                label='Groupe Name' 
                                                variant='outlined' 
                                                className={classes.textFiledKeyList}
                                                actionType={ ActionAccessMode.WRITE_MODE }
                                            />
                                        </div>
                                        <div className={classes.value_container_form_firstElement_store}>
                                            <div className={classes.value_container_form_firstElement_store_typo}>
                                                <Typography style={labelField}>Attached to Store:</Typography>
                                            </div>
                                            <div className={classes.value_container_form_firstElement_store_check}>
                                                <AccessCheckbox
                                                    actionType={ActionAccessMode.WRITE_MODE}
                                                    checked={values.attachedToStore} 
                                                    value={values.attachedToStore}
                                                    size='small'
                                                    className={classes.checkbox}
                                                    handleChange={(event: any ) => {
                                                        setFieldValue("attachedToStore",event.target.checked)
                                                        setErrorAction([])  
                                                    }} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.value_container_form_firstElement}>
                                        <AccessTextField
                                            style={{height:60}}
                                            fullWidth 
                                            id={`description_user_groupe`}
                                            minRows={2}
                                            maxRows={2}
                                            multiline={true}
                                            name="description_user_groupe" 
                                            value={values.description} 
                                            handleChange={(event: any ) => { 
                                                setFieldValue("description",event.target.value)  
                                                setErrorAction([])                           
                                            }} 
                                            size="small"  
                                            label='Description' 
                                            variant='outlined' 
                                            className={classes.textFiledKeyListDescription}
                                            actionType={ ActionAccessMode.WRITE_MODE }
                                        />
                                    </div>
                                </div>
                                <div className={classes.value_container_action}>
                                    <div style={{display:'flex'}}>
                                        { loading === false ?
                                        <div style={{display:'flex'}}>
                                            {!dirty && (props.actionMode!==ActionMode.CREATION_MODE)  ?
                                                <AccessButton 
                                                    id={`delete_user_groupe`} 
                                                    actionType={ActionAccessMode.WRITE_MODE} 
                                                    style={{padding:0}}
                                                    color={"primary"}
                                                    ariaLabel={"delete-user-user-groupe"}
                                                    handleClick={handleOpenConfirmPopup}
                                                    iconButton={true}
                                                    theme={themeDeleteButton}
                                                    tooltip={"Delete User Groupe"}
                                                >
                                                    <HighlightOffIcon color="secondary" />
                                                </AccessButton> :
                                                <>
                                                    <div className={classes.value_container_action_btn}>
                                                        <IconButton 
                                                            id={`addPublish_cancel`} 
                                                            className={classes.Add__btn} 
                                                            color="secondary" 
                                                            aria-label="cancelCreation" 
                                                            onClick={()=>{
                                                                if(props.actionMode === ActionMode.CREATION_MODE){
                                                                    props.handleValue(ActionMode.CANCEL_MODE,null,null)
                                                                }else{
                                                                    formik.submitForm(); 
                                                                }
                                                            }}>
                                                            <CloseIcon />
                                                        </IconButton>  
                                                    </div>
                                                    <div className={classes.value_container_action_btn}>
                                                        <AccessButton 
                                                            id={`add-user-groupe`} 
                                                            className={classes.Add__btn}
                                                            actionType={ActionAccessMode.WRITE_MODE} 
                                                            style={{padding:0}}
                                                            color={"primary"}
                                                            ariaLabel={"confirmCreation"}
                                                            handleClick={()=>{ formik.submitForm(); }}
                                                            iconButton={true}
                                                            theme={theme}
                                                            tooltip={"Delete User Groupe"}
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
                                    <ConfirmPopup opendialog={openConfirmdialog} headerContent={headerConfirmPopup} contentMessage={contentConfirmPopup} handleClose={handleCloseConfirmPopup} popupMainAction={DeletePrporty} handleAccordion={()=>{}}/>

                                </div>
                            </div>
                            <div className={classes.PropertyKey_form_alert}>
                                {(errorAction.length !== null) &&
                                    errorAction.map((row:any,index:any)=>
                                        (<Alert severity="error"  style={{width:'100%'}} key={index} className={classes.alert}>
                                            {row}
                                        </Alert>
                                    )
                                )}
                            </div>
                        </div>
                
            )}}  
            </Formik> 
        </div>
        
    );
};
export default UserGroupeAdd;
