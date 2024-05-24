import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
return {
    Filter:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        padding:'0px 0px 0px 0px',
        height:57
     },
     nameContainer:{
         padding:8
     },
     FilterName:{
        padding:"5px",
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
            padding :8,
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
    root: {
        fontSize: 14,
        minHeight: "36px",
        maxHeight: "36px",
        width:'100%'
    },
    progress:{
        display:'flex',
        marginLeft: '24px',
        height: '26px',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    spreadBox: {
        display:'flex',
        alignItems: "center",
        width:'100%',
        height: 40,
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
    typographyStyle: {
        display: "flex",
        alignItems: "center",
    },
    filterContainer_form:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    filterContainer_action:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        marginRight:4
    },
};
});
export default useStyles;