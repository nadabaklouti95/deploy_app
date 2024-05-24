import { Typography } from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";
import { IPropertyAudit } from "types/models/interface";
import useStyles from "./styles";
import {useEffect} from "react";
import {localDate} from "../../../shared/constants/LocalDate";


export const initialData = {
  csContextsDTOList: null,
  fromDate: null,
  operationTypeList: null,
  propertyKey: null, 
  statusList: null,
  storeId: null, 
  tagIdList: null,
  toDate: null,
  userLogin:null,
};


const PropertyAudit: React.FC<IPropertyAudit> = (props) => {
  const classes = useStyles()
  const [sourceId,setSourceId] = React.useState<any>('')
  const [auditDate,setAuditDate] = React.useState<any>(null)


  React.useEffect(() => {
    if(props.audit !== null && props.audit !== undefined){
      setSourceId(props.audit.sourceId)
    }
  }, [props.audit])
  

  const redirect = ()=>{
    window.localStorage.setItem('sourceId',sourceId)
  }

  useEffect(() => {
    if (props.audit) {
      setAuditDate(localDate(props.audit.dateTime))
    }
  }, [props.audit]);


  return (
    <div className={classes.PropertyAudit_container}>
      
      <div className={classes.PropertyAudit_container_element}>
        <div className={classes.PropertyAudit_container_element_item} style={{flexWrap:'wrap'}}>
          <div className={classes.PropertyAudit_content_element} >
            <div className={classes.PropertyAudit_content_label}>
              <Typography style={{fontWeight:500,color:'#4d7fb5'}}>Version :</Typography>
            </div>
            <div className={classes.PropertyAudit_content_value}>
              {props.audit !== null && <Typography >{props.audit.version}</Typography>}
            </div>
          </div>
          <div className={classes.PropertyAudit_content_element}>
            <div className={classes.PropertyAudit_content_label}>
              {props.audit !== null && <Typography style={{fontWeight:500,color:'#4d7fb5'}}>Date :</Typography>}
            </div>
            <div className={classes.PropertyAudit_content_value}>
            {auditDate !== null && <Typography >{auditDate}</Typography>}
            </div>
          </div>
          <div className={classes.PropertyAudit_content_element} >
            <div className={classes.PropertyAudit_content_label}>
              <Typography style={{fontWeight:500,color:'#4d7fb5'}}>User :</Typography>
            </div>
            <div className={classes.PropertyAudit_content_value}>
             {props.audit !== null && <Typography >{props.audit.userLogin}</Typography>}
            </div>
          </div>
          <div className={classes.PropertyAudit_content_element} >
            <div className={classes.PropertyAudit_content_label}>
              <Typography style={{fontWeight:500,color:'#4d7fb5'}}>Operation Type :</Typography>
            </div>
            <div className={classes.PropertyAudit_content_value}>
              {props.audit !== null && <Typography >{props.audit.operation}</Typography>}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.PropertyAudit_container_action}>
        <div className={classes.PropertyAudit_container_action_div}>
          
          {props.audit !== null && <Link id={`link_propertyAudit_${props.indexProperty}`} aria-disabled={props.audit !== null} to={{ pathname: `/revision/property/${sourceId}`}} onClick={redirect} className={classes.boardStylekey}  >View More Details</Link>}
        </div>
      
      </div>
      
    </div>
        
    );
};
export default PropertyAudit;
