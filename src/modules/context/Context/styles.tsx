import { makeStyles } from "@material-ui/core";
import { keyframes } from "@mui/material/styles";
import { AppTheme } from "types/AppContextPropsType";

const circularRotateKeyframe = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;


const useStyles = makeStyles((theme: AppTheme) => {
  return {
    container:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      width:'100%',
      height:'100%',
      background:'white',
      border:'1px solid #0000001f;',
      borderRadius:4,
      marginTop:4
    },
    header:{
      padding:8,
      display:'flex',
      justifyContent:'flex-start',
      width:"100%"
    },
    Typography:{
      fontSize:16,
      fontWeight:500,
      lineHeight:"1.57",
      fontFamily:'Poppins,sans-serif',
    },
    divider:{
      display:'flex',
      border:'0.5px solid #0000001f;',
      width: '100%'
    },
    filter:{
      width:'100%',
      padding:"0px 8px"
    },
    action:{
      width:'100%',
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      padding:0,
      boxSizing:'border-box',
      boxShadow:'rgba(0, 0, 0, 0.06) 0px 6px 18px inset',
      backgroundColor:"#f9f9f9"
    },
    boardStylekey: {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffffff",
      height: "100%",
      border: "1px dashed #61af50",
      borderColor: "#61af50",
      textTransform: "none",
    },
    unfold:{
      display:'flex',
      alignItems:'flex-start',
      background:'#FFFFFF',
      justifyContent:'center',
      border:'1px dashed #003af9',
      boxSizing:'border-box',
      boxShadow:'0px 6px 18px rgba(0, 0, 0, 0.06)',
      borderRadius:4,
      height:26,
      width:26,
      padding:4,
      minWidth:26,
      margin:8,
      backgroundColor: "#ffffff",
      
    },
    divider_Vertical:{
      width:'1px',
      height:'42px',
      background:"#c9b7b7",
      marginLeft:2,
      marginRight:2,
    },
    addContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        border:'1px solid #0000001f;',
        borderRadius:4,
        margin:8
    },
    badge:{
      "&.MuiBadge-anchorOriginTopRightRectangle":{
        top:6,
        right:6
      }
    },
    btn_updateContext:{
      display:'flex',
      alignItems:'flex-start',
      background:'#FFFFFF',
      justifyContent:'center',
      
      boxSizing:'border-box',
      boxShadow:'0px 6px 18px rgba(0, 0, 0, 0.06)',
      borderRadius:4,
      height:26,
      width:26,
      padding:4,
      minWidth:20,
      margin:8,
      backgroundColor: "#ffffff",
      border:'1px dashed #003af9',
      animation: `${circularRotateKeyframe} 1.4s linear infinite`,
      
    },
    add_key_content:{
      display:'flex',
      alignItems:'center',
      padding:8
    },
    update_context_container:{
      display:'flex',
      alignItems:'center'
    },
    update_context_content:{
      display:'flex',
      alignItems:'center',
      padding:0
    },
    btn_updateContext_content:{
      display:'flex',
      alignItems:'center',
      padding:0,
      margin:8
    },
    tooltip_content:{
      display:'flex',
      alignItems:'center',
      padding:0
    },
    typography_content:{
      display:'flex',
      alignItems:'center',
      marginRight:4,
      marginLeft:4,
      width:"auto"
    }
    
  };
});
export default useStyles;
