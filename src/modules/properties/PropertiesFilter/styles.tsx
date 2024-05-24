import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    accordionSummary:{
      minHeight:24,
      "& .MuiAccordionSummary-content.Mui-expanded":{
        margin:"7px 0px 0px 0px",
        minHeight:24
      },
      "& .MuiAccordionSummary-root":{
        minHeight:24
      },
      "& .MuiAccordionSummary-expandIcon.Mui-expanded " :{
        padding:0,
        margin: "2px 0px 0px 0px",
        minHeight:24
      },
    },
    column: {
      flexBasis: "33.33%",
      padding:'0px 0px 0px 0px',
    },
    typographyStyle: {
      display: "flex",
      alignItems: "center",
    },
    root: {
      fontSize: 14,
      minHeight: "36px",
      maxHeight: "36px",
    },
    spreadBox: {
      display:'flex',
      alignItems: "center",
      marginLeft:4,
      height: 40,
    },
    buttonReset:{
      display:"flex",
      alignItems:"flex-end",
      width: "91px",
      color: "rgb(229, 57, 53)",
      padding: 3,
      cursor:"pointer",
      "& .MuiButton-label":{
        height:14
      },
      "& .MuiButton-startIcon":{
        display: "inherit",
        marginLeft: "-4px",
        marginRight: "2px",
        cursor:"pointer"
      },
      "&:hover":{
        display:"flex",
        alignItems:"center",
        width: "91px",
        color: "rgb(229, 57, 53)",
        padding: 3,
        
        textDecoration:"underline"
      }
    },
    buttonResetTree:{
      display:"flex",
      alignItems:"flex-end",
      width: "91px",
      color: "rgb(229, 57, 53)",
      padding: 3,
      cursor:"pointer",
      "& .MuiButton-label":{
        height:14
      },
      "& .MuiButton-startIcon":{
        display: "inherit",
        marginLeft: "-4px",
        marginRight: "2px",
        cursor:"pointer"
      },
      "&:hover":{
        display:"flex",
        alignItems:"center",
        width: "91px",
        color: "rgb(229, 57, 53)",
        padding: 3,
      }
    },
    progress:{
      display:'flex',
      marginLeft: '10px',
      height: '486x',
      alignItems:'center'
    },
    buttonFind:{
      backgroundColor: "blanchedalmond",
      width: "128px",
      height: "39px",
      borderRadius: "6px",
      border: "2px solid #d6b656" /* Green */,
      padding: 3,
      "& .MuiButton-label":{
        height:14
      }
    },
    filterContainer_action:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-end',
      alignItems:'flex-end'
    },
    filterContainer_form:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      flexWrap:'wrap'
    },
    reset:{
      display:'flex',
      alignItems:'center',
      background:'#FFFFFF',
      justifyContent:'center',
      border:'1px dashed #003af9',
      boxSizing:'border-box',
      boxShadow:'0px 6px 18px rgba(0, 0, 0, 0.06)',
      borderRadius:4,
      height:36,
      width:26,
      padding:4,
      minWidth:20,
      margin:8,
      backgroundColor: "#ffffff",
      
    },
    }
});
export default useStyles;
