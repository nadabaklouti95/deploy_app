import React, { useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import {Icon,IconButton, Tooltip} from "@material-ui/core";
import useStyles from "./styles";
import {green} from "@material-ui/core/colors";
import { ActionAccessMode, ActionMode } from "shared/constants/AppEnums";
import AccessTextField from "shared/components/AccessTextField";
import { useUser } from "shared/hooks/UserContext";
import { useLocation } from "react-router-dom";
import {maxLengthValue} from "../../../shared/constants/MaxLength";

interface AddNewValueProps {
  handleValue:any;
  item:any;
  indexElement:any;
  handleFormikValue:any;
  listValues:any;
  indexContext:any;
}

const isConfigPath = (pathName: string, accessRulesRoutes: string[]) => {
  return accessRulesRoutes.some((route) => pathName.includes(route));
}

const AddNewValue: React.FC<AddNewValueProps> = (props) => {
  const classes = useStyles();
  const [isAddNewValue,setIsAddNewValue] = useState(false);
  const [Err,setErr] = useState("");
  const [valueContext,setValueContext] = useState<any>("")

  const userContext = useUser();
  const location = useLocation();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValueContext(value)
  };

  const pushInto = (YN: string) => {
    if (YN === "close") {
      setErr("");
      setValueContext(props.item.value);
      setIsAddNewValue(false);
    } else {
      setIsAddNewValue(true);
      setValueContext(props.item.value);
    }
  };

  const handleConfirm = () =>{
    props.handleValue(ActionMode.CREATION_MODE,valueContext,null,props.handleFormikValue,props.listValues)
    setErr("");
    setValueContext(props.item.value);
    setIsAddNewValue(false);
  }

  if (userContext) {
    const { accessRulesRouteWrite } = userContext;

    if (accessRulesRouteWrite) {
      const statusPath = isConfigPath(location.pathname, accessRulesRouteWrite);

      return (
        <>
        {isAddNewValue ? (
          <>
            <div style={{width: "144px",}}>
              <AccessTextField
                size="small"
                id={`textfield_newValue_index_${props.indexElement === null ?  'add' : props.indexElement }_context_${props.indexContext === null ? 'add' : props.indexContext}`}
                value={valueContext}
                variant="outlined" 
                handleChange={onInputChange}
                error={Boolean(Err)} 
                helperText={Err} 
                InputProps={{className: classes.valuesInput,maxLength: maxLengthValue}}
                actionType={ActionAccessMode.WRITE_MODE}
              />
            </div>
            <div style={{ marginTop: -5, marginLeft: 4 }}>
              <div>
                <CheckIcon id={`btn_confirm_newValue_index_${props.indexElement === null ?  'add' : props.indexElement }_context_${props.indexContext === null ? 'add' : props.indexContext}`} className={classes.pointer} style={{ color:'#4caf4f',fontSize: "18px" }}
                  onClick={handleConfirm}
                />
              </div>
              <div>
                <CloseIcon  id={`btn_close_newValue_index_${props.indexElement === null ?  'add' : props.indexElement }_context_${props.indexContext === null ? 'add' : props.indexContext}`} className={classes.pointer} color={"error"} style={{ fontSize: "18px" }}
                  onClick={() => {pushInto("close");}}
                />
              </div>
            </div>
          </>
        ) :
          <div style={{margin:4}}>
            <Tooltip title={statusPath ? "Add New Context Value " : `Access is denied for action ${ActionAccessMode.WRITE_MODE}`} arrow enterDelay={0} leaveDelay={400}>
              <span>
                <IconButton disabled={!statusPath} id={`btn_add_newValue_context_${props.indexContext === null ? 'add' : props.indexContext}`} onClick={()=>{pushInto("")}} className={classes.addContext} >
              <Icon style={{ color: green[500] }} className={classes.addIcon} > add_circle </Icon>
            </IconButton>
              </span>
  
            </Tooltip>
          </div>
        }
      </>
      )
    }else {
          return <div/>; 
        }
      }

    return null;

 
};

export default AddNewValue;
