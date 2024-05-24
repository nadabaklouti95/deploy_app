import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    taskContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
        width:'100%'
    },
    taskContainer_element:{
        display:"flex",
        alignItems:'center'
    },
    taskContainer_element_label:{
        display:'flex'
    },
    taskContainer_element_logType:{
        display:'flex',
        marginLeft:8,
        marginRight:16
    },
    taskContainer_element_logInfo:{
        display:'flex', 
        marginLeft:8,
        marginRight:16
    },
    boardStylekey: {
      borderRadius: 4,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffffff",
      height: "100%",
      border: "1px solid rgb(76, 175, 80)",
      borderColor: "#869bada6",
      borderStyle:'ridge',
      
      textTransform: "none",
      textDecorationLine:'none',
      color:"#495057",
      fontSize:16,
      padding:'0px 16px'
     
    },
    btn_show:{
      textDecoration : 'underline',
      fontSize:16,
      marginLeft:8,
      "&:hover": {
        cursor:"pointer"
      }
    },
    containerLog:{
      display:'flex',
      flexDirection:'row',
      alignItems:'flex-start',
      width:'100%'
    },
    listItems:{
      display:'flex',
      flexDirection:'column',
      alignItems:'flex-start'
    },
    item:{
      display:'flex'
    }
  }
});
export default useStyles;