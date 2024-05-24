import {Pagination, Skeleton} from "@material-ui/lab";
import * as React from "react";
import Task from "shared/components/Task/Task";
import useStyles from "./styles";

interface IPublishList {
  fold:any;
  publishedList:any;
  tagName:any;
  page:any;
  handlePages:any;
  stateComponent:any;
}  



  const PublishList: React.FC<IPublishList> = (props) => {
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
            {!props.stateComponent && props.publishedList.taskDTOList.map((row:any,index:any)=>(
              <div key={`div_publishElement_${index}`} style={{width:'100%',padding:4}}>
                <Task 
                  progressData={{progressPercentage:row.progressPercentage ,progressInfo:row.progressInfo} } 
                  TaskMainInfo = {{resultStatus:row.resultStatus, runningStatus:row.runningStatus ,startTime:row.startTime, endTime: row.endTime, userLogin: row.userLogin}}
                  SecondaryInfo ={
                    [
                      {
                        type:"label",
                        values:[
                          {label:"Tag :",value:props.tagName,icon:null},
                          {label:"Publish Empty Properties :",value:row.publishPropertyTaskDTO.publishEmptyProperties === true ? "TRUE" : "FALSE",icon:null},
                          {label:"Published Keys :",value:row.publishPropertyTaskDTO.nbrPublishedKeys,icon:null},
                          {label:"Published Values :",value:row.publishPropertyTaskDTO.nbrPublishedValues,icon:null},
                          {label:"Deleted Keys :",value:row.publishPropertyTaskDTO.nbrDeletedKeys,icon:null},
                          {label:"Deleted Values :",value:row.publishPropertyTaskDTO.nbrDeletedValues,icon:null},
                        ]
                      }
                    ]
                  }
                  unfoldAll ={{action:props.fold.action,handleActionState:props.fold.setAction,typeAction:props.fold.typeAction,state:props.fold.unfold,callback:props.fold.setUnfold}}
                  unfoldInfo={{label:"publish Empty Properties :",value:row.publishPropertyTaskDTO.publishEmptyProperties === true ? "TRUE" : "FALSE"}} 
                />
              </div>
            ))
            }
          </div>
          <div className={classes.pagination} style={{padding:8}}>
            <Pagination id={`list_pagination`}  count={props.publishedList.pagesNumber} page={props.page +1} onChange={handleChange} variant="outlined" disabled={props.publishedList.pagesNumber < 2 ? true : false} />        
          </div>
        </div>
      </div>
    )};
  export default PublishList;


  