import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    boardStylekey: {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.background.paper,
      border: "1px dashed",
      borderColor: "#4caf4f",
      textTransform: "none",
    },
    roundedXl: {
      borderRadius: 4,
      padding: "3px 4px",
    },
    actionContainer:{
      display:'flex',
      flexDirection:'row',
      justifyContent:"flex-end",
      width:'100%',
      alignItems:'center'
    },
    contextValue__btn:{  
    },
    pointer: {
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
      padding: 0,
    },
    root: {
      fontSize: 14,
      margin: 4,
      padding: "0px 8px",
      color: theme.palette.primary.contrastText,
    },
    addIcon: {
      height:"100%",
      display:'flex',justifyContent:'center',alignItems:'center',
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
    container__alert:{
      display:'flex',
      width:'100%'
    }
  };
});
export default useStyles;
