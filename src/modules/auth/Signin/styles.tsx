import {makeStyles} from "@material-ui/core/styles";
import {Fonts} from "../../../shared/constants/AppEnums";
import {AppTheme} from "../../../types/AppContextPropsType";

const useStyles = makeStyles((theme:AppTheme) => ({
    imgRoot: {
        cursor: "pointer",
        display: "inline-block",
        width: 320,
    },
    cardRoot: {
        display:"flex",
        maxWidth: "80rem",
        width: "100%",
        height:"53em",
        overflow: "hidden",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        position: "relative",
        [theme.breakpoints.up("xl")]: {
            paddingTop: 32,
        },
    },
    textUppercase: {
        textTransform: "uppercase",
    },
    title: {
        fontSize:"32px",
        color:"rgb(49, 53, 65)",
    },
    logoTitle:{
        height:"155px",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    },
    loginTitle:{
        marginTop:"20px",
    },
    loginImg: {
        width:"50%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },
    loginContent: {
        width:"50%",
        borderLeft:"0.5px solid rgb(49, 53, 65)",
        display:"flex",
        alignItems:"center"
    },


    formRoot: {
        textAlign: 'left',
        [theme.breakpoints.up('xl')]: {
            marginBottom: 24,
        },
    },
    myTextFieldRoot: {
        width: '100%',
    },
    checkboxRoot: {
        marginLeft: -20,
    },
    pointer: {
        cursor: 'pointer',
    },
    btnRoot: {
        borderRadius: theme.overrides.MuiCard.root.borderRadius,
        width: '100%',
        height:'3.1876em',
        fontWeight: Fonts.REGULAR,
        fontSize: 16,
        textTransform: 'capitalize',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: 'rgb(49, 53, 65)'
        }
    },
    btnRootFull: {
        width: '100%',
    },
    dividerRoot: {
        marginBottom: 16,
        marginLeft: -48,
        marginRight: -48,
        [theme.breakpoints.up('xl')]: {
            marginBottom: 32,
        },
    },
    textPrimary: {
        color: theme.palette.text.primary,
    },
    colorTextPrimary: {
        color: theme.palette.primary.main,
    },
    underlineNone: {
        textDecoration: 'none',
    },
    textGrey: {
        color: theme.palette.grey[500],
    },
}));
export default useStyles;
