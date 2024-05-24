import {Icon, IconButton, Typography} from "@material-ui/core";
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LoadmaxTags} from "redux/actions";
import {AppState} from "redux/store";
import {Icombo} from "types/models/Combo";
import CreateTag from "../TagCreation";
import TagGraph, {TagProps} from "../TagGraph";
import {deleteTag, getGraphModeTags, getListModeTags, mergeTag, updateTag} from "shared/services/tagsService";
import useStyles from "./styles";
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import {green} from "@material-ui/core/colors";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TagList from "../TagList";
import TagFilter from "../TagFilter";
import {ActionAccessMode, ActionMode} from "shared/constants/AppEnums";
import {handleErrors} from "../../../shared/constants/HandleErrors";
import AccessButton from "shared/components/AccessButton";
import {loadWorkspace} from "../../../redux/actions/Workspace";
import { Tooltip } from "@mui/material";

const getInitialStateTags = (tagList:any)=>{
  if(tagList !== null && tagList !== undefined && tagList.length !== 0){
    if(tagList.length === 1){
      return {firstTag:tagList[0].name,nextTags:[],initialTagLevel:[]}
    }else{
      let nextTagsList:any = []
      let listAllTag:any = [];
      let initialTagLevel:any = []
      //listAllTag: creation of a list composed of all the names of the tag for the recovery of the first tag
      //initialTagLevel:  creation of a list composed of all tags with leevelX and LevelY initialized as 0
      //nextTagsList:  creation of a list composed of all the tags and their following ones
      for (let index = 0; index < tagList.length; index++) {
        const elementTag = tagList[index];

        listAllTag.push(elementTag.name)
        initialTagLevel.push({id:elementTag.id,name:elementTag.name,description:elementTag.description,levelX:0,levelY:0,nextTags:elementTag.nextTags})

        if(elementTag.name !== "Latest"){
          for (let indexNext = 0; indexNext < elementTag.nextTags.length; indexNext++) {
            const elementNext = elementTag.nextTags[indexNext];
            nextTagsList.push({ from: elementTag.id,nameFrom:elementTag.name, to: elementNext.id ,nameTo:elementNext.name})
          }
        }
      }
      //retrieve the first label in graph
      for (let index = 0; index < nextTagsList.length; index++) {
        const elementTag = nextTagsList[index];
        let foundTagIndex:any = listAllTag.findIndex((obj:any)=> obj === elementTag.nameTo)
        if(foundTagIndex !== (-1)){
          listAllTag.splice(foundTagIndex, 1)
        }
      }

      return {firstTag:listAllTag[0],nextTags:nextTagsList,initialTagLevel:initialTagLevel}
    }
  }
}

const levelXY = (tagsList:any)=>{
  if(tagsList !== null && tagsList !== undefined && tagsList.length !== 0){
    if(tagsList.length === 1) {
      return {levelTags:[{id:tagsList[0].id,name:tagsList[0].name,description:tagsList[0].description,levelX:0,levelY:0,nextTags:tagsList[0].nextTags}],nextTags:[]}
    }else{
      let InitialTagData:any = getInitialStateTags(tagsList)
      let mainTag:any = InitialTagData.firstTag
      let initialTagLevel = JSON.parse(JSON.stringify(InitialTagData.initialTagLevel))
      let firstTag:any = tagsList.find((obj:any)=>obj.name === mainTag)

      calculate_xy(firstTag,initialTagLevel,tagsList, 0, 0)
      return {levelTags:initialTagLevel,nextTags:InitialTagData.nextTags}
    }
  }else{
    return {levelTags:[],nextTags:[]}
  }
}

const calculate_xy = (tag:any,result:any,listTags:any, x:any, y:any) =>{
  let next_x:any;
  let next_y:any;
  let tagIndex:any = result.findIndex((obj:any)=> obj.name === tag.name)
  let tagInitialData:any = listTags.find((obj:any)=> obj.name === tag.name)
  if(tagIndex !== (-1) && result[tagIndex].levelX > (x + 1) ){
    next_x = result[tagIndex].levelX;
  }else{
    next_x = x + 1;
  }


  result[tagIndex].levelX = x
  result[tagIndex].levelY = y
  if(tagInitialData.nextTags.length !== 0){
    for (let index = 0; index < tagInitialData.nextTags.length; index++) {
      let nextTagElement:any = tagInitialData.nextTags[index]
      let nextTagIndex:any = result.findIndex((obj:any)=> obj.name === nextTagElement.name)
      if(nextTagIndex !== (-1) && result[nextTagIndex].levelX > (x + 1) ){
        next_x = result[nextTagIndex].levelX;
      }else{
        next_x = x +1;
      }
      if(nextTagIndex !== (-1)){
        if(tagIndex !== (-1) && result[tagIndex].levelY > index ){
          next_y = result[tagIndex].levelY + index;
        }else{
          if(tagIndex !== (-1)){
            next_y = result[tagIndex].levelY + index;
          }else{
            next_y = index;
          }
        }
      }
      calculate_xy(nextTagElement,result,listTags,next_x, next_y)
    }
  }

}


const Tag: React.FC = (props) => {
  const classes = useStyles();
  const [fold,setFold] = useState<Boolean>(false)
  const [displayMode,setDisplayMode] = useState<boolean>(true)
  const [MaxofTags, setMaxofTags] = useState<number>(0);
  const [tagsLists, setTaglist] = useState<TagProps[]>([]);
  const [nextTags,setNextTags] = useState<any>([])
  const [tagGraphList, setTagGraphList] = useState<any>([]);
  const [loadingx, setLoadingx] = useState(false);
  const [selectedid, setSelectedid] = useState<any>({});
  const [creationTagsStatus,setCreationTagsStatus] = useState<any>(false)
  const [stateCreate,setStateCreate] = useState<any>(false);
  const [stateComponnent,setStateComponnent] = useState<any>(true)
  const [tagsListMode,setTagsListMode] = useState<any>({cstagViewDTO:[],numberOfItems:0,numberOfPages:0})
  const [dataAction,setDataAction] = useState<any>({state:false,displayMode:true,data:{cstagViewDTO:[],numberOfItems:0,numberOfPages:0}})
  const [dataGraphTags,setDataGraphTags] = useState<any>({state:false,displayMode:true,data:{cstagViewDTO:[],numberOfItems:0,numberOfPages:0}})
  const [nameTagFIlter,setNameTagFilter] = useState<any>("")
  const [scaleZoom, setScaleZoom] = useState(0.8);
  const [stateZoom,setStateZoom] = useState(false)
  const transformComponentRef:any = React.useRef(null);
  const [page,setPage] = useState<any>(0)
  const [size,setSize] = useState<any>(10)
  const [statePage,setStatePage] = useState<any>({state:false,data:{cstagViewDTO:[],numberOfItems:0,numberOfPages:0}})

  let dispatch = useDispatch();
  const Data: Icombo = useSelector((state: AppState) => state.combo);
  const DataWS: Icombo = useSelector((state: AppState) => state.comboWS);
  const workspaces = useSelector((state: AppState) => state.workspaces.workspaceslist);
  const selected = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedStore" ? `${acc}${cur.split("=")[1]}` : acc, "");
  const selectedWS = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === "selectedWorkspace" ? `${acc}${cur.split("=")[1]}` : acc, "");
  const selectWorkspace = workspaces.find((elem: any) => elem.workSpaceDTO.name === selectedWS)
  const selectedStore:any = selectWorkspace?.storeList.find((element: any) => element.name === selected );

  const { max } = LoadmaxTags(selectedStore);
  const handleFold = ()=> setFold(!fold)

  const handleDisplayMode = () =>{setDisplayMode(!displayMode)}

  const handleTag = async (actionMode:ActionMode,value:any,handleLoading:any,handleError:any) =>{
    if(actionMode === ActionMode.DELETE_MODE){
      await deleteTag(value).then((response:any)=>{
        if (response && response.status === 204) {
          fetchData()
          setStateCreate(!stateCreate)
        }
      })
    }
    if(actionMode === ActionMode.EDIT_MODE){
      handleLoading(true)
      updateTag(value).then((response:any)=>{
        fetchData()
      }).catch((error:any)=>{
        handleLoading(false)
        handleErrors(error,false, handleError)

      })
    }
    if(actionMode === ActionMode.DISPLAY_MODE){
      if(selectedStore !== undefined ){
        getGraphModeTags(selectedStore?.id).then(itemsTags => {
          setDataGraphTags({state:true,displayMode:!displayMode,data:itemsTags})
        })
        let requestData:any = {
          "name": value.name,
          "storeId": selectedStore?.id
        }
        getListModeTags(requestData,page,size).then(itemsTags => {
          setNameTagFilter(value.name)
          handleLoading(false)
          setDataAction({state:true,displayMode:displayMode,data:itemsTags})
        })
      }
    }
  }

  const fetchData = ()=>{
    if(selectedStore !== undefined ){
      getGraphModeTags(selectedStore?.id).then(itemsTags => {
        setDataGraphTags({state:true,data:itemsTags})
      })

      let requestData:any = {
        "name": nameTagFIlter,
        "storeId": selectedStore?.id
      }
      getListModeTags(requestData,page,size).then(itemsTags => {
        setDataAction({state:true,displayMode:displayMode,data:itemsTags})
      })

    }
  }

  const handlePage = (typeAction:any,value:any) =>{
    if(typeAction === "page"){
      setPage((value-1))
      let requestData:any = {
        "name": nameTagFIlter,
        "storeId": selectedStore?.id
      }
      getListModeTags(requestData,(value-1),size).then(itemsTags => {
        setStatePage({state:true,data:itemsTags})
      })
    }else{
      setSize(value)
    }
  }

  const mergeTags =(tagId:any,value:any) =>{

    mergeTag(tagId,value)
        .then((response:any)=>{fetchData()})
        .catch((error:any)=>{
          handleErrors(error,true, null)
        })
  }


  useEffect(() => {
    setTimeout(() => {
      setLoadingx(true);
    }, 500);
    setSelectedid(selectedStore?.id);
    if (selectedStore === undefined) {

    }

  }, [selectedStore,dispatch,selectedid,Data]);

  useEffect(()=>{
    if(selectWorkspace){
      setPage(0)
      setMaxofTags(max);
      setStateComponnent(true)
      if(selectedStore !== undefined ){
        getGraphModeTags(selectedStore?.id).then(items => {
          setLoadingx(false);
          setTaglist(items);
          let resultXY:any = levelXY(items)
          setNextTags(resultXY.nextTags)
          setTagGraphList(resultXY.levelTags);
          setTimeout(() => {
            setStateComponnent(false)
          }, 500);
        })
  
        let requestData:any = {
          "name": "",
          "storeId": selectedStore?.id
        }
        getListModeTags(requestData,0,10).then(items => {
          setTimeout(() => {
            setTagsListMode(items);
            setStateComponnent(false)
          }, 500);
  
        })
  
      } else {
        setTagsListMode({cstagViewDTO:[],numberOfItems:0,numberOfPages:0})
        setTagGraphList([])
        setStateComponnent(false)
      }

    } else {
      dispatch(loadWorkspace())
    }



  },[max, selectedStore,displayMode, DataWS, Data, selectWorkspace, dispatch])

  useEffect(()=>{

    if(dataAction.state && dataGraphTags.state){
      setStateComponnent(true)
      setTaglist(dataGraphTags.data);
      let resultXY:any = levelXY(dataGraphTags.data)
      setNextTags(resultXY.nextTags)
      setTagGraphList(resultXY.levelTags);
      setTagsListMode(dataAction.data);
      setTimeout(() => {
        setDataAction({state:false,displayMode:true,data:{cstagViewDTO:[],numberOfItems:0,numberOfPages:0}})
        setDataGraphTags({state:false,displayMode:true,data:{cstagViewDTO:[],numberOfItems:0,numberOfPages:0}})
        setStateComponnent(false)
      }, 500);
    }
  },[dataAction,dataGraphTags])
  useEffect(()=>{

    if(statePage.state){
      setStateComponnent(true)
      setTagsListMode(statePage.data);
      setTimeout(() => {
        setStateComponnent(false)
        setStatePage({state:false,data:{cstagViewDTO:[],numberOfItems:0,numberOfPages:0}})
      }, 500);
    }


  },[statePage])

  useEffect(()=>{
    setStateZoom(stateZoom)
  },[stateZoom])
  return (
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.Typography}>Tag</div>
        </div>
        <div className={classes.divider}/>
        <div className={classes.filter}>
          <TagFilter
              handleFilter={handleTag}
              filterRequest={undefined}
              stateComponnent={stateComponnent}
              disabled={!displayMode || !selectedStore}
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
              handleClick={()=>{setCreationTagsStatus(true)}}
            >
              <Icon style={{ color: green[500] }}>add_circle</Icon>
              Add New Tag
            </AccessButton>
          </div>
          <div style={{display:'flex',alignItems:'center'}}>

            <div  className={classes.unfold} style={{marginRight:4}}>
              <Tooltip title={"List Mode"} arrow enterDelay={0} leaveDelay={100}>
                <span>
                  <IconButton id={`properties_mode_list`} disabled={displayMode} onClick={handleDisplayMode} className={classes.viewMode}>
                  <FormatListBulletedIcon style={{marginLeft:2,width:22,height:22}} />
                </IconButton>
                </span>

              </Tooltip>
            </div>
            <div  className={classes.unfold}>
              <Tooltip title={"Tree Mode"} arrow enterDelay={0} leaveDelay={100}>
                <span>
                  <IconButton id={`properties_mode_tree`} disabled={!displayMode} onClick={handleDisplayMode} className={classes.viewMode}>
                  <AccountTreeIcon style={{marginLeft:2,width:22,height:22}}/>
                </IconButton>

                </span>

              </Tooltip>
            </div>
            {displayMode && <div className={classes.divider_Vertical}/>}
            {(displayMode && fold) &&
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
            {(displayMode && !fold) &&
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
              {tagsListMode.itemNumbers !== undefined && <Typography>{tagsListMode.itemNumbers} Items</Typography> }
            </div>
          </div>
        </div>
        <div className={classes.divider}/>
        {creationTagsStatus &&
        <div style={{width:'100%',padding:4}}>
          <CreateTag
            stateCreate={stateCreate}
            changeStateCreate={setStateCreate}
            openCreation={setCreationTagsStatus}
            loadData={fetchData}
            tagsLists={tagsLists}
            selectedid={selectedid}
            maxofTags={MaxofTags}
            handleStateComponent={setStateComponnent}
          />
        </div>
        }

        {displayMode &&
        <TagList stateComponnent={stateComponnent} listTag={tagsListMode} fold={fold} handleTag={handleTag}
                 handlePages={handlePage} page={page} size={size} mergeTags={mergeTags}/>
        }


        {!displayMode &&
        <TagGraph
            handleEdit={handleTag}
            handleZoomState={setStateZoom}
            refZoom={transformComponentRef}
            scaleZoom={scaleZoom}
            handleScaleZoom={setScaleZoom}
            loading={loadingx}
            selectedId={selectedStore}
            DeleteTagAction={handleTag}
            tags={tagGraphList}
            nextTags={nextTags}
            stateComponnent={stateComponnent}
            fetchData={fetchData}
        />
        }

      </div>

  );
};

export default Tag;
