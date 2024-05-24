
import * as React from "react";

import { IAccessSelect } from "types/models/interface";
import { useUser } from "shared/hooks/UserContext";
import { useLocation } from "react-router-dom";
import { Select } from "@mui/material";
import { Tooltip } from "@material-ui/core";

const isConfigPath = (pathName: string, accessRulesRoutes: string[]) => {
    return accessRulesRoutes.some((route) => pathName.includes(route));
}



const AccessSelect: React.FC<IAccessSelect> = ({
    actionType,
    labelId,
    id,
    value,
    className,
    handleChange,
    variant,
    inputProps,
    children,
    multiple,
    displayEmpty,
    renderValue,
    disabled,
    MenuProps,
    input,
    style
}) => {
    const userContext = useUser();
    const location = useLocation();


    if (userContext) {
        const { accessRulesRouteWrite } = userContext;
    
        if (accessRulesRouteWrite) {
            const statusPath = isConfigPath(location.pathname, accessRulesRouteWrite);
    
          return (
            <>
              {statusPath &&
                <Select 
                  disabled={disabled}
                  labelId={labelId}
                  id={id}
                  value={value} 
                  className={className} 
                  onChange={handleChange} 
                  variant={variant}
                  inputProps={inputProps}
                  multiple={multiple}
                  displayEmpty={displayEmpty}
                  renderValue={renderValue}
                  MenuProps={MenuProps}
                  input={input}
                  style={style}
                >
                  {children}
                </Select>
              }

              {!statusPath && 
                <Tooltip title={`Access is denied for action ${actionType}`} arrow enterDelay={0} leaveDelay={100}>
                  <Select 
                    disabled={true}
                    labelId={labelId}
                    id={id}
                    value={value} 
                    className={className} 
                    onChange={handleChange} 
                    variant={variant}
                    inputProps={inputProps}
                    multiple={multiple}
                    displayEmpty={displayEmpty}
                    renderValue={renderValue}
                    input={input}
                    style={style}
                  >
                    {children}
                  </Select>
                </Tooltip>
              }
            </>
          );
        } else {
          return <div/>; 
        }
      }

    return null;
};
export default AccessSelect;
