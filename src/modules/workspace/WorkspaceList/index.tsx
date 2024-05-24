import * as React from "react";
import useStyles from "./styles";
import { Pagination, Skeleton } from "@material-ui/lab";
import WorkspaceItem from "../WorkspaceItem";
import {IWorkspaceList} from "../../../types/models/interface";

const WorkspaceList: React.FC<IWorkspaceList> = (props) => {
    const classes = useStyles();
    const handleChange = (event:any, value:any) => {
        props.handlePages("page",value);
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
                <div className={classes.listWorkspace}>
                    {!props.stateComponnent && props.workspaceList.workSpaceViewDTOS.map((element:any,index:any)=>(
                        <div key={`div_workspaceList${index}`} style={{width:'100%',padding:4}}>
                            <WorkspaceItem key={`workspaceList${index}`} fold={props.fold} workspace={element} handleWorkspace={props.handleWorkspace} indexWorkspace={index} />
                        </div>
                    ))}
                </div>
                <div className={classes.pagination} style={{padding: 8}}>
                    <Pagination id={`list_pagination`} count={props.workspaceList.pagesNumber} page={props.page + 1}
                                onChange={handleChange} variant="outlined"
                                disabled={props.workspaceList.pagesNumber < 2}
                    />
                </div>
            </div>
        </div>
    );
};

export default WorkspaceList;
