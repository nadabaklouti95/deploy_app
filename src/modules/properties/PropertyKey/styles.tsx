import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
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
    ProportyDetails__header__TextFieldName : {
      display: 'flex',
      alignItems:'center',
      textAlign:'center',
      borderRadius: 4,
      maxHeight:12,
      minHeight:12,
      padding: 3,
    },
    ProportyDetails__header__tags__type : {
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
    },
    typographyStyle: {
      display: "flex",
      marginLeft:5,
    },
    ProportyDetails__header__status__container:{
      display:'flex',
      alignItems:'center',
      marginLeft:4
    },
    ProportyDetails__header__status:{
      display:'flex'
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
    ProportyDetails__header__action : {
      display:'flex',
      justifyContent:'flex-end',
    },
    progress:{
      display:'flex',
      marginRight: '16px',
      height: '26px',
      alignItems:'center',
      width:'100%',
      justifyContent:'flex-end'
    },
    alert:{
      height:30,
      marginBottom:4,
    "& .MuiAlert-icon":{
        padding:0
      },
      "& .MuiAlert-message":{
        padding:0
      }
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
    btn_AddKey: {
      display:"flex",
      flexDirection:'row',
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      cursor: "pointer",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.background.paper,
      height: "100%",
      border: "1px dashed",
      borderColor: "#4caf4f",
      textTransform: "none",
      paddingTop:0,
      paddingBottom:0,
      "& .MuiButtonBase-root":{
        padding:8
      },
      "& .MuiIconButton-root":{
        padding:0
      },
    },
    PropertyKey_form:{
      display:'flex',
      flexDirection:'column',
      width:'100%',
    },
    PropertyKey_form_container:{
      display:'flex',
      width:'100%',
      flexDirection:'column' 
      
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
    PropertyKey_form_container_mainForm:{
      display:'flex',
      flexDirection:'column',
      width:'100%',
      
    },
    
    PropertyKey_form_container_mainForm_row_fullName:{
      display:'flex',
    },
    PropertyKey_form_container_mainForm_row_Status_Type:{
      display:'flex',
      alignItems:'center'
    },
    PropertyKey_form_container_mainForm_row_type:{
      display:'flex',
      //margin:"0px 32px 0px 8px",
      alignItems:'center'
    },
    PropertyKey_form_container_mainForm_row_status:{
      display:'flex',
      justifyContent:'flex-end',
      alignItems:'center',
      marginLeft:32,
    },
    PropertyKey_form_container_mainForm_row_typo:{
      display:'flex'
    },
    PropertyKey_form_container_mainForm_row_value:{
      display:'flex',
      marginLeft:2,
    },
    PropertyKey_form_fullName_typo:{
      display:'flex',
      marginLeft:8,
      '&:hover, &:focus': {
        textDecoration:'underline',
        cursor:'pointer'
      }
    },
    PropertyKey_form_fullName_typo__treeMode:{
      display:'flex',
      marginLeft:8,
      '&:hover, &:focus': {
        cursor:'default'
      }
    },
    PropertyKey_form_container_mainForm_row_complexKey:{
      display:'flex',
      margin:"0px",
      alignItems:'center'
    },
    PropertyKey_form_container_mainForm_row_list:{
      display:'flex',
      margin:"0px 32px 0px 0px",
      alignItems:'center'
    },
    PropertyKey_form_container_mainForm_row_index:{
      display:'flex',      
      margin:"0px 32px 0px 0px",

    },
    PropertyKey_form_container_mainForm_textField_complexe:{
      display:'flex',
      width:'100%',
      flexDirection:'row',
      alignItems:'center'
    },
    PropertyKey_form_container_mainForm_textField_complexe_input:{
      display:'flex',
      width:'100%',
      height:"max-content"
    },
    PropertyKey_form_container_mainForm_textField_complexe_btn:{
      dispaly:'flex'
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
        transform : 'translate(14px, 10px) scale(1)'
      },
      "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
        transform : 'translate(14px, -6px) scale(0.75)',
        color:"#3569a8",
        fontWeight:"bold"
      },
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
    PropertyKey_form_container_mainForm_textField:{
      display:'flex',
      width:'100%',
      padding:8
    },
    PropertyKey_form_container_action:{
      display:'flex',
      [theme.breakpoints.down(760)]: {
        flexDirection:'row' ,
        justifyContent:'space-between',
        width:'100%',
      },
      [theme.breakpoints.up(760)]: {
        flexDirection:'column',
        width:'20%', 
      },
    },
    PropertyKey_form_container_action_addKey:{
      display:'flex',
      justifyContent:'flex-end',
      marginRight:8,
      [theme.breakpoints.down(760)]: {
        alignItems:'flex-end'
      },
      [theme.breakpoints.up(760)]: {
        alignItems:'flex-end'
      },
    },
    
    PropertyKey_form_alert:{
      display:'flex',
      width:'100%',
      flexDirection:'column'
    },
    PropertyKey_type:{
      marginLeft:8
    },
    PropertyKey_form_container_mainForm_row:{
      display:'flex',
      width:'100%',
      justifyContent:'space-between',
      flexDirection:'row',
      flexWrap:'wrap',
      alignItems:'center',
      padding:8
    },
    PropertyKey_form_form:{
      display:'flex',

    },
    PropertyKey_form_container_action_main:{
      display:'flex',
      justifyContent:'flex-end',
      alignItems:'flex-start',
      width:'100px'
    },
    fullName__copy:{
      display:'flex',
      alignItems:'center',
      marginLeft:12
    },
    copy__btn:{
      padding:'0px 0px',
      marginRight:12
    },
    icon_Status:{
      flexDirection:'row',
      alignItems:'center'
    },
    summary:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      width:'100%',
      justifyContent:'center',
      flexWrap:'wrap',
      height:'auto'
    },
    checkbox:{
      padding:0,
      "& .PrivateSwitchBase-root-184":{
        padding:0
      }
    },
    custom_switch:{
      display: "flex",
      margin: "15px 0",
      alignItems: "center"
    },
    tag_options: {
      width:"100px",
    },
    property_key_textField: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'flex-start',
    }
  }
});
export default useStyles;
