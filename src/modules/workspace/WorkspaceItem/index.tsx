import * as React from "react";
import { useEffect, useState } from "react";
import useStyles from "./styles";
import { StyledAccordionSummary, themeDeleteButton } from "shared/constants/AppConst";
import {
    Accordion,
    AccordionDetails,
    CircularProgress, Grid,
    IconButton,
    Tab,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { labelField } from "shared/constants/AppCssCons";

import {TabContext, TabList, TabPanel} from "@material-ui/lab";
import WorkspaceGeneral from "./Components/WorkspaceGeneral";
import WorkspaceAudit from "./Components/WorkspaceAudit";
import {IWorkspaceItem} from "../../../types/models/interface";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {LoadComboWS} from "../../../redux/actions/ComboWS";
import {toast} from "react-toastify";
import ConfirmPopup from "../../../shared/components/ConfirmPopup";
import {useDispatch, useSelector} from "react-redux";
import {truncateStoreName} from "../../../shared/constants/TruncateStoreName";
import {AppState} from "../../../redux/store";
import {LoadCombo} from "../../../redux/actions";
import {ActionAccessMode, ActionMode} from "../../../shared/constants/AppEnums";
import AccessButton from "shared/components/AccessButton";
import { Tooltip } from "@mui/material";


const WorkspaceItem: React.FC<IWorkspaceItem> = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [accordState,setAccordState] = useState<boolean>(false)
    const [value, setValue] = useState('1');
    const [openConfirmdialog, setOpenDialog] = React.useState(false);
    const [headerConfirmPopup,setHeaderPopup]= React.useState<string>("");
    const [contentConfirmPopup,setContentPopup] = React.useState<string>("");
    const [loadingDelete,setLoadingDelete] = useState<boolean>(false)
    //const stores = useSelector((state: AppState) => state.stores.storeslist.reverse());
    const listWS = useSelector((state: AppState) => state.workspaces.workspaceslist);
    const cookieNameWS = "selectedWorkspace";
    const selected = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === cookieNameWS ? `${acc}${cur.split("=")[1]}` : acc,"");
    const selectedWorkspace:any = listWS.find((element: any) => element.workSpaceDTO.name === selected);

    const isSmallScreen = useMediaQuery('(max-width: 800px)');
    const notify = (name : String) => toast.success("The workspace "+truncateStoreName(name)+" is now selected!",{autoClose: 3000,theme :"colored" });
    let storeSelected;


    const handleChange = (event:any, newValue:any) => {
        setValue(newValue);
    };

    const handleAccordion = ()=>{
        setAccordState(!accordState)
    }

    const handleChangeWorkspace = (values: any) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        dispatch(LoadComboWS(values.workSpaceDTO.name));
        toast.dismiss();
        notify(values.workSpaceDTO.name);

        storeSelected = values.storeList[0]
        if(storeSelected){
            dispatch(LoadCombo(storeSelected.name));
        }

    }

    const handleOpenConfirmPopup = (event:any) => {
        if(event) event.stopPropagation()
        setHeaderPopup("Delete Workspace")
        setContentPopup("Are you sure u want to delete this Workspace")
        setOpenDialog(true);
    };
    const handleCloseConfirmPopup = () => {setOpenDialog(false);};
    const deleteWorkspace = ()=>{
        setLoadingDelete(true)
        props.handleWorkspace(ActionMode.DELETE_MODE,props.workspace.workSpaceDTO.id,null,null)
        setTimeout(() => {
            setLoadingDelete(false)
        }, 2000);
    };

    useEffect(()=>{
        setAccordState(props.fold)
    },[props.fold])

    return (
        <Accordion id={`accordion_index_${props.indexWorkspace}`} key={1} className={classes.Accordion} expanded={accordState} onChange={handleAccordion}>
            <StyledAccordionSummary
                expandIcon={<ExpandMoreIcon id={`btn_expandIcon_${props.indexWorkspace}`} style={{margin:4}} className={classes.ExpandMoreIcon}/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.AccordionSummary}
            >
                <div  className={classes.accordion_summary_container}>
                    {!accordState &&
                        <div className={classes.accordionSummary_container}>
                            <Grid item xs={12} md={12} sm={12} className={classes.summary}>
                                <Grid item xs={3} md={3} sm={3} className={classes.summary}>
                                    <div className={classes.accordionSummary_content}>
                                        <div className={classes.accordionSummary_content_label}>
                                            <Typography style={labelField}>Name:</Typography>
                                        </div>
                                        <div className={classes.accordionSummary_content_value} style={{lineBreak:'anywhere'}}>
                                            <Typography  >{ props.workspace.workSpaceDTO.name} </Typography>
                                        </div>
                                    </div>
                                </Grid>


                                <Grid item xs={9} md={9} sm={9} className={classes.summary}>
                                    <div className={classes.accordionSummary_content} style={{marginLeft:isSmallScreen?0:32,}}>
                                        <div className={classes.accordionSummary_content_label}>
                                            <Typography style={labelField}>Description:</Typography>
                                        </div>
                                        <div className={classes.accordionSummary_content_value} style={{lineBreak:'anywhere'}}>
                                            <Typography  >{ props.workspace.workSpaceDTO.description}</Typography>
                                        </div>
                                    </div>
                                </Grid>

                            </Grid>
                        </div>
                    }

                    <div className={classes.accordionSummary_content_btns}
                         style={{width:accordState?"100%":"",marginTop:accordState?"20px":""}}>
                        {selectedWorkspace !== undefined && props.workspace.workSpaceDTO.id === selectedWorkspace.workSpaceDTO.id ?
                            <Typography>
                                <Tooltip title={"Workspace selected"} arrow enterDelay={0} leaveDelay={100}>
                                    <IconButton style={{padding: 0 , marginRight:isSmallScreen?5:10, marginLeft:isSmallScreen?5:10}}>
                                        <TaskAltIcon style={{color: "#3569a8"}}/>
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                            :
                            <Typography>
                                <Tooltip title={"Use this workspace"} arrow enterDelay={0} leaveDelay={100}>
                                    <IconButton style={{padding: 0, marginRight:isSmallScreen?5:10}}
                                                onClick={handleChangeWorkspace(props.workspace)}>
                                        <RadioButtonUncheckedIcon style={{color: "#3569a8"}}/>
                                    </IconButton>
                                </Tooltip>
                            </Typography>

                        }

                        {!loadingDelete?
                                <AccessButton 
                                    id={`workspace_delete_${props.indexWorkspace}`}
                                    disabled={false}
                                    actionType={ActionAccessMode.WRITE_MODE} 
                                    className={classes.btn_Icon}
                                    style={{padding: 0,zIndex: 1}}
                                    color={"primary"}
                                    ariaLabel={"delte key"}
                                    handleClick={handleOpenConfirmPopup}
                                    iconButton={true}
                                    theme={themeDeleteButton}
                                    tooltip={"Delete Workspace"}
                                    >
                                    <HighlightOffIcon color="secondary"/>
                                </AccessButton>
                            :
                            <div className={classes.progress}>
                                <CircularProgress disableShrink size={20}/>
                            </div>
                        }
                    </div>
                </div>
            </StyledAccordionSummary>


            <AccordionDetails style={{ display: "flex",width:'100%',padding:8 }}>
                <div className={classes.container_workspaceValue}>
                    <TabContext value={value}>
                        <TabList TabIndicatorProps={{ style: { background: "#3569a8" } }} style={{minHeight: "auto",height: "auto",width:'100%',borderBottom:"1px solid #a2b4b5"}}
                                 className={classes.TabList} onChange={handleChange} aria-label='lab API tabs example'>
                            <Tab  style={{minHeight: "auto",height: "auto",paddingBottom:0,paddingTop:0,textTransform:'initial'}}
                                  className={classes.Tab} label='General' value='1' />
                            <Tab style={{minHeight: "auto",height: "auto",textTransform:'initial',display: 'flex'}}
                                 className={classes.Tab} label='Audit' value='2' />
                        </TabList>
                        <TabPanel  style={{padding:0}} className={classes.TabPanel} value='1'>
                            <WorkspaceGeneral workspace={props.workspace} handleWorkspace={props.handleWorkspace} indexWorkspace={props.indexWorkspace}/>
                        </TabPanel>
                        <TabPanel  style={{padding:8}} className={classes.TabPanel} value='2' >
                            <WorkspaceAudit workspace={props.workspace}/>
                        </TabPanel>
                    </TabContext>
                </div>

                <ConfirmPopup opendialog={openConfirmdialog} headerContent={headerConfirmPopup} contentMessage={contentConfirmPopup} handleClose={handleCloseConfirmPopup} popupMainAction={deleteWorkspace} handleAccordion={()=>{}}/>

            </AccordionDetails>
        </Accordion>

    );
};
export default WorkspaceItem;
