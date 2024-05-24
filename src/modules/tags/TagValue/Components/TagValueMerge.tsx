import * as React from "react";
import useStyles from "../styles";
import {Alert, Button, Typography} from "@mui/material";
import {useState} from "react";
import ConfirmPopup from "../../../../shared/components/ConfirmPopup";
import {Grid, MenuItem, TextField} from "@material-ui/core";
import CallMergeIcon from '@mui/icons-material/CallMerge';
import Autocomplete from '@mui/material/Autocomplete';
import { ITagValueMerge } from "types/models/interface";
import {TaskTypeId} from "../../../../shared/constants/AppEnums";


const TagValueMerge: React.FC<ITagValueMerge> = (props) => {

    const classes = useStyles();
    const [headerMergeDialog,setHeaderMergeDialog]= useState<string>("");
    const [contentMergeDialog,setContentMergeDialog] = useState<string>("");
    const [openMergeDialog, setOpenMergeDialog] = useState(false);
    const [selectedTag, setSelectedTag] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<any>(false);
    const [tagOption,setTagOption] = React.useState<any>(false)


    const handleOpenMergePopup = () => {
        if(selectedTag) {
            setHeaderMergeDialog(`Merge ${selectedTag.name} :`)
            setContentMergeDialog(`Are you sure you want to merge this tag ?`)
            setOpenMergeDialog(true);
            setErrorMessage(false)
        }
        else {
            setErrorMessage(true)
        }

    };
    const handleCloseMergePopup = () => {
        handleOpenMergePopup()
        setOpenMergeDialog(false);
    };

    const mergeTags = () => {
        let value = {
            mergeTagTaskDTO: {
                    sourceTag:props.tag.id,
                    targetTag:selectedTag.id,
                    mergeTypeId:tagOption?2:1
                },
            typeId: TaskTypeId.MERGE_TAG
        }
        props.mergeTags(props.tag.id,value)


    }

    return (
        <div>
            <Grid item xs={12} md={12} sm={12} className={classes.summary}>
                <Grid item xs={2} md={2} sm={2} className={classes.summary}>
                    <div className={classes.tagMergeSource}>
                        <label className={classes.tagMergeNameLabel}>Source:</label>
                        <div>{props.tag.name}</div>
                    </div>
                </Grid>

                <Grid item xs={10} md={10} sm={10} className={classes.summary} >
                    <div className={classes.tagMergeTarget}>
                        <label className={classes.tagMergeNameLabel}>Target:</label>
                        <div  className={classes.tagMergeTextField}>
                            <Autocomplete
                                fullWidth
                                id="select_tag_source"
                                options={props.listTags.filter((value:any)=>value.id!==props.tag.id)}
                                getOptionLabel={(option) => option.name}
                                value={selectedTag}
                                onChange={(event, newValue) => {
                                    setSelectedTag(newValue);
                                    setErrorMessage(false);
                                }}

                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        name="tag"
                                        variant="outlined"
                                        className={classes.tagMerged_textField}
                                        InputProps={{
                                            ...params.InputProps,
                                            style: {padding: '0px', backgroundColor: '#FFFFFF'}
                                        }}

                                    />
                                )}
                                renderOption={(props, option) => (
                                    <MenuItem key={option.id} {...props} value={option} >
                                        {option.name}
                                    </MenuItem>
                                )}
                            />

                            <div style={{marginLeft:"10px"}}>
                                <Button style={{height:34}} size="small" variant="outlined" color="primary" onClick={() => handleOpenMergePopup()}>
                                    <Typography variant="inherit" className={classes.mergeTagIconBtn} >
                                        <CallMergeIcon />
                                        <span className={classes.mergeTagIcon} >Merge</span>
                                    </Typography>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>


            {errorMessage && <Alert severity="error"  className={classes.alert}>No target selected </Alert>}

            <ConfirmPopup
                opendialog={openMergeDialog}
                headerContent={headerMergeDialog}
                contentMessage={contentMergeDialog}
                handleClose={handleCloseMergePopup}
                popupMainAction={mergeTags}
                handleAccordion={()=>{}}
                mergeTag={true}
                tagOption={tagOption}
                setTagOption={setTagOption}

            />

        </div>
    )
}

export default TagValueMerge;
