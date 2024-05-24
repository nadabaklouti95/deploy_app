import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";



const useStyles = makeStyles((theme: AppTheme) => {
   
    return {
        container:{
            display:'flex',
            flexDirection:'column',
            width:'100%'
        },
        Accordion:{
            width:'100%',
            border:'1px solid #a2b4b5;',
            borderRadius:'4px',
            margin: '4px 0px 0px 0px',
            
        },
        ExpandMoreIcon:{
            "& ..MuiIconButton-root":{
              padding:0
            },
            "&.MuiIconButton-root":{
                padding:8
            }
        },
        AccordionSummary : {
            "& .Mui-expanded":{
                maxHeight:"12px",
                minHeight:12
            },
            "& .MuiAccordionSummary-content.Mui-expanded":{
              margin:"4px 0px ",
              maxHeight:"12px",
              minHeight:12
            },
            "& .MuiAccordionSummary-content": {
                margin: "0px",
                display: "flex",
                flexGrow: 1,
                transition: "margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
            },
            "&.MuiAccordionSummary-root":{
              minHeight:12
            },
            "& .MuiAccordionSummary-expandIcon.Mui-expanded " :{
              padding:0,
              margin: "2px 0px 0px 0px",
              maxHeight:"12px",
              minHeight:12
            },
        },
        column: {
            margin:0
        },
        fileUpload:{
            display:'flex',
            width:'100%',
            flexDirection:'column',
            alignItems:'center',
        },
        fileUpload_mainInfo:{
            display:'flex',
            alignItems:'center',
            flexDirection:'column',
            width:"100%"
        },
        fileUpload_name:{
            display:'flex',
            alignItems:'center',
            width:'100%',
            justifyContent:'flex-start',
            flexWrap:'wrap',
            height:'auto'
        },
        summary:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            width:'100%',
            justifyContent:'flex-start',
            flexWrap:'wrap',
            height:'auto'
        },
        fileName__Summary__container:{
            display:'flex',
            flexWrap:'wrap',
            width:'40%'
        },
        progress__Summary__Container:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-start',
            width:'50%'
        },
        status__Summary__Container:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            width:'10%'
        },
        fileUpload_name__typo:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start',
            padding:8
        },
        fileUpload_name__value:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start',
            padding:"8px 8px 8px 0px"
        },
        fileUpload_tag:{
            display:'flex',
            alignItems:'center',
            width:'100%',
            justifyContent:'flex-start',
            padding:8
        },
        fileUpload_tag__typo:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start',
            padding:8
        },
        fileUpload_tag__value:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start',
            padding:"8px 8px 8px 0px"
        },
        fileUpload_status:{
            display:'flex',
            alignItems:'center',
            width:'100%',
            justifyContent:'flex-start',
            padding:8,
            height:'auto'
        },
        fileUpload_status__typo:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start',
            padding:8,
        },
        fileUpload_status__value:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start',
            padding:"8px 8px 8px 0px",
        },
        fileUpload_progressInfo:{
            display:'flex',
            alignItems:'center',
            width:'100%',
            justifyContent:'flex-start',
            padding:8
        },
        fileUpload_progressInfo__typo:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start',
            padding:8
        },
        fileUpload_progress:{
            display:'flex',
            alignItems:'center',
            width:'100%',
            justifyContent:'flex-end',
            padding:8
        },
        fileUpload_progress__typo:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-end'
        },
        progress:{
            "& .MuiCircularProgress-colorPrimary":{
                color:'#00ff21'
            }
        },
        fileUpload__statusIcon:{
            height: 12,
            width: 12,
            display: 'flex',
            alignItems: 'center',
            borderRadius:'50%',
            padding:2
        },
        fileUpload_moreInfo:{
            display:'flex',
            flexWrap:'wrap',
            alignItems:'center',
            flexDirection:'row',
            width:"100%",
            paddingTop:'0px',
        },
        fileUpload_user:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start',
            marginLeft:8
        },
        fileUpload_user__typo:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start'
        },
        fileUpload_user__value:{
            display:'flex',
            alignItems:'center',
            marginLeft:4,
            justifyContent:'flex-start'
        },
        fileUpload_startTime:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start',
            padding:8,
            flexWrap:"wrap"
        },
        fileUpload_startTime__typo:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start'
        },
        fileUpload_startTime__value:{
            display:'flex',
            alignItems:'center',
            marginLeft:8,
            justifyContent:'flex-start'
        },
        fileUpload_endTime:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start',
            padding:8,
            flexWrap:"wrap"
        },
        fileUpload_endTime__typo:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start'
        },
        fileUpload_endTime__value:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start',
            marginLeft:8,
        },
        fileUpload_type:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start',
            padding:8
        },
        fileUpload_type__typo:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start'
        },
        fileUpload_type__value:{
            display:'flex',
            alignItems:'center',
            marginLeft:4,
            justifyContent:'flex-start'
        },
        fileUpload_keys:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start',
            padding:8
        },
        fileUpload_keys__typo:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start'
        },
        fileUpload_keys__value:{
            display:'flex',
            alignItems:'center',
            marginLeft:4,
            justifyContent:'flex-start'
        },
        fileUpload_context:{
            display:'flex',
            alignItems:'center',
            flexDirection:'row',
            width:"100%"
        },
        TokenValue__Scoop:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'flex-start',
            flexWrap:'wrap',
            marginBottom:16,
            width:'100%',
            alignItems:"flex-start"
          },
          TokenValue__Scoop__context__Values:{
            display:'flex',
            alignItems:'center',
            flexDirection:'column',
            marginLeft:4,
            border:"1px solid #bdbdbd",
            borderRadius:4,
            marginTop:12,
            flexWrap:'wrap',
            height:"fit-content"
          },
          TokenValue__token_key:{
            justifyContent:'flex-start',
            width:'100%',
            display:"flex",
            marginLeft:15,
            marginTop:-10,
            padding:'0px 4px'
            
          },
          TokenValue__Scoop__context__values:{
            display:'flex',
            alignItems:'center',
            borderRadius:"4px",
            minWidth: "235px",
            maxWidth: "235px",
            padding: "0px 8px",
            marginTop : "0px",
            marginBottom:4,
            minHeight:24,
            flexWrap:'wrap',
            gap:"3.2px",
          },
          chips: {
            display: "flex",
            justifyContent:'center',
            overflowX:'auto',
            paddingLeft:12,
            paddingRight:12,
            borderRadius:23,
            alignItems:'center'
          },
          elementRow:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center'
          },
          elementRow_div:{
            display:'flex',
            marginRight:8,
            alignItems:'center'
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
          content:{
            maxWidth:'40rem',
            margin:"4rem auto",
            padding:"2rem",
            backgroundColor:'white'
          },
          longText:{
            height:0,
            overflow:'hidden',
            display:'inline-block',
          },
          expand :{
            maxHeight:'50rem'
          }
    };
});
export default useStyles;
