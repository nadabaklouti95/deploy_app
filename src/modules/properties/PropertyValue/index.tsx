import * as React from 'react';
import useStyles from './styles';

import ConfirmPopup from 'shared/components/ConfirmPopup';
import { ActionAccessMode, ActionMode } from 'shared/constants/AppEnums';
import { PropertyValueProps } from 'types/models/interface';

import { Formik } from 'formik';
import * as Yup from "yup";
import AccessCheckbox from 'shared/components/AccessCheckbox';
import {CircularProgress, Grid, IconButton, createTheme} from '@material-ui/core';
import { Box, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Tooltip } from '@mui/material';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { Alert } from '@material-ui/lab';
import { handleContextPriority } from 'shared/services/contextService';
import AccessButton from 'shared/components/AccessButton';
import { themeDeleteButton } from 'shared/constants/AppConst';
import AccessTextField from 'shared/components/AccessTextField';
import AccessSelect from 'shared/components/AccessSelect';
import { green } from '@material-ui/core/colors';
import { maxMultiLine } from 'shared/constants/MaxLength';
//import {labelField} from "../../../shared/constants/AppCssCons";


//import YAML from 'yaml'
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps:any = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 200,
        },
    },
};

const theme = createTheme({ palette: { primary: green}});

const validationCreationPropertySchema = Yup.object().shape({
    value: Yup.string().required('Value is required'),
    context: Yup.array().of(
      Yup.object().shape({
        key: Yup.string().required(),
        values: Yup.array()
          .min(1, 'At least one value is required')
          .required('context is required')
      })
    ).min(1, 'At least one context element is required'),
  });
let submitAction:any = undefined;
let resetFormik:any = undefined





const getContextFormik = (listContext:any,formikContext:any) => {
    let data:any = []
    listContext.forEach((element:any)=>{
        let search:any = formikContext.find((elementSearch:any)=> elementSearch.key === element.name)
        if(search === undefined){
            data.push({
                "key":element.name,
                "values": []
            })
        }
        else{
            data.push(search)
        }
    })
    return data
}

const getContextByName = (actionMode:any,elementValue:any,listContext:any,contextList:any,propertyContext:any) => {
    let name:any = actionMode === ActionMode.CREATION_MODE ? elementValue.name : elementValue.key
    let elementFound:any = contextList.find((obj:any)=> obj.name === name)
    try {
        if(elementFound === undefined){
            let propertyContextFound = propertyContext.find((obj:any)=> obj.key === name)

            return propertyContextFound.values
        }else{
            let findElement:any = listContext.find((element:any)=> element.key === name)
            if( findElement === undefined ){
                return []
            }else{
                return findElement.values
            }
        }
    } catch (error) {
        return []
    }

}

const checkContextSelected = (actionMode:any,elementValue:any,contextList:any) => {
    let result = false;
    let name:any = actionMode === ActionMode.CREATION_MODE ? elementValue.name : elementValue.key
    let elementFound:any = contextList.find((obj:any)=> obj.name === name)
    if(elementFound === undefined){
        result = true
    }
    return result
}

const handleContext = (actionMode:any,value:any,elementValue:any,listData:any)=>{
    let name:any = actionMode === ActionMode.CREATION_MODE ? elementValue.name : elementValue.key
    let index = listData.findIndex((element:any)=>element.key === name )
    if(listData[index].values.length === 0){
        listData[index].values =  [...listData[index].values,...value]
        return listData
    }else{
        let result:any
        if(index !== (-1)){
            if(value.length === 0){
                result = []
            }else{
                let indexAll = value.findIndex((element:any)=> element === "ALL")
                let indexINitial = listData[index].values.findIndex((element:any)=>element === "ALL")
                let lengthInit = listData[index].values.length
                let lengthSelect = value.length
                if((indexAll === (-1))&&(indexINitial === (-1))){
                    result = value
                }
                if((indexAll !== (-1))&&(indexINitial === (-1))){
                    result = ["ALL"]
                }
                if((indexAll !== (-1))&&(indexINitial !== (-1)) &&(lengthSelect>lengthInit)){
                    result = value.filter((element:any)=> element !== 'ALL')
                }
            }


            listData[index].values = result
            return listData
        }
    }

}

const PropertyValue : React.FC<PropertyValueProps>= (props) => {
    const classes = useStyles();
    const [openConfirmdialog, setOpenDialog] = React.useState(false);
    const [headerConfirmPopup,setHeaderPopup]= React.useState<string>("");
    const [contentConfirmPopup,setContentPopup] = React.useState<string>("");
    const [resetState,setResetState] = React.useState<boolean>(false)
    const [selectState,setSelectState]= React.useState(false)
    const [loadingValue,setLoadingValue] = React.useState<any>({state:null,id:null})
    const [errorAction,setErrorAction] = React.useState<any>([])
    const [contextState,setContextState] = React.useState<boolean>(false)
    const multiList:any = localStorage.getItem('multiList')?localStorage.getItem('multiList')?.split(","):[];
    const multiLine = multiList.some((id:any) => id === String(props.KeyId))

    const truncateName  = (name: any) => name?.length > 19 ? `${name.slice(0, 19)}...` : name;


    let colors = ["#bad8f3", "#f5d5ce", "#cef5e5"];
    for (var i = 0; i < 100; i++) {
        colors.push("#bad8f3", "#f5d5ce", "#cef5e5");
    }
    const handleOpenConfirmPopup = () => {
        if(props.actionMode === ActionMode.CREATION_MODE){
            props.actionMode = ActionMode.EDIT_MODE
        }else{
            setHeaderPopup("Delete Property Value")
            setContentPopup("Are you sure u want to delete this value")
            setOpenDialog(true);
        }

    };
    const handleCloseConfirmPopup = () => {
        setOpenDialog(false);
    };
    const DeletePrporty = ()=>{
        props.deletePropertyValue(props.value.id,props.KeyId,setLoadingValue)
        props.updateActionMode()
        if(props.updateValue) {
            setTimeout(() => {
                props.updateValue(true)

            }, 1000);
        }
    };
    const getContextValue = (actionMode:any,elementValue:any)=>{
        let name:any = actionMode === ActionMode.CREATION_MODE ? elementValue.name : elementValue.key
        let result:any = []

        let mainElement:any = props.context.find((obj:any) => obj.name === name)
        if(mainElement !== undefined){
            result.push({value:"ALL",id:0,color:"#e57373"})
            result = [{value:"ALL",id:0,color:"#e57373"},...mainElement.values]
        }
        return result

    }



    let colorsEvent = (actionMode:any,value:any,elementValue:any)=>{
        let name:any = actionMode === ActionMode.CREATION_MODE ? elementValue.name : elementValue.key
        if(value === 'ALL' ){
            return "#e57373"
        }else{
            let result:any = props.context.find((obj:any) => obj.name === name);
            if(result === undefined ){
                return "#e0e0e0"
            }else{
                let resultColor:any = result.values.find((elementColor:any)=> elementColor.value === value )
                if(resultColor === undefined ){
                    return "#cef5e5"
                }else{
                    return resultColor.color
                }
            }
        }
    }


    const contextElement = () => {
        if(props.actionMode === ActionMode.CREATION_MODE){
            return props.context
        }else{
            let contextList:any = handleContextPriority(props.context,props.value.context)
            return contextList
        }
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                value: props.value.value,
                keyId: props.value.id,
                context:JSON.parse(JSON.stringify(getContextFormik(props.context,props.value.context)))
            }}
            validationSchema={validationCreationPropertySchema}
            onSubmit={(values, { resetForm }) => {

                if (submitAction === 'reset') {
                    resetFormik()
                    setResetState(!resetState)
                    setSelectState(!selectState)
                }
                if (submitAction === 'submit') {
                    let scopeData:any = values.context.filter((element:any)=> element.values.length !== 0)

                    const mapContext = new Map();
                    for (let index = 0; index < scopeData.length; index++) {
                        const element = scopeData[index];
                        let contextIndex:any = props.context.findIndex((obj:any)=> obj.name === element.key);
                        let keyId =  props.context[contextIndex].id
                        let valueIds:any = []
                        element.values.forEach((elementValues:any) => {
                            if(elementValues === "ALL"){
                                valueIds = [0]
                            }else{
                                let foundValues:any = props.context[contextIndex].values.find((obj:any)=> obj.value === elementValues)
                                valueIds.push(foundValues.id)
                            }
                        });
                        mapContext.set(keyId,valueIds)
                    }
                    let RequestDta:any
                    if(props.actionMode === ActionMode.CREATION_MODE){
                        RequestDta = {
                            value: values.value,
                            keyId: props.KeyId,
                            context:Object.fromEntries(mapContext)
                        };
                        props.handleAction(setContextState,RequestDta,props.actionMode,setLoadingValue,setSelectState,setErrorAction,resetForm)

                        props.updateActionMode()
                        if(props.updateValue) {
                            setTimeout(() => {
                                props.updateValue()
                            }, 500);
                        }
                    }
                    else{
                        RequestDta = {
                            id:props.value.id,
                            value: values.value,
                            keyId: props.KeyId,
                            context:Object.fromEntries(mapContext)
                        };
                        props.handleAction(setContextState,RequestDta,props.actionMode,setLoadingValue,setSelectState,setErrorAction);

                        props.updateActionMode()
                        if(props.updateValue) {
                            setTimeout(() => {
                                props.updateValue(true)
                            }, 500);
                        }
                    }
                }
            }}
        >
            {(formik) => {const {values , handleSubmit,handleBlur,setFieldValue,errors,touched,handleReset,dirty} = formik;
                return (
                    <form onSubmit={handleSubmit}>
                        <div className={classes.proportyValue}>
                            <Grid container spacing={0}>
                                <Grid item xs={11} md={11} sm={11}>
                                    {props.actionMode !== ActionMode.CREATION_MODE ?
                                        <div className={classes.contextElementList}>
                                            {contextElement().map((elementContext: any, index: any) => (
                                                <div  className={classes.contextElement}
                                                     onClick={() => {
                                                         setContextState(true)
                                                     }}
                                                >
                                                    {contextState ?
                                                        <div key={index} className={classes.proportyValue__SelectMultiple}>
                                                            <FormControl className={classes.FormControl} size="small">
                                                                <InputLabel className={classes.InputLabel} id='demo-multiple-checkbox-label'>{props.actionMode === ActionMode.CREATION_MODE ? elementContext.name : elementContext.key}</InputLabel>
                                                                <AccessSelect
                                                                    actionType={ActionAccessMode.WRITE_MODE}
                                                                    disabled={checkContextSelected(props.actionMode, elementContext, props.context)}
                                                                    className={classes.root}
                                                                    labelId='demo-multiple-checkbox-label'
                                                                    id={`select_context_${props.indexProperty}_priority_${index}`}
                                                                    multiple
                                                                    value={getContextByName(props.actionMode, elementContext, values.context, props.context, props.value.context)}
                                                                    handleChange={(event: any) => {
                                                                        let result = handleContext(props.actionMode, event.target.value, elementContext, JSON.parse(JSON.stringify(values.context)))
                                                                        setFieldValue('context', result)
                                                                        setErrorAction([])
                                                                        setSelectState(true)
                                                                    }}
                                                                    input={<OutlinedInput
                                                                        id={`select_input_${props.value.id}_priority_${index}`}
                                                                        label='Tag'/>}
                                                                    renderValue={(selected: any) => (
                                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.4}}>
                                                                            {selected.map((element: any, index: any) => (
                                                                                <Chip id={`chips_${props.indexProperty}_priority_${index}`}
                                                                                    className={classes.chips}
                                                                                    style={{backgroundColor: colorsEvent(props.actionMode, element, elementContext)}}
                                                                                    key={element} label={element}/>
                                                                            ))}
                                                                        </Box>
                                                                    )}
                                                                    MenuProps={MenuProps}
                                                                    children={getContextValue(props.actionMode, elementContext).map((element: any, i: any) => (
                                                                        <MenuItem
                                                                            id={`menu_Item_${props.indexProperty}_priority_${index}_index_${i}`}
                                                                            key={element.id} value={element.value}>
                                                                            <AccessCheckbox
                                                                                actionType={ActionAccessMode.WRITE_MODE}
                                                                                id={`checkBox_${props.indexProperty}_priority_${index}_index_${i}`}
                                                                                checked={getContextByName(props.actionMode, elementContext, JSON.parse(JSON.stringify(values.context)), props.context, props.value.context).find((obj: any) => obj === element.value) === undefined ? false : true}
                                                                            />
                                                                            {element.value.length>11?
                                                                                <Tooltip title={element.value} arrow enterDelay={0} key={`tooltip${element.id}_index_${i}`}>
                                                                                    <ListItemText id={`listItem_${props.indexProperty}_priority_${index}_index_${i}`} primary={`${element.value.slice(0, 11)}...`} />
                                                                                </Tooltip>
                                                                                :
                                                                                <ListItemText id={`listItem_${props.indexProperty}_priority_${index}_index_${i}`} primary={element.value} />

                                                                            }
                                                                        </MenuItem>
                                                                    ))
                                                                    }
                                                                />
                                                            </FormControl>
                                                        </div>
                                                        :
                                                        <div className={classes.contextContainer} style={{marginRight:30}}> {/*style={{flexWrap:(elementContext.name?.length>15 ||elementContext.key?.length>15)? "wrap":"nowrap"}}*/}
                                                            <p className={classes.contextName}>
                                                                {props.actionMode === ActionMode.CREATION_MODE ? truncateName(elementContext.name) : truncateName(elementContext.key)} :
                                                            </p>
                                                            <p className={classes.contextValues}>
                                                                {elementContext.values.map((element: any, index: any) => (
                                                                <> {index !== 0 && <span style={{marginRight:8}}>,</span>} {truncateName(element)}</>))}
                                                            </p>
                                                        </div>
                                                    }
                                                </div>
                                            ))
                                            }
                                        </div>
                                        :
                                        <div className={classes.proportyValue__SelectMultiple__container}>
                                            {contextElement().map((elementContext: any, index: any) => (
                                                <div key={index} className={classes.proportyValue__SelectMultiple}>
                                                    <FormControl className={classes.FormControl} size="small">
                                                        <InputLabel className={classes.InputLabel}
                                                                    id='demo-multiple-checkbox-label'>{props.actionMode === ActionMode.CREATION_MODE ? elementContext.name : elementContext.key}</InputLabel>
                                                        <AccessSelect
                                                            actionType={ActionAccessMode.WRITE_MODE}
                                                            disabled={checkContextSelected(props.actionMode, elementContext, props.context)}
                                                            className={classes.root}
                                                            labelId='demo-multiple-checkbox-label'
                                                            id={`select_context_${props.indexProperty}_priority_${index}`}
                                                            multiple
                                                            value={getContextByName(props.actionMode, elementContext, values.context, props.context, props.value.context)}
                                                            handleChange={(event: any) => {
                                                                let result = handleContext(props.actionMode, event.target.value, elementContext, JSON.parse(JSON.stringify(values.context)))
                                                                setFieldValue('context', result)
                                                                setErrorAction([])
                                                                setSelectState(true)
                                                            }}
                                                            input={<OutlinedInput
                                                                id={`select_input_${props.value.id}_priority_${index}`}
                                                                label='Tag'/>}
                                                            renderValue={(selected: any) => (
                                                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.4}}>
                                                                    {selected.map((element: any, index: any) => (
                                                                        <Chip
                                                                            id={`chips_${props.indexProperty}_priority_${index}`}
                                                                            className={classes.chips}
                                                                            style={{backgroundColor: colorsEvent(props.actionMode, element, elementContext)}}
                                                                            key={element} label={element}/>
                                                                    ))}
                                                                </Box>
                                                            )}
                                                            MenuProps={MenuProps}
                                                            children={getContextValue(props.actionMode, elementContext).map((element: any, i: any) => (
                                                                <MenuItem
                                                                    id={`menu_Item_${props.indexProperty}_priority_${index}_index_${i}`}
                                                                    key={element.id} value={element.value}>
                                                                    <AccessCheckbox
                                                                        actionType={ActionAccessMode.WRITE_MODE}
                                                                        id={`checkBox_${props.indexProperty}_priority_${index}_index_${i}`}
                                                                        checked={getContextByName(props.actionMode, elementContext, JSON.parse(JSON.stringify(values.context)), props.context, props.value.context).find((obj: any) => obj === element.value) === undefined ? false : true}
                                                                    />
                                                                    {element.value.length>11?
                                                                        <Tooltip title={element.value} arrow enterDelay={0} key={`tooltip${element.id}_index_${i}`}>
                                                                            <ListItemText id={`listItem_${props.indexProperty}_priority_${index}_index_${i}`} primary={`${element.value.slice(0, 11)}...`} />
                                                                        </Tooltip>
                                                                        :
                                                                        <ListItemText id={`listItem_${props.indexProperty}_priority_${index}_index_${i}`} primary={element.value} />

                                                                    }
                                                                </MenuItem>
                                                            ))
                                                            }
                                                        />
                                                    </FormControl>
                                                </div>
                                            ))
                                            }
                                        </div>
                                    }


                                </Grid>
                                <Grid item xs={1} md={1} sm={1}>
                                    <div className={classes.propertyValue__actions}>
                                        {loadingValue.state === null ?
                                            <>
                                            {!dirty && (props.actionMode !== ActionMode.CREATION_MODE) && !contextState ?
                                                    <AccessButton
                                                        id={`delete_value_${props.indexValue}`}
                                                        disabled={props.value.readOnly || props.headerMode === ActionMode.CREATION_MODE ? true : false}
                                                        actionType={ActionAccessMode.WRITE_MODE}
                                                        style={{padding: 8}}
                                                        ariaLabel={"delete value"}
                                                        handleClick={handleOpenConfirmPopup}
                                                        iconButton={true}
                                                        theme={themeDeleteButton}
                                                        tooltip={"Delete Value"}
                                                    >
                                                        <HighlightOffIcon color="secondary"/>
                                                    </AccessButton> :
                                                    <>
                                                        <Tooltip title={"Cancel"} arrow enterDelay={0} leaveDelay={100}>
                                                                <span>
                                                                    <IconButton
                                                                        id={`cancel_value_${props.indexProperty}`}
                                                                        color="secondary"
                                                                        aria-label="cancelCreation"
                                                                        onClick={() => {
                                                                            if (props.actionMode === ActionMode.CREATION_MODE) {
                                                                                props.cancelCreation()
                                                                            } else {
                                                                                submitAction = 'reset';
                                                                                resetFormik = () => handleReset()
                                                                                formik.submitForm();
                                                                                setContextState(false)
                                                                                setErrorAction([])
                                                                            }

                                                                        }}

                                                                        disabled={props.headerMode === ActionMode.CREATION_MODE ? true : false}>
                                                                    <CloseIcon/>
                                                                </IconButton>
                                                                </span>

                                                        </Tooltip>
                                                        <AccessButton
                                                            id={`confirm_value_${props.indexProperty}`}
                                                            disabled={props.headerMode === ActionMode.CREATION_MODE ? true : false}
                                                            actionType={ActionAccessMode.WRITE_MODE}
                                                            style={{padding: "8px"}}
                                                            color="primary"
                                                            ariaLabel={"confirmCreation"}
                                                            handleClick={() => {
                                                                submitAction = 'submit';
                                                                formik.submitForm();
                                                            }}
                                                            iconButton={true}
                                                            theme={theme}
                                                            tooltip={"Confirm"}
                                                        >
                                                            <CheckIcon/>
                                                        </AccessButton>
                                                    </>
                                                }
                                            </> :
                                            <>
                                                {loadingValue.state === true &&
                                                    <div className={classes.progress}>
                                                        <CircularProgress disableShrink size={24}/>
                                                    </div>
                                                }
                                            </>

                                        }
                                    </div>
                                </Grid>
                                <div id={`value-${props.indexProperty}`} key={`value-${props.indexProperty}`} className={classes.propertyValue__property__values}>
                                    <Grid item xs={12} md={12} sm={12}>
                                        <div key={`value-${props.indexProperty}`} className={classes.propertyValue__value}>
                                            <AccessTextField
                                                key={`value_${props.indexProperty}`}
                                                fullWidth={true}
                                                multiline={multiLine}
                                                minRows={multiLine?maxMultiLine:1}
                                                maxRows={multiLine?maxMultiLine:1}
                                                id={`value_${props.value.id}`}
                                                value={multiLine?values.value:(values.value).replace(/\n/g, ' ')}
                                                handleChange={(event: { target: any })=>{
                                                    setFieldValue('value',event.target.value)
                                                    setErrorAction([])
                                                    setSelectState(true)
                                                }}
                                                handleBlur={handleBlur}
                                                label='Value'
                                                variant='outlined'
                                                className={props.storeType === "YAML" ? classes.proportyValue__values_TextField__Yaml : classes.proportyValue__values_TextField}
                                                actionType={ ActionAccessMode.WRITE_MODE }
                                                disabled={props.value.readOnly || props.headerMode === ActionMode.CREATION_MODE}
                                            />

                                        </div>
                                    </Grid>


                                    <Grid item xs={10} md={10} sm={10} style={{marginLeft:8}}>
                                        {errors.value&& touched.value &&(
                                            <Alert severity="error" className={classes.alert}>
                                                {errors.value.toString()}
                                            </Alert>
                                        )}
                                        {errors.context && touched.context && values.context.map((contextItem:any, index:any) => (
                                            <div key={`context-error-${index}`}>
                                                {contextItem.values.length === 0 && (
                                                    <Alert severity="error" className={classes.alert}>
                                                        {`context ${contextItem.key} is required`}
                                                    </Alert>
                                                )}
                                            </div>
                                        ))}

                                        {(errorAction.length !== 0) &&(
                                            errorAction.map((row:any,index:any)=>(
                                                <Alert severity="error" key={index} className={classes.alert}>
                                                    {row}
                                                </Alert>
                                            ))

                                        )}

                                    </Grid>
                                </div>
                            </Grid>
                            <ConfirmPopup opendialog={openConfirmdialog} headerContent={headerConfirmPopup} contentMessage={contentConfirmPopup} handleClose={handleCloseConfirmPopup} popupMainAction={DeletePrporty} handleAccordion={()=>{}}/>
                        </div>
                    </form>
                )
            }}
        </Formik>
    );
}

export default PropertyValue
