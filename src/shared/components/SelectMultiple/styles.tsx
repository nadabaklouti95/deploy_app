import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    FormControl: {
      "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
        backgroundColor: "white",
        transform:'translate(14px, -4px) scale(0.75)'
      },
      "& .css-2m9kme-MuiFormControl-root":{
        margin: 0
      },
      '& .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':{
        minHeight:20
      },
      "& .css-1pysi21-MuiFormLabel-root-MuiInputLabel-root":{
        transform: "translate(14px, 5px) scale(1)"
      },

      minHeight:20,
      maxWidth: "235px",
      paddingLeft: "0px",
      marginTop : "4px",
      backgroundColor:"white"
    },
    root:{
      width:200,
      minHeight: 24,
      "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":{
        padding:8
      },
      "&.Mui-expanded": {
        minHeight: 24,
      },

    },
    InputLabel:{


    },
    Chip:{},
    chips: {
      display: "flex",
      justifyContent:'center',
      overflowX:'auto'
    },
    chip: {
      marginLeft: 2,
      marginRight:2,
    },
    noLabel: {
      marginTop: theme.spacing(5)
    },
    chipList : {
      display: 'flex',
      flexWrap: 'wrap',

      marginTop:5,

    }

  };
});
export default useStyles;
