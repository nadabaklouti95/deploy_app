import {Pagination, Skeleton} from "@material-ui/lab";
import * as React from "react";
import Task from "shared/components/Task/Task";
import useStyles from "./styles";

interface IMergeTagList {
    fold:any;
    MergedTagList:any;
    page:any;
    handlePages:any;
    stateComponent:any;
}  



const MergeTagList: React.FC<IMergeTagList> = (props) => {
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
                    {!props.stateComponent && props.MergedTagList.taskDTOList.map((row:any,index:any)=>(
                        <div key={`div_publishElement_${index}`} style={{width:'100%',padding:4}}>
                            <Task 
                                progressData={{progressPercentage:row.progressPercentage ,progressInfo:row.progressInfo} } 
                                TaskMainInfo = {
                                    {
                                        resultStatus:row.resultStatus, 
                                        runningStatus:row.runningStatus ,
                                        startTime:row.startTime, 
                                        endTime: row.endTime, 
                                        userLogin: row.userLogin
                                    }
                                }
                                SecondaryInfo ={
                                    [
                                        {
                                            type:"label",
                                            values:[
                                                {label:"Source Tag :",value:row.sourceTagName,icon:null},
                                                {label:"Target Tag",value:row.targetTagName,icon:null},
                                                {label:"Merge Type",value:row.mergeType,icon:null},
                                                {label:"Merged Keys :",value:row.mergeTagTaskDTO.nbrMergedKeys,icon:null},
                                                {label:"Merged Values :",value:row.mergeTagTaskDTO.nbrMergedValues,icon:null},
                                                {label:"Deleted Keys :",value:row.mergeTagTaskDTO.nbrDeletedKeys,icon:null},
                                                {label:"Deleted Values :",value:row.mergeTagTaskDTO.nbrDeletedValues,icon:null},
                                            ]
                                        }
                                    ]
                                }
                                unfoldAll ={
                                    {
                                        action:props.fold.action,
                                        handleActionState:props.fold.setAction,
                                        typeAction:props.fold.typeAction,
                                        state:props.fold.unfold,
                                        callback:props.fold.setUnfold
                                    }
                                }
                                unfoldInfo={
                                    {label:"Merge Type :",value:row.mergeType}} 
                            />
                        </div>
                    ))
                    }
                </div>
            <div className={classes.pagination} style={{padding:8}}>
                <Pagination id={`list_pagination`}  count={props.MergedTagList.pagesNumber} page={props.page +1} onChange={handleChange} variant="outlined" disabled={props.MergedTagList.pagesNumber < 2 ? true : false} />        
            </div>
        </div>
    </div>
)};
export default MergeTagList;  