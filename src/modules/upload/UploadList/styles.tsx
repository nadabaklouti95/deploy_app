import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    container:{
        display:"flex",
        flexDirection:'column',
        height:"100%"
    },
    unfold:{
      display:'flex',
      background:'#FFFFFF',
      border:'1px solid #F2F4F8',
      boxSizing:'border-box',
      boxShadow:'0px 6px 18px rgba(0, 0, 0, 0.06)',
      borderRadius:4,
      width:33,
      height:36,
      padding:4,
      margin:8,
      "&:hover": {
        cursor:"pointer",
        display:'flex',
        background:'#FFFFFF',
        border:'1px solid #F2F4F8',
        boxSizing:'border-box',
        boxShadow:'0px 6px 18px rgba(0, 0, 0, 0.06)',
        borderRadius:4,
      },
    },
    publishIcon:{
      height: 12,
      width: 12,
      display: 'flex',
      alignItems: 'center',
      borderRadius:'50%',
      padding:2
  },      
  listTags:{
    display:"flex",
    flexDirection:'column'
  },      
  pagination:{
    display:"flex",
    width:"100%",
    justifyContent:'center',
    alignItems:'flex-end',
    height:'100%',
    overflow:'hidden'
  }      
        
    };
});
export default useStyles;
