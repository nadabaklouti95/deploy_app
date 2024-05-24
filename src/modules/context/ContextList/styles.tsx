import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
return {
    container_list:{
        display:"flex",
        flexDirection:'column',
        width:'100%',
        height:"100%"
        
    },
    tableRow:{
        backgroundColor:'white'
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
