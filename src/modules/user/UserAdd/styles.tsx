import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
return {
    addContainer:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        background:'#FFFFFF',
        border:'1px solid #F2F4F8',
        boxSizing:'border-box',
        boxShadow:'0px 6px 18px rgba(0, 0, 0, 0.06)',
        borderRadius:4,
    },
    Container__div:{
      display:"flex",
      alignItems:'center',
      width:'100%',
      justifyContent:'flex-start',
      [theme.breakpoints.down(668)]: {
        flexDirection:'column' 
      },
      [theme.breakpoints.up(668)]: {
        flexDirection:'row' 
      },
    },
    userInfo__update:{
      display:'flex',
      alignContent:'flex-start',
      flexWrap:'wrap',

      flexDirection:'row',
      [theme.breakpoints.down(668)]: {
        width:'100%', 
      },
      [theme.breakpoints.up(668)]: {
        width:'100%', 
      },
  },
  userGroupes__update:{
    display:'flex',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    height:'100%',
    flexDirection:'column',
    [theme.breakpoints.down(668)]: {
      width:'100%',  

      padding:8,
      
    },
    [theme.breakpoints.up(668)]: {
      width:'33%',  
    }
},

  groupesContainer:{
    display:'flex',
    width:'100%',
  },
  actionUpdate__container:{
    display:'flex',
    alignItems:'flex-end',
    justifyContent:'flex-end',
    width:'100%',
    height:'100%'
  },


  
inputContainer:{
  display:'flex',
  flexDirection:'row',
  alignItems:'flex-start',
  justifyContent:'flex-start',
  padding:8,
  [theme.breakpoints.up(600)]: {
    width:'50%', 
  },
  [theme.breakpoints.down(600)]: {
    width:'100%', 
  },
}, 
nameTextFiled:{
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


users__ations:{
  display: 'flex',
  alignItems:'center',
  justifyContent:'flex-end'
},
Add__btn:{
    display:'flex',
    padding:4
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
alert:{
    height:30,
    marginTop:4,
    marginLeft:13,
    marginRight:4,
    marginBottom:4,
  "& .MuiAlert-icon":{
      padding:0
    },
    "& .MuiAlert-message":{
      padding:0
    }
},


FormControl: {
  "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
    backgroundColor: "white",
    transform:'translate(14px, -4px) scale(0.75)'
  },
  "& .css-2m9kme-MuiFormControl-root":{
      margin: 0
  },
  '& .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':{
    padding:"12px 8px 8px 8px",
    [theme.breakpoints.down(668)]: {
      minHeight:20
      
    },
    [theme.breakpoints.up(668)]: {
      minHeight:20 
    }
    
  },
  "& .css-1pysi21-MuiFormLabel-root-MuiInputLabel-root":{
    transform: "translate(14px, 5px) scale(1)"
  },
},
root:{
  
    minHeight: 32,
    "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":{
      padding:8
    },
    "&.Mui-expanded": {
      minHeight: 32,
    },
  
},
chips: {
  display: "flex",
  justifyContent:'center',
  overflowX:'auto',
  paddingLeft:12,
  paddingRight:12,
  borderRadius:23,
  alignItems:'center'
}, 
};
});
export default useStyles;
