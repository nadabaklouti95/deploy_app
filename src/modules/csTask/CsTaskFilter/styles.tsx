import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    filterContainer:{
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      width:'100%',
      padding:'0px 0px 0px 0px'
    },
    filterContainer_form:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      flexWrap:'wrap'
    },
    filterContainer_action:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-end',
      alignItems:'center'
    },
    filterContainer_form_element:{
      display:'flex',
      alignItems:"center",
      padding:8
    },
    filterContainer_action_btn:{
      display:'flex'
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
    spreadBox: {
      display:'flex',
      alignItems: "center",
      width:'100%',
      height: 40,
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
      margin:8,
      backgroundColor: "#ffffff",
      
    },
    hover: {
      "& .MuiInputBase-input": {
        height:27,
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
        transform : 'translate(14px, 8px) scale(1)'
      },
      "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
        transform : 'translate(14px, -6px) scale(0.75)',
        color:"#3569a8",
        fontWeight:"bold"
      },
    },
    filterContainer_form_element_label:{
      display:'flex',
    },
    filterContainer_form_element_value:{
      display:'flex',
      marginLeft:8,
      alignItems:'center'
    },
    checkbox:{
      padding:0,
      "& .PrivateSwitchBase-root-184":{
        padding:0
      }
    },
    progress:{
      display:'flex',
      marginRight: '16px',
      alignItems:'center',
      marginTop: '4px',
      width:'100%',
      justifyContent:'flex-end',
      height:46
    },
    root: {
      fontSize: 14,
      minHeight: "36px",
      maxHeight: "36px",
    },
    typographyStyle: {
      display: "flex",
      alignItems: "center",
    },
    filterDate:{
      padding:"5px",
      width:200,
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
    }
  };
});
export default useStyles;
