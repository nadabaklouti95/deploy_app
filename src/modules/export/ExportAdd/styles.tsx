import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";



const useStyles = makeStyles((theme: AppTheme) => {
   
    return {
        containerForm:{
            display:'flex',
            flexDirection:'column',
            justifyContent:'flex-start',
            background:'#FFFFFF',
            width:'100%',
            border: "1px solid #F2F4F8",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius:4,
            padding:8
        },
        container:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'flex-start',
            width:'100%'
        },
        container_SecondaryInformation:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            flexWrap:'wrap'
        },
        container_mainInformation:{
            display:'flex',
            flexDirection:'row',
            padding:8,
            width:'90%',
            flexWrap:'wrap'
        },
        container_mainInformation_div:{
            display:'flex',
            flexDirection:'column',
            justifyContent:'flex-start',
            width:'100%',
            flexWrap:'wrap'
        },
        container_mainInformation_token:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            [theme.breakpoints.down(950)]: {
                width:'100%',      
            },
            [theme.breakpoints.up(950)]: {
                width: 'inherit'
            }
        },
        container_mainInformation_tag:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
        },
        container_mainInformation_fileName:{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          marginRight:8,
          [theme.breakpoints.down(950)]: {
            width:'50%%',      
          },
          [theme.breakpoints.up(950)]: {
              width: '50%'
          },
          [theme.breakpoints.down(750)]: {
            width: '30%'
        }
        },
        container_mainInformation_child:{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          [theme.breakpoints.down(950)]: {
            width:'50%',      
          },
          [theme.breakpoints.up(950)]: {
              width: '50%'
          },
          [theme.breakpoints.down(750)]: {
            width: '70%'
          }

      },
        container_mainInformation_tag_label:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center'
        },
        container_mainInformation_tag_select:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center'
        },
        container_mainInformation_type:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            paddingLeft:12,
            paddingRight:16
        },
        container_mainInformation_type_label:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center'
        },
        container_mainInformation_type_check:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center'
        },
        container_mainInformation_type_value:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center'
        },
        container_SecondaryInformation_contextContainer:{
            display:'flex',
            flexDirection:'row',
            alignItems:'flex-start',
            padding:8,
            justifyContent:'space-between',
            flexWrap:'wrap'
        },
        container_SecondaryInformation_context:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            flexWrap:'wrap'
        },
        container_SecondaryInformation_action:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            width:'10%',
            justifyContent:'flex-end'
        },
       
        root: {
            fontSize: 14,
            minHeight: "36px",
            maxHeight: "36px",
        },
        rootSelect:{
      
            minHeight: 24,
            "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":{
              padding:8
            },
            "&.Mui-expanded": {
              minHeight: 24,
            },
          
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
              transform : 'translate(14px, 10px) scale(1)'
            },
            "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
              transform : 'translate(14px, -6px) scale(0.75)',
              color:"#3569a8",
              fontWeight:"bold"
            },
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
        Add__btn:{
            display:'flex',
            padding:4
        },
        publish__ations:{
            display: 'flex',
            alignItems:'center',
            justifyContent:'flex-end'
        },
        export_selectMultiple:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'flex-start',
            flexWrap:'wrap',
            padding:"4px 16px 4px 0px"
        },
        FormControl: {
            "& .css-2m9kme-MuiFormControl-root":{
                margin: 0
            }
        },
        chips: {
            display: "flex",
            justifyContent:'center',
            overflowX:'auto'
        },
        chip: {
            marginLeft: 2,
            marginRight:2
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
            overflow: "hidden",
          "& .MuiAlert-icon":{
              padding:0
            },
            "& .MuiAlert-message":{
              padding:0,
              overflow: "hidden",
            }
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
      container_mainInformation_body:{
        display:'flex',
        marginRight:16,
        alignItems:'center'
      },
      container_mainInformation_context:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap'
      }
    };
});
export default useStyles;
