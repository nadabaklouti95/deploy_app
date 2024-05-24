import * as React from "react";
import { useEffect, useState } from "react";
import { ResultStatus, RunningStatus, TaskType } from "shared/constants/AppEnums";

import { ICsTaskValue } from "types/models/interface";
import useStyles from "./styles";

import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, LinearProgress, LinearProgressProps, Tab, Typography, withStyles } from "@material-ui/core";
import FiberNewTwoToneIcon from '@mui/icons-material/FiberNewTwoTone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { labelField } from "shared/constants/AppCssCons";
import {  TabContext, TabList, TabPanel } from "@material-ui/lab";
import CsTaskLog from "../CsTaskLog";
import {localDate} from "../../../shared/constants/LocalDate";


const StyledAccordionSummary = withStyles({
    root: {
      height:'auto',
      "&.Mui-expanded": {
        minHeight: 39,
        maxHeight: 39,
      },
    },
  })(AccordionSummary);
  

  function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box display="flex" alignItems="center" flexDirection="row" width="100%">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  const formatDate = (date:any)=>{
    if (date !== null){
      let dateDate:any = date.substring(0, 10) + " " + date.substring(11,19)
      return dateDate
    }else{
      return null
    }
    
  }

  const getRunningIcon = (status:any)=>{
    if(status === RunningStatus.NEW){return <FiberNewTwoToneIcon  style={{color:"#137de7",height:16,width:16}}/>}
    if(status === RunningStatus.FINISHED){return <CheckCircleIcon style={{color:"#179f35",height:16,width:16}}/>}
    if(status === RunningStatus.UNKNOWN){return <HelpOutlineIcon  style={{color:"#b71818",height:16,width:16}}/>}
    else{return  <></>}
  }
  const getResultColor = (result:any)=>{
    if(result === ResultStatus.SUCCESS){return "#179f35"}
    if(result === ResultStatus.FAIL){return "#FF0000"}
    if(result === ResultStatus.ABORTED){return "#FE9800"}
    else{return "#495377"}
  }




const CsTaskValue: React.FC<ICsTaskValue> = (props) => {
  const classes = useStyles();
  const [accordState,setAccordState] = useState<boolean>(false)
  const [value, setValue] = React.useState('1');
  const [taskLog,setTaskLog] = useState<any>({})

  const handleChange = async (event:any, newValue:any) => {
    if(newValue === "2"){
      props.handleTaskLog(props.csTask.id,props.tagName,setTaskLog)
    }
    setValue(newValue);
  };
  const [startAuditDate,setStartAuditDate] = React.useState<any>(null)
  const [endAuditDate,setEndAuditDate] = React.useState<any>(null)

  const handleAccordion = ()=>{
    setAccordState(!accordState)
  }
  useEffect(()=>{   
    setAccordState(props.fold)
  },[props.fold])

  useEffect(() => {
    const startFormDate = formatDate(props.csTask.startTime)
    const endFormDate = formatDate(props.csTask.endTime)
    setStartAuditDate(localDate(startFormDate))
    setEndAuditDate(localDate(endFormDate))

  }, [props.csTask]);

  return (
    <Accordion id={"1"} key={1} className={classes.Accordion} style={{margin:"0px 0px 4px 0px"}} expanded={accordState} onChange={handleAccordion}> 
      <StyledAccordionSummary   expandIcon={<ExpandMoreIcon className={classes.ExpandMoreIcon}/>} aria-controls="panel1a-content" id="panel1a-header" className={classes.AccordionSummary}  style={{margin:0,alignItems:'center',minHeight:!accordState? 39: 16,maxHeight:!accordState? 39: 16}}>
        {!accordState && 
          <>
            <Grid item xs={12} md={12} sm={12} className={classes.summary}>
              <div className={classes.fileName__Summary__container}>
                <div className={classes.fileUpload_name__typo}> 
                  <Typography style={labelField}>{"Task Type :"}</Typography>
                </div>
                <div style={{padding:0}} className={classes.fileUpload_name__value}>
                  {props.csTask.type}
                </div>
              </div>
              <div  className={classes.progress__Summary__Container}>
                <LinearProgressWithLabel value={props.csTask.progressPercentage} />
              </div> 
              <div  className={classes.status__Summary__Container}>
                <div className={classes.fileUpload_status__value} style={{margin:0,padding:0,color:getResultColor(props.csTask.resultStatus)}}>
                  {props.csTask.resultStatus}
                  {props.csTask.resultStatus === null && "RUNNING"}
                </div>
              </div>
            </Grid>
          </>
        }
      </StyledAccordionSummary>
      <AccordionDetails style={{ display: "flex",width:'100%',padding:0,flexDirection:"column" }} >  
        <TabContext value={value}> 
          <TabList TabIndicatorProps={{ style: { background: "#3569a8" } }} id={`tab_task_index`} style={{minHeight: "auto",height: "auto",width:'100%',borderBottom:"1px solid #a2b4b5"}} className={classes.TabList} onChange={handleChange} aria-label={`tab_for_user_groupe_index_`}>
            <Tab itemID={`tab_task_general_index`}   style={{minHeight: "auto",height: "auto",paddingBottom:0,paddingTop:0,textTransform:'initial'}} className={classes.Tab} label='General' value='1' />
            <Tab itemID={`tab_task_log_index`}   style={{minHeight: "auto",height: "auto",textTransform:'initial'}} className={classes.Tab} label='Task Log' value='2' />
          </TabList>
          <TabPanel itemID={`TabPanel_userGroupe_general_index`} style={{padding:0}} className={classes.TabPanel} value='1'>    
            <div className={classes.fileUpload}>
              <Grid item xs={12} md={12} sm={12} className={classes.fileUpload_mainInfo}>
                <Grid item xs={12} md={12} sm={12} className={classes.fileUpload_name} >
                {
                  accordState &&
                  <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center' ,padding:"0px 0px 0px 8px",}}>
                    <div style={{width:'60%',display:'flex',alignItems:'center'}}>
                      <LinearProgressWithLabel value={props.csTask.progressPercentage} />
                    </div>
                    <div style={{width:'40%',display:'flex',alignItems:'center'}}>
                    <div className={classes.fileUpload_progressInfo__typo}>
                      <Typography style={{fontStyle:"italic",fontWeight:400, color:"#3569a8"}}>
                        {props.csTask.progressInfo !== "0" && props.csTask.progressInfo}
                      </Typography>
                        </div>
                    </div>
                    
                  </div> 
                }
                </Grid>
                <Grid item xs={12} md={12} sm={12} className={classes.fileUpload_name}>
                  <div style={{display:'flex',alignItems:'center'}}>
                    <div className={classes.fileUpload_status__typo}>
                        <Typography style={labelField}>Task Type :</Typography>
                    </div>
                    <div className={classes.fileUpload_status__value} >
                      {props.csTask.type}
                    </div>
                  </div>    
                  <div style={{display:'flex',alignItems:'center'}}>
                    <div className={classes.fileUpload_status__typo}>
                        <Typography style={labelField}>Result :</Typography>
                    </div>
                    <div className={classes.fileUpload_status__value} style={{color:"#495057"}}>
                      {props.csTask.resultStatus}
                      {props.csTask.resultStatus === null && <Typography style={{fontWeight:300}}> - </Typography>}
                    </div>
                    <div className={classes.fileUpload__statusIcon} style={{backgroundColor:getResultColor(props.csTask.resultStatus)}}/>
                  </div>         
                  <div style={{display:'flex',alignItems:'center'}}>
                    <div className={classes.fileUpload_status__typo}>
                        <Typography style={labelField}>Running Status :</Typography>
                    </div>
                    <div className={classes.fileUpload_status__value} style={{color:"#495057"}}>
                        {props.csTask.runningStatus}
                    </div>
                    <div style={{display:'flex', alignItems:'center',marginLeft:4}}>
                        {props.csTask.runningStatus === "FINISHED" && getRunningIcon(props.csTask.runningStatus)}
                    </div>
                  </div>
                  <div className={classes.fileUpload_startTime}>
                    <div className={classes.fileUpload_startTime__typo}>
                        <Typography style={labelField}>Start time  :</Typography>
                    </div>
                    <div className={classes.fileUpload_startTime__value}>
                      {startAuditDate}
                  </div>
                  </div>
                  <div className={classes.fileUpload_endTime}>
                    <div className={classes.fileUpload_endTime__typo}>
                        <Typography style={labelField}>End time :</Typography>
                    </div>
                    <div className={classes.fileUpload_endTime__value}>
                      {props.csTask.endTime === null ?
                        <Typography style={{fontWeight:400}}> - </Typography>
                        :
                        <Typography style={{fontWeight:400}}> {endAuditDate} </Typography>
                      }
                    </div>
                  </div>
                  <div className={classes.fileUpload_user}>
                    <div className={classes.fileUpload_user__typo}>
                        <Typography style={labelField}>User :</Typography>
                    </div>
                    <div className={classes.fileUpload_user__value}>
                        {props.csTask.userLogin}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={12} sm={12}   className={classes.fileUpload_moreInfo}>
                  {props.csTask.type === TaskType.DELETION &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Deleted Type : "}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.csTask.deletionTaskDTO.type}
                      </div>
                    </div> 
                  }
                  {props.csTask.type === TaskType.DELETION &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Deleted Value : "}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.csTask.deletionTaskDTO.entityName}
                      </div>
                    </div> 
                  }
                  {props.csTask.type !== TaskType.DELETION &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Tag Name"}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.tagName}
                      </div>
                    </div> 
                  }
                  {props.csTask.type !== TaskType.DELETION &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Tag Name"}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.tagName}
                      </div>
                    </div> 
                  }
                  {props.csTask.type !== TaskType.DELETION && props.csTask.TaskType !== TaskType.PUBLICATION && props.csTask.TaskType !== TaskType.REPLICATION &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Properties Type"}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.csTask.type === TaskType.EXPORT && props.csTask.fileExportTaskDTO.propertiesType}
                        {props.csTask.type === TaskType.UPLOAD && props.csTask.fileUploadTaskDTO.propertiesType}
                      </div>
                    </div> 
                  }
                  {/*!-- PUBLICATION --*/}
                  {props.csTask.type === TaskType.PUBLICATION &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Publish Empty Properties :"}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.csTask.publishPropertyTaskDTO.publishEmptyProperties === true ? "TRUE" : "FALSE"}
                      </div>
                    </div> 
                  }
                  {props.csTask.type === TaskType.PUBLICATION &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Published Keys :"}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.csTask.publishPropertyTaskDTO.nbrPublishedKeys}
                      </div>
                    </div> 
                  }
                  {props.csTask.type === TaskType.PUBLICATION &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Published Values :"}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.csTask.publishPropertyTaskDTO.nbrPublishedValues}
                      </div>
                    </div> 
                  }
                  {props.csTask.type === TaskType.PUBLICATION &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Deleted Keys :"}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.csTask.publishPropertyTaskDTO.nbrDeletedKeys}
                      </div>
                    </div> 
                  }
                  {props.csTask.type === TaskType.PUBLICATION &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Deleted Values :"}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.csTask.publishPropertyTaskDTO.nbrDeletedValues}
                      </div>
                    </div> 
                  }
                  {/*!-- ExportTask --*/}
                  {props.csTask.type === TaskType.EXPORT &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Exported Keys :"}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.csTask.fileExportTaskDTO.nbrExportedKeys}
                      </div>
                    </div> 
                  }
                  {props.csTask.type === TaskType.EXPORT &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Exported Values :"}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.csTask.fileExportTaskDTO.nbrExportedValues}
                      </div>
                    </div> 
                  }
                  {/*!-- UploadedTask --*/}
                  {props.csTask.type === TaskType.UPLOAD &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"File Name :"}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.csTask.fileUploadTaskDTO.fileName}
                      </div>
                    </div> 
                  }
                  {props.csTask.type === TaskType.UPLOAD &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Strategy Type :"}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.csTask.fileUploadTaskDTO.strategyType}
                      </div>
                    </div> 
                  }
                  {props.csTask.type === TaskType.UPLOAD &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Number Of Values :"}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.csTask.fileUploadTaskDTO.nbrUploadedKeys}
                      </div>
                    </div> 
                  }
                  {props.csTask.type === TaskType.UPLOAD &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Number Of Keys :"}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.csTask.fileUploadTaskDTO.nbrUploadedValues}
                      </div>
                    </div> 
                  }
                  {props.csTask.type === TaskType.REPLICATION &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Number Of Replicated Properties Key :"}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.csTask.replicationTaskDTO.numberOfReplicatedPropertiesKey}
                      </div>
                    </div> 
                  }
                  {props.csTask.type === TaskType.REPLICATION &&
                    <div style={{display:'flex',alignItems:'center'}}>
                      <div className={classes.fileUpload_name__typo}>
                        <Typography style={labelField}>{"Number Of Replicated Properties Value :"}</Typography>
                      </div>
                      <div className={classes.fileUpload_name__value}>
                        {props.csTask.replicationTaskDTO.numberOfReplicatedPropertiesValue}
                      </div>
                    </div> 
                  }
                </Grid>
                <Grid item xs={12} md={12} sm={12}   className={classes.fileUpload_moreInfo}>
                  {props.csTask.type === TaskType.UPLOAD &&
                    <>
                      <div className={classes.TokenValue__Scoop}>
                        <div className={classes.TokenValue__Scoop} style={{marginLeft:0,marginBottom:8,marginTop:0}}>
                          {props.csTask.context.map((row:any,index:any)=>(
                            <div id={row.key+"-"+index}  className={classes.TokenValue__Scoop__context__Values} >
                              <div className={classes.TokenValue__token_key}>
                                <div style={{backgroundColor:'white',padding: "0px 6px",color:"#3569a8",fontWeight:"bold"}}>{row.key}</div>
                              </div>
                              <div  className={classes.TokenValue__Scoop__context__values}>
                                {row.values.map((element:any,index:any)=>(
                                  <div className={classes.chips} style={{fontFamily: 'Poppins,sans-serif',height:24,backgroundColor:"rgb(229, 115, 115)"}}>{element}</div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
            
                    </>
                  }
                  {props.csTask.type === TaskType.EXPORT &&
                    <>
                    {props.csTask.context.map((elementValues:any)=>(
                      <div style={{display:'flex',alignItems:'center'}}>
                        <div className={classes.fileUpload_name__typo}>
                          <Typography style={labelField}>{elementValues.key} :</Typography>
                        </div>
                        <div className={classes.fileUpload_name__value}>
                          {elementValues.value}
                        </div>
                      </div> 
                    ))}
                    </>
                  }
                </Grid>
              </Grid>  
            </div>
          </TabPanel>
          <TabPanel value={"2"}>
                  <CsTaskLog taskLogInfo={taskLog} taskDate={props.csTask.endTime} />
          </TabPanel>
        </TabContext>
      </AccordionDetails>
    </Accordion>
  );
};
export default CsTaskValue;
