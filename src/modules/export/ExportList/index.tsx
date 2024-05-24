import * as React from "react";
import Task from "shared/components/Task/Task";
import { IExportList } from "types/models/interface";
import useStyles from "./styles";
import { Pagination, Skeleton } from "@material-ui/lab";



  const ExportList: React.FC<IExportList> = (props) => {
    const classes = useStyles();

    const handleChange = (event:any, value:any) => {
      props.handlePagination("page",value);
    };

    return (
      <div style={{width:'100%',height:'100%'}}>
      {props.loading &&
        <div style={{width: "100%",padding:4}}>
          <Skeleton   height={80} />
          <Skeleton  height={80} />
          <Skeleton  height={80} />
        </div>
      }
      <div className={classes.container}>
        <div className={classes.list}>
        {!props.loading && props.ExportList.taskDTOList.map((row:any,index:any)=>(
          <div key={`div_task_${index}`} style={{width:'100%',padding:4}}>
            <Task 
              progressData={{progressPercentage:row.progressPercentage ,progressInfo:row.progressInfo} } 
              TaskMainInfo = {{resultStatus:row.resultStatus, runningStatus:row.runningStatus ,startTime:row.startTime, endTime: row.endTime, userLogin: row.userLogin}}
              SecondaryInfo ={
                [
                  {
                    type:"label",
                    values:[
                      {label:"Tag :",value:props.tagName,icon:null},
                      {label:"Exported Keys :",value:row.fileExportTaskDTO.nbrExportedKeys ,icon:null},
                      {label:"Exported Values :",value:row.fileExportTaskDTO.nbrExportedValues,icon:null},
                      {label:"Type : ",value:row.fileExportTaskDTO.propertiesType,icon:null},
                    ]
                  },
                  {
                    type:'select-readOnly-one',
                    values:
                      row.context
                    
                  }
                ]
              }
              unfoldAll ={{action:props.fold.action,handleActionState:props.fold.setAction,typeAction:props.fold.typeAction,state:props.fold.unfold,callback:props.fold.setUnfold}}
              unfoldInfo={{label:"Export Empty Properties :",value:"TRUE" }} 
            />
            </div>
          ))
          }
        </div>
        
        <div className={classes.pagination} style={{padding:8}}>
          <Pagination count={props.ExportList.pagesNumber} page={props.page +1} onChange={handleChange} variant="outlined" disabled={props.ExportList.pagesNumber < 2 ? true : false} />        
        </div>
      </div>
      
    </div>








    )};
  export default ExportList;


  