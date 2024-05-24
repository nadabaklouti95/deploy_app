import * as React from "react";
import {useEffect, useState} from "react";
import useStyles from "./styles";
import { StyledAccordionSummary, themeButton } from "shared/constants/AppConst";
import { ITagValue } from "types/models/interface";

import {Accordion, Tab, AccordionDetails, CircularProgress, Grid, Typography} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { labelField } from "shared/constants/AppCssCons";
import TagValueGeneral from "./Components/TagValueGeneral";
import TagValueMerge from "./Components/TagValueMerge";
import {TabContext, TabList, TabPanel} from "@material-ui/lab";
import ConfirmPopup from "shared/components/ConfirmPopup";
import {ActionAccessMode, ActionMode} from "../../../shared/constants/AppEnums";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccessButton from "shared/components/AccessButton";
import TagValueStats from "./Components/TagValueStats";



const TagValue: React.FC<ITagValue> = (props) => {
    const classes = useStyles();
    const [accordState,setAccordState] = useState<boolean>(false)
    const [openConfirmdialog, setOpenDialog] = React.useState(false);
    const [headerConfirmPopup,setHeaderPopup]= React.useState<string>("");
    const [contentConfirmPopup,setContentPopup] = React.useState<string>("");
    const [loadingDelete,setLoadingDelete] = useState<boolean>(false)
    const [value, setValue] = useState('1');
    let tagIdList:any = localStorage.getItem('tagIdList')?localStorage.getItem('tagIdList')?.split(","):[];
    const [lockTag, setLockTag] = useState<boolean>(tagIdList.some((id:any) => id === String(props.tag.id)))
    const [loadingLock, setLoadingLock] = useState<boolean>(false)



    const handleChange = (event:any, newValue:any) => {
        setValue(newValue);
    };

    const handleAccordion = ()=>{
        setAccordState(!accordState)
    }
    const handleOpenConfirmPopup = (event?:any) => {
        if(event) event.stopPropagation();

        setHeaderPopup("Delete Tag")
        setContentPopup("Are you sure u want to delete this Tag")
        setOpenDialog(true);
    };
    const handleCloseConfirmPopup = () => {
        setOpenDialog(false);
    };
    const deleteTag = ()=>{
        setLoadingDelete(true)
        props.handleTag(ActionMode.DELETE_MODE,props.tag.id,null,null)
        setTimeout(() => {
            setLoadingDelete(false)
        }, 2000);
    };

    const stopPropagation = (event:any) => {
        event.stopPropagation();
    };

    const addLockTag = (event:any) => {
        event.stopPropagation();
        setLoadingLock(true)
        setTimeout(() => {
            tagIdList = localStorage.getItem('tagIdList')?localStorage.getItem('tagIdList')?.split(","):[];
            let tagIndex = tagIdList.findIndex((id:any) => id === String(props.tag.id))
            if(tagIndex >= 0){
                tagIdList.splice(tagIndex, 1)
                localStorage.setItem('tagIdList', String(tagIdList))
                setLockTag(false)
            } else {
                tagIdList.push(String(props.tag.id))
                localStorage.setItem('tagIdList', String(tagIdList))
                setLockTag(true)
            }
            setLoadingLock(false)
        }, 2000);
    };

    useEffect(()=>{
        setAccordState(props.fold)
    },[props.fold])

    return (
        <Accordion id={`accordion_index_${props.indexTag}`} key={1} className={classes.Accordion} expanded={accordState} onChange={handleAccordion}>
            <StyledAccordionSummary
                expandIcon={<ExpandMoreIcon style={{margin:4}} className={classes.ExpandMoreIcon}/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.AccordionSummary}
                style={{marginTop:accordState?20:0,alignItems:'center'}}
            >
                <div  className={classes.accordion_summary_container} style={{height:accordState?25:""}}>
                    <div className={classes.accordionSummary_content_btns} >
                        <div className={classes.accodianSummary_content}>
                            <div className={classes.tagsButtons}>
                                <div>
                                    {!loadingLock ?
                                        <AccessButton 
                                            id={`btn_lock_${props.indexTag}`}
                                            disabled={lockTag}
                                            actionType={"Lock Tag"} 
                                            className={classes.Add__btn} 
                                            style={{padding: 0, backgroundColor: "white",}}
                                            color={"secondary"}
                                            ariaLabel={"deleteTag"}
                                            handleClick={addLockTag}
                                            iconButton={true}
                                            theme={themeButton}
                                            tooltip={lockTag ? "Unlock Tag" : "Lock Tag"}
                                        >
                                            {lockTag ?
                                                <LockOutlinedIcon className={classes.lockIcon} style={{color: "rgb(227, 171, 85)"}}/>
                                                :
                                                <LockOpenIcon className={classes.lockIcon} style={{color: "rgba(0, 0, 0, 0.26)"}}/>
                                            }
                                        </AccessButton>
                                        :
                                        <div style={{marginLeft:2}}>
                                            <CircularProgress disableShrink size={20}/>
                                        </div>
                                    }
                                </div>
                                {!loadingDelete ?
                                    <div>
                                        <AccessButton 
                                            id={`btn_delete_${props.indexTag}`} 
                                            disabled={lockTag}
                                            actionType={ActionAccessMode.WRITE_MODE} 
                                            className={classes.Add__btn} 
                                            style={{padding: 0}}
                                            color={"secondary"}
                                            ariaLabel={"deleteTag"}
                                            handleClick={props.tag.name === 'Latest' ? stopPropagation : handleOpenConfirmPopup}
                                            iconButton={true}
                                            theme={themeButton}
                                            tooltip={props.tag.name === 'Latest' ? "" : "Delete Tag"}
                                        >
                                            <HighlightOffIcon color="secondary"/>
                                        </AccessButton>
                                    </div>
                                    :
                                    <div className={classes.progress}>
                                        <CircularProgress disableShrink size={20}/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    {!accordState &&
                        <>
                            <Grid item xs={12} md={12} sm={12} className={classes.summary}>
                                <Grid item xs={2} md={2} sm={2} className={classes.summary}>
                                    <div className={classes.accodianSummary_content}>
                                        <div className={classes.accodianSummary_content_label}>
                                            <Typography style={labelField}>Name:</Typography>
                                        </div>
                                        <div className={classes.accodianSummary_content_value} style={{lineBreak:'anywhere'}}>
                                        <Typography  >{ props.tag.name}</Typography>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={3} md={3} sm={3} className={classes.summary}>
                                <div className={classes.accodianSummary_content} style={{paddingLeft: 32}}>
                                    <div className={classes.accodianSummary_content_label}>
                                        <Typography style={labelField}>Next Tag:</Typography>
                                    </div>
                                    {props.tag.nextTags.length !==0 && props.tag.nextTags.map((element:any,indexNext:any)=>(
                                        <div id={`tag_${props.tag.id}_index_${indexNext}`} className={classes.value_container_form_firstElement_store_check} key={`tag_${props.tag.id}_index_${indexNext}`}>
                                            <Typography id={`tagName_${props.tag.id}_index_${indexNext}`} >{element.name}</Typography>
                                        </div>
                                    ))}
                                    {props.tag.nextTags.length ===0 &&
                                        <div id={`tag_${props.tag.id}_index_Latest`} className={classes.value_container_form_firstElement_store_check}>
                                            <Typography id={`tagName_${props.tag.id}_index_Latest`} ></Typography>
                                        </div>
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={5} md={5} sm={5} className={classes.summary}>
                                <div className={classes.accodianSummary_content} style={{paddingLeft: 32}}>
                                    <div className={classes.accodianSummary_content_label}>
                                        <Typography style={labelField}>Description:</Typography>
                                    </div>
                                    <div className={classes.accodianSummary_content_value} style={{width:300}}>
                                        <Typography className={classes.truncateText} >{ props.tag.description}</Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={1} md={1} sm={1} className={classes.summary}></Grid>
                        </Grid>
                    </>
                }
                </div>
            </StyledAccordionSummary>

            <AccordionDetails style={{ display: "flex",width:'100%',paddingBottom:10 }} >
                <div className={classes.container_tagValue}>
                    <TabContext value={value}>
                        <TabList TabIndicatorProps={{ style: { background: "#3569a8" } }} style={{minHeight: "auto",height: "auto",width:'100%',borderBottom:"1px solid #a2b4b5"}}
                                 className={classes.TabList} onChange={handleChange} aria-label='lab API tabs example'>
                            <Tab  style={{minHeight: "auto",height: "auto",paddingBottom:0,paddingTop:0,textTransform:'initial'}}
                                  className={classes.Tab} label='General' value='1' />
                            <Tab style={{minHeight: "auto",height: "auto",textTransform:'initial',display: 'flex'}}
                                 className={classes.Tab} label='Merge' value='2'
                                 disabled={props.tag.name === 'Latest' || lockTag}/>
                            <Tab style={{minHeight: "auto",height: "auto",textTransform:'initial',display: 'flex'}}
                                 className={classes.Tab} label='Statistics' value='3'
                                 />
                        </TabList>
                        <TabPanel  style={{padding:0}} className={classes.TabPanel} value='1'>
                            <TagValueGeneral
                                tag={props.tag}
                                handleTag={props.handleTag}
                                indexTag={props.indexTag}
                                lockTag={lockTag}
                            />
                        </TabPanel>
                        <TabPanel  style={{padding:8}} className={classes.TabPanel} value='2' >
                            <TagValueMerge tag={props.tag} listTags={props.listTags} mergeTags={props.mergeTags}/>
                        </TabPanel>
                        <TabPanel  style={{padding:8}} className={classes.TabPanel} value='3' >
                            <TagValueStats tag={props.tag}/>
                        </TabPanel>
                    </TabContext>
                </div>
            </AccordionDetails>
            <ConfirmPopup opendialog={openConfirmdialog} headerContent={headerConfirmPopup} contentMessage={contentConfirmPopup} handleClose={handleCloseConfirmPopup} popupMainAction={deleteTag} handleAccordion={()=>{}}/>
        </Accordion>

    );
};
export default TagValue;