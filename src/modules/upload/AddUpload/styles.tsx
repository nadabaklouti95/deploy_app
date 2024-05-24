import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
return {
    addContainer:{
        display:'flex',
        flexDirection:'column',
        width:'100%',
        background:'#FFFFFF',
        border:'1px solid #F2F4F8',
        boxSizing:'border-box',
        boxShadow:'0px 6px 18px rgba(0, 0, 0, 0.06)',
        borderRadius:4
    },
    dragZone:{
        display:'flex',
        width:'100%',
        padding:'13px 20px',
        "&:hover":{
            display:'flex',
            width:'100%',
            padding:'13px 20px',
            cursor:'pointer'
        }
    },
    dragZoneContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        border:"1px solid #CEC6C6",
        borderRadius:"4px"
    },
    dragZone__icon:{
        display:'flex',
        padding:4,
        width:'36px',
        justifyContent:"center"
    },
    root: {
        fontSize: 14,
        minHeight: "28px",
        maxHeight: "28px",
        width:'100%',
        justifyContent:'center',
        display:'flex'
    },
    strategy__container:{
        display:"flex",
        alignItems:'center'
    },
    strategy:{
        display:"flex",
        alignItems:'center',
    },
    strategy__switch:{
        display:"flex",
        alignItems:'center',
        marginLeft:8
    },
    strategy__value:{
        display:"flex",
        alignItems:'center',
        marginLeft:8
    },
    tag__container:{
        display:"flex",
        alignItems:'center',
        marginLeft:8
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
    type_container:{
        display:"flex",
        alignItems:'center',
        padding:"8px 0px",
        marginLeft:8
    },
    type:{
        display:"flex",
        alignItems:'center'
    },
    type_switch:{
        display:"flex",
        alignItems:'center',
        marginLeft:8
    },
    type_value:{
        display:"flex",
        alignItems:'center',
        marginLeft:8
    },
    contextContainer:{
        display:"flex",
        flexDirection:'row',
        alignItems:'flex-start',
        width:'auto',
        padding:8,
        flexWrap:'wrap'
    },
    upload__content__context:{
        display:'flex',
        flexDirection:'row',
        marginLeft:13,
    },
    upload__ations:{
        display: 'flex',
        alignItems:'center',
        width:'auto',
        justifyContent:'flex-end',
        padding:8
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
};
});
export default useStyles;
