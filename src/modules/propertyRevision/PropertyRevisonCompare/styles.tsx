import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    Typography:{
      fontSize:16,
      fontWeight:500,
      lineHeight:"1.57",
      fontFamily:'Poppins,sans-serif',
    },
    container_compare:{
        display:'flex',
        width:'100%',
        flexDirection:'column',
        borderRadius:4,
        overflowY: "scroll",
        height:'100%'
    },
    container_compare_header:{
      display:'flex',
      width:'100%',
      justifyContent:'space-between',
      alignItems:'center',
      backgroundColor:"#f9f9f9",
      height:24
    },
    container_compare_mainInfo:{
      display:'flex',
      flexDirection:'row'
    },
    container_compare_mainInfo_element:{
      display:'flex',
      flexWrap:'wrap',
      flexDirection:'column',
      paddingLeft:8
    },
    divider:{
      border: "1px solid #E0E0E0",
      width:'100%'
    },
    divider_vertical:{
      border: "2px solid #D2CECE",
      transform: "rotate(0deg)"
    },
    compare_content_element:{
      display:'flex',
      flexWrap:'wrap',
      width:'auto',
      padding:"0px 11px 2px 0px"
    },
    compare_content_label:{
      display:'flex'
    },
    compare_content_value:{
      display:'flex',
      marginLeft:8
    },
    container_compare_Key:{
      display:'flex'
    },
    container_compare_value:{
      display:'flex'
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
    AccordionDetails_mainInfo:{
      display:'flex',
      width:'100%',
      padding:8
    },
    TokenValue__Scoop__context__Values:{
      display:'flex',
      alignItems:'center',
      flexDirection:'column',
      border:"1px solid #bdbdbd",
      borderRadius:4,
      marginRight:4,
      marginTop:12,
      flexWrap:'wrap',
      height:"fit-content"
    },
    TokenValue__Scoop__context__values:{
      display:'flex',
      alignItems:'center',
      borderRadius:"4px",
      minWidth: "200px",
      maxWidth: "200px",
      padding: "0px 8px",
      marginTop : "0px",
      marginBottom:4,
      minHeight:24,
      flexWrap:'wrap',
      gap:"3.2px",
    },
    TokenValue__token_key:{
      justifyContent:'flex-start',
      width:'100%',
      display:"flex",
      marginLeft:15,
      marginTop:-10,
      padding:'0px 4px'
      
    },
    chips: {
      display: "flex",
      justifyContent:'center',
      overflowX:'auto',
      paddingLeft:12,
      paddingRight:12,
      borderRadius:23,
      alignItems:'center'
    },
    container_compare_mainInfo_audit:{
      display:'flex',
      flexDirection:'column',
      width:"50%",
    }
  };
});
export default useStyles;