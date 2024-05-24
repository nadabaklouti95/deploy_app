import { Icon, IconButton, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import * as React from "react";
import { useEffect, useState } from "react";
import useStyles from "./styles";
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import { ActionAccessMode, ActionMode, filterTypeEnum } from "shared/constants/AppEnums";
import { useDispatch, useSelector } from "react-redux";
/*import {loadStore} from "redux/actions";
import { Icombo } from "types/models/Combo";*/
import { AppState } from "redux/store";
import Filter from "shared/components/Filter";
import WorkspaceList from "../WorkspaceList";
import WorkspaceAdd from "../WorkspaceAdd";
import { createWorkspace, deleteWorkspace, getWorkspacesByFilter, updateWorkspace} from "../../../shared/services/workspaceService";
import {handleErrors} from "../../../shared/constants/HandleErrors";
import {IWorkspace} from "../../../types/models/Workspace";
import {loadWorkspace} from "../../../redux/actions/Workspace";
import {LoadComboWS} from "../../../redux/actions/ComboWS";
import AccessButton from "shared/components/AccessButton";
import { loadStore } from "redux/actions";
import { Tooltip } from "@mui/material";


let initialFilterFormik = {
    workspaceName: "",
}
let filter:any = [
    { type:filterTypeEnum.TEXT,name:'workspaceName',label:'Name',order:1,values:"",search:false,context:null},
    ]

const Workspace: React.FC<any> = () => {

    const workSpaceViewDTOS :IWorkspace[] =  []
    const classes = useStyles()
    const [stateComponnent,setStateComponnent] = useState<any>(false)
    const [fold,setFold] = useState<Boolean>(false)
    const [workspaceListt,setWorkspaceList] = useState<any>({ "itemNumbers": 0,"pagesNumber": 0, "workSpaceViewDTOS": workSpaceViewDTOS})
    const [page,setPage] = useState<any>(0)
    const [statePage,setStatePage] = useState<any>({state:false,data:{ "itemNumbers": 0,"pagesNumber": 0, "workSpaceViewDTOS": workSpaceViewDTOS }})
    const [filterInitData,setFilterInitData] = React.useState<any>(filter)
    const [newWorkspaceState,setNewWorkspaceState] = React.useState<any>(false)
    const [size,setSize] = useState<any>(10)



    //const Data: Icombo = useSelector((state: AppState) => state.combo);
    const DataWS: any = useSelector((state: AppState) => state.comboWS);

    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadStore());
        dispatch(loadWorkspace());
    }, [dispatch,DataWS]);
    //}, [dispatch,DataWS]);



    const handleFold = ()=> setFold(!fold)
    const handlePage = (typeAction:any,value:any) =>{
        if(typeAction === "page"){
            setPage((value-1))
            getWorkspacesByFilter({},size,(value-1)).then(itemsTags => {
                setStatePage({state:true,data:itemsTags})
            })

        }else{
            setSize(value)
        }
    }

    const addForm = () =>{
        setNewWorkspaceState(true)
    }



    const handleWorkspace = (action:ActionMode,value:any,handleLoading:any,handleError:any)=>{
        if(action === ActionMode.CREATION_MODE) {
            createWorkspace(value).then(async (items) => {
                setNewWorkspaceState(false)
                getWorkspacesByFilter({}, size, 0).then(response => {
                    setStatePage({state:true,data:response})
                }).catch(function (error) {
                    handleErrors(error, true, null)
                })
                dispatch(loadWorkspace())
                dispatch(LoadComboWS(items.name));
            }).catch(function (error) {
                    handleLoading(false)
                    handleErrors(error, false, handleError)
            })
        }
        if(action === ActionMode.DISPLAY_MODE){
            setPage(0)
            getWorkspacesByFilter(value,size,0).then(response => {
                setStatePage({state:true,data:response})
                setTimeout(() => {
                    handleLoading(false)
                }, 500);
            }).catch((error)=>{
                handleErrors(error, true, null)
                handleLoading(false)
            })
        }if(action === ActionMode.EDIT_MODE){
            updateWorkspace(value).then((response:any)=>{
                getWorkspacesByFilter({},size,page).then(items => {
                    setStatePage({state:true,data:items})
                    setTimeout(() => {
                        handleLoading(false)
                    }, 500);
                }).catch((error)=>{
                    handleErrors(error, true, null)
                    handleLoading(false)
                })
            }).catch((errorUpdate:any)=>{
                handleErrors(errorUpdate, false, handleError)
                handleLoading(false)
            })
        }
        if(action === ActionMode.DELETE_MODE){
            deleteWorkspace(value).then((response:any)=>{
                let getPage = (workspaceListt.workSpaceViewDTOS.length===1&&page>0)?page-1:page
                getWorkspacesByFilter({},size,getPage).then((itemsTags:any) => {
                    dispatch(loadWorkspace())
                    setStatePage({state:true,data:itemsTags})
                }).catch((error)=>{
                    handleErrors(error, true, null)
                    handleLoading(false)
                })
            }).catch((errorUpdate:any)=>{

                handleErrors(errorUpdate, true, null)

            })
        }
    }
    /*const getWorkspacesList = () => {
        getWorkspaces().then((response:any)=>{
            console.log("workspaces=",response)
        }).catch((errorUpdate:any)=>{

            handleErrors(errorUpdate, true, null)

        })
    }*/

    const handleSearch =async (values:any,handleLoading:any) => {
        setStateComponnent(true)
        let requestedData:any = {
            name:values.workspaceName
        }

        getWorkspacesByFilter(requestedData,size,0).then(items => {
            //setFilterState(requestedData)
            setStatePage({state:true,data:items})
            setPage(0)
            //setFilterWorkspace(values)
            setTimeout(() => {
                setStateComponnent(false)
                handleLoading(false)
            }, 500);
        }).catch((error)=>{
            handleErrors(error, true, null)
            handleLoading(false)
        })

    }

    
    useEffect(() => {
        setStateComponnent(true)
        setNewWorkspaceState(false)
        let interFilter:any = filter
        setFilterInitData(interFilter)
        setTimeout(() => {
            getWorkspacesByFilter({},10,0).then(items => {
                setWorkspaceList(items)
                setStateComponnent(false)   
            }) 
            .catch((error)=>{
                handleErrors(error, true, null)
            })
        }, 300);
    }, [])

    useEffect(()=>{

        if(statePage.state){
            setStateComponnent(true)
            setWorkspaceList(statePage.data);
            setTimeout(() => {
                setStateComponnent(false)
                setStatePage({state:false,data:{ "itemNumbers": 0,"pagesNumber": 0, "workspaceDTOList": {} }})
            }, 500);
        }


    },[statePage])

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.Typography}>Workspace</div>
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
                        disabled={stateComponnent}
                        id={`workspace_add`} 
                        actionType={ActionAccessMode.WRITE_MODE} 
                        className={classes.boardStylekey} 
                        handleClick={addForm}
                        >
                        <Icon style={{ color: green[500] }}>add_circle</Icon>
                        Add new Workspace
                    </AccessButton>
                </div>

                <div style={{display:'flex',alignItems:'center'}}>
                    <div  style={{display:'flex',alignItems:'center',padding:0}}>
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
                            <Typography>{workspaceListt.itemNumbers} Items</Typography>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.divider}/>
                {newWorkspaceState &&
                <div style={{width:'100%',display:"flex"}}>
                    <div className={classes.addContainer}>
                        <WorkspaceAdd cancelAction={setNewWorkspaceState} handleWorkspace={handleWorkspace} stateAction={ActionMode.CREATION_MODE}/>
                    </div>

                </div>
                }
            <div style={{width:"100%", height:"100%"}}>
                <WorkspaceList  workspaceList={workspaceListt} stateComponnent={stateComponnent} handleWorkspace={handleWorkspace} page={page}  handlePages={handlePage} fold={fold} />
            </div>

        </div>

    );

};

export default Workspace;
