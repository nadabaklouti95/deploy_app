import * as React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "redux/store";
import {toast} from "react-toastify";
import jwtAxios from "app/services/auth/jwt-auth/jwt-api";

import useStyles from "./styles";
import {
  getAutocomplete,
  getPropertyByFilter,
  LoadProperty,
  loadStore,
  LoadStorebyid,
  LoadTags,
  publishProperty
} from "redux/actions";
import {ActionAccessMode, ActionMode, filterTypeEnum, StatusId, TaskTypeId} from "shared/constants/AppEnums";
import {csProperty} from "shared/models";
import {Icombo} from "types/models/Combo";
import {csPropertyKeyViewDTO} from "types/models/csPropertyKeyViewDTO";
import {TagProps} from "modules/tags/TagGraph";
import PropertiesList from "../PropertiesList";
import PropertyDetails from "../PropertyDetails";

import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import {Icon, IconButton} from "@material-ui/core";
import {getPropertyTree} from "redux/actions/service";
import {green} from "@material-ui/core/colors";
import {Typography} from "@material-ui/core";
import {StatusEnum, statusStore, TypeListEnum} from "shared/constants/AppConst";
import Filter from "shared/components/Filter";
import {handleErrors} from "../../../shared/constants/HandleErrors";
import AccessButton from "shared/components/AccessButton";
import {loadWorkspace} from "../../../redux/actions/Workspace";
import { Tooltip } from "@mui/material";

interface IStore {
} 




let filterData = 
{
  "tagId": 0,
  "textSearch": "",
  "typeIds": [],
  "statusIds": [StatusId.DRAFT],
}
const yamlRequestData:any = {
  "context": [],
  "parentId": null,
  "statusIds": [StatusId.DRAFT],
  "tagId":2,
  "textSearch":"",
  "typeIds":[],
  "parentFullIdList":null
}
const Tag = "Latest";

const getStoreType = (valueId:any)=>{
  let result = ''
  let findStore :any = statusStore.find((obj:any)=> obj.key === valueId)
  if(findStore !== undefined){
      result = findStore.value
  }
  return result
}

let filter:any = [
 // { type:filterTypeEnum.TEXT ,name:'textSearch',label:'Name',order:1,values:"",search:false,context:null,disabled:false},
  { type:filterTypeEnum.AUTOCOMPLETE ,name:'textSearch',label:'Name',order:1,values:"",search:false,context:null,disabled:false},
  { type:filterTypeEnum.SELECT_ONLY_ONE,name:'tagId',label:'Tag',order:2,values:[],search:true,context:null,disabled:false},
  { type:filterTypeEnum.SELECT_MULTI,name:'typeIds',label:'Type',order:3,values:TypeListEnum,search:false,context:null,disabled:false},
  { type:filterTypeEnum.SELECT_MULTI,name:'statusIds',label:'Status',order:5,values:StatusEnum,search:false,context:null,disabled:false},
  { type:filterTypeEnum.SELECT_MULTI,name:'context',label:'Context',order:4,values:[],search:false,context:[],disabled:false},
]



const initialFilterFormik = {
  tagId: ['Latest'],
  statusIds : ['DRAFT'],
  textSearch:[],
  typeIds:[],
  context:[]
}


let propertyCreatedDto:csPropertyKeyViewDTO = new csPropertyKeyViewDTO()

export const dataContext = React.createContext({data:null});
const Properties: React.FC<IStore> = (props) => {
  const classes = useStyles();
  const [tagsLists, setTaglist] = React.useState<TagProps[]>([]);
  const [typeStore,setTypeStore] = React.useState<any>("")
  const [page,setPage] = React.useState(0); //setPage    
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tagId,setTagId] = React.useState<any>(null)
  const [unfold,setUnfold] = React.useState<any>(false)
  const [propertyTree,setPropertyTree] = React.useState<any>([])
  const [listProperty,setListProperty] = React.useState<any>({pagesNumber:0,csPropertyKeyViewDTOList:[]});
  const [modeView,setModeView] = React.useState<any>(false)
  const [action,setAction] = React.useState<any>(false)
  const [typeAction,setTypeAction] = React.useState<any>("unfold")
  const [headerAction,setHeaderAction] = React.useState<string>(ActionMode.EDIT_MODE)
  const [statusYaml,setStatusYaml] = React.useState<any>({status:false,value:[]})
  const [yamlFilter,setYamlFilter]=React.useState<any>(yamlRequestData)
  const [TagIdFind,setTagIdFind] = React.useState<any>("Latest")
  //To Clean
  //state to change to filter componnent
  const [ContextData, setContextData] = React.useState<any>([]);
  const [listPropertyFind,setListPropertyFind] = React.useState<csProperty>({pagesNumber:0,csPropertyKeyViewDTOList:[]});
  const [filterDataJson] =React.useState<any>(filterData)
  const [stateFilter,setStateFilter] =React.useState<any>(filterData)
  const [valueStatus,setValueStatus] = React.useState<boolean>(false)
  const [initialPropertyFind,setInitialPropertyFind] = React.useState<csProperty>({pagesNumber:0,csPropertyKeyViewDTOList:[]});
  const [statusCreation] = React.useState<any>(false)
  const [deleteArray,setDeleteArray] = React.useState<any>(null) 
  const [statusDelete,setStatusDelete] = React.useState(false);
  const [statusDeleteKey,setStatusDeleteKey] = React.useState(false);
  const [initialProperty,setInitialProperty] = React.useState<any>({pagesNumber:0,csPropertyKeyViewDTOList:[]});
  const [propertyDTO,setPropertyDTO] = React.useState<any>(propertyCreatedDto)
  const [loadingx, setLoadingx] = React.useState(false);
  const [statusNewPropertyKey,setStatusNewPropertyKey] = React.useState<any>(false)
  const [stateValue,setStateVlaue] = React.useState<any>(true)  
  const [propertyKeyStatus,setPropertyKeyStatus] = React.useState<boolean>(false)
  const [updateProperty,setUpdateProperty ] = React.useState<any>(null)  
  const [stateComponnent,setStateComponnent] = React.useState<any>(true)
  const [filterInitData,setFilterInitData] = React.useState<any>(filter)
  const [initialFilter,setInitialFilter] = React.useState<any>(JSON.parse(JSON.stringify(initialFilterFormik)))
  const [publishResponse,setPublishResponse ] = React.useState<any>(null)
  const [treeModeView,setTreeModeView] = React.useState<any>(false)
  const [autoCompleteList,setAutoCompleteList] = React.useState<any>([])


  let dispatch = useDispatch();
  const Data: Icombo = useSelector((state: AppState) => state.combo);
  const DataWS: Icombo = useSelector((state: AppState) => state.comboWS);
  const stores = useSelector((state: AppState) => state.stores.storeslist);
  const workspaces = useSelector((state: AppState) => state.workspaces.workspaceslist);
  const selected = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedStore" ? `${acc}${cur.split("=")[1]}` : acc, "");
  const selectedWS = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedWorkspace" ? `${acc}${cur.split("=")[1]}` : acc, "");
  const selectedId:any = stores.find((element: any) => element.name === selected && element.workspace?.id === (workspaces.find((elem: any) => elem.workSpaceDTO.name === selectedWS))?.workSpaceDTO?.id);
  const { context, loading } = LoadStorebyid(selectedId?.id as number);
  const { taglist } = LoadTags(selectedId?.id as number);
  const initialValueCookies = window.localStorage.getItem('stateAccordion')
  const stateActionAccord = (initialValueCookies!==null ? false : true )

  //const [propertyValueState,setPropertyValueState] = React.useState<any>(false)



  const handleSearch =async (values:any,handleLoading:any) => {
    setStateComponnent(true)
    setInitialFilter(values)
    let data:any
    let requestData = JSON.parse(JSON.stringify(values))
    //tag
    let tagElement:any = taglist.find((obj:any) => obj.name === values.tagId[0])
    requestData.tagId = tagElement.id
    //status
    if(values.statusIds.length !== 0){
      for (let index = 0; index < values.statusIds.length; index++) {
        const element = values.statusIds[index];
        let elementFound:any = StatusEnum.find((obj:any)=>obj.value === element)
        requestData.statusIds[index] = elementFound.key 
      }
    }
    //typeIds
    if(values.typeIds.length !== 0){
      for (let index = 0; index < values.typeIds.length; index++) {
        const element = values.typeIds[index];
        let elementFound:any = TypeListEnum.find((obj:any)=>obj.value === element)
        requestData.typeIds[index] = elementFound.key 
      }
    }
    //Context
    let context = requestData.context.filter((element:any)=>element.values.length!==0)
    if(context.length === 0 ){
      requestData.context = []
    }else{
      const mapContext = new Map();
      for (let index = 0; index < context.length; index++) {
        const element = context[index];
        let contextIndex:any = ContextData.findIndex((obj:any)=> obj.name === element.key);
        let keyId =  ContextData[contextIndex].id
        let valueIds:any = []
        element.values.forEach((elementValues:any) => {
          if(elementValues === "ALL"){
            valueIds = [0]
          }else{
          let foundValues:any = ContextData[contextIndex].values.find((obj:any)=> obj.value === elementValues)
          valueIds.push(foundValues.id)
        }
        });
        mapContext.set(keyId,valueIds)
      }
      requestData.context = Object.fromEntries(mapContext)
    }
    //textSearch
    if(values.textSearch.length !== 0){
      requestData.textSearch = values.textSearch
    }else{
      requestData.textSearch = ""
    }
    if(typeStore !== 'YAML'){
      if(context.length === 0 ){
        data = {
          "tagId": tagElement.id,
          "textSearch": requestData.textSearch,
          "typeIds":requestData.typeIds,
          "statusIds":requestData.statusIds
        }
      }else{
        data = {
          "tagId": tagElement.id,
          "textSearch": requestData.textSearch,
          "typeIds":requestData.typeIds,
          "context":requestData.context,
          "statusIds":requestData.statusIds
        }
      }
      getPropertyByFilter(tagElement,data,0,rowsPerPage).then((result:any)=>{
        setPage(0)
        setInitialPropertyFind(JSON.parse(result))
        setListPropertyFind(JSON.parse(result))  
        setTagIdFind(tagElement.name)
        setTimeout(() => {
          setStateComponnent(false)
          handleLoading(false)
          setStateFilter(data)
        }, 500);
      }).catch(function (error) {
        handleErrors(error, true, null)
        handleLoading(false)
      })
    }else{
      let dataFilter:any
      if(context.length === 0 ){
        dataFilter = {
          "context": [],
          "parentId": null,
          "statusIds": requestData.statusIds,
          "tagId":tagElement.id,
          "textSearch":requestData.textSearch,
          "typeIds":requestData.typeIds
        }
      }else{
        dataFilter = {
          "context": requestData.context,
          "parentId": null,
          "statusIds": requestData.statusIds,
          "tagId":tagElement.id,
          "textSearch":requestData.textSearch,
          "typeIds":requestData.typeIds,
          parentFullIdList:null
        }
      }
      if(modeView){
        let filterData = {
          "context": dataFilter.context,
          "parentId": dataFilter.parentId,
          "statusIds": dataFilter.statusIds,
          "tagId":tagElement.id,
          "textSearch":dataFilter.textSearch,
          "typeIds":dataFilter.typeIds,
          "parentFullIdList":dataFilter.parentFullIdList
        }
        let requestedData:any = filterData
        delete requestedData.parentId
        getPropertyTree(requestedData.tagId,requestedData).then((response:any)=>{
          setStatusYaml({status:true,value:response})
          setTimeout(() => {
            setStateComponnent(false)
            handleLoading(false)
            setYamlFilter(filterData)
          }, 500);
        }).catch(function (error) {
          handleErrors(error, true, null)
          handleLoading(false)
        })
      }else{
        let filterData = {
          "context": dataFilter.context,
          "parentId": dataFilter.parentId,
          "statusIds": dataFilter.statusIds,
          "tagId":tagElement.id,
          "textSearch":dataFilter.textSearch,
          "typeIds":dataFilter.typeIds
        }
        let requestedData:any = filterData
        if(context.length === 0 ){requestedData.context = {}}
        delete requestedData.parentId
        setStatusDeleteKey(!statusDeleteKey)
        getPropertyByFilter(tagElement ,filterData,0,rowsPerPage).then((result:any)=>{
          setStateComponnent(false)
          setPage(0)
          setInitialPropertyFind(JSON.parse(result))
          setListPropertyFind(JSON.parse(result)) 
          setTimeout(() => {
            handleLoading(false)
            setStateFilter(filterData)
          }, 500);
          setTagIdFind(tagElement.name)
        }).catch((error)=>{
          handleLoading(false)
        })
      }
    }
  }

  const handleChangePage = ( event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
    let propsRequest:any = stateFilter
    propsRequest.tagId = foundTag.id
    setStateComponnent(true)
    getPropertyByFilter(foundTag ,propsRequest,newPage-1,rowsPerPage).then((result:any)=>{
      setUpdateProperty(JSON.parse(result)) 
      setPage(newPage-1);
    }).catch(function (error) {
      setStateComponnent(false)
    })
  };
  const handleChangeRowsPerPage = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let rowPageData = parseInt(event.target.value, 10)
    let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
    let propsRequest:any = stateFilter
    propsRequest.tagId = foundTag.id
    getPropertyByFilter(foundTag ,propsRequest,page,rowPageData).then((result:any)=>{
      setUpdateProperty(JSON.parse(result)) 
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    }).catch(function (error) {

    })
  };
  
  const deletePropertyValue = async (Id: any,keyId:any,changeStateLoading:any) =>{
    let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
    changeStateLoading({state:true,id:Id})
    await jwtAxios.delete(`cs-property/delete-property-value?valueId=${Id}&tagId=${foundTag.id}`).then((response:any)=>{
      if (response && response.status === 204) {
        if(typeStore !== 'YAML'){
          setTimeout(() => {
            let index = listProperty.csPropertyKeyViewDTOList.findIndex((element:any)=>element.keyID === keyId);
            let Array =  listProperty.csPropertyKeyViewDTOList[index].contextKeys.filter((element:any)=>element.id !== Id)
            let object:any = listProperty.csPropertyKeyViewDTOList
            object[index].contextKeys = Array
            setDeleteArray({csPropertyKeyViewDTOList: object,pagesNumber: listProperty.pagesNumber,itemNumbers:listProperty.itemNumbers})
            setStatusDelete(!statusDelete)
            changeStateLoading(false)
          }, 500) 
        }else{
          if(modeView){
            let yamlData:any = yamlRequestData;
            let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
            yamlData.tagId = foundTag.id
            yamlData.parentId = null
            yamlData.parentFullIdList = null
            getPropertyTree(tagId,yamlData).then((response:any)=>{
              changeStateLoading(false)
              setStatusYaml({status:true,value:response})
            }).catch(function (error) {
              handleErrors(error, true, null)
              changeStateLoading(false)
            })
          }else{
            setTimeout(() => {
              changeStateLoading(false)

              let index = listProperty.csPropertyKeyViewDTOList.findIndex((element:any)=>element.keyID === keyId);
              let Array =  listProperty.csPropertyKeyViewDTOList[index].contextKeys.filter((element:any)=>element.id !== Id)
              let object:any = listProperty.csPropertyKeyViewDTOList
              object[index].contextKeys = Array
              setDeleteArray({csPropertyKeyViewDTOList: object,pagesNumber: listProperty.pagesNumber,itemNumbers:listProperty.itemNumbers})
              setStatusDelete(!statusDelete)
            }, 500) 
          }
        }
      }
    }).catch(function (error) {
      handleErrors(error, true, null)
      changeStateLoading(false)
    })
  }

  const deleteProperty = (Id: any,actionMode:string,changeStateLoading:any) => async () => {
    if(actionMode !== ActionMode.CREATION_MODE){
      let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
      let request:any = stateFilter
      request.tagId = foundTag.id
      await jwtAxios.delete(`cs-property/delete-property-key?keyId=${Id}&tagId=${foundTag.id}`).then((response:any)=>{
        if ( response.status === 204) {
          setTimeout(() => {
            if(typeStore !== 'YAML'){
              setStatusDeleteKey(!statusDeleteKey)
            getPropertyByFilter(foundTag ,request,page,rowsPerPage).then((result:any)=>{
              setInitialPropertyFind(JSON.parse(result))
              setListPropertyFind(JSON.parse(result)) 
            })
            
            }else{
              if(modeView){
                let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
                let yamlData:any = yamlRequestData;
                yamlData.tagId = foundTag.id
                yamlData.parentId = null
                yamlData.parentFullIdList = null
                getPropertyTree(tagId,yamlData).then((response:any)=>{
                  setStatusYaml({status:true,value:response})
                }).catch(function (error) {
                  console.log('error')
                })
              }else{
                setStatusDeleteKey(!statusDeleteKey)
                getPropertyByFilter(foundTag ,request,page,rowsPerPage).then((result:any)=>{
                  setInitialPropertyFind(JSON.parse(result))
                  setListPropertyFind(JSON.parse(result)) 
                })
              }
            }
          }, 500)
        }
      }).catch(function (error) {
        handleErrors(error, true, null)
      })
    }
    else{
      setHeaderAction(ActionMode.EDIT_MODE)
    }
  };
  const handlePropertKey = async (RequestDta:any,ActionType:any,actions:any,changeStateLoading:any,handleError:any) => {
    let notify:any
    let  URI:any
    let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
    let request:any = stateFilter
    request.tagId = foundTag.id
    if(ActionType ===ActionMode.CREATION_MODE){
      URI = `cs-property/add-property-key?tagId=${foundTag.id}`
      notify = (value : String) => toast.success("The property "+value+" is now created!",{autoClose: 3000,theme :"colored" });
      RequestDta.tagId = foundTag.id
    }else{
      URI = `cs-property/update-property-key?tagId=${foundTag.id}`
      notify = (value : String) => toast.success("The property "+value+" is now updated!",{autoClose: 3000,theme :"colored" });
      let Keys:any = Object.keys(RequestDta)
      let found = Keys.find((element:any)=> element === "parentId")
      RequestDta.tagId = foundTag.id
      if(found !== undefined){
        delete RequestDta.parentId;
      }
    }
    let interRequest = RequestDta
      await jwtAxios.post(URI, interRequest).then((res:any)=>{
        if (res && res.status === 201) {   
          handleError([])
          if(URI === `cs-property/update-property-key?tagId=${foundTag.id}`){
            changeStateLoading({state:true,id:RequestDta.id})
            setTimeout(() => {
              if(typeStore !== 'YAML'){
                getPropertyByFilter(foundTag ,request,page,rowsPerPage).then((result:any)=>{
                  setInitialPropertyFind(JSON.parse(result))
                  setListPropertyFind(JSON.parse(result))
                  setTimeout(() => {
                    toast.dismiss();
                    notify(RequestDta.key as string);
                    changeStateLoading(false)
                  }, 800)
                })
                setPropertyKeyStatus(!propertyKeyStatus)

              }else{
                if(modeView){
                  let yamlData:any = yamlRequestData;
                  let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
                  yamlData.tagId = foundTag.id
                  yamlData.parentId = null
                  yamlData.parentFullIdList = null
                  getPropertyTree(tagId,yamlData).then((response:any)=>{
                    setStatusYaml({status:true,value:response})
                    setTimeout(() => {
                      changeStateLoading(false)
                    }, 800)

                  }).catch(function (error) {
                    console.log('error')
                    changeStateLoading(false)
                  })
                }else{
                  getPropertyByFilter(foundTag ,request,page,rowsPerPage).then((result:any)=>{
                    setInitialPropertyFind(JSON.parse(result))
                    setListPropertyFind(JSON.parse(result))
                    setTimeout(() => {
                      changeStateLoading(false)
                      toast.dismiss();
                      notify(RequestDta.key as string);
                    }, 800)
                  })
                  setPropertyKeyStatus(!propertyKeyStatus) 

                }
              }
              
            }, 500)
          }if(URI === `cs-property/add-property-key?tagId=${foundTag.id}`){
            
            setTimeout(() => {
              setStatusNewPropertyKey(false)
              changeStateLoading(false)
              toast.dismiss();
              notify(RequestDta.key as string);
              if(typeStore !== 'YAML'){
                let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
                stateFilter.tagId = foundTag.id
              getPropertyByFilter(foundTag ,stateFilter,page,rowsPerPage).then((result:any)=>{
                setInitialPropertyFind(JSON.parse(result))
                setListPropertyFind(JSON.parse(result))
              })
              setPropertyKeyStatus(!propertyKeyStatus) 
              setHeaderAction(ActionMode.EDIT_MODE)

            }else{
              if(modeView){
                let yamlData:any = yamlRequestData;
                let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
                yamlData.tagId = foundTag.id
                yamlData.parentId = null
                yamlData.parentFullIdList = null
                getPropertyTree(tagId,yamlData).then((response:any)=>{
                  setStatusYaml({status:true,value:response})
                }).catch(function (error) {
                  console.log('error')
                })
              }else{
                setStatusDeleteKey(!statusDeleteKey)
                getPropertyByFilter(foundTag ,request,page,rowsPerPage).then((result:any)=>{
                  setInitialPropertyFind(JSON.parse(result))
                  setListPropertyFind(JSON.parse(result)) 
                })
              }
              
            }
            let data:any = propertyDTO
            data.parentId = null
            data.fullName = ""
            setPropertyDTO(data) 
            }, 500)
          }
        }
      }).catch(function (error) {
        changeStateLoading(false)

        handleErrors(error, false, handleError)

      })
  };
  const handlePropertyValue = async (setContextState:any, RequestDta:any,ActionType:any,changeStateLoading:any,handleActionState:any,handleError:any,resetForm:any) => {
    let notify:any
    let  URI:any
    let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
    let request:any = stateFilter
    request.tagId = foundTag.id
    if(ActionType === ActionMode.CREATION_MODE){
      URI = `cs-property/add-property-value?tagId=${foundTag.id}`
      notify = (value : String) => toast.success("The property value "+value+" is now created!",{autoClose: 3000,theme :"colored" });
    }else{
      URI = `cs-property/update-property-value?tagId=${foundTag.id}`
      notify = (value : String) => toast.success("The property value is now updated!",{autoClose: 3000,theme :"colored" });
    }
    changeStateLoading({state:true,id:RequestDta.id} )
      await jwtAxios.post(URI, RequestDta).then((response:any)=>{
        if (response && response.status === 201) {
          if(URI ==="cs-property/update-property-value"){
            if(typeStore !== 'YAML'){
              setTimeout(() => {
                handleActionState(false)
                let index = listProperty.csPropertyKeyViewDTOList.findIndex((element:any)=>element.keyID === RequestDta.keyId);
                let indexValue =  listProperty.csPropertyKeyViewDTOList[index].contextKeys.findIndex((element:any)=>element.id === RequestDta.id)
                let object = listProperty
                object.csPropertyKeyViewDTOList[index].contextKeys[indexValue].value = RequestDta.value
                object.csPropertyKeyViewDTOList[index].contextKeys[indexValue].context = response.data.context
                object.csPropertyKeyViewDTOList[index].dirty = true;
                setUpdateProperty(object)
                setValueStatus(!valueStatus)
                toast.dismiss();
                notify(RequestDta.value as string);
                setStateVlaue(false)
                setValueStatus(false)
              }, 500)
            }
            else{
              if(modeView){
                let yamlData:any = yamlRequestData;
                let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
                yamlData.tagId = foundTag.id
                yamlData.parentId = null
                getPropertyTree(tagId,yamlData).then((response:any)=>{
                  setStatusYaml({status:true,value:response})
                }).catch(function (error) {
                  console.log(error)
                })
              }else{
                setTimeout(() => {
                  handleActionState(false)
                let index = listProperty.csPropertyKeyViewDTOList.findIndex((element:any)=>element.keyID === RequestDta.keyId);
                let indexValue =  listProperty.csPropertyKeyViewDTOList[index].contextKeys.findIndex((element:any)=>element.id === RequestDta.id)
                let object = listProperty
                object.csPropertyKeyViewDTOList[index].contextKeys[indexValue].value = RequestDta.value
                object.csPropertyKeyViewDTOList[index].contextKeys[indexValue].context = response.data.context
                object.csPropertyKeyViewDTOList[index].dirty = true;
                setUpdateProperty(object)
                setValueStatus(!valueStatus)
                toast.dismiss();
                notify(RequestDta.value as string);
                setStateVlaue(false)
                setValueStatus(false)
              }, 500)
              }
            }
          }
          else{
            if(typeStore !== 'YAML'){
                setTimeout(() => {
                  getPropertyByFilter(foundTag ,request,page,rowsPerPage).then((result:any)=>{
                    setInitialPropertyFind(JSON.parse(result))
                    setListPropertyFind(JSON.parse(result))
                  })
                  
                  toast.dismiss();
                  notify(RequestDta.value as string);
                  setStateVlaue(false)
                  setValueStatus(false)
                  let data:any = propertyDTO
                  data.parentId = null
                  data.fullName = ""
                  setPropertyDTO(data)
                }, 500)
            } else{
                if(modeView){
                  let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);

                  setStateVlaue(false)
                  setValueStatus(false)

                    let yamlData:any = yamlRequestData;
                    yamlData.tagId = foundTag.id
                    yamlData.parentId = null
                    yamlData.parentFullIdList = null
                    getPropertyTree(tagId,yamlData).then((response:any)=>{
                      setStatusYaml({status:true,value:response})
                      toast.dismiss();
                      notify(RequestDta.value as string);
                    }).catch(function (error) {
                      console.log(error)

                    })

                }else{
                  setTimeout(() => {
                    getPropertyByFilter(foundTag ,request,page,rowsPerPage).then((result:any)=>{
                      setInitialPropertyFind(JSON.parse(result))
                      setListPropertyFind(JSON.parse(result))
                    })
                    
                    toast.dismiss();
                    notify(RequestDta.value as string);
                    setStateVlaue(false)
                    setValueStatus(false)
                    let data:any = propertyDTO
                    data.parentId = null
                    data.fullName = ""
                    setPropertyDTO(data)
                  }, 500)
                }
              }
          }
          setTimeout(() => {
            changeStateLoading({state:null,id:null})
            setContextState(false)
          }, 1000)

        }
      }).catch(function (error) {
        changeStateLoading({state:null,id:null})
        handleErrors(error,false,handleError)
      })
  };
  
  const handleNewPropertyKey = async (parentKey:any,fullName:any)=>{
    setStatusNewPropertyKey(true)
    handelCreationProperty(ActionMode.CREATION_MODE)
    let data:any = propertyDTO
    data.parentId = parentKey
    data.fullName = fullName
    setPropertyDTO(data)
  }
  const {property,loadingProperties} = LoadProperty(tagId ,filterDataJson,0,10)
  const handelCreationProperty = (action:ActionMode)=>{setHeaderAction(action)}
  const addForm = () =>{
    setStatusNewPropertyKey(true)
    handelCreationProperty(ActionMode.CREATION_MODE)
  }
  const changeStatusValue = (status:any)=>{setStateVlaue(status)}

  const cancelCreationPropertyKey = ()=>{
    setStatusNewPropertyKey(false)
    let data:any = propertyDTO
    data.parentId = null
    data.fullName = ""
    setPropertyDTO(data)
  }
  const handleUnfold = ()=>{
    setUnfold(!unfold)
    setAction(true)
  }
  const handlePropertyNameFiler = (value:any) => {
  }


  const handleListMode = () =>{
      setModeView(!modeView)
      let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
      let dataRequest:any = stateFilter;
      dataRequest.tagId = foundTag.id
      getPropertyByFilter(foundTag ,dataRequest,page,rowsPerPage).then((result:any)=>{
        setInitialPropertyFind(JSON.parse(result))
        setListPropertyFind(JSON.parse(result))
      })
      setPropertyKeyStatus(!propertyKeyStatus)

    setTreeModeView(true)

  }
  const handleTreeMode = () =>{
      setModeView(!modeView)
      if(!modeView){
        let yamlData:any = yamlRequestData;
        let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
        yamlData.tagId = foundTag.id
        yamlData.parentId = null
        yamlData.typeIds = stateFilter.typeIds
        yamlData.statusIds = stateFilter.statusIds
        yamlData.context = stateFilter.context
        
        getPropertyTree(tagId,yamlData).then((response:any)=>{
          setStatusYaml({status:true,value:response})
        }).catch(function (error) {
          console.log('error')
        })
      }
  }




  const publishPropertyData = (propertyKey:any) => {
    let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
    let requestData={
      "typeId":TaskTypeId.PUBLICATION,
      "publishPropertyTaskDTO":{
        "publishEmptyProperties":true,
        "updateGroupAccessRules":false
      },
      "keyId":propertyKey.keyID
    }
    handlePublish(requestData,foundTag.name)

  }


  const handlePublish= async (requestData:any,tag:any)=> {
    let tagId: any = taglist.find((element: any) => element.name === tag)
    if (tagId !== undefined) {
      requestData.publishPropertyTaskDTO.tagId = tagId.id
      let request: any = stateFilter
      request.tagId = tagId.id
      try {
        if (await publishProperty(requestData, tagId)){
          setPublishResponse(requestData.keyId)
        }


        setTimeout(() => {
          if(typeStore !== 'YAML'){
            let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
            getPropertyByFilter(foundTag ,request,page,rowsPerPage).then((result:any)=>{
              setInitialPropertyFind(JSON.parse(result))
              setListPropertyFind(JSON.parse(result))
            })
            setPropertyKeyStatus(!propertyKeyStatus)

          }else{
            if(modeView){
              let yamlData:any = yamlRequestData;
              let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
              yamlData.tagId = foundTag.id
              yamlData.parentId = null
              yamlData.parentFullIdList = null
              getPropertyTree(tagId,yamlData).then((response:any)=>{
                setStatusYaml({status:true,value:response})

              }).catch(function (error) {
                handleErrors(error,true,null)

              })
            }else{
              let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
              getPropertyByFilter(foundTag ,request,page,rowsPerPage).then((result:any)=>{
                setInitialPropertyFind(JSON.parse(result))
                setListPropertyFind(JSON.parse(result))
              })
              setPropertyKeyStatus(!propertyKeyStatus)
            }
          }
        }, 1000)

      } catch (error) {
        handleErrors(error,true,null)
      }
    }
  }


  const handleAutocomplete  =  (newInputValue:any) => {
    let tagElement:any = taglist.find((obj:any) => obj.name === initialFilter.tagId[0])
    const data:any = {
      "tagId":tagElement.id,
      "textSearch":newInputValue,
      "typeIds":initialFilter.typeIds,
      "context":initialFilter.context.length===0?null:initialFilter.context
    }
    getAutocomplete(data).then((response:any)=>{
      setAutoCompleteList(response)
    }).catch(function (error) {
      handleErrors(error, true, null)
    })

  };

  useEffect(() => {
    setStatusNewPropertyKey(false)
    let dataInit:any = propertyDTO
    dataInit.parentId = null
    dataInit.fullName = ""
    setPropertyDTO(dataInit)
    setStateFilter(filterData)
    if ((loading === true)) {
      setLoadingx(false);
    }

    setTaglist(taglist);
    setTagId(tagsLists.find((element: any) => element.name === Tag))

    setContextData(context);
    setTimeout(() => {
      setLoadingx(loading);
    }, 500);

    if (selectedId !== undefined) {
      setTypeStore(getStoreType(selectedId.typeId))
    }

  }, [context, loading, Data, dispatch, stores, selectedId, taglist, tagsLists, propertyDTO]);

  useEffect(() => {
    dispatch(loadStore());
    dispatch(loadWorkspace());
  }, [dispatch]);

  useEffect(() => {
    setInitialProperty(deleteArray)
    setListProperty(deleteArray)
  }, [deleteArray]);

  useEffect(() => {
    setInitialProperty(updateProperty)
    setListProperty(updateProperty)
    setTimeout(() => {
      setStateComponnent(false)
    }, 500);
  }, [updateProperty,rowsPerPage,page]);

  useEffect(()=>{
    if(selectedId){
      if (tagId !== undefined && tagId !== null && loadingProperties !==false && taglist.length !== 0 ) {
        setInitialFilter(JSON.parse(JSON.stringify(initialFilterFormik)))
        setStateComponnent(true)
        setListProperty(property)
        setInitialProperty(property)
        let interFilter:any = filter
        interFilter[1].values = taglist
        interFilter[4].context = ContextData

        setTimeout(() => {
          setFilterInitData(interFilter)
          setStateComponnent(false)
        }, 500);

      }
    } else {
      setListProperty({ pagesNumber: 0, itemNumbers: 0, csPropertyKeyViewDTOList: [] })
      setStateComponnent(false)
      setTypeStore("PROPERTIES")
    }

  },[tagId, filterDataJson, loadingProperties, property, typeStore, taglist, ContextData, selectedId, DataWS])

  useEffect(()=>{
      setListProperty(listPropertyFind)
      setInitialProperty(initialPropertyFind)
  },[statusCreation,statusDeleteKey,initialPropertyFind,listPropertyFind])

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
    if(statusYaml.status){
      if(treeModeView) {
        let yamlData:any = yamlRequestData;
        let foundTag:any = tagsLists.find((element:any)=> element.name === TagIdFind);
        yamlData.tagId = foundTag.id
        yamlData.parentId = null
        yamlData.typeIds = stateFilter.typeIds
        yamlData.statusIds = stateFilter.statusIds
        yamlData.context = stateFilter.context

        getPropertyTree(tagId,yamlData).then((response:any)=>{
          setStatusYaml({status:true,value:response})
        }).catch(function (error) {
          console.log('error')
        })
      }
      else{
        setTimeout(() => {
          setPropertyTree(statusYaml.value)
        }, 500)

      }
      setTreeModeView(false)
      setStatusYaml({status:false,value:[]})
    }
  },[statusYaml,treeModeView, TagIdFind, stateFilter.context, stateFilter.statusIds, stateFilter.typeIds, tagId, tagsLists])

  useEffect(()=>{
    if (tagId !== undefined && tagId !== null) {
    let yamlData:any = yamlRequestData;
        yamlData.tagId = tagId.id
        yamlData.parentId = null
        getPropertyTree(tagId.id,yamlData).then((response:any)=>{
          setPropertyTree(response)
        }).catch(function (error) {
          console.log('error')
        })
      }
  },[ tagId])

  useEffect(()=>{
    if(typeStore!=="YAML" && modeView){
      setModeView(false)
    }
  },[ typeStore,modeView])


  
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.Typography}>Properties</div>
      </div>
      <div className={classes.divider}/>
      <div  className={classes.filter}>
        <Filter
          disabled={!selectedId}
          stateFilter={initialFilter}
          stateComponent={stateComponnent}
          context={null}
          filterData={filterInitData}
          handleSearch={handleSearch}
          resetForm={JSON.parse(JSON.stringify(initialFilterFormik))}
          list={autoCompleteList}
          handleAutocomplete={handleAutocomplete}
        />
      </div>
      <div className={classes.divider}/>
      <div className={classes.action}  >
        <div style={{display:'flex',alignItems:'center',padding:8}}>
          <AccessButton
              disabled={!selectedId}
              id={"add_form"} actionType={ActionAccessMode.WRITE_MODE}
              className={classes.boardStylekey} handleClick={addForm}>
            <Icon style={{ color: green[500] }}>add_circle</Icon>
              Add New Properties
          </AccessButton>
        </div>
        <div style={{display:'flex',alignItems:'center'}}>

          <div  className={classes.unfold} style={{marginRight:4}}>
            <Tooltip title={"List Mode"} arrow enterDelay={0} leaveDelay={100}>
            <span>
              <IconButton  id={`properties_mode_list`} disabled={!modeView} onClick={handleListMode} className={classes.viewMode}>
                <FormatListBulletedIcon style={{marginLeft:2,width:22,height:22}} />
            </IconButton>
            </span>

            </Tooltip>
          </div>
          {typeStore === 'YAML' &&
            <div  className={classes.unfold} >
              <Tooltip title={"Tree Mode"} arrow enterDelay={0} leaveDelay={100}>
              <span>
                <IconButton id={`properties_mode_tree`} disabled={modeView} onClick={handleTreeMode} className={classes.viewMode}>
                <AccountTreeIcon style={{marginLeft:2,width:22,height:22}}/>
              </IconButton>
              </span>

              </Tooltip>
            </div>
          }
          <div className={classes.divider_Vertical}/>
          {(unfold) &&
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
          {(!unfold) &&
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
            {listProperty.itemNumbers !== undefined && <Typography>{listProperty.itemNumbers} Items</Typography> }
          </div>
        </div>
      </div>
      <div className={classes.divider}/>
      {statusNewPropertyKey &&
        <div style={{width:'100%',padding:4}}>

          <PropertyDetails
              key={'creationDetails'}
              selectedTag={tagId}
              headerActionState={headerAction}
              handleKey={handlePropertKey}
              handleValue={handlePropertyValue}
              deleteKey={deleteProperty}
              deleteValue={deletePropertyValue}
              csPropertyKey={propertyDTO}
              initialContext={ContextData}
              stateValue={null}
              changeStatusValue={changeStatusValue}
              cancelCreationAction={cancelCreationPropertyKey}
              storeType={typeStore}
              handleNewPropertyKey={handleNewPropertyKey}
              handlePropertyFiler={handlePropertyNameFiler}
              modeView={modeView}
              indexElement={null}
              publishProperty={publishPropertyData}
              addValueState={false}
            />
        </div>
      }


      <PropertiesList
          loadingx={loadingx}
          listProperty={listProperty}
          stateActionAccord={stateActionAccord}
          tagId={tagId}
          handleKey={handlePropertKey}
          handleValue={handlePropertyValue}
          deleteKey={deleteProperty}
          deleteValue={deletePropertyValue}
          cancelKey={cancelCreationPropertyKey}
          storeType={typeStore}
          ContextData={ContextData}
          initialProperty={initialProperty}
          stateValue={stateValue}
          changeStatusValue={changeStatusValue}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          fold={{ handleUnfold: handleUnfold, action: action, setAction: setAction, typeAction: typeAction, state: unfold, callback: setUnfold }}
          handleNewPropertyKey={handleNewPropertyKey}
          handlePropertyFiler={handlePropertyNameFiler}
          modeView={modeView}
          propertyTree={propertyTree}
          requestData={yamlFilter}
          stateComponnent={stateComponnent}
          stateTreeFilter={yamlFilter}
          publishProperty={publishPropertyData}
          publishResponse={publishResponse}
          addValueState={false}
        />

    </div>

  );

};

export default Properties;
