import * as React from "react";
import UserValue from "../UserValue";
import Skeleton from '@mui/material/Skeleton';
import {Pagination} from "@material-ui/lab";
import useStyles from "./styles";

interface IUserList {
  fold:any;
  userList:any;
  handleDelete:any;
  handleUpdate:any;
  userGroupe:any;
  stateComponnent:any;
  handlePages: any;
  page:any;
} 


const UserList: React.FC<IUserList> = (props) => {
  const [errorAdd,setErrorAdd] = React.useState<any>(null)
  const classes = useStyles();

  const handleChange = (event:any, value:any) => {
    props.handlePages("page",value);
  };

  return (
      <div style={{width: '100%', height: "100%"}}>
        {props.stateComponnent &&
            <div style={{width: "100%", padding: 4}}>
              <Skeleton height={80}/>
              <Skeleton height={80}/>
              <Skeleton height={80}/>
            </div>
        }
        <div className={classes.container}>
          {!props.stateComponnent && props.userList.csUserViewDTOList.map((element: any, index: any) => (
              <div key={`div_user_value_modeList${index}`} style={{width: '100%', padding: 4}}>
                <UserValue userIndex={index} userGroupe={props.userGroupe.csUserGroupWithAccessRuleViewDTOList}
                           user={element} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate}
                           errorAction={{value: errorAdd, action: setErrorAdd}} loading={false} unfoldAll={{
                  action: props.fold.action,
                  handleActionState: props.fold.setAction,
                  typeAction: props.fold.typeAction,
                  state: props.fold.unfold,
                  callback: props.fold.setUnfold
                }}/>
              </div>
          ))}
          <div className={classes.pagination} style={{padding: 8}}>
            <Pagination id={`list_pagination`} count={props.userList.pagesNumber} page={props.page + 1}
                        onChange={handleChange} variant="outlined"
                        disabled={props.userList.pagesNumber < 2}
            />
          </div>
        </div>
      </div>
  );
};

export default UserList;
