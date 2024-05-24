import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    Accordion:{
      width:'100%',
      border:'1px solid #a2b4b5;',
      borderRadius:'4px',

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
    value_container:{
      display:'flex',
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      padding:8
    },
    value_container_form:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      width:"90%"
    },
    value_container_action:{
      display:'flex',
      flexDirection:'row',
      alignItems:'flex-start',
      justifyContent:'flex-end',
      width:"10%"
    },
    value_container_action_btn:{
      display:'flex'
    },
    Add__btn:{
      display:'flex',
      padding:4
    },
    value_container_form_firstElement:{
      display:'flex',
      width:'50%',
      flexDirection:'column',
      alignItems:'flex-start',
      justifyContent:'flex-start',
      justifyItems:'flex-start'
    },
    value_container_form_firstElement_name:{
      display:'flex',
      justifyContent:'flex-start',
      justifyItems:'flex-start',
      padding:'0px 16px 8px 0px',
      width:'100%'
    },
    value_container_form_firstElement_store:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      width:'100%'
    },
    value_container_form_firstElement_store_typo:{
      display:'flex'
    },
    value_container_form_firstElement_store_check:{
      display:'flex',
      marginLeft:8,
      alignItems:'center'
    },
    textFiledKeyList: { 
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
    textFiledKeyListDescription:{
      "& .MuiInputBase-input": {
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
      "& .MuiOutlinedInput-multiline":{
        padding:0,
        height:60
      }
    },
    checkbox:{
      padding:0,
      "& .PrivateSwitchBase-root-184":{
        padding:0
      }
    },
    ExpandMoreIcon:{
      "& ..MuiIconButton-root":{
        padding:0
      }
    },
    AccordionSummary : {
      margin:"5px 0px",
      alignItems:'center',
      "& .MuiAccordionSummary-content.Mui-expanded":{
        margin:"10px 0px "
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
        marginTop:25,
      },
    },
    progress:{
      display:'flex',
      height: '26px',
      alignItems:'center',
      marginTop: '4px',
      width:'100%',
      justifyContent:'flex-end'
    },
    PropertyKey_form_alert:{
      display:'flex',
      width:'100%',
      flexDirection:'column'
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
    Box:{},
    TabList:{
      minHeight: "auto",
      height: "auto",
      width:'100%',
      borderBottom:"1px solid #a2b4b5",
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
    accordion_summary_content:{
      width:"100%",
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center"
    },
    accordion_summary_container:{
      display:"flex",
      flexDirection:"column",
      width:"100%"
    },
    accordionSummary_content_btns: {
      top: "12px",
      display: "flex",
      justifyContent:"flex-end",
      position: "relative",
      alignItems: "center",
      height:0,
    },
    accordion_details:{
      display: "flex",
      width:'100%',
      flexDirection:'column',
      padding:0
    },
    general_tab:{
      minHeight: "auto",
      height: "auto",
      paddingBottom:0,
      paddingTop:0,
      textTransform:'initial'
    },
    access_rules_tab:{
      minHeight: "auto",
      height: "auto",
      textTransform:'initial'
    },
    context_access_tab: {
      minHeight: "auto",
      height: "auto",
      textTransform:'initial',
    },
    tab_panel_content:{
      display:'flex',
      flexDirection:'column',
      width:'100%',
      paddingTop:8
    }
  };
});
export default useStyles;
