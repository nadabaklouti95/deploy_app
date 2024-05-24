import { Chip, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./styles";
import { ActionAccessMode, ActionMode } from "shared/constants/AppEnums";
import AccessTextField from "shared/components/AccessTextField";
import { useUser } from "shared/hooks/UserContext";
import { useLocation } from "react-router-dom";

interface ChipsProps {
  handleValue:any;
  item:any;
  indexElement:any;
  handleFormikValue:any;
  listValues:any;
  indexContext:any;
  color:any;
}

const isConfigPath = (pathName: string, accessRulesRoutes: string[]) => {
  return accessRulesRoutes.some((route) => pathName.includes(route));
}

const Chips: React.FC<ChipsProps> = (props) => {
  const classes = useStyles();
  const [isAddNewValue,setIsAddNewValue] = useState(false);
  const [Err,setErr] = useState("");
  const [valueContext,setValueContext] = useState<any>(props.item.value)

  const userContext = useUser();
  const location = useLocation();

  const onDeleteDelete = () => {
    props.handleValue(ActionMode.DELETE_MODE,props.item,props.indexElement,props.handleFormikValue,props.listValues);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValueContext(value)
  };

  const pushinto = (YN: string) => {
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
    props.handleValue(ActionMode.EDIT_MODE,valueContext,props.indexElement,props.handleFormikValue,props.listValues)
    setErr("");
    setValueContext(props.item.value);
    setIsAddNewValue(false);
  }
  if (userContext) {
    const { accessRulesRouteWrite } = userContext;
  //const truncateName  = (name: any) => name.length > 160 ? `${name.slice(0, 160)}...` : name;

    if (accessRulesRouteWrite) {
      const statusPath = isConfigPath(location.pathname, accessRulesRouteWrite);
      return (
        <>
          {isAddNewValue ? (
            <>
              <div style={{ width: "120px" }}>
                <AccessTextField
                  fullWidth={true}
                  size="small"
                  id={`update_value_${props.indexElement === null ?  'add' : props.indexElement }_context_${props.indexContext === null ?  'add' : props.indexContext}`}
                  value={valueContext}
                  handleChange={onInputChange}
                  style={{ fontSize: "18px" }} 
                  error={Boolean(Err)} 
                  helperText={Err} 
                  InputProps={{className: classes.valuesInput,}}
                  actionType={ActionAccessMode.WRITE_MODE}
                />
              </div>
              <div style={{ marginTop: -5, marginLeft: 4 }}>
                <div>
                  <CheckIcon id={`confirm_value_${props.indexElement === null ?  'add' : props.indexElement}_context_${props.indexContext === null ?  'add' : props.indexContext}`} className={classes.pointer} color="primary" style={{ fontSize: "18px" }}
                    onClick={handleConfirm}
                  />
                </div>
                <div>
                  <CloseIcon id={`cancel_value_${props.indexElement === null ?  'add' : props.indexElement}_context_${props.indexContext === null ?  'add' : props.indexContext}`} className={classes.pointer} color={"error"} fontSize="small" onClick={() => { pushinto("close"); }} />
                </div>
              </div>
            </>
          ) : (
            <>
              {statusPath &&
                <Chip disabled={!statusPath} style={{backgroundColor:props.color, maxWidth:"500px"}} id={`chip_value_${props.indexElement === null ?  'add' : props.indexElement}_context_${props.indexContext === null ?  'add' : props.indexContext}`} color="primary" size="small" label={props.item.value}  className={classes.root} onClick={() => { pushinto(""); }}
                  onDelete={() => {
                    onDeleteDelete();
                  }}
                />
              }
              {!statusPath && 
                <Tooltip title={`Access is denied for action ${ActionAccessMode.WRITE_MODE}`} arrow enterDelay={0} leaveDelay={100}>
                  <Chip disabled={!statusPath} style={{backgroundColor:props.color, maxWidth:"500px"}} id={`chip_value_${props.indexElement === null ?  'add' : props.indexElement}_context_${props.indexContext === null ?  'add' : props.indexContext}`} color="primary" size="small" label={props.item.value}  className={classes.root} onClick={() => { pushinto(""); }}
                    onDelete={() => {
                      onDeleteDelete();
                    }}
                  />
                </Tooltip>
              }
            </>
          )}
        </>
      );
    }else {
          return <div/>; 
        }
      }

    return null;
};

export default Chips;
