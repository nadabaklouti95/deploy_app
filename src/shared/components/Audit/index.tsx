
import * as React from "react";
import { useEffect, useState } from "react";

import useStyles from "./styles";
import { StyledAccordionSummary } from "shared/constants/AppConst";

import { Accordion, AccordionDetails, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IAudit } from "types/models/interface";
import { labelField } from "shared/constants/AppCssCons";
import { typeEnum } from "shared/constants/AppEnums";
import {localDate} from "../../constants/LocalDate";



const Audit: React.FC<IAudit> = (props) => {
    const classes = useStyles();
    const [accordState,setAccordState] = useState<boolean>(false)
    const [auditDate,setAuditDate] = React.useState<any>(null)

    const handleAccordion = ()=>{setAccordState(!accordState)}
    //const getContext = (object:any)=> ""object.filter((element:any)=>element !== "")
    const parsingContent = (value:any) =>{
        return JSON.parse(value)
    }
    const getContextName = (value:any) =>{
        const indexData = value.indexOf(":[");
        const sub = value.substring(0, indexData);
        return sub
    }
    const getContextValue = (value:any) =>{
        const indexDataStart = value.indexOf(":[");
        const indexDataEnd = value.indexOf("]");
        const sub = value.substring(indexDataStart+2, indexDataEnd);
        return sub.split(',')
    }
    const parsingPropertyValue = (value:any)=>{
        
        const searchTerm = "]}";
        let dataStr = "contextJson";
        const indexData = value.indexOf("\"contextJson\":\"");
        const indexOfFirst = value.indexOf(searchTerm);
        const sub = value.substring(indexData + dataStr.length + 3, indexOfFirst+3);
        
        const replace  = sub.replaceAll("=[",":[")
        
        const preSplit = replace.substring(2,replace.length-2);
        
        const preSplit2 = preSplit.replaceAll("},","} ,");
        const preSplit3 = preSplit2.replaceAll("],","] ,");
        return preSplit3.split(" ,");
    }
    useEffect(()=>{   
        setAccordState(props.fold)
      },[props.fold])


    useEffect(() => {
        setAuditDate(localDate(props.audit.dateTime))
    }, [props.audit]);

  return (
    <Accordion id={"1"} key={1} className={classes.Accordion} expanded={accordState} style={{margin:'0px 0px 4px 0px'}}onChange={handleAccordion}>
        <StyledAccordionSummary  
            expandIcon={<ExpandMoreIcon style={{margin:4}} className={classes.ExpandMoreIcon}/>} 
            aria-controls="panel1a-content" 
            id="panel1a-header" 
            className={classes.AccordionSummary}  
            style={{margin:0,alignItems:'center'}}
        >
            {!accordState && 
                <div className={classes.accodianSummary_content}>
                    <div className={classes.accodianSummary_content_element}>
                        <div className={classes.accodianSummary_content_label}>
                            <Typography style={labelField}>Version :</Typography>
                        </div>
                        <div className={classes.accodianSummary_content_value}>
                            <Typography >{props.audit.version}</Typography>
                        </div>
                    </div>
                    <div className={classes.accodianSummary_content_element}>
                        <div className={classes.accodianSummary_content_label}>
                            <Typography style={labelField}>Date :</Typography>
                        </div>
                        <div className={classes.accodianSummary_content_value}>
                            <Typography >{auditDate}</Typography>
                        </div>
                    </div>
                    <div className={classes.accodianSummary_content_element}>
                        <div className={classes.accodianSummary_content_label}>
                            <Typography style={labelField}>User :</Typography>
                        </div>
                        <div className={classes.accodianSummary_content_value}>
                            <Typography >{props.audit.userLogin}</Typography>
                        </div>
                    </div>
                    <div className={classes.accodianSummary_content_element}>
                        <div className={classes.accodianSummary_content_label}>
                            <Typography style={labelField}>Operation Type :</Typography>
                        </div>
                        <div className={classes.accodianSummary_content_value}>
                            <Typography >{props.audit.operation}</Typography>
                        </div>
                    </div>
                    
                    
                </div>
            }
        </StyledAccordionSummary>
        <AccordionDetails style={{ display: "flex",width:'100%',flexDirection:'column',padding:0}} > 
            <div className={classes.AccordionDetails}>
                <div className={classes.AccordionDetails_mainInfo} style={{flexWrap:'wrap'}}>
                    <div className={classes.accodianSummary_content_element} >
                        <div className={classes.accodianSummary_content_label}>
                            <Typography style={labelField}>Version :</Typography>
                        </div>
                        <div className={classes.accodianSummary_content_value}>
                            <Typography >{props.audit.version}</Typography>
                        </div>
                    </div>
                    <div className={classes.accodianSummary_content_element} >
                        <div className={classes.accodianSummary_content_label}>
                            <Typography style={labelField}>Operation Type :</Typography>
                        </div>
                        <div className={classes.accodianSummary_content_value}>
                            <Typography >{props.audit.operation}</Typography>
                        </div>
                    </div>
                    <div className={classes.accodianSummary_content_element} >
                        <div className={classes.accodianSummary_content_label}>
                            <Typography style={labelField}>User :</Typography>
                        </div>
                        <div className={classes.accodianSummary_content_value}>
                            <Typography >{props.audit.userLogin}</Typography>
                        </div>
                    </div>
                    <div className={classes.accodianSummary_content_element} >
                        <div className={classes.accodianSummary_content_label}>
                            <Typography style={labelField}>Date :</Typography>
                        </div>
                        <div className={classes.accodianSummary_content_value}>
                            <Typography >{auditDate}</Typography>
                        </div>
                    </div>
                    
                    
                </div>
                <div className={classes.divider}/>
                    <div style={{display:'flex',padding:"8px",flexDirection:'row',flexWrap:'wrap',alignItems:'center'}}>
                        {props.audit.entityName === "PropertyKey" &&
                                <div className={classes.accodianSummary_content_element} >
                                    <div className={classes.accodianSummary_content_label}>
                                        <Typography style={labelField}>Key :</Typography>
                                    </div>
                                    <div className={classes.accodianSummary_content_value}>
                                        <Typography >{props.audit.keyName}</Typography>
                                    </div>
                                </div>
                        }
                                <div className={classes.accodianSummary_content_element} >
                                    <div className={classes.accodianSummary_content_label}>
                                        <Typography style={labelField}>Type :</Typography>
                                    </div>
                                    <div className={classes.accodianSummary_content_value}>
                                        <Typography >{parsingContent(props.audit.content).typeId === typeEnum.TECHNICAL ? "TECHNICAL" : "FUNCTIONAL"}</Typography>
                                    </div>
                                </div>
                            {props.audit.entityName === "PropertyKey" &&
                                <div className={classes.accodianSummary_content_element} >
                                    <div className={classes.accodianSummary_content_label}>
                                        <Typography style={labelField}>Status :</Typography>
                                    </div>
                                    <div className={classes.accodianSummary_content_value}>
                                        <Typography >{(props.audit.status === null || props.audit.status === undefined) ? "" : props.audit.status }</Typography>
                                    </div>
                                </div>}
                            {props.audit.entityName === "PropertyKey" &&
                                <div className={classes.accodianSummary_content_element} >
                                    <div className={classes.accodianSummary_content_label}>
                                        <Typography style={labelField}>Dirty :</Typography>
                                    </div>
                                    <div className={classes.accodianSummary_content_value}>
                                        <Typography >{parsingContent(props.audit.content).dirty === true ? "TRUE" : "FALSE"}</Typography>
                                    </div>
                                </div>
                            }
                            {props.audit.entityName === "PropertyKey" &&
                                <div className={classes.accodianSummary_content_element} >
                                    <div className={classes.accodianSummary_content_label}>
                                        <Typography style={labelField}>Tag :</Typography>
                                    </div>
                                    <div className={classes.accodianSummary_content_value}>
                                        <Typography >{parsingContent(props.audit.content).tagName }</Typography>
                                    </div>
                                </div>
                            }
                            {props.audit.entityName === "PropertyValue" &&
                                <div className={classes.accodianSummary_content_element}>
                                    <div className={classes.accodianSummary_content_label}>
                                        <Typography style={labelField}>Key :</Typography>
                                    </div>
                                    <div className={classes.accodianSummary_content_value}>
                                        <Typography >{props.audit.keyName}</Typography>
                                    </div>
                                </div>
                            }
                            {props.audit.entityName === "PropertyValue" &&
                                <div className={classes.accodianSummary_content_element} >
                                    <div className={classes.accodianSummary_content_label}>
                                        <Typography style={labelField}>Status :</Typography>
                                    </div>
                                    <div className={classes.accodianSummary_content_value}>
                                        <Typography >{props.audit.status}</Typography>
                                    </div>
                                </div>
                            }
                            {props.audit.entityName === "PropertyValue" &&
                                <div className={classes.accodianSummary_content_element} >
                                    <div className={classes.accodianSummary_content_label}>
                                        <Typography style={labelField}>Tag :</Typography>
                                    </div>
                                    <div className={classes.accodianSummary_content_value}>
                                        <Typography >{parsingContent(props.audit.content).tagName}</Typography>
                                    </div>
                                </div>
                            }
                    </div>
                {props.audit.entityName === "PropertyValue" &&
                    <div className={classes.AccordionDetails_propertyInfo} style={{marginTop:0,padding:"0px 8px 8px 8px"}}>
                    {props.audit.entityName === "PropertyValue" &&
                        <div className={classes.AccordionDetails_mainInfo} style={{padding:"0px"}}>
                            {parsingPropertyValue(props.audit.content).map((row:any,index:any)=>(
                                <div id={row.key+"-"+index} key={`parsing_property_${index}`} className={classes.TokenValue__Scoop__context__Values} >
                                    <div className={classes.TokenValue__token_key}>
                                        <div style={{backgroundColor:'white',padding: "0px 4px"}}>
                                            {getContextName(row)}
                                        </div>
                                        </div>
                                    <div  className={classes.TokenValue__Scoop__context__values}>
                                        {getContextValue(row).map((rowContext:any,indexContext:any)=>(
                                        <div key={indexContext} className={classes.chips} style={{fontFamily: 'Poppins,sans-serif',height:24,backgroundColor:"#E0E0E0"}}>{rowContext}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    {props.audit.entityName === "PropertyValue" &&
                        <div className={classes.AccordionDetails_mainInfo} style={{padding:"8px"}}>
                            <div className={classes.accodianSummary_content_element}>
                                <div className={classes.accodianSummary_content_label}>
                                    <Typography style={labelField}>Value :</Typography>
                                </div>
                                <div className={classes.accodianSummary_content_value}>
                                    <Typography >{parsingContent(props.audit.content).value}</Typography>
                                </div>
                            </div>
                        </div>
                    }
                    
                </div>
                }
            </div>
        </AccordionDetails>
        
    </Accordion>
        
    );
};
export default Audit;
