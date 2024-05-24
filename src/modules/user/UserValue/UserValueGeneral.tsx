import * as React from "react";
import useStyles from "./styles";
import { CircularProgress,IconButton, createTheme } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "@material-ui/lab";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { green } from "@material-ui/core/colors";
import { Box, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Tooltip } from "@mui/material";
import ConfirmPopup from "shared/components/ConfirmPopup";
import { useState } from "react";
import { ActionAccessMode } from "shared/constants/AppEnums";
import AccessCheckbox from "shared/components/AccessCheckbox";
import AccessTextField from "shared/components/AccessTextField";
import AccessSelect from "shared/components/AccessSelect";
import AccessButton from "shared/components/AccessButton";
import { themeDeleteButton } from "shared/constants/AppConst";

    interface IUserValue {
        handleDelete:any;
        handleUpdate:any;
        user:any;
        userGroupe:any
    } 

    let colors = ["#bad8f3", "#f5d5ce", "#cef5e5"];
    for (var i = 0; i < 100; i++) {
        colors.push("#bad8f3", "#f5d5ce", "#cef5e5");
    }
  
  
    const ValidationForm = Yup.object({
    });
    const theme = createTheme({
    palette: {
    primary: green
    }
    });
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
    const checkSelectedItem = (values:any,element:any) =>{
        if(values === undefined){
        return false
        }else{
        return values.indexOf(element) > -1
        }
    }

    const updateUserGroupeId = (value:any) => {
        let data:any = JSON.parse(JSON.stringify(value))
        let result =  data.map((obj:any)=>{
            let elemId = obj.id
            return elemId
        })
        return result
    }

    const userGroupeName = (arrayList:any,value:any) => {
        let result = value.map((obj:any)=>{
            let elementName = ''
            let elementSearch:any = arrayList.find((element:any)=> element.csUserGroupDTO.id === obj)

            if(elementSearch !== undefined){
                elementName = elementSearch.csUserGroupDTO.name
            }
            return elementName
        })
        return result
    }

const UserValueGeneral: React.FC<IUserValue> = (props) => {
    const classes = useStyles()
    const [openConfirmdialog, setOpenDialog] = useState(false);
    const [headerConfirmPopup,setHeaderPopup]= useState<string>("");
    const [contentConfirmPopup,setContentPopup] = useState<string>("");
    const [loadingState,setLoadingState] = useState<any>(false)
    const [errorUpdate,setErrorUpdate] = useState<any>({value:[],id:null})
    const [errorAction,setErrorAction] = useState<any>([])
 
    
    const handleCloseConfirmPopup = () => {
        setOpenDialog(false);
        console.log(errorAction)
    };
    const handleOpenConfirmPopup = () => {
        setHeaderPopup("Delete User")
        setContentPopup("Are you sure, you want to delete User")
        setOpenDialog(true);
    };

    const handleDelete = async () =>{
        props.handleDelete(props.user.id,setLoadingState,setErrorAction)
    }



  return (
    <div style={{display:'flex'}}>
        
        <div className={classes.container_general_value}>
            <div style={{display:'flex',width:'100%'}}>
                <Formik
                        initialValues={{
                            firstName: props.user.firstName,
                            lastName: props.user.lastName,
                            login: props.user.login,
                            mail: props.user.email,
                            groupe:updateUserGroupeId(props.user.userGroupDTOList)
                        }}
                            validationSchema={ValidationForm}
                            onSubmit={values => {    
                                let requestData:any ={
                                    "firstName":values.firstName,
                                    "lastName":values.lastName,
                                    "login":values.login,
                                    "email":values.mail,
                                    "id":props.user.id,
                                    "userGroupIds": values.groupe
                                }
                                let keys:any = Object.keys(requestData)
                                keys.map((element:any,index:any)=>{
                                    if(requestData[element].length === 0 && element !== "id" && element !== "userGroupIds"){
                                        let search:any = errorUpdate.value.find((obj:any) => obj === `${element} is required`)
                                        let data:any = errorUpdate.value
                                        data.push(`${element} is required`)
                                        if(search === undefined){
                                            setErrorUpdate({value:errorUpdate.value,id:props.user.id})
                                        }
                                    }
                                    return element
                                })
                                if(values.firstName.length !== 0 && values.lastName.length !== 0 && values.login.length !== 0 && values.mail.length !== 0){
                                    props.handleUpdate(requestData,setLoadingState,setErrorUpdate)
                                }
                                    
                            }}
                    >
                        {(formik) => {const {values,setFieldValue,handleBlur,dirty,handleReset} = formik;
                        return (
                            <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
                            <div className={classes.Container__div} style={{display:'flex',flexDirection:'row'}}>
                                <div className={classes.userInfo__update}>
                                    <div className={classes.inputContainer}>
                                        <AccessTextField
                                            value={values.firstName} 
                                            id={`UserValue_firstName_index_${props.user.id}`}
                                            fullWidth={true}
                                            handleChange={(event: any)=>{
                                                event.preventDefault() 
                                                setErrorUpdate({value:[],id:null})
                                                setFieldValue('firstName',event.target.value)
                                                setErrorUpdate({value:[],id:null})
                                            }} 
                                            handleBlur={handleBlur}  
                                            key='firstName' 
                                            label="First Name"  
                                            variant="outlined"  
                                            className={classes.nameTextFiled} 
                                            actionType={ ActionAccessMode.WRITE_MODE }
                                        />
                                    </div>
                                    <div className={classes.inputContainer}>
                                        <AccessTextField
                                            value={values.lastName} 
                                            id={`UserValue_lastName_index_${props.user.id}`}
                                            fullWidth={true}
                                            handleChange={(event: any)=>{
                                            event.preventDefault() 
                                            setErrorUpdate({value:[],id:null})
                                            setFieldValue('lastName',event.target.value)
                                            setErrorUpdate({value:[],id:null})
                                            
                                            }} 
                                            handleBlur={handleBlur}  
                                            key='lastName' 
                                            label="Last Name"  
                                            variant="outlined"  
                                            className={classes.nameTextFiled} 
                                            actionType={ ActionAccessMode.WRITE_MODE }
                                        />
                                    </div>
                                    <div className={classes.inputContainer}>
                                        <AccessTextField
                                            value={values.login}
                                            id={`UserValue_login_index_${props.user.id}`}
                                            fullWidth={true}
                                            handleChange={(event: any)=>{
                                                event.preventDefault() 
                                                setErrorUpdate({value:[],id:null})
                                                setFieldValue('login',event.target.value)
                                                setErrorUpdate({value:[],id:null})
                                            }} 
                                            handleBlur={handleBlur}  
                                            key='login' 
                                            label="Login" 
                                            variant="outlined"  
                                            className={classes.nameTextFiled}
                                            actionType={ ActionAccessMode.WRITE_MODE }
                                        />
                                    </div>
                                    <div className={classes.inputContainer}>
                                        <AccessTextField
                                            value={values.mail}
                                            id={`UserValue_mail_index_${props.user.id}`}
                                            fullWidth={true}
                                            handleChange={(event: any)=>{
                                                event.preventDefault() 
                                                setErrorUpdate({value:[],id:null})
                                                setFieldValue('mail',event.target.value)
                                                setErrorUpdate({value:[],id:null})
                                            }} 
                                            handleBlur={handleBlur}  
                                            key='mail' 
                                            label="Email" 
                                            variant="outlined"  
                                            className={classes.nameTextFiled}
                                            actionType={ ActionAccessMode.WRITE_MODE }
                                        />
                                    </div>

                                    <div className={classes.inputContainer}>   
                                    <FormControl className={classes.FormControl} size="small" style={{width: "100%",height:'auto',paddingLeft: "0px"}} >
                                        <InputLabel id='demo-multiple-checkbox-label'>Groupes</InputLabel>
                                        <AccessSelect 
                                            actionType={ActionAccessMode.WRITE_MODE}
                                            className={classes.root}
                                            labelId='demo-multiple-checkbox-label'
                                            id='demo-multiple-checkbox'
                                            multiple={true}
                                            value={values.groupe}
                                            handleChange={(event:any)=>{
                                                setFieldValue('groupe',event.target.value)
                                                setErrorUpdate({value:[],id:null})
                                            }}
                                            input={<OutlinedInput label='Tag' />}
                                            renderValue={(selected:any) => (
                                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.4}}>
                                                    {userGroupeName(props.userGroupe,selected).map((element:any,index:any) => (
                                                    <Chip key={`user_group_chip_${index}`} className={classes.chips}  style={{fontFamily: 'Poppins,sans-serif',height:24,backgroundColor:colors[index]}} label={element} />
                                                    ))}
                                                </Box>
                                                )
                                            }
                                            MenuProps={MenuProps}
                                            children={props.userGroupe.map((element:any,index:any) => (
                                                <MenuItem key={`menu_item_${element.id}_index_${index}`} value={element.csUserGroupDTO.id}>
                                                    <AccessCheckbox
                                                        actionType={ActionAccessMode.WRITE_MODE}
                                                        checked={checkSelectedItem(values.groupe, element.csUserGroupDTO.id)}
                                                    />
                                                    <ListItemText primary={element.csUserGroupDTO.name} />
                                                </MenuItem>
                                                ))
                                            }
                                        />
                                        </FormControl>
                                    </div>
                                </div>
                                <div className={classes.action} style={{height:'100%'}}>
                                        { !loadingState ?
                                            <div style={{display:'flex'}}>
                                                {  !dirty  ?
                                                    <AccessButton 
                                                        id={`btn_delete_user`} 
                                                        actionType={ActionAccessMode.WRITE_MODE} 
                                                        style={{padding:0}}
                                                        color={"primary"}
                                                        ariaLabel={"delete-user"}
                                                        handleClick={handleOpenConfirmPopup}
                                                        iconButton={true}
                                                        theme={themeDeleteButton}
                                                        tooltip={"Delete User"}
                                                    >
                                                         <HighlightOffIcon style={{color:"white"}}/>
                                                    </AccessButton>:
                                                    <div className={classes.users__ations}>
                                                        <Tooltip title={"Cancel"} arrow enterDelay={0} leaveDelay={100}>
                                                            <span>
                                                                <IconButton className={classes.Add__btn} id={`UserValue_update_cancel_index_${props.user.id}`} color="secondary" aria-label="cancelCreation"
                                                                            onClick={()=>{
                                                                                handleReset()
                                                                                setErrorUpdate({value:[],id:null})
                                                                            }}
                                                                >
                                                                <CloseIcon />
                                                            </IconButton>
                                                            </span>

                                                        </Tooltip>
                                                        <AccessButton 
                                                            id={`UserValue_update_confirm_index_${props.user.id}`}
                                                            className={classes.Add__btn}
                                                            actionType={ActionAccessMode.WRITE_MODE} 
                                                            style={{padding:8}}
                                                            color="primary"
                                                            ariaLabel={"confirmCreation"}
                                                            handleClick={()=>{ formik.submitForm(); }}
                                                            iconButton={true}
                                                            theme={theme}
                                                            tooltip={"Confirm"}
                                                        >
                                                            <CheckIcon />
                                                        </AccessButton>
                                                    </div>
                                                }
                                            </div> :
                                            <div className={classes.progress} style={{width:'100%',justifyContent:'flex-end'}}>
                                            <CircularProgress disableShrink size={20}/>   
                                            </div>
                                        }
                                    </div>
                            </div>
                            <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
                                {(errorUpdate.value !== 0 && errorUpdate.id === props.user.id ) &&
                                    errorUpdate.value.map((row:any,index:any)=>
                                        (<Alert severity="error" key={index} className={classes.alert}>
                                        {row}
                                        </Alert>)
                                    )
                                }
                            </div>
                            </div>
                        )
                        }}  
                </Formik>

            </div>
        </div>
    <ConfirmPopup opendialog={openConfirmdialog} headerContent={headerConfirmPopup} contentMessage={contentConfirmPopup} handleClose={handleCloseConfirmPopup} popupMainAction={handleDelete} handleAccordion={()=>{}}/>

    </div>
   
    
  );
};

export default UserValueGeneral;
