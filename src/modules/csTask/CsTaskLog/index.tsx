import * as React from "react";
import { useState } from "react";
import { ICsTaskLog } from "types/models/interface";
import useStyles from "./styles";




const CsTaskLog: React.FC<ICsTaskLog> = (props) => {
  const classes = useStyles();

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={classes.taskContainer} id="taskContainer" >
      {Object.keys(props.taskLogInfo).length === 0 && 
        <div className={classes.taskContainer_element}>
          <div className={classes.taskContainer_element_logType}>{"this task doesn't have a log"}</div>
      </div>
      }
      {Object.keys(props.taskLogInfo).length !== 0 &&
          <div className={classes.taskContainer_element_label}>
          <p className={classes.containerLog}>
            <div style={{display:'flex',color: props.taskLogInfo.logType === "WARNING" ? "#FE9800" : "#FF0000" }}>{props.taskLogInfo.logType}</div>
            <div style={{marginRight:16,marginLeft:16,color:"rgb(53, 105, 168)",width: isExpanded ? '240px' : '240px'}}>{props.taskDate}</div>
              <div className={classes.item}>
                <p className='text'>
                  {!isExpanded ? props.taskLogInfo.split('\n')[0] : props.taskLogInfo.split('\n').map((line:any, index:any) => (
                    <div style={{display:"flex",flexDirection:'row'}}>
                        <div style={{display:"flex"}}>{line}</div>
                        <span onClick={toggleText} className={classes.btn_show}>
                          {(isExpanded && index === props.taskLogInfo.split('\n').length - 1) && 'Show less'}
                        </span>
                    </div>
                   ))}
                  <span onClick={toggleText} className={classes.btn_show}>
                    {!isExpanded && 'Show more'}
                  </span>
                </p>
              </div>
          </p>
          </div>
      }
    </div>
        
    );
};
export default CsTaskLog;