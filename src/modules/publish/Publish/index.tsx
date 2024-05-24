
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterPublish, getPublishList, LoadTags } from "redux/actions";
import { AppState } from "redux/store";
import { Icombo } from "types/models/Combo";
import PublishAdd from "../PublishAdd";
import PublishList from "../PublishList";
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import jwtAxios from "app/services/auth/jwt-auth/jwt-api";
import { ActionAccessMode, ETask, filterTypeEnum, TaskTypeId } from "shared/constants/AppEnums";
import useStyles from "./styles";
import Filter from "shared/components/Filter";
import { Icon, IconButton, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { ResultStatusEnum, RunningStatusEnum } from "shared/constants/AppConst";
import {handleErrors} from "../../../shared/constants/HandleErrors";
import AccessButton from "shared/components/AccessButton";
import {loadWorkspace} from "../../../redux/actions/Workspace";
import { Tooltip } from "@mui/material";

interface IPublish {
}


let filter:any = [
  { type:filterTypeEnum.SELECT_ONLY_ONE,name:'tagId',label:'Tag',order:1,values:[],search:true,context:null},
  { type:filterTypeEnum.SELECT_ONE,name:'resultStatusId',label:'Result',order:2,values:ResultStatusEnum,search:false,context:null},
  { type:filterTypeEnum.SELECT_ONE,name:'runningStatusId',label:'Running Status',order:3,values:RunningStatusEnum,search:false,context:null},
  { type:filterTypeEnum.DATE_RANGE,name:'date',label:'Date',order:4,values:[null,null],search:false,context:null}
]

let initialFilterFormik = {
  tagId: ['Latest'],
  resultStatusId : [],
  runningStatusId:[],
  from:null,
  to:null
}


const Publish: React.FC<IPublish> = (props) => {
  const classes = useStyles();


  const [ stateAddPublish,setStateAddPublish ] = React.useState<boolean>(false)
  const [tags,setTags] = React.useState<any>([])
  const [errorPublish,setErrorPublish] = React.useState<any>(null)
  const [loadingAdd,setLoadingAdd] = React.useState<Boolean>(false)
  const [unfold,setUnfold] = React.useState<any>(false)
  const [action,setAction] = React.useState<any>(false)
  const [typeAction,setTypeAction] = React.useState<any>("unfold")
  const [publishedPropertiesList,setPublishedPropertiesList] = React.useState<any>({pagesNumber:0,itemNumbers:0,taskDTOList:[]})
  const [stateCreate,setStateCreate] = React.useState<any>(false)
  const [createData,setCreateData]= React.useState<any>({state:false,object:[]})
  const [typeStore,setTypeStore] = React.useState<any>("")
  const [page,setPage] = React.useState<any>(0)
  const [size,setSize] = React.useState<any>(10)
  const [filterState,setFilterState] = React.useState<any>()
  const [statePage,setStatePage] = React.useState<any>({state:false,data:{numberOfPages:0,taskDTOList:[]}})
  const [stateComponent,setStateComponent] = React.useState<any>(true)
  const [TagName,setTagName] = React.useState<any>("Latest")
  const [filterInitData,setFilterInitData] = React.useState<any>(filter)
  /*const [intervalId, setIntervalId] = React.useState<any>(null)
  let count = 0;*/


  let dispatch = useDispatch();
  const Data: Icombo = useSelector((state: AppState) => state.combo);
  const DataWS: Icombo = useSelector((state: AppState) => state.comboWS);
  const workspaces = useSelector((state: AppState) => state.workspaces.workspaceslist);
  const selected = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedStore" ? `${acc}${cur.split("=")[1]}` : acc, "");
  const selectedWS = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedWorkspace" ? `${acc}${cur.split("=")[1]}` : acc, "");
  const selectWorkspace = workspaces.find((elem: any) => elem.workSpaceDTO.name === selectedWS)
  const selectedStore:any = selectWorkspace?.storeList.find((element: any) => element.name === selected );
  
  const { taglist } = LoadTags(selectedStore?.id as number);

  const createAddForm = ()=> {setStateAddPublish(true)}


  const handlePublish= async (requestData:any,tag:any)=>{
    setLoadingAdd(true)
    let tagId:any = taglist.find((element:any)=>element.name === tag)
    if(tagId !== undefined){
      requestData.publishPropertyTaskDTO.tagId = tagId.id
      return await jwtAxios.post<any>(`/cs-publication/publish-properties?tagId=${tagId.id}`,requestData).then(async (response:any)=>{
        let tagFilter:any = taglist.find((element:any)=> element.name === TagName )

        progressTasks (null,tagFilter,null, false)


      }).catch(function (error) {
        setLoadingAdd(false)
        handleErrors(error,false,setErrorPublish)
      })
    }}



  const handleUnfold = ()=>{
    setUnfold(!unfold)
    setAction(true)
  }
  const handlePage = (typeAction:any,value:any) =>{
    if(typeAction === "page"){
      setPage((value-1))
      FilterPublish(filterState,(value-1),size).then((itemsTags:any) => {
        setStatePage({state:true,data:itemsTags.value})
      })
    }else{
      setSize(value)
    }
  }

  const progressTasks = (filterData:any,tagElement:any,handleLoading:any, isFiltered:any) => {
    if (isFiltered) {
      setPage(0)
      setStateCreate(!stateCreate)
      setStateComponent(true)
      FilterPublish(filterData,0,10).then((element:any)=>{
        setFilterState(filterData)
        setCreateData({status:true,object:element.value})
        setTimeout(() => {
          setTagName(tagElement.name)
          setStateComponent(false)
          handleLoading(false)
        }, 500);
      })
    }
    else {
      getPublishList(tagElement.id,page,10).then((element:any)=>{
        setCreateData({status:true,object:element.value})
        setStateCreate(!stateCreate)
        setTimeout(() => {
          setErrorPublish(null)
          setStateAddPublish(false)
          setLoadingAdd(false)
        }, 500);
      })
    }
  }

 /* const progressTasks = (filterData:any,tagElement:any,handleLoading:any, isFiltered:any) => {
    intervalId && clearInterval(intervalId);
    let execute;

    if (isFiltered) {
      setPage(0)
      setStateCreate(!stateCreate)
      setStateComponent(true)
      execute = () => {
        FilterPublish(filterData,0,10).then((element:any)=>{
          setFilterState(filterData)
          setCreateData({status:true,object:element.value})
          setTimeout(() => {
            setTagName(tagElement.name)
            setStateComponent(false)
            handleLoading(false)
          }, 500);
          if (element.value.taskDTOList.length !== 0 && count<=5) {
            const isRunning = element.value.taskDTOList.some((task:any) => task.runningStatus === "RUNNING");
            if (!isRunning) {
              clearInterval(newIntervalId);
            }
          } else clearInterval(newIntervalId);
        })
        count= count +1
      }
    }
    else {
      execute = () => {
        getPublishList(tagElement.id,page,10).then((element:any)=>{
          setCreateData({status:true,object:element.value})
          setStateCreate(!stateCreate)
          setTimeout(() => {
            setErrorPublish(null)
            setStateAddPublish(false)
            setLoadingAdd(false)
          }, 500);
          if (element.value.taskDTOList.length !== 0 && count<=5) {
            const isRunning = element.value.taskDTOList.some((task:any) => (task.runningStatus === "RUNNING" || task.runningStatus === "NEW"));
            if (!isRunning) {
              clearInterval(newIntervalId);
            }
          } else clearInterval(newIntervalId);

        })
        count= count +1
      }
    }
    execute();
    const newIntervalId = setInterval(execute, 5000);
    setIntervalId(newIntervalId);
}*/

  const handleSearch =async (values:any,handleLoading:any) => {
    setStateComponent(true)
    let tagElement:any = taglist.find((obj:any) => obj.name === values.tagId[0])
    let filterData:any = {
      "tagId": tagElement.id,
      "taskTypeId": [TaskTypeId.PUBLICATION],
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

    progressTasks (filterData,tagElement,handleLoading, true)

  }

  useEffect(() => {
    setTags(taglist)
    setTagName("Latest")
    setStateAddPublish(false)

    if (selectedStore !== undefined) {
      setTypeStore(selectedStore.type)
    }
  }, [ Data, dispatch, selectedStore,taglist,tags]);

  useEffect(() => {
    if(selectWorkspace){

      if(selectedStore){
        let tagId:any = taglist.find((element:any)=> element.name === "Latest" )
        if(taglist.length !== 0){
          let filterData = {
            "tagId": tagId.id,
            "taskTypeId": [TaskTypeId.PUBLICATION]
          }
          let interFilter:any = filter
          interFilter[0].values = taglist
          setFilterState(filterData)
          setFilterInitData(interFilter)
          getPublishList(tagId.id,0,10).then((response:any)=>{
            setStateComponent(false)
            setPublishedPropertiesList(response.value)
  
          }).catch(function (error) {
            console.log(error)
          })
        }
      } else {
        setStateComponent(false)
        setPublishedPropertiesList({pagesNumber:0,itemNumbers:0,taskDTOList:[]})
      }

    } else {
      dispatch(loadWorkspace())

    }

  }, [taglist, DataWS, selectedStore, Data, selectWorkspace, dispatch ]);


  /*useEffect(() => {
    let countInterval= 0
    let tagId:any = taglist.find((element:any)=> element.name === "Latest" )
    if(taglist.length !== 0){
      let filterData = {
        "tagId": tagId.id,
        "taskTypeId": [TaskTypeId.PUBLICATION]
      }
      let interFilter:any = filter
      interFilter[0].values = taglist
      setFilterState(filterData)
      setFilterInitData(interFilter)

      intervalId && clearInterval(intervalId);
      const execute = () => {
        getPublishList(tagId.id,0,10).then((response:any)=>{
          setStateComponent(false)
          setPublishedPropertiesList(response.value)

          if (response.value.taskDTOList.length !== 0 && countInterval<=5) {
            const isRunning = response.value.taskDTOList.some((task:any) => task.runningStatus === "RUNNING");
            if (!isRunning) {
              clearInterval(newIntervalId);
            }
          } else clearInterval(newIntervalId);

        }).catch(function (error) {
          console.log(error)
        })
        countInterval= countInterval +1
      }
      execute();
      const newIntervalId = setInterval(execute, 5000);
      setIntervalId(newIntervalId);
      return () => clearInterval(newIntervalId);
    }

  }, [taglist]);*/

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
      setPublishedPropertiesList(createData.object)
    }
  },[createData,stateCreate])

  useEffect(()=>{
    if(statePage.state){
      setPublishedPropertiesList(statePage.data);
      setTimeout(() => {
        setStatePage({state:false,data:{numberOfPages:0,taskDTOList:[]}})
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
          <div className={classes.Typography}>Publish</div>
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
              taskName={ETask.PUBLISH}
              id={`add_form`} 
              actionType={ActionAccessMode.EXECUTE_MODE} 
              className={classes.boardStylekey} 
              handleClick={createAddForm}
            >
              <Icon style={{ color: green[500] }}>add_circle</Icon>
              Add new Publication
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
              {publishedPropertiesList.itemNumbers !== undefined && <Typography>{publishedPropertiesList.itemNumbers} Items</Typography> }
            </div>
          </div>
        </div>
        <div className={classes.divider}/>
        {stateAddPublish &&
        <div style={{width:'100%',padding:4}}>
          <PublishAdd
              tagList={tags}
              errorAction={{ value: errorPublish, action: setErrorPublish }}
              loading={loadingAdd}
              handlePublish={handlePublish}
              cancelPublish={setStateAddPublish}
              storeType={typeStore}
          />
        </div>
        }
        <PublishList
            stateComponent={stateComponent}
            tagName={TagName}
            publishedList={publishedPropertiesList}
            fold={{ handleUnfold: handleUnfold, action: action, setAction: setAction, typeAction: typeAction, unfold: unfold, setUnfold: setUnfold }}
            page={page}
            handlePages={handlePage}
        />

      </div>
  );

};

export default Publish;
