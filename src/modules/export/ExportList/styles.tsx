import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";



const useStyles = makeStyles((theme: AppTheme) => {
   
    return {
        container:{
            display:"flex",
            flexDirection:'column',
            height:"100%"
          },
          list:{
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
