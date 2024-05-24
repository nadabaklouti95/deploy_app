import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    AccordionPropDetails:{
        width:'100%',
        height:'auto',
        border:'1px solid #a2b4b5;',
        borderRadius:'4px',
        margin: '4px 0px 0px 0px'
    },
    ExpandMoreIcon:{
        "& ..MuiIconButton-root":{
          padding:0
        }
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
    column: {
        display:'flex',
        alignItems:'center',
        margin:0
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
          cursor:'pointer'
        }
      },
      propertyKey_yaml_parent_key_value_container_seperator:{
        display:'flex',
        padding: "0px 4px"
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
      ProportyDetails : {
    
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        width: '100%',
      },
      propertyKey_yaml_parent:{
        display:'flex',
        width:'100%',
        padding: "0px 8px",
        justifyContent:'space-between'
      },
      ProportyDetails__Container:{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
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
      propertiesDetails_yaml:{
        display:'flex',
        flexDirection:"column",
        borderRadius:4,
    
      },
      TabList:{
      
        "&.PrivateTabIndicator-colorSecondary-219":{
          backgroundColor:'#3498db'
        }
      },
      Tab:{
        "&.PrivateTabIndicator-colorSecondary":{
          backgroundColor:'blue'
        },
        "&.MuiTab-textColorInherit.Mui-selected":{
          borderTop: "1px solid #a2b4b5",
          borderLeft: "1px solid #a2b4b5",
          borderRight: "1px solid #a2b4b5",
          borderBottom: "none",
          borderRadius:4,
          "&.PrivateTabIndicator-colorSecondary":{
            backgroundColor:'blue'
          },
          
        },
        "&.MuiButtonBase-root.MuiTab-root": {
         
          "&:hover":{
            backgroundColor: "#f5f5f5f5"
          }
        },
        "&.PrivateTabIndicator-colorSecondary-219":{
          backgroundColor:'#3498db'
        }
  
      },
      TabPanel:{
        padding:0,
        "&.PrivateTabIndicator-colorSecondary":{
          backgroundColor:'gray'
        },
      },
      PropertyKey_form_container_mainForm_row_status:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        marginLeft:32,
      },
      icon_Status:{
        flexDirection:'row',
        alignItems:'center',
      },
      summary:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        justifyContent:'center',
        flexWrap:'wrap',
        height:'auto'
    },
    progress:{
      display:'flex',
      height: '26px',
      alignItems:'center',
      width:"100%",
      justifyContent:'flex-end'
    },
    accordionPublishDeleteBtn: {
      position:"absolute",
      top: 9,
      right: 45,
      zIndex: 1,
      display:"flex",
      alignItems:"center"
    },
    btn_Icon:{
      padding:0,
      "& .MuiButtonBase-root":{
        padding:0
      },
      "& .MuiIconButton-root":{
        padding:0
      }
    },

    }
});
export default useStyles;
