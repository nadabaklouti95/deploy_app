import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    FilterContainer:{
      display:'flex',
      flexDirection:'column',
      alignItems:'flex-start',
      width:"100%",
      padding:4
  },
  mainFilter:{
      display:'flex',
      flexDirection:'row',
      width:'100%',
      justifyContent:'space-between',
      flexWrap:'wrap',
      alignItems:'center'
  },
  secondaryFilter:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-start',
      width:'100%',
      alignItems:'center',
      flexWrap:'wrap',
  },
  mainFilter_filter:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-start'
  },
  action:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-end'
  },
  root: {
      fontSize: 14,
      minHeight: "36px",
      maxHeight: "36px",
    },
  textField:{
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
expand:{
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
    minHeight:20,
    minWidth:200,
    maxWidth:304,
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
    transform : 'translate(14px, 7px) scale(1)'
  },
  "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
    transform : 'translate(14px, -6px) scale(0.75)',
    color:"#3569a8",
    fontWeight:"bold"
  },
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
filterContainer:{
  display:'flex',
  alignItems:'center',
  justifyContent:'space-between',
  width:'100%',
  padding:'0px 8px 0px 8px',
  minHeight:57
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
  width:'20%'
},
filterContainer_form_element:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  flexWrap:'wrap',
  width:"80%",
  paddingTop:4,
  paddingBottom:4
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
menu_trigger:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  cursor:"pointer",
  flexGrow:1,
  flexShrink:1,
  textOverflow:'ellipsis',
  whiteSpace:'nowrap',
  overflow:'hidden',
  transition:'opacity 0.3s ease 0s',
  backgroundColor:'white',
  justifyContent:'center',
  padding:'2px 12px',
  border:'1px solid #0a8fdc47',
  borderRadius:8,
  "&:hover":{
    transitionDuration:'0s, 0.15s',
    color:'var(--ds-text,#42526E) !important',
    background:'var(--ds-background-neutral-subtle-hovered, rgba(9, 36, 66, 0.08))',
    textDecoration:'inherit',
    justifyContent:'center',
    borderRadius:8,
    padding:'2px 12px',
    border:'1px solid #0a8fdc47',
  }
},
menu_trigger_active:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  cursor:"pointer",
  flexGrow:1,
  flexShrink:1,
  textOverflow:'ellipsis',
  whiteSpace:'nowrap',
  overflow:'hidden',
  transition:'opacity 0.3s ease 0s',
  transitionDuration:'0s, 0.15s',
  color:'var(--ds-text-selected, #F4F5F7) !important',
  background:'var(--ds-background-selected, #253858)',
  textDecoration:'inherit',
  justifyContent:'center',
  borderRadius:4,
  padding:'2px 12px',
},
dropdown_menu_active:{
  position: "absolute",
  backgroundColor:" #fff",
  borderRadius: "4px",
  width: "200px",
  opacity: "1",
  border:'1px solid #F2F4F8',
  visibility: "visible",
  transform: "translateY(0)",
  transition: "var(--speed) ease",
  zIndex:2,
  '&:before': {
    content: '',
    position: "absolute",
    top: "-5px",
    right: "20px",
    height: "20px",
    width: "20px",
    background: "var(--secondary-bg)",
    transform: "rotate(45deg)",
  },

},
dropdown_menu_inactive:{
  position: "absolute",
  backgroundColor:" #fff",
  borderRadius: "4px",
  padding: "10px 20px",
  width: "200px",
  opacity: "0",
  border:'1px solid #F2F4F8',
  visibility: "hidden",
  transform: "translateY(-20px)",
  transition: "var(--speed) ease",
  '&:before': {
    content: '',
    position: "absolute",
    height: "20px",
    width: "20px",
    background: "#FFFFFF",
    transform: "rotate(45deg)",
  },
},
dropdownIcon:{
  display:'flex'
},
dropdown_container:{
  display:'flex',
  flexDirection:'column',
  padding:8,
  maxHeight:300,
  overflowY:'auto',
},
dropdown_container_mainInfo:{
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between'
},
dropdown_container_mainInfo_data:{
  display:'flex',
  width:'100%',
  justifyContent:'center'
},
treeView:{
  "&.MuiTreeView-root	":{
    height:'auto'
  }
},
btn_Icon:{
  padding:0,
  "& .MuiButtonBase-root":{
    padding:0
  },
  "& .MuiIconButton-root":{
    padding:0
  }
},
checkbox:{
  padding:0,
  "& .PrivateSwitchBase-root-184":{
    padding:0
  }
},
mainTree_div :{
  display:'flex',
  justifyContent:'space-between',
  width:'100%',
  alignItems:'center',
},
treeItemValue:{
  cursor:'default',
  backgroundColor:'#ffff',
  "$.MuiTreeItem-content":{
      cursor:'default',
      backgroundColor:'#ffffff',
      "&:hover":{
        cursor:'default',
        backgroundColor:'#ffffff',
      },
  },
  "$.Mui-selected":{
    cursor:'default',
    backgroundColor:'#ffffff',
    "&:hover":{
      cursor:'default',
      backgroundColor:'#ffffff',
    },
  },
  "$.Mui-focused":{
    cursor:'default',
    backgroundColor:'#ffffff',
    "&:hover":{
      cursor:'default',
      backgroundColor:'#ffffff',
    },
  },
  "&.MuiTreeItem-content.Mui-selected:hover":{
      backgroundColor:'#ffffff'
  }
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
      padding :4,
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
dropdown_nbr_selectedItem:{
backgroundColor:'#0052cc',
color:'#ffffff',
boxSizing:'border-box',
appearance:'none',
border:'none',
display:'inline-flex',
paddingInline:6,
borderRadius:"10px",
minWidth:20,
height:20,
lineHeight:1,
justifyContent:'center'
},
dropdownLabel:{
display:'flex',


},
dropdownLabel_value:{
display:'flex',
paddingRight:4,
alignItems:'center'
},
dropdown_container_mainInfo_date:{
display:'flex',
flexDirection:'column',
justifyContent:'space-between'
},
label_date:{
display:'flex',
width:'52px'
},
date_container:{
display:'flex',
flexDirection:'row',
alignItems:'center',
padding:4
},
input_date:{
display:'flex',
marginRight:8
},
datePicker:{

"& .react-datepicker__tab-loop":{
  border: "1px solid red",
backgroundColor: "lightgray",
  "& .react-datepicker-popper":{
    "& .react-datepicker":{
      border: "1px solid red",
      backgroundColor: "lightgray"
    }
  }
  
}

}
  };
});
export default useStyles;
