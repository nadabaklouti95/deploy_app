import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
return {
  propertiesDetails_dispaly:{
    display:"flex"
  },
  propertiesDetails_create:{
    display:'flex',
    flexDirection:"column",
    border:'1px solid #E0E0E0',
    boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius:4

  },
  AccordionPropDetails:{
    width:'100%',
    border:'1px solid #a2b4b5;',
    borderRadius:'4px',
    margin: '4px 0px 0px 0px'
  },
  AccordionSummaryDetails : {
    "& .MuiAccordionSummary-content.Mui-expanded":{
      margin:"7px 0px 0px 0px"
    },
    "& .MuiAccordionSummary-root":{
      minHeight:48
    },
    "& .MuiAccordionSummary-expandIcon.Mui-expanded " :{
      padding:0,
      margin: "2px 0px 0px 0px"
    },
    
  },
  ProportyDetails : {
    
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    width: '100%',
  },
  ProportyDetails__header : {
    margin: '2px',
    marginBottom:'10px',
      display: 'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
  },
  ProportyDetails__header__form:{
  display:'flex',
    width:'100%',
    flexDirection:'column',
    textAlign:'center'
  },
  ProportyDetails__header__container:{
    display:'flex',
    alignItems:'center'
  },
  ProportyDetails__header__tags__type : {
   display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  ProportyDetails__header__status:{
    display:'flex'
  },
  
  ProportyDetails__header__status__container:{
    display:'flex',
    alignItems:'center',
    marginLeft:4
  },
  ProportyDetails__header__dirty:{
    height: 12,
    width: 12,
    display: 'flex',
    alignItems: 'center',
    borderRadius:'50%',
    padding:4,
    marginLeft:4
  },
  typographyStyle: {
    display: "flex",
    marginLeft:4
  },
  ProportyDetails__header__action : {
    display:'flex',
    justifyContent:'flex-end',
    marginRight:20
  },
  ProportyDetails__header__name : {
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    marginLeft:'10px'
  },
  ProportyDetails__header__TextFieldName : {
      display: 'flex',
      alignItems:'center',
      textAlign:'center',
      borderRadius: 4,
      maxHeight:12,
      minHeight:12,
      padding: 3,
  },
  AccordionDetails : {
    "& .MuiAccordionDetails-root": {
      padding:0
    },
  },
  ProportyDetails__values : {
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    width: '100%'
  },
  ProportyDetails__action : {
      display:'flex',
      width:'100%',
      margin:'10px'
  },
  boardStylekey: {
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    border: "1px dashed",
    borderColor: "#4caf4f",
    textTransform: "none",
  },    
  hover: {
    
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
      transform : 'translate(14px, 10px) scale(1)'
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
      transform : 'translate(14px, -6px) scale(0.75)',
      color:"#3569a8",
      fontWeight:"bold"
    },
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
  csPropertyKey__contextKeys:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
  },
  column: {
    display:'flex',
    alignItems:'center',
    margin:0
  },
  ExpandMoreIcon:{
    "& ..MuiIconButton-root":{
      padding:0
    }
  },
  progress:{
    display:'flex',
      marginRight: '16px',
      height: '48px',
      alignItems:'center'
  },
  divider:{

    border:'1px solid #b3d8f6ab',
  },
  divider_parentKey:{
    display: "flex", 
    width: "100%", 
    margin: "4px 0px" ,
    border:'0.5px solid #b3d8f6ab',
  },
  propertyKey_yaml_parent:{
    display:'flex',
    width:'100%',
    padding: "0px 8px",
    justifyContent:'space-between'
  },
  propertyKey_yaml_key:{
    display:'flex',
    width:'100%'
  },
  propertyKey_yaml_parent_key:{
    display:'flex',
    alignItems:'center'
  },
  propertyKey_yaml_parent_key_label:{
    display:'flex',
  },
  propertyKey_yaml_parent_key_value:{
    display:'flex',
    paddingLeft:4
  },
  propertyKey_yaml_parent_key_value_container:{
    display:'flex',
    
    
  },
  propertyKey_yaml_parent_key_value_container_element:{
    display:'flex',
    '&:hover, &:focus': {
      textDecoration:'underline',
      cursor:'pointer'
    }
  },
  propertyKey_yaml_parent_key_value_container_seperator:{
    display:'flex',
    padding: "0px 4px"
  },
  propertyKey_yaml_parent_type:{
    display:'flex',
    alignItems:'center'
  },
  propertyKey_yaml_parent_type_label:{
    display:'flex',
  },
  propertyKey_yaml_parent_type_value:{
    display:'flex',
    padding: "0px 8px"
  },
  propertyKey_yaml_parent_action:{
    display:'flex',
    alignItems: 'center'
  },
  propertyKey_yaml_parent_action_div:{
    display:'flex',
  },

};
});
export default useStyles;
