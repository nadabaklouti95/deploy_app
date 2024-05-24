import * as React from "react";
import { useEffect, useState } from "react";

import ExportList from "../ExportList";
import { IExport } from "types/models/interface";

import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import ExportAdd from "../ExportAdd";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux/store";
import { exportFile, getExportedFile } from "shared/services/exportService";
import { LoadTagsRedux } from "shared/services/tagsService";
import { LoadContextByStoreId } from "shared/services/contextService";
import { Icombo } from "types/models/Combo";
import useStyles from "./styles";
import { Icon, IconButton, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { ResultStatusEnum } from "shared/constants/AppConst";
import Filter from "shared/components/Filter";
import { ActionAccessMode, ETask, filterTypeEnum } from "shared/constants/AppEnums";
import {handleErrors} from "../../../shared/constants/HandleErrors";
import AccessButton from "shared/components/AccessButton";
import {loadWorkspace} from "../../../redux/actions/Workspace";
import { Tooltip } from "@mui/material";

let filterStateInit = 
{
  "tagId": 0,
  "resultStatusId": []
}

let initialFilterFormik = {
  tagId: ['Latest'],
  resultStatusId : []
}


let filter:any = [
  { type:filterTypeEnum.SELECT_ONLY_ONE,name:'tagId',label:'Tag',order:5,values:[],search:true,context:null},
  { type:filterTypeEnum.SELECT_ONE,name:'resultStatusId',label:'Result',order:5,values:ResultStatusEnum,search:false,context:null},
]

const Export: React.FC<IExport> = (props) => {
    const classes = useStyles();

    const [ stateAddToken,setStateAddToken ] = useState<boolean>(false)
    const [unfold,setUnfold] = useState<any>(false)
    const [action,setAction] = useState<any>(false)
    const [typeAction,setTypeAction] = useState<any>("unfold")
    const [tagsList,setTagsList] = useState<any>([])
    const [loadingAdd,setLoadingAdd] = useState<any>(false)
    const [contextData,setContextData] = useState<any>([])
    const [fileExported,setFileExported] = useState<any>({taskDTOList:[],numberOfPages:0,itemNumbers:0})
    const [row,setRow] = useState<any>(10)
    const [page,setPage] = useState<any>(0)
    const [dataAction,setDataAction] = useState<any>({state:false,data:{csUserGroupDTOList:[],pagesNumber:0,itemNumbers:0}})
    const [tagFilterName,setTagFilterName] = useState<any>('Latest')
    const [filterInitData,setFilterInitData] = React.useState<any>(filter)
    const [filterState,setFilterState] = useState<any>(filterStateInit)
    const [stateComponent,setStateComponent] = useState<any>(true)
    const [statePage,setStatePage] = React.useState<any>({state:false,data:{csUserGroupDTOList:[],pagesNumber:0,itemNumbers:0}})

    let dispatch = useDispatch();
    
    const Data: Icombo = useSelector((state: AppState) => state.combo);
    const DataWS: Icombo = useSelector((state: AppState) => state.comboWS);
    const workspaces = useSelector((state: AppState) => state.workspaces.workspaceslist);
    const selected = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedStore" ? `${acc}${cur.split("=")[1]}` : acc, "");
    const selectedWS = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedWorkspace" ? `${acc}${cur.split("=")[1]}` : acc, "");
    const selectWorkspace = workspaces.find((elem: any) => elem.workSpaceDTO.name === selectedWS)
    const selectedStore:any = selectWorkspace?.storeList.find((element: any) => element.name === selected );
  
    const { context, loadingContext }= LoadContextByStoreId(selectedStore?.id as number);
    const { taglist, loadingTags } = LoadTagsRedux(selectedStore?.id as number);

    const createAddForm = ()=> {setStateAddToken(true)}  
    const cancelAddForm = () => setStateAddToken(false)
    const handleAdd = (value:any,fileName:any,handleError:any) =>{

        setLoadingAdd(true)
        let requestData:any = value
        let tagFound = tagsList.find((element:any)=>element.name === value.fileExportTaskDTO.tagId)
        if(tagFound !== undefined){
            requestData.fileExportTaskDTO.tagId = tagFound.id
            exportFile(requestData,fileName).then((res:any)=>{
                if(res === 200 || res === 201){
                    setStateAddToken(false)
                    setTimeout(() => {
                        setLoadingAdd(false)
                        getExportedFile(filterState, row,page).then((items:any)=>{
                            setTimeout(() => {
                                setDataAction({state:true,data:items})
                                setStateComponent(false)
                                
                              }, 500);
                            
                            
                        }).catch((error)=>{
                            console.log(error)
                        })
                    }, 500);
                }
            }).catch((error)=>{
                setLoadingAdd(false)
                handleErrors(error, false, handleError)

            })
        }
        
    }
    
    

    const handleSearch =async (values:any,handleLoading:any) => {
        setStateComponent(true)
        let tagElement:any = taglist.find((obj:any) => obj.name === values.tagId[0])
        let filterData:any = {
          "tagId": tagElement.id,
        }
        if(values.resultStatusId.length !== 0){
          let elementFound:any = ResultStatusEnum.find((obj:any)=>obj.value === values.resultStatusId[0])
          filterData.resultStatusId = elementFound.key 
        }
        setStateComponent(true)

        return await getExportedFile(filterData,10,0).then((items:any)=>{
            setPage(0)
            setRow(10)
            setFilterState(filterData)
            handleLoading(false)
            setStatePage({state:true,data:items})
        }).catch((error)=>{
            setStateComponent(false)
            handleErrors(error, true, null)
        })
        
      }

      const handlePage = (typeAction:any,value:any) =>{
        if(typeAction === "page"){
          setPage((value-1))
          getExportedFile(filterState,row,(value-1)).then((itemsTags:any) => {
            setPage(value)
            setRow(10)
            setStatePage({state:true,data:itemsTags})
          })
        }else{
          setRow(value)
        }
      }
    const handleUnfold = ()=>{
        setUnfold(!unfold)
        setAction(true)
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
        let mounted = true;
        if (loadingContext && loadingTags && selectedStore !== undefined && mounted) {
            setContextData(context);
            setStateAddToken(false)
            setTagsList(taglist)
        }  
        return () => {
            mounted = false
        }       
      }, [context, selectedStore, Data, dispatch,loadingContext, loadingTags, taglist,stateComponent]);

      useEffect(() => {           
            if (dataAction.state) {   
                setFileExported(dataAction.data)
                setDataAction({state:false,data:{csUserGroupDTOList:[],pagesNumber:0}})
                
            }
      }, [dataAction]);

      useEffect(() => {
        if(selectWorkspace) {
          if (selectedStore && tagsList.length !== 0) {
            let tagFound:any = tagsList.find((element:any)=> element.name === "Latest")
            let requestData:any = {
              tagId : tagFound.id
            }
            setStateComponent(true)
            let interFilter:any = filter
            interFilter[0].values = tagsList
            setFilterInitData(interFilter)
            setPage(0)
            setRow(10)
            getExportedFile(requestData, 10,0).then((responseFile:any)=>{
              setStateComponent(false)
              setFilterState(requestData)
              setFileExported(responseFile)
              setTagFilterName('Latest')
            })
          } else {
            setStateComponent(false)
            setFileExported({ pagesNumber: 0, itemNumbers: 0, taskDTOList: [] })
          }
        } else {
          dispatch(loadWorkspace())
        }  
      }, [tagsList,selectedStore,DataWS, Data, selectWorkspace, dispatch]);

      useEffect(()=>{
        if(statePage.state){  
          setFileExported(statePage.data);
          setTimeout(() => {
            

            setStatePage({state:false,data:{csUserGroupDTOList:[],pagesNumber:0,itemNumbers:0}})
            setStateComponent(false)
          }, 500);
        }
      },[statePage])
      

    return (
        <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.Typography}>Export</div>
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
            taskName={ETask.EXPORT}
            id={`add_form`} 
            actionType={ActionAccessMode.EXECUTE_MODE} 
            className={classes.boardStylekey} 
            handleClick={createAddForm}
          >
            <Icon style={{ color: green[500] }}>add_circle</Icon>
            Export Store
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
            {fileExported.itemNumbers !== undefined && <Typography>{fileExported.itemNumbers} Items</Typography> }
          </div>
        </div>
      </div>
      <div className={classes.divider}/>
      {stateAddToken &&
        <div style={{width:'100%',padding:4}}>
          <ExportAdd store={selectedStore} tags={tagsList} loading={loadingAdd} context={contextData} action={{add:handleAdd,cancel:cancelAddForm}} />
        </div>
      }
        <ExportList 
            tagName={tagFilterName}
            ExportList={fileExported}
            loading={stateComponent}
            handlePagination={handlePage}
            row={row} page={page}
            fold={{
                handleUnfold: handleUnfold,
                action: action,
                setAction: setAction,
                typeAction: typeAction,
                unfold: unfold,
                setUnfold: setUnfold
            }}                
        />
      
    </div>
    );
  
};

export default Export;
