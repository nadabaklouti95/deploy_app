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
      cursor:'pointer',
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
      marginTop:0,
      marginLeft:8,
      marginRight:8,
      marginBottom:8,
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
    },
    listChips_container:{
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap',
      width:'90%',
    },
    chips_element:{
      display:'flex',
      marginRight:8,
    },
    container_contextValues:{
      display:"flex",
      width:"100%",
      padding:8,
      flexDirection:'row',
      minHeight:58
    },
    action:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-end',
      width:"10%"
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
    Add__btn:{
      display:'flex',
      padding:4
    },
    value_container_action_btn:{
      display:'flex'
    },
    addNew_value:{
      display:'flex',
      flexWrap:'wrap'
    },
    PropertyKey_form_alert:{
      display:'flex',
      width:'100%',
      flexDirection:'column'
    },
    
  };
});
export default useStyles;
