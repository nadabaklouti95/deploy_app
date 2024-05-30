import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
    return {
        comboContainer : {
            margin:"10px 0px"
        },

        select :{
            backgroundColor: "transparent !important"
},

        formControlContainer: {
            display:"flex",
            width:"420px"
        },
        comboLabel: {
            display:"flex",
            alignItems:"center",
            marginRight:"10px",
            fontWeight:500,
            color:"#3569a8"
        },
        comboSelect: {
            height: "36px",
            width:"100%"
        },
        menuItem : {
            display:'flex',
            flexDirection:"row",
            justifyContent:'flex-start',
            overflow:'hidden'
        }
    };
});
export default useStyles;
