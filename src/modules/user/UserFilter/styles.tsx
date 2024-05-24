import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
return {
    Filter:{
        display:'flex',
        width:"100%",
        flexDirection:'row'
     },
     nameContainer:{
         padding:0,
         paddingLeft:8
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
        width:'auto'
    },
    AutoComplete:{
        "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'] .MuiAutocomplete-input:first-child":{
          height:0,
          fontSize:16,
          fontWeight:400,
          lineHeight:"1.57",
          fontFamily:'Poppins,sans-serif',
        }
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
        margin:0,
        marginRight:8,
        backgroundColor: "#ffffff",
        
    },
};
});
export default useStyles;
