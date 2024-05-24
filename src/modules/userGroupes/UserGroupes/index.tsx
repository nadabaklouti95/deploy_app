import * as React from "react";
import {  createContext, useEffect, useState } from "react";

import useStyles from "./styles";
import UserGroupeList from "../UserGroupeList";
import UserGroupeFilter from "../UserGroupeFilter";

import {Icon, IconButton, Typography} from '@material-ui/core';
import { green } from "@material-ui/core/colors";
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import { createUserGroupe, deleteUserGroupe, getListUserGroupe, UpdateUserGroupe } from "shared/services/userGroupeService";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux/store";
import { Icombo } from "types/models/Combo";
import {fetchError, fetchStart} from "redux/actions";
import { ActionAccessMode, ActionMode } from "shared/constants/AppEnums";
import { userGroupeDTO } from "types/models/csPropertyKeyViewDTO";
import UserGroupeAdd from "../UserGroupeAdd";

import {handleErrors} from "../../../shared/constants/HandleErrors";

import { toast } from "react-toastify";
import { convertMapperData, getMapperAccess, updateAccesRules, updateGeneralAccessRules } from "shared/services/accesRulesService";
import AccessButton from "shared/components/AccessButton";
import {loadWorkspace} from "redux/actions/Workspace";

interface IUserGroupes {
}

let createdUser:userGroupeDTO = new userGroupeDTO()

export const relatedAccessRuleContext = createContext<any>("");

const UserGroupes: React.FC<IUserGroupes> = (props) => {
  const classes = useStyles();

  const [fold,setFold] = useState<Boolean>(false)
  const [filterData,setFilterData] = useState<any>({"name":'',"attached":false})
  const [listGroupeUser,setListGroupeUser] = useState<any>({csUserGroupWithAccessRuleViewDTOList:[],pagesNumber:0,itemNumbers:0})
  const [dataAction,setDataAction] = useState<any>({state:false,data:{csUserGroupWithAccessRuleViewDTOList:[],pagesNumber:0,itemNumbers:0}})
  const [stateCreate,setStateCreate] = useState<any>(false)
  const [groupeDTO,setGroupeDTO] = React.useState<any>(createdUser)
  const [stateComponnent,setStateComponnent] = useState<any>(true)
  const [page,setPage] = useState<any>(0)
  const [size,setSize] = useState<any>(10)

  const [relatedRulesEnum,setRelatedRulesEnum] = useState<any>({relatedRulesEnum:[],relatedUncheckRules:[]})

  let dispatch = useDispatch();
  const Data: Icombo = useSelector((state: AppState) => state.combo);
  const DataWS: Icombo = useSelector((state: AppState) => state.comboWS);
  const workspaces = useSelector((state: AppState) => state.workspaces.workspaceslist);
  const selected = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedStore" ? `${acc}${cur.split("=")[1]}` : acc, "");
  const selectedWS = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedWorkspace" ? `${acc}${cur.split("=")[1]}` : acc, "");
  const selectWorkspace = workspaces.find((elem: any) => elem.workSpaceDTO.name === selectedWS)
  const selectedStore:any = selectWorkspace?.storeList.find((element: any) => element.name === selected );
  
  const handleNewUserGroupe = async ()=>{
    setStateCreate(true)
    let data:any = createdUser
    data.storeId = selectedStore?.id
    setGroupeDTO(data)
  }


  const handleFold = ()=> setFold(!fold)
  const handleUserGroupe = async (action:any,value:any,handleLoading:any,handleError:any)=>{
    let requestData = filterData
    requestData.storeId = selectedStore?.id
    if(action === ActionMode.CREATION_MODE){
      await createUserGroupe(value,selectedStore?.id).then(async (result:any)=>{
        handleLoading(true)
        setPage(0)
        await getListUserGroupe(requestData,size,0,selectedStore?.id).then(items => {
          setTimeout(() => {
            setDataAction({state:true,data:items})
            handleLoading(false)
            setStateCreate(false)
            let data:any = createdUser
            setGroupeDTO(data)
          }, 500);

        })
      }).catch(function (error) {
        handleLoading(false)
        handleErrors(error, false, handleError)

      })
    }
    if(action === ActionMode.EDIT_MODE){
      await UpdateUserGroupe(value,selectedStore?.id).then(async (result:any)=>{
        handleLoading(true)
        setPage(0)
        await getListUserGroupe(requestData,size,0,selectedStore?.id).then(items => {

          setTimeout(() => {
            setDataAction({state:true,data:items})
            handleLoading(false)
          }, 500);

        })
      }).catch(function (error) {
        handleLoading(false)
        handleErrors(error, false, handleError)

      })
    }
    if(action === ActionMode.DELETE_MODE){
      setPage(0)
      await deleteUserGroupe(value,selectedStore?.id).then(async (result:any)=>{
        await getListUserGroupe(requestData,size,0,selectedStore?.id).then(items => {
          setDataAction({state:true,data:items})
          handleLoading(false)
        })
      }).catch(function (error) {
        handleLoading(false)
        handleErrors(error,true,null)

      })
    }
    if(action === ActionMode.DISPLAY_MODE){
      requestData = value
      setFilterData(requestData)
      setStateComponnent(true)
      requestData.storeId = selectedStore?.id
      setPage(0)
      await getListUserGroupe(requestData,size,0,selectedStore?.id).then(items => {

        setDataAction({state:true,data:items})
        setTimeout(() => {
          handleLoading(false)
          setStateComponnent(false)
        }, 500);
      }).catch((error:any)=>{
        handleLoading(false)
        setStateComponnent(false)
        handleErrors(error,true,null)

      })

    }
    if(action === ActionMode.CANCEL_MODE){
      setStateCreate(false)
      let data:any = createdUser
      setGroupeDTO(data)
    }
  }

  const handleAccessRule = (action:any,value:any,handleLoading:any,handleError:any,handleNotification:any) =>{
    if(action === ActionMode.EDIT_MODE){
      let requestData = filterData
      requestData.storeId = selectedStore?.id
      handleLoading(true)
      let fetchData = {
        "accessRuleContextDTO": value.accessRuleContextDTO,
        "accessRuleId": value.accessRuleId,
        "generateToken": value.generateToken,
        "manageGroupsAndUsers": value.manageGroupsAndUsers,
        "publishProperties": value.publishProperties
      }
      updateAccesRules(fetchData,selectedStore.id).then(async (items:any)=>{
        handleError([])
        handleNotification()
        setPage(0)
        await getListUserGroupe(requestData,size,0,selectedStore?.id).then(itemsList => {
          setTimeout(() => {
            setDataAction({state:true,data:itemsList})
            handleLoading(false)
          }, 500);

        })
      }).catch((error:any)=>{
        console.log(error.errors,error)
        setStateComponnent(false)
        handleError(error.errors)
      })
    }
    if(action === ActionMode.UPDATE_GENERAL_ACCESS){
      let requestData = filterData
      requestData.storeId = selectedStore?.id
      handleLoading(true)

      updateGeneralAccessRules(value,selectedStore.id).then(async (items:any)=>{
        handleError([])
        handleNotification()
        setPage(0)
        await getListUserGroupe(requestData,size,0,selectedStore?.id).then(itemsList => {
          setTimeout(() => {
            setDataAction({state:true,data:itemsList})
            handleLoading(false)
          }, 500);

        })
      }).catch((error:any)=>{
        let notify:any
        if(error.response !== undefined){
          if (error.response && error.response.status === 500 ) {
            dispatch(fetchStart());
            dispatch(fetchError(`Erreur ${error.response.data.status} occurred, please contact your administrator.` as string));
            notify = () => toast.success(`Erreur ${error.response.data.status} occurred, please contact your administrator!`,{autoClose: 3000,theme :"colored",type:"error" });
            toast.dismiss();
            notify();
          } 
          if (error.response.status === 491 || error.response.status === 490) {
            let eror :any= error.response.data.errors;
            setStateComponnent(false)
            handleError(eror)
        handleLoading(false)
          }
  
        }
        if(error.response === undefined){
          if (error.request && error.request.response.status === 500 ) {
            dispatch(fetchStart());
            dispatch(fetchError(`Erreur ${error.request.response.status} occurred, please contact your administrator.` as string));
            notify = () => toast.success(`Erreur ${error.request.response.status} occurred, please contact your administrator!`,{autoClose: 3000,theme :"colored",type:"error" });
            toast.dismiss();
            notify();
            setStateComponnent(false)
            handleLoading(false)
          }
          console.log(error.request.response.status)
          
          if (error.request.response.status === 491 || error.request.response.status === 490) {
            let eror :any= error.request.response.errors;
            handleError(eror)
            setStateComponnent(false)
        
        handleLoading(false)
          }
        }     
        else {
          console.log(error)
          setStateComponnent(false)
        
        handleLoading(false)
        }
        

      })
    }
  }

  const handlePage = (typeAction:any,value:any) =>{
    if(typeAction === "page"){
      setPage((value-1))
      let requestData = {
        "attachedToStore": false,
        "name": "",
        "storeId": selectedStore?.id
      }
      getListUserGroupe(requestData,size,(value-1),selectedStore?.id).then(items => {
        setListGroupeUser(items)
      }).catch(function (error) {
        handleErrors(error,true,null)
      })
    }else{
      setSize(value)
    }
  }

  useEffect(() => {
    // Code to call getMapperAccess API
    getMapperAccess().then((response:any)=>{
      let  mapper:any = convertMapperData(response)
      setRelatedRulesEnum({relatedRulesEnum:mapper.relatedRulesEnum,relatedUncheckRules:mapper.relatedUncheckRules})
    })
  }, []);

  useEffect(() => {
    if(!selectWorkspace){
      dispatch(loadWorkspace())
    }
  }, [selectWorkspace, dispatch]);

  useEffect(() => {
    let mounted = true;
    if(selectedStore !== undefined ){
      let requestData = {
        "attachedToStore": false,
        "name": "",
        "storeId": selectedStore?.id
      }
      getListUserGroupe(requestData,size,page,selectedStore?.id)
        .then(items => {
          if(mounted) {
            setListGroupeUser(items)
            setStateComponnent(false)
          }
        })
    } else {
      setListGroupeUser({csUserGroupWithAccessRuleViewDTOList:[],pagesNumber:0,itemNumbers:0})
      setStateComponnent(false)
    }
    return () => {
      mounted = false
    }
  }, [selectedStore, Data, dispatch, DataWS, size, page])

  useEffect(() => {
    if(dataAction.state){
      setListGroupeUser(dataAction.data)
      setDataAction({state:false,data:{csUserGroupDTOList:[],pagesNumber:0}})
    }
  }, [dataAction])



  return (
    <relatedAccessRuleContext.Provider value={{ relatedRulesEnum, setRelatedRulesEnum }}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.Typography}>User Groupes</div>
        </div>
        <div className={classes.divider}/>
        <div className={classes.filter}>
          <UserGroupeFilter stateComponnent={stateComponnent} handleFilter={handleUserGroupe} filterRequest={fold}/>
        </div>
        <div className={classes.divider}/>
        <div className={classes.action}>
          <div style={{display: 'flex', alignItems: 'center', padding: 8}}>
            <AccessButton
                disabled={!selectedStore}
                id={"add_new_user_groupe"}
                actionType={ActionAccessMode.WRITE_MODE}
                className={classes.boardStylekey}
                handleClick={() => {
                  handleNewUserGroupe()
                }}
            >
              <Icon style={{color: green[500]}}>add_circle</Icon>
              Add User Groupe
            </AccessButton>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            {fold &&
                <div className={classes.unfold} style={{display: 'flex', alignItems: 'center', padding: 0, margin: 0}}>
                  <IconButton id={`btn_fold`} disabled={stateComponnent} className={classes.unfold}
                              onClick={handleFold}>
                    <UnfoldMoreIcon style={{height: 14}}/>
                  </IconButton>
                </div>
            }
            {!fold &&
                <div className={classes.unfold} style={{display: 'flex', alignItems: 'center', padding: 0, margin: 0}}>
                  <IconButton id={`btn_fold`} disabled={stateComponnent} className={classes.unfold}
                              onClick={handleFold}>
                    <UnfoldLessIcon style={{height: 14}}/>
                  </IconButton>
                </div>
            }
            <div className={classes.divider_Vertical}/>
            <div style={{display: 'flex', alignItems: 'center', marginRight: 8, marginLeft: 8, width: "auto"}}>
              <Typography>{listGroupeUser?.itemNumbers} Items</Typography>
            </div>
          </div>
        </div>

        <div className={classes.divider}/>
        {stateCreate &&
            <div style={{width: '100%', padding: 4}}>
              <UserGroupeAdd csUserGroupDTO={groupeDTO} csAccessRuleDTO={null} handleValue={handleUserGroupe}
                             fold={fold} actionMode={ActionMode.CREATION_MODE} handleAccessRule={handleAccessRule}
                             indexUserGroupeValue={null}/>
            </div>
        }
        <div style={{width: "100%", height: "100%"}}>
          <UserGroupeList
              stateComponent={stateComponnent}
              listGroupe={listGroupeUser}
              handleUserGroupe={handleUserGroupe}
              handleAccessRule={handleAccessRule}
              fold={fold}
              handlePages={handlePage} page={page}
          />
        </div>
      </div>
    </relatedAccessRuleContext.Provider>
);
};

export default UserGroupes;
