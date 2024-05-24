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
      alignItems:'center',
      width:'100%',
      height:'auto'
    },
    accodianSummary_container:{
      display:'flex',
      width:'100%',
      height:'auto'
    },
    accodianSummary_content_label:{
      display:'flex'
    },
    accodianSummary_content_value:{
      display:'flex',
      marginLeft:8,
      alignItems:'center'
    },
    accodianSummary_content_btns:{
      //top: "10px",
      display: "flex",
      justifyContent:"flex-end",
      //position: "relative",
      alignItems: "center",
    },
    Add__btn:{
      display:'flex',
      padding:4
    },
    progress:{
      display:'flex',
      height: '26px',
      alignItems:'center',
      marginTop: '4px',
      width:'100%',
      justifyContent:'flex-end'
    },
    ExpandMoreIcon:{
      "& ..MuiIconButton-root":{
        padding:0
      }
    },
    AccordionSummary : {
      marginTop:"5px",
      alignItems:'center',
      width:'100%',

      "& .MuiAccordionSummary-content.Mui-expanded":{
        margin:"4px 0px "
      },
      "& .MuiAccordionSummary-content": {
        margin: "0px",
        display: "flex",
        flexGrow: 1,
        transition: "margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
      },
      "& .MuiAccordionSummary-root":{
        minHeight:48
      },
      "& .MuiAccordionSummary-expandIcon.Mui-expanded " :{
        padding:12,
        marginTop:25,
      },
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
    accodianSummary_content_value_description:{
      "&.MuiTypography-body1":{
        textOverflow: "ellipsis",
        overflow: "hidden",
        width: "300px",
        whiteSpace: "nowrap",
      }
    },

    accordion_summary_container:{
      display:"flex",
      //flexDirection:"column",
      width:"100%",
    },

    accordion_summary_smallScreen:{
      marginLeft:0,
      height:"20%",
      alignItems:"flex-start",
      marginTop:10
    },

    container_storeValue:{
      display:'flex',
      flexDirection:'column',
      background: "#FFFFFF",
      borderRadius:'4',
      width:'100%',
  },
    TabList:{
      "&.PrivateTabIndicator-colorSecondary-219":{
          backgroundColor:'#3498db'
      },
      minHeight: "auto",
      height: "auto",
      width:'100%',
      borderBottom:"1px solid #a2b4b5"
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
    TabAudit:{
      minHeight: "auto",
      height: "auto",
      textTransform:'initial',
      display: 'flex'
    },
    TabPanel:{
      padding:0,
      "&.PrivateTabIndicator-colorSecondary":{
          backgroundColor:'gray'
      },
    },

  };
});
export default useStyles;
