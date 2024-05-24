import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
    return {
        AddToken:{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            width:'100%',
            border:'1px solid #0000001f;',
            borderRadius:4,
            marginTop:4
        },
        AddToken__header:{
            display:'flex',
            width:'100%',
            alignItems:'center',
            justifyContent:'space-between'
        },
        AddToken__header__Name:{
            display:'flex',
            margin:'6px 13px 6px 20px',
            alignItems:'center',
        },
        AddToken__header__Name__Typography:{
            display:'flex',
            alignItems:'center',
            textAlign:'center',
            fontFamily:'Poppins,sans-serif',
            fontWeight:600,
            fontSize:14,

        },
        AddToken__header__cancel:{
            display:"flex",
            alignItems:'center',
        },
        divider:{
            display:'flex',
            border:'0.5px solid #0000001f;',
            width: '100%'
        },
        AddToken__content:{
            display:'flex',
            alignItems:'center',
            flexDirection:'column',
            justifyContent:'flex-start',
            width:'100%',
            marginTop:4,
            marginBottom: 4
        },
        AddToken__content__contentToken:{
            display:'flex',
            flexDirection:"row",
            justifyContent:'flex-start',
            alignItems:'center',
            marginTop: '4px',
            width:'100%'
        },
        AddToken__content__contentToken__name:{
            width:'100%',
            display:'flex',
            marginLeft:13,
        },
        AddToken__content__contentToken__name__textFiled:{
            "& .MuiInputBase-input": {
                height:20,
                "&.Mui-focused ": {
                    backgroundColor: "#ebebeb",
                },
            },
            "&:hover": {
                backgroundColor: "#ebebeb",
            },
            "& .MuiOutlinedInput-input": {
                padding :8
            },
            "& .MuiInputLabel-outlined":{
                transform : 'translate(14px, 5px) scale(1)'
            },
            "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
                transform : 'translate(14px, -6px) scale(0.75)'
            },
        },
        AddToken__content__contentToken__expirationDate:{
            display:'flex',
            marginLeft:18
        },
        AddToken__content__contentToken__datePIcker:{
            display:'flex',
            marginLeft:4
        },
        datePicker:{
            width:200,
            "& .MuiInputBase-input": {
                height:20,
                //width:100,
                "&.Mui-focused ": {
                    backgroundColor: "#ebebeb",
                },
            },
            "&:hover": {
                backgroundColor: "#ebebeb",
            },
            "& .MuiOutlinedInput-input": {
                padding :8
            },
            "& .MuiInputLabel-outlined":{
                transform : 'translate(14px, 5px) scale(1)'
            },
            "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
                transform : 'translate(14px, -6px) scale(0.75)'
            },
        },


        AddToken__content__FullAcces:{
            display:'flex',
            marginLeft:13,
        },
        AddToken__content__Check__FullAcces:{
            display:'flex'
        },
        AddToken__content__context:{
            display:'flex',
            flexDirection:'row',
            marginRight:4,
        },
        AddToken__content__SelectMultiple:{
            display:'flex',
            marginLeft:4
        },
        AddToken__action:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-end',
            width:'100%'
        },

        AddToken__content__CreateToken:{
            display: 'flex',
            alignItems:'center',
            width:'100%'
        },
        AddToken__content__CreateToken__btn:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:32,
            width: 80,
            background:'#4CAF50',
            boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
            borderRadius: 4,
            color:"#FFFFFF",
            fontFamily:"Poppins",
        },
        AddToken__content__CreateToken__createMode:{
            display: 'flex',
            flexDirection:'row',
            width:'100%',
            justifyContent:'flex-end'
        },
        AddToken__content__CreateToken__DisplayMode:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            width:'100%'
        },
        AddToken__content__CreateToken__code:{
            display:'flex',
            alignItems:'center',
            marginLeft: 13
        },
        AddToken__content__CreateToken__copyAction:{
            display:'flex',
            alignItems:'center',
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
        AddToken__btn:{
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
        addTokenContainer : {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: 4,
            marginBottom: 4,
            marginLeft:13
        },
        hover: {
            "& .MuiInputBase-input": {
                minHeight: 20,
                minWidth: 200,
                maxWidth: 400,
                "&.Mui-focused ": {
                    backgroundColor: "#ebebeb",

                },
            },
            "&:hover": {
                backgroundColor: "#ebebeb",
            },
            "& .MuiOutlinedInput-input": {
                padding: 4,
            },
            "& .MuiInputLabel-outlined": {
                transform: 'translate(14px, 7px) scale(1)'
            },
            "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                transform: 'translate(14px, -6px) scale(0.75)',
                color: "#3569a8",
                fontWeight: "bold",
            },
        },

    };
});
export default useStyles;
