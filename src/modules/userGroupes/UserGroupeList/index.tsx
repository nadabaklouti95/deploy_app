
import * as React from "react";
import { ActionMode } from "shared/constants/AppEnums";
import { IUserGroupeList } from "types/models/interface";
import UserGroupeValue from "../UserGroupeValue";
import Skeleton from '@mui/material/Skeleton';
import {Pagination} from "@material-ui/lab";
import useStyles from "./styles";

const UserGroupeList: React.FC<IUserGroupeList> = (props) => {
  const classes = useStyles();
  const handleChange = (event:any, value:any) => {
    props.handlePages("page",value);
  };

  return (
      <div style={{width: '100%', height:"100%"}}>
        {props.stateComponent &&
            <div style={{width: "100%", padding: 4}}>
              <Skeleton height={80}/>
              <Skeleton height={80}/>
              <Skeleton height={80}/>
            </div>
        }
        <div className={classes.container}>
        {!props.stateComponent && props.listGroupe.csUserGroupWithAccessRuleViewDTOList.map((element: any, index: any) => (
            <div key={`div_userGroupe_value_${index}`} style={{width: '100%', padding: 4}}>
              <UserGroupeValue
                  key={element.id}
                  csAccessRuleDTO={element.csAccessRuleDTO}
                  csUserGroupDTO={element.csUserGroupDTO}
                  csGeneralAccessRuleDTO={element.csGeneralAccessRuleDTO}
                  handleValue={props.handleUserGroupe}
                  fold={props.fold}
                  actionMode={ActionMode.DISPLAY_MODE}
                  handleAccessRule={props.handleAccessRule}
                  indexUserGroupeValue={index}
              />
            </div>
        ))}
        <div className={classes.pagination} style={{padding: 8}}>
          <Pagination id={`list_pagination`} count={props.listGroupe.pagesNumber} page={props.page + 1}
                      onChange={handleChange} variant="outlined"
                      disabled={props.listGroupe.pagesNumber < 2}
          />
        </div>
      </div>
      </div>
  );
};
export default UserGroupeList;
