import * as React from "react";
import { useEffect, useState } from "react";
import useStyles from "./styles";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ICsPropertiesDefault } from "types/models/interface";
import PropertyDetails from "../PropertyDetails";
import { ActionAccessMode, ActionMode, EStatus } from "shared/constants/AppEnums";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    CircularProgress,
    Grid,
    IconButton,
    Tab,
    Typography,
    withStyles
} from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { getPropertyAudit } from "shared/services/auditService";
import PropertyAudit from "../PropertyAudit";
import SyncProblemIcon from '@mui/icons-material/SyncProblem';
import SyncIcon from '@mui/icons-material/Sync';
import { labelField } from "shared/constants/AppCssCons";
import ConfirmPopup from "../../../shared/components/ConfirmPopup";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AccessButton from "shared/components/AccessButton";
import { themeDeleteButton } from "shared/constants/AppConst";
import { Tooltip } from "@mui/material";



const StyledAccordionSummary = withStyles({
    root: {
        height:'auto',
      "&.Mui-expanded": {
        minHeight: 20,
        maxHeight: 20,
      },
    },
  })(AccordionSummary);

const handleKeyName = (key:any)=>{
  
        let result:any = ""
        if(key === null){
          result = ""
        }else{
        if (Array.isArray(key)) {
            result = JSON.stringify( key )
        }else{
            result = key
        }
        result = result.replaceAll('"','')
        }
        return result
    }
const CsPropertiesDefault : React.FC<ICsPropertiesDefault>= (props) => {    
  const classes = useStyles();
  const [accordState,setAccordState] = useState<boolean>(props.stateActionAccord)
  const [value, setValue] = useState('1');
  const [propertyAudit,setPropertyAudit] = useState<any>(null);

  const [headerPublishDialog,setHeaderPublishDialog]= useState<string>("");
  const [contentPublishDialog,setContentPublishDialog] = useState<string>("");
  const [openPublishDialog, setOpenPublishDialog] = useState(false);
  const [loadingAdd,setLoadingAdd] = React.useState<any>(false);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [headerDialog,setHeaderDialog]= useState<string>("");
  const [contentDialog,setContentDialog] = useState<string>("");
    const [loading,setLoading] = React.useState<any>(false);


  const handleChange = (event:any, newValue:any) => {
    if(newValue === "2"){
      getPropertyAudit(props.properties.keyID).then((items:any)=>{
        setPropertyAudit(items)
      })
    }
    setValue(newValue);
  };

  const handleAccordion = ()=>{
    if(props.fold.action === "fold"){
      setAccordState(props.fold.state)
    }else{
      if(!props.fold.state ){
        props.fold.callback(false)
      }
      setAccordState(!accordState)
    }
  }


  const handleOpenPublishPopup = (e?:any) => {
      if(e) e.stopPropagation();
      setHeaderPublishDialog("Publish Property")
      setContentPublishDialog("Are you sure you want to publish this property?")
      setOpenPublishDialog(true);

  };
  const handleClosePublishPopup = () => {
      handleOpenPublishPopup()
      setOpenPublishDialog(false);
  };
  const publishProperty = () => {
      props.publishProperty(props.properties)
      setLoadingAdd(true)
      setTimeout(() => {
          setLoadingAdd(false)
      }, 4000)
  };

  const handleOpenConfirmPopup = (event?:any) => {
      if(event) event.stopPropagation();
      setHeaderDialog("Delete Property")
      setContentDialog("Are u sure u want to delete")
      setOpenConfirmDialog(true);
  };
  const handleCloseConfirmPopup = () => {
      handleOpenConfirmPopup()
      setOpenConfirmDialog(false);
  };

  const changeDeleteLoading = ()=>{
      setLoading(true)
      setTimeout(() => {
          setLoading(false)
      }, 1500)
  }


  useEffect(()=>{   
    setAccordState(props.fold.state)
  },[props.fold.action,props.fold.state])

  return (
    <Accordion id={`accordion_index_${props.indexElement}`} key={props.properties.keyID} style={{margin:'0px 0px 4px 0px'}} className={classes.AccordionPropDetails} expanded={accordState } onChange={handleAccordion} >

        <StyledAccordionSummary id={`SummaryAccordion_index_${props.indexElement}`} expandIcon={<ExpandMoreIcon className={classes.ExpandMoreIcon}/>} aria-controls="panel1a-content" className={classes.AccordionSummaryDetails}  style={{margin:0,alignItems:'flex-start',paddingTop:4}}>
        {!accordState && 
          <>
            <div style={{display:"flex",flexWrap:'wrap',width:'70%',wordBreak:'break-all'}}>
              <div className={classes.column}>
                {props.storeType !== 'YAML' &&
                  <>{props.properties.key}</>
                }
                {props.storeType === 'YAML' &&
                  <div className={classes.propertyKey_yaml_parent_key}>
                    <div className={classes.propertyKey_yaml_parent_key_label}>
                      <Typography style={labelField}>Full Name :</Typography>
                    </div>
                    <div className={classes.propertyKey_yaml_parent_key_value}>
                      {handleKeyName(props.properties.fullName)}
                      <div className={classes.propertyKey_yaml_parent_key_value_container_element} >
                        {props.properties.name}
                      </div>
                    </div>
                  </div>
                }    
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',width:"30%"}}>
              <Grid item xs={8} md={8} sm={8} className={classes.summary}>
              <div style={{justifyContent:'flex-start',fontWeight:400,color:"#3569a8"}}className={classes.ProportyDetails__header__tags__type} >
                {props.properties.type}
              </div>
              </Grid>
              <Grid item xs={2} md={2} sm={2} className={classes.summary}>
                {props.properties.status === EStatus.DRAFT && 
                  <Tooltip title={EStatus.DRAFT} arrow enterDelay={0} leaveDelay={500}>
                    <div style={{display:'flex',marginLeft:8,alignItems:'center',height:20}} className={classes.icon_Status}>
                    <Typography>{'DRAFT'}</Typography>
                    </div>
                  </Tooltip>
                }
                { props.properties.status.length !== 0 && props.properties.status === EStatus.ONLINE &&
                  <Tooltip title={"PUBLISHED"} arrow enterDelay={0} leaveDelay={500}>
                    <div style={{display:'flex',marginLeft:8,alignItems:'center',height:20}} className={classes.icon_Status}>
                      <Typography>{'PUBLISHED'}</Typography>
                    <div style={{display:'flex',color:'white',marginRight:2}}>
                  </div>
                   </div>
                  </Tooltip>
                }
                </Grid>
                <Grid item xs={2} md={2} sm={2} className={classes.summary}>
                {(props.properties.status === "DRAFT" && props.properties.dirty) &&
                  <div className={classes.PropertyKey_form_container_mainForm_row_status}>
                      { !loadingAdd  ?
                    <Tooltip title={"Publish Property"} arrow enterDelay={0} leaveDelay={500}>
                      <span>
                          <IconButton style={{padding:0}} color="secondary" aria-label="synchronize" id={`synchronize`} onClick={handleOpenPublishPopup}>
                        <SyncProblemIcon  style={{color:"#E3AB55",padding:0}}/>
                      </IconButton>
                      </span>

                    </Tooltip>
                          :
                          <div className={classes.progress}>
                              <CircularProgress disableShrink size={20}/>
                          </div>
                      }
                  </div>
                }
                {(props.properties.status === "DRAFT" && !props.properties.dirty) &&
                  <div className={classes.PropertyKey_form_container_mainForm_row_status}>
                    <Tooltip title={"Property Published"} arrow enterDelay={0} leaveDelay={500}>
                      <span>
                          <IconButton disabled={true} style={{padding:0}} color="secondary" aria-label="synchronize" id={`synchronize`} >
                        <SyncIcon  style={{color:"rgb(76, 175, 80)",padding:0}}/>
                      </IconButton>
                      </span>

                    </Tooltip>

                  </div>
                }
                </Grid>  
            </div>

              {!loading ?
                  <div style={{marginLeft: 32}}>
                      <AccessButton 
                             id={`delete_key_index_${props.indexElement}`}
                              disabled={false}
                              actionType={ActionAccessMode.WRITE_MODE} 
                              className={classes.btn_Icon}
                              style={{padding:0}}
                              color={"primary"}
                              ariaLabel={"delte key"}
                              handleClick={handleOpenConfirmPopup}
                              iconButton={true}
                              theme={themeDeleteButton}
                              tooltip={"Delete Key"}
                            >
                              <HighlightOffIcon color="secondary"/>
                      </AccessButton>
                  </div>
                  :
                  <div className={classes.progress} style={{width:"5%"}}>
                      <CircularProgress disableShrink size={20}/>
                  </div>
              }
          </>
        }


      </StyledAccordionSummary>

      <AccordionDetails id={`AccordionDetails_index_${props.indexElement}`} style={{display: "flex",width:'100%',padding:0 ,flexDirection:'column'}} >
        {(accordState ) &&
          <TabContext value={value} >
              <div className={classes.accordionPublishDeleteBtn} >


                  <div>
                      {(props.properties.status === "DRAFT" && props.properties.dirty) &&
                      <div className={classes.PropertyKey_form_container_mainForm_row_status}>
                          { !loadingAdd  ?
                              <Tooltip title={"Publish Property"} arrow enterDelay={0} leaveDelay={500}>
                                  <span>
                                      <IconButton style={{padding:0}} color="secondary" aria-label="synchronize" id={`synchronize`} onClick={handleOpenPublishPopup}>
                                      <SyncProblemIcon  style={{color:"#E3AB55",padding:0}}/>
                                  </IconButton>
                                  </span>

                              </Tooltip>
                              :
                              <div className={classes.progress}>
                                  <CircularProgress disableShrink size={20}/>
                              </div>
                          }
                      </div>
                      }
                      {(props.properties.status === "DRAFT" && !props.properties.dirty) &&
                      <div className={classes.PropertyKey_form_container_mainForm_row_status}>
                          <Tooltip title={"Property Published"} arrow enterDelay={0} leaveDelay={500}>
                              <span>
                                  <IconButton disabled={true} style={{padding:0}} color="secondary" aria-label="synchronize" id={`synchronize`} >
                                  <SyncIcon  style={{color:"rgb(76, 175, 80)",padding:0}}/>
                              </IconButton>

                              </span>

                          </Tooltip>

                      </div>
                      }
                  </div>

                  {!loading ?
                      <div style={{marginLeft: 32}}>
                          <AccessButton 
                            id={`delete_key_index_${props.indexElement}`}
                            disabled={false}
                            actionType={ActionAccessMode.WRITE_MODE} 
                            className={classes.btn_Icon}
                            style={{padding:0}}
                            color={"primary"}
                            ariaLabel={"delete key"}
                            handleClick={handleOpenConfirmPopup}
                            iconButton={true}
                            theme={themeDeleteButton}
                            tooltip={"Delete Key"}
                          >
                            <HighlightOffIcon color="secondary"/>
                        </AccessButton>
                      </div>
                      :
                      <div className={classes.progress} style={{marginLeft: 32}}>
                          <CircularProgress disableShrink size={20}/>
                      </div>
                  }

              </div>



            <TabList TabIndicatorProps={{ style: { background: "#3569a8" } }} style={{minHeight: "auto",height: "auto",width:'100%',borderBottom:"1px solid #a2b4b5"}} className={classes.TabList} onChange={handleChange} aria-label='lab API tabs example'>
              <Tab itemID={`tab_userGroupe_general_index_${props.indexElement}`} style={{minHeight: "auto",height: "auto",paddingBottom:0,paddingTop:0,textTransform:'initial'}} className={classes.Tab} label='General' value='1' />
              <Tab itemID={`tab_userGroupe_Audit_index_${props.indexElement}`} style={{minHeight: "auto",height: "auto",textTransform:'initial',display: 'flex'}} className={classes.Tab} label='Audit' value='2' />
            </TabList>
            <TabPanel itemID={`TabPanel_userGroupe_general_index_${props.indexElement}`} style={{padding:0}} className={classes.TabPanel} value='1'>
              <div className={classes.ProportyDetails} style={{paddingTop:8}}>
                {(props.storeType === "YAML" && props.properties.fullName !== undefined ) &&
                  <div style={{ display: "flex",width:'100%',padding:0 ,flexDirection:'column'}}>
                    <div style={{ display: "flex",width:'100%',padding:0 ,flexDirection:'column'}}>
                      <div className={classes.propertiesDetails_yaml}>
                          <PropertyDetails
                          key={props.properties.keyId}
                          selectedTag={props.selectedTag}
                          headerActionState={ActionMode.DISPLAY_MODE}
                          handleKey={props.handleKey}
                          handleValue={props.handleValue}
                          deleteKey={props.deleteKey}
                          deleteValue={props.deleteValue}
                          csPropertyKey={props.properties}
                          initialContext={props.ContextData}
                          stateValue={props.stateValue}
                          changeStatusValue={props.changeStatusValue}
                          cancelCreationAction={props.cancelKey}
                          storeType={props.storeType}
                          handleNewPropertyKey={props.handleNewPropertyKey}
                          handlePropertyFiler={props.handlePropertyFiler} 
                          modeView={props.modeView} 
                          indexElement={props.indexElement}
                          publishProperty={props.publishProperty}
                          addValueState={props.addValueState}
                        />
                      </div>
                    </div>
                  </div>
                }
                {props.storeType === "PROPERTIES" &&
                  <PropertyDetails 
                    key={props.properties.keyId}
                    selectedTag={props.selectedTag}
                    headerActionState={ActionMode.DISPLAY_MODE}
                    handleKey={props.handleKey}
                    handleValue={props.handleValue}
                    deleteKey={props.deleteKey}
                    deleteValue={props.deleteValue}
                    csPropertyKey={props.properties}
                    initialContext={props.ContextData}
                    stateValue={props.stateValue}
                    changeStatusValue={props.changeStatusValue}
                    cancelCreationAction={props.cancelKey}
                    storeType={props.storeType}
                    handleNewPropertyKey={props.handleNewPropertyKey} 
                    handlePropertyFiler={props.handlePropertyFiler}  
                    modeView={props.modeView}   
                    indexElement={props.indexElement}
                    publishProperty={props.publishProperty}
                    addValueState={props.addValueState}
                  />
                }
              </div>
            </TabPanel>
            <TabPanel itemID={`TabPanel_userGroupe_Audit_index_${props.indexElement}`} style={{padding:8}} className={classes.TabPanel} value='2'>
              <PropertyAudit audit={propertyAudit} idProperty={props.properties.keyID} indexProperty={props.indexElement} />
            </TabPanel>
          </TabContext>
        }
      </AccordionDetails>
        <ConfirmPopup opendialog={openPublishDialog} headerContent={headerPublishDialog} contentMessage={contentPublishDialog} handleClose={handleClosePublishPopup} popupMainAction={publishProperty} handleAccordion={()=>{}} />

        <ConfirmPopup opendialog={openConfirmDialog} headerContent={headerDialog} contentMessage={contentDialog} handleAccordion={changeDeleteLoading} handleClose={handleCloseConfirmPopup} popupMainAction={props.deleteKey(props.properties.keyID, ActionMode.DELETE_MODE)}/>

    </Accordion>

  );
}

export default CsPropertiesDefault
