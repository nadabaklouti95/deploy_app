import jwtAxios from "app/services/auth/jwt-auth/jwt-api";
import * as React from "react";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getTokens, LoadStorebyid, LoadToken } from "redux/actions";
import { AppState } from "redux/store";
import { ActionAccessMode, ActionMode } from "shared/constants/AppEnums";
import { Icombo } from "types/models/Combo";
import AddToken from "../AddToken";
import TokenList from "../TokenList";
import {Icon, IconButton, Typography} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useStyles from "./styles";
import Filter from "shared/components/Filter";
import {handleErrors} from "../../../shared/constants/HandleErrors";
import AccessButton from "shared/components/AccessButton";
import {loadWorkspace} from "redux/actions/Workspace";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import UnfoldLessIcon from "@material-ui/icons/UnfoldLess";
import { Tooltip } from "@mui/material";

interface IToken {
  
} 
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


let initialFilterFormik = {
  name:""
}

let filter:any = [
  { type:'textField',name:'name',label:'Name',order:0,values:"",search:false,context:null},
]


const Token: React.FC<IToken> = (props) => {
  const classes = useStyles();
  const [ stateAddToken,setStateAddToken ] = React.useState<boolean>(false)
  const [ actionAddToken,setActionAddToken] = React.useState<ActionMode>(ActionMode.CREATION_MODE)
  const [Datax, setDatax] = React.useState<any>([]);
  const [, setLoadingx] = React.useState(false);
  const [errorAddToken,setErrorAddToken] = React.useState<any>(null)
  const [token,setToken]= React.useState<any>([])
  const [createAction,setCreateAction] = React.useState<any>({state:false,object:[]})
  const [creationStatus,setCreateStatus] = React.useState<any>(false)
  const [contextColor,setContextColor] = React.useState<any>(getAllContext(Datax))
  const [findAction,setFindAction] = React.useState<any>({state:false,object:[]})
  const [filterName,setFilterName] = React.useState<any>("")
  const [DeleteState,setDeleteState] = React.useState<any>({state:false,object:null})
  const [deleteAction,setDeleteAction] = React.useState<any>(false)
  const [stateComponent,setStateComponent] = React.useState<any>(true)
  const [filterInitData,setFilterInitData] = React.useState<any>(filter)
  const [fold,setFold] = useState<Boolean>(false)

  let dispatch = useDispatch();
  const Data: Icombo = useSelector((state: AppState) => state.combo);
  const DataWS: Icombo = useSelector((state: AppState) => state.comboWS);
  const workspaces = useSelector((state: AppState) => state.workspaces.workspaceslist);
  const selected = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedStore" ? `${acc}${cur.split("=")[1]}` : acc, "");
  const selectedWS = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedWorkspace" ? `${acc}${cur.split("=")[1]}` : acc, "");
  const selectWorkspace = workspaces.find((elem: any) => elem.workSpaceDTO.name === selectedWS)
  const selectedStore:any = selectWorkspace?.storeList.find((element: any) => element.name === selected );
  
  const { context, loading } = LoadStorebyid(selectedStore?.id as number);
  const {tokenList,loadingToken} = LoadToken(selectedStore?.id as number)
  
  const createAddForm = ()=> {setStateAddToken(true)}  
  const cancelTokenCreation = (data:any)=>{
    setErrorAddToken(null)
    setStateAddToken(data)
  }
  
  const createToken = async (jsonData:any,changeState:any) =>{
    let notify:any 
    let URI:any = `cs-token/generate-token?storeId=${selectedStore.id}`
    let date:any =  jsonData.expiration.toString()
    let date1:Date =new Date(date)
    let RequestDta = {
      "expiration": date1,
      "name": jsonData.name,
      "scope": jsonData.scope,
      "storeId": selectedStore?.id
    }  
    
      notify = (value : String) => toast.success("The token "+value+" is now created!",{autoClose: 3000,theme :"colored" });
      setActionAddToken(ActionMode.CREATION_MODE)
      changeState(true)
      await jwtAxios.post(URI, RequestDta).then((res:any)=>{
        if (res && res.status === 201) {
          changeState(true)
          setTimeout(() => {
            toast.dismiss();
            notify(RequestDta.name as string);
            setActionAddToken(ActionMode.DISPLAY_MODE)
            setErrorAddToken(null)
            changeState(false)
            setStateAddToken(false)
            getTokens(selectedStore?.id as number,filterName).then((element:any)=>{ 
              setCreateAction({status:true,object:element})
              setCreateStatus(!creationStatus)
            })}, 500);
        }
      }).catch(function (error) {
        changeState(false)
        handleErrors(error,false,setErrorAddToken)

      })
  }

  const handleFold = ()=> setFold(!fold)

  const handleSearch =async (values:any,handleLoading:any) => {
    setStateComponent(true)
    let filterData:any = {
      name:''
    }
    if(values.name.length !== 0){
      filterData.name = values.name
    }

    await jwtAxios.get<any>(`/cs-token/get-tokens-by-filter?storeId=${selectedStore?.id}&name=${filterData.name}`).then((response:any)=>{
      if (response && response.status === 200) {
        setFilterName(filterData.name )
        setTimeout(() => {
          handleLoading(false)
          setStateComponent(false)

          setFindAction({state:true,object:response.data})
        }, 500);
      }
    }).catch(function (error) {
      handleLoading(false)
      setStateComponent(false)
      handleErrors(error,true,null)

    })
    
  }

  const deleteToken = async (idToken:any,changeState:any) => {
      await jwtAxios.delete(`cs-token/delete-token?tokenId=${idToken}&storeId=${selectedStore.id}`).then((response:any)=>{
        if (response && response.status === 204) {
          changeState(true) 
          setTimeout(() => {
            let tokenFilter: any = token.filter((element:any)=> element.id !== idToken)
            changeState(false)
            setDeleteState({state:true,object:tokenFilter})
            setDeleteAction(!deleteAction)
          }, 500);
        }
      }).catch(function (error) {
        handleErrors(error,true,null)

      })

  }

  useEffect(()=>{
    if(DeleteState.state !== false){
      setToken(DeleteState.object)
    }
  },[DeleteState,deleteAction])

  useEffect(()=>{
    if(createAction.state !== false){
      setToken(createAction.object)
    }

  },[createAction,creationStatus])

  useEffect(()=>{
    if(findAction.state !== false){
      setToken(findAction.object)
    }
  },[findAction])

  useEffect(() => {
    setStateAddToken(false)
    if (loading === true) {
      setLoadingx(false);
    }
    setDatax(context);
    setContextColor(getAllContext(Datax))
    setTimeout(() => {
      setLoadingx(loading);
    }, 500);
    

  }, [context, loading, Data, dispatch, selectedStore,Datax]);
  
  useEffect(() => {
    if(!selectWorkspace){
      dispatch(loadWorkspace())
    }
  }, [selectWorkspace, dispatch]);

  
  useEffect(()=>{
    setStateComponent(true)
    setTimeout(() => {
    setStateComponent(false)
      if(selectedStore){
        setFilterInitData(filter)
        setToken(tokenList)
      } else {
        setToken([])
      }
  }, 300);
    

  },[tokenList,loadingToken,selectedStore, DataWS])


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
              Settings
            </div>,
            <div className={classes.Typography}>
              Token
            </div>
        </Breadcrumbs>
        </div>
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
              actionType={ActionAccessMode.WRITE_MODE} 
              className={classes.boardStylekey} 
              handleClick={createAddForm}
            >
              <Icon style={{ color: green[500] }}>add_circle</Icon>
              Add new Token
            </AccessButton>
        </div>
        <div style={{display:'flex',alignItems:'center'}}>
          {fold &&
              <div className={classes.unfold} style={{display:'flex',alignItems:'center',padding:0}}>
                <Tooltip title={"Unfold"} arrow enterDelay={0} leaveDelay={100}>
                  <IconButton id={`btn_fold`} className={classes.unfold} onClick={handleFold} >
                    <UnfoldMoreIcon style={{height:14}}/>
                  </IconButton>
                </Tooltip>
              </div>
          }
          {!fold &&
              <div  className={classes.unfold} style={{display:'flex',alignItems:'center',padding:0}}>
                <Tooltip title={"Fold"} arrow enterDelay={0} leaveDelay={100}>
                  <IconButton id={`btn_fold`} className={classes.unfold} onClick={handleFold} >
                    <UnfoldLessIcon style={{height:14}} />
                  </IconButton>
                </Tooltip>
              </div>
          }
          <div className={classes.divider_Vertical}/>
          <div style={{display:'flex',alignItems:'center',marginRight:8,marginLeft:8,width:"auto"}}>
            {token.length !== undefined && <Typography>{token.length} Items</Typography> }
          </div>
        </div>
      </div>
      <div className={classes.divider}/>
      {stateAddToken &&
        <div style={{width:'100%',padding:4}}>
          <AddToken
            stateAddToken={stateAddToken} 
            cancelTokenCreation={cancelTokenCreation} 
            actionAddTokenMode={actionAddToken} 
            createToken={createToken} 
            context={getAllContext(Datax)} 
            errorAction={errorAddToken}
          />
        
        </div>
      }
      <div style={{width:"100%", height:"100%"}}>
        <TokenList
            stateComponent={stateComponent}
            token={token}
            contextColor={contextColor}
            deleteToken={deleteToken}
            fold={fold}
        />
      </div>
    </div>





 
  );
  
};

export default Token;