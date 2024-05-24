import * as React from "react";
import {Formik} from "formik";
import {ActionAccessMode, ActionMode} from "../../../../../shared/constants/AppEnums";
import {CircularProgress, IconButton} from "@material-ui/core";
import {themeButton} from "../../../../../shared/constants/AppConst";
import {Alert} from "@material-ui/lab";
import {useState} from "react";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {Box, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Tooltip} from "@mui/material";
import {useEffect} from "react";
import {IWorkspaceGeneral} from "../../../../../types/models/interface";
import AccessButton from "shared/components/AccessButton";
import AccessTextField from "shared/components/AccessTextField";
import AccessSelect from "shared/components/AccessSelect";
import useStyles from "./styles";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 200,
        },
    },
};

const colors = ["#bad8f3", "#f5d5ce", "#cef5e5"];


const WorkspaceGeneral: React.FC<IWorkspaceGeneral> = (props) => {

    const classes = useStyles();
    const [loading,setLoading] = useState<boolean>(false)
    const [resetState,setResetState] = React.useState<boolean>(false)
    const [errorAction,setErrorAction] = React.useState<any>([])
    const [storeList,setStoreList] = React.useState<any>([])

    let submitAction:any = "submit";
    let resetFormik:any = undefined



    useEffect(() => {
        const list = props.workspace.storeList
        const updatedList = list.map((item:any,index:any) => ({
            ...item,
            color: colors[index % colors.length]
        }));
        setStoreList(updatedList)

    }, [props.workspace]);



    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    "name": props.workspace.workSpaceDTO.name,
                    "description": props.workspace.workSpaceDTO.description,
                    "id": props.workspace.workSpaceDTO.id,
                    "deleted": props.workspace.workSpaceDTO.deleted,
                    "storeList":props.workspace.storeList
                }}
                onSubmit={(values:any) => {
                    if (submitAction === 'reset') {
                        resetFormik()
                        setResetState(!resetState)
                    }
                    if (submitAction === 'submit') {
                        setLoading(true)
                        props.handleWorkspace(ActionMode.EDIT_MODE,values,setLoading,setErrorAction)
                    }
                }}
            >
                {(formik) => {const {values,setFieldValue ,dirty, handleReset} = formik;
                    return (
                        <div  style={{display:'flex',flexDirection:'column',width:'100%', marginTop:10}}>
                            <div className={classes.value_container}>
                                <div className={classes.value_container_form}>
                                    <div className={classes.workspaceName}>
                                        <AccessTextField
                                            fullWidth={true}
                                            size="small"
                                            id={`textField_name_${props.indexWorkspace}`}
                                            name={`name_workspace`}
                                            value={values.name}
                                            handleChange={(event: any ) => {
                                                setFieldValue("name",event.target.value)
                                                setErrorAction([])
                                            }}
                                            label='Name'
                                            variant='outlined'
                                            className={classes.textFiledKeyList}
                                            actionType={ActionAccessMode.WRITE_MODE}
                                            disabled={false}
                                        />
                                    </div>
                                    <div className={classes.workspaceDescription}>
                                        <AccessTextField
                                            fullWidth={true}
                                            size="small"
                                            id={`textField_description_${props.indexWorkspace}`}
                                            name={`input_tag_description`}
                                            value={values.description}
                                            handleChange={(event: any ) => {
                                                setFieldValue("description",event.target.value)
                                                setErrorAction([])
                                            }}
                                            label='Description'
                                            variant='outlined'
                                            className={classes.textFiledKeyListDescription}
                                            actionType={ActionAccessMode.WRITE_MODE}
                                            disabled={false}
                                            multiline={true}
                                        />
                                    </div>
                                </div>
                                <div className={classes.value_container_action}>
                                    <div style={{display:'flex'}}>
                                        { !loading ?
                                            <div style={{display:'flex'}}>
                                                {dirty  &&
                                                <>
                                                    <div className={classes.value_container_action_btn}>
                                                        <Tooltip title={"Cancel"} arrow enterDelay={0} leaveDelay={100}>
                                                            <IconButton
                                                                id={`btn_cancel_${props.indexWorkspace}`}
                                                                className={classes.Add__btn}
                                                                color="secondary"
                                                                aria-label="cancelCreation"
                                                                onClick={()=>{
                                                                    handleReset()
                                                                }}>
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                    <div className={classes.value_container_action_btn}>
                                                        <AccessButton 
                                                            id={`btn_confirm_${props.indexWorkspace}`} 
                                                            disabled={false}
                                                            actionType={ActionAccessMode.WRITE_MODE} 
                                                            className={classes.Add__btn} 
                                                            style={{marginRight:4}}
                                                            color={"primary"}
                                                            ariaLabel={"confirmCreation"}
                                                            handleClick={()=>{ formik.submitForm(); }}
                                                            iconButton={true}
                                                            theme={themeButton}
                                                            tooltip={"Confirm"}
                                                        >
                                                            <CheckIcon />
                                                        </AccessButton>
                                                    </div>
                                                </>
                                                }
                                            </div>
                                            :
                                            <div className={classes.progress}>
                                                <CircularProgress disableShrink size={20}/>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={classes.storeList}>
                                <FormControl className={classes.FormControl} size="small" style={{maxWidth: "96%"}} >
                                    <FormControl className={classes.FormControl} size="small" style={{maxWidth: "96%"}} >
                                        <InputLabel id='demo-multiple-checkbox-label' className={classes.InputLabel}>Stores</InputLabel>
                                        <AccessSelect 
                                            actionType={ActionAccessMode.WRITE_MODE}
                                            labelId="'demo-multiple-checkbox-label" 
                                            id={`select_store_${props.indexWorkspace}`}
                                            value={storeList} 
                                            disabled={storeList.length===0}
                                            className={classes.root} 
                                            input={<OutlinedInput id={`select_input_${props.workspace.id}`} />}
                                            MenuProps={MenuProps}
                                            style={{width:storeList.length===0?"200px":`${storeList.length*200}px`}}
                                            renderValue={(selected:any) => (
                                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.4, marginRight:10}}>
                                                    {selected.map((element:any,index:any) => (
                                                        <Chip id={`chips_${props.indexWorkspace}_priority_${index}`} className={classes.chips}  style={{backgroundColor:element.color, fontFamily: 'Poppins,sans-serif',height:24}} key={element.id} label={element.name} />
                                                    ))}

                                                </Box>
                                            )}
                                            variant="outlined" 
                                            children={storeList.map((element:any, i:any) => (
                                                    <MenuItem id={`menu_Item_${props.indexWorkspace}_index_${i}`} key={element.id} value={element.name}>
                                                        <ListItemText id={`listItem_${props.indexWorkspace}_index_${i}`} primary={element.name} />
                                                    </MenuItem>
                                                ))}
                                        />
                                </FormControl>
                                    

                                </FormControl>

                            </div>
                            <div className={classes.PropertyKey_form_alert}>
                                {(errorAction.length !== null) &&
                                errorAction.map((row:any,index:any)=>
                                    (<Alert severity="error"  style={{width:'100%'}} key={index} className={classes.alert}>
                                            {row}
                                    </Alert>
                                    )
                                )}
                            </div>
                        </div>
                    )}}
            </Formik>
        </div>
    )
}

export default WorkspaceGeneral;
