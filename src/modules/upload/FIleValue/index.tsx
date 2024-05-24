import {  Accordion, AccordionDetails, AccordionSummary, Box, Grid, LinearProgress, LinearProgressProps, Typography, withStyles } from "@material-ui/core";
import * as React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./styles";
import FiberNewTwoToneIcon from '@mui/icons-material/FiberNewTwoTone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { typeEnum } from "shared/constants/AppEnums";

  interface IFileValue {
    unfoldAll:any;
    file:any;
  } 
  const StyledAccordionSummary = withStyles({
    root: {
      height:'auto',
      "&.Mui-expanded": {
        minHeight: 42,
        maxHeight: 42,
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

  const getResultColor = (result:any)=>{
    if(result === "SUCCESS"){return "#179f35"}
    if(result === "FAIL"){return "#FF0000"}
    if(result === "ABORTED"){return "#FE9800"}
    else{return "#495377"}
  }
  // <CheckCircleIcon  style={{color:"#17FF4A",height:16,width:16}}/>
  const getRunningIcon = (status:any)=>{
    if(status === "NEW"){return <FiberNewTwoToneIcon  style={{color:"#137de7",height:16,width:16}}/>}
    if(status === "FINISHED"){return <CheckCircleIcon style={{color:"#179f35",height:16,width:16}}/>}
    if(status === "UNKOWN"){return <HelpOutlineIcon  style={{color:"#b71818",height:16,width:16}}/>}
    else{return  <></>}
  }
  const FileValue: React.FC<IFileValue> = (props) => {
    const classes = useStyles()
    const [accordState,setAccordState] = React.useState<boolean>(props.unfoldAll.action)
    const handleAccordion = ()=>{
      if(props.unfoldAll.action === "fold"){
        setAccordState(props.unfoldAll.state)
      }else{
        if(!props.unfoldAll.state ){
          props.unfoldAll.callback(false)
        }
        setAccordState(!accordState)
      }
    }
    React.useEffect(()=>{    
      setAccordState(props.unfoldAll.state)
    },[props.unfoldAll.action,props.unfoldAll.state])
    
    return (
        <Accordion id={"1"} key={1} className={classes.Accordion} style={{margin:"0px 0px 4px 0px"}} expanded={accordState} onChange={handleAccordion}> 
          <StyledAccordionSummary  expandIcon={<ExpandMoreIcon className={classes.ExpandMoreIcon}/>} aria-controls="panel1a-content" id="panel1a-header" className={classes.AccordionSummary}  style={{margin:0,alignItems:'flex-start'}}>
            {!accordState && 
              <>
                <Grid item xs={12} md={12} sm={12} className={classes.summary}>
                  <div className={classes.fileName__Summary__container}>
                    <div className={classes.fileUpload_name__typo}>
                      <Typography style={{fontWeight:500}}>File Name :</Typography>
                    </div>
                    <div style={{padding:0}} className={classes.fileUpload_name__value}>
                      {props.file.fileUploadTaskDTO.fileName}
                    </div>
                  </div>
                  <div  className={classes.progress__Summary__Container}>
                    <LinearProgressWithLabel value={props.file.progressPercentage} />
                  </div> 
                  <div  className={classes.status__Summary__Container}>
                    <div className={classes.fileUpload_status__value} style={{margin:0,padding:0,color:getResultColor(props.file.resultStatus)}}>
                      {props.file.resultStatus}
                      {props.file.resultStatus === null && "RUNNING"}
                    </div>
                  </div>

                </Grid>
              </>
            }
            {
              accordState &&
              <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center'}}>
                <div style={{width:'80%',display:'flex',alignItems:'center'}}>
                  <LinearProgressWithLabel value={props.file.progressPercentage} />
                </div>
                <div style={{width:'20%',display:'flex',alignItems:'center'}}>
                <div className={classes.fileUpload_progressInfo__typo}>
                  <Typography style={{fontStyle:"italic"}}>
                    {props.file.progressInfo !== "0" && props.file.progressInfo}
                  </Typography>
                    </div>
                </div>
                
              </div> 
              
            }
          </StyledAccordionSummary>
          <AccordionDetails style={{ display: "flex",width:'100%',padding:0 }} >        
            <div className={classes.fileUpload}>
            <Grid item xs={12} md={12} sm={12} className={classes.fileUpload_mainInfo}>
            <Grid item xs={12} md={12} sm={12} className={classes.fileUpload_name}>
              <div style={{display:'flex',alignItems:'center'}}>
                <div className={classes.fileUpload_status__typo}>
                  <Typography style={{fontWeight:500}}>Result :</Typography>
                </div>
                <div className={classes.fileUpload_status__value} style={{color:getResultColor(props.file.resultStatus)}}>
                  {props.file.resultStatus}
                  {props.file.resultStatus === null && <Typography style={{fontWeight:300}}> - </Typography>}
                </div>
                <div className={classes.fileUpload__statusIcon} style={{backgroundColor:getResultColor(props.file.resultStatus)}}/>
              </div>         
              <div style={{display:'flex',alignItems:'center'}}>
                <div className={classes.fileUpload_status__typo}>
                  <Typography style={{fontWeight:500}}>Running Status :</Typography>
                </div>
                <div className={classes.fileUpload_status__value} style={{color:props.file.runningStatus === "FINISHED" ? "#3D67D1" : "#495377"}}>
                  {props.file.runningStatus}
                </div>
                <div style={{display:'flex', alignItems:'center',marginLeft:4}}>
                  {props.file.runningStatus === "FINISHED" && getRunningIcon(props.file.runningStatus)}
                </div>
              </div>
              <div className={classes.fileUpload_startTime}>
                <div className={classes.fileUpload_startTime__typo}>
                  <Typography style={{fontWeight:500}}>Start time  :</Typography>
                </div>
                <div className={classes.fileUpload_startTime__value}>
                  {formatDate(props.file.startTime)}
                </div>
              </div>
              <div className={classes.fileUpload_endTime}>
                <div className={classes.fileUpload_endTime__typo}>
                  <Typography style={{fontWeight:500}}>End time :</Typography>
                </div>
                <div className={classes.fileUpload_endTime__value}>
                  {formatDate(props.file.endTime)}
                  {props.file.endTime === null && <Typography style={{fontWeight:400}}> - </Typography>}
                </div>
              </div>
              <div className={classes.fileUpload_user}>
                <div className={classes.fileUpload_user__typo}>
                  <Typography style={{fontWeight:500}}>User :</Typography>
                </div>
                <div className={classes.fileUpload_user__value}>
                  {props.file.userLogin}
                </div>
              </div>
              
            </Grid>
           
          </Grid>
              <Grid item xs={12} md={12} sm={12}   className={classes.fileUpload_moreInfo}>
                <div style={{display:'flex',alignItems:'flex-start'}}>
                  <div className={classes.fileUpload_name__typo}>
                    <Typography style={{fontWeight:500}}>File Name :</Typography>
                  </div>
                  <div className={classes.fileUpload_name__value}>
                    {props.file.fileUploadTaskDTO.fileName}
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                  <div className={classes.fileUpload_tag__typo}>
                    <Typography style={{fontWeight:500}}>Tag :</Typography>
                  </div>
                  <div className={classes.fileUpload_tag__value}>
                    {props.file.tagName}
                  </div>
                </div>
                <div className={classes.fileUpload_type}>
                  <div className={classes.fileUpload_type__typo}>
                    <Typography style={{fontWeight:500}}>Property Type :</Typography>
                  </div>
                  <div className={classes.fileUpload_type__value}>
                    {props.file.fileUploadTaskDTO.propertiesTypeId === typeEnum.TECHNICAL ? "TECHNICAL" : "FUNCTIONAL"}
                  </div>
                </div>
                <div className={classes.fileUpload_type}>
                  <div className={classes.fileUpload_type__typo}>
                    <Typography style={{fontWeight:500}}>Strategy Type :</Typography>
                  </div>
                  <div className={classes.fileUpload_type__value}>
                    {props.file.fileUploadTaskDTO.strategyType}
                  </div>
                </div>
                <div className={classes.fileUpload_keys}>
                  <div className={classes.fileUpload_keys__typo}>
                    <Typography style={{fontWeight:500}}>Number Of Keys :</Typography>
                  </div>
                  <div className={classes.fileUpload_keys__value}>
                    {props.file.fileUploadTaskDTO.nbrUploadedKeys === null && "0"}
                    { props.file.fileUploadTaskDTO.nbrUploadedKeys}
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={12} sm={12} className={classes.fileUpload_context}>
                <div className={classes.TokenValue__Scoop}>
                    <div className={classes.TokenValue__Scoop} style={{marginLeft:0,marginBottom:8,marginTop:8}}>
                        {props.file.context.map((row:any,index:any)=>(
                            <div id={row.key+"-"+index}  className={classes.TokenValue__Scoop__context__Values} >
                                <div className={classes.TokenValue__token_key}>
                                    <div style={{backgroundColor:'white',padding: "0px 4px"}}>{row.key}</div>
                                    </div>
                                <div  className={classes.TokenValue__Scoop__context__values}>
                                    {row.value.map((element:any,index:any)=>(
                                        <div className={classes.chips} style={{fontFamily: 'Poppins,sans-serif',height:24,backgroundColor:element.color}}>{element.value}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              </Grid>
            </div>
          </AccordionDetails>
        </Accordion>
    );
  };
  export default FileValue;
