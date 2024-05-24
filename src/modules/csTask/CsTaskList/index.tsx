import * as React from "react";
import { ICsTaskList } from "types/models/interface";
import { Pagination, Skeleton } from "@material-ui/lab";
import CsTaskValue from "../CsTaskValue";
import { ActionMode } from "shared/constants/AppEnums";
import useStyles from "./styles";

const CsTaskList: React.FC<ICsTaskList> = (props) => {
  const classes = useStyles();

  const handleChange = (event:any, value:any) => {
    props.handlePages("page",value);
  };

  return (
    <div style={{width:'100%',height:'100%'}}>
      {props.stateComponent &&
        <div style={{width: "100%",padding:4}}>
          <Skeleton   height={80} />
          <Skeleton  height={80} />
          <Skeleton  height={80} />
        </div>
      }
      <div className={classes.container}>
        <div className={classes.listTask}>
        {!props.stateComponent && props.taskList.taskDTOList.map((element:any)=>(
          <div key={`div_userGroupe_value_${element.id}`} style={{width:'100%',padding:4}}>
            <CsTaskValue 
              key={`csTask_value_${element.id}`} 
              csTask={element} fold={props.fold} 
              actionMode={ActionMode.DISPLAY_MODE} 
              tagName={"Latest"} 
              handleTaskLog={props.handleTaskLog}
            />
          </div>
        ))}
        </div>
        {!props.stateComponent &&
          <div className={classes.pagination} style={{padding:8}}>
              <Pagination id={`list_pagination`} count={props.taskList.pagesNumber} page={props.page +1} onChange={handleChange} variant="outlined" disabled={props.taskList.pagesNumber < 2 ? true : false} />        
          </div>
        }
      </div>
    </div>
    );
};
export default CsTaskList;
