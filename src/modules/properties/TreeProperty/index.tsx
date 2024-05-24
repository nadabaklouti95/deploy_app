import * as React from 'react';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import Typography from '@mui/material/Typography';
import { ITreeProperty } from 'types/models/interface';
import useStyles from './styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PropertyDetails from '../PropertyDetails';
import { ActionMode } from 'shared/constants/AppEnums';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getPropertyTree } from 'redux/actions/service';
import ConfirmPopup from 'shared/components/ConfirmPopup';
import {useState} from 'react';
import { green } from '@material-ui/core/colors';
import {CircularProgress, IconButton, Tab} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import PropertyAudit from '../PropertyAudit';
import { getPropertyAudit } from 'shared/services/auditService';
import SyncProblemIcon from '@mui/icons-material/SyncProblem';
import SyncIcon from "@mui/icons-material/Sync";
import { useTreeItem} from '@mui/x-tree-view/TreeItem';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { Tooltip } from '@mui/material';

function fetchChildNodes(tagId:any,requestData:any, parentId?:any) {
    if(parentId){
        requestData.parentId=parentId
    }
    return new Promise(async (resolve:any) => {
        let data:any = await getPropertyTree(tagId,requestData).then((response:any)=>{
            return response

        }).catch(function (error) {
            console.log(error)
        })
        resolve({
            children:
            data

        });
    });
}


const CustomContent = React.forwardRef(function CustomContent(props:any, ref:any) {
    const [loading ,setLoading] = React.useState<any>(false)
    const classeStyles = useStyles();
    const [expandState,setExpandState] = React.useState<any>(false)
    const {handleExpansion,handleSelection,preventSelection} = useTreeItem(props.nodeId);
    const icon = props.iconProp || props.expansionIcon || props.displayIcon;
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [headerDialog,setHeaderDialog]= useState<string>("");
    const [contentDialog,setContentDialog] = useState<string>("");
    const [value, setValue] = useState('1');
    const [expandPropertyState,setExpandPropertyState] = React.useState<any>(false)
    const [propertyAudit,setPropertyAudit] = useState<any>(null)
    const [loadingAdd,setLoadingAdd] = React.useState<any>(false)
    const [headerPublishDialog,setHeaderPublishDialog]= useState<string>("");
    const [contentPublishDialog,setContentPublishDialog] = useState<string>("");
    const [openPublishDialog, setOpenPublishDialog] = useState(false);
    const [selectedPropety, setSelectedPropety] = useState<any>(null)
    const [propertyTree, setPropertyTree] = useState<any>(null)
    const [propertyValue, setPrpertyValue] = useState<any>(props.property)
    const [propertyValueState, setPropertyValueState] = useState<any>(null)
    const [propertyKey, setPropertyKey] = useState<any>(null)



    const parentList = props.property.csPropertyKeyViewDTO.fullIdList;


    const getValues = () => {
        let result = {link:false,value:''}
        if(props.property.csPropertyKeyViewDTO.contextKeys.length === 1){
            result = {link:false,value:props.property.csPropertyKeyViewDTO.contextKeys[0].value}
        }else{
            result = {link:true,value:'Show all values'}
        }
        return result
    }

    const handleChange = (event:any, newValue:any) => {
        if(newValue === "2"){
            getPropertyAudit(props.property.csPropertyKeyViewDTO.keyID).then((items:any)=>{
                setPropertyAudit(items)
            })
        }
        setValue(newValue);
    };
    const handleOpenConfirmPopup = () => {
        setHeaderDialog("Delete Property")
        setContentDialog("Are u sure u want to delete")
        setOpenConfirmDialog(true);
    };
    const handleCloseConfirmPopup = () => {
        handleOpenConfirmPopup()
        setOpenConfirmDialog(false);
    };
    const deleteAccordion = ()=>{
    }
    let requestJson :any = props.requestData
    requestJson.parentId = props.nodeId
    requestJson.parentFullIdList = props.property.csPropertyKeyViewDTO.fullIdList
    const handleMouseDown = (event:any) => {
        preventSelection(event);
    };
    const handleExpansionClick = (event:any) => {

        if(props.property.numberOfChild !== 0 && props.property.numberOfChild !== null){
            if(!expandState){
                setLoading(true)
                fetchChildNodes(props.selectedTag.id,requestJson).then((result:any) => {
                        props.onClick(
                            <>
                                {result.children.length !== 0 &&
                                    result.children.map((node:any,indexChildren:any) =>
                                        <TreeProperty
                                            key={"tree_property_"+indexChildren}
                                            id={node.csPropertyKeyViewDTO.keyID}
                                            name={node.csPropertyKeyViewDTO.key}
                                            property={node}
                                            storeType={props.storeType}
                                            handleKey={props.handleKey}
                                            handleValue={props.handleValue}
                                            deleteKey={props.deleteKey}
                                            deleteValue={props.deleteValue}
                                            ContextData={props.ContextData}
                                            changeStatusValue={props.changeStatusValue}
                                            cancelKey={props.cancelKey}
                                            stateValue={props.stateValue}
                                            selectedTag={props.selectedTag}
                                            handleNewPropertyKey={props.handleNewPropertyKey}
                                            handlePropertyFiler={props.handlePropertyFiler}
                                            requestData={props.requestData}
                                            indexElement={`child_${indexChildren}`}
                                            publishProperty={props.publishProperty}
                                            publishResponse={props.publishResponse}
                                            addValueState={props.addValueState}
                                        />
                                    )
                                }
                            </>
                        )
                        setLoading(false)

                    }

                ).catch((err:any) =>{
                    setLoading(false)
                });
                setExpandState(!expandState)

            }if(expandState){
                setExpandState(!expandState)
            }
            handleExpansion(event);
        }

    };
    const handleSelectionClick = (event:any) => {
        handleSelection(event);
        expandProperty();

    };
    const handleFullName = ()=>{
        let result:any = ""
        let fullName:any = props.property.fullName === null ? "" : props.property.csPropertyKeyViewDTO.fullName;
        if(fullName === null){
            result = null
        }else{
            let indexOfDotsKey:any = fullName.lastIndexOf("."+props.property.csPropertyKeyViewDTO.key)
            if(indexOfDotsKey !== (-1)){
                result = fullName.slice(0,indexOfDotsKey)
            }else{
                result = ""
            }
            result = result.replaceAll('"','')
        }

        return result
    }
    const handleKeyName = (key:any)=>{
        if(key !== null){
            let result:any = ""
            if (Array.isArray(key)) {
                result = JSON.stringify( key )
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
    const addNewKey = ()=>{
        let fullName:any = handleFullName()
        let key:any = handleKeyName(props.property.csPropertyKeyViewDTO.key)
        if(fullName === null ){
            fullName = null
        }else{
            if(fullName.length !== 0 ){
                fullName = fullName.concat(".",key)
            }else{
                fullName = key
            }
        }
        props.handleNewPropertyKey(props.property.csPropertyKeyViewDTO.keyID,fullName)
    }
    const expandProperty = ()=>{
        setExpandPropertyState(!expandPropertyState)
    }
    const getLabelName =()=>{
        let property = propertyKey?propertyKey:props.property.csPropertyKeyViewDTO
        let index = ''

        if(property.index !== null){
            index = `[${property.index}]`
        }


        if(property.list){
            if(props.property.numberOfChild === null || props.property.numberOfChild === 0){
                return ` ${property.key} `
            }else{
                let key = property.key === null ? "" : property.key
                if(expandState){
                    return `${key} `
                } else{
                    return `${index} ${key} [ ${props.property.numberOfChild} Items ]  `
                }
            }
        }else{
            if(props.property.numberOfChild === null || props.property.numberOfChild === 0){
                let key = property.key === null ? "" : property.key
                return `${index} ${key}  `
            }else{
                let key = property.key === null ? "" : property.key
                if(expandState){
                    return `${key}`
                } else{
                    return `${index} ${key} { ${props.property.numberOfChild} Keys }  `
                }
            }
        }
    }

    const getPublishedNodes = (parentId:any,parentFullIdList:any) =>{
        if(props.property.numberOfChild !== 0 && props.property.numberOfChild !== null){
            requestJson.parentId = parentId
            requestJson.parentFullIdList = parentFullIdList
            fetchChildNodes(props.selectedTag.id,requestJson).then((result:any) => {
                props.onClick(
                    <>
                        {result.children.length !== 0 && result.children.map((node:any,indexChildren:any) =>
                            <TreeProperty
                                key={"tree_property_"+indexChildren}
                                id={node.csPropertyKeyViewDTO.keyID}
                                name={node.csPropertyKeyViewDTO.key}
                                property={node}
                                storeType={props.storeType}
                                handleKey={props.handleKey}
                                handleValue={props.handleValue}
                                deleteKey={props.deleteKey}
                                deleteValue={props.deleteValue}
                                ContextData={props.ContextData}
                                changeStatusValue={props.changeStatusValue}
                                cancelKey={props.cancelKey}
                                stateValue={props.stateValue}
                                selectedTag={props.selectedTag}
                                handleNewPropertyKey={props.handleNewPropertyKey}
                                handlePropertyFiler={props.handlePropertyFiler}
                                requestData={props.requestData}
                                indexElement={`child_${indexChildren}`}
                                publishProperty={props.publishProperty}
                                publishResponse={props.publishResponse}
                                addValueState={props.addValueState}
                            />
                        )}
                    </>
                )}
            )
                .catch((error:any) =>{
                    console.log(error)
                });
        }
    }

    const handleOpenPublishPopup = (event?:any) => {
        handleExpansion(event);
        setHeaderPublishDialog("Publish Property")
        setContentPublishDialog("Are you sure you want to publish this property?")
        setOpenPublishDialog(true);
    }

    const handleClosePublishPopup = () => {
        handleOpenPublishPopup()
        setOpenPublishDialog(false);
    }



    const publishProperty = () => {
        props.publishProperty(props.property.csPropertyKeyViewDTO);
        setLoadingAdd(true);
        setTimeout(() => {
            getPublishedNodes(props.property.csPropertyKeyViewDTO.keyID,props.property.csPropertyKeyViewDTO.fullIdList)
            if(props.property.csPropertyKeyViewDTO.fullIdList){
                let requestJsonData = requestJson;
                let propertyIdList = props.property.csPropertyKeyViewDTO.fullIdList;
                requestJsonData.parentId = propertyIdList[propertyIdList.length - 1];
                if(propertyIdList.length===1){
                    requestJsonData.parentFullIdList = null
                }
                else{
                    propertyIdList.pop();
                    requestJsonData.parentFullIdList = propertyIdList
                }
                fetchChildNodes(props.selectedTag.id,requestJsonData).then((result:any) => {
                    let resultData = result.children.filter((element:any)=>element.csPropertyKeyViewDTO.keyID === props.property.csPropertyKeyViewDTO.keyID);
                    if(resultData.length!==0){
                        setSelectedPropety(resultData[0].csPropertyKeyViewDTO)
                    }
                })
            }
        }, 2000)


        setTimeout(() => {
            setLoadingAdd(false)
        }, 3000)
    }




    const updateValue = (valueUpdated?:boolean, setLoadingKey?:any, keyUpdated?:boolean) => {
        if(props.property.csPropertyKeyViewDTO.fullIdList){
            let parentFullIdList2 = props.property.csPropertyKeyViewDTO.fullIdList
            let parentId = parentFullIdList2[parentFullIdList2.length - 1]
            let parentFullIdList=parentFullIdList2.filter((element:any, index:any)=>index !== parentFullIdList2.length - 1);
            let requestJsonData = requestJson;
            requestJsonData.parentFullIdList= parentFullIdList
            requestJsonData.parentId= parentId

            fetchChildNodes(props.selectedTag.id,requestJsonData,parentId).then((result:any) => {
                let resultData = result.children.filter((element:any)=>element.csPropertyKeyViewDTO.keyID === props.property.csPropertyKeyViewDTO.keyID);
                setPropertyTree(resultData[0])
                if(keyUpdated){
                    setPropertyKey(resultData[0].csPropertyKeyViewDTO)
                    setTimeout(() => {
                        setLoadingKey(false)
                    }, 1000);
                }
                else if(!valueUpdated) {
                        setPropertyValueState(propertyValue.csPropertyKeyViewDTO.contextKeys.length === resultData[0].csPropertyKeyViewDTO.contextKeys.length)
                        setPrpertyValue(resultData[0])
                        props.changeStatusValue(false)
                }
            })
        }
    }

    return (
        <div onMouseDown={handleMouseDown} className={classeStyles.tree_container} ref={ref} >

            <div className={classeStyles.mainTree_div}>
                <div className={classeStyles.mainInfo}>
                    <div onClick={handleExpansionClick} className={classeStyles.iconExpand}>
                        {(!loading &&(props.property.numberOfChild !== 0 && props.property.numberOfChild !== null)) && icon}
                        {loading && <CircularProgress className={classeStyles.button} disableShrink size={15}/> }
                    </div>
                    <div style={{display:'flex',marginLeft:8}}>
                        <Typography
                            id={`label_${props.indexElement}`}
                            className={classeStyles.label}
                            onClick={(event:any)=>{
                                if(props.property.numberOfChild === null){
                                    handleSelectionClick(event)
                                }
                            }}
                            component='div'
                        >
                            {getLabelName()}
                        </Typography>
                        {(props.property.numberOfChild === null &&  !expandPropertyState ) ?
                            <div className={getValues().link ? classeStyles.btn_link : classeStyles.simpleLink}>
                                <Typography
                                    style={{color:'#0a8fdcbf'}}
                                    id={`label_${props.indexElement}`}
                                    className={classeStyles.label}
                                    onClick={(event:any)=>{
                                        if(props.property.numberOfChild === null){
                                            handleSelectionClick(event)
                                        }
                                    }}
                                    component='div'>
                                    {getValues().value}
                                </Typography>
                            </div>
                            :
                            <div/>
                        }
                    </div>
                </div>
                <div className={classeStyles.action}>
                    <div className={classeStyles.action_add}>

                        <div>
                            {((props.property.csPropertyKeyViewDTO.status === "DRAFT" && props.property.csPropertyKeyViewDTO.dirty)
                                    &&(!(selectedPropety && (selectedPropety.dirty===false)))) &&
                                <div>
                                    { !loadingAdd  ?
                                        <Tooltip title={"Publish Property"} arrow enterDelay={0} leaveDelay={500}>
                                            <IconButton style={{padding: 0}} color="secondary" aria-label="synchronize" id={`synchronize`}
                                                        onClick={handleOpenPublishPopup}>
                                                <SyncProblemIcon style={{
                                                    color: "#E3AB55",
                                                    padding: 0,
                                                    marginRight: (props.property.numberOfChild === null ? 25 : 0)
                                                }}/>
                                            </IconButton>
                                        </Tooltip>
                                        :
                                        <div>
                                            <CircularProgress disableShrink size={20} style={{marginRight:(props.property.numberOfChild === null?25:0)}}/>
                                        </div>
                                    }
                                </div>
                            }
                            {((props.property.csPropertyKeyViewDTO.status === "DRAFT" && !props.property.csPropertyKeyViewDTO.dirty) ||
                                    (selectedPropety && (selectedPropety.dirty===false)))&&
                                <div>
                                    <Tooltip title={"Property Published"} arrow enterDelay={0} leaveDelay={500}>
                                        <span>
                                            <IconButton disabled={true} style={{padding:0}} color="secondary" aria-label="synchronize" id={`synchronize`} >
                                                <SyncIcon  style={{color:"rgb(76, 175, 80)",padding:0, marginRight:(props.property.numberOfChild === null?25:0)}} />
                                            </IconButton>
                                        </span>
                                    </Tooltip>

                                </div>
                            }

                        </div>

                    </div>

                    <div className={classeStyles.action_add}>
                        {(props.property.numberOfChild !== null) &&
                            <AddCircleIcon id={`add_newKey_${props.indexElement}`} className={classeStyles.button} style={{ color: green[500]}} onClick={addNewKey} />
                        }
                    </div>
                    <div className={classeStyles.action_delete}>

                        <HighlightOffIcon id={`delete_Key_${props.indexElement}`} className={classeStyles.button} color="secondary"  onClick={handleOpenConfirmPopup}/>

                    </div>
                    <div className={classeStyles.action_expand}>
                        {expandPropertyState && <ExpandLessIcon d={`ExpandLessIcon_Key_${props.indexElement}`}  onClick={expandProperty}/>}
                        {!expandPropertyState && <ExpandMoreIcon d={`ExpandMoreIcon_Key_${props.indexElement}`}  onClick={expandProperty}/>}
                    </div>
                </div>
            </div>
            <div className={classeStyles.treeItem_propertyDetails} style={{marginRight: parentList ? parentList.length*15:0, width: parentList ? 101+parentList.length +"%" : "100%"}}>
                {expandPropertyState &&
                    <div className={classeStyles.propertyDetails} style={{marginTop:"5px"}}>
                        <TabContext value={value}>
                            <TabList TabIndicatorProps={{ style: { background: "#3569a8" } }} style={{minHeight: "auto",height: "auto",width:'100%',borderBottom:"1px solid #a2b4b5"}} className={classeStyles.TabList} onChange={handleChange} aria-label='lab API tabs example'>
                                <Tab  style={{minHeight: "auto",height: "auto",paddingBottom:0,paddingTop:0,textTransform:'initial'}} className={classeStyles.Tab} label='General' value='1' />
                                <Tab style={{minHeight: "auto",height: "auto",textTransform:'initial',display: 'flex'}} className={classeStyles.Tab} label='Audit' value='2' />
                            </TabList>
                            <TabPanel  style={{padding:0}} className={classeStyles.TabPanel} value='1'>
                                <div className={classeStyles.ProportyDetails} style={{paddingTop:8}}>
                                    <div style={{ display: "flex",width:'100%',padding:0 ,flexDirection:'column'}}>
                                        <div style={{ display: "flex",width:'100%',padding:0 ,flexDirection:'column'}}>
                                            <div className={classeStyles.propertiesDetails_yaml}>


                                                <PropertyDetails
                                                    key={propertyTree?propertyTree.csPropertyKeyViewDTO.keyId:props.property.csPropertyKeyViewDTO.keyId}
                                                    selectedTag={props.selectedTag}
                                                    headerActionState={ActionMode.DISPLAY_MODE}
                                                    handleKey={props.handleKey}
                                                    handleValue={props.handleValue}
                                                    deleteKey={props.deleteKey}
                                                    deleteValue={props.deleteValue}
                                                    csPropertyKey={propertyTree?propertyTree.csPropertyKeyViewDTO:props.property.csPropertyKeyViewDTO}
                                                    initialContext={props.ContextData}
                                                    stateValue={props.stateValue}
                                                    changeStatusValue={props.changeStatusValue}
                                                    cancelCreationAction={props.cancelKey}
                                                    storeType={props.storeType}
                                                    handleNewPropertyKey={props.handleNewPropertyKey}
                                                    handlePropertyFiler={props.handlePropertyFiler}
                                                    modeView={true}
                                                    indexElement={props.indexElement}
                                                    publishProperty={props.publishProperty}
                                                    updateValue={updateValue}
                                                    addValueState={propertyValueState}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel  style={{padding:8}} className={classeStyles.TabPanel} value='2'>
                                <PropertyAudit audit={propertyAudit} idProperty={props.property.csPropertyKeyViewDTO.keyID} indexProperty={null} />
                            </TabPanel>
                        </TabContext>
                    </div>
                }
            </div>
            <ConfirmPopup opendialog={openConfirmDialog} headerContent={headerDialog} contentMessage={contentDialog} handleAccordion={deleteAccordion} handleClose={handleCloseConfirmPopup} popupMainAction={props.deleteKey(props.property.csPropertyKeyViewDTO.keyID,ActionMode.DELETE_MODE)}/>
            <ConfirmPopup opendialog={openPublishDialog} headerContent={headerPublishDialog} contentMessage={contentPublishDialog} handleClose={handleClosePublishPopup} popupMainAction={publishProperty} handleAccordion={()=>{}} />

        </div>
    );
});



const CustomTreeItem = (props:any) => (
    <TreeItem ContentProps={props.ContentProps} ContentComponent={CustomContent}  {...props} />
)


const TreeProperty: React.FC<ITreeProperty> = (props:any) => {
    const classes = useStyles();
    const [childNodes, setChildNodes] = React.useState<any>(null);

    return (
        <div>
            <TreeView
                className={classes.treeView}
                aria-label='icon expansion'
                defaultCollapseIcon={<RemoveCircleRoundedIcon className={classes.button} style={{ color: "#0a8fdc" ,fontSize:'16px'}}/>}
                defaultExpandIcon={<AddCircleOutlineRoundedIcon  className={classes.button} style={{ color: "#0a8fdc",fontSize:'16px' }}/>}
            >
                <CustomTreeItem
                    nodeId={String(props.id)}
                    label={props.name}
                    onClick={setChildNodes}
                    ContentProps={{
                        property:props.property,
                        handleKey:props.handleKey,
                        handleValue:props.handleValue,
                        deleteKey:props.deleteKey,
                        deleteValue:props.deleteValue,
                        ContextData:props.ContextData,
                        changeStatusValue:props.changeStatusValue,
                        cancelKey:props.cancelKey,
                        stateValue:props.stateValue,
                        selectedTag:props.selectedTag,
                        handleNewPropertyKey:props.handleNewPropertyKey,
                        handlePropertyFiler:props.handlePropertyFiler,
                        storeType:props.storeType,
                        requestData:props.requestData,
                        indexElement:props.indexElement,
                        publishProperty:props.publishProperty,
                        publishResponse:props.publishResponse,
                        updateValue:props.updateValue,
                        addValueState:props.addValueState
                    }}
                >
                    {childNodes || [<div key="stub" />]}
                </CustomTreeItem>
            </TreeView>

        </div>
    );
}

export default TreeProperty;