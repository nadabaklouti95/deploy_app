import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
    return {
        viewMode:{
            paddingRight:2,
            padding:0,
            color:'#495061',
            width:20,
            height:20
        },
        container:{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            width:'100%',
            background:'white',
            border:'1px solid #0000001f;',
            borderRadius:4,
            marginTop:4,
            height:'100%'
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
            margin:0,
            backgroundColor: "#ffffff",
            
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
          divider_Vertical:{
            width:'1px',
            height:'42px',
            background:"#c9b7b7",
            marginLeft:6,
            marginRight:6,
          },

    }
});
export default useStyles;
