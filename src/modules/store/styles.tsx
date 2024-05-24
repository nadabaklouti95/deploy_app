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
      height:'100%',
      display:'flex',
      flexDirection:'column'
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
      height: "100%",
      border: "1px dashed",
      borderColor: "#4caf4f",
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
      margin: 5,
      border:'1px solid #bbbec2',
      height:'100%',
      background:'white'
    },
    content__Context: {
      width:'100%',
      height:'50vh'
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
      borderColor: "#4caf4f",
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
    addContext:{
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.background.paper,
      height: "24px",
      border: "1px dashed",
      borderColor: "#4caf4f",
      width: 45,
      textTransform: "none",
      fontSize: 14,
    },
    contextKeyContainer:{
      height:"100%"
    },
    container:{

      flexGrow: 18,
      border:'1px solid #bbbec2',
      padding: 0,
      background: 'white',
      marginTop:8
     },


    container__Context:{
      width:"100%",
      height:'100%'
      },
    FormControl: {
      "& .css-2m9kme-MuiFormControl-root":{
          margin: 0
      }
    },
    select:{
      
        minHeight: 20,
        "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":{
          padding:8
        },
        "&.Mui-expanded": {
          minHeight: 24,
        },
      
    },
      alert:{
        height:30,
        marginTop:4,
        marginLeft:13,
        marginRight:4,
        marginBottom:4,
       "& .MuiAlert-icon":{
          padding:0
        },
        "& .MuiAlert-message":{
          padding:0
        }
      },
      inputLabel:{
        "& .MuiInputLabel-marginDense":{
          transform:'translate(0, 13px) scale(1)',
          marginLeft:8
        },
        "& .MuiInputLabel-shrink":{
          transform:"translate(0, -3.5px) scale(0.75)",
          
        }
      },
      addContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        border:'1px solid #0000001f;',
        borderRadius:4,
        margin:4
    }
     
  };
});
export default useStyles;
