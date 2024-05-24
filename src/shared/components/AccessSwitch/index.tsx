
import * as React from "react";

import { IAccessSwitch } from "types/models/interface";
import { useUser } from "shared/hooks/UserContext";
import { useLocation } from "react-router-dom";
import { Tooltip, withStyles } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";


const isConfigPath = (pathName: string, accessRulesRoutes: string[]) => {
    return accessRulesRoutes.some((route) => pathName.includes(route));
}

const CustomSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: 'white',
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
            opacity: 1,
            backgroundColor: '#52d869',
            borderColor: '#52d869',
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid none`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: "#e57373",
    },
    checked: {},
  }))(Switch);

const AccessSwitch: React.FC<IAccessSwitch> = ({
    id,
    checked,
    handleChange,
    name,
    value,
    handleBlur,
    actionType
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
                <CustomSwitch  
                    id={id}
                    checked={checked}  
                    value={value} 
                    onChange={handleChange} 
                    name={name}
                    onBlur={handleBlur}
                />
             }
            {!statusPath && 
                <Tooltip title={`Access is denied for action ${actionType}`} arrow enterDelay={0} leaveDelay={100}>
                    <span>
                        <CustomSwitch  
                            disabled={true}
                            id={id}
                            checked={checked}  
                            value={value} 
                            onChange={handleChange} 
                            name={name}
                            onBlur={handleBlur}
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
export default AccessSwitch;
