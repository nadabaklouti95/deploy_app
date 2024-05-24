import * as React from "react";
import {Formik} from "formik";
import {ActionAccessMode, ActionMode} from "shared/constants/AppEnums";
import {CircularProgress, Typography} from "@material-ui/core";
import {themeButton} from "shared/constants/AppConst";
import {Alert} from "@material-ui/lab";
import useStyles from "./styles";
import {useState} from "react";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {IStoreGeneral} from "types/models/interface";
import AccessTextField from "shared/components/AccessTextField";
import AccessButton from "shared/components/AccessButton";
import ConfirmPopup from "shared/components/ConfirmPopup";
import { useSelector } from "react-redux";
import { AppState } from "redux/store";
import {maxLengthValue} from "shared/constants/MaxLength";


const StoreGeneral: React.FC<IStoreGeneral> = (props) => {

    const classes = useStyles();
    const [loading,setLoading] = useState<boolean>(false)
    const [errorAction,setErrorAction] = React.useState<any>([])
    
    const workspaces = useSelector((state: AppState) => state.workspaces.workspaceslist);
    const initialValueWS = document.cookie.split("; ").reduce((acc, cur) =>cur.split("=")[0] === "selectedWorkspace" ? `${acc}${cur.split("=")[1]}` : acc,"");
    const selectedWS = workspaces.find((element: any) => element.workSpaceDTO.name === initialValueWS);


    return (
        
    <Formik
        enableReinitialize={true}
        initialValues={{
            "deleted": props.store.deleted,
            "description": props.store.description,
            "id": props.store.id,
            "name": props.store.name,
            "typeId": props.store.typeId,
            "workspace": {id:selectedWS?.workSpaceDTO.id}
        }}
        onSubmit={(values:any) => {
            values.name = values.name.trim();
            setLoading(true)
            props.handleStore(ActionMode.EDIT_MODE,values,setLoading,setErrorAction)  
        }}
    >
        {(formik) => {const {values,setFieldValue ,dirty,handleReset} = formik;
            return (
            <div  style={{display:'flex',flexDirection:'column',width:'100%'}}>
                <div className={classes.value_container}>
                    <div className={classes.value_container_form}>
                        <div className={classes.value_container_form_firstElement}>
                            <div className={classes.value_container_form_firstElement_name}>
                                <AccessTextField
                                    fullWidth={true}
                                    disabled={!props.stateComponnent ? true : false}
                                    size="small"
                                    id={`input_name_store_index_${props.indexStore}`}
                                    name={`name_store`}
                                    value={values.name}
                                    handleChange={(event: any ) => { 
                                        setFieldValue("name",event.target.value) 
                                        setErrorAction([])                            
                                    }}
                                    label='Name'
                                    variant='outlined'
                                    className={classes.textFiledKeyList}
                                    inputProps={{ maxLength: maxLengthValue }}
                                    actionType={ActionAccessMode.WRITE_MODE}
                                    
                                /> 
                            </div>
                            <div className={classes.value_container_form_firstElement_store}>
                                <div className={classes.storeTypography}>
                                    <Typography  style={{fontWeight:500,color:"#3569a8"}}>Type :</Typography>
                                </div>
                                <div id={`div_store_type`} className={classes.storeCheck}>
                                    <Typography id={`store_type`} >{props.getStoreType(values.typeId)}</Typography>
                                </div>
                            </div>
                        </div>
                        <div className={classes.value_container_form_firstElement}>
                            <AccessTextField
                                fullWidth={true}
                                disabled={!props.stateComponnent ? true : false}
                                size="small"
                                id={`input_store_description_index_${props.indexStore}`}
                                name={`input_store_description_index_${props.indexStore}`}
                                value={values.description}
                                handleChange={(event: any ) => {
                                    setFieldValue("description",event.target.value) 
                                    setErrorAction([])                            
                                }}
                                label='Description'
                                variant='outlined'
                                className={classes.textFiledKeyListDescription}
                                inputProps={{ maxLength: maxLengthValue }}
                                actionType={ActionAccessMode.WRITE_MODE}
                                multiline={true}
                                style={{height:70}}
                                minRows={3}
                                maxRows={3}
                            /> 
                        </div>
                    </div>
                <div className={classes.value_container_action}>
                    <div style={{display:'flex'}}>
                        { loading === false ?
                            <div style={{display:'flex'}}>
                                { dirty  &&
                                    <>
                                        <div className={classes.value_container_action_btn}>
                                            <AccessButton 
                                                id={`btn_cancel_store_index_${props.indexStore}`} 
                                                disabled={!props.stateComponnent? true : false}
                                                actionType={ActionAccessMode.WRITE_MODE} 
                                                className={classes.Add__btn} 
                                                color={"secondary"}
                                                ariaLabel={"cancelCreation"}
                                                handleClick={()=>{
                                                    handleReset()  
                                                }}
                                                iconButton={true}
                                                theme={themeButton}
                                                tooltip={"Cancel"}
                                            >
                                                <CloseIcon />
                                            </AccessButton>
                                        </div>
                                        <div className={classes.value_container_action_btn}>
                                            <AccessButton 
                                                id={`btn_confirm_store_index_${props.indexStore}`}
                                                disabled={false}
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
                        <div className={classes.progress} style={{marginRight: 16}}>
                            <CircularProgress disableShrink size={20}/>   
                        </div>
                        }
                    </div>
                    <ConfirmPopup 
                        opendialog={props.openConfirmdialog} 
                        headerContent={props.headerConfirmPopup} 
                        contentMessage={props.contentConfirmPopup} 
                        handleClose={props.handleCloseConfirmPopup} 
                        popupMainAction={props.deleteStore} 
                        handleAccordion={()=>{}}
                    />
                </div>
        </div>
        <div className={classes.store_form_alert}>
            {(errorAction.length !== null) && errorAction.map((row:any,index:any)=>
                (<Alert severity="error"  style={{width:'100%'}} key={index} className={classes.alert}>
                    {row}
                </Alert>
                )
            )}
        </div>
            </div>
    )}}  
    </Formik> 
        
    )
}

export default StoreGeneral;
