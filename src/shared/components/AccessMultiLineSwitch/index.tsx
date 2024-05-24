
import * as React from "react";

import { IAccessMultiLineSwitch } from "types/models/interface";
import { useUser } from "shared/hooks/UserContext";
import { useLocation } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import MultiLineSwitch from "../MultiLineSwitch";

const isConfigPath = (pathName: string, accessRulesRoutes: string[]) => {
    return accessRulesRoutes.some((route) => pathName.includes(route));
}


const AccessMultiLineSwitch: React.FC<IAccessMultiLineSwitch> = ({
    id,
    inputProps,
    handleChange,
    name,
    checked,
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
                <MultiLineSwitch
                    id={id}
                    inputProps={inputProps}
                    onChange={handleChange}
                    name={name}
                    checked={checked}
                />
             }
            {!statusPath && 
                <Tooltip title={`Access is denied for action ${actionType}`} arrow enterDelay={0} leaveDelay={100}>
                    <span>
                        <MultiLineSwitch  
                            disabled={true}
                            id={id}
                            inputProps={inputProps}
                            onChange={handleChange}
                            name={name}
                            checked={checked}
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
export default AccessMultiLineSwitch;
