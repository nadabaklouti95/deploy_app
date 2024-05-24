
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
import {getListTaskAdmin} from "shared/services/taskService";
import { ResultStatusEnum, RunningStatusEnum, TaskTypeEnum } from "shared/constants/AppConst";
import { filterTypeEnum } from "shared/constants/AppEnums";
import CsTaskAdminList from "../CStaskAdminList";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CsTaskAdminFilter from "../CsTaskAdminFilter";
import {loadWorkspace} from "../../../redux/actions/Workspace";
import { handleErrors } from "shared/constants/HandleErrors";

interface ICsTaskAdmin {
} 


let filter:any = [
  { type:filterTypeEnum.SELECT_ONE,name:'resultStatusId',label:'Result',order:2,values:ResultStatusEnum,search:false,context:null},
  { type:filterTypeEnum.SELECT_ONE,name:'runningStatusId',label:'Running Status',order:3,values:RunningStatusEnum,search:false,context:null},
  { type:filterTypeEnum.SELECT_MULTI,name:'taskTypeIds',label:'Task Type',order:3,values:TaskTypeEnum,search:false,context:null},
  { type:filterTypeEnum.DATE_RANGE,name:'date',label:'Date',order:4,values:[null,null],search:false,context:null}
]

let initialFilterFormik = {
  tagId: [],
  resultStatusId : [],
  runningStatusId:[],
  taskTypeIds:[],
  fromDate:null,
  toDate:null,
  storeId:[]
}


const CsTaskAdmin: React.FC<ICsTaskAdmin> = (props) => {
  const classes = useStyles();
  const [fold,setFold] = useState<Boolean>(false)
  const [tagList,setTagList] = useState<any>([])
  const [csTaskList,setCsTaskList] = useState<any>([])
  const [dataAction,setDataAction] = useState<any>({state:false,data:{taskDTOList:[],itemNumbers:0,pagesNumber:0},filter:"Latest"})
  const [page,setPage] = useState<any>(0)
  const [size,setSize] = useState<any>(10)
  const [statePage,setStatePage] = useState<any>({state:false,data:{taskDTOList:[],itemNumbers:0,pagesNumber:0}})
  const [filterState,setFilterState] = useState<any>()
  const [filterInitData,setFilterInitData] = React.useState<any>(filter)
  const [stateComponent,setStateComponent] = React.useState<any>(true)
  const [filterFormik,setFilterFormik] = React.useState<any>(initialFilterFormik)
  const [selectedTag,setSelectedTag] = useState<any>('Latest')


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

  const progressTasks = (filterData:any, handleLoading:any) => {

    getListTaskAdmin(filterData, 10,page).then((response:any)=>{
      setFilterState(filterData)
      setStateComponent(false)
      setPage(0)
      setTimeout(() => {
        setDataAction({state:true,data:response})
        handleLoading(false)
      }, 500);
    }).catch((err:any)=>{
        handleLoading(false)
      })
    }

 /*const progressTasks = (filterData:any, handleLoading:any) => {
    intervalId && clearInterval(intervalId);
    const execute = () => {
      getListTaskAdmin(filterData, 10,page).then((response:any)=>{
        setFilterState(filterData)
        setStateComponent(false)
        setPage(0)
        setTimeout(() => {
          setDataAction({state:true,data:response})
          handleLoading(false)
        }, 500);

        if (response.taskDTOList.length !== 0 && count<=5) {
          const isRunning = response.taskDTOList.some((task:any) => task.runningStatus === "RUNNING");
          if (!isRunning) {
            clearInterval(newIntervalId);
          }
        } else clearInterval(newIntervalId);

      }).catch((err:any)=>{
        handleLoading(false)
      })
      count= count +1
    }

    execute();
    const newIntervalId = setInterval(execute, 5000);
    setIntervalId(newIntervalId);
  }*/

  const handleSearch =async (values:any,handleLoading:any) => {
    let requestData:any = JSON.parse(JSON.stringify(values))
    setStateComponent(true)
    let filterData:any = {
      tagIdList:[],
    }
    if(values.tagId.length !== 0){
      filterData.tagIdList = values.tagId
    }
    if(values.storeId.length !== 0){
      filterData.storeId = values.storeId[0]
    }
    if(values.runningStatusId.length !== 0){
      let elementFound:any = RunningStatusEnum.find((obj:any)=>obj.value === values.runningStatusId[0])
      filterData.runningStatusId = elementFound.key 
    }
    if(values.resultStatusId.length !== 0){
      let elementFound:any = ResultStatusEnum.find((obj:any)=>obj.value === values.resultStatusId[0])
      filterData.resultStatusId = elementFound.key 
    }
    if(values.taskTypeIds.length !== 0){
      for (let index = 0; index < values.taskTypeIds.length; index++) {
        const element = values.taskTypeIds[index];
        let elementFound:any = TaskTypeEnum.find((obj:any)=>obj.value === element)
        requestData.taskTypeIds[index] = elementFound.key 
      }
      filterData.taskTypeIds = requestData.taskTypeIds
    }
    if(values.fromDate !== null){
      filterData.fromDate = values.fromDate
    }
    if(values.toDate !== null){
      filterData.toDate = values.toDate
    }

    progressTasks(filterData,handleLoading)

  }

  const handlePage = (typeAction:any,value:any) =>{
    if(typeAction === "page"){
      setPage((value-1))
      getListTaskAdmin(filterState,size,(value-1)).then((itemsTags: any) => {
        setStatePage({state:true,data:itemsTags})
      })
    }else{
      setSize(value)
    }
  }


  useEffect(() => {
    
    let mounted = true;
    if (loadingTags && selectedStore !== undefined && mounted) {
      setTagList(taglist)
    }  
    return () => {
        mounted = false
    }       
  }, [loadingTags, selectedStore, taglist,Data]);

  useEffect(() => {
    if(!selectWorkspace){
      dispatch(loadWorkspace())
    }
  }, [selectWorkspace, dispatch, DataWS]);


  useEffect(() => {
    if(selectedStore){
      if(taglist.length !== 0){
        let requestData:any = {
          tagIdList:[],
          storeId:selectedStore.id,
        }
        let interFilter:any = initialFilterFormik
        interFilter['storeId'] = [selectedStore?.id]
        setFilterFormik(interFilter)
        setPage(0)
        setFilterInitData(filter)
        setStateComponent(true)
        getListTaskAdmin(requestData, 10,0).then((responseFile:any)=>{
          setFilterState(requestData)
          setStateComponent(false)
          setCsTaskList(responseFile)
          setSelectedTag('Latest')
        })
        .catch(function (error) {
          handleErrors(error, true, null)
          setCsTaskList({ pagesNumber: 0, itemNumbers: 0, taskDTOList: [] })
          setStateComponent(false)
        })
      }
    } else {
      setCsTaskList({ pagesNumber: 0, itemNumbers: 0, taskDTOList: [] })
      setStateComponent(false)
    }
    
  }, [taglist, selectedStore]);

  /*useEffect(() => {
    let countInterval = 0
    if(taglist.length !== 0){
      let tagFound:any = taglist.find((element:any)=> element.name === "Latest")
      let requestData:any = {
        tagId : tagFound.id
      }
      let interFilter:any = initialFilterFormik
      interFilter['storeId'] = [selectedId?.id]
      setFilterFormik(interFilter)
      setPage(0)
      setFilterInitData(filter)


      intervalId && clearInterval(intervalId);
      const execute = () => {
        getListTaskAdmin(requestData, 10,0).then((responseFile:any)=>{
          setFilterState(requestData)
          setTimeout(() => {
            setStateComponent(false)
            setCsTaskList(responseFile)
            setStateComponnent(false)
            setSelectedTag('Latest')
          }, 500);

          if (responseFile.taskDTOList.length !== 0 && countInterval<=5) {
            const isRunning = responseFile.taskDTOList.some((task:any) => task.runningStatus === "RUNNING");
            if (!isRunning) {
              clearInterval(newIntervalId);
            }
          } else clearInterval(newIntervalId);
        })
        countInterval= countInterval +1
      }

      execute();
      const newIntervalId = setInterval(execute, 5000);
      setIntervalId(newIntervalId);
      return () => clearInterval(newIntervalId);
    }
  }, [selectedId?.id, taglist]);*/

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


 /* useEffect(() => {
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [intervalId]);*/
  
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.Typography}>
          <Breadcrumbs
            className={classes.breadCrumbs}
            separator={<NavigateNextIcon fontSize="small" style={{marginLeft:0,marginRight:0}}/>}
            aria-label="breadcrumb"
          >
            <div className={classes.Typography}>
              Tasks
            </div>,
            <div className={classes.Typography}>
              Task Admin
            </div>
          </Breadcrumbs>
        </div>
      </div>
      <div className={classes.divider}/>
      <div className={classes.filter}>
        <CsTaskAdminFilter
          handleSearch={handleSearch} 
          stateFilter={filterFormik} 
          filterData={filterInitData}
          stateComponent={stateComponent}
          storeList={selectedStore?selectWorkspace?.storeList:[]}
          tagList={tagList} 
          resetForm={JSON.parse(JSON.stringify(initialFilterFormik))} 
          disabled={!selectedStore}
        />
      </div> 
      <div className={classes.divider}/>
      <div className={classes.action}>
        <div style={{display:'flex',alignItems:'center', padding:"8px 4px"}}>
          <div style={{display: 'flex', alignItems: 'center', padding: 0}}>
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

      <CsTaskAdminList
          taskList={csTaskList}
          fold={fold}
          stateComponnent={stateComponent}
          tagName={selectedTag}
          page={page}
            handlePages={handlePage}
        />
    </div>
    );
};
export default CsTaskAdmin;
