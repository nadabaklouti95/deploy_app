import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
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
    


  };
});
export default useStyles;
