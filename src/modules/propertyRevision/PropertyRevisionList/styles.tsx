import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    list_cotainer:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      width:'100%',
      height:'100%',
      overflow:'hidden'
    },
    list_container:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      width:'100%',
      height:'100%',
      overflow:'hidden'
    },
    checkbox:{
      padding:0,
      "& .PrivateSwitchBase-root-184":{
        padding:0
      }
    },
    container_list:{
      display:"flex",
      flexDirection:'column',
      height:"100%"
    },
    listAudit:{
      display:"flex",
      flexDirection:'column'
    },
    pagination:{
      display:"flex",
      width:"100%",
      justifyContent:'center',
      alignItems:'flex-end',
      height:'auto',
      overflow:'hidden'
    },
    container :{
      borderRadius: "5px",
      width: "100vw",
      height: "100vh",
      background: "#FFBC97",
      position: "relative",
    },
    resizeable :{
      position: "absolute",
      border: "2px solid #533535",
      width: "100px",
      height: "100px",
      borderRadius: "3px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minWidth: "15px",
      minHeight: "15px",
    },
    resizer: {
      position: "absolute",
      background: "black"
    },
    resizerT:{
      cursor: "row-resize",
      height: "5px",
      left: 0,
      top: 0,
      width: "100%",
    },
    draghandle :{
      position: "absolute",
      bottom: "0",
      right: "0",
      transform: "translate(50%, 50%)",
    }

  };
});
export default useStyles;