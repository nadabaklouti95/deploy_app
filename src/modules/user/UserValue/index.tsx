import * as React from "react";
import useStyles from "./styles";
import {Typography, Accordion, AccordionDetails, Tab, CircularProgress} from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { StyledAccordionSummary, themeDeleteButton } from "shared/constants/AppConst";
import { useState } from "react";
import UserValueGeneral from "./UserValueGeneral";
import UserValuePassword from "./UserValuePassword";
import { labelField } from "shared/constants/AppCssCons";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ConfirmPopup from "../../../shared/components/ConfirmPopup";
import AccessButton from "shared/components/AccessButton";
import { ActionAccessMode } from "shared/constants/AppEnums";
interface IUserValue {
    handleDelete:any;
    handleUpdate:any;
    errorAction:any;
    loading:any;
    unfoldAll:any;
    user:any;
    userGroupe:any;
    userIndex:any
}

   

const UserValue: React.FC<IUserValue> = (props) => {
    const classes = useStyles()
    const [accordState,setAccordState] = useState<boolean>(false)
    const [value, setValue] = useState('1');
    const [openConfirmdialog, setOpenDialog] = useState(false);
    const [headerConfirmPopup,setHeaderPopup]= useState<string>("");
    const [contentConfirmPopup,setContentPopup] = useState<string>("");
    const [loading,setLoading] = useState<any>(false)

    const handleChange = (event:any, newValue:any) => {
        setValue(newValue);
      };
    const handleAccordion = ()=>{
      if(props.unfoldAll.action === "fold"){
        setAccordState(props.unfoldAll.state)
      }else{
        if(!props.unfoldAll.state ){
          props.unfoldAll.callback(false)
        }
        setAccordState(!accordState)
      }
    }

    const handleCloseConfirmPopup = () => {
        setOpenDialog(false);
    };
    const handleOpenConfirmPopup = (event?:any) => {
        if(event) event.stopPropagation()
        setHeaderPopup("Delete User")
        setContentPopup("Are you sure, you want to delete User")
        setOpenDialog(true);
    };

    const handleDelete = async () =>{
        setLoading(true)
        props.handleDelete(props.user.id)
        setTimeout(() => {
            setLoading(false)
        }, 1500);
    }



    React.useEffect(()=>{    
        setAccordState(props.unfoldAll.state)
      },[props.unfoldAll.action,props.unfoldAll.state])

  return (
    <>
     <Accordion key={props.user.id} className={classes.Accordion} expanded={accordState} onChange={handleAccordion}>
        <StyledAccordionSummary  expandIcon={<ExpandMoreIcon className={classes.ExpandMoreIcon}/>}
                                 aria-controls="panel1a-content" id="panel1a-header"
                                 className={classes.AccordionSummary} >
            <div className={classes.accordion_summary_container}>
                <div className={classes.accordionSummary_content_btns}>
                    {!loading ?
                        <Typography variant="body1" className={classes.typographyStyle}>
                        <span>
                            <AccessButton 
                                id={`btn_delete_user_${props.userIndex}`} 
                                actionType={ActionAccessMode.WRITE_MODE} 
                                style={{padding:0}}
                                color={"primary"}
                                ariaLabel={"delete-user"}
                                handleClick={handleOpenConfirmPopup}
                                iconButton={true}
                                theme={themeDeleteButton}
                                tooltip={"Delete User"}
                            >
                                <HighlightOffIcon color="secondary" />
                            </AccessButton>
                        </span>
                        </Typography>
                        :
                        <div className={classes.progress} >
                            <CircularProgress disableShrink size={20}/>
                        </div>
                    }
                </div>

                { !accordState &&
                    <div className={classes.accordion_summary_content}>
                        <div className={classes.accordionSummary__value}>
                            <div className={classes.label}>
                                <Typography variant="body1" style={labelField}  className={classes.typographyStyle} >First Name:</Typography>
                            </div>
                            <div className={classes.value}>
                                <Typography variant="body1"   className={classes.typographyStyle} >
                                    <span>{props.user.firstName}</span>
                                </Typography>
                            </div>
                        </div>
                        <div className={classes.accordionSummary__value}>
                            <div className={classes.label}>
                                <Typography variant="body1"  style={labelField}className={classes.typographyStyle} >
                                    <span>Last Name:</span>
                                </Typography>
                            </div>
                            <div className={classes.value}>
                                <Typography variant="body1"   className={classes.typographyStyle} >
                                    <span>{props.user.lastName}</span>
                                </Typography>
                            </div>
                        </div>
                        <div className={classes.accordionSummary__value} style={{width:"30%"}}>
                            <div className={classes.label}>
                                <Typography variant="body1" style={labelField}  className={classes.typographyStyle} >
                                    <span>Login:</span>
                                </Typography>
                            </div>
                            <div className={classes.value}>
                                <Typography variant="body1"   className={classes.typographyStyle} >
                                    <span>{props.user.login}</span>
                                </Typography>
                            </div>
                        </div>
                    </div>
                }
            </div>


        </StyledAccordionSummary>
        <AccordionDetails  className={classes.accordion_details} >
            <div className={classes.container_userValue}>
                <TabContext value={value}> 
                    <TabList TabIndicatorProps={{ style: { background: "#3569a8" } }} className={classes.TabList} onChange={handleChange} aria-label='lab API tabs example'>
                        <Tab className={`${classes.Tab} ${classes.general_tab}`} label='General' value='1' />
                        <Tab  className={`${classes.Tab} ${classes.password_tab}`} label='Password' value='2' />
                    </TabList>
                    <TabPanel  style={{padding:0}} className={classes.TabPanel} value='1'>
                        <UserValueGeneral userGroupe={props.userGroupe} user={props.user} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate}  />
                    </TabPanel>
                    <TabPanel  style={{padding:8}} className={classes.TabPanel} value='2'>
                        <UserValuePassword handleUpdate={props.handleUpdate} user={props.user} />
                    </TabPanel>
                </TabContext>
            </div>
        </AccordionDetails>
         <ConfirmPopup opendialog={openConfirmdialog} headerContent={headerConfirmPopup} contentMessage={contentConfirmPopup} handleClose={handleCloseConfirmPopup} popupMainAction={handleDelete} handleAccordion={()=>{}}/>

     </Accordion>

    </>
   
    
  );
};

export default UserValue;
