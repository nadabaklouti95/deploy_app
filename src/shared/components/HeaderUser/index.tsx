import React, {useContext, useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import {useDispatch} from "react-redux";
import {onJWTAuthSignout} from "../../../redux/actions";
import {useAuthUser, useAuthUsername} from "app/utility/AppHooks";
import AppContext from "app/utility/AppContext";
import clsx from "clsx";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import Hidden from '@mui/material/Hidden';
import AppContextPropsType from "../../../types/AppContextPropsType";
import {AuthUser} from "../../../types/models/AuthUser";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import useStyles from "./styles";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


interface HeaderUserProps {
    header?: boolean;
}

const HeaderUser: React.FC<HeaderUserProps> = ({header = true}) => {
    const {themeMode} = useContext<AppContextPropsType>(AppContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const dispatch = useDispatch();
    const user: AuthUser | null = useAuthUser();
    const [username, setUsername] = useState(null);
    const getAuthUsername = useAuthUsername();
    useEffect(() => {
        const fetchData = async () => {
            const result = await getAuthUsername();
            setUsername(result);
        };
        fetchData();
    }, [getAuthUsername]);


    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const getUserAvatar = () => {
    //   if (user && user.displayName) {
    //     return user.displayName.charAt(0).toUpperCase();
    //   }
    //   if (user && user.email) {
    //     return user.email.charAt(0).toUpperCase();
    //   }
    // };
    const getUserAvatarView = () => {
        if (user && user.photoURL) {
            return (
                <Avatar className={classes.profilePic}>
                    <AccountCircleIcon className={clsx(classes.notiIcon, "notiIcon")}/>
                </Avatar>
            );
        } else {
            return (
                <Avatar className={classes.profilePic}>
                    <AccountCircleIcon className={clsx(classes.notiIcon, "notiIcon")}/>
                </Avatar>
            );
        }
    };

    const classes = useStyles({themeMode, header});

    return (
        <Box
            px={{xs: 2, xl: 6}}
            className={clsx(classes.crHeaderUser, "cr-user-info")}
        >
            <Box display="flex" alignItems="center" className={classes.notiBtn}>

                <Box className={clsx(classes.userInfo, "user-info")}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Hidden mdDown>

                            <Box onClick={handleClick} id="header-dropdown-btn"
                                     display="flex"
                                     alignItems="center"
                                     justifyContent="space-between"
                                     style={{cursor: "pointer"}}
                                >
                                    {getUserAvatarView()}
                                    <ExpandMoreIcon />
                                </Box>
                        </Hidden>


                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            className={classes.menuDropdown}
                        >
                            <MenuItem disabled className={classes.usernameItem}>
                                <AccountCircleOutlinedIcon style={{margin:"0px 16px"}}/>
                                {username}
                            </MenuItem>
                            {/*<MenuItem>My account</MenuItem>*/}
                            <MenuItem onClick={() => dispatch(onJWTAuthSignout())} id="logout-btn" className={classes.menuItemLogout}>
                                <LogoutIcon className={classes.logoutIcon}/>
                                Logout
                            </MenuItem>
                        </Menu>


                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default HeaderUser;
HeaderUser.defaultProps = {
    header: true,
};