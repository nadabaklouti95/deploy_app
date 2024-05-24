
import * as React from "react";

import { IAccessButton } from "types/models/interface";
import { useUser } from "shared/hooks/UserContext";
import { useLocation } from "react-router-dom";
import { Button, ThemeProvider } from "@material-ui/core";
import { themeDisabledButton } from "shared/constants/AppConst";
import { ActionAccessMode } from "shared/constants/AppEnums";
import { IconButton, Tooltip } from "@mui/material";

const isConfigPath = (pathName: string,accessRulesRoutesWrite: string[],accessRulesRouteExecute: string[],actionType:ActionAccessMode,taskName:any ) => {
  let accessList:any = actionType === ActionAccessMode.WRITE_MODE ? accessRulesRoutesWrite : accessRulesRouteExecute
  let accessName:any = (taskName !== null && taskName !== undefined) ? taskName : pathName
  return accessList.some((route:any) => accessName.includes(route));
}



const AccessButton: React.FC<IAccessButton> = ({
  children,
  className,
  color,
  handleClick,
  id,
  style,
  ariaLabel,
  disabled,
  actionType,
  iconButton,
  tooltip,
  theme,
  type,
  startIcon,
  variant,
  taskName
}) => {
    const userContext = useUser();
    const location = useLocation();


    if (userContext) {
        const { accessRulesRouteWrite, accessRulesRouteExecute } = userContext;
    
        if (accessRulesRouteWrite) {
            const statusPath = isConfigPath(location.pathname, accessRulesRouteWrite,accessRulesRouteExecute,actionType,taskName);
    
          return (
            <>
              {statusPath && !iconButton &&
                <Button 
                  disabled={disabled} 
                  id={id} 
                  className={className} 
                  aria-label={ariaLabel}  
                  onClick={handleClick} 
                  type={type} 
                  startIcon={startIcon}
                  variant={variant}
                >
                    {children}
                </Button>
              }
              {statusPath && iconButton &&
                <ThemeProvider theme={theme}>
                  <Tooltip title={tooltip} arrow enterDelay={0} leaveDelay={100}>
                    <span style={{display:"flex"}}>
                      <IconButton 
                        disabled={disabled} 
                        id={id}
                        className={className} 
                        style={style} 
                        color={color}
                        aria-label={ariaLabel}
                        onClick={handleClick} 
                        type={type}
                      >
                          {children}
                      </IconButton>
                    </span>
                  </Tooltip>
                </ThemeProvider>
              }
              {!statusPath && !iconButton &&
                <Tooltip title={`Access is denied for action ${actionType}`} arrow enterDelay={0} leaveDelay={100}>
                  <span>
                    <Button disabled={true} id={id} className={className} aria-label={ariaLabel}  onClick={handleClick} startIcon={startIcon} variant={variant}>
                    {children} {/* Apply the icon color class */}
                    </Button>
                  </span>
                </Tooltip>
              }
              {!statusPath && iconButton &&
                <ThemeProvider theme={themeDisabledButton}>
                  <Tooltip title={`Access is denied for action ${actionType}`} arrow enterDelay={0} leaveDelay={100}>
                    <span style={{display:"flex"}}>
                      <IconButton 
                        disabled={true} 
                        id={id}
                        className={className} 
                        style={style} 
                        color={color}
                        aria-label={ariaLabel}
                        onClick={handleClick} >
                           {children} {/* Apply the icon color class */}
                      </IconButton>
                    </span>
                  </Tooltip>
                </ThemeProvider>
              }
            </>
          );
        } else {
          return <div/>; 
        }
      }

    return null;
};
export default AccessButton;
