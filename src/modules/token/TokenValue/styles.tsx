import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
return {
  TokenValue:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      width:'100%',
      border:'1px solid #E0E0E0',
      boxSizing:'border-box',
      borderRadius:4,
      margin:"18px 0px 4px 0px"
  },
  TokenValue__property:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      marginTop:16,
      justifyContent:'flex-start',
      width:'100%'
  },
  TokenValue__property__Name:{
    display:'flex',
    alignItems:'center',
    marginLeft:13,

  },
  TokenValue__property__NameValue:{
    display:'flex',
    alignItems:'center',
    marginLeft:'8px'
  },
  TokenValue__property__Expiration:{
    display:'flex',
    alignItems:'center',
  },
  TokenValue__property__ExpirationValue:{
    display:'flex',
    alignItems:'center',
    marginLeft:'8px'
  },
  TokenValue__Scoop:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    flexWrap:'wrap',
    marginBottom:16,
    width:'100%',
    alignItems:"flex-start"
  },
  TokenValue__Scoop__title:{
    display:'flex',
    alignItems:'center',
  },
  TokenValue__Scoop__context:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    
  },
  TokenValue__Scoop__context__name:{
      display:'flex',

    marginLeft:'8px',
  },
  
  TokenValue__Scoop__context__values__value:{
    display:'flex',
    marginLeft:4,
    marginRight:4,
    borderRadius:'4px',
    alignItems:'center',
    padding:'1px 8px',
    Height:21
  },
  
  TokenValue__Scoop__context__Value:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    marginLeft:4,
    height:60
  },
  divider:{
    display:'flex',
    border:'0.5px solid #0000001f;',
    width: '100%'
  },
  TokenValue__footer:{
    display:'flex',
    alignContent:'center',
    justifyContent:'space-between',
    width:'100%',
    marginBottom:10,
    marginTop:10

  },
  TokenValue__footer__token:{
    display:'flex',
    paddingLeft:13,
    alignItems:"center"
  },
  TokenValue__footer__copy:{
    display:'flex'
  },
  TokenValue__btn:{
    display:'flex',
    paddingRight:13,
    padding:0,
    color:"#4e596c"
  },
  TokenValue__Scoop__container:{
    display:'flex'
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


  TokenValue__Scoop__context__Values:{
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    marginLeft:4,
    border:"1px solid #bdbdbd",
    borderRadius:4,
    marginTop:12,
    flexWrap:'wrap',
    height:"fit-content"
  },
  TokenValue__Scoop__context__values:{
    display:'flex',
    alignItems:'center',
    borderRadius:"4px",
    minWidth: "235px",
    maxWidth: "235px",
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
  TokenValue__property__Date:{
    display:"flex"
  },
  TokenValue__property__delete:{
    display:"flex"
  },
  TokenValue__property__delete__btn:{
    padding:'0px'
  },
  progress:{
    display:'flex',
      height: '26px',
      alignItems:'center',
    justifyContent:'flex-end'
  },

  contextTextField: {
    width: 200,
    marginRight:4
  },
  chipList :{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.4,
    marginTop:5,
    marginBottom:5
  },
  ExpandMoreIcon:{
    "& ..MuiIconButton-root":{
      padding:0
    }
  },
  Accordion:{
    width:'100%',
    border:'1px solid #a2b4b5;',
    borderRadius:'4px',
    margin: '4px 0px 0px 0px',
  },
  accordionSummary_content:{
    display:'flex',
    justifyItems:'flex-start',
    alignItems:'center',
    width:'100%',
    height:'auto'
  },
  accordionSummary_content_label:{
    display:'flex'
  },
  accordionSummary_content_value:{
    display:'flex',
    marginLeft:8,
    alignItems:'center'
  },
  AccordionSummary : {
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
  accordion_summary_container: {
    display:"flex",
    width:"100%",
  },
  accordionSummary_content_btns:{
    display: "flex",
    justifyContent:"flex-end",
    alignItems: "center",
  },
  accordionSummary_container:{
    display:'flex',
    width:'100%',
    height:'auto'
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
  container_tagValue:{
    display:'flex',
    flexDirection:'column',
    background: "#FFFFFF",
    borderRadius:'4',
    width:'100%',
  },


};
});
export default useStyles;
