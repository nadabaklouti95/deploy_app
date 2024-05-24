import useStyles from './styles';
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle,  Paper } from '@material-ui/core';
import * as React from 'react';
import TagSwitch from "../TagSwitch";
import { Button } from '@mui/material';




interface ConfirmPopupProps {
    opendialog : any,
    handleClose : any,
    popupMainAction : any
    headerContent: string,
    contentMessage: string,
    handleAccordion:any,
    mergeTag?:boolean,
    tagOption?:any,
    setTagOption?:any,
}


const ConfirmPopup : React.FC<ConfirmPopupProps>= ({opendialog,handleClose,popupMainAction,headerContent,contentMessage,handleAccordion,
                                                       mergeTag,tagOption,setTagOption}) => {
    const classes = useStyles();

    const handleAction = ()=>{
      handleAccordion()
      popupMainAction()
      handleClose();
    }
    
  return (
    <div>
        <Dialog
          open={opendialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-title">{headerContent}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" className={classes.dialog_content_text}>
              {contentMessage}
            </DialogContentText>
              {mergeTag &&
                  <div  className={classes.custom_switch}>
                      <div className={classes.tag_options}>{tagOption?"Force Source":"Keep Latest"} </div>
                      <TagSwitch
                          id='tag_option'
                          checked={tagOption}
                          onChange={(event: any ) => {
                              event.preventDefault()
                              setTagOption(event.target.checked)
                          }}
                          name="checkedT"
                          value={tagOption}/>
                  </div>
              }
          </DialogContent>

          <Paper>
            <Box
              component="span"
              m={1}
              className={`${classes.spreadBox} ${classes.box}`}
            >
              <Button
                id={`cancel_action`}
                onClick={handleClose}
                variant="outlined"
                color="error"
                className={classes.buttonsSize}
              >
                Cancel
              </Button>
              <Button
                id={`confirm_action`}
                onClick={handleAction}
                color="primary"
                variant="outlined"
                autoFocus
                className={classes.buttonsSize}
              >
                Ok
              </Button>
            </Box>
          </Paper>
        </Dialog>
    </div>
  );
}
export default ConfirmPopup
