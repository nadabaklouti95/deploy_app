import {Accordion, AccordionDetails,Typography} from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyledAccordionSummary, themeDeleteButton } from "shared/constants/AppConst";
import { IContextItem } from "types/interfaces/ContextInterface";
import useStyles from "./styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { labelField } from "shared/constants/AppCssCons";
import ContextKey from "../ContextKey";
import { ActionAccessMode, ActionMode } from "shared/constants/AppEnums";
import ContextValue from "../ContextValue";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ConfirmPopup from "../../../shared/components/ConfirmPopup";
import AccessButton from "shared/components/AccessButton";


const ContextItem: React.FC<IContextItem> = (props) => {
  const classes = useStyles();
  const [accordState,setAccordState] = useState<boolean>(false)

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [headerDialog,setHeaderDialog]= useState<string>("");
    const [contentDialog,setContentDialog] = useState<string>("");
    const disabled=props.contextList.length === 1

  const handleAccordion = ()=>{  setAccordState(!accordState) }

    const handleOpenConfirmPopup = (event?:any) => {
      if (event) event.stopPropagation();
      setHeaderDialog("Delete Store");
      setContentDialog("Are u sure u want to delete this store");
      setOpenConfirmDialog(true);
    };
    const handleCloseConfirmPopup = () => {
        handleOpenConfirmPopup()
        setOpenConfirmDialog(false);
    };
    const deleteContext = () =>{
        props.handleContext(ActionMode.DELETE_MODE,props.contextItem.id,null,null)
    }

    const stopPropagation = (event?:any) =>{
        if (event) event.stopPropagation();
    }

  useEffect(()=>{   
    setAccordState(props.fold)
  },[props.fold])

  return (
    <Accordion id={"1"} key={1} className={classes.Accordion} style={{margin:"4px 0px"}} expanded={accordState} onChange={handleAccordion}>
      <StyledAccordionSummary  
        expandIcon={<ExpandMoreIcon style={{margin:4}} className={classes.ExpandMoreIcon}/>}
        aria-controls="panel1a-content" id="panel1a-header" 
        className={classes.AccordionSummary}
      >
          <div  className={classes.accordion_summary_container}>
              <div className={classes.accordionSummary_content_btns}>
                  <div className={classes.accodianSummary_content}>

                      <AccessButton 
                              id={`btn_delete_context_${props.contextIndex}`} 
                              disabled={false}
                              actionType={ActionAccessMode.WRITE_MODE} 
                              className={classes.btn_Icon} 
                              style={{padding:0}}
                              color={"primary"}
                              ariaLabel={"confirmCreation"}
                              handleClick={disabled?stopPropagation:handleOpenConfirmPopup}
                              iconButton={true}
                              theme={themeDeleteButton}
                              tooltip={disabled ? "" : "Delete Context"}
                            >
                              <HighlightOffIcon   color={disabled ? "disabled" : "secondary"} />
                      </AccessButton>
                  </div>
              </div>
              {!accordState &&
                  <div className={classes.accordionSummary_container}>
                      <div className={classes.accodianSummary_content} style={{paddingRight:16}}>
                          <div className={classes.accodianSummary_content_label}>
                              <Typography style={labelField}>Name:</Typography>
                          </div>
                          <div className={classes.accodianSummary_content_value}>
                              <Typography >{ props.contextItem.name}</Typography>
                          </div>
                      </div>
                  </div>
              }
          </div>
    </StyledAccordionSummary>
    <AccordionDetails className={classes.accordion_details}>
        <div className={classes.AccordionDetails_container}>
          <ContextKey accordState={accordState} indexElement={props.contextIndex} contextKey={props.contextItem} handleKey={props.handleContext} stateAction={ActionMode.DISPLAY_MODE} disabled={props.contextList.length === 1 ? true : false}/>
        </div>
         <div className={classes.divider}/>
        <div className={classes.AccordionDetails_container}>
          <ContextValue  contextKey={props.contextItem} handleValue={props.handleContext} indexElement={props.contextIndex} />
        </div>
    </AccordionDetails>

        <ConfirmPopup opendialog={openConfirmDialog} headerContent={headerDialog} contentMessage={contentDialog} handleAccordion={()=>{}} handleClose={handleCloseConfirmPopup} popupMainAction={deleteContext}/>

    </Accordion>
  );
  
};

export default ContextItem;
