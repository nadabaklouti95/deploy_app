
import * as React from "react";
import { useEffect, useState } from "react";

import useStyles from "./styles";
import { StyledAccordionSummary, themeButton, themeDeleteButton } from "shared/constants/AppConst";
import { ActionAccessMode, ActionMode } from "shared/constants/AppEnums";
import AccessRuleElement from "modules/accesRules/AccesRuleElement";
import {Accordion, AccordionDetails, CircularProgress, IconButton, Tab, Typography} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IUserGroupe } from "types/models/interface";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Formik } from "formik";
import ConfirmPopup from "shared/components/ConfirmPopup";
import { Alert, TabContext, TabList, TabPanel } from "@material-ui/lab";
import { labelField } from "shared/constants/AppCssCons";
import UserGroupeRules from "../UserGroupeRules";
import AccessCheckbox from "shared/components/AccessCheckbox";
import AccessButton from "shared/components/AccessButton";
import AccessTextField from "shared/components/AccessTextField";



const UserGroupeValue: React.FC<IUserGroupe> = (props) => {
    const classes = useStyles();
    const [accordState,setAccordState] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    const [openConfirmdialog, setOpenDialog] = React.useState(false);
    const [headerConfirmPopup,setHeaderPopup]= React.useState<string>("");
    const [contentConfirmPopup,setContentPopup] = React.useState<string>("");
    const [resetState,setResetState] = React.useState<boolean>(false)
    const [errorAction,setErrorAction] = React.useState<any>([])
    const [loadingDelete,setLoadingDelete] = useState<boolean>(false)

    const handleAccordion = ()=>{
        setAccordState(!accordState)
    }
    const handleOpenConfirmPopup = (event:any) => {
        if (event) event.stopPropagation()
            setHeaderPopup("Delete user groupe")
            setContentPopup("Are you sure u want to delete this user groupe")
            setOpenDialog(true);
    };
    const handleCloseConfirmPopup = () => {
        setOpenDialog(false);
    };
    const DeletePrporty = ()=>{
        setLoadingDelete(true)
        props.handleValue(ActionMode.DELETE_MODE,props.csUserGroupDTO.id,setLoading)
        setTimeout(() => {
            setLoadingDelete(false)
        }, 1000);
    };
    let submitAction:any = "submit";
    let resetFormik:any = undefined
    const [value, setValue] = React.useState('1');

    const handleChange = (event:any, newValue:any) => {
      setValue(newValue);
    };
    useEffect(()=>{   
        setAccordState(props.fold)
      },[props.fold])

  return (
    <Accordion id={"1"} key={1} className={classes.Accordion} expanded={accordState} onChange={handleAccordion}>
        <StyledAccordionSummary  
            expandIcon={<ExpandMoreIcon className={classes.ExpandMoreIcon}/>}
            aria-controls="panel1a-content" 
            id="panel1a-header" 
            className={classes.AccordionSummary}
        >
            <div className={classes.accordion_summary_container} >
                <div className={classes.accordionSummary_content_btns}>
                    {!loadingDelete ?
                        <AccessButton
                            id={`btn_delete_group_${props.indexUserGroupeValue}`} 
                            actionType={ActionAccessMode.WRITE_MODE} 
                            style={{padding:0}}
                            color={"primary"}
                            ariaLabel={"delete-user"}
                            handleClick={handleOpenConfirmPopup}
                            iconButton={true}
                            theme={themeDeleteButton}
                            tooltip={"Delete User Group"}
                        >
                            <HighlightOffIcon color="secondary" />
                        </AccessButton>
                        :
                        <div className={classes.progress}>
                            <CircularProgress disableShrink size={20}/>
                        </div>
                    }
                </div>


                {!accordState &&
                    <div className={classes.accordion_summary_content}>
                        <div className={classes.accodianSummary_content} >

                            <div className={classes.accodianSummary_content_label}>
                                <Typography style={labelField}>Groupe User Name :</Typography>
                            </div>
                            <div className={classes.accodianSummary_content_value}>
                                <Typography >{props.csUserGroupDTO.name}</Typography>
                            </div>

                        </div>

                    </div>

                }
            </div>

        </StyledAccordionSummary>
        <AccordionDetails className={classes.accordion_details}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    "attachedToStore": props.csUserGroupDTO.attachedToStore,
                    "description": props.csUserGroupDTO.description,
                    "id": props.csUserGroupDTO.id,
                    "name": props.csUserGroupDTO.name,
                    "storeId":props.csUserGroupDTO.storeId,

                }}
                onSubmit={(values:any) => {
                    if (submitAction === 'reset') {
                        resetFormik()
                        setResetState(!resetState)
                    }
                    if (submitAction === 'submit') {
                        setLoading(true)
                        props.handleValue(ActionMode.EDIT_MODE,values,setLoading,setErrorAction)
                    }
                }}
            >
                {(formik) => {const {values,setFieldValue ,dirty,handleReset} = formik;
                return (
                    <TabContext value={value}>
                        <TabList TabIndicatorProps={{ style: { background: "#3569a8" } }} id={`tab_userGroupe_index_${props.indexUserGroupeValue}`} className={classes.TabList} onChange={handleChange} aria-label={`tab_for_user_groupe_index_${props.indexUserGroupeValue}`}>
                            <Tab itemID={`tab_userGroupe_general_index_${props.indexUserGroupeValue}`} className={`${classes.Tab} ${classes.general_tab}`} label='General' value='1' />
                            <Tab itemID={`tab_userGroupe_generalAccess_rules_index_${props.indexUserGroupeValue}`} className={`${classes.Tab} ${classes.access_rules_tab}`} label='General Access' value='2' />
                            <Tab itemID={`tab_userGroupe_Context_Access_index_${props.indexUserGroupeValue}`}  className={`${classes.Tab} ${classes.context_access_tab}`}  style={{display:props.csUserGroupDTO.attachedToStore ? 'flex' : 'none'}} label='Context Access' value='3' />
                        </TabList>
                        <TabPanel itemID={`TabPanel_userGroupe_general_index_${props.indexUserGroupeValue}`} style={{padding:0}} className={classes.TabPanel} value='1'>
                                        <div className={classes.tab_panel_content}>
                                            <div className={classes.value_container}>
                                                <div className={classes.value_container_form}>
                                                    <div className={classes.value_container_form_firstElement}>
                                                        <div className={classes.value_container_form_firstElement_name}>
                                                            <AccessTextField
                                                                fullWidth 
                                                                id={`input_name_user_groupe_index_${props.indexUserGroupeValue}`}
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
                                                                    id={`check_attached_user_groupe_index_${props.indexUserGroupeValue}`}
                                                                    color='primary'
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
                                                            id={`input_description_user_groupe_index_${props.indexUserGroupeValue}`}
                                                            minRows={2}
                                                            maxRows={2}
                                                            multiline={true}
                                                            name={`input_description_user_groupe_index_${props.indexUserGroupeValue}`}
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
                                                    <div style={{display:'flex',alignItems:'flex-start'}}>
                                                        {  !dirty && (props.actionMode!==ActionMode.CREATION_MODE)  ?
                                                            <div></div>
                                                        :
                                                        <>
                                                            <div className={classes.value_container_action_btn}>
                                                                <IconButton 
                                                                    id={`btn_cancel_user_groupe_index_${props.indexUserGroupeValue}`}
                                                                    className={classes.Add__btn} 
                                                                    color="secondary" 
                                                                    aria-label="cancelCreation" 
                                                                    onClick={()=>{
                                                                        if(props.actionMode === ActionMode.CREATION_MODE){
                                                                            props.handleValue(ActionMode.CANCEL_MODE,null,null)
                                                                        }else{
                                                                            submitAction = 'reset';
                                                                            resetFormik = ()=>handleReset()
                                                                            formik.submitForm(); 
                                                                        }
                                                                    }}>
                                                                    <CloseIcon />
                                                                </IconButton>  
                                                            </div>
                                                            <div className={classes.value_container_action_btn}>
                                                                <AccessButton 
                                                                    id={`btn_confirm_user_groupe_index_${props.indexUserGroupeValue}`} 
                                                                    className={classes.Add__btn}
                                                                    actionType={ActionAccessMode.WRITE_MODE} 
                                                                    style={{padding:4}}
                                                                    color={"primary"}
                                                                    ariaLabel={"confirmCreation"}
                                                                    handleClick={()=>{ 
                                                                        submitAction = "submit"
                                                                        formik.submitForm(); 
                                                                    }}
                                                                    iconButton={true}
                                                                    theme={themeButton}
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
                        
                        </TabPanel>
                        <TabPanel itemID={`TabPanel_userGroupe_AccessRules_index_${props.indexUserGroupeValue}`}  style={{padding:0}} className={classes.TabPanel} value='2'>
                            <UserGroupeRules 
                                accessRule={props.csGeneralAccessRuleDTO}
                                indexAccess={0}
                                status={"DRAFT"} 
                                handleGeneralAccess={props.handleAccessRule}   
                            />
                        </TabPanel>
                        <TabPanel itemID={`TabPanel_userGroupe_AccessRules_index_${props.indexUserGroupeValue}`}  style={{padding:0}} className={classes.TabPanel} value='3'>
                            <AccessRuleElement 
                                accessRule={props.csAccessRuleDTO} 
                                handleAccessRule={props.handleAccessRule} 
                                fold={true} 
                                status={"DRAFT"} 
                                indexAccess={props.indexUserGroupeValue}
                            />
                        </TabPanel>
                    </TabContext>
                )}}  
            </Formik> 
        </AccordionDetails>
        
    </Accordion>
        
    );
};
export default UserGroupeValue;
