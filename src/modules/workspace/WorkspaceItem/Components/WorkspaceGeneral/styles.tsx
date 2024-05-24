import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    value_container:{
        display:'flex',
        width:'100%',
        justifyContent:'space-between',
        padding:8,
    },
    value_container_form:{
        display:'flex',
        width:"100%",
    },
    workspaceName: {
        width:"30%",
        marginRight:"15px"
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
    workspaceDescription: {
        width:"70%",
        marginRight:"20px"
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
            padding :"7px 6px"
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
        }
    },
    value_container_action:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',

    },
    value_container_action_btn:{
        display:'flex'
    },
    Add__btn:{
        display:'flex',
        padding:4
    },
    progress:{
        display:'flex',
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


    root:{

        minHeight: 24,
        "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":{
            padding:8
        },
        "&.Mui-expanded": {
            minHeight: 24,
        },

    },
    chips: {
        display: "flex",
        justifyContent:'center',
        overflowX:'auto'
    },

    storeList:{
        borderTop:"0.5px solid #E0E0E0",
        marginTop:"10px",
        padding:"20px 0px 20px 10px"
    },

    FormControl: {

        "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
            backgroundColor: "white",
            fontWeight:"bold",
            color:"#3569a8",
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
    InputLabel:{
        backgroundColor:"white",
        marginBottom:2,
    },
    
  }
});
export default useStyles;
