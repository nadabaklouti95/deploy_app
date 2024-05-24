import * as React from "react";
import { ICsTaskAdminList } from "types/models/interface";
import {Pagination, Skeleton} from "@material-ui/lab";
import CsTaskValue from "../../csTask/CsTaskValue";
import {ActionMode} from "../../../shared/constants/AppEnums";
import useStyles from "./styles";


const CsTaskAdminList: React.FC<ICsTaskAdminList> = (props) => {
  const classes = useStyles();
  const handleChange = (event:any, value:any) => {
    props.handlePages("page",value);
  };

  const handleTaskLog = (taskId:any, tagName:any,handleTaskItem:any) => {
    handleTaskItem({})
  };

  return (
    <div style={{width:'100%',height:'100%'}}>
      {props.stateComponnent &&
      <div style={{width: "100%",padding:4}}>
        <Skeleton   height={80} />
        <Skeleton  height={80} />
        <Skeleton  height={80} />
      </div>
      }
      <div className={classes.container}>
        <div className={classes.listTask}>
          {!props.stateComponnent && props.taskList.taskDTOList.map((element:any)=>(
              <div key={`div_userGroupe_value_${element.id}`} style={{width:'100%',padding:4}}>
                <CsTaskValue key={`csTask_value_${element.id}`} csTask={element} fold={props.fold} actionMode={ActionMode.DISPLAY_MODE} tagName={"Latest"} handleTaskLog={handleTaskLog}/>
              </div>
          ))}
        </div>
        {!props.stateComponnent &&
        <div className={classes.pagination} style={{padding:8}}>
          <Pagination id={`list_pagination`} count={props.taskList.pagesNumber} page={props.page +1} onChange={handleChange} variant="outlined" disabled={props.taskList.pagesNumber < 2 ? true : false} />
        </div>
        }
      </div>
    </div>
    );
};
export default CsTaskAdminList;
