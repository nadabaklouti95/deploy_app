import * as React from "react";
import useStyles from "./styles";
import Task from "shared/components/Task/Task";
import { typeEnum } from "shared/constants/AppEnums";
import {Pagination, Skeleton} from "@material-ui/lab";

interface IUploadList {
  fold:any;
  fileList:any;
  fileListColor:any;
  page:any;
  handlePages:any;
  stateComponent:any
} 
export const ToastProvider = React.createContext(false);


const UploadList: React.FC<IUploadList> = (props) => {
  const classes = useStyles()
 
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
      <div className={classes.listTags}>
        {!props.stateComponent && props.fileListColor.taskDTOList.map((row:any,index:any)=>(
          <div key={index} style={{width:'100%',padding:4}}>
            <Task 
              progressData={{progressPercentage:row.progressPercentage ,progressInfo:row.progressInfo} } 
              TaskMainInfo = {{resultStatus:row.resultStatus, runningStatus:row.runningStatus ,startTime:row.startTime, endTime: row.endTime, userLogin: row.userLogin}}
              SecondaryInfo ={
                [
                  {
                    type:"label",
                    values:[
                      {label:"File Name :",value:row.fileUploadTaskDTO.fileName,icon:null},
                      {label:"Tag :",value:row.tagName,icon:null},
                      {label:"Property Type :",value:row.fileUploadTaskDTO.propertiesTypeId === typeEnum.TECHNICAL ? "TECHNICAL" : "FUNCTIONAL",icon:null},
                      {label:"Strategy Type :",value:row.fileUploadTaskDTO.strategyType,icon:null},
                      {label:"Number Of Imported Keys :",value:row.fileUploadTaskDTO.nbrUploadedKeys,icon:null},
                      {label:"Number Of Imported Values :",value:row.fileUploadTaskDTO.nbrUploadedValues,icon:null}
                    ]
                  },
                  {
                    type:'select-readOnly',
                    values:[
                      row.context
                    ]
                  }
                ]
              }
              unfoldAll ={{action:props.fold.action,handleActionState:props.fold.setAction,typeAction:props.fold.typeAction,state:props.fold.unfold,callback:props.fold.setUnfold}}
              unfoldInfo={{label:"File Name :",value:row.fileUploadTaskDTO.fileName}} 
            />
          </div>
        ))}
       </div>
          <div className={classes.pagination} style={{padding:8}}>
            <Pagination id={`list_pagination`}  count={props.fileListColor.pagesNumber} page={props.page +1} onChange={handleChange} variant="outlined" disabled={props.fileListColor.pagesNumber < 2 ? true : false} />        
          </div>
        </div>
      </div>
  );
  
};
export default UploadList;
