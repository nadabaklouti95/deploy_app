import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    treeView:{
        width:'100%',
        height:'auto',
        "& .css-2cq9xd-MuiTreeView-root":{
            width:'100%',
            height:'auto',
            overflowY: 'auto'
        }
    },
    tree_container:{
        display:'flex',
        borderTop:'0.5px solid #b3d8f6ab',
        borderBottom:'0.5px solid #b3d8f6ab',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'column',
        padding:4
    },
    mainTree_div :{
        display:'flex',
        justifyContent:'space-between',
        width:'100%',
        alignItems:'center',
    },
    treeItem_propertyDetails :{
        display:'flex',
        width:'100%'
    },
    mainInfo:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    action:{
        display:'flex',
        flexDirection:'row',
        margin:'0px'
    },
    action_add:{
        display:'flex',
        flexDirection:'row',
        margin:'0px 20px',
        alignItems:'center'
    },
    action_delete:{
        display:'flex',
        flexDirection:'row',
        margin:'0px 20px',
        alignItems:'center'
    },
    action_expand:{
        display:'flex',
        flexDirection:'row',
        margin:'0px'
    },
    propertyDetails:{
        border:"1px solid #E0E0E0",
        boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius:4,
        width:'100%'
    },
    numberCild:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginLeft:16
    },
    numberCild_value:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    numberCild_typo:{
        display:'flex',
        alignItems:'center',
        marginLeft:4
    },
    button:{
        '&:hover, &:focus': {
            cursor:'pointer'
          },
    },
    iconExpand:{
        display:'flex',
        alignItems: 'center',
        width:12
    },
    label:{
        display:'flex',
        marginLeft:8,
        '&:hover, &:focus': {
            cursor:'pointer'
          },
    },
    TabList:{  
        "&.PrivateTabIndicator-colorSecondary-219":{
          backgroundColor:'#3498db'
        }
    },
    Tab:{
        "&.PrivateTabIndicator-colorSecondary":{
          backgroundColor:'blue'
        },
        "&.MuiTab-textColorInherit.Mui-selected":{
          borderTop: "1px solid #a2b4b5",
          borderLeft: "1px solid #a2b4b5",
          borderRight: "1px solid #a2b4b5",
          borderBottom: "none",
          borderRadius:4,
          "&.PrivateTabIndicator-colorSecondary":{
            backgroundColor:'blue'
          },
          
        },
        "&.MuiButtonBase-root.MuiTab-root": {
          "&:hover":{
            backgroundColor: "#f5f5f5f5"
          }
        },
        "&.PrivateTabIndicator-colorSecondary-219":{
          backgroundColor:'#3498db'
        }
    },
    TabPanel:{
        padding:0,
        "&.PrivateTabIndicator-colorSecondary":{
          backgroundColor:'gray'
        },
    },
    ProportyDetails : {
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        width: '100%',
    },
    propertiesDetails_yaml:{
        display:'flex',
        flexDirection:"column",
        borderRadius:4,
    },
    btn_link: {
        display: "flex",
        paddingLeft: 16,
        textDecoration: "underline",
        textDecorationColor: "#0a8fdcbf"
    },

    /*  btn_link: {
      marginLeft:16,
      display:"flex",
      paddingLeft : 16,
      borderRadius: 4,
      cursor: "pointer",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffffff",
      height: "100%",
      border: "1px solid rgb(76, 175, 80)",
      borderColor: "#869bada6",
      borderStyle:'ridge',
      
      textTransform: "none",
      textDecorationLine:'none',
      color:"#495057",
      fontSize:16,
      padding:'0px 16px'
    },*/

    simpleLink:{
      display:"flex",
      paddingLeft : 16
    }
  };
});
export default useStyles;
