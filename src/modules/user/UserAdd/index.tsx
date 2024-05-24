import { CircularProgress,IconButton, createTheme } from "@material-ui/core";
import * as React from "react";
import useStyles from "./styles";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "@material-ui/lab";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { green } from "@material-ui/core/colors";
import { Box, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput } from "@mui/material";
import AccessCheckbox from "shared/components/AccessCheckbox";
import { ActionAccessMode } from "shared/constants/AppEnums";
import AccessTextField from "shared/components/AccessTextField";
import AccessSelect from "shared/components/AccessSelect";
import AccessButton from "shared/components/AccessButton";

interface IUserAdd {
  store:any;
  errorAction:any;
  loading:any;
  handleAdd:any;
  cancelAdd:any;
  userGroupe:any;
} 

    let colors = ["#bad8f3", "#f5d5ce", "#cef5e5"];
    for (var i = 0; i < 100; i++) {
        colors.push("#bad8f3", "#f5d5ce", "#cef5e5");
    }



    const theme = createTheme({ palette: { primary: green}});

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

const UserAdd: React.FC<IUserAdd> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.addContainer}>
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                login:"",
                mail:"",
                password:"",
                confirmPassword:"",
                groupe:[]
            }}
            validationSchema={Yup.object()}
            onSubmit={values => {    
                let requestData={
                    "firstName":values.firstName,
                    "lastName":values.lastName,
                    "login":values.login,
                    "email":values.mail,
                    "password":values.password,  
                    "confirmPassword":values.confirmPassword,
                    'id':null,
                    "userGroupIds": values.groupe
                }
                props.handleAdd(requestData)
             }}
                >
                    {(formik) => {const {values,setFieldValue} = formik;
                    return (
                        <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
                        <div className={classes.Container__div}>
                            <div className={classes.userInfo__update}>
                                <div className={classes.inputContainer}>
                                    <AccessTextField
                                        fullWidth={true}
                                        id={`addUser_firstName`}
                                        value={values.firstName}
                                        handleChange={(event: any)=>{
                                            setFieldValue('firstName',event.target.value)
                                            props.errorAction.action(null)
                                        }}
                                        key='firstName' label="First Name"   variant="outlined"  className={classes.nameTextFiled}
                                        actionType={ ActionAccessMode.WRITE_MODE }
                                    />
                                </div>
                                <div className={classes.inputContainer}>
                                    <AccessTextField
                                        fullWidth={true}
                                        id={`addUser_lastName`}
                                        value={values.lastName}
                                        handleChange={(event: any)=>{
                                            setFieldValue('lastName',event.target.value)
                                            props.errorAction.action(null)
                                        }}
                                        key='lastName' label="Last Name"   variant="outlined"  className={classes.nameTextFiled}
                                        actionType={ ActionAccessMode.WRITE_MODE }
                                    />
                                </div>
                                <div className={classes.inputContainer}>
                                    <AccessTextField
                                        fullWidth={true}
                                        value={values.login} 
                                        handleChange={(event: any)=>{
                                        setFieldValue('login',event.target.value)
                                        props.errorAction.action(null)
                                        }}   key='login' label="Login" id={`addUser_login`} variant="outlined"  className={classes.nameTextFiled} 
                                        actionType={ ActionAccessMode.WRITE_MODE }
                                    />
                                </div>
                                <div className={classes.inputContainer}>
                                    <AccessTextField
                                        value={values.mail} 
                                        fullWidth={true}
                                        handleChange={(event: any)=>{
                                        setFieldValue('mail',event.target.value)
                                        props.errorAction.action(null)
                                        }}   key='mail' label="Email" type="email" id={`addUser_mail`} variant="outlined"  className={classes.nameTextFiled} 
                                        actionType={ ActionAccessMode.WRITE_MODE }
                                    />
                                </div>
                                <div className={classes.inputContainer}>
                                    <AccessTextField
                                        value={values.password} 
                                        fullWidth={true}
                                        handleChange={(event: any)=>{
                                        setFieldValue('password',event.target.value)
                                        props.errorAction.action(null)
                                        }}  key='password' label="Password"   type='password' id={`addUser_password`} variant="outlined"  className={classes.nameTextFiled}
                                        actionType={ ActionAccessMode.WRITE_MODE }
                                    />
                                </div>
                                <div className={classes.inputContainer}>
                                    <AccessTextField
                                        value={values.confirmPassword} 
                                        fullWidth={true}
                                        handleChange={(event: any)=>{
                                        setFieldValue('confirmPassword',event.target.value)
                                        props.errorAction.action(null)
                                        }}   key='confirmPassword' label="Confirm Password"   type='password' id={`addUser_confirmPassword`} variant="outlined"  className={classes.nameTextFiled} 
                                        actionType={ ActionAccessMode.WRITE_MODE }
                                    /> 
                                </div>
                                <div className={classes.inputContainer}>   
                                <FormControl className={classes.FormControl} size="small" style={{width: "100%",minHeight:20,paddingLeft: "0px",marginTop : "4px"}} >
                                    <InputLabel id='demo-multiple-checkbox-label'>Groupes</InputLabel>
                                    <AccessSelect 
                                        actionType={ActionAccessMode.WRITE_MODE}
                                        className={classes.root}
                                        labelId='demo-multiple-checkbox-label'
                                        id={`addUser_Groupes`}
                                        multiple={true}
                                        value={values.groupe}
                                        handleChange={(event:any)=>{setFieldValue('groupe',event.target.value) }}
                                        input={<OutlinedInput id={`addUser_input_Groupes`} label='Tag' />}
                                        MenuProps={MenuProps}
                                        renderValue={(selected:any) => (
                                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.4}}>
                                                {selected.map((element:any,index:any) => (
                                                <Chip className={classes.chips} id={`addUser_Chip_Groupes_index${index}`} style={{fontFamily: 'Poppins,sans-serif',height:24,backgroundColor:colors[index]}} key={element.csUserGroupDTO.id} label={element.csUserGroupDTO.name} />
                                                ))}
                                            </Box>
                                            )
                                        }
                                        children={props.userGroupe.map((element:any,index:any) => (
                                            <MenuItem id={`addUser_MenuItem_index${index}`}  key={element.csUserGroupDTO.id} value={element}>
                                                <AccessCheckbox
                                                    actionType={ActionAccessMode.WRITE_MODE}
                                                    id={`addUser_Checkbox_index${index}`} 
                                                    checked={values.groupe.find((obj:any)=>obj.csUserGroupDTO.name === element.csUserGroupDTO.name) === undefined ? false :true}
                                                />
                                                <ListItemText id={`addUser_ListItemText_index${index}`} primary={element.csUserGroupDTO.name} />
                                            </MenuItem>
                                            ))
                                        }
                                    />
                                    </FormControl>
                                </div>
                                <div className={classes.inputContainer} >
                                    { props.loading === false ?
                                        <div className={classes.users__ations} style={{width:'100%',justifyContent:'flex-end'}}>
                                        <IconButton id={`addUser_cancel`} className={classes.Add__btn} color="secondary" aria-label="cancelCreation" onClick={()=>{props.cancelAdd(false)}}>
                                            <CloseIcon />
                                        </IconButton>
                                        <AccessButton 
                                            id={`addUser_confirm`}
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
                                        </div> :
                                        <div className={classes.progress} style={{width:'100%',justifyContent:'flex-end'}}>
                                        <CircularProgress disableShrink size={20}/>   
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{display:'flex',width:'100%',flexDirection:'column'}}>
                            {(props.errorAction.value !== null) &&
                            props.errorAction.value.map((row:any,index:any)=>
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
  )
};

export default UserAdd;