import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    value_container:{
        display:'flex',
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:8
    },
    value_container_form:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:"90%"
    },
    value_container_form_firstElement:{
        display:'flex',
        width:'50%',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        justifyItems:'flex-start'
    },
    value_container_form_firstElement_name:{
        display:'flex',
        justifyContent:'flex-start',
        justifyItems:'flex-start',
        padding:'0px 16px 8px 0px',
        width:'100%'
    },
    value_container_form_firstElement_store:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:'4px 0px'
    },
    textFiledKeyList: {
        "& .MuiInputBase-input": {
          height:24,
          "&.Mui-focused ": {
            backgroundColor: "#ebebeb",
          },
        },
        "&:hover": {
          backgroundColor: "#ebebeb",
        },
        "& .MuiOutlinedInput-input": {
          padding :4
        },
        "& .MuiInputLabel-outlined":{
          transform : 'translate(14px, -6px) scale(0.75)',
          color:"#3569a8",
          fontWeight:"bold",
          background: "white",
          padding:"0px 6px"
        },
        "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
          transform : 'translate(14px, -6px) scale(0.75)',
          color:"#3569a8",
          fontWeight:"bold"
        },
    },
    textFiledKeyListDescription:{
    "& .MuiInputBase-input": {
        "&.Mui-focused ": {
        backgroundColor: "#ebebeb",
        },
    },
    "&:hover": {
        backgroundColor: "#ebebeb",
    },
    "& .MuiOutlinedInput-input": {
        padding :4
    },
    "& .MuiInputLabel-outlined":{
        transform : 'translate(14px, -6px) scale(0.75)',
        color:"#3569a8",
        fontWeight:"bold",
        background: "white",
        padding:"0px 6px"
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
        transform : 'translate(14px, -6px) scale(0.75)',
        color:"#3569a8",
        fontWeight:"bold"
    },
    "& .MuiOutlinedInput-multiline":{
        padding:0,
        height:96
    }
    },
    storeTypography:{
        display:'flex'
    },
    storeCheck:{
        display:'flex',
        marginLeft:8,
        alignItems:'center'
    },
    value_container_action:{
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'flex-end',
        width:"10%"
    },
    progress:{
        display:'flex',
        height: '26px',
        alignItems:'center',
        marginTop: '4px',
        width:'100%',
        justifyContent:'flex-end'
    },
    store_form_alert:{
        display:'flex',
        width:'100%',
        flexDirection:'column'
    },
    alert:{
        height:30,
        marginTop:4,
        marginLeft:4,
        marginBottom:4,
        "& .MuiAlert-icon":{
            padding:0
        },
        "& .MuiAlert-message":{
            padding:0
        }
    },

    value_container_action_btn:{
        display:'flex'
    },
    Add__btn:{
        display:'flex',
        padding:4
    },




  };
});
export default useStyles;
