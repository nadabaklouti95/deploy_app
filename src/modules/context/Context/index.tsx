import * as React from "react";
import {useEffect, useState} from "react";
import ContextList from "../ContextList";
import {IContext} from "types/interfaces/ContextInterface";
import useStyles from "./styles";
import {Badge, Icon, IconButton, Typography} from "@material-ui/core";
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import {green} from "@material-ui/core/colors";
import {contextKey} from "_helpers";
import {ActionAccessMode, ActionMode, ETask, TaskTypeId} from "shared/constants/AppEnums";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "redux/store";
import {loadStoreCombo} from "redux/actions";
import {Icombo} from "types/models/Combo";
import {
  createContextKeyValue,
  deleteContextKey,
  getContextByStoreId,
  updateContext,
  updateContextKey,
  updateContextValue,
  updatePriority
} from "shared/services/contextService";
import ContextAdd from "../ContextAdd";
import ReplayIcon from '@mui/icons-material/Replay';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {handleErrors} from "shared/constants/HandleErrors";
import AccessButton from "shared/components/AccessButton";
import {loadWorkspace} from "redux/actions/Workspace";
import { Tooltip } from "@mui/material";


const Context: React.FC<IContext> = (props) => {
  const classes = useStyles();
  const [fold,setFold] = useState<Boolean>(false)
  const [newContextState,setNewContextState] = React.useState<any>(false)
  const [stateComponent,setStateComponent] = useState<any>(true)
  const [contextList,setContextList] = useState<any>([])
  const [dataAction,setDataAction] = useState<any>({state:false,data:[]})
  const [updateContextState,setUpdateContextState] = useState<any>(false)


  let dispatch = useDispatch();
  
  const Data: Icombo = useSelector((state: AppState) => state.combo);
  const DataWS: Icombo = useSelector((state: AppState) => state.comboWS);
  const workspaces = useSelector((state: AppState) => state.workspaces.workspaceslist);
  const selected = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedStore" ? `${acc}${cur.split("=")[1]}` : acc, "");
  const selectedWS = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedWorkspace" ? `${acc}${cur.split("=")[1]}` : acc, "");
  const selectWorkspace = workspaces.find((elem: any) => elem.workSpaceDTO.name === selectedWS)
  const selectedStore:any = selectWorkspace?.storeList.find((element: any) => element.name === selected );


  const addForm = () =>{
    setNewContextState(true)
  }

  const handleKey = async (actionType:ActionMode,value:any,handleLoading:any,handleError:any) =>{
    if(actionType === ActionMode.DELETE_MODE){
      await deleteContextKey(value,selectedStore.id).then(async (items) => {
        if(items.storeDirtyContext){
          let storeList: any = selectWorkspace?.storeList
          let indexStore = storeList.findIndex((obj:any)=> obj.id === selectedStore.id)
          storeList[indexStore].dirtyContext = true
          dispatch(loadStoreCombo(storeList))
        }
        await getContextByStoreId(selectedStore?.id)
            .then(items => {
              setStateComponent(true)
              setDataAction({state:true,data:items})
              setTimeout(() => {
                setStateComponent(false)
              }, 500);
            })
      }).catch(function (error) {
        handleErrors(error, true, null)

      })
    }
    if(actionType === ActionMode.EDIT_MODE){
      await updateContextKey(value,selectedStore.id).then(async (result:any)=>{
        handleLoading(true)
        setTimeout(() => {
          let contextListInit:any = JSON.parse(JSON.stringify(contextList))
          let indexElement = contextListInit.findIndex((obj:any)=> obj.id === value.id)
          contextListInit[indexElement].name = value.name
          contextListInit[indexElement].description = value.description
          setDataAction({state:true,data:contextListInit})
          handleLoading(false)
        }, 500);

      }).catch(function (error) {
        handleLoading(false)
        handleErrors(error, false, handleError)

      })
    }
    if(actionType === ActionMode.UPDATE_VALUE_MODE){
      await updateContextValue(value,selectedStore.id).then(async (response:any)=>{
        if(response.storeDirtyContext){
          let storeList: any = selectWorkspace?.storeList
          let indexStore = storeList.findIndex((obj:any)=> obj.id === selectedStore.id)
          storeList[indexStore].dirtyContext = true
          dispatch(loadStoreCombo(storeList))
        }
        handleLoading(true)
        setTimeout(() => {
          let contextListInit:any = JSON.parse(JSON.stringify(contextList))
          let indexElement = contextListInit.findIndex((obj:any)=> obj.id === value.keyId)
          contextListInit[indexElement].values = response.values
          setDataAction({state:true,data:contextListInit})
          handleLoading(false)
        }, 500);

      }).catch(function (error) {
        handleLoading(false)
        handleErrors(error, false, handleError)
      })
    }
    if(actionType === ActionMode.CREATION_MODE){
      await createContextKeyValue(value).then(async (items) => {
        setNewContextState(false)
        if(items.storeDirtyContext){
          let storeList: any = selectWorkspace?.storeList
          let indexStore = storeList.findIndex((obj:any)=> obj.id === selectedStore.id)
          storeList[indexStore].dirtyContext = true
          dispatch(loadStoreCombo(storeList))
        }
        await getContextByStoreId(selectedStore?.id)
            .then(items => {
              setStateComponent(true)
              setDataAction({state:true,data:items})
              handleLoading(false)
              setTimeout(() => {
                setStateComponent(false)
              }, 500);
            })
      }).catch(function (error) {
        handleLoading(false)
        handleErrors(error, false, handleError)

      })
    }
    if(actionType === ActionMode.UPDATE_PRIORITY){
      let requestedData:any = {
        keyIdList:[],
        storeId:selectedStore?.id
      }
      let array:any = value;
      requestedData.keyIdList = array.map((obj:any) =>{
        return obj.id
      })
      await updatePriority(requestedData).then(async (items) => {
        await getContextByStoreId(selectedStore?.id)
            .then(items => {
              setStateComponent(true)
              setDataAction({state:true,data:items})
              setTimeout(() => {
                setStateComponent(false)
              }, 500);
            })
      }).catch(function (error) {
        handleErrors(error, true, null)

      })
    }
  }

  const handleUpdateContext = async () => {
    setUpdateContextState(true)

    let requestData:any = {
      "updateContextTaskDTO":{
        "storeId":selectedStore?.id
      },
      "typeId":TaskTypeId.UPDATE_CONTEXT
    }

    await updateContext(requestData)
        .then(items => {

          setTimeout(() => {
            let storeList: any = selectWorkspace?.storeList
            let indexStore = storeList.findIndex((obj: any) => obj.id === selectedStore.id)
            storeList[indexStore].dirtyContext = null
            dispatch(loadStoreCombo(storeList))
            setUpdateContextState(false)
          }, 3000);



        }).catch(function (error) {
          handleErrors(error, true, null)
          let msg = "Context already updated"
          let errorMsg :any= error.response.data.errors[0];
          if(errorMsg===msg){
            let storeList: any = selectWorkspace?.storeList
            let indexStore = storeList.findIndex((obj:any)=> obj.id === selectedStore.id)
            storeList[indexStore].dirtyContext = null
            dispatch(loadStoreCombo(storeList))
          }
        })


  }
  const handleFold = ()=> setFold(!fold)

  useEffect(() => {
    if(selectWorkspace){
      setNewContextState(false)
      setStateComponent(true)
      setContextList([])
      if(selectedStore !== undefined ){
        getContextByStoreId(selectedStore?.id)
          .then(items => {
              setTimeout(() => {
                setStateComponent(false)
                setContextList(items)
            }, 300);

          })
      } else setStateComponent(false)
      

    } else {
      dispatch(loadWorkspace())
    }

  }, [selectedStore,dispatch,Data, DataWS, selectWorkspace]);


  useEffect(() => {
    if(dataAction.state){
      setContextList(dataAction.data)
      setDataAction({state:false,data:[]})
    }
  }, [dataAction])

  return (
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.Typography}>Context</div>
        </div>
        <div className={classes.divider}/>
        <div className={classes.action}  >
          <div className={classes.add_key_content}>
            <AccessButton
              disabled={!selectedStore}
              id={"add_new_key"} 
              actionType={ActionAccessMode.WRITE_MODE} 
              className={classes.boardStylekey} 
              handleClick={addForm}
            >
              <Icon style={{ color: green[500] }}>add_circle</Icon>
                Add New Context
            </AccessButton>
            
          </div>
          <div className={classes.update_context_container}>

            <div className={classes.update_context_content}>
              <div  className={`${classes.btn_updateContext} ${classes.btn_updateContext_content}`} >
                    {selectedStore?.dirtyContext === true?
                        <Badge className={classes.badge} badgeContent={<ReportProblemIcon  style={{color:'#ef5350',width:20,height:20}}/>} overlap="rectangular">
                          <AccessButton 
                            taskName={ETask.UPDATE_CONTEXT}
                            actionType={ActionAccessMode.EXECUTE_MODE} 
                            style={{margin:0}} 
                            disabled={(updateContextState || selectedStore?.dirtyContext !== true)} 
                            id={`btn_updateContext`} 
                            className={classes.btn_updateContext} 
                            handleClick={handleUpdateContext}
                            tooltip={"UPDATE CONTEXT"}
                            iconButton={true}
                          >
                            <ReplayIcon style={{height:14}}/>
                          </AccessButton>
                        </Badge> :
                          <AccessButton 
                            taskName={ETask.UPDATE_CONTEXT}
                            actionType={ActionAccessMode.EXECUTE_MODE} 
                            style={{margin:0}} 
                            disabled={selectedStore?.dirtyContext === true ? false : true}
                            id={`btn_updateContext`} 
                            className={classes.unfold}
                            handleClick={handleUpdateContext}
                            tooltip={"UPDATE CONTEXT"}
                          >
                            <ReplayIcon style={{height:14}}/>
                          </AccessButton>
                    }
                
              </div>
              {fold &&
              <div className={`${classes.unfold} ${classes.tooltip_content}`}>
                <Tooltip title={"Unfold"} arrow enterDelay={0} leaveDelay={100}>
                  <span>
                    <IconButton id={`btn_fold`} className={classes.unfold} onClick={handleFold} >
                    <UnfoldMoreIcon style={{height:14}}/>
                  </IconButton>
                  </span>

                </Tooltip>
              </div>
              }
              {!fold &&
              <div  className={`${classes.unfold} ${classes.tooltip_content}`}>
                <Tooltip title={"Fold"} arrow enterDelay={0} leaveDelay={100}>
                  <span>
                    <IconButton id={`btn_fold`} className={classes.unfold} onClick={handleFold} >
                    <UnfoldLessIcon style={{height:14}} />
                  </IconButton>
                  </span>

                </Tooltip>
              </div>
              }
            </div>
            <div className={classes.divider_Vertical}/>
            <div className={classes.typography_content}>
              <Typography>{contextList.length === undefined ? 0 : contextList.length} Items</Typography>
            </div>
          </div>
        </div>

        <div className={classes.divider}/>
        {newContextState &&
        <div style={{width:'100%',display:"flex"}}>
          <div className={classes.addContainer}>
            <ContextAdd context={contextKey} handleContext={handleKey} stateAction={ActionMode.CREATION_MODE} storeId={selectedStore?.id} cancelAction={setNewContextState}/>
          </div>

        </div>
        }
        <div style={{width:"100%", height:"100%"}}>
          <ContextList stateComponent={stateComponent} handleContext={handleKey} contextList={contextList} fold={fold}/>
        </div>

      </div>
  );

};

export default Context;
