
import * as React from "react";
import { useEffect, useState } from "react";
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UserFilter from "../UserFilter";
import UserList from "../UserList";
import UserAdd from "../UserAdd";
import { fetchUser, fetchUserByFilter } from "redux/actions";
import jwtAxios from "app/services/auth/jwt-auth/jwt-api";
import { useDispatch, useSelector } from "react-redux";
import { Icombo } from "types/models/Combo";
import { AppState } from "redux/store";
import { deleteUser, getListUserGroupe } from "shared/services/userGroupeService";
import useStyles from "./styles";
import { Icon, IconButton, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import {handleErrors} from "../../../shared/constants/HandleErrors";
import AccessButton from "shared/components/AccessButton";
import { ActionAccessMode } from "shared/constants/AppEnums";
import {loadWorkspace} from "../../../redux/actions/Workspace";
interface IUser {}


const User: React.FC<IUser> = (props) => {
  const classes = useStyles()

  const [ stateAdd,setStateAdd ] = useState<boolean>(false)
  const [unfold,setUnfold] = useState<any>(false)
  const [action,setAction] = useState<any>(false)
  const [typeAction,setTypeAction] = useState<any>("unfold")
  const [loadingFind,setLoadingFind] = useState<any>(false)
  const [loadingAdd,setLoadingAdd] = useState<Boolean>(false)
  const [errorAdd,setErrorAdd] = useState<any>(null)   
  const [listUsers,setListUsers] = useState<any>({pagesNumber:0,csUserViewDTOList:[]})
  const [stateAction,setStateAction] = useState<any>(false)
  const [stateData,setStateData]= useState<any>({state:false,object:[]})
  const [filterName,setFilterName] = useState<any>("")
  const [selectedid, setSelectedid] = useState<any>({});
  const [userGroupeList,setUserGroupeList] = useState<any>({csUserGroupWithAccessRuleViewDTOList:[],pagesNumber:0,itemNumbers:0})
  const [stateComponnent,setStateComponnent] = useState<any>(true)
  const [page,setPage] = useState<any>(0)
  const [statePage,setStatePage] = useState<any>({state:false,data:{ "itemNumbers": 0,"pagesNumber": 0, "csUserViewDTOList": [] }})
  const [size,setSize] = useState<any>(10)

  let dispatch = useDispatch();

  const Data: Icombo = useSelector((state: AppState) => state.combo);
  const DataWS: Icombo = useSelector((state: AppState) => state.comboWS);
  const workspaces = useSelector((state: AppState) => state.workspaces.workspaceslist);
  const selected = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedStore" ? `${acc}${cur.split("=")[1]}` : acc, "");
  const selectedWS = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedWorkspace" ? `${acc}${cur.split("=")[1]}` : acc, "");
  const selectWorkspace = workspaces.find((elem: any) => elem.workSpaceDTO.name === selectedWS)
  const selectedStore:any = selectWorkspace?.storeList.find((element: any) => element.name === selected );
  
  const createAddForm = ()=> {setStateAdd(true)} 
  const cancelAdd = ()=>{
    setErrorAdd(null)
    setStateAdd(false)
  }
  const handleUnfold = ()=>{
    setUnfold(!unfold)
    setAction(true)
  }
  const FindConfig = async (value:any)=>{
    setLoadingFind(true)
    fetchUserByFilter(value,page,size).then((response:any)=>{
      setStateComponnent(true)
      setFilterName(value)
      setStateData({status:true,object:response})
      setStateAction(!stateAction)
      setTimeout(() => {
        setLoadingFind(false)
        setStateComponnent(false)
      }, 1000);
    }).catch(function (error) {
      setLoadingFind(false)
    })
  }

  const handleDeleteUser = (idUser:any) =>{
    deleteUser(idUser).then((res:any)=>{
      
      setTimeout(() => {
        //notification("User deleted with success")
        setLoadingAdd(false)
        setStateAdd(false)
        setStateComponnent(true)

        fetchUserByFilter(filterName,page,size).then((responseFetch:any)=>{
          setStateData({status:true,object:responseFetch})
          setStateAction(!stateAction)
          
        }).catch(function (error) {
        })
      }, 1000);
    }).catch(function (error) {
      handleErrors(error,true,null)
    })
    
  }


  const handleAdd = async (values:any) =>{
    setLoadingAdd(true)
    
    let requestedData = values;
    if(requestedData.userGroupIds !== 0 ){
      let userGroupeData = requestedData.userGroupIds.map((element:any) => {
        let elementId = userGroupeList.csUserGroupWithAccessRuleViewDTOList.find((userGroupeElement:any)=> userGroupeElement.csUserGroupDTO.name === element.csUserGroupDTO.name )
        if(elementId !== undefined){
          elementId = elementId.csUserGroupDTO.id
        }else{elementId = element}
        return elementId
      });
      requestedData.userGroupIds = userGroupeData
    }


    return await jwtAxios.post<any>(`/cs-user/create-user`,requestedData).then(async (response:any)=>{
      setTimeout(() => {
        setLoadingAdd(false)
        setStateAdd(false)
        setStateComponnent(true)
        setPage(0)
        fetchUserByFilter(filterName,0,size).then((responseFetch:any)=>{
          setStateData({status:true,object:responseFetch})
          setStateAction(!stateAction)
          
        }).catch(function (error) {
        })
      }, 1000);
      
    }).catch(function (error) {
      setStateComponnent(false)
      setLoadingAdd(false)
      handleErrors(error,false,setErrorAdd)

      })
  }

  const handleUpdate = async (values:any,handleLoading:any,handleError:any) =>{
    handleLoading(true)
    
    return await jwtAxios.post<any>(`/cs-user/update-user`,values).then(async (response:any)=>{
      setStateComponnent(true)
      setPage(0)
      fetchUserByFilter(filterName,0,size).then((responseFetch:any)=>{
        setStateData({status:true,object:responseFetch})
        handleLoading(false)
        setStateAction(!stateAction)
        setTimeout(() => {
          setLoadingAdd(false)
          setStateAdd(false)
          setStateComponnent(false)
        }, 1000);
      }).catch(function (error) {
      })
    }).catch(function (error) {
      setStateComponnent(false)
      setLoadingAdd(false)
      handleErrors(error, false, handleError, values.id)
    })
  }

  const handlePage = (typeAction:any,value:any) =>{
    if(typeAction === "page"){
      setPage((value-1))
      fetchUserByFilter(filterName,(value-1),size).then((response:any)=>{
        setListUsers(response)
      }).catch(function (error) {
            handleErrors(error,true,null)
          })
    }else{
      setSize(value)
    }
  }

  useEffect(() => {
    if(!selectWorkspace){
      dispatch(loadWorkspace())
    }
  }, [selectWorkspace, dispatch, DataWS]);

  useEffect(() => {
    if(selectedStore !== undefined){
      setStateComponnent(true)
      fetchUser(page,size).then((response:any)=>{
        setListUsers(response)
      })
    
      let requestData = {
        "attachedToStore": false,
        "name": "",
        "storeId": selectedStore?.id
      }
      getListUserGroupe(requestData,100,0,selectedStore?.id)
          .then(items => {
            setUserGroupeList(items)
            
          })
          setTimeout(() => {
            setStateComponnent(false)
          }, 500);
    } else {
      setListUsers({pagesNumber:0,csUserViewDTOList:[]})
      setStateComponnent(false)
    }
  },[page, selectedStore, size]);

  useEffect(()=>{
    if(stateData.state !== false){
      setListUsers(stateData.object)
      setTimeout(() => {
        setStateComponnent(false)
      }, 1000);
    }
    
    
  },[stateData,stateAction])

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
    setFilterName("")
    setSelectedid(selectedid);

  }, [ selectedid, Data, dispatch, selectedStore]);

  useEffect(()=>{

    if(statePage.state){
      setStateComponnent(true)
      setListUsers(statePage.data);
      setTimeout(() => {
        setStateComponnent(false)
        setStatePage({state:false,data:{ "itemNumbers": 0,"pagesNumber": 0, "csUserViewDTOList": {} }})
      }, 500);
    }


  },[statePage])

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.Typography}>User</div>
      </div>
      <div className={classes.divider}/>
      <div className={classes.filter}>
        <UserFilter loadingFind={loadingFind} findConfig={FindConfig} stateComponnent={stateComponnent} />
      </div> 
      <div className={classes.divider}/>
      <div className={classes.action}  >
        <div style={{display:'flex',alignItems:'center',padding:8}}>
          <AccessButton  
            disabled={!selectedStore}
            id={"add_form"} 
            actionType={ActionAccessMode.WRITE_MODE} 
            className={classes.boardStylekey} 
            handleClick={()=>{createAddForm()}} 
          >
              <Icon style={{ color: green[500] }}>add_circle</Icon>
              Add New User
          </AccessButton>
        </div>
        <div style={{display:'flex',alignItems:'center'}}>
          {unfold && 
            <div className={classes.unfold} style={{display:'flex',alignItems:'center',padding:0,margin:0}}>
              <IconButton id={`btn_fold`} disabled={stateComponnent} className={classes.unfold} onClick={handleUnfold} >
                <UnfoldMoreIcon style={{height:14}}/>
              </IconButton>
            </div>
          }
          {!unfold && 
            <div className={classes.unfold} style={{display:'flex',alignItems:'center',padding:0,margin:0}}>
              <IconButton id={`btn_fold`} disabled={stateComponnent} className={classes.unfold} onClick={handleUnfold} >
                <UnfoldLessIcon style={{height:14}} />
              </IconButton>
            </div>
          }
          <div className={classes.divider_Vertical}/>
          <div style={{display:'flex',alignItems:'center',marginRight:8,marginLeft:8,width:"auto"}}>
            {listUsers.itemNumbers !== undefined && <Typography>{listUsers.itemNumbers} Items</Typography> }
          </div>
        </div>
      </div>
        
      <div className={classes.divider}/>
        {stateAdd &&
          <div style={{width:'100%',padding:4}}>
            <UserAdd 
                store={"Store 1"} 
                errorAction={{value:errorAdd,action:setErrorAdd}} 
                loading={loadingAdd} 
                handleAdd={handleAdd} 
                cancelAdd={cancelAdd} 
                userGroupe={userGroupeList.csUserGroupWithAccessRuleViewDTOList} 
              />
          </div>
        }
      <div style={{width:"100%", height:"100%"}}>
        <UserList 
            userGroupe={userGroupeList} 
            userList={listUsers} 
            handleDelete={handleDeleteUser} 
            handleUpdate={handleUpdate} 
            fold={{ handleUnfold: handleUnfold, action: action, setAction: setAction, typeAction: typeAction, unfold: unfold, setUnfold: setUnfold }} 
            stateComponnent={stateComponnent}
            handlePages={handlePage} page={page}
          />
      </div>
    </div>
    
  );
};
export default User;
