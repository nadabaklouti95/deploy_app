import * as React from "react";
import { IPropertyRevisionCompare } from "types/models/interface";
import useStyles from "./styles";

import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { labelField } from "shared/constants/AppCssCons";
import { typeEnum } from "shared/constants/AppEnums";
var Diff = require('text-diff');


//const getContext = (object:any)=> object.filter((element:any)=>element !== "")

const compareValue = (firstElement:any,secondElement:any,elementIndex:any) =>{
    let resultArray:any = [];
    //let color = elementIndex === 1 ? "#b3e6ff" : "#fff8c5"
    try{
        var diff = new Diff(); // options may be passed to constructor; see below
        var textDiff = diff.main(firstElement, secondElement); // produces diff array
        textDiff.forEach((element:any)=>{
            if(elementIndex === 0){
                if(element[0] === 0){
                    resultArray.push({value:element[1],color:"#495057",backgroundColor:"#FFFFFF"})
                }
                if(elementIndex === 0 && element[0] === (-1)){
                    resultArray.push({value:element[1],color:"#495057",backgroundColor:"#fff8c5"})
                }
            }if(elementIndex === 1){
                if(element[0]>0){
                    resultArray.push({value:element[1],colorText:"#495057",backgroundColor:"#b3e6ff"})
                }
                if(element[0] === 0){
                    resultArray.push({value:element[1],color:"#495057",backgroundColor:"#FFFFFF"})
                }
                if(elementIndex === 0 && element[0] === (-1)){
                    resultArray.push({value:element[1],color:"#495057",backgroundColor:"#FFFFFF"})
                }
            }
            
        })
        return resultArray
    }catch(error){
        console.log(error)
        return resultArray
    }
    
}




const compareColor = (val1:any,val2:any,index:any)=>{
    let result = ''
    if(val1 !== val2 && index === 0){
        result = "#fff8c5"
    }else if (val1 !== val2 && index === 1){
        result = "#b3e6ff"
    }else{
        result = '#ffffff'
    }
    return result
}


const PropertyRevisonCompare: React.FC<IPropertyRevisionCompare> = (props) => {
  const classes = useStyles();
  const [firstcompareData,setFirstcompareData] = useState(props.compareData[0])
  const [secondcompareData,setSecondcompareData] = useState(props.compareData[1])
  const [heightContext,setHeightContext] = useState<any>("auto")
  const [heightKey,setHeightKey] = useState<any>("auto")
  const [heightValue,setHeightValue] = useState<any>("auto")

  let contextHeight1:any = React.createRef()
  let contextHeight2:any =React.createRef()
  let keyHeight1:any = React.createRef()
  let keyHeight2:any = React.createRef()
  let valueHeight1:any = React.createRef()
  let valueHeight2:any = React.createRef()


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

  useEffect(() => {
    setFirstcompareData(props.compareData[0])
    setSecondcompareData(props.compareData[1])
    
  }, [props.compareData])

  useEffect(() => {
    if(contextHeight1.current !== null && contextHeight2.current !== null){
    let heightContext1 = contextHeight1.current.offsetHeight === null ? 0 : contextHeight1.current.offsetHeight
    let heightContext2 = contextHeight2.current.offsetHeight === null ? 0 : contextHeight2.current.offsetHeight
    if(heightContext1>heightContext2){
        setHeightContext(heightContext1)
    }else if(heightContext1<heightContext2){
        setHeightContext(heightContext2)
    }else if(heightContext1 === heightContext2){
        setHeightContext(heightContext2)
    }
    }else{
        if(firstcompareData.entityName === "PropertyValue" && secondcompareData.entityName === "PropertyKey"){
            let heightContext1 = contextHeight1.current.offsetHeight === null ? 0 : contextHeight1.current.offsetHeight
            setHeightContext(heightContext1)
        }else if(firstcompareData.entityName === "PropertyKey" && secondcompareData.entityName === "PropertyValue"){
            let heightContext2 = contextHeight2.current.offsetHeight === null ? 0 : contextHeight2.current.offsetHeight
            setHeightContext(heightContext2)
        }
    }
    
  }, [contextHeight1, contextHeight2,firstcompareData,secondcompareData])

  useEffect(() => {
    let heightKey1 = keyHeight1.current.offsetHeight
    let heightKey2 = keyHeight2.current.offsetHeight
    heightKey1>heightKey2 ? setHeightKey(heightKey1) : setHeightKey(heightKey2)
    
  }, [keyHeight1, keyHeight2])

  useEffect(() => {
    let heightValue1 = valueHeight1.current.offsetHeight
    let heightValue2 = valueHeight2.current.offsetHeight
    heightValue1>heightValue2 ? setHeightValue(heightValue1) : setHeightValue(heightValue2)
    
  }, [valueHeight1, valueHeight2])
  
  
    return(
    <div className={classes.container_compare}>
        <div className={classes.container_compare_header}>
            <div style={{display:'flex',width:'auto',alignItems:'center',paddingLeft:8}}>
                <Typography className={classes.Typography}>Compare : V{firstcompareData.version} vs V{secondcompareData.version}</Typography>
                
            </div>
            <div style={{display:'flex',width:'auto',alignItems:'center'}}>
                <Tooltip title={"Reverse Property Audit"} arrow enterDelay={0} leaveDelay={200}>
                    <span>
                        <IconButton id={`reverse`}  className={classes.btn_Icon} style={{padding:8}} onClick={()=>{props.handleCompare('reverse')}}>
                            <FlipCameraAndroidIcon color="primary" />
                        </IconButton>
                    </span>

                </Tooltip>
                <Tooltip title={"Close"} arrow enterDelay={0} leaveDelay={200}>
                    <span>
                        <IconButton id={`close`}  className={classes.btn_Icon} style={{padding:8}} onClick={()=>{props.handleCompare('close')}}>
                        <HighlightOffIcon color="secondary" />
                    </IconButton>
                    </span>

                </Tooltip>
            </div>
            
        </div>
        <div className={classes.divider}/>
        <div style={{display: "flex", flexDirection: "row", height: "100%", overflowY: "scroll", flexWrap: "wrap"}}>
            <div style={{borderRight:'2px solid rgb(224, 224, 224)'}} className={classes.container_compare_mainInfo_audit}>
                {/* first line */} 
                <div style={{width:"100%"}} className={classes.container_compare_mainInfo_element}>
                    <div className={classes.compare_content_element}>
                        <div className={classes.compare_content_element}>
                            <div className={classes.compare_content_label}>
                                <Typography style={labelField}>Version :</Typography>
                            </div>
                            <div className={classes.compare_content_value}>
                                <Typography >{firstcompareData.version}</Typography>
                            </div>
                        </div>
                        <div className={classes.compare_content_element}>
                            <div className={classes.compare_content_label}>
                                <Typography style={labelField}>User :</Typography>
                            </div>
                            <div className={classes.compare_content_value}>
                                <Typography >{firstcompareData.userLogin}</Typography>
                            </div>
                        </div>
                    </div>
                    <div className={classes.compare_content_element}>
                        <div className={classes.compare_content_element}>
                            <div className={classes.compare_content_label}>
                                <Typography style={labelField}>Operation Type :</Typography>
                            </div>
                            <div className={classes.compare_content_value}>
                                <Typography >{firstcompareData.operation}</Typography>
                            </div>
                        </div>
                        <div className={classes.compare_content_element}>
                            <div className={classes.compare_content_label}>
                                <Typography style={labelField}>Tag :</Typography>
                            </div>
                            <div className={classes.compare_content_value}>
                                <Typography >{parsingContent(firstcompareData.content).tagName}</Typography>
                            </div>
                        </div>
                        
                    </div>
                </div>
                {/* second LIne*/}
                <div ref={keyHeight1} style={{width:"100%",height:heightKey}} className={classes.container_compare_mainInfo_element}>
                    <div className={classes.compare_content_element}>
                        <div className={classes.compare_content_element}>
                            <div className={classes.compare_content_label}>
                                <Typography style={labelField}>Key :</Typography>
                            </div>
                            <div className={classes.compare_content_value}>
                                { (firstcompareData.entityName === "PropertyKey" && secondcompareData.entityName === "PropertyKey")  &&
                                    compareValue(firstcompareData.keyName,secondcompareData.keyName,0).map((item: any) => (
                                        <div style={{display:"flex",backgroundColor:item.backgroundColor}}>
                                            <Typography style={{color:item.color,whiteSpace:'pre'}}>{item.value}</Typography>
                                        </div>
                                ))}
                                { (firstcompareData.entityName === "PropertyKey" && secondcompareData.entityName === "PropertyValue")  &&
                                    compareValue(firstcompareData.keyName,secondcompareData.keyName,0).map((item: any) => (
                                        <div style={{display:"flex",backgroundColor:item.backgroundColor}}>
                                            <Typography style={{color:item.color,whiteSpace:'pre'}}>{item.value}</Typography>
                                        </div>
                                ))}
                                { (firstcompareData.entityName === "PropertyValue" && secondcompareData.entityName === "PropertyKey")  &&
                                    compareValue(firstcompareData.keyName,secondcompareData.keyName,0).map((item: any) => (
                                        <div style={{display:"flex",backgroundColor:item.backgroundColor}}>
                                            <Typography style={{color:item.color,whiteSpace:'pre'}}>{item.value}</Typography>
                                        </div>
                                ))}
                                { (firstcompareData.entityName === "PropertyValue" && secondcompareData.entityName === "PropertyValue")  &&
                                    compareValue(firstcompareData.keyName,secondcompareData.keyName,0).map((item: any) => (
                                        <div style={{display:"flex",backgroundColor:item.backgroundColor}}>
                                            <Typography style={{color:item.color,whiteSpace:'pre'}}>{item.value}</Typography>
                                        </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* third Line*/}
                <div style={{width:"100%"}}  className={classes.container_compare_mainInfo_element}>
                    <div className={classes.compare_content_element}>
                        <div className={classes.compare_content_label}>
                            <Typography style={labelField}>Status :</Typography>
                        </div>
                        <div className={classes.compare_content_value} >
                            <Typography >{firstcompareData.status}</Typography>
                        </div>
                    </div>
                    <div className={classes.compare_content_element}>
                        {firstcompareData.entityName === "PropertyKey"  &&
                            <div className={classes.compare_content_element}>
                                <div className={classes.compare_content_label}>
                                    <Typography style={labelField}>Type :</Typography>
                                </div>
                                <div className={classes.compare_content_value} style={{backgroundColor:compareColor(parsingContent(firstcompareData.content).typeId,parsingContent(secondcompareData.content).typeId,0)}}>
                                    <Typography >{parsingContent(firstcompareData.content).typeId === typeEnum.TECHNICAL  ? "TECHNICAL" : "FUNCTIONAL"}</Typography>
                                </div>
                            </div>
                        }
                        {firstcompareData.entityName === "PropertyValue"  &&
                            <div className={classes.compare_content_element}>
                                <div className={classes.compare_content_label}>
                                    <Typography style={labelField}>Type :</Typography>
                                </div>
                                <div className={classes.compare_content_value} style={{backgroundColor:compareColor(parsingContent(firstcompareData.content).typeId,parsingContent(secondcompareData.content).typeId,0)}}>
                                    <Typography >{parsingContent(firstcompareData.content).typeId === typeEnum.TECHNICAL  ? "TECHNICAL" : "FUNCTIONAL"}</Typography>
                                </div>
                            </div>
                        }
                        {firstcompareData.entityName === "PropertyKey" &&
                            <div className={classes.compare_content_element}>
                                <div className={classes.compare_content_label}>
                                    <Typography style={labelField}>Dirty :</Typography>
                                </div>
                                <div className={classes.compare_content_value} >
                                    <Typography >{parsingContent(firstcompareData.content).dirty ? "TRUE" : "FALSE"}</Typography>
                                </div>
                            </div>
                        }
                        {firstcompareData.entityName === "PropertyValue" &&
                            <div className={classes.compare_content_element}>
                                <div className={classes.compare_content_label}>
                                    <Typography style={labelField}>Dirty :</Typography>
                                </div>
                                <div className={classes.compare_content_value} >
                                    <Typography >{parsingContent(firstcompareData.content).dirty ? "TRUE" : "FALSE"}</Typography>
                                </div>
                            </div>
                        }
                    </div>
                </div> 
                {/* four Line*/}
                <div  style={{width:"100%",height:heightContext}}  className={classes.container_compare_mainInfo_element}>
                    {firstcompareData.entityName === "PropertyValue" && 
                        <div className={classes.compare_content_element}>
                            <div ref={contextHeight1} className={classes.AccordionDetails_mainInfo} style={{padding:"0",flexWrap:"wrap"}}>
                                {parsingPropertyValue(firstcompareData.content).map((row:any,index:any)=>(
                                    <div id={row.key+"-"+index}  className={classes.TokenValue__Scoop__context__Values} >
                                        <div className={classes.TokenValue__token_key}>
                                            <div style={{backgroundColor:'white',padding: "0px 4px"}}>
                                                {getContextName(row)}
                                            </div>
                                            </div>
                                        <div  className={classes.TokenValue__Scoop__context__values}>
                                            {getContextValue(row).map((rowContext:any,indexContext:any)=>(
                                            <div className={classes.chips} style={{fontFamily: 'Poppins,sans-serif',height:24,backgroundColor:"#E0E0E0"}}>{rowContext}</div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
                {/* 5 Line*/}
                <div ref={valueHeight1} style={{width:"100%",height:heightValue}} className={classes.container_compare_mainInfo_element}>
                    {firstcompareData.entityName === "PropertyValue" &&                     
                        <div className={classes.compare_content_element}>
                            <div className={classes.compare_content_element}>
                                <div className={classes.compare_content_label}>
                                    <Typography style={labelField}>Value :</Typography>
                                </div>
                                <div className={classes.compare_content_value}>
                                    { (firstcompareData.entityName === "PropertyValue" && secondcompareData.entityName === "PropertyValue")  &&  
                                    compareValue(parsingContent(firstcompareData.content).value,parsingContent(secondcompareData.content).value,0).map((item: any) => (
                                        <div style={{display:"flex",backgroundColor:item.backgroundColor}}>
                                            <Typography style={{color:item.color,whiteSpace:'pre'}}>{item.value}</Typography>
                                        </div>
                                    ))}
                                    { (firstcompareData.entityName === "PropertyKey" && secondcompareData.entityName === "PropertyValue")  &&  
                                        <div style={{display:"flex",backgroundColor:"#F8EACA"}}>
                                            <Typography>{parsingContent(firstcompareData.content).value}</Typography>
                                        </div>
                                    }
                                    { (firstcompareData.entityName === "PropertyValue" && secondcompareData.entityName === "PropertyKey")  &&  
                                        <div style={{display:"flex",backgroundColor:"#F8EACA"}}>
                                            <Typography>{parsingContent(firstcompareData.content).value}</Typography>
                                        </div>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    }
                </div>

            </div>
            <div style={{paddingLeft:"32px",flex:1, marginBottom:30}} className={classes.container_compare_mainInfo_audit}>
                {/* first line */}     
                <div style={{width:"100%"}} className={classes.container_compare_mainInfo_element}>
                    <div className={classes.compare_content_element}>
                        <div className={classes.compare_content_element}>
                            <div className={classes.compare_content_label}>
                                <Typography style={labelField}>Version :</Typography>
                            </div>
                            <div className={classes.compare_content_value} style={{display:"flex" }}>
                                <Typography >{secondcompareData.version}</Typography>
                            </div>
                        </div>
                        <div className={classes.compare_content_element}>
                            <div className={classes.compare_content_label}>
                                <Typography style={labelField}>User :</Typography>
                            </div>
                            <div className={classes.compare_content_value} style={{display:"flex"}}>
                                <Typography >{secondcompareData.userLogin}</Typography>
                            </div>
                        </div>
                    </div>
                    <div className={classes.compare_content_element}>
                        <div className={classes.compare_content_element}>
                            <div className={classes.compare_content_label}>
                                <Typography style={labelField}>Operation Type :</Typography>
                            </div>
                            <div className={classes.compare_content_value} style={{display:"flex" }}>
                                <Typography >{secondcompareData.operation}</Typography>
                            </div>
                        </div>
                        <div className={classes.compare_content_element}>
                            <div className={classes.compare_content_label}>
                                <Typography style={labelField}>Tag :</Typography>
                            </div>
                            <div className={classes.compare_content_value} style={{display:"flex" }}>
                                <Typography >{parsingContent(secondcompareData.content).tagName}</Typography>
                            </div>
                        </div>
                        
                    </div>
                </div>
                {/* 2 line */}  
                <div ref={keyHeight2} style={{width:"100%",height:heightKey}} className={classes.container_compare_mainInfo_element}>
                    <div className={classes.compare_content_element}>
                        <div className={classes.compare_content_element}>
                            <div className={classes.compare_content_label}>
                                <Typography style={labelField}>Key :</Typography>
                            </div>
                            <div className={classes.compare_content_value}>
                            { (firstcompareData.entityName === "PropertyKey" && secondcompareData.entityName === "PropertyKey")  &&
                                compareValue(firstcompareData.keyName,secondcompareData.keyName,1).map((item: any) => (
                                    <div style={{display:"flex",backgroundColor:item.backgroundColor}}>
                                        <Typography style={{color:item.color,whiteSpace:'pre'}}>{item.value}</Typography>
                                    </div>
                            ))}
                            { (firstcompareData.entityName === "PropertyKey" && secondcompareData.entityName === "PropertyValue")  &&
                                compareValue(firstcompareData.keyName,secondcompareData.keyName,1).map((item: any) => (
                                    <div style={{display:"flex",backgroundColor:item.backgroundColor}}>
                                        <Typography style={{color:item.color,whiteSpace:'pre'}}>{item.value}</Typography>
                                    </div>
                            ))}
                            { (firstcompareData.entityName === "PropertyValue" && secondcompareData.entityName === "PropertyKey")  &&
                                compareValue(firstcompareData.keyName,secondcompareData.keyName,1).map((item: any) => (
                                    <div style={{display:"flex",backgroundColor:item.backgroundColor}}>
                                        <Typography style={{color:item.color,whiteSpace:'pre'}}>{item.value}</Typography>
                                    </div>
                            ))}
                            { (firstcompareData.entityName === "PropertyValue" && secondcompareData.entityName === "PropertyValue")  &&
                                compareValue(firstcompareData.keyName,secondcompareData.keyName,1).map((item: any) => (
                                    <div style={{display:"flex",backgroundColor:item.backgroundColor}}>
                                        <Typography style={{color:item.color,whiteSpace:'pre'}}>{item.value}</Typography>
                                    </div>
                            ))}
                            </div>
                        </div>
                        
                    </div>
                </div>
                {/* 3 line */} 
                <div style={{width:"100%"}}  className={classes.container_compare_mainInfo_element}>
                    <div className={classes.compare_content_element}>
                        <div className={classes.compare_content_label} >
                            <Typography style={labelField}>Status :</Typography>
                        </div>
                        <div className={classes.compare_content_value} style={{display:"flex"}}>
                            <Typography >{secondcompareData.status}</Typography>
                        </div>
                    </div>
                    <div className={classes.compare_content_element}>
                        
                        {secondcompareData.entityName === "PropertyKey" &&
                            <div className={classes.compare_content_element}>
                                <div className={classes.compare_content_label} >
                                    <Typography style={labelField}>Type :</Typography>
                                </div>
                                <div className={classes.compare_content_value}  style={{display:'flex',backgroundColor:compareColor(parsingContent(secondcompareData.content).typeId,parsingContent(firstcompareData.content).typeId,1) }}>
                                    <Typography >{parsingContent(secondcompareData.content).typeId === typeEnum.TECHNICAL  ? "TECHNICAL" : "FUNCTIONAL"}</Typography>
                                </div>
                            </div>
                        }
                        {secondcompareData.entityName === "PropertyKey" &&
                            <div className={classes.compare_content_element}>
                                <div className={classes.compare_content_label} >
                                    <Typography style={labelField}>Dirty :</Typography>
                                </div>
                                <div className={classes.compare_content_value} style={{display:"flex", }}>
                                    <Typography >{parsingContent(secondcompareData.content).dirty ? "TRUE" : "FALSE"}</Typography>
                                </div>
                            </div>
                        }
                        {secondcompareData.entityName === "PropertyValue" &&
                            <div className={classes.compare_content_element}>
                                <div className={classes.compare_content_label} >
                                    <Typography style={labelField}>Type :</Typography>
                                </div>
                                <div className={classes.compare_content_value}  style={{display:'flex',backgroundColor:compareColor(parsingContent(secondcompareData.content).typeId,parsingContent(firstcompareData.content).typeId,1) }}>
                                    <Typography >{parsingContent(secondcompareData.content).typeId === typeEnum.TECHNICAL  ? "TECHNICAL" : "FUNCTIONAL"}</Typography>
                                </div>
                            </div>
                        }
                        {secondcompareData.entityName === "PropertyValue" &&
                            <div className={classes.compare_content_element}>
                                <div className={classes.compare_content_label} >
                                    <Typography style={labelField}>Dirty :</Typography>
                                </div>
                                <div className={classes.compare_content_value} style={{display:"flex", }}>
                                    <Typography >{parsingContent(secondcompareData.content).dirty ? "TRUE" : "FALSE"}</Typography>
                                </div>
                            </div>
                        }
                    </div>
                </div> 
                {/* 4 line */} 
                <div   style={{width:"100%",height:heightContext}} className={classes.container_compare_mainInfo_element}>
                    {secondcompareData.entityName === "PropertyValue" && 
                        <div className={classes.compare_content_element}>
                            <div ref={contextHeight2} className={classes.AccordionDetails_mainInfo} style={{padding:"0",flexWrap:"wrap"}}>
                                {parsingPropertyValue(secondcompareData.content).map((row:any,index:any)=>(
                                    <div id={row.key+"-"+index}  className={classes.TokenValue__Scoop__context__Values} >
                                        <div className={classes.TokenValue__token_key}>
                                            <div style={{backgroundColor:'white',padding: "0px 4px"}}>
                                                {getContextName(row)}
                                            </div>
                                            </div>
                                        <div  className={classes.TokenValue__Scoop__context__values}>
                                            {getContextValue(row).map((rowContext:any,indexContext:any)=>(
                                            <div className={classes.chips} style={{fontFamily: 'Poppins,sans-serif',height:24,backgroundColor:"#E0E0E0"}}>{rowContext}</div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            
                            </div>
                            
                            
                        </div>
                    }
                </div>
                {/* 5 line */} 
                <div ref={valueHeight2} style={{width:"100%",height:heightValue}} className={classes.container_compare_mainInfo_element}>
                    {secondcompareData.entityName === "PropertyValue" &&
                        <div className={classes.compare_content_element}>
                            <div className={classes.compare_content_element}>
                                <div className={classes.compare_content_label}>
                                    <Typography style={labelField}>Value :</Typography>
                                </div>
                                <div className={classes.compare_content_value}>
                                    { (firstcompareData.entityName === "PropertyValue" && secondcompareData.entityName === "PropertyValue")  &&  compareValue(parsingContent(firstcompareData.content).value,parsingContent(secondcompareData.content).value,1).map((item: any) => (
                                        <div style={{display:"flex",backgroundColor:item.backgroundColor}}>
                                            <Typography style={{color:item.color,whiteSpace:'pre'}}>{item.value}</Typography>
                                        </div>
                                    ))}
                                    { (firstcompareData.entityName === "PropertyKey" && secondcompareData.entityName === "PropertyValue")  &&  
                                        <div style={{display:"flex",backgroundColor:"#b3e6ff"}}>
                                            <Typography>{parsingContent(secondcompareData.content).value}</Typography>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
    );
};
export default PropertyRevisonCompare;
