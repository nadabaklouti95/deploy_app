import React from "react";
import { FC } from "react";
import {ActionAccessMode, ActionMode, EStatus, ProportyType, typeEnum} from 'shared/constants/AppEnums';
import useStyles from "./styles";
import { IPropertyKey } from "types/models/interface";

import { Formik } from 'formik';
import * as Yup from "yup";

import { CircularProgress, createTheme, Grid, Icon, IconButton, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { Alert } from '@material-ui/lab';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { Tooltip } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { labelField } from "shared/constants/AppCssCons";
import AccessButton from "shared/components/AccessButton";
import AccessTextField from "shared/components/AccessTextField";
import AccessCheckbox from "shared/components/AccessCheckbox";
import AccessSwitch from "shared/components/AccessSwitch";
import Stack from '@mui/material/Stack';
import AccessMultiLineSwitch from "shared/components/AccessMultiLineSwitch";


    const yamlProperties = "YAML"
    const theme = createTheme({ palette: { primary: green}});
    const validationPropertyYAMLSchema = Yup.object({});
    const  isJsonString = (str:any) =>{
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    /*const getParentKey = (fullName:any,key:any)=>{
        if(key !== null && key !== undefined){
            if( key.length !== 0 ){
                let indexOfKey = fullName.indexOf(key)
                if(indexOfKey !== (-1)){
                    let subFullName = fullName.substring(0,indexOfKey-1)
                    return subFullName
                }else{
                    return fullName
                }
            }


        }if(key === null){
            return ""
        }
        if(key === null){
            return ""
        }else{
            return fullName
        }
    }*/
    /*const getChildKey = (key:any,isComplex:any)=>{
        if(!isComplex){
            return key
        }else{
            return `[${key}]`
        }
    }*/
    const checkComplex = (key:any) =>{
        if(key !== null){
            if(key.length!== 0 && key.charAt(0) === '[' && key.charAt(key.length-1) === ']'){
                return true
            }else{
                return false
            }
        }else{
            return false
        }

    }

const PropertyKey: FC<IPropertyKey> = (props) => {
    const classes = useStyles();
    const [errorAction,setErrorAction] = React.useState<any>([])
    const [loadingKey,setLoadingKey] = React.useState<any>(false)
    const [nComplex,setNComplex] = React.useState<number>(1)
    const [copyValue,setCopyValue] = React.useState<any>("copy")
    const [copyLeaveDelay,setCopyLeaveDelay] = React.useState<any>(1000)
    const [copyEnterDelay,setCopyEnterDelay] = React.useState<any>(0)
    let multiList:any = localStorage.getItem('multiList')?localStorage.getItem('multiList')?.split(","):[];
    const [multiLineState,setMultiLineState] = React.useState<any>(multiList.some((id:any) => id === String(props.propertyKey.keyID)))
    const [switchState,setSwitchState] = React.useState<boolean>(false)




    const addNewKey = ()=>{
        let fullName:any = handleFullName()
        let key:any = handleKeyName(props.propertyKey.key,false)
        if(fullName.length !== 0 ){
            fullName = fullName.concat(".",key)
        }else{
            fullName = key
        }
        props.handleNewPropertyKey(props.propertyKey.keyID,fullName)
    }
    const copy = async ()=>{
        let result = ''
        if(props.propertyKey.fullName.length !== 0){
            result = props.propertyKey.fullName
        }
        await navigator.clipboard.writeText(result);
        setCopyValue("copied")
        setCopyLeaveDelay(1000)
        setCopyEnterDelay(0)
        setTimeout(() => {
            setCopyValue("copy")
            setCopyLeaveDelay(0)
        }, 500);
    }
    const handlePropertyName = ()=>{
        if(!props.modeView){
            let fullName:any = props.propertyKey.fullName;
            let indexOfDotsKey:any = fullName.lastIndexOf("."+props.propertyKey.key)
            if(indexOfDotsKey !== (-1)){
                fullName = fullName.slice(0,indexOfDotsKey)
            }
            props.handlePropertyFiler(fullName)
        }

    }
    const handleFullName = ()=>{
        let result:any = ""
        let fullName:any = props.propertyKey.fullName === null ? "" : props.propertyKey.fullName;
        let indexOfDotsKey:any = fullName.lastIndexOf("."+props.propertyKey.key)
        if(indexOfDotsKey !== (-1)){
            result = fullName.slice(0,indexOfDotsKey)
            let data = isJsonString(result);
            if(data){
                let array:any = JSON.parse(result)
                result = `[${array.toString()}]`
            }

        }else{
            result = ""
        }
        return result
    }
    const handleKeyName = (key:any,isCOmplexe:any)=>{
        if(key !== null){
            let result:any = ""
            if (isCOmplexe) {
                result = `[${key}]`
            }else{
                result = key
            }
            result = result.replaceAll('"','')
            return result
        }
        else{
            return ''
        }

    }
    const handleChangeKey = (isComplexe:any,key:any) =>{
        //result = result.replace(/\\/g, "");
        let result = ""
        if(isComplexe){
            let resultKey:any = key.split(",")
            let element:any = resultKey.filter((obj:any) => obj.replace(/\s/g, "").length !== 0);
            result =  element.join(" ")

        }else{
            result = key.split(",")
            result = result.toString()
        }
        return result
    }
    const getInitialKey = ()=>{
        try{
        let result = ""
        const key:any =props.propertyKey.key;
        if(key !== null && key.length !== 0){
            let isComplexe = checkComplex(key);
            if(isComplexe){
                let array:any = JSON.parse(key)
                result = array.toString()
            }
            else{
                result = key
            }
        }
        return result
    }catch(error){
        return props.propertyKey.key
    }
    }
    const handleKeyComplexe = (key:any,isComplexe:any) =>{
        let result = []
        if(isComplexe){
            result = key.split(",")
        }
        return result
    }
    const handleFieldComplexeKey = (actionMode:any,key:any,isComplexe:any,indexName:any) =>{
        let data:any = key
        let result = []
        if(actionMode === ActionMode.CREATION_MODE){
            if(isComplexe){
                result = data.split(",")
                result.push(" ")
                return result.toString()
            }
        }else{
            if(isComplexe){
                result = data.split(",")
                delete result[indexName];
                result = result.filter((obj:any) => obj !== undefined);
                result = result.filter((obj:any) => obj.length !== 0);
                return result.toString()
            }
        }

    }
    const handleChangeFieldComplexeKey = (key:any,value:any,isComplexe:any,indexName:any) =>{
        let data:any = key
        let result = []
            if(isComplexe){
                result = data.split(",")
                result[indexName] = value;
                return result.toString()
            }

    }

    const handleMultiLine = () => {
        setSwitchState(true);
        setMultiLineState(!multiLineState);


    }

    const updateMultiLine = () => {
        multiList = localStorage.getItem('multiList')?localStorage.getItem('multiList')?.split(","):[];
        let propIndex = multiList.findIndex((id:any) => id === String(props.propertyKey.keyID))
        if(multiLineState && propIndex<0){
            multiList.push(String(props.propertyKey.keyID))
            localStorage.setItem("multiList",multiList)
        }
        if(!multiLineState && propIndex >=0) {
            multiList.splice(propIndex, 1)
            localStorage.setItem('multiList', multiList)
        }
    }


    return (
        <>
        {props.storeType === yamlProperties ?
            <Formik
                enableReinitialize={true}
                initialValues={{
                   id: props.propertyKey.keyID,
                    key: getInitialKey(),
                    fullName: props.propertyKey.fullName,
                    fullIdList: props.propertyKey.fullIdList,
                    type: props.propertyKey.type === "TECHNICAL" ? false : true,
                    status: props.propertyKey.status,
                    dirty: props.propertyKey.dirty,
                    index:props.propertyKey.index,
                    list:props.propertyKey.list,
                    isComplexe: checkComplex(props.propertyKey.key)
                }}
                validationSchema={validationPropertyYAMLSchema}
                onSubmit={(values:any  ,actions:any)=> {
                    setSwitchState(false)
                    let requestData
                    let key:string
                    let typeData = values.type ===true ? typeEnum.FUNCTIONAL: typeEnum.TECHNICAL
                    if (values.isComplexe) {
                        let array = values.key.split(",")
                        let element:any = array.filter((obj:any) => obj.replace(/\s/g, "").length !== 0);
                        for (let index = 0; index < element.length; index++) {
                            let elementIndex:any = element[index];
                            element[index] = elementIndex.trim()
                        }
                        key = JSON.stringify(element)
                    }else{
                        key = values.key
                    }
                    if(props.state === ActionMode.CREATION_MODE){
                        setLoadingKey(true)
                         requestData = {
                            key: key,
                            list: values.list,
                            parentId: props.propertyKey.parentId,
                            typeId: typeData,
                            tagId: props.selectedTag.id
                        }
                        props.handleCreate(requestData,props.state,actions,setLoadingKey,setErrorAction)
                    }else{
                        setLoadingKey(true)
                        let parent:any = props.propertyKey.fullIdList === null ? null : props.propertyKey.fullIdList[props.propertyKey.fullIdList.length]
                         requestData = {
                            id: props.propertyKey.keyID,
                            key:key,
                            typeId: typeData,
                            tagId: props.selectedTag.id,
                            "list": values.list,
                            "parentId":parent
                        };
                        props.handleUpdate(requestData,props.state,actions,setLoadingKey,setErrorAction)
                        /*if(multiLineState) {
                            multiList = localStorage.getItem('multiList')?localStorage.getItem('multiList')?.split(","):[];
                            multiList.push(props.propertyKey.keyID)
                            localStorage.setItem("multiList",multiList)
                        } else {
                            multiList = localStorage.getItem('multiList')?localStorage.getItem('multiList')?.split(","):[];

                        }*/

                        updateMultiLine()

                        if(props.updateValue) {
                            setTimeout(() => {
                                props.updateValue(null,setLoadingKey,true)
                            }, 500);
                        }
                    }
                    setErrorAction([])
                }}
            >
                {(formik) => {const {values,handleSubmit,handleBlur,errors,touched,setFieldValue,handleReset,dirty} = formik;
                    return (
                        <form onSubmit={handleSubmit} className={classes.PropertyKey_form}>
                            <div className={classes.PropertyKey_form_container}>
                                <div className={classes.PropertyKey_form_container_mainForm_row}>
                                    <Grid item xs={12} md={12} sm={12} className={classes.summary}>
                                        <Grid item xs={10} md={11} sm={11} className={classes.summary} style={{justifyContent:'flex-start'}}>
                                            <Grid item xs={6} md={8} sm={7} className={classes.summary} style={{justifyContent:'flex-start'}}>
                                                <div className={classes.PropertyKey_form_container_mainForm_row_fullName}>
                                                    <div className={classes.PropertyKey_form_container_mainForm_row_typo}>
                                                        <Typography variant="body1" style={labelField} className={classes.typographyStyle} >FullName</Typography>
                                                    </div>
                                                    {props.state === ActionMode.CREATION_MODE &&
                                                        <div className={props.modeView ? classes.PropertyKey_form_fullName_typo : classes.PropertyKey_form_fullName_typo__treeMode} onClick={handlePropertyName}>
                                                            <Typography variant="body1"  className={classes.typographyStyle} >
                                                                <span>{props.propertyKey.fullName}</span>
                                                            </Typography>
                                                        </div>
                                                    }
                                                    {props.state !== ActionMode.CREATION_MODE &&
                                                        <div className={!props.modeView ? classes.PropertyKey_form_fullName_typo : classes.PropertyKey_form_fullName_typo__treeMode} onClick={handlePropertyName}>
                                                            <Typography variant="body1"  className={classes.typographyStyle} >
                                                                <span>{props.propertyKey.fullName}</span>
                                                            </Typography>
                                                        </div>
                                                    }
                                                    {props.state !== ActionMode.CREATION_MODE &&
                                                        <div className={classes.fullName__copy}>
                                                            <Tooltip title={copyValue} arrow enterDelay={copyEnterDelay} leaveDelay={copyLeaveDelay}>
                                                                <span>
                                                                    <IconButton id={`copy_button_${props.indexProperty}`} className={classes.copy__btn}  aria-label="cancelCreation" onClick={()=>copy()} >
                                                                        <ContentCopyIcon fontSize='small'/>
                                                                    </IconButton>
                                                                </span>
                                                            </Tooltip>
                                                        </div>
                                                    }
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} md={4} sm={5} className={classes.summary} style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                                <div className={classes.PropertyKey_form_container_mainForm_row_complexKey} style={{marginRight:8}}>
                                                        <div className={classes.PropertyKey_form_container_mainForm_row_typo}>
                                                            <Typography variant="body1" style={labelField}  className={classes.typographyStyle} >Complexe Key</Typography>
                                                        </div>
                                                        <div className={classes.PropertyKey_form_container_mainForm_row_value}>
                                                        <AccessCheckbox
                                                            actionType={ActionAccessMode.WRITE_MODE}
                                                            id={`Key_isComplexe_${props.indexProperty}`}
                                                            checked={values.isComplexe}
                                                            value={values.isComplexe}
                                                            color='primary'
                                                            size='small' 
                                                            className={classes.checkbox}
                                                            handleChange={(event: any ) => {
                                                                let data = handleChangeKey(values.isComplexe,values.key)
                                                                setFieldValue('isComplexe',event.target.checked );
                                                                setFieldValue('key',data );
                                                            }}
                                                            handleBlur={handleBlur}
                                                        />
                                                        </div>
                                                </div>
                                                <div className={classes.PropertyKey_form_container_mainForm_row_list} style={{marginRight:8}}>
                                                        <div className={classes.PropertyKey_form_container_mainForm_row_typo}>
                                                            <Typography variant="body1"  className={classes.typographyStyle} style={labelField}>List</Typography>
                                                        </div>
                                                        <div className={classes.PropertyKey_form_container_mainForm_row_value} style={{margin:0}}>
                                                            <AccessCheckbox
                                                                actionType={ActionAccessMode.WRITE_MODE}
                                                                id={`Key_isList_${props.indexProperty}`}
                                                                checked={values.list}
                                                                value={values.list}
                                                                size='small' className={classes.checkbox}
                                                                name="checkedT"
                                                                handleChange={(event: any ) => {
                                                                        setFieldValue('list',event.target.checked );
                                                                    }}
                                                                handleBlur={handleBlur}
                                                            />

                                                        </div>
                                                </div>
                                                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                                    {props.state !== ActionMode.CREATION_MODE &&
                                                        <div className={classes.PropertyKey_form_container_mainForm_row_list} style={{margin:0}}>
                                                            { values.index !== null &&
                                                                <div className={classes.PropertyKey_form_container_mainForm_row_index} style={{margin:0}}>
                                                                    <div className={classes.PropertyKey_form_container_mainForm_row_typo}>
                                                                        <Typography variant="body1"  className={classes.typographyStyle} style={labelField}>Index</Typography>
                                                                    </div>
                                                                    <div className={classes.PropertyKey_form_container_mainForm_row_value}>
                                                                        {values.index !== null ? `[${values.index}]` : "-" }
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2} md={1} sm={1} className={classes.summary} style={{justifyContent:'flex-end'}}>
                                            <div className={classes.PropertyKey_form_container_action_main}>
                                                {!loadingKey ?
                                                    <div>
                                                        { (dirty || (props.state === ActionMode.CREATION_MODE) || switchState) &&
                                                            <div style={{display:"flex"}}>
                                                                <Tooltip title={"Cancel"} arrow enterDelay={0} leaveDelay={100}>
                                                                    <span>
                                                                        <IconButton style={{padding:"0px 8px"}}
                                                                                    id={`cancel_Key_${props.indexProperty}`}
                                                                                    color="secondary" aria-label="cancelCreation"
                                                                                    onClick={()=>{
                                                                                        setSwitchState(false)
                                                                                        setMultiLineState(switchState?(!multiLineState):multiLineState)
                                                                                        if(props.state === ActionMode.CREATION_MODE){
                                                                                            props.cancelCreate()
                                                                                        }else{
                                                                                            handleReset()
                                                                                        }
                                                                                    }}
                                                                        >
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                    </span>

                                                                </Tooltip>
                                                                <AccessButton 
                                                                    id={`confirm_Key_${props.indexProperty}`} 
                                                                    disabled={false}
                                                                    actionType={ActionAccessMode.WRITE_MODE} 
                                                                    style={{padding:"0px 8px"}}
                                                                    color={"primary"}
                                                                    ariaLabel={"confirmCreation"}
                                                                    iconButton={true}
                                                                    theme={theme}
                                                                    tooltip={"Confirm"}
                                                                    type="submit"
                                                                >
                                                                    <CheckIcon color="primary" aria-label="confirm_Creation" />
                                                                </AccessButton>
                                                            </div>
                                                        }
                                                    </div> :
                                                    <div className={classes.progress} style={{width:'100%',justifyContent:'flex-end'}}>
                                                        <CircularProgress disableShrink size={20}/>
                                                    </div>
                                                }
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className={classes.PropertyKey_form_container_mainForm_textField}>
                                    <div className={classes.property_key_textField}>
                                        {!values.isComplexe &&
                                            <AccessTextField
                                                fullWidth={true}
                                                id={`Key_key_${props.indexProperty}`}
                                                name="key"
                                                value={values.key}
                                                handleChange={(event: any) => {
                                                    event.preventDefault()
                                                    setFieldValue('key', event.target.value);
                                                }}
                                                size="small"
                                                label='Key'
                                                variant='outlined'
                                                className={classes.textFiledKeyList}
                                                actionType={ActionAccessMode.WRITE_MODE}
                                            />
                                        }
                                        {values.isComplexe &&
                                            handleKeyComplexe(values.key, values.isComplexe).map((rowName: any, indexName: any) => (
                                                <div
                                                    className={classes.PropertyKey_form_container_mainForm_textField_complexe}
                                                    key={indexName}>
                                                    <div
                                                        className={classes.PropertyKey_form_container_mainForm_textField_complexe_input}
                                                        style={{padding: handleKeyComplexe(values.key, values.isComplexe).length === (indexName + 1) ? "0px 0px 0px 0px" : "0px 0px 6px 0px"}}>
                                                        <AccessTextField
                                                            fullWidth={true}
                                                            id={`Key_key_${props.indexProperty}`}
                                                            name="key"
                                                            value={rowName}
                                                            handleChange={(event: any) => {
                                                                event.preventDefault()
                                                                let dataValue: any = handleChangeFieldComplexeKey(values.key, event.target.value, values.isComplexe, indexName);
                                                                setFieldValue('key', dataValue);
                                                            }}
                                                            size="small"
                                                            label='Key'
                                                            variant='outlined'
                                                            className={classes.textFiledKeyList}
                                                            actionType={ActionAccessMode.WRITE_MODE}
                                                        />
                                                    </div>
                                                    <div style={{width: 52}}>
                                                        <div
                                                            className={classes.PropertyKey_form_container_mainForm_textField_complexe_btn}>
                                                            {handleKeyComplexe(values.key, values.isComplexe).length === (indexName + 1) &&
                                                                <AccessButton
                                                                    id={`Key_key_addComplexe_${props.indexProperty}_index_${indexName}`}
                                                                    disabled={false}
                                                                    actionType={ActionAccessMode.WRITE_MODE}
                                                                    ariaLabel={"remove new key"}
                                                                    handleClick={() => {
                                                                        let dataValue: any = handleFieldComplexeKey(ActionMode.CREATION_MODE, values.key, values.isComplexe, indexName)
                                                                        setNComplex((nComplex + 1))
                                                                        setFieldValue('key', dataValue);
                                                                    }}
                                                                    style={{padding: '0px 6px'}}
                                                                    iconButton={false}
                                                                >
                                                                    <AddCircleIcon fontSize="small"/>
                                                                </AccessButton>
                                                            }
                                                            {(handleKeyComplexe(values.key, values.isComplexe).length - 1) === (indexName + 1) &&
                                                                <AccessButton
                                                                    id={`Key_key_deleteComplexe_${props.indexProperty}_index_${indexName}`}
                                                                    disabled={false}
                                                                    actionType={ActionAccessMode.WRITE_MODE}
                                                                    ariaLabel={"add new key"}
                                                                    handleClick={() => {
                                                                        let dataValue: any = handleFieldComplexeKey(ActionMode.DELETE_MODE, values.key, values.isComplexe, indexName);
                                                                        setNComplex((nComplex - 1))
                                                                        setFieldValue('key', dataValue);
                                                                    }}
                                                                    style={{padding: '0px 6px'}}
                                                                    iconButton={false}
                                                                >
                                                                    <CancelIcon fontSize="small"/>
                                                                </AccessButton>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>


                                    <div className={classes.ProportyDetails__header__tags__type} style={{margin: "0px 32px"}}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <AccessMultiLineSwitch
                                                actionType={ActionAccessMode.WRITE_MODE}
                                                id={`value_multi_line_${props.indexProperty}`}
                                                checked={multiLineState}
                                                handleChange={handleMultiLine}
                                                inputProps={{'aria-label': 'ant design'}}
                                                name="checkedMultiLine"
                                            />
                                            <Typography style={{width: 75}}>
                                                {multiLineState ? "Multi-line" : "Single-line"}
                                            </Typography>
                                        </Stack>

                                    </div>
                                    <div className={classes.PropertyKey_form_container_mainForm_row_type}>
                                        <div className={classes.PropertyKey_form_container_mainForm_row_value}>
                                            <AccessSwitch
                                                actionType={ActionAccessMode.WRITE_MODE}
                                                id={`Key_type_${props.indexProperty}`}
                                                checked={values.type}
                                                handleChange={(event: any) => {
                                                    event.preventDefault()
                                                    setErrorAction([])
                                                    setFieldValue('type', event.target.checked);
                                                }}
                                                name="checkedT"
                                                value={values.type}
                                                handleBlur={handleBlur}
                                            />
                                        </div>
                                        <div className={classes.PropertyKey_type}>
                                            <Typography variant="body1" className={classes.typographyStyle}>
                                                <span>{values.type ? ProportyType.FUNCTIONAL : ProportyType.THECHNICAL}</span>
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className={classes.PropertyKey_form_container_mainForm_row_Status_Type}>
                                        <div className={classes.PropertyKey_form_container_mainForm_row_status}>
                                            {props.propertyKey.status.length !== 0 && props.propertyKey.status === EStatus.DRAFT &&
                                                <Tooltip title={EStatus.DRAFT} arrow enterDelay={0} leaveDelay={500}>
                                                    <div style={{
                                                        display: 'flex',
                                                        marginLeft: 8,
                                                        alignItems: 'center',
                                                        height: 20
                                                    }} className={classes.icon_Status}>
                                                        <Typography>{'DRAFT'}</Typography>
                                                    </div>
                                                </Tooltip>
                                            }
                                            {props.propertyKey.status.length !== 0 && props.propertyKey.status === EStatus.ONLINE &&
                                                <Tooltip title={"PUBLISHED"} arrow enterDelay={0} leaveDelay={500}>
                                                    <div style={{display: 'flex', alignItems: 'center', height: 20}}
                                                         className={classes.icon_Status}>
                                                        <Typography>{'PUBLISHED'}</Typography>
                                                        <div style={{display: 'flex', color: 'white', marginRight: 2}}>
                                                        </div>
                                                    </div>
                                                </Tooltip>
                                            }
                                        </div>
                                    </div>

                                    <div className={classes.PropertyKey_form_container_action_addKey}
                                         style={{'width': '336px'}}>
                                        {(props.storeType === "YAML") &&
                                            <>
                                                {(!dirty) &&
                                                    <AccessButton
                                                        id={`add_new_Key_${props.indexProperty}`}
                                                        disabled={false}
                                                        actionType={ActionAccessMode.WRITE_MODE}
                                                        className={classes.btn_AddKey}
                                                        style={{
                                                            height: 'auto',
                                                            padding: '0px 8px',
                                                            paddingTop: 0,
                                                            paddingBottom: 0
                                                        }}
                                                        color={"primary"}
                                                        ariaLabel={"confirmCreation"}
                                                        handleClick={addNewKey}
                                                        iconButton={false}
                                                        theme={theme}
                                                        tooltip={"Delete Context"}
                                                    >
                                                        <Icon style={{color: green[500]}}>add_circle</Icon>
                                                        Add New Key
                                                    </AccessButton>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={classes.PropertyKey_form_alert}>
                                {errors.key && touched.key && (errorAction.length !== null) && (
                                    <Alert severity="error" style={{width: '100%'}} className={classes.alert}>
                                        {errors.key.toString()}
                                    </Alert>
                                )}
                                {(errorAction.length !== null) &&
                                    errorAction.map((row: any, index: any) =>
                                        (<Alert severity="error" style={{width: '100%'}} key={index}
                                                className={classes.alert}>
                                                {row}
                                            </Alert>
                                        )
                                    )}
                            </div>
                        </form>
                    )
                }}
            </Formik>
            :
            <Formik
                enableReinitialize={true}
                initialValues={{
                    key: props.propertyKey.key,
                    type: props.propertyKey.type === "TECHNICAL" ? false : true
                }}
                validationSchema={validationPropertyYAMLSchema}
                onSubmit={(values ,actions)=> {
                    setSwitchState(false)
                    let RequestDta
                    let typeData = values.type ===true ? typeEnum.FUNCTIONAL: typeEnum.TECHNICAL
                    if(props.state === ActionMode.CREATION_MODE){
                        setLoadingKey(true)
                        RequestDta = {
                            key: values.key,
                            typeId: typeData,
                            tagId: props.selectedTag.id,
                        };
                        props.handleCreate(RequestDta,props.state,actions,setLoadingKey,setErrorAction)
                    }else{
                        setLoadingKey(true)
                        updateMultiLine()
                        RequestDta = {
                            id: props.propertyKey.keyID,
                            key: values.key,
                            typeId: typeData,
                            tagId: props.selectedTag.id,
                            "list": false,
                            "parentId":null
                        };

                        props.handleUpdate(RequestDta,props.state,actions,setLoadingKey,setErrorAction)

                    }
                }}
            >
            {(formik) => {const {values,handleSubmit,handleBlur,errors,touched,setFieldValue,handleReset,dirty} = formik;
                return (
                    <form onSubmit={handleSubmit} className={classes.ProportyDetails__header__form}>
                        <Grid className={classes.ProportyDetails__header__container} style={{padding:8}}>
                            <Grid item xs={11} md={11} sm={11} style={{padding:"14px 0px"}}>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <Grid item xs={6} md={8} sm={6}>
                                        <div className={classes.ProportyDetails__header__TextFieldName}>
                                            <AccessTextField
                                                fullWidth={true}
                                                id={`Key_key_${props.indexProperty}`}
                                                name="key"
                                                value={values.key}
                                                handleChange={(event: any ) => {
                                                    setErrorAction([])
                                                    setFieldValue('key',event.target.value );
                                                }}
                                                size="small"
                                                label='Key'
                                                variant='outlined'
                                                className={classes.hover }
                                                actionType={ ActionAccessMode.WRITE_MODE }
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} md={4} sm={6} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '100%',
                                        justifyContent: "space-around"
                                    }}>
                                        <div className={classes.ProportyDetails__header__tags__type}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <AccessMultiLineSwitch
                                                    actionType={ActionAccessMode.WRITE_MODE}
                                                    id={`value_multi_line_${props.indexProperty}`}
                                                    checked={multiLineState}
                                                    handleChange={handleMultiLine}
                                                    inputProps={{'aria-label': 'ant design'}}
                                                    name="checkedMultiLine"
                                                />
                                                <Typography style={{width:75}}>
                                                    {multiLineState ? "Multi-line" : "Single-line"}
                                                </Typography>
                                            </Stack>

                                        </div>
                                        <div className={classes.ProportyDetails__header__tags__type}>
                                            <AccessSwitch
                                                actionType={ActionAccessMode.WRITE_MODE}
                                                id={`Key_type_${props.indexProperty}`}
                                                checked={values.type}
                                                handleChange={(event: any) => {
                                                    event.preventDefault()
                                                    setErrorAction([])
                                                    setFieldValue('type', event.target.checked);
                                                }}
                                                name="checkedT"
                                                value={values.type}
                                                handleBlur={handleBlur}
                                            />
                                            <Typography variant="body1" className={classes.typographyStyle}>
                                                <span>{values.type ? ProportyType.FUNCTIONAL : ProportyType.THECHNICAL}</span>
                                            </Typography>
                                        </div>
                                        <div className={classes.ProportyDetails__header__status__container}>

                                            <div className={classes.PropertyKey_form_container_mainForm_row_status}>
                                                {props.propertyKey.status.length !== 0 && props.propertyKey.status === EStatus.DRAFT &&
                                                    <Tooltip title={EStatus.DRAFT} arrow enterDelay={0}
                                                             leaveDelay={500}>
                                                        <div style={{
                                                            display: 'flex',
                                                            marginLeft: 8,
                                                            alignItems: 'center',
                                                            height: 20
                                                        }} className={classes.icon_Status}>
                                                            <Typography>{'DRAFT'}</Typography>
                                                        </div>
                                                    </Tooltip>
                                                }
                                                {props.propertyKey.status.length !== 0 && props.propertyKey.status === EStatus.ONLINE &&
                                                    <Tooltip title={"PUBLISHED"} arrow enterDelay={0} leaveDelay={500}>
                                                        <div style={{
                                                            display: 'flex',
                                                            marginLeft: 8,
                                                            alignItems: 'center',
                                                            height: 20
                                                        }} className={classes.icon_Status}>
                                                            <Typography>{'PUBLISHED'}</Typography>
                                                            <div style={{
                                                                display: 'flex',
                                                                color: 'white',
                                                                marginRight: 2
                                                            }}>
                                                            </div>
                                                        </div>
                                                    </Tooltip>
                                                }
                                            </div>
                                        </div>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={1} md={1} sm={1}>
                                <div className={classes.ProportyDetails__header__action}>
                                    <div>
                                        {!loadingKey ?
                                            <div style={{display: "flex"}}>
                                                {(dirty || (props.state === ActionMode.CREATION_MODE) || switchState) &&
                                                    <>
                                                        <Tooltip title={"Cancel"} arrow enterDelay={0} leaveDelay={100}>
                                                            <span>
                                                                <IconButton color="secondary"
                                                                            aria-label="cancelCreation"
                                                                            id={`cancel_Key_${props.indexProperty}`}
                                                                            onClick={() => {
                                                                                setSwitchState(false)
                                                                                setMultiLineState(switchState?(!multiLineState):multiLineState)
                                                                                if (props.state === ActionMode.CREATION_MODE) {
                                                                                    props.cancelCreate()
                                                                                } else {
                                                                                    handleReset()
                                                                                }
                                                                            }}
                                                                >
                                                                <CloseIcon />
                                                            </IconButton>
                                                            </span>

                                                        </Tooltip>
                                                        <AccessButton 
                                                            id={`confirm_Key_${props.indexProperty}`} 
                                                            disabled={false}
                                                            actionType={ActionAccessMode.WRITE_MODE} 
                                                            style={{padding:0}}
                                                            color={"primary"}
                                                            ariaLabel={"confirmCreation"}
                                                            iconButton={true}
                                                            theme={theme}
                                                            tooltip={"Delete Context"}
                                                            type="submit"
                                                        >
                                                            <CheckIcon />
                                                        </AccessButton>
                                                    </>
                                                }
                                            </div>
                                            :
                                            <div className={classes.progress}>
                                                <CircularProgress disableShrink size={24}/>
                                            </div>
                                        }

                                    </div>
                                </div>
                            </Grid >
                        </Grid>
                        <Grid item xs={12} md={12} sm={12}>
                            {errors.key && touched.key && (errorAction.length !== null) &&(
                                <Alert severity="error" className={classes.alert}>
                                    {errors.key.toString()}
                                </Alert>
                            )}
                            {(errorAction.length !== null) &&
                                errorAction.map((row:any,index:any)=>
                                    (<Alert severity="error" key={index} className={classes.alert}>
                                        {row}
                                    </Alert>)
                                )
                            }

                            </Grid>
                        </form>
                        );}}
            </Formik>
        }


        </>

    );
};

export default PropertyKey;