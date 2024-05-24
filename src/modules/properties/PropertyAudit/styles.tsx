import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    PropertyAudit_container:{
      display:"flex",
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    PropertyAudit_container_element:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-start',
      flexWrap:'wrap'
    },
    PropertyAudit_container_element_item:{
      display:'flex'
    },
    PropertyAudit_container_action:{
      display:'flex',
      width:200
    },
    PropertyAudit_content_element:{
      display:'flex',
      flexWrap:'wrap',
      width:'auto',
      padding:4
    },
    PropertyAudit_content_label:{
      display:'flex'
    },
    PropertyAudit_content_value:{
      display:'flex',
      marginLeft:8
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
    PropertyAudit_container_action_div:{
      display:"flex",
      margin:8
    }
  }
});
export default useStyles;