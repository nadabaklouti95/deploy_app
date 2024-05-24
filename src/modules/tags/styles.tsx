import { makeStyles } from "@material-ui/core";
import { red, grey, green } from "@material-ui/core/colors";
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    scrollRoot: {
      height: 10,
    },
    hover: {
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused ": {
          backgroundColor: "#ebebeb",
        },
      },
      "&:hover": {
        backgroundColor: "#ebebeb",
      },
      cursor: "pointer",
    },

    valuesInput: {
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused ": {
          backgroundColor: "#ebebeb",
        },
      },
      "&:hover": {
        backgroundColor: "#ebebeb",
      },
      height: 30,
      marginTop: 4,
    },
    greenButtonAdd: {
      backgroundColor: "green",
      color: "white",
      fontSize: "12px",
    },

    root: {
      width: "100%",
    },

    avatarRoot: {
      backgroundColor: red[500],
      color: theme.palette.primary.contrastText,
      cursor: "pointer",
      height: 30,
      width: 30,
    },

    footer: {
      padding: theme.spacing(3, 6),
      marginTop: "auto",
      backgroundColor: theme.palette.background.paper,
    },
    buttonsss: {
      backgroundColor: "green",
      color: "white",
      fontSize: "12px",
    },
    pointer: {
      cursor: "pointer",
    },

    input: {
      height: 35,
      width: 110,
    },
    roundedXl: {
      borderRadius: 4,
    },
    boardStylekey: {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.background.paper,
      height: "auto",
      border: "1px dashed #61af50",
      borderColor: "#61af50",
      textTransform: "none",
    },

    dialogBox: {},
    boxButton: {
      height: 40,
      display: "flex",

      padding: 0,
    },
    boxtext: {
      height: 8,

      display: "flex",
      padding: 0,
    },
    topLeftBox: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },

    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 2, 2),
      display: "flex",
      flexDirection: "column",
    },

    cardGrid: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(30),
      paddingLeft: theme.spacing(),
      paddingRight: theme.spacing(0),
    },

    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    spreadBox: {
      justifyContent: "space-between",
      alignItems: "center",
    },
    box: {
      height: 60,
      display: "flex",

      padding: 14,
    },
    centerBox: {
      position: "absolute",
      left: "1%",
    },

    appBar: {
      [theme.breakpoints.up("sm")]: {},
      background: theme.palette.background.default,
      position: "sticky",

      top: "-30px",
      boxShadow: "none",
      paddingBottom: "0px",
      paddingTop: "0px",
    },
    toolbar: theme.mixins.toolbar,
    content: {
      width:'100%',
      height:'100%'
    },
    buttonsSize: {
      fontSize: "12px",
    },
    backdrop: {
      color: "#fff",
      position: "absolute",
      zIndex: theme.zIndex.drawer - 1,
      opacity: 2,
      backgroundColor: "white",
    },
    boardStyle: {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      cursor: "pointer",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      backgroundColor: theme.palette.background.paper,
      height: "24px",
      border: "1px dashed",
      borderColor: grey[600],
      textTransform: "none",
      fontSize: 14,
      margin: 4,

      width: 45,
    },

    boardStylevalue: {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      cursor: "pointer",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      backgroundColor: theme.palette.background.paper,

      border: "1px dashed",
      borderColor: grey[600],
      textTransform: "none",
      fontSize: 14,
      margin: 8,
      height: 25,
    },
    boardStyleCard: {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",

      backgroundColor: theme.palette.background.paper,
      height: "100%",
      border: "2px dashed",
      borderColor: grey[600],
      textTransform: "none",
    },

    boardTAG: {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "13%",

      backgroundColor: theme.palette.background.paper,

      border: "2px dashed",
      borderColor: "#4caf4f",
      textTransform: "none",
    },

    avatar: {
      backgroundColor: green[500],
      marginBottom: 20,
    },
    addIcon: {
      [theme.breakpoints.up("sm")]: {
        fontSize: 18,
      },
    },

    boxStyle: {
      position: "absolute",
      border: "1px #999 solid",
      borderRadius: "10px",
      textAlign: "center",
      width: "100px",
      height: "30px",
      marginTop: "300px",
    },
    lastestStyle: {
      position: "absolute",
      border: "1px #999 solid",
      borderRadius: "10px",
      textAlign: "center",
      width: "100px",
      height: "30px",
      marginTop: "300px",
      borderColor: green[500],
    },

    Canvastyle: {
      width: "100%",
      height: "80vh",
      background: "white",
      overflow: "auto",
      display: "flex",
    },
    tagsContainer:{
      padding:8,
      width:"100%",
      height:'50vh',
      overflow:"auto"
    },
    tagsBlock:{
      display:"block",
      width:'100%',
      height:"100%",
      padding:"8px 8px 8px 8px",
      overflow:'auto'
    },
    tagsCreation__container:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      width:'100%',
      border:'1px solid #0000001f;',
      borderRadius:4,
      marginTop:4,
      backgroundColor:'#ffffff'
    },
    tagCreation__textField:{
      "& .MuiInputBase-input": {
        height:24,
        "&.Mui-focused ": {
          backgroundColor: "#ebebeb",
        },
      },
      "&:hover": {
        backgroundColor: "#ebebeb",
      },
      "& .MuiOutlinedInput-input": {
        padding :4
      },
      "& .MuiInputLabel-outlined":{
        transform : 'translate(14px, -6px) scale(0.75)',
        color:"#3569a8",
        fontWeight:"bold",
        background: "white",
        padding:"0px 6px"
      },
      "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
        transform : 'translate(14px, -6px) scale(0.75)',
        color:"#3569a8",
        fontWeight:"bold"
      },
    },
    alert:{
      height:30,
      marginTop:4,
      marginLeft:4,
      marginBottom:4,
      "& .MuiAlert-icon":{
        padding:0
      },
      "& .MuiAlert-message":{
        padding:0
      }
    },
    divider:{
      display:'flex',
      border:'0.5px solid #0000001f;',
      width: '100%'
    },
    tagsAction:{
      display: 'flex',
      flexDirection:'row',
      width:'100%',
      justifyContent:'flex-end'
    },
    tag__btn:{
      display:'flex',
      padding:4
    },
    progress:{
      display:'flex',
      marginRight: '16px',
      height: '26px',
      alignItems:'center',
      marginTop: '4px',
      width:'100%',
      justifyContent:'flex-end'
    },
    wrapperCss:{
      width:'100%',
      height:'100%'
    },

    zoom:{
      paddingRight:2,
      padding:0,
      color:'#495061',
      width:20,
      height:20
    }
  };
});
export default useStyles;
