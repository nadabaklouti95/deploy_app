import { Typography } from "@material-ui/core";
import * as React from "react";
import useStyles from "./styles";
import {labelField} from "../../../../../shared/constants/AppCssCons";


interface IWorkspaceAudit {
  workspace:any
}

const WorkspaceAudit: React.FC<IWorkspaceAudit> = (props) => {
  const classes = useStyles()


  return (
    <div className={classes.PropertyAudit_container}>
      
      <div className={classes.PropertyAudit_container_element}>
        <div className={classes.PropertyAudit_container_element_item} style={{flexWrap:'wrap'}}>
          <div className={classes.PropertyAudit_content_element} >
            <div className={classes.PropertyAudit_content_label}>
              <Typography style={labelField}>Version :</Typography>
            </div>
            <div className={classes.PropertyAudit_content_value}>
              <Typography >1</Typography>
            </div>
          </div>
          <div className={classes.PropertyAudit_content_element}>
            <div className={classes.PropertyAudit_content_label}>
              <Typography style={labelField}>Date :</Typography>
            </div>
            <div className={classes.PropertyAudit_content_value}>
              <Typography >05-06-2023 13:57:07</Typography>
            </div>
          </div>
          <div className={classes.PropertyAudit_content_element} >
            <div className={classes.PropertyAudit_content_label}>
              <Typography style={labelField}>User :</Typography>
            </div>
            <div className={classes.PropertyAudit_content_value}>
             <Typography >user</Typography>
            </div>
          </div>
          <div className={classes.PropertyAudit_content_element} >
            <div className={classes.PropertyAudit_content_label}>
              <Typography style={labelField}>Operation Type :</Typography>
            </div>
            <div className={classes.PropertyAudit_content_value}>
              <Typography >operation</Typography>
            </div>
          </div>
        </div>
      </div>

      
    </div>
        
    );
};
export default WorkspaceAudit;
