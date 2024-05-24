
import * as React from "react";
import { useEffect, useState } from "react";

import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import useStyles from "./styles";
import { Icon, IconButton, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Filter from "shared/components/Filter";
import { ActionAccessMode, TaskTypeId, filterTypeEnum, typeMergeTag } from "shared/constants/AppEnums";
import { ResultStatusEnum, RunningStatusEnum } from "shared/constants/AppConst";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux/store";
import { Icombo } from "types/models/Combo";
import { LoadTagsRedux, getMergeTagList, mergeTag } from "shared/services/tagsService";
import MergeTagList from "../MergeTagList";
import MergeTagAdd from "../MergeTagAdd";
import {handleErrors} from "../../../shared/constants/HandleErrors";
import {loadWorkspace} from "../../../redux/actions/Workspace";
import AccessButton from "shared/components/AccessButton";
import { Tooltip } from "@mui/material";

interface IMergeTag {
}

let filter:any = [
    { type:filterTypeEnum.SELECT_ONE,name:'tagId',label:'Source Tag',order:1,values:[],search:true,context:null},
    { type:filterTypeEnum.SELECT_ONE,name:'tagIdTarget',label:'Target Tag',order:2,values:[],search:true,context:null},
    { type:filterTypeEnum.SELECT_ONE,name:'resultStatusId',label:'Result',order:3,values:ResultStatusEnum,search:false,context:null},
    { type:filterTypeEnum.SELECT_ONE,name:'runningStatusId',label:'Running Status',order:4,values:RunningStatusEnum,search:false,context:null},
    { type:filterTypeEnum.DATE_RANGE,name:'date',label:'Date',order:5,values:[null,null],search:false,context:null}
  ]
  
  let initialFilterFormik = {
    tagId: [],
    tagIdTarget: [],
    resultStatusId : [],
    runningStatusId:[],
    from:null,
    to:null
  }

const MergeTag: React.FC<IMergeTag> = (props) => {
    const classes = useStyles();
    const [ unfold, setUnfold ] = useState<any>(false)
    const [ mergeTagList, setMergeTagList ] = useState<any>({taskDTOList:[],itemNumbers:0,pagesNumber:0})
    const [ stateMerge, setStateMerge ] = useState<any>(false)
    const [action,setAction] = useState<any>(false)
    const [stateComponent,setStateComponent] = useState<any>(true)
    const [filterInitData,setFilterInitData] = useState<any>(filter)
    const [tags,setTags] = useState<any>([])
    const [filterState,setFilterState] = React.useState<any>({})
    const [page,setPage] = useState<any>(0)
    const [size,setSize] = useState<any>(10)
    const [statePage,setStatePage] = useState<any>({state:false,data:{taskDTOList:[],itemNumbers:0,pagesNumber:0}})
    const [errorMerge,setErrorMerge] = React.useState<any>(null)
    const [loadingAdd,setLoadingAdd] = React.useState<Boolean>(false)
    const [createData,setCreateData]= React.useState<any>({state:false,object:[]})
    const [stateCreate,setStateCreate] = React.useState<any>(false)
    const [typeAction,setTypeAction] = React.useState<any>("unfold")

    let dispatch = useDispatch();
    const Data: Icombo = useSelector((state: AppState) => state.combo);
    const DataWS: Icombo = useSelector((state: AppState) => state.comboWS);
    const workspaces = useSelector((state: AppState) => state.workspaces.workspaceslist);
    const selected = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedStore" ? `${acc}${cur.split("=")[1]}` : acc, "");
    const selectedWS = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedWorkspace" ? `${acc}${cur.split("=")[1]}` : acc, "");
    const selectWorkspace = workspaces.find((elem: any) => elem.workSpaceDTO.name === selectedWS)
    const selectedStore:any = selectWorkspace?.storeList.find((element: any) => element.name === selected );
    
    const { taglist, loadingTags } = LoadTagsRedux(selectedStore?.id as number);

    const handleUnfold = ()=>{
        setUnfold(!unfold)
        setAction(true)
    }

    const handleSearch =async (values:any,handleLoading:any) => {
        setStateComponent(true)
        
        let filterData:any = {
            "taskTypeId": [TaskTypeId.MERGE_TAG],
        }
        if(values.resultStatusId.length !== 0){
            let elementFound:any = ResultStatusEnum.find((obj:any)=>obj.value === values.resultStatusId[0])
            filterData.resultStatusId = elementFound.key
        }
        if(values.runningStatusId.length !== 0){
            let elementFound:any = RunningStatusEnum.find((obj:any)=>obj.value === values.runningStatusId[0])
            filterData.runningStatusId = elementFound.key
        }
        const now = new Date();
        const timeDifference = now.getTimezoneOffset() / 60;
        if(values.fromDate) {
            const fromDate = new Date(values.fromDate);
            const localFromDate = new Date(fromDate.getTime() + timeDifference * 60 * 60 * 1000);
            filterData.fromDate = localFromDate.toISOString()
        }
        if(values.toDate) {
            const toDate = new Date(values.toDate);
            const localToDate = new Date(toDate.getTime() + timeDifference * 60 * 60 * 1000);
            filterData.toDate = localToDate.toISOString()
        }
        if(values.tagId.length !== 0) {
            let tagSource:any = taglist.find((obj:any) => obj.name === values.tagId[0])
            filterData.tagId = tagSource.id
        }
        if(values.tagIdTarget.length !== 0) {
            let tagTarget:any = taglist.find((obj:any) => obj.name === values.tagIdTarget[0])
            filterData.tagIdTarget = tagTarget.id
        }
        progressTasks (filterData,handleLoading, true)
    }

    const handlePage = (typeAction:any,value:any) =>{
        if(typeAction === "page"){
            setPage((value-1))
            getMergeTagList(filterState,size,(value-1),selectedStore?.id).then(itemsTags => {
                setStatePage({state:true,data:itemsTags})
            }).catch((error:any)=>{
                handleErrors(error,true, null)
            })
        }else{
            setSize(value)
        }
    }

    const handleMerge = (values:any,loading:any,handlerError:any) => {
        setLoadingAdd(true)
        setErrorMerge([])
        let ErrorMessageList:any = []
        let tagSource:any = taglist.find((obj:any)=> obj.name === values.tagSource)
        let tagTarget:any = taglist.find((obj:any)=> obj.name === values.tagTarget)
        

        if(tagSource === undefined || tagSource === null){
            ErrorMessageList.push('Tag Source is required')
        }
        if(tagTarget === undefined || tagTarget === null){
            ErrorMessageList.push('Tag Target is required')
        }
        if(ErrorMessageList.length !== 0){
            setErrorMerge(ErrorMessageList)
            setLoadingAdd(false)
        }else{
            let tagId = tagSource.id
            let requestData = {
                "mergeTagTaskDTO":{     
                    "sourceTag":tagSource.id,
                    "targetTag":tagTarget.id,
                    "mergeTypeId":values.force ? typeMergeTag.FORCE : typeMergeTag.RECENT
                },
                "typeId":7
            }
            setTimeout(() => {
                mergeTag(tagId,requestData).then((response:any)=>{
                    setLoadingAdd(false)
                    progressTasks (null,null, false)
                    setLoadingAdd(false)
                    setStateMerge(false)
                })
                    .catch((error:any)=>{
                        handleErrors(error,true, null)
                    })
            }, 500);
            setErrorMerge(null)
        }
    }

    const createAddForm = ()=> {setStateMerge(true)}

    const progressTasks = (filterData:any,handleLoading:any, isFiltered:any) => {
        if (isFiltered) {
            setPage(0)
            setStateMerge(false)
            setStateComponent(true)
            getMergeTagList(filterData,10,0,selectedStore?.id).then((element:any)=>{
                setFilterState(filterData)
                setPage(0)
                setCreateData({status:true,object:element})
                setTimeout(() => {
                    setStateComponent(false)
                    handleLoading(false)
                }, 500);
            }).catch((error:any)=>{
                handleErrors(error,true, null)
            })
        }
        else {
            getMergeTagList(filterState,10,page,selectedStore?.id).then((element:any)=>{
                setCreateData({status:true,object:element})
                setStateCreate(!stateCreate)
                setTimeout(() => {
                    setErrorMerge(null)
                    setStateMerge(false)
                    setLoadingAdd(false)
                }, 500);
            }).catch((error:any)=>{
                handleErrors(error,true, null)
            })
        }
    }


    useEffect(() => {
    
        let mounted = true;
        if (loadingTags && selectedStore !== undefined && mounted) {
          setTags(taglist)
        }
        return () => {
            mounted = false
        }       
      }, [loadingTags, selectedStore, taglist,Data]);

      useEffect(() => {
        if(!selectWorkspace){
          dispatch(loadWorkspace())
        }
      }, [selectWorkspace, dispatch]);

    useEffect(() => {
        if(selectedStore){
            if(taglist.length !== 0){
                let requestData:any = {}
                setPage(0)
                let interFilter:any = filter
                interFilter[0].values = taglist
                interFilter[1].values = taglist
                setFilterInitData(interFilter)
                setStateComponent(true)

                getMergeTagList(requestData, 10,0,selectedStore?.id).then((responseFile:any)=>{
                    setFilterState(requestData)
                    setTimeout(() => {
                        setStateComponent(false)
                        setMergeTagList(responseFile)
                    }, 500);
                }).catch((error:any)=>{
                    handleErrors(error, true, null)
                })
            }
        } else {
            setStateComponent(false)
            setMergeTagList({taskDTOList:[],itemNumbers:0,pagesNumber:0})
        }

    }, [taglist, selectedStore, DataWS])
    
   /* useEffect(() => {
        if(taglist.length !== 0){
            let requestData:any = {
            }
            setPage(0)
            let interFilter:any = filter
            interFilter[0].values = taglist
            interFilter[1].values = taglist
            setFilterInitData(interFilter)

            intervalId && clearInterval(intervalId);
            const execute = () => {
                getMergeTagList(requestData, 10,0,selectedId?.id).then((responseFile:any)=>{
                        setFilterState(requestData)
                        setStateComponnent(false)
                        setTimeout(() => {
                            setStateComponent(false)
                            setMergeTagList(responseFile)
                        }, 500);

                        if (responseFile.taskDTOList.length !== 0) {
                            const isRunning = responseFile.taskDTOList.some((task:any) => task.runningStatus === "RUNNING");
                            if (!isRunning) {
                                clearInterval(newIntervalId);
                            }
                        } else clearInterval(newIntervalId);
                    }

                ).catch((errorUpdate:any)=>{
                    handleErrors(errorUpdate, true, null)
                    clearInterval(newIntervalId);
                })
            }

            execute();
            const newIntervalId = setInterval(execute, 5000);
            setIntervalId(newIntervalId);
            return () => clearInterval(newIntervalId);
        }
    }

}, [taglist, selectedId]);*/

    useEffect(()=>{
        if(statePage.state){  
            setMergeTagList(statePage.data);
            setTimeout(() => {
                setStateComponent(false)
                setStatePage({state:false,data:{cstagViewDTO:[],numberOfItems:0,numberOfPages:0}})
            }, 500);
        }    
    },[statePage])

    useEffect(()=>{
        if (unfold ) {
            setTypeAction("unfold")
            setAction(true)
        }else{
            setTypeAction("fold")
            setAction(false)
        }
    },[unfold])

    useEffect(()=>{
        if(createData.state !== false){
            setMergeTagList(createData.object)
        }
      },[createData,stateCreate])

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.Typography}>Merge Tag</div>
            </div>
        <div className={classes.divider}/>
        <div className={classes.filter}>
            <Filter
                disabled={!selectedStore}
                stateFilter={initialFilterFormik}
                stateComponent={stateComponent}
                context={null}
                filterData={filterInitData}
                handleSearch={handleSearch}
                resetForm={JSON.parse(JSON.stringify(initialFilterFormik))}
            />
        </div>
        <div className={classes.divider}/>
        <div className={classes.action}  >
            <div style={{display:'flex',alignItems:'center',padding:8}}>
                <AccessButton
                    disabled={!selectedStore}
                    id={`add_form`} 
                    actionType={ActionAccessMode.EXECUTE_MODE} 
                    className={classes.boardStylekey} 
                    handleClick={createAddForm}
                >
                    <Icon style={{ color: green[500] }}>add_circle</Icon>
                    Merge Tag
                </AccessButton>
        </div>
            <div style={{display:'flex',alignItems:'center'}}>
                {( unfold) &&
                <div className={classes.unfold} style={{display:'flex',alignItems:'center',padding:0}}>
                    <Tooltip title={"Unfold"} arrow enterDelay={0} leaveDelay={100}>
                        <span>
                            <IconButton id={`btn_fold`} className={classes.unfold} onClick={handleUnfold} >
                                <UnfoldMoreIcon style={{height:14}}/>
                            </IconButton>
                        </span>
                    </Tooltip>
                </div>
                }
                {( !unfold) &&
                    <div  className={classes.unfold} style={{display:'flex',alignItems:'center',padding:0}}>
                        <Tooltip title={"Fold"} arrow enterDelay={0} leaveDelay={100}>
                            <span>
                                <IconButton id={`btn_fold`} className={classes.unfold} onClick={handleUnfold} >
                                    <UnfoldLessIcon style={{height:14}} />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </div>
                }
                <div className={classes.divider_Vertical}/>
                <div style={{display:'flex',alignItems:'center',marginRight:8,marginLeft:8,width:"auto"}}>
                    {mergeTagList.itemNumbers !== undefined && <Typography>{mergeTagList.itemNumbers} Items</Typography> }
                </div>
            </div>
        </div>
        <div className={classes.divider}/>
        {stateMerge &&
            <div style={{width:'100%',padding:4}}>
                <MergeTagAdd 
                    tagList={tags} 
                    errorAction={{ value: errorMerge, action: setErrorMerge }} 
                    loading={loadingAdd} 
                    handleMerge={handleMerge} 
                    cancelPublish={setStateMerge} 
                />
            </div>
        }
        <MergeTagList
            stateComponent={stateComponent}
            fold={{ handleUnfold: handleUnfold, action: action, setAction: setAction, typeAction: typeAction, unfold: unfold, setUnfold: setUnfold }} 
            MergedTagList={mergeTagList} 
            page={page} 
            handlePages={handlePage}        
        />
    </div>
);

};

export default MergeTag;
