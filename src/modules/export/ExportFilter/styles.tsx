import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";



const useStyles = makeStyles((theme: AppTheme) => {
   
    return {
        FilterContainer:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            width:"100%",
            padding:4,
            height:57
        },
        mainFilter:{
            display:'flex',
            flexDirection:'row',
            width:'100%',
            justifyContent:'space-between',
            flexWrap:'wrap',
            alignItems:'center'
        },
        mainFilter_filter:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-start'
        },
        mainFilter_filter_element:{
            display:'flex',
            marginRight:8
        },
        action:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-end'
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
        typographyStyle: {
            display: "flex",
            alignItems: "center",
        },
        root: {
            fontSize: 14,
            minHeight: "36px",
            maxHeight: "36px",
            width:'100%'
        },
        progress:{
            display:'flex',
            marginLeft: '24px',
            height: '42px',
            alignItems:'center',
            justifyContent:'flex-end'
        },
    };
});
export default useStyles;
