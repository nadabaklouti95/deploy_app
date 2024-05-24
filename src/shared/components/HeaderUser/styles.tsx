import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";
import {Fonts, ThemeMode} from "../../constants/AppEnums";

const useStyles = makeStyles((theme: AppTheme) => {
    return {
        crHeaderUser: {
            backgroundColor: (props: { header: boolean; themeMode: ThemeMode }) =>
                props.header ? "transparent" : "rgba(0,0,0,.08)",
            paddingTop: 9,
            paddingBottom: 9,
            minHeight: 56,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            [theme.breakpoints.up("sm")]: {
                paddingTop: 0,
                paddingBottom: 0,
                minHeight: 0,
            },
        },
        profilePic: {
            fontSize: 22,
            color: theme.palette.text.secondary,
            backgroundColor: "#FFFF",
        },
        userInfo: {
            width: (props: { header: boolean; themeMode: ThemeMode }) =>
                !props.header ? "calc(100% - 75px)" : "100%",
        },
        userName: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontSize: 15,
            fontWeight: Fonts.MEDIUM,
            color: (props: { header: boolean; themeMode: ThemeMode }) =>
                props.themeMode === ThemeMode.DARK || !props.header
                    ? "white"
                    : "#313541",
        },
        pointer: {
            cursor: "pointer",
        },
        notiIcon: {
            fontSize: 22,
            color: theme.palette.text.secondary,
            [theme.breakpoints.up("xl")]: {
                fontSize: 33,
            },
        },

        notiBtn: {
            justifyContent: "flex-start",
            display: "flex",

            width: "100%",
            height: 56,
            fontSize: 16,
            borderRadius: 0,
            paddingLeft: "1rem",
            paddingRight: "1rem",
            color: theme.palette.grey[800],

            [theme.breakpoints.up("sm")]: {
                height: 10,
            },
        },
        usernameItem: {
            fontWeight: "bold",
            width:"200px",
            '&.Mui-disabled': {
                opacity: 1,
            },
            padding:"16px 0px"
        },
        menuDropdown: {
            marginTop: "30px"
        },
        menuItemLogout:{
            padding:"16px 0px"
        },
        logoutIcon:{
            color:"#74788d", 
            margin:"0px 16px"
        }
    };
});
export default useStyles;