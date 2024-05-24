import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    proportyValue:{
      display:'flex',
      margin:10,
      //marginRight:0
    },
    proportyValue__SelectMultiple__container: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-start',
      flexWrap:'wrap'
    },
    
    proportyValue__SelectMultiple:{
      display:'flex',
      marginLeft:4
    },
    proportyValue__values_TextField:{
      width:"90%",
      "& .MuiInputBase-input": {
        height:24,
        //borderStyle:"solid",
        borderRadius:4,
        borderWidth:'thin',
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
          fontWeight:"bold",
          padding:'0px 9px',
          width:'auto',
          backgroundColor:"white"
        },
        "& .MuiInputBase-multiline":{
          padding:0
        },
        "& .MuiOutlinedInput-multiline":{
          padding:0
        }
      
    },
    proportyValue__values_TextField__Yaml:{
      width:"90%",
      "& .MuiInputBase-input": {
        //borderStyle:"solid",
        borderRadius:4,
        borderWidth:'thin',
        "&.Mui-focused ": {
          backgroundColor: "#ebebeb",
        },
      },
      "&:hover": {
        backgroundColor: "#ebebeb",
      },
      "& .MuiOutlinedInput-multiline":{
        padding:0
      },
      "& .MuiOutlinedInput-input": {
        padding :4
      },
      "& .MuiInputLabel-outlined":{
        transform : 'translate(14px, 5px) scale(1)'
      },
      "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
        transform : 'translate(10px, -7px) scale(0.75)',
        color:"#3569a8",
        fontWeight:"bold",
        padding:'0px 9px',
        width:'auto',
        backgroundColor:"white"
      },
      
    },
    propertyValue__property__values:{
      width:'100%',
      margin:"10px 5px 10px 0px",
    },
    proportyValue__values_context : {
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap',
      alignItems: 'center',
      justifyContent: 'flex-start',
      margin:4
    },
    propertyValue__value:{
      display: 'flex',
      marginLeft:'4px',
    },
    propertyValue__actions:{
      display:'flex',
      width:'100%',
      justifyContent:'flex-end'
    },
    typographyStyle : {

      display: "flex",
      marginLeft:4
    },
    alert:{
      height:30,
      marginTop:4,
      marginBottom:4,
    "& .MuiAlert-icon":{
        padding:0
      },
      "& .MuiAlert-message":{
        padding:0
      }
    },
    FormControl: {
      width: "200px",
      minHeight:20,
      paddingLeft: "0px",
      marginTop:8,
      "& .css-2m9kme-MuiFormControl-root":{
          margin: 0
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
    InputLabel:{
      backgroundColor:"white",
      marginBottom:2,
      
    },
    chips: {
      display: "flex",
      justifyContent:'center',
      overflowX:'auto',
      fontFamily: 'Poppins,sans-serif',
      height:24,
      margin:2,
    },
    chip: {
      marginLeft: 2,
      marginRight:2
    },
    noLabel: {
      marginTop: theme.spacing(5)
    },
    progress:{
      display:'flex',
      marginRight: '16px',
      height: '48px',
      alignItems:'center'
    },
    contextElementList:{
      margin: "10px 0px",
      display: "flex",
      flexWrap:"wrap"
    },
    contextElement: {
      display: "flex",
      alignItems: "center",
      //width:"200px",
      cursor:"pointer",
      margin:"10px 5px"
    },
    contextName: {
      marginLeft: 5,
      marginRight: 5,
      whiteSpace: "nowrap",
      fontWeight:"bold"
    },
    contextContainer: {
      display:"flex",
      alignItems:"center"
    },
    contextValues: {
      display:"flex",
      flexWrap:"wrap"
    }

  }
});
export default useStyles;
