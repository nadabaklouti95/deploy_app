import * as React from "react";
import useStyles from "./styles";
import { CircularProgress,IconButton,ThemeProvider, createTheme } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "@material-ui/lab";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { green } from "@material-ui/core/colors";
import TextField from '@mui/material/TextField';
import { Tooltip } from "@mui/material";

    interface IUserValue {
        handleUpdate:any;
        user:any;
    } 
    const theme = createTheme({
        palette: {
        primary: green
        }
        });
  
  
    const ValidationForm = Yup.object({
    });
   
    const updateUserGroupeId = (value:any) => {
        let data:any = JSON.parse(JSON.stringify(value))
        let result =  data.map((obj:any)=>{
            let elemId = obj.id
            return elemId
        })
        return result
    }
    

const UserValuePassword: React.FC<IUserValue> = (props) => {
    const classes = useStyles()
    const [loadingUpdate,setLoadingUpdate] = React.useState<any>({id:null,state:false})
    const [errorUpdate,setErrorUpdate] = React.useState<any>({id:null,state:false})

  return (
    <>
        <div className={classes.container_general_value}>
            <div style={{display:'flex',width:'100%'}}>
                <Formik
                    enableReinitialize={false}
                        initialValues={{
                            firstName: props.user.firstName,
                            lastName: props.user.lastName,
                            login: props.user.login,
                            mail: props.user.email,
                            password: "",
                            confirmPassword: "",
                            groupe:updateUserGroupeId(props.user.userGroupDTOList)
                        }}
                            validationSchema={ValidationForm}
                            onSubmit={values => {    
                                let requestData:any ={
                                    "firstName":values.firstName,
                                    "lastName":values.lastName,
                                    "login":values.login,
                                    "email":values.mail,
                                    "password":values.password,
                                    "confirmPassword":values.confirmPassword,
                                    "id":props.user.id,
                                    "userGroupIds": values.groupe
                                }
                                let keys:any = Object.keys(requestData)
                                keys.map((element:any,index:any)=>{
                                    if(requestData[element].length === 0 && element !== "id" && element !== "userGroupIds" && element !== "currentPassword"){
                                        let search:any = errorUpdate.value.find((obj:any) => obj === `${element} is required`)
                                        let data:any = errorUpdate.value
                                        data.push(`${element} is required`)
                                        if(search === undefined){
                                            setErrorUpdate({value:errorUpdate.value,id:props.user.id})
                                        }
                                    }
                                    return element
                                })
                                if(values.password.length !== 0 && values.confirmPassword.length !== 0  ){
                                    props.handleUpdate(requestData,setLoadingUpdate,setErrorUpdate)
                                }
                                    
                            }}
                    >
                        {(formik) => {const {values,setFieldValue,dirty,handleReset} = formik;
                        return (
                            <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
                            <div className={classes.Container__div} style={{display:'flex',flexDirection:'row'}}>
                                <div className={classes.userInfo__update}>
                                    <div className={classes.inputContainer}>
                                        <TextField 
                                            id={`UserValue_passsword_index_${props.user.id}`}
                                            value={values.password} 
                                            fullWidth={true}
                                            inputProps={{
                                                autoComplete: 'new-password',
                                            }}
                                            onChange={(event: any)=>{
                                                setFieldValue('password',event.target.value)
                                                setErrorUpdate({value:[],id:null})
                                            }}   key='Password_user' label="Password" type='password' variant="outlined"  className={classes.nameTextFiled} 
                                            
                                        /> 
                                    </div>
                                    <div className={classes.inputContainer}>
                                        <TextField
                                            id={`UserValue_confirmPassword_index_${props.user.id}`}
                                            value={values.confirmPassword} 
                                            fullWidth={true}
                                            onChange={(event: any)=>{
                                                setFieldValue('confirmPassword',event.target.value)
                                                setErrorUpdate({value:[],id:null})
                                            }}   key='confirmPassword' label="Confirm Password" type='password' variant="outlined"  className={classes.nameTextFiled} 
                                        /> 
                                    </div>
                                </div>
                                <div className={classes.action} >
                                        { (loadingUpdate.id !== props.user.id && !loadingUpdate.state ) ?
                                            <div style={{display:'flex'}}>
                                                {dirty  &&
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
                                                        <ThemeProvider theme={theme}>
                                                            <Tooltip title={"Confirm"} arrow enterDelay={0} leaveDelay={100}>
                                                                <span>
                                                                    <IconButton id={`UserValue_update_confirm_index_${props.user.id}`} className={classes.Add__btn} style={{marginRight:4}} color="primary" aria-label="confirmCreation" onClick={()=>{ formik.submitForm(); }} >
                                                                        <CheckIcon />
                                                                    </IconButton>
                                                                </span>

                                                            </Tooltip>
                                                        </ThemeProvider> 
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
    </>
   
    
  );
};

export default UserValuePassword;
