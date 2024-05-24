
import * as React from "react";

import { IAccessTextField } from "types/models/interface";
import { useUser } from "shared/hooks/UserContext";
import { useLocation } from "react-router-dom";
import { TextField, Tooltip } from "@material-ui/core";

const isConfigPath = (pathName: string, accessRulesRoutes: string[]) => {
    return accessRulesRoutes.some((route) => pathName.includes(route));
}

const AccessTextField: React.FC<IAccessTextField> = ({
    fullWidth,
    id,
    name,
    value,
    handleChange,
    size,
    label,
    variant,
    className,
    style,
    disabled,
    InputProps,
    helperText,
    InputLabelProps,
    actionType,
    key,
    multiline,
    minRows,
    maxRows,
    handleBlur,
    children,
    select,
    rows,
    placeholder,
    type
}) => {
    const userContext = useUser();
    const location = useLocation();


    if (userContext) {
        const { accessRulesRouteWrite } = userContext;
        if (accessRulesRouteWrite) {
            const statusPath = isConfigPath(location.pathname, accessRulesRouteWrite);
        return (
            <>
                {statusPath && !select &&
                    <TextField
                        fullWidth={fullWidth}
                        id={id}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        size={size}
                        label={label}
                        variant={variant}
                        className={className}
                        style={style}
                        disabled={disabled}
                        inputProps={InputProps}
                        helperText={helperText}
                        InputLabelProps={InputLabelProps}
                        key={key}
                        multiline={multiline}
                        minRows={minRows}
                        maxRows={maxRows}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        type={type}
                        
                    />
                }
                {statusPath && select &&
                    <TextField
                        fullWidth={fullWidth}
                        select={true}
                        id={id}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        size={size}
                        label={label}
                        variant={variant}
                        className={className}
                        style={style}
                        disabled={disabled}
                        inputProps={InputProps}
                        helperText={helperText}
                        InputLabelProps={InputLabelProps}
                        key={key}
                        multiline={multiline}
                        minRows={minRows}
                        maxRows={maxRows}
                        onBlur={handleBlur}
                        rows={rows}
                        placeholder={placeholder}
                        type={type}
                    >
                        {children}
                    </TextField>
                }
                {!statusPath && !select &&
                    <Tooltip title={`Access is denied for action ${actionType}`} arrow enterDelay={0} leaveDelay={100}>
                            <TextField
                                fullWidth={fullWidth}
                                id={id}
                                name={name}
                                value={value}
                                onChange={handleChange}
                                size={size}
                                label={label}
                                variant={variant}
                                className={className}
                                style={style}
                                disabled={true}
                                InputProps={InputProps}
                                helperText={helperText}
                                InputLabelProps={InputLabelProps}
                                key={key}
                                multiline={multiline}
                                minRows={minRows}
                                maxRows={maxRows}
                                onBlur={handleBlur}
                                placeholder={placeholder}
                                type={type}
                            />
                    </Tooltip>
                }
                {!statusPath && select &&
                    <Tooltip title={`Access is denied for action ${actionType}`} arrow enterDelay={0} leaveDelay={100}>
                        <TextField
                            fullWidth={fullWidth}
                            id={id}
                            name={name}
                            value={value}
                            onChange={handleChange}
                            size={size}
                            label={label}
                            variant={variant}
                            className={className}
                            style={style}
                            disabled={true}
                            InputProps={InputProps}
                            helperText={helperText}
                            InputLabelProps={InputLabelProps}
                            key={key}
                            multiline={multiline}
                            minRows={minRows}
                            maxRows={maxRows}
                            onBlur={handleBlur}
                            select={true}
                            rows={rows}
                            placeholder={placeholder}
                            type={type}
                        >
                            {children}
                        </TextField>
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
export default AccessTextField;
