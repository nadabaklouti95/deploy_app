import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";

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
      justifyContent:'flex-end',
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
      minWidth:20,
      margin:8,
      backgroundColor: "#ffffff",
      
    },
    breadCrumbs:{
      "& .MuiBreadcrumbs-separator":{
        marginLeft:0,
        marginRight:0
      }
    },
    divider_Vertical:{
      width:'1px',
      height:'42px',
      background:"#c9b7b7",
      marginLeft:6,
      marginRight:6,
    },
  };
});
export default useStyles;
