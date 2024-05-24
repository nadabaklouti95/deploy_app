import * as React from "react";
import {useEffect, useState} from "react";

import {ReactComponent as Branch} from "../../../shared/img/reset_compare.svg";


import {Button, IconButton, Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import PropertyRevisionList from "../PropertyRevisionList";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import {getAudit} from "shared/services/auditService";
import {useDispatch, useSelector} from "react-redux";
import {LoadStorebyid, LoadTags} from "redux/actions";
import {AppState} from "redux/store";
import {Icombo} from "types/models/Combo";
import {Alert} from "@material-ui/lab";
import useStyles from "./styles";
import {useHistory} from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Filter from "shared/components/Filter";
import {filterTypeEnum} from "shared/constants/AppEnums";
import {operationTypeEnum, StatusPropEnum} from "shared/constants/AppConst";
import {loadWorkspace} from "../../../redux/actions/Workspace";
import { Tooltip } from "@mui/material";



const initialData = {
    csContextsDTOList: [],
    fromDate: null,
    operationTypeList: [],
    propertyKey: "",
    statusList: [],
    storeId: null,
    tagIdList: [],
    toDate: null,
    userLogin: "",
    version: '',
};

let filter: any = [
    {
        type: filterTypeEnum.TEXT,
        name: 'textSearch',
        label: 'User Name',
        order: 1,
        values: "",
        search: false,
        context: null,
        disabled: false
    },
    {
        type: filterTypeEnum.TEXT_KEY,
        name: 'propertyKey',
        label: 'Key',
        order: 2,
        values: "",
        search: false,
        context: null,
        disabled: false
    },
    {
        type: filterTypeEnum.TEXT_VERSION,
        name: 'version',
        label: 'Version',
        order: 3,
        values: "",
        search: false,
        context: null,
        disabled: false
    },

    {
        type: filterTypeEnum.DATE_RANGE,
        name: 'dateRange',
        label: 'Date',
        order: 4,
        values: "",
        search: false,
        context: null,
        disabled: false
    },
    {
        type: filterTypeEnum.SELECT_MULTI,
        name: 'tagIdList',
        label: 'Tag',
        order: 5,
        values: [],
        search: true,
        context: null,
        disabled: false
    },
    {
        type: filterTypeEnum.SELECT_MULTI,
        name: 'statusList',
        label: 'Status',
        order: 6,
        values: StatusPropEnum,
        search: false,
        context: null,
        disabled: false
    },
    {
        type: filterTypeEnum.SELECT_MULTI,
        name: 'operationTypeList',
        label: 'Operation Type',
        order: 7,
        values: operationTypeEnum,
        search: false,
        context: null,
        disabled: false
    },
    {
        type: filterTypeEnum.SELECT_MULTI,
        name: 'context',
        label: 'Context',
        order: 8,
        values: [],
        search: false,
        context: null,
        disabled: false
    },

]


const initialFilterFormik = {
    tagIdList: ['Latest'],
    statusList: [],
    textSearch: [],
    propertyKey: [],
    version: [],
    operationTypeList: [],
    context: [],
    dateRange: ""
}


const PropertyRevision: React.FC = (props: any) => {
    const classes = useStyles();
    const [fold, setFold] = useState<Boolean>(false)
    const [stateComponnent, setStateComponnent] = useState<any>(true)
    const [stateCompare, setStateCompare] = useState<any>(false)
    const [compareData, setCompareData] = useState<any>([])
    const [stateReverse, setStateReverse] = useState<any>({state: false, data: []})
    const [auditData, setAuditData] = useState<any>({"csEntityAuditViewDTOS": [], "itemNumbers": 0, "pagesNumber": 0})
    const [page, setPage] = useState<any>(0)
    const [size, setSize] = useState<any>(10)
    const [statePage, setStatePage] = useState<any>({
        state: false,
        data: {"csEntityAuditViewDTOS": [], "itemNumbers": 0, "pagesNumber": 0}
    })
    const [compareElement, setCompareElement] = useState<any>([])
    const [filterData, setFilterData] = useState<any>(initialData)
    const [ContextData, setContextData] = useState<any>()
    //const [contextValues, setContextValues] = React.useState<any>([]);
    const [tags, setTags] = React.useState<any>([])
    const [errorCompare, setErrorCompare] = useState<any>('')
    const [initialFilter, setInitialFilter] = React.useState<any>(JSON.parse(JSON.stringify(initialFilterFormik)))
    const [filterInitData, setFilterInitData] = React.useState<any>(filter)


    let historyParams = useHistory()

    let dispatch = useDispatch();
    const Data: Icombo = useSelector((state: AppState) => state.combo);
    const DataWS: Icombo = useSelector((state: AppState) => state.comboWS);
    const workspaces = useSelector((state: AppState) => state.workspaces.workspaceslist);
    const selected = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedStore" ? `${acc}${cur.split("=")[1]}` : acc, "");
    const selectedWS = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedWorkspace" ? `${acc}${cur.split("=")[1]}` : acc, "");
    const selectWorkspace = workspaces.find((elem: any) => elem.workSpaceDTO.name === selectedWS)
    const selectedStore:any = selectWorkspace?.storeList.find((element: any) => element.name === selected );
    
    const {context, loading} = LoadStorebyid(selectedStore?.id as number);
    const {taglist} = LoadTags(selectedStore?.id as number);


    const handleFold = () => setFold(!fold)
    const handleCompare = (type: any) => {
        if (type === 'close') {
            setStateCompare(false)
        }
        if (type === 'clear') {
            setCompareData([])
            setCompareElement([])
            setStateCompare(false)
        }
        if (compareData.length === 2) {
            if (type === 'open') {
                if (compareData[0].sourceId === compareData[1].sourceId) {
                    let operation = compareData[0].operation==="INSERT" || compareData[1].operation==="INSERT";
                    if(JSON.parse(compareData[0].content).id === JSON.parse(compareData[1].content).id || operation) {
                        setStateCompare(true)
                        setCompareElement(compareData)
                        setErrorCompare(``)
                    }
                    else setErrorCompare(`Two Audit Of Different Property Values`)
                }
                else setErrorCompare(`Two Audit Of Different Properties`)
            }

            if (type === 'reverse') {
                let firstElement: any = compareElement[0]
                let data = JSON.parse(JSON.stringify(compareElement))
                data.shift()
                data.push(firstElement)
                setStateReverse({state: true, data: data})
            }
        }
    }
    const handlePage = (typeAction: any, value: any) => {
        if (typeAction === "page") {
            setStateComponnent(true)
            setPage((value - 1))
            if (selectedStore !== undefined) {
                let requestData: any = {
                    fromDate: null,
                    operationTypeList: [],
                    propertyKey: "",
                    statusList: [],
                    storeId: selectedStore?.id,
                    tagIdList: [],
                    toDate: null,
                    userLogin: "",
                    version: null
                }
                if (filterData.fromDate == null) {
                    delete requestData.fromDate
                } else {
                    requestData.fromDate = filterData.fromDate
                }
                if (filterData.operationTypeList == null || filterData.operationTypeList.length === 0) {
                    delete requestData.operationTypeList
                } else {
                    requestData.operationTypeList = filterData.operationTypeList
                }
                if (filterData.propertyKey == null || filterData.propertyKey.length === 0) {
                    delete requestData.propertyKey
                } else {
                    requestData.propertyKey = filterData.propertyKey
                }
                if (filterData.statusList == null || filterData.statusList.length === 0) {
                    delete requestData.statusList
                } else {
                    requestData.statusList = filterData.statusList
                }
                if (filterData.toDate == null) {
                    delete requestData.toDate
                } else {
                    requestData.toDate = filterData.toDate
                }
                if (filterData.version == null) {
                    delete requestData.version
                } else {
                    requestData.version = parseInt(filterData.version)
                }
                if (filterData.userLogin == null || filterData.userLogin.length === 0) {
                    delete requestData.userLogin
                } else {
                    requestData.userLogin = filterData.userLogin
                }
                if (filterData.sourceId !== null) {
                    requestData.sourceId = filterData.sourceId
                }
                if (filterData.tagIdList == null || filterData.tagIdList.length === 0) {
                    delete requestData.tagIdList
                } else {


                    let tagData = filterData.tagIdList.map((element: any) => {
                        let elementId = tags.find((tagElement: any) => tagElement.name === element)
                        if (elementId !== undefined) {
                            elementId = elementId.id
                        } else {
                            elementId = element
                        }
                        return elementId
                    });
                    requestData.tagIdList = tagData
                }
                requestData.storeId = selectedStore?.id
                getAudit(requestData, size, (value - 1)).then(itemsTags => {
                    setErrorCompare(``)
                    if (itemsTags !== undefined) {
                        setStatePage({state: true, data: itemsTags})
                    } else {
                        setStateComponnent(false)
                    }

                }).catch((error: any) => {
                    console.log(error)
                    setStateComponnent(false)
                })
            }
        } else {
            setSize(value)
        }
    }
    const checkCompare = (checked: any, value: any) => {
        setErrorCompare(``)
        if (checked) {
            let data: any = JSON.parse(JSON.stringify(compareData))
            let indexElement: any = data.findIndex((obj: any) => obj.id === value.id)
            if (indexElement !== (-1)) {
                data.splice(indexElement, 1);
            } else {
                if (data.length < 2) {
                    data.push(value)
                } else {
                    data.shift();
                    data.push(value);
                }
            }
            setCompareData(data)
        } else {
            let data: any = JSON.parse(JSON.stringify(compareData))
            let result: any = data.filter((obj: any) => obj.id !== value.id)
            setCompareData(result)
        }
    }
    const handleSearchAudit = (values: any, handleLoading: any) => {

        if (selectedStore !== undefined) {
            setErrorCompare('')
            setStateComponnent(true)
            let requestData: any = {
                fromDate: null,
                operationTypeList: [],
                propertyKey: "",
                statusList: [],
                storeId: selectedStore?.id,
                tagIdList: [],
                toDate: null,
                userLogin: "",
                version: null,
                context:[]
            }
            const now = new Date();
            const timeDifference = now.getTimezoneOffset() / 60;

            if (values.fromDate == null) {
                delete requestData.fromDate
            } else {
                const fromDate = new Date(values.fromDate);
                const localFromDate = new Date(fromDate.getTime() + timeDifference * 60 * 60 * 1000);
                requestData.fromDate = localFromDate.toISOString()
            }
            if (values.toDate == null) {
                delete requestData.toDate
            } else {
                const toDate = new Date(values.toDate);
                const localToDate = new Date(toDate.getTime() + timeDifference * 60 * 60 * 1000);
                requestData.toDate = localToDate.toISOString()
            }

            /*if (values.operationTypeList == null || values.operationTypeList.length === 0) {
                delete requestData.operationTypeList
            } else {
                requestData.operationTypeList = values.operationTypeList
            }*/
            if (values.propertyKey == null || values.propertyKey.length === 0) {
                delete requestData.propertyKey
            } else {
                requestData.propertyKey = values.propertyKey
            }
            if (values.statusList == null || values.statusList.length === 0) {
                delete requestData.statusList
            } else {
                requestData.statusList = values.statusList
            }
            
            if (values.version == null || values.version.length === 0) {
                delete requestData.version
            } else {
                requestData.version = parseInt(values.version)
            }
            if (values.userLogin == null || values.userLogin.length === 0) {
                delete requestData.userLogin
            } else {
                requestData.userLogin = values.userLogin
            }
            if (filterData.sourceId !== null) {
                requestData.sourceId = filterData.sourceId
            }
            if (values.tagIdList == null || values.tagIdList.length === 0) {
                delete requestData.tagIdList
            } else {


                let tagData = values.tagIdList.map((element: any) => {
                    let elementId = tags.find((tagElement: any) => tagElement.name === element)
                    if (elementId !== undefined) {
                        elementId = elementId.id
                    } else {
                        elementId = element
                    }
                    return elementId
                });
                requestData.tagIdList = tagData
            }


            //Context
            let contextFilter = values.context.filter((element:any)=>element.values.length!==0)
            if (contextFilter.length === 0) {
                delete requestData.context
            } else {
                const mapContext = new Map();
                for (let index = 0; index < contextFilter.length; index++) {
                    const element = contextFilter[index];
                    let contextIndex: any = ContextData.findIndex((obj: any) => obj.name === element.key);
                    let keyId = ContextData[contextIndex].id
                    let valueIds: any = []
                    element.values.forEach((elementValues: any) => {
                        if (elementValues === "ALL") {
                            valueIds = [0]
                        } else {
                            let foundValues: any = ContextData[contextIndex].values.find((obj: any) => obj.value === elementValues)
                            valueIds.push(foundValues.id)
                        }
                    });
                    mapContext.set(keyId, valueIds)
                }
                requestData.context = Object.fromEntries(mapContext)
            }


            //operationTypeList
            if (values.operationTypeList.length !== 0) {
                for (let index = 0; index < values.operationTypeList.length; index++) {
                    const element = values.operationTypeList[index];
                    let elementFound: any = operationTypeEnum.find((obj: any) => obj.value === element)
                    requestData.operationTypeList[index] = elementFound?.key
                }
            }else{
                delete requestData.operationTypeList
            }

            //status
            if (values.statusList.length !== 0) {
                for (let index = 0; index < values.statusList.length; index++) {
                    const element = values.statusList[index];
                    let elementFound: any = StatusPropEnum.find((obj: any) => obj.value === element)
                    requestData.statusList[index] = elementFound.key
                }
            }else{
                delete requestData.operationTypeList
            }


            requestData.storeId = selectedStore?.id
            getAudit(requestData, size, 0).then(itemsTags => {
                setPage(0)
                setFilterData(requestData)
                setStatePage({state: true, data: itemsTags})
                setTimeout(() => {
                    handleLoading(false)
                }, 500);
            }).catch((err: any) => {
                handleLoading(false)
                setStateComponnent(false)
            })
        }
    }

    useEffect(() => {
        if(!selectWorkspace){
          dispatch(loadWorkspace())
        }
      }, [selectWorkspace, dispatch]);


    useEffect(() => {
        let mounted = true;
        if(selectedStore !== undefined && loading === true){
            setStateComponnent(true)
            setStateCompare(false)
            setCompareElement([])
            setErrorCompare(``)
            let contextSort:any = []
            if(context !== null && context!== undefined){
                contextSort = context.sort(function(element1:any, element2:any) {
                    return element1.priority - element2.priority;
                })
            }
            let filterInit = {
                csContextsDTOList: [],
                fromDate: null,
                operationTypeList: [],
                propertyKey: "",
                statusList: [],
                storeId: null,
                tagIdList: [],
                toDate: null,
                userLogin:"",
                version:''
            }
            setFilterData(filterInit)
            setContextData(contextSort);
            //const CtxLength = new Array(context.length).fill([]);
            //setContextValues(CtxLength);
            setTags(taglist)
            if (selectedStore === undefined) {

            }
            if(mounted){}
        }
        return () => {
            mounted = false
        }
    }, [selectedStore, Data, dispatch, loading, context, taglist])

    useEffect(()=>{

        if (selectedStore !== undefined ) {
            setInitialFilter(JSON.parse(JSON.stringify(initialFilterFormik)));
            let params:any = null
            setStateComponnent(true)
            let path = "/revision/property/"
            if(historyParams.location.pathname.length > path.length){
                let pathName:any = historyParams.location.pathname
                params = pathName.substring(path.length,pathName.length)
            }

            if(params !== undefined && params?.length !== 0 && params !== null){
                let requestData = {
                    "storeId": selectedStore?.id,
                    sourceId : params
                }
                let interFilter:any = {
                    "storeId": selectedStore?.id,
                    sourceId : params,
                    statusList : []
                }

                getAudit(requestData,10,0)
                    .then((items:any) => {
                        if(items.csEntityAuditViewDTOS.length > 0){
                            if(items.csEntityAuditViewDTOS[0].status === "DRAFT"){
                                interFilter.statusList = [1]
                            }else{interFilter.statusList = [0]}
                        }
                        setFilterData(interFilter)
                        window.localStorage.setItem('sourceId','')
                        setAuditData(items)
                        setTimeout(() => {
                            setStateComponnent(false)
                            window.localStorage.setItem('sourceId','')
                        }, 1000);

                    })
            }else{

                //setSourceId(params)
                let requestData = {
                    "storeId": selectedStore?.id,
                }
                getAudit(requestData,10,0)
                    .then(items => {
                        setAuditData(items)
                        setTimeout(() => {
                            setStateComponnent(false)
                        }, 1000);
                    })

            }

        } else {
            setAuditData({ pagesNumber: 0, itemNumbers: 0, csEntityAuditViewDTOS: [] })
            setTimeout(() => {
                setStateComponnent(false)
            }, 1000);
        }

    },[dispatch, historyParams.location.pathname, selectedStore, DataWS])

    useEffect(() => {
        if(stateReverse.state){
            setCompareElement(stateReverse.data)
            setStateReverse({state:false,data:[]})
        }
    }, [stateReverse])

    useEffect(()=>{

        if(statePage.state){
            setStateComponnent(true)
            setAuditData(statePage.data);
            setTimeout(() => {
                setStateComponnent(false)
                setStatePage({state:false,data:{"csEntityAuditViewDTOS": [], "itemNumbers": 0, "pagesNumber": 0 }})
            }, 500);
        }


    },[statePage])

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            try {
                if (taglist && taglist.length !== 0) {
                    
                    setStateComponnent(true);
                    let interFilter:any = filter
                    interFilter[4].values = taglist;
                    interFilter[7].context = ContextData;
                    
                    setTimeout(() => {
                        if (isMounted) {
                            setFilterInitData(interFilter);
                            setStateComponnent(false);
                        }
                    }, 500);
                }
            }catch (error) {
                console.error(error);
            }
        }

        fetchData();
        return () => {
            isMounted = false;
        };
    }, [taglist, ContextData]);

        return (

            <div className={classes.container}>
                <div className={classes.header}>
                    <div className={classes.Typography}>
                        <Breadcrumbs
                            className={classes.breadCrumbs}
                            separator={<NavigateNextIcon fontSize="small" style={{marginLeft: 0, marginRight: 0}}/>}
                            aria-label="breadcrumb"
                        >
                            <div className={classes.Typography}>
                                Revision
                            </div>
                            ,
                            <div className={classes.Typography}>
                                Property
                            </div>
                        </Breadcrumbs>
                    </div>
                </div>
                <div className={classes.divider}/>
                <div className={classes.filter}>
                    <Filter
                        disabled={!selectedStore}
                        stateFilter={initialFilter}
                        stateComponent={stateComponnent}
                        context={null}
                        filterData={filterInitData}
                        handleSearch={handleSearchAudit}
                        resetForm={JSON.parse(JSON.stringify(initialFilter))}
                    />


                </div>
                <div className={classes.divider}/>
                <div className={classes.action}>
                    <div style={{display: 'flex', alignItems: 'center', padding: 8}}>
                        <Button id={`btn_compare_property_audit`} className={classes.boardStylekey}
                                onClick={() => handleCompare('open')}>
                            <CompareArrowsIcon style={{color: green[500]}}/>
                            Compare
                            <div className={classes.compareNumber}>
                                <Typography style={{color: "#FFFFFF"}}>{compareData.length}</Typography>
                            </div>

                        </Button>
                        <div>
                            {errorCompare.length !== 0 &&
                            <Alert severity="error" className={classes.alert}>
                                {errorCompare}
                            </Alert>
                            }
                        </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>

                        <div className={classes.unfold} style={{display: 'flex', alignItems: 'center', padding: 0}}>
                            <Tooltip title={"reset Compare"} id={'btn_reset_property_compare'} arrow enterDelay={0}
                                     leaveDelay={100}>
                                <span>
                                    <IconButton id={`btn_fold`} className={classes.unfold}
                                                onClick={() => handleCompare('clear')}>
                                    <Branch/>
                                </IconButton>
                                </span>

                            </Tooltip>
                        </div>
                        {fold &&
                        <div className={classes.unfold} style={{display: 'flex', alignItems: 'center', padding: 0}}>
                            <Tooltip title={"Unfold"} arrow enterDelay={0} leaveDelay={100}>
                                <span>
                                    <IconButton id={`btn_fold`} className={classes.unfold} onClick={handleFold}>
                                    <UnfoldMoreIcon style={{height: 14}}/>
                                </IconButton>
                                </span>

                            </Tooltip>
                        </div>
                        }
                        {!fold &&
                        <div className={classes.unfold} style={{display: 'flex', alignItems: 'center', padding: 0}}>
                            <Tooltip title={"Fold"} arrow enterDelay={0} leaveDelay={100}>
                                <span>
                                    <IconButton id={`btn_fold`} className={classes.unfold} onClick={handleFold}>
                                    <UnfoldLessIcon style={{height: 14}}/>
                                </IconButton>
                                </span>

                            </Tooltip>
                        </div>
                        }
                        <div className={classes.divider_Vertical}/>
                        <div style={{display: 'flex', alignItems: 'center', marginRight: 8, marginLeft: 8, width: "auto"}}>
                            <Typography>{auditData.itemNumbers !== undefined ? auditData.itemNumbers : 0} Items</Typography>
                        </div>
                    </div>
                </div>
                <div className={classes.divider}/>

               
                <PropertyRevisionList
                    stateComponnent={stateComponnent}
                    listAudit={auditData}
                    fold={fold}
                    stateCompare={stateCompare}
                    compareData={compareData}
                    handleCompare={handleCompare}
                    handlePages={handlePage}
                    page={page}
                    checkCompare={checkCompare}
                    compareElement={compareElement}
                />

            </div>
        );
    }
;
export default PropertyRevision;
