import { Icon, IconButton, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import * as React from "react";
import { useEffect, useState } from "react";
import useStyles from "./styles";
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import { useHistory } from "react-router-dom";
import StoreListMode from "../StoreListMode";
import { deleteStore, getStoreListMode, updateStore } from "shared/services/storeService";
import { ActionAccessMode, ActionMode, filterTypeEnum } from "shared/constants/AppEnums";
import { useDispatch, useSelector } from "react-redux";
import { LoadCombo, loadStore } from "redux/actions";
import { Icombo } from "types/models/Combo";
import { AppState } from "redux/store";
import Filter from "shared/components/Filter";
import { storeType } from "shared/constants/AppConst";
import {handleErrors} from "../../../shared/constants/HandleErrors";
import AccessButton from "shared/components/AccessButton";
import {loadWorkspace} from "../../../redux/actions/Workspace";
import { Tooltip } from "@mui/material";

interface IStore {

}

let filterDataInit = 
{
  "storeName": "",
  "storeTypeIds": [],
}

let initialFilterFormik = {
  storeName: "",
  storeTypeIds : [],
}
let filter:any = [
  { type:filterTypeEnum.TEXT,name:'storeName',label:'Name',order:1,values:"",search:false,context:null},
  { type:filterTypeEnum.SELECT_MULTI,name:'storeTypeIds',label:'Store Type',order:5,values:storeType,search:false,context:null},
]


const Store: React.FC<IStore> = (props) => {
    
  const classes = useStyles()
  const [stateComponnent,setStateComponnent] = useState<any>(false)
  const [fold,setFold] = useState<Boolean>(false)
  const [storeList,setStoreList] = useState<any>({ "itemNumbers": 0,"pagesNumber": 0, "storeDTOList": [ ] })
  const [page,setPage] = useState<any>(0)
  const [size,setSize] = useState<any>(100)
  const [statePage,setStatePage] = useState<any>({state:false,data:{ "itemNumbers": 0,"pagesNumber": 0, "storeDTOList": [ ] }})
  const [filterInitData,setFilterInitData] = React.useState<any>(filter)
  const [filterState,setFilterState] = React.useState<any>(filterDataInit)
  const [selectedWS, setSelectedWS] = useState<any>(null);
  const listWS = useSelector((state: AppState) => state.workspaces.workspaceslist);
  const initialValueWS = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedWorkspace" ? `${acc}${cur.split("=")[1]}` : acc,"");

  const Data: Icombo = useSelector((state: AppState) => state.combo);
  const DataWS: Icombo = useSelector((state: AppState) => state.comboWS);


  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadStore());
    dispatch(loadWorkspace());
  }, [dispatch,Data]);

  
  const handleFold = ()=> setFold(!fold)
  const handlePage = (typeAction:any,value:any) =>{
    if(typeAction === "page"){
      setPage((value-1))
        getStoreListMode(filterState,size,(value-1)).then(itemsTags => {
        setStatePage({state:true,data:itemsTags})
      })
    
    }else{
      setSize(value)
    }
  }
  let history = useHistory();
  const handleClickOpen = () => {
    history.push("/storeCreation");
  };

  const handleStore = (action:ActionMode,value:any,handleLoading:any,handleError:any)=>{
    if(action === ActionMode.DISPLAY_MODE){
      setPage(0)
      getStoreListMode(value,size,0).then(itemsTags => {
        setStatePage({state:true,data:itemsTags})
        setTimeout(() => {
          handleLoading(false)
        }, 500);
      }).catch((error)=>{
        handleLoading(false)
      })
    }if(action === ActionMode.EDIT_MODE){
      updateStore(value).then((response:any)=>{
        dispatch(loadStore())
        dispatch(LoadCombo(value.name));
        getStoreListMode(filterState,size,page).then(itemsTags => {
          setStatePage({state:true,data:itemsTags})
          setTimeout(() => {
            handleLoading(false)
          }, 500);
        }).catch((error)=>{
          handleLoading(false)
        })
      }).catch((errorUpdate:any)=>{

        handleErrors(errorUpdate, false, handleError)

        handleLoading(false)
      })
    }
    if(action === ActionMode.DELETE_MODE){
      deleteStore(value).then((response:any)=>{
        getStoreListMode(filterState,size,page).then((itemsTags:any) => {
          dispatch(loadStore())
          dispatch(loadWorkspace())

          setStatePage({state:true,data:itemsTags})
        }).catch((error)=>{
        })
      }).catch((errorUpdate:any)=>{

        handleErrors(errorUpdate, true, null)

      })
    }
  }

  const handleSearch =async (values:any,handleLoading:any) => {
    setStateComponnent(true)
    let resultTypeStore:any = []
    let requestedData:any = {
      storeTypeIds:[],
      storeName:values.storeName
    }
    if(values.storeTypeIds.length !== 0){
      for (let index = 0; index < values.storeTypeIds.length; index++) {
        const element = values.storeTypeIds[index];
        let foundElement:any = storeType.find((obj:any)=> obj.value === element)
        resultTypeStore.push(foundElement.key)
      }
      requestedData.storeTypeIds = resultTypeStore
    }
    
    getStoreListMode(requestedData,size,0).then(itemsTags => {
      setFilterState(requestedData)
      setStatePage({state:true,data:itemsTags})
      setPage(0)
      setTimeout(() => {
        setStateComponnent(false)
        handleLoading(false)
      }, 500);
    }).catch((error)=>{
      handleLoading(false)
    })
    
  }

  useEffect(() => {
    setStateComponnent(true)
    setTimeout(() => {
      setStateComponnent(false)
    }, 500);
  }, [])
  useEffect(() => {
    let mounted = true;
      let requestData = {
        "storeName": "",
        "storeTypes": []
      }
      let interFilter:any = filter
      setFilterInitData(interFilter)
      getStoreListMode(requestData,size,0)
        .then(items => {
          if(mounted) {
            setStoreList(items)
            setStateComponnent(false)
          }
        })
    
    return () => {
      mounted = false
    }
  }, [DataWS, size])

  useEffect(()=>{
    
    if(statePage.state){  
        setStateComponnent(true)
        setStoreList(statePage.data);
        setTimeout(() => {
          setStateComponnent(false)
          setStatePage({state:false,data:{ "itemNumbers": 0,"pagesNumber": 0, "storeDTOList": [ ] }})
        }, 500);
    }
      
    
  },[statePage])


  useEffect(() => {
    if(listWS.length > 0){
      let foundElementWS:any = listWS.find((obj:any)=> obj.workSpaceDTO.name === initialValueWS);
      setSelectedWS(foundElementWS)
    }
  }, [listWS, initialValueWS]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.Typography}>Store Management</div>
      </div>
      <div className={classes.divider}/>
        <div className={classes.filter}>
          <Filter 
            disabled={false} 
            stateFilter={initialFilterFormik} 
            stateComponent={stateComponnent} 
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
              id={`store_add`} 
              disabled={stateComponnent}
              actionType={ActionAccessMode.WRITE_MODE} 
              className={classes.boardStylekey} 
              handleClick={()=>{handleClickOpen()}}
            >
              <Icon style={{ color: green[500] }}>add_circle</Icon>
              Add new Store
            </AccessButton>
        </div>
        
        <div style={{display:'flex',alignItems:'center'}}>
        <div  style={{display:'flex',alignItems:'center',padding:0}}> 
          {fold && 
            <div className={classes.unfold} style={{display:'flex',alignItems:'center',padding:0}}>
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
            <div  className={classes.unfold} style={{display:'flex',alignItems:'center',padding:0}}>
              <Tooltip title={"Fold"} arrow enterDelay={0} leaveDelay={100}>
                <span>
                  <IconButton id={`btn_fold`} className={classes.unfold} onClick={handleFold} >
                  <UnfoldLessIcon style={{height:14}} />
                </IconButton>
                </span>

              </Tooltip>
            </div>
          }
          <div className={classes.divider_Vertical}/>
          <div style={{display:'flex',alignItems:'center',marginRight:8,marginLeft:8,width:"auto"}}>
            <Typography>{storeList.storeDTOList.filter((store:any) => store.workspace.id === selectedWS?.workSpaceDTO.id).length} Items</Typography>
          </div>
        </div>
        </div>
      </div>
      <div className={classes.divider}/>
      <StoreListMode listStore={storeList} stateComponnent={stateComponnent} handleStore={handleStore} page={page}  handlePages={handlePage} fold={fold} />
      
    </div>

  );
  
};

export default Store;
