import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    Accordion:{
      width:'100%',
      border:'1px solid #a2b4b5;',
      borderRadius:'4px',
      margin: '4px 0px 0px 0px', 
    },
    accodianSummary_content:{
      display:'flex',
      justifyItems:'flex-start',
      alignItems:'center'
    },
    accodianSummary_content_label:{
      display:'flex'
    },
    accodianSummary_content_value:{
      display:'flex',
      marginLeft:8
    },
    divider:{
      display:'flex',
      border:'0.5px solid #0000001f;',
      width: '100%'
    },
    ExpandMoreIcon:{
      "& ..MuiIconButton-root":{
        padding:0
      }
    },
    AccordionSummary : {
      "& .MuiAccordionSummary-content.Mui-expanded":{
        margin:"4px 0px "
      },
    },
    container:{
      display:'flex',
      flexDirection:'column',
      width:'100%',
    },
    container_mainInfo:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      padding:8
    },
    container_action:{
      display:'flex',
    },
    container_mainInfo_data:{
      dispaly:"flex"
    },
    container_mainInfo_element:{
      display:'flex',
      margin:'0px 16px',
      alignItems:"center"
    },
    container_mainInfo_label:{
      display:'flex',
    },
    container_mainInfo_value:{
      display:'flex',
      marginLeft:4
    },
    container_context:{
      display:'flex',
      flexDirection:'column',
    },
    container_context_row:{
      display:'flex',
      flexDirection:'row',
      alignItems:'flex-start',
      padding:8
    },
    container_context_row_label:{
      dispaly:'flex'
    },
    
    container_context_action:{
      display:'flex',
      flexDirection:'row',
      marginLeft:16
    },
    container_context_action_element:{
      display:'flex',
    },
    container_context_action_check:{
      display:'flex',
      marginLeft:8
    },
    checkbox:{
      padding:0,
      "& .PrivateSwitchBase-root-184":{
        padding:0
      }
    },
    value_container_action_btn:{
      display:'flex'
    },
    Add__btn:{
      display:'flex',
      padding:0
    },
    container_contextValue:{
      display:'flex',
      alignItems:'center',
      flexWrap:'wrap',
      alignContent:'center',
      width:'100%',
    },
    container_contextValue_element:{
      display:'flex',
      flexDirection:'row',
      border: "1px solid #FFFFFF",
      boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06)",
      borderRadius: 8,
      margin:4,
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
    icon_Status:{
      flexDirection:'row',
      alignItems:'center',
      border: "1px solid #cfc7c7",
      boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "4px",
    },
    divider_context:{
      border:'0.5px solid #b3d8f6ab',
    },
  };
});
export default useStyles;
