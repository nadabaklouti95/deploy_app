
import * as React from "react";

import { IAccessCheckbox } from "types/models/interface";
import { useUser } from "shared/hooks/UserContext";
import { useLocation } from "react-router-dom";
import { Checkbox, Tooltip } from "@material-ui/core";

const isConfigPath = (pathName: string, accessRulesRoutes: string[]) => {
    return accessRulesRoutes.some((route) => pathName.includes(route));
}

const AccessCheckbox: React.FC<IAccessCheckbox> = ({
  actionType,
  id,
  disabled,
  checked,
  value,
  style,
  size,
  className,
  handleChange,
  inputProps,
  color,
  handleBlur,
  name
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
                <Checkbox  
                  id={id}
                  disabled={disabled}
                  checked={checked}  
                  value={value} 
                  style={style}  
                  size={size} 
                  className={className}
                  onChange={handleChange} 
                  inputProps={inputProps}
                  color={color}
                  onBlur={handleBlur}
                  name={name}
                />
              }
              {!statusPath && 
                <Tooltip title={`Access is denied for action ${actionType}`} arrow enterDelay={0} leaveDelay={100}>
                  <span>
                    <Checkbox  
                      id={id}
                      disabled={true}
                      checked={checked}  
                      value={value} 
                      style={style}  
                      size={size} 
                      className={className}
                      onChange={handleChange} 
                      inputProps={inputProps}
                      color={color}
                      onBlur={handleBlur}
                      name={name}
                    />
                  </span>
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
export default AccessCheckbox;
