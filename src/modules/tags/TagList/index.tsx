import * as React from "react";
import { ITagList } from "types/models/interface";
import TagValue from "../TagValue";
import { Pagination, Skeleton } from "@material-ui/lab";
import useStyles from "./styles";



const TagList: React.FC<ITagList> = (props) => {
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
        <div className={classes.listTags}>
          {!props.stateComponnent && props.listTag.cstagViewDTO.map((element:any,index:any)=>(
            <div key={`div_userGroupe_value_modeList${index}`} style={{width:'100%',padding:4}}>
              <TagValue key={`userGroupe_value_modeList${index}`} fold={props.fold} tag={element}
                        handleTag={props.handleTag} indexTag={index} listTags={props.listTag.cstagViewDTO}
                        mergeTags={props.mergeTags}
              />
            </div>
          ))}
        </div>
        
        <div className={classes.pagination} style={{padding:8}}>
          <Pagination id={`list_pagination`} count={props.listTag.pagesNumber} page={props.page +1} onChange={handleChange} variant="outlined" disabled={props.listTag.pagesNumber < 2 ? true : false} />        
        </div>
      </div>
      
    </div>
  );
};

export default TagList;