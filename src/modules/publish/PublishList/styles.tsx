import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";



const useStyles = makeStyles((theme: AppTheme) => {
   
    return {
        publishIcon:{
            height: 12,
            width: 12,
            display: 'flex',
            alignItems: 'center',
            borderRadius:'50%',
            padding:2
        },
        container:{
            display:"flex",
            flexDirection:'column',
            height:"100%"
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
