import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    menu_trigger:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      cursor:"pointer"
    },
    dropdown_menu_active:{
      position: "absolute",
      backgroundColor:" #fff",
      borderRadius: "4px",
      width: "200px",
      opacity: "1",
      border:'1px solid #F2F4F8',
      visibility: "visible",
      transform: "translateY(0)",
      transition: "var(--speed) ease",
      zIndex:2,
      '&:before': {
        content: '',
        position: "absolute",
        top: "-5px",
        right: "20px",
        height: "20px",
        width: "20px",
        background: "var(--secondary-bg)",
        transform: "rotate(45deg)",
      },

    },
    dropdown_menu_inactive:{
      position: "absolute",
      backgroundColor:" #fff",
      borderRadius: "4px",
      padding: "10px 20px",
      width: "200px",
      opacity: "0",
      border:'1px solid #F2F4F8',
      visibility: "hidden",
      transform: "translateY(-20px)",
      transition: "var(--speed) ease",
      '&:before': {
        content: '',
        position: "absolute",
        height: "20px",
        width: "20px",
        background: "#FFFFFF",
        transform: "rotate(45deg)",
      },
    },
    dropdownIcon:{
      display:'flex'
    },
    dropdown_container:{
      display:'flex',
      flexDirection:'column',
      padding:8
    },
    dropdown_container_mainInfo:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between'
    },
    dropdown_container_mainInfo_data:{
      display:'flex',
      width:'100%',
      justifyContent:'center'
    },
    treeView:{
      "&.MuiTreeView-root	":{
        height:'auto'
      }
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
    checkbox:{
      padding:0,
      "& .PrivateSwitchBase-root-184":{
        padding:0
      }
    },
    mainTree_div :{
      display:'flex',
      justifyContent:'space-between',
      width:'100%',
      alignItems:'center',
    },
    treeItemValue:{
      cursor:'default',
      backgroundColor:'#ffff',
      "$.MuiTreeItem-content":{
          cursor:'default',
          backgroundColor:'#ffffff',
          "&:hover":{
            cursor:'default',
            backgroundColor:'#ffffff',
          },
      },
      "$.Mui-selected":{
        cursor:'default',
        backgroundColor:'#ffffff',
        "&:hover":{
          cursor:'default',
          backgroundColor:'#ffffff',
        },
      },
      "$.Mui-focused":{
        cursor:'default',
        backgroundColor:'#ffffff',
        "&:hover":{
          cursor:'default',
          backgroundColor:'#ffffff',
        },
      },
      "&.MuiTreeItem-content.Mui-selected:hover":{
          backgroundColor:'#ffffff'
      }
    },
    FilterName:{
      padding:"0px",
      "& .MuiInputBase-input": {
          height:20,
          "&.Mui-focused ": {
             backgroundColor: "#ebebeb",
          },
       },
      "&:hover": {
          backgroundColor: "#ebebeb",
      },
      "& .MuiOutlinedInput-input": {
          padding :4,
          fontFamily:'Poppins,sans-serif',
          fontWeight:400,
          fontSize:14,
      },
      "& .MuiInputLabel-outlined":{
          transform : 'translate(14px, 5px) scale(1)'
      },
      "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
          transform : 'translate(14px, -6px) scale(0.75)'
      },
  },
  };
});
export default useStyles;
