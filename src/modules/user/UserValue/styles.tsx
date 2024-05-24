import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from 'types/AppContextPropsType';

const useStyles = makeStyles((theme: AppTheme) => {
return {
  Accordion:{
    width:'100%',
    border:'1px solid #a2b4b5;',
    borderRadius:'4px',
},
ExpandMoreIcon:{
    "& ..MuiIconButton-root":{
      padding:0
    }
},
AccordionSummary : {
    margin:"5px 0px",
    alignItems:'center',
    "& .MuiAccordionSummary-content.Mui-expanded":{
      margin:"10px 0px "
    },
    "& .MuiAccordionSummary-content": {
        margin: "0px",
        display: "flex",
        flexGrow: 1,
        transition: "margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
    },
     "& .MuiAccordionSummary-root":{
       minHeight:48
     },
     "& .MuiAccordionSummary-expandIcon.Mui-expanded " :{
       marginTop:25,
     },
},
  container_userValue:{
        display:'flex',
        flexDirection:'column',
        background: "#FFFFFF",
        borderRadius:'4',
        width:'100%',
    },
    container_general_value:{
      display:'flex',
      flexDirection:'row',
      background: "#FFFFFF",
      borderRadius:'4',
      width:'100%',
  },
    userInfo:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        width:'90%',
        justifyContent:'flex-start',
        alignItems:'flex-start'

    },
    accordionSummary__value:{
      display:'flex',
      [theme.breakpoints.up(900)]: {
        width:'33%', 
      },
      [theme.breakpoints.down(900)]: {
        width:'50%', 
      },
      [theme.breakpoints.down(560)]: {
        width:'100%', 
      },
    },
    ation:{
        display:'flex',
        flexDirection:'row',
        width:'10%',
        alignItems:'flex-start',
        justifyContent:'flex-end',
    },
    value:{
        display:'flex',
        alignItems:'flex-start',
        width:'auto',
        padding:4,
        wordBreak:'break-all'
    },
    label:{
        display:'flex',
        alignItems:'center',
        width:'auto',
        padding:4

    },
    Value__div:{
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        [theme.breakpoints.up(1050)]: {
          width:'33%', 
        },
        [theme.breakpoints.down(1050)]: {
          width:'50%', 
        },
        [theme.breakpoints.down(760)]: {
          width:'100%', 
        },
    },
    typographyStyle: {
        display: "flex",
        alignItems: "flex-end",
        width:'auto',
        height:'100%'
    },
    GroupeContainer:{
        display:'flex',
        minHeight:40,
        [theme.breakpoints.up(1050)]: {
          width:'240px', 
          
        },
        [theme.breakpoints.down(1050)]: {
          width:'362px', 
        },
        [theme.breakpoints.down(760)]: {
          width:'100%', 
        },
        alignItems:'center',
        flexDirection:'row',
        marginLeft:4,
        border:"1px solid #bdbdbd",
        borderRadius:4,
        flexWrap:'wrap',
        height:"fit-content",
        width:'100%'
      },
      chips__Container:{
        display:'flex',
        alignItems:'center',
        borderRadius:"4px",
        padding: "0px 8px",
        margin:4,
        minHeight:24,
        flexWrap:'wrap',
        gap:"3.2px",
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
      icon:{
        display:'flex'
      },
      icon__Button:{
        "& .MuiIconButton-root":{
            padding:0
        }
      },
      svgIcon:{
        width:18,
          height:20,
        "& .MuiSvgIcon-root":{
          width:18,
          height:20
        }
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
          width:'90%', 
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
      height:'100%',
      paddingTop:8,

    },
    action:{
      display:'flex',
      flexDirection:'row',
      alignItems:'flex-start',
      justifyContent:'flex-end',
      padding:8,
      [theme.breakpoints.up(600)]: {
        width:'10%', 
      },
      [theme.breakpoints.down(600)]: {
        width:'100%', 
      },
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
      height:28,
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
    justifyContent:'flex-end',
    width:'100%'
  },
  Add__btn:{
      display:'flex',
      padding:4
  },
  progress:{
      paddingBottom:18
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
      transform:'translate(14px, -4px) scale(0.75)',
      fontWeight:500,
      color:"#3569a8",
      fontStyle:'bold'
    },
    "& .css-2m9kme-MuiFormControl-root":{
        margin: 0
    },
    '& .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':{
      padding:"12px 8px 8px 8px",
      [theme.breakpoints.down(668)]: {
        minHeight:24
        
      },
      [theme.breakpoints.up(668)]: {
        minHeight:24 
      }
      
    },
    "& .css-1pysi21-MuiFormLabel-root-MuiInputLabel-root":{
      transform: "translate(14px, 5px) scale(1)"
    },
  },
  root:{
    
      minHeight: 46,
      "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":{
        padding:8
      },
      "&.Mui-expanded": {
        minHeight: 46,
      },
    
  },
  TabList:{
      minHeight: "auto",
      height: "auto",
      width:'100%',
      borderBottom:"1px solid #a2b4b5",
    "&.PrivateTabIndicator-colorSecondary-219":{
      backgroundColor:'#3498db'
    }
  },
  Tab:{
    "&.PrivateTabIndicator-colorSecondary":{
      backgroundColor:'blue'
    },
    "&.MuiTab-textColorInherit.Mui-selected":{
      borderTop: "1px solid #a2b4b5",
      borderLeft: "1px solid #a2b4b5",
      borderRight: "1px solid #a2b4b5",
      borderBottom: "none",
      borderRadius:4,
      "&.PrivateTabIndicator-colorSecondary":{
        backgroundColor:'blue'
      },
      
    },
    "&.MuiButtonBase-root.MuiTab-root": {
     
      "&:hover":{
        backgroundColor: "#f5f5f5f5"
      }
    },
    "&.PrivateTabIndicator-colorSecondary-219":{
      backgroundColor:'#3498db'
    }
  
  },
  TabPanel:{
    padding:0,
    "&.PrivateTabIndicator-colorSecondary":{
      backgroundColor:'gray'
    },
  },

    accordion_summary_container:{
      display:"flex",
      flexDirection:"column",
      width:"100%"
    },
    accordion_summary_content: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        flexWrap:'wrap',
        justifyContent:'space-between'
    },
    accordionSummary_content_btns:{
        top: "25px",
        display: "flex",
        justifyContent:"flex-end",
        position: "relative",
        alignItems: "center",
        height:0,
    },
    accordion_details: {
        display: "flex",
        width:'100%',
        marginTop:20
    },
    general_tab:{
        minHeight: "auto",
        height: "auto",
        paddingBottom:0,
        paddingTop:0,
        textTransform:'initial'
    },
    password_tab: {
        minHeight: "auto",
        height: "auto",
        textTransform:'initial',
        display: 'flex'
    }
};
});
export default useStyles;
