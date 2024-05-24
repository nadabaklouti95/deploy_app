import { Checkbox } from "@material-ui/core";
import { Pagination, Skeleton } from "@material-ui/lab";
import * as React from "react";
import Audit from "shared/components/Audit";
import { IPropertyRevisionList } from "types/models/interface";
import PropertyRevisonCompare from "../PropertyRevisonCompare";
import useStyles from "./styles";
import { Resizable } from "re-resizable";
import {useEffect, useState} from "react";
const style = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  border: "1px solid #E0E0E0",
  backgroundColor: "#ffffff",
  borderTop:'4px solid #31354194'
};

/*const getHeightByPercentage = (height:any,percentage:any)=>{
  if(height !== null){
    return (percentage * (height -40 ) / 100 )
  }else{
    return 'auto'
  }
}*/

const PropertyRevisionList: React.FC<IPropertyRevisionList> = (props) => {
  const classes = useStyles()
  
  const handleChange = (event:any, value:any) => {
    props.handlePages("page",value);
  };

  

  const handleCheck = (checked:any,element:any) => {
    props.checkCompare(checked,element)
  }
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  //const [height, setHeight] = useState(null);
  const ref:any = React.useRef(null);

  /*React.useEffect(() => {
    function handleResize() {
      setHeight(ref.current.offsetHeight);
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);*/

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    return(
      <div  ref={ref} className={classes.list_cotainer}>
        {props.stateComponnent &&
          <div style={{width: "100%",padding:4}}>
            <Skeleton   height={80} />
            <Skeleton  height={80} />
            <Skeleton  height={80} />
          </div>
        }
        {!props.stateComponnent &&
        <div style={{display:'flex',flexDirection:'column',width:"100%"}}>
          
            <div className={classes.listAudit} style={{overflowX:"hidden",height:'100%',justifyContent:'space-between'}}>
              <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
              {props.listAudit.csEntityAuditViewDTOS !== undefined && props.listAudit.csEntityAuditViewDTOS.map((element:any,index:any)=>(
                <div key={index} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                  <div style={{display:'flex',alignItems:'center'}}>
                    <Checkbox 
                      disabled={element.transcate }
                      color="primary" 
                      checked={props.compareData.find((obj:any)=> obj.id === element.id) !== undefined ? true : false}  
                      value={props.compareData.find((obj:any)=> obj.id === element.id) !== undefined ? true : false} 
                       size='small' className={classes.checkbox}
                      onChange={(event: any ) => {handleCheck(event.target.checked,element)
                      }} 
                    />
                  </div>
                  <div key={`div_userGroupe_value_${element.id}`} style={{width:'100%',padding:4}}>
                    <Audit fold={props.fold} audit={element} />
                  </div>
                </div>
                
              ))}
              </div>
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <div className={classes.pagination} style={{padding:8,height:60 }}>
                  <Pagination id={`list_pagination`}  count={props.listAudit.pagesNumber} page={(props.page)+1} onChange={handleChange} variant="outlined" disabled={props.listAudit.pagesNumber < 2 ? true : false} />        
              </div>  
              </div>
           
            </div>
            
            
                      
        </div>
        }

        {(!props.stateComponnent && props.stateCompare) &&
            <div style={{position:"fixed", bottom:0,width:screenWidth>=900?screenWidth-260:screenWidth-50}}>
            <Resizable style={style} maxHeight={400}
              enable={{
                top: true,
                right: false,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false
              }}
              
            >
              <PropertyRevisonCompare compareData={props.compareElement} handleCompare={props.handleCompare}/>
            </Resizable>
            </div>
        }
        
      
    </div>
    );
};
export default PropertyRevisionList;
