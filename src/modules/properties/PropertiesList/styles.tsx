import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    list_container:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      width:'100%',
      height:'100%',
      overflow:'hidden'
    },
    container_list:{
      display:"flex",
      flexDirection:'column',
      height:"100%"
    },
    content: {
      display:'flex',
      flexDirection:'column',
      height:"100%"
    },
    listProperties: {
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      width:'100%',
      overflow:'hidden'
    },
    ProportyDetails__Container:{
      display:'flex',
      alignItems:'center',
      flexDirection:'column',
    },
    propertyKey_yaml_parent:{
      display:'flex',
      width:'100%',
      padding: "0px 8px",
      justifyContent:'space-between'
    },
    pagination:{
      display:"flex",
      width:"100%",
      justifyContent:'center',
      alignItems:'flex-end',
      height:'auto',
      overflow:'hidden'
    },
    progress:{
      display:'flex',
      marginLeft: '10px',
      height: '486x',
      alignItems:'center'
    },
    
    propertyKey_yaml_key:{
      display:'flex',
      width:'100%'
    },
    propertyKey_yaml_parent_key:{
      display:'flex',
      alignItems:'center'
    },
    propertyKey_yaml_parent_key_label:{
      display:'flex',
    },
    propertyKey_yaml_parent_key_value:{
      display:'flex',
      paddingLeft:4
    },
    propertyKey_yaml_parent_key_value_container:{
      display:'flex',
      
      
    },
    propertyKey_yaml_parent_key_value_container_element:{
      display:'flex',
      '&:hover, &:focus': {
        textDecoration:'underline',
        cursor:'pointer'
      }
    },
    propertyKey_yaml_parent_key_value_container_seperator:{
      display:'flex',
      padding: "0px 4px"
    },
    propertyKey_yaml_parent_type:{
      display:'flex',
      alignItems:'center'
    },
    propertyKey_yaml_parent_type_label:{
      display:'flex',
    },
    propertyKey_yaml_parent_type_value:{
      display:'flex',
      padding: "0px 8px"
    },
    propertyKey_yaml_parent_action:{
      display:'flex',
      alignItems: 'center'
    },
    propertyKey_yaml_parent_action_div:{
      display:'flex',
    },
    AccordionPropDetails:{
      width:'100%',
      border:'1px solid #a2b4b5;',
      borderRadius:'4px',
      margin: '4px 0px 0px 0px'
    },
    AccordionSummaryDetails : {
      "& .MuiAccordionSummary-content.Mui-expanded":{
        margin:"7px 0px 0px 0px"
      },
      "& .MuiAccordionSummary-root":{
        minHeight:48
      },
      "& .MuiAccordionSummary-expandIcon.Mui-expanded " :{
        padding:0,
        margin: "2px 0px 0px 0px"
      },
      
    },
    ExpandMoreIcon:{
      "& ..MuiIconButton-root":{
        padding:0
      }
    },
    column: {
      display:'flex',
      alignItems:'center',
      margin:0
    },
    ProportyDetails__header__tags__type : {
      display:'flex',
       flexDirection:'row',
       alignItems:'center',
     },
     ProportyDetails__header__status__container:{
      display:'flex',
      alignItems:'center',
      marginLeft:4
    },
    ProportyDetails__header__status:{
      display:'flex'
    },
    ProportyDetails__header__dirty:{
      height: 12,
      width: 12,
      display: 'flex',
      alignItems: 'center',
      borderRadius:'50%',
      padding:4,
      marginLeft:4
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
    divider:{
      border:'0.5px solid #b3d8f6ab',
    },
    propertiesDetails_child:{
      display:'flex',
      border:'1px solid #a2b4b5',
      boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)',
      borderRadius:4,
      margin:8
    }
  };
});
export default useStyles;
