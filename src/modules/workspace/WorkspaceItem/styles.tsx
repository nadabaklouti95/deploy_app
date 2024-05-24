import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
    return {
        Accordion:{
            width:'100%',
            border:'1px solid #a2b4b5;',
            borderRadius:'4px',
            margin: '4px 0px 0px 0px',
        },
        accordionSummary_content:{
            display:'flex',
            justifyItems:'flex-start',
            alignItems:'center',
            width:'100%',
            height:'auto'
        },
        accordionSummary_content_label:{
            display:'flex'
        },
        accordionSummary_content_value:{
            display:'flex',
            marginLeft:8,
            alignItems:'center'
        },

        ExpandMoreIcon:{
            "& ..MuiIconButton-root":{
                padding:0
            }
        },
        AccordionSummary : {
            marginTop:"5px",
            alignItems:'center',
            width:'100%',

            "& .MuiAccordionSummary-content.Mui-expanded":{
                margin:"4px 0px "
            },
            "& .MuiAccordionSummary-content": {
                margin: "0px",
                display: "flex",
                flexGrow: 1,
                transition: "margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
            },
            "& .MuiAccordionSummary-root":{
                minHeight:48
            },
            "& .MuiAccordionSummary-expandIcon.Mui-expanded " :{
                padding:12,
                marginTop:25,
            },
        },

        container_workspaceValue:{
            display:'flex',
            flexDirection:'column',
            background: "#FFFFFF",
            borderRadius:'4',
            width:'100%',
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
        accordion_summary_container: {
            display:"flex",
            width:"100%",
        },
        accordionSummary_content_btns:{
            display: "flex",
            justifyContent:"flex-end",
            alignItems: "center",
        },
        accordionSummary_container:{
            display:'flex',
            width:'100%',
            height:'auto'
        },
        summary:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            width:'100%',
            justifyContent:'center',
            flexWrap:'wrap',
            height:'auto'
        },
        btn_Icon:{
            padding:0,
            "& .MuiButtonBase-root":{
                padding:0
            },
            "& .MuiIconButton-root":{
                padding:0
        }
        },
        progress:{
            display:'flex',
            height: '26px',
            alignItems:'center',
            marginTop: '4px',
            width:'100%',
            justifyContent:'flex-end'
        },
    };
});
export default useStyles;
