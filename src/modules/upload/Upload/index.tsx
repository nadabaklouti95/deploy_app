import jwtAxios from "app/services/auth/jwt-auth/jwt-api";
import * as React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {getUpload, LoadStorebyid, LoadTags, LoadUpload} from "redux/actions";
import {AppState} from "redux/store";
import {Icombo} from "types/models/Combo";
import AddUpload from "../AddUpload";
import UploadList from "../UploadList";
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import {ActionAccessMode, ETask, filterTypeEnum, TaskTypeId} from "shared/constants/AppEnums";
import {Icon, IconButton, Typography} from "@material-ui/core";
import useStyles from "./styles";
import {green} from "@material-ui/core/colors";
import Filter from "shared/components/Filter";
import {ResultStatusEnum, RunningStatusEnum} from "shared/constants/AppConst";
import {handleErrors} from "../../../shared/constants/HandleErrors";
import AccessButton from "shared/components/AccessButton";
import {loadWorkspace} from "../../../redux/actions/Workspace";
import { Tooltip } from "@mui/material";

interface IUpload {}

let colors = ["#bad8f3", "#f5d5ce", "#cef5e5"];
for (var i = 0; i < 100; i++) {
  colors.push("#bad8f3", "#f5d5ce", "#cef5e5");
}
const getAllContext = (arrayList:any)=>{
  let indexColor = 0;
  if(arrayList.length !== 0){
    let newResult:any = arrayList.map((element:any)=>{
      element.values = element.values.map((elementContext:any)=>{
        elementContext.color = colors[indexColor]
        indexColor++;
        return elementContext
      })
      return element
    })
    return newResult
  }else{
    return []
  }

}
let filterData =
    {
      "name": "",
      "tagId": 0,
      "taskType": ["UPLOAD"]
    }

let initialFilterFormik = {
  tagId: ['Latest'],
  resultStatusId : [],
  runningStatusId:[],
  name:""
}


let filter:any = [
  { type:filterTypeEnum.TEXT,name:'name',label:'Name',order:1,values:"",search:false,context:null},
  { type:filterTypeEnum.SELECT_ONLY_ONE,name:'tagId',label:'Tag',order:5,values:[],search:true,context:null},
  { type:filterTypeEnum.SELECT_ONE,name:'resultStatusId',label:'Result',order:5,values:ResultStatusEnum,search:false,context:null},
  { type:filterTypeEnum.SELECT_ONE,name:'runningStatusId',label:'Running Status',order:5,values:RunningStatusEnum,search:false,context:null},
]

const addColorToContext = (arrayFile:any,context:any,tags:any)=>{

  if(arrayFile.length !== 0 && context.length !== 0){
    let newContextData:any = getAllContext(context)
    arrayFile.taskDTOList.map((element:any)=>{
      //list context
      let tagElement:any = tags.find((tagElement:any)=> tagElement.id === element.fileUploadTaskDTO.tagId)
      if(tagElement !== undefined){
        element.tagName = tagElement.name
      }else{
        element.tagName = "None"
      }

      element.context = element.context.map((obj:any)=>{
        //list value
        let listContextColor:any = []
        let data:any = obj.values.map((elementValue:any)=>{
          let result:any = {color:"",value:""}
          if(elementValue === "ALL"){
            result.color = "#e57373"
            result.value = elementValue
          }else{
            let searchInContext:any = newContextData.findIndex((contxtIndexElement:any)=> contxtIndexElement.name === obj.key)
            if(searchInContext !== (-1)){
              let contextData:any = newContextData[searchInContext].values.find((contxtElement:any)=> contxtElement.value === elementValue)
              if(contextData !== undefined){result.color = contextData.color}
              else{ result.color = "#f5d5ce"}
              result.value = elementValue
            }else{
              result.color = "#bbaeae"
              result.value = elementValue
            }
          }
          listContextColor.push(result)
          elementValue = listContextColor
          return elementValue
        })
        obj.value = data[0]
        return obj
      })
      return element
    })
    return arrayFile
  }else{
    return {taskDTOList:[],numberOfPages:0}
  }

}

const Upload: React.FC<IUpload> = (props) => {
  const classes = useStyles();



  const [stateAddUpload,setStateAddUpload] = React.useState<any>(false)
  const [, setLoadingx] = React.useState(false);
  const [FileList,setFileList] = React.useState<any>({itemNumbers:0,pagesNumber:0,taskDTOList:[]})
  const [tagId,setTagId] = React.useState<any>(null)
  const [Tag] = React.useState("Latest");
  const [Datax, setDatax] = React.useState<any>([]);
  const [contextColor,setContextColor] = React.useState<any>(getAllContext(Datax))
  const [selectedid, setSelectedid] = React.useState<any>({});
  const [errorUpload,setErrorUpload] = React.useState<any>(null)
  const [tags,setTags] = React.useState<any>([])
  const [unfold,setUnfold] = React.useState<any>(false)
  const [typeAction,setTypeAction] = React.useState<any>("unfold")
  const [action,setAction] = React.useState<any>(false)
  const [loadingAdd,setLoadingAdd] = React.useState<Boolean>(false)
  const [filterFile,setFilterFile] = React.useState<any>(filterData)
  const [tagFilter,setTagFilter] = React.useState<any>("Latest")
  const [creationStatus,setCreateStatus] = React.useState<any>(false)
  const [createAction,setCreateAction] = React.useState<any>({state:false,object:[]})
  const [page,setPage] = React.useState<any>(0)
  const [size,setSize] = React.useState<any>(10)
  const [statePage,setStatePage] = React.useState<any>({state:false,data:{itemNumbers:0,pagesNumber:0,taskDTOList:[]}})
  const [stateComponent,setStateComponent] = React.useState<any>(true)
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
  
  const { context, loading } = LoadStorebyid(selectedStore?.id as number);
  const { taglist } = LoadTags(selectedStore?.id as number);
  const  { uploadLists, loadingUpload } = LoadUpload(filterData,tagId,0,10)

  const createAddForm = ()=> {setStateAddUpload(true)}


  const handleSearch =async (values:any,handleLoading:any) => {

    setStateComponent(true)
    let tagElement:any = taglist.find((obj:any) => obj.name === values.tagId[0])
    let filterData:any = {
      "tagId": tagElement.id,
      "taskTypeId": [TaskTypeId.PUBLICATION]
    }
    if(values.resultStatusId.length !== 0){
      let elementFound:any = ResultStatusEnum.find((obj:any)=>obj.value === values.resultStatusId[0])
      filterData.resultStatusId = elementFound.key
    }
    if(values.runningStatusId.length !== 0){
      let elementFound:any = RunningStatusEnum.find((obj:any)=>obj.value === values.runningStatusId[0])
      filterData.runningStatusId = elementFound.key
    }
    if(values.name.length !== 0){
      filterData.name = values.name
    }

    progressUploads(filterData,tagElement ,true, handleLoading)


  }


  const handleUpload = async (data:any) => {

    setErrorUpload([])
    let notify:any
    let URI:any = `cs-upload/upload?tagId=${data.get("fileUploadTaskDTO.tagId")}`
    setLoadingAdd(true)
    await jwtAxios.post(URI, data).then((res:any)=>{
      if (res && res.status === 201) {
        notify = (value : String) => toast.success("File is now uploaded!",{autoClose: 3000,theme :"colored" });
        toast.dismiss();
        notify(data as string);
        let tagId:any = tags.find((element:any)=>element.name === tagFilter)

        progressUploads(filterFile,tagId,false, null)

        setTimeout(() => {
          setErrorUpload(null)
          setStateAddUpload(false)
          setLoadingAdd(false)
        }, 1000);
      }
    }).catch(function (error) {
      handleErrors(error, false, setErrorUpload)
      setLoadingAdd(false)
    })
  }

  /*const progressUploads = (dataValues:any,tagElement:any, isFiltered:any, handleLoading:any) => {
    intervalId && clearInterval(intervalId);
    const execute = () => {
      getUpload(dataValues, tagElement.id, 0, 10).then((element: any) => {
        if (isFiltered) {
          setFilterFile(filterData);
          setTimeout(() => {
            setStateComponent(false)
            handleLoading(false)
          }, 500);
        }
        setCreateAction({ status: true, object: element.value });
        setCreateStatus(!creationStatus);

        if (element.value.taskDTOList.length !== 0 && count<=5) {
          if (element.value.taskDTOList[0].runningStatus !== "RUNNING" && element.value.taskDTOList[0].runningStatus !== "NEW") {
            clearInterval(newIntervalId);
          }
        } else {
          clearInterval(newIntervalId);
        }
      });
      count= count +1
    };

    execute();

    const newIntervalId = setInterval(execute, 5000);
    setIntervalId(newIntervalId);
  }*/

  const progressUploads = (dataValues:any,tagElement:any, isFiltered:any, handleLoading:any) => {
    getUpload(dataValues, tagElement.id, 0, 10).then((element: any) => {
      if (isFiltered) {
        setFilterFile(filterData);
        setTimeout(() => {
          setStateComponent(false)
          handleLoading(false)
        }, 500);
      }
      setCreateAction({ status: true, object: element.value });
      setCreateStatus(!creationStatus);
    });
  }

  const handleUnfold = ()=>{
    setUnfold(!unfold)
    setAction(true)
  }

  const handlePage = (typeAction:any,value:any) =>{
    if(typeAction === "page"){
      setPage((value-1))
      getUpload(filterFile,filterFile.tagId,(value-1),size).then((itemsTags:any) => {
        setStatePage({state:true,data:itemsTags.value})
      })
    }else{
      setSize(value)
    }
  }

  useEffect(()=>{
    if (unfold ) {
      setTypeAction("unfold")
      setAction(true)
    }else{
      setTypeAction("fold")
      setAction(false)
    }
  },[unfold])

  useEffect(() => {
    if (loading === true) {
      setLoadingx(false);
    }
    let contextSort:any = []
    if(context !== null && context!== undefined){
      contextSort = context.sort(function(element1:any, element2:any) {
        return element1.priority - element2.priority;
      })
    }
    setStateAddUpload(false)
    setDatax(contextSort);
    setContextColor(getAllContext(Datax))
    setTags(taglist)
    setTagId(tags.find((element: any) => element.name === Tag))
    setTagFilter("Latest")
    setTimeout(() => {
      setLoadingx(loading);
    }, 500);
    setSelectedid(selectedid);

  }, [context, loading, selectedid, Data, dispatch, selectedStore,Datax,taglist,Tag,tags]);

  useEffect(() => {
    if(!selectedStore){
      setFileList({ pagesNumber: 0, itemNumbers: 0, taskDTOList: [] })
      setStateComponent(false);
    }
    if(!selectWorkspace){
      dispatch(loadWorkspace())
    }
  }, [selectedStore, Data, DataWS,selectWorkspace, dispatch]);

  useEffect(() => {
    if (taglist.length !== 0) {
      let tagId: any = taglist.find((element: any) => element.name === "Latest");
      setPage(0);
      setSize(10);
      let interFilter: any = filter;
      interFilter[1].values = taglist;
      getUpload(filterData, tagId.id, 0, 10).then((response: any) => {
        setStateComponent(false);
        setFilterInitData(interFilter);
        setFileList(response.value);
      })
      .catch(function (error) {
        handleErrors(error, true, null)
        setFileList({ pagesNumber: 0, itemNumbers: 0, taskDTOList: [] })
        setStateComponent(false);
      })
    }
  }, [taglist]);

  /*useEffect(() => {
    let countInterval= 0
    let tagId: any = taglist.find((element: any) => element.name === "Latest");
    if (taglist.length !== 0) {
      setPage(0);
      setSize(10);
      let interFilter: any = filter;
      interFilter[1].values = taglist;

      intervalId && clearInterval(intervalId);
      const newIntervalId = setInterval(() => {
        getUpload(filterData, tagId.id, 0, 10).then((response: any) => {
          setStateComponent(false);
          setFilterInitData(interFilter);
          setFileList(response.value);

          if (response.value.taskDTOList.length !== 0 && countInterval<=5) {
            if (response.value.taskDTOList[0].runningStatus !== "RUNNING") {
              clearInterval(newIntervalId);
            }
          } else clearInterval(newIntervalId);
        });
        countInterval= countInterval +1
      }, 5000);
      setIntervalId(newIntervalId);
      return () => clearInterval(newIntervalId);
    }
  }, [taglist]);*/

  useEffect(()=>{
    if (tagId !== undefined && tagId !== null && loadingUpload !==false  ) {
      setFileList(uploadLists)
    }
  },[uploadLists,loadingUpload,tagId])

  useEffect(()=>{
    if(createAction.state !== false){
      setFileList(createAction.object)
    }
  },[createAction,creationStatus])



  useEffect(()=>{
    if(statePage.state){
      setFileList(statePage.data);
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
          <div className={classes.Typography}>File Import </div>
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
              taskName={ETask.UPLOAD}
              id={`add_form`} 
              actionType={ActionAccessMode.EXECUTE_MODE} 
              className={classes.boardStylekey} 
              handleClick={createAddForm}
            >
              <Icon style={{ color: green[500] }}>add_circle</Icon>
              Upload Properties
            </AccessButton>
          </div>
          <div style={{display:'flex',alignItems:'center'}}>
            {( unfold) &&
            <div className={classes.unfold} style={{display:'flex',alignItems:'center',padding:0}}>
              <Tooltip title={"Unfold"} arrow enterDelay={0} leaveDelay={100}>
                <IconButton id={`btn_fold`} className={classes.unfold} onClick={handleUnfold} >
                  <UnfoldMoreIcon style={{height:14}}/>
                </IconButton>
              </Tooltip>
            </div>
            }
            {( !unfold) &&
            <div  className={classes.unfold} style={{display:'flex',alignItems:'center',padding:0}}>
              <Tooltip title={"Fold"} arrow enterDelay={0} leaveDelay={100}>
                <IconButton id={`btn_fold`} className={classes.unfold} onClick={handleUnfold} >
                  <UnfoldLessIcon style={{height:14}} />
                </IconButton>
              </Tooltip>
            </div>
            }
            <div className={classes.divider_Vertical}/>
            <div style={{display:'flex',alignItems:'center',marginRight:8,marginLeft:8,width:"auto"}}>
              {FileList.itemNumbers !== undefined && <Typography>{FileList.itemNumbers} Items</Typography> }
            </div>
          </div>
        </div>
        <div className={classes.divider}/>
        {stateAddUpload &&
        <div style={{width:'100%',padding:4}}>
          <AddUpload
              handleUpload={handleUpload}
              CancelUpload={setStateAddUpload}
              TagList={tags}
              context={getAllContext(Datax)}
              errorAction={errorUpload}
              loading={loadingAdd}
          />
        </div>
        }
        <UploadList
            stateComponent={stateComponent}
            fileListColor={addColorToContext(FileList, contextColor, taglist)}
            fileList={FileList}
            fold={{ handleUnfold: handleUnfold, action: action, setAction: setAction, typeAction: typeAction, unfold: unfold, setUnfold: setUnfold }}
            page={page}
            handlePages={handlePage}
        />

      </div>
  );
};
export default Upload;
