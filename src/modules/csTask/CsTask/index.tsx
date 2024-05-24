
import * as React from "react";
import { useState , useEffect } from "react";

import useStyles from "./styles";

import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import {IconButton, Typography} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Icombo } from "types/models/Combo";
import { AppState } from "redux/store";
import { LoadTagsRedux } from "shared/services/tagsService";
import CsTaskList from "../CsTaskList";
import { getListTask, getTaskLog } from "shared/services/taskService";
import { ResultStatusEnum, RunningStatusEnum, TaskTypeEnum } from "shared/constants/AppConst";
import Filter from "shared/components/Filter";
import { filterTypeEnum } from "shared/constants/AppEnums";
import {loadWorkspace} from "../../../redux/actions/Workspace";
import {handleErrors} from "../../../shared/constants/HandleErrors";

interface ICsTask {
} 


let filter:any = [
  { type:filterTypeEnum.SELECT_ONLY_ONE,name:'tagId',label:'Tag',order:1,values:[],search:true,context:null},
  { type:filterTypeEnum.SELECT_ONE,name:'resultStatusId',label:'Result',order:2,values:ResultStatusEnum,search:false,context:null},
  { type:filterTypeEnum.SELECT_ONE,name:'runningStatusId',label:'Running Status',order:3,values:RunningStatusEnum,search:false,context:null},
  { type:filterTypeEnum.SELECT_ONE,name:'taskTypeIds',label:'Task Type',order:3,values:TaskTypeEnum,search:false,context:null},
  { type:filterTypeEnum.DATE_RANGE,name:'date',label:'Date',order:4,values:[null,null],search:false,context:null}
]

let initialFilterFormik = {
  tagId: ['Latest'],
  resultStatusId : [],
  runningStatusId:[],
  taskTypeIds:[],
  fromDate:null,
  toDate:null
}


const CsTask: React.FC<ICsTask> = (props) => {
  const classes = useStyles();

  const [stateComponent,setStateComponent] = useState<any>(true)
  const [fold,setFold] = useState<Boolean>(false)
  const [tagList,setTagList] = useState<any>([])
  const [csTaskList,setCsTaskList] = useState<any>([])
  const [selectedTag,setSelectedTag] = useState<any>('Latest')
  const [dataAction,setDataAction] = useState<any>({state:false,data:{taskDTOList:[],itemNumbers:0,pagesNumber:0},filter:"Latest"})
  const [page,setPage] = useState<any>(0)
  const [size,setSize] = useState<any>(10)
  const [statePage,setStatePage] = useState<any>({state:false,data:{taskDTOList:[],itemNumbers:0,pagesNumber:0}})
  const [filterState,setFilterState] = useState<any>()
  const [filterInitData,setFilterInitData] = React.useState<any>(filter)

  const handleFold = ()=> setFold(!fold)

  let dispatch = useDispatch();
  const Data: Icombo = useSelector((state: AppState) => state.combo);
  const DataWS: Icombo = useSelector((state: AppState) => state.comboWS);
  const workspaces = useSelector((state: AppState) => state.workspaces.workspaceslist);
  const selected = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedStore" ? `${acc}${cur.split("=")[1]}` : acc, "");
  const selectedWS = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedWorkspace" ? `${acc}${cur.split("=")[1]}` : acc, "");
  const selectWorkspace = workspaces.find((elem: any) => elem.workSpaceDTO.name === selectedWS)
  const selectedStore:any = selectWorkspace?.storeList.find((element: any) => element.name === selected );
  
  
  const { taglist, loadingTags } = LoadTagsRedux(selectedStore?.id as number);

  //const [intervalId, setIntervalId] = React.useState<any>(null)
  //let count = 0;


  /*const progressTasks = (filterData:any, handleLoading:any, tagElement:any) => {
    intervalId && clearInterval(intervalId);
    const execute = () => {
      getListTask(filterData, 10,page).then((response:any)=>{
        setFilterState(filterData)
        setStateComponent(false)
        setPage(0)
        setTimeout(() => {
          setDataAction({state:true,data:response,filter:tagElement.name})
          handleLoading(false)
        }, 500);

        if (response.taskDTOList.length !== 0) {
          const isRunning = response.taskDTOList.some((task:any) => task.runningStatus === "RUNNING");
          if (!isRunning) {
            clearInterval(newIntervalId);
          }
        } else clearInterval(newIntervalId);

      }).catch((err:any)=>{
        console.log(err)
        handleLoading(false)
      })
    }

    execute();
    const newIntervalId = setInterval(execute, 5000);
    setIntervalId(newIntervalId);
  }*/

  const progressTasks = (filterData:any, handleLoading:any, tagElement:any) => {

    getListTask(filterData, 10,page).then((response:any)=>{
      setFilterState(filterData)
      setPage(0)
      setTimeout(() => {
        setStateComponent(false)
        setDataAction({state:true,data:response,filter:tagElement.name})
        handleLoading(false)
      }, 500);
    }).catch((err:any)=>{
      handleErrors(err, true, null)
      handleLoading(false)
    })
  }

  const handleSearch =async (values:any,handleLoading:any) => {

    let requestData:any = JSON.parse(JSON.stringify(values))
    setStateComponent(true)
    let tagElement:any = tagList.find((obj:any) => obj.name === values.tagId[0])
    requestData.tagId = tagElement.id
    let filterData:any = {
      "tagId": tagElement.id,
    }
    if(values.resultStatusId.length !== 0){
      let elementFound:any = ResultStatusEnum.find((obj:any)=>obj.value === values.resultStatusId[0])
      requestData.resultStatusId = elementFound.key 
    }
    if(values.runningStatusId.length !== 0){
      let elementFound:any = RunningStatusEnum.find((obj:any)=>obj.value === values.runningStatusId[0])
      filterData.runningStatusId = elementFound.key 
    }
    if(values.taskTypeIds.length !== 0){
      for (let index = 0; index < values.taskTypeIds.length; index++) {
        const element = values.taskTypeIds[index];
        let elementFound:any = TaskTypeEnum.find((obj:any)=>obj.value === element)
        requestData.taskTypeIds[index] = elementFound.key 
      }
      filterData.taskTypeIds = requestData.taskTypeIds
    }
    const now = new Date();
    const timeDifference = now.getTimezoneOffset() / 60;

    if(values.fromDate !== null){
      const fromDate = new Date(values.fromDate);
      const localFromDate = new Date(fromDate.getTime() + timeDifference * 60 * 60 * 1000);
      filterData.fromDate = localFromDate.toISOString()
    }
    if(values.toDate !== null){
      const toDate = new Date(values.toDate);
      const localToDate = new Date(toDate.getTime() + timeDifference * 60 * 60 * 1000);
      filterData.toDate = localToDate.toISOString()
    }

    progressTasks(filterData,handleLoading, tagElement)

  }

  const handlePage = (typeAction:any,value:any) =>{
    if(typeAction === "page"){
      setPage((value-1))
      getListTask(filterState,size,(value-1)).then(itemsTags => {
        setStatePage({state:true,data:itemsTags})
      })
    }else{
      setSize(value)
    }
  }
  const handleTaskLog = (taskId:any, tagName:any,handleTaskItem:any) => {
    let tagFound:any = tagList.find((obj:any)=> obj.name === selectedTag)
    if(tagFound !== undefined){
      getTaskLog(tagFound.id,taskId).then((items:any)=>{
        handleTaskItem(items) 
      }).catch((err:any)=>{
        console.log("error while getting task log")
      })
    }
  };

  useEffect(() => {
    
    let mounted = true;
    if (loadingTags && selectedStore !== undefined && mounted) {
      setStateComponent(true)
      setTagList(taglist)
    }
    return () => {
        mounted = false
    }       
  }, [loadingTags, selectedStore, taglist,Data]);


  useEffect(() => {
    if(!selectedStore){
      setCsTaskList({ pagesNumber: 0, itemNumbers: 0, taskDTOList: [] })
      setStateComponent(false)
    }
    if(!selectWorkspace){
      dispatch(loadWorkspace())
    }
  }, [selectedStore, Data, DataWS,selectWorkspace, dispatch]);

  useEffect(() => {
    if(taglist.length !== 0){
      let tagFound:any = taglist.find((element:any)=> element.name === "Latest")
      let requestData:any = {
        tagId : tagFound.id
      }

      setPage(0)
      let interFilter:any = filter
      interFilter[0].values = taglist
      setFilterInitData(interFilter)
      getListTask(requestData, 10,0).then((responseFile:any)=>{
        setFilterState(requestData)
        setTimeout(() => {
          setCsTaskList(responseFile)
          setStateComponent(false)
          setSelectedTag('Latest')
        }, 500);

      })
      .catch(function (error) {
        handleErrors(error, true, null)
        setCsTaskList({ pagesNumber: 0, itemNumbers: 0, taskDTOList: [] })
        setStateComponent(false)
      })
    }
   
  }, [taglist]);

  /*useEffect(() => {
    if(taglist.length !== 0){
      let tagFound:any = taglist.find((element:any)=> element.name === "Latest")
      let requestData:any = {
        tagId : tagFound.id
      }
      setPage(0)
      let interFilter:any = filter
      interFilter[0].values = taglist
      setFilterInitData(interFilter)

      intervalId && clearInterval(intervalId);
      const execute = () => {
        getListTask(requestData, 10,0).then((responseFile:any)=>{
          setFilterState(requestData)
          setTimeout(() => {
            setStateComponent(false)
            setCsTaskList(responseFile)
            setStateComponnent(false)
            setSelectedTag('Latest')
          }, 500);

          if (responseFile.taskDTOList.length !== 0) {
            const isRunning = responseFile.taskDTOList.some((task:any) => task.runningStatus === "RUNNING");
            if (!isRunning) {
              clearInterval(newIntervalId);
            }
          } else clearInterval(newIntervalId);
        })
      }

      execute();
      const newIntervalId = setInterval(execute, 5000);
      setIntervalId(newIntervalId);
      return () => clearInterval(newIntervalId);
    }
  }, [taglist]);*/


  useEffect(() => {
    if (dataAction.state) {
      setCsTaskList(dataAction.data)
      setDataAction({state:false,data:{csUserGroupDTOList:[],itemNumbers:0,pagesNumber:0,filter:dataAction.filter}})
      setSelectedTag(dataAction.filter)
    }
}, [dataAction]);

  useEffect(()=>{
    
  if(statePage.state){  
      setStateComponent(true)
      setCsTaskList(statePage.data);
      setTimeout(() => {
        setStateComponent(false)
        setStatePage({state:false,data:{cstagViewDTO:[],numberOfItems:0,numberOfPages:0}})
      }, 500);
  }

  
},[statePage])

  /*useEffect(() => {
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [intervalId]);*/

return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.Typography}>Task</div>
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
      <div className={classes.action}>
        <div style={{display:'flex',alignItems:'center', padding:"8px 4px"}}>
          <div style={{display:'flex',alignItems:'center',padding:0}}>
            {fold &&
                <div className={classes.unfold} style={{display: 'flex', alignItems: 'center', padding: 0, margin: 0}}>
                  <IconButton id={`btn_fold`} disabled={false} className={classes.unfold} onClick={handleFold}>
                    <UnfoldMoreIcon style={{height: 14}}/>
                  </IconButton>
                </div>
            }
            {!fold &&
                <div className={classes.unfold} style={{display: 'flex', alignItems: 'center', padding: 0, margin: 0}}>
                  <IconButton id={`btn_fold`} disabled={false} className={classes.unfold} onClick={handleFold}>
                    <UnfoldLessIcon style={{height: 14}}/>
                  </IconButton>
                </div>
            }
            <div className={classes.divider_Vertical}/>
            <div style={{display: 'flex', alignItems: 'center', marginRight: 4, marginLeft: 4, width: "auto"}}>
              <Typography>{csTaskList.itemNumbers} Items</Typography>
            </div>
          </div>

        </div>
      </div>

      <div className={classes.divider}/>
      <CsTaskList
          taskList={csTaskList}
          fold={fold}
          stateComponent={stateComponent}
          tagName={selectedTag}
          page={page}
          handlePages={handlePage}
          handleTaskLog={handleTaskLog}
      />
    </div>
);
};
export default CsTask;
