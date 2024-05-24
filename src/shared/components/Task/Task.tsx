import {  Accordion, AccordionDetails, AccordionSummary, Box, Grid, LinearProgress, LinearProgressProps, Typography, withStyles } from "@material-ui/core";
import * as React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./styles";
import FiberNewTwoToneIcon from '@mui/icons-material/FiberNewTwoTone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { labelField } from "shared/constants/AppCssCons";
import {useEffect} from "react";
import {localDate} from "../../constants/LocalDate";

interface ITask {
    progressData:any;
    TaskMainInfo:any;
    SecondaryInfo:any;
    unfoldAll:any;
    unfoldInfo:any;
} 
const label = "label"
const selectReadOnly = 'select-readOnly'
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

  const getRunningIcon = (status:any)=>{
    if(status === "NEW"){return <FiberNewTwoToneIcon  style={{color:"#137de7",height:16,width:16}}/>}
    if(status === "FINISHED"){return <CheckCircleIcon style={{color:"#179f35",height:16,width:16}}/>}
    if(status === "UNKOWN"){return <HelpOutlineIcon  style={{color:"#b71818",height:16,width:16}}/>}
    else{return  <></>}
  }
  const getResultColor = (result:any)=>{
    if(result === "SUCCESS"){return "#179f35"}
    if(result === "FAIL"){return "#FF0000"}
    if(result === "ABORTED"){return "#FE9800"}
    else{return "#495377"}
  }

const Task:React.FC<ITask> = (props) => {
    const classes = useStyles()
    const [accordState,setAccordState] = React.useState<boolean>(props.unfoldAll.action)
    const [startAuditDate,setStartAuditDate] = React.useState<any>(null)
    const [endAuditDate,setEndAuditDate] = React.useState<any>(null)


    const truncatedLabel  = (key: any) => key.length > 20 ? `${key.slice(0, 20)}...` : key;

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



    useEffect(() => {
        const startFormDate = formatDate(props.TaskMainInfo.startTime)
        const endFormDate = formatDate(props.TaskMainInfo.endTime)
        setStartAuditDate(localDate(startFormDate))
        setEndAuditDate(localDate(endFormDate))
    }, [props.TaskMainInfo]);


  return (
    <Accordion id={"1"} key={1} className={classes.Accordion} style={{margin:"0px 0px 4px 0px"}} expanded={accordState} onChange={handleAccordion}> 
    <StyledAccordionSummary  expandIcon={<ExpandMoreIcon className={classes.ExpandMoreIcon}/>} aria-controls="panel1a-content" id="panel1a-header" className={classes.AccordionSummary}  style={{margin:0,alignItems:'center'}}>
      {!accordState && 
        <>
          <Grid item xs={12} md={12} sm={12} className={classes.summary}>
            <div className={classes.fileName__Summary__container}>
              <div className={classes.fileUpload_name__typo}>
                <Typography  style={labelField}>
                    {props.unfoldInfo.label}
                </Typography>
              </div>
              <div style={{padding:0}} className={classes.fileUpload_name__value}>
                {props.unfoldInfo.value}
              </div>
            </div>
            <div  className={classes.progress__Summary__Container}>
              <LinearProgressWithLabel value={props.progressData.progressPercentage} />
            </div> 
            <div  className={classes.status__Summary__Container}>
              <div className={classes.fileUpload_status__value} style={{margin:0,padding:0,color:getResultColor(props.TaskMainInfo.resultStatus)}}>
                {props.TaskMainInfo.resultStatus}
                {props.TaskMainInfo.resultStatus === null && "RUNNING"}
              </div>
            </div>

          </Grid>
        </>
      }
      {
        accordState &&
        <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center'}}>
          <div style={{width:'60%',display:'flex',alignItems:'center'}}>
            <LinearProgressWithLabel value={props.progressData.progressPercentage} />
          </div>
          <div style={{width:'40%',display:'flex',alignItems:'center'}}>
          <div className={classes.fileUpload_progressInfo__typo}>
            <Typography style={{fontStyle:"italic"}}>
              {props.progressData.progressInfo !== "0" && props.progressData.progressInfo}
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
                <Typography style={labelField}>Result :</Typography>
            </div>
            <div className={classes.fileUpload_status__value} style={{color:"#495057"}}>
                {props.TaskMainInfo.resultStatus}
                {props.TaskMainInfo.resultStatus === null && <Typography style={{fontWeight:300}}> - </Typography>}
            </div>
            <div className={classes.fileUpload__statusIcon} style={{backgroundColor:getResultColor(props.TaskMainInfo.resultStatus)}}/>
            </div>         
            <div style={{display:'flex',alignItems:'center'}}>
            <div className={classes.fileUpload_status__typo}>
                <Typography style={labelField}>Running Status :</Typography>
            </div>
            <div className={classes.fileUpload_status__value} >
                {props.TaskMainInfo.runningStatus}
            </div>
            <div style={{display:'flex', alignItems:'center',marginLeft:4}}>
                {props.TaskMainInfo.runningStatus === "FINISHED" && getRunningIcon(props.TaskMainInfo.runningStatus)}
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

                {props.TaskMainInfo.endTime === null ?
                    <Typography style={{fontWeight:400}}> - </Typography>
                :
                    <Typography style={{fontWeight:400}}>{endAuditDate} </Typography>}
            </div>
            </div>
            <div className={classes.fileUpload_user}>
            <div className={classes.fileUpload_user__typo}>
                <Typography style={labelField}>User :</Typography>
            </div>
            <div className={classes.fileUpload_user__value}>
                {props.TaskMainInfo.userLogin}
            </div>
            </div>
        </Grid>
      </Grid>
     
        {props.SecondaryInfo.map((element:any,index:any)=>(
          <Grid key={index} item xs={12} md={12} sm={12}   className={classes.fileUpload_moreInfo}>
            {element.type === label &&
              <>
                {element.values.map((elementValues:any, elemIndex:any)=>(
                  <div key={elemIndex} style={{display:'flex',alignItems:'center'}}>
                    <div className={classes.fileUpload_name__typo}>
                      <Typography style={labelField}>{elementValues.label}</Typography>
                    </div>
                    <div className={classes.fileUpload_name__value}>
                      {elementValues.value  === null && "0"}
                      {elementValues.value}
                    </div>
                    {elementValues.icon}
                  </div> 
                ))}
              </>
            }
            {element.type === selectReadOnly &&
              <>
                {element.values.map((elementValues:any, elementIndex:any)=>(
                  <div key={elementIndex} className={classes.TokenValue__Scoop}>
                    <div className={classes.TokenValue__Scoop} style={{marginLeft:0,marginBottom:8,marginTop:0}}>
                      {elementValues.map((row:any,index:any)=>(
                        <div key={`element_${index}`} id={row.key+"-"+index}  className={classes.TokenValue__Scoop__context__Values} >
                          <div className={classes.TokenValue__token_key}>
                            <div style={{backgroundColor:'white',padding: "0px 6px",color:"#3569a8"}}>{truncatedLabel(row.key)}</div>
                          </div>
                          <div  className={classes.TokenValue__Scoop__context__values}>
                            {row.value.map((element:any,i:any)=>(
                              <div key={i} className={classes.chips} style={{fontFamily: 'Poppins,sans-serif',height:24,backgroundColor:element.color}}>{element.value}</div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            }
            {element.type === "select-readOnly-one" &&       
              <>
                {element.values.map((elementValues:any, elementIndex:any)=>(
                  <div key={elementIndex} style={{display:'flex',alignItems:'center'}}>
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
        ))}
             
      
      
      </div>
    </AccordionDetails>
  </Accordion>
  ); 
};

export default Task;
