import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
return {
    addContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        border:'1px solid #0000001f;',
        borderRadius:4,
        marginTop:4,
        backgroundColor:'#ffffff'
    },
    publishProperties__container:{
        display:"flex",
        alignItems:'center',
        marginLeft:8
    },
    publishProperties:{
        display:"flex",
        alignItems:'center',
        padding:"10px 0px",
    },
    publishProperties__switch:{
        display:"flex",
        alignItems:'center',
        marginLeft:8
    },
    tag__container:{
        display:"flex",
        alignItems:'center',
        marginLeft:8,
    },
    tag:{
        display:"flex",
        alignItems:'center'
    },
    tag__select:{
        display:"flex",
        alignItems:'center',
        marginLeft:8,
        minWidth: "128px",
        maxWidth: "128px",
        justifyContent:'center'
    },
    accesRules_container:{
        display:"flex",
        alignItems:'center',
        padding:"10px 0px",
        marginLeft:8
    },
    accesRules:{
        display:"flex",
        alignItems:'center',
    },
    accesRules_switch:{
        display:"flex",
        alignItems:'center',
        marginLeft:8
    },
    publish__ations:{
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
    root: {
        fontSize: 14,
        minHeight: "28px",
        maxHeight: "28px",
        width:'100%',
        justifyContent:'center',
        display:'flex'
    },
};
});
export default useStyles;
