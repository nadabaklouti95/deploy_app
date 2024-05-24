import { Accordion, AccordionDetails, CircularProgress, Grid, IconButton, Tab, Typography } from "@material-ui/core";
import * as React from "react";
import { StyledAccordionSummary, themeButton } from "shared/constants/AppConst";
import { IStoreItem } from "types/models/interface";
import useStyles from "./styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useEffect, useState } from "react";
import { ActionAccessMode, ActionMode } from "shared/constants/AppEnums";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { labelField } from "shared/constants/AppCssCons";
import {LoadCombo} from "../../../redux/actions";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {AppState} from "../../../redux/store";
import { useMediaQuery } from '@material-ui/core';
import {truncateStoreName} from "../../../shared/constants/TruncateStoreName";
import AccessButton from "shared/components/AccessButton";
import { Tooltip } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import StoreGeneral from "./Components/StoreGeneral";
import StoreAudit from "./Components/StoreAudit";
import StoreStats from "./Components/StoreStats";


const storeType = [
    {key:1,value: "PROPERTIES"},
    {key:2,value: "YAML"},
    {key:3,value: "JSON"},
]


const getStoreType = (valueId:any)=>{
    let result = ''
    let findStore :any = storeType.find((obj:any)=> obj.key === valueId)
    if(findStore !== undefined){
        result = findStore.value
    }
    return result
}


const StoreItem: React.FC<IStoreItem> = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [accordState,setAccordState] = useState<boolean>(false)
    const [openConfirmdialog, setOpenDialog] = useState(false);
    const [headerConfirmPopup,setHeaderPopup]= useState<string>("");
    const [contentConfirmPopup,setContentPopup] = useState<string>("");
    const [loadingDelete,setLoadingDelete] = useState<boolean>(false)
    const [value, setValue] = useState('1');

    const notify = (storeName : String) => toast.success("The store "+truncateStoreName(storeName)+" is now selected!",{autoClose: 3000,theme :"colored" });
    const isSmallScreen = useMediaQuery('(max-width: 800px)');
    const stores = useSelector((state: AppState) => state.stores.storeslist);
    const cookieName = "selectedStore";
    const selected = document.cookie.split("; ").reduce((acc, cur) =>cur.split("=")[0] === cookieName ? `${acc}${cur.split("=")[1]}` : acc,"");
    const selectedStore:any = stores.find((element: any) => element.name === selected);


    const handleOpenConfirmPopup = (event:any) => {
        if(event) event.stopPropagation()
        setHeaderPopup("Delete Store")
        setContentPopup("Are you sure u want to delete this Store")
        setOpenDialog(true);
    };
        

    const handleCloseConfirmPopup = () => {setOpenDialog(false);};

    
    const deleteStore = ()=>{
        setLoadingDelete(true)
        props.handleStore(ActionMode.DELETE_MODE,props.store.id,null,null)
        setTimeout(() => {
            setLoadingDelete(false)
        }, 2000);
    };

    const handleAccordion = ()=>{setAccordState(!accordState)}


    const handleChangeStore = (values: any) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // prevent the accordion from opening
        dispatch(LoadCombo(values.name));
        toast.dismiss();
        notify(values.name);
    }

    const handleChange = (event:any, newValue:any) => {
        setValue(newValue);
    };

    useEffect(()=>{   
        setAccordState(props.fold)
    },[props.fold])

  return(
    <Accordion id={`accordion_index_${props.indexStore}`} key={1} className={classes.Accordion} expanded={accordState} onChange={handleAccordion}>
      <StyledAccordionSummary
          expandIcon={<ExpandMoreIcon  id={`btn_expandIcon_${props.indexStore}`} style={{margin:4}} className={classes.ExpandMoreIcon}/>}
          aria-controls="panel1a-content" 
          id="panel1a-header" 
          className={classes.AccordionSummary}>
          <div  className={classes.accordion_summary_container}>
              {!accordState &&
                  <div className={classes.accodianSummary_container}>
                <Grid item xs={12} md={12} sm={12} className={classes.summary}>
                    <Grid item xs={4} md={4} sm={4} className={classes.summary}>
                        <div className={classes.accodianSummary_content}>
                            <div className={classes.accodianSummary_content_label}>
                                <Typography style={labelField}>Name:</Typography>
                            </div>
                        <div className={classes.accodianSummary_content_value} style={{lineBreak:'anywhere'}}>
                            <Typography  >{ props.store.name} </Typography>
                        </div>
                        </div>
                    </Grid>

                    <Grid item xs={2} md={2} sm={2} className={classes.summary}
                          style={{height:"100%"}}>


                        <div className={`${classes.accodianSummary_content} ${isSmallScreen ? classes.accordion_summary_smallScreen : ''}`}
                             style={{marginLeft:isSmallScreen?0:32}}>
                            <div className={classes.accodianSummary_content_label}>
                                <Typography style={labelField}>Type:</Typography>
                            </div>
                            <div className={classes.accodianSummary_content_value}>
                                <Typography >{getStoreType(props.store.typeId)}</Typography>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={6} md={6} sm={6} className={classes.summary}>
                        <div className={classes.accodianSummary_content} style={{marginLeft:isSmallScreen?0:32,}}>
                            <div className={classes.accodianSummary_content_label}>
                                <Typography style={labelField}>Description:</Typography>
                            </div>
                            <div className={classes.accodianSummary_content_value} style={{lineBreak:'anywhere'}}>
                                <Typography  >{ props.store.description}</Typography>
                            </div>
                        </div>
                    </Grid>

                </Grid>
            </div>
        }

            <div className={classes.accodianSummary_content_btns} style={{width:accordState?"100%":"",marginTop:accordState?"20px":""}}>
                {selectedStore !== undefined && props.store.id === selectedStore.id ?
                    <Typography>
                        <Tooltip title={"Store selected"} arrow enterDelay={0} leaveDelay={100}>
                            <IconButton style={{padding: 0 , marginRight:isSmallScreen?5:10, marginLeft:isSmallScreen?5:10}}>
                                <TaskAltIcon style={{color: "#3569a8"}}/>
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    :
                    <Typography>
                        <Tooltip title={"Use this store"} arrow enterDelay={0} leaveDelay={100}>
                            <IconButton style={{padding: 0, marginRight:isSmallScreen?5:10}} onClick={handleChangeStore(props.store)}>
                                <RadioButtonUncheckedIcon style={{color: "#3569a8"}}/>
                            </IconButton>
                        </Tooltip>
                    </Typography>
                }
                {!loadingDelete?
                    <AccessButton 
                        id={`store_delete_${props.indexStore}`}  
                        style={{padding: 0,zIndex: 1}}
                        actionType={ActionAccessMode.WRITE_MODE} 
                        className={classes.Add__btn} 
                        color={"secondary"}
                        ariaLabel={"cancelCreation"}
                        handleClick={(event:any)=>handleOpenConfirmPopup(event)}
                        iconButton={true}
                        theme={themeButton}
                        tooltip={"Delete Store"}
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
    <AccordionDetails style={{ display: "flex",width:'100%',padding:8 }} > 


        <div className={classes.container_storeValue}>
            <TabContext value={value}>
                <TabList TabIndicatorProps={{ style: { background: "#3569a8" } }} className={classes.TabList} onChange={handleChange} aria-label='lab API tabs example'>
                    <Tab  style={{minHeight: "auto",height: "auto",paddingBottom:0,paddingTop:0,textTransform:'initial'}}
                        className={classes.Tab} label='General' value='1' />
                    <Tab className={`${classes.Tab} ${classes.TabAudit}`} label='Audit' value='2' />
                    <Tab className={`${classes.Tab} ${classes.TabAudit}`} label='Statistics' value='3' />
                </TabList>
                <TabPanel  style={{padding:0}} className={classes.TabPanel} value='1'>
                    <StoreGeneral 
                        store={props.store} 
                        handleStore={props.handleStore} 
                        stateComponnent={props.stateComponnent}
                        indexStore={props.indexStore}
                        getStoreType={getStoreType}
                        deleteStore={deleteStore}
                        openConfirmdialog={openConfirmdialog}
                        headerConfirmPopup={headerConfirmPopup}
                        contentConfirmPopup={contentConfirmPopup}
                        handleCloseConfirmPopup={handleCloseConfirmPopup}
                    />                
            
                </TabPanel>
                <TabPanel  style={{padding:8}} className={classes.TabPanel} value='2' >
                    <StoreAudit />
                </TabPanel>
                <TabPanel  style={{padding:8}} className={classes.TabPanel} value='3' >
                    <StoreStats store={props.store}/>
                </TabPanel>
            </TabContext>
            </div>






       
    </AccordionDetails>
</Accordion>
);
};
export default StoreItem;