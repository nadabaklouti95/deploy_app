import * as React from "react";
import {Formik} from "formik";
import {ActionAccessMode, ActionMode} from "../../../../shared/constants/AppEnums";
import {CircularProgress, IconButton, Typography} from "@material-ui/core";
import {labelField} from "../../../../shared/constants/AppCssCons";
import {themeButton} from "../../../../shared/constants/AppConst";
import {Alert} from "@material-ui/lab";
import useStyles from "../styles";
import {useState} from "react";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {ITagValueGeneral} from "../../../../types/models/interface";
import AccessTextField from "shared/components/AccessTextField";
import AccessButton from "shared/components/AccessButton";
import { Tooltip } from "@mui/material";


const TagValueGeneral: React.FC<ITagValueGeneral> = (props) => {

    const classes = useStyles();
    const [loading,setLoading] = useState<boolean>(false)
    const [resetState,setResetState] = React.useState<boolean>(false)
    const [errorAction,setErrorAction] = React.useState<any>([])


    let submitAction:any = "submit";
    let resetFormik:any = undefined

    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    "name": props.tag.name,
                    "description": props.tag.description,
                    "id": props.tag.id,
                    "deleted": true,
                    "nextTags": props.tag.nextTags,
                    "store":{
                        id :props.tag.storeId}
                }}
                onSubmit={(values:any) => {
                    if (submitAction === 'reset') {
                        resetFormik()
                        setResetState(!resetState)
                    }
                    if (submitAction === 'submit') {
                        setLoading(true)
                        props.handleTag(ActionMode.EDIT_MODE,values,setLoading,setErrorAction)
                    }
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
                                                disabled={values.name === 'Latest' || props.lockTag}
                                                size="small"
                                                id={`textField_name_${props.indexTag}`}
                                                name={`name_tag`}
                                                value={values.name}
                                                handleChange={(event: any ) => {
                                                    setFieldValue("name",event.target.value)
                                                    setErrorAction([])
                                                }}
                                                label='Name'
                                                variant='outlined'
                                                className={classes.textFiledKeyList}
                                                actionType={ActionAccessMode.WRITE_MODE}
                                            />
                                        </div>
                                        <div className={classes.value_container_form_firstElement_store}>
                                            <div className={classes.value_container_form_firstElement_store_typo}>
                                                <Typography  style={labelField}>Next Tag:</Typography>
                                            </div>
                                            {props.tag.nextTags.map((element:any,indexNext:any)=>(
                                                <div id={`tag_${props.tag.id}_index_${indexNext}`} className={classes.value_container_form_firstElement_store_check} key={`tag_${props.tag.id}_index_${indexNext}`}>
                                                    <Typography id={`tagName_${props.tag.id}_index_${indexNext}`} >{element.name}</Typography>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                    <div className={classes.value_container_form_firstElement}>
                                        <AccessTextField
                                            fullWidth={true}
                                            disabled={values.name === 'Latest' || props.lockTag}
                                            size="small"
                                            minRows={3}
                                            maxRows={3}
                                            style={{height:70}}
                                            multiline={true}
                                            id={`textField_description_${props.indexTag}`}
                                            name={`input_tag_description`}
                                            value={values.description}
                                            handleChange={(event: any ) => {
                                                setFieldValue("description",event.target.value)
                                                setErrorAction([])
                                            }}
                                            label='Description'
                                            variant='outlined'
                                            className={classes.textFiledKeyListDescription}
                                            actionType={ActionAccessMode.WRITE_MODE}
                                        />
                                    </div>
                                </div>
                                <div className={classes.value_container_action}>
                                    <div style={{display:'flex'}}>

                                        { loading === false ?
                                            <div style={{display:'flex'}}>
                                                {  dirty  &&
                                                    <>
                                                        <div className={classes.value_container_action_btn}>
                                                            <Tooltip title={"Cancel"} arrow enterDelay={0} leaveDelay={100}>
                                                                <IconButton
                                                                    disabled={values.name === 'Latest'? true : false}
                                                                    id={`btn_cancel_${props.indexTag}`}
                                                                    className={classes.Add__btn}
                                                                    color="secondary"
                                                                    aria-label="cancelCreation"
                                                                    onClick={()=>{
                                                                        handleReset()
                                                                    }}>
                                                                    <CloseIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </div>
                                                        <div className={classes.value_container_action_btn}>
                                                            <AccessButton 
                                                                id={`btn_confirm_${props.indexTag}`}
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
    )
}

export default TagValueGeneral;
