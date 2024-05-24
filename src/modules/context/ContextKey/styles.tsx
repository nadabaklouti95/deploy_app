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
    value_container_action:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-end',
      width:"10%"
    },
    value_container_action_btn:{
      display:'flex'
    },
    Add__btn:{
      display:'flex',
      padding:4
    },
    value_container_form_firstElement:{
      display:'flex',
      width:'90%',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-start',
      justifyItems:'flex-start'
    },
    value_container_form_Identifier:{
      display:'flex',
      width:'30%',
    },
    value_container_form_description:{
      display:'flex',
      width:'70%',

      paddingLeft:8
    },
    value_container_form_firstElement_name:{
      display:'flex',
      justifyContent:'flex-start',
      justifyItems:'flex-start',
      padding:'0px 8px 0px 0px',
      width:'100%'
    },
    value_container_form_firstElement_store:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      width:'auto',
      padding:'4px 0px'
    },
    value_container_form_firstElement_store_typo:{
      display:'flex'
    },
    value_container_form_firstElement_store_check:{
      display:'flex',
      marginLeft:8,
      alignItems:'center'
    },
    textFiled: { 
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
    
   
    progress:{
      display:'flex',
        marginRight: '16px',
        height: '26px',
        alignItems:'center',
        marginTop: '4px',
      width:'100%',
      justifyContent:'flex-end'
    },
    PropertyKey_form_alert:{
      display:'flex',
      width:'100%',
      flexDirection:'column'
    },
    alert:{
      height:30,
      marginTop:0,
      marginLeft:8,
      marginRight:8,
      marginBottom:8,
    "& .MuiAlert-icon":{
        padding:0
      },
      "& .MuiAlert-message":{
        padding:0
      }
    },
    contextContainer:{
      paddingTop:15,
      display:'flex',
      flexDirection:'column',
      width:'100%'
    },
    deleteBtn:{
      display:'flex',
      width:'100%',
      justifyContent:"flex-end"

    },

  };
});
export default useStyles;
