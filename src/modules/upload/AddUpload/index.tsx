import { Grid, MenuItem, Select,CircularProgress,IconButton, createTheme, withStyles, Switch } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import useStyles from "./styles";
import SelectMultiple from "shared/components/SelectMultiple";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { green } from "@material-ui/core/colors";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "@material-ui/lab";
import { ActionAccessMode, ETask, TaskTypeId, typeEnum } from "shared/constants/AppEnums";
import { labelField } from "shared/constants/AppCssCons";
import AccessButton from "shared/components/AccessButton";
import AccessSwitch from "shared/components/AccessSwitch";

interface IAddUpload {
  handleUpload:any;
  context:any;
  CancelUpload:any;
  TagList:any;
  errorAction:any;
  loading:any;
} 
const theme = createTheme({
  palette: {
  primary: green
  }
});
const ValidationForm = Yup.object({
  
});

const StrategySwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: 'white',
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: '#ffd68d',
        borderColor: '#ffd68d',
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid none`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "#7396e5",
  },
  checked: {},
}))(Switch);


const AddUpload: React.FC<IAddUpload> = (props) => {
  const classes = useStyles()
  const [fileNames, setFileNames] = useState<any>([]);
  const [strategie,setStrategie] = React.useState<any>(false)
  const [contextSelected,setContextSelected] = React.useState<any>([])
  const [selectState,setSelectState]= React.useState(false)
  const [resetState] = React.useState<boolean>(false)
  const [errorForm,setErrorForm] =React.useState<any>({state:false,value:[]}) 

  const getSelectedContext = (contextName:any)=>{      
    let result = []
    if(contextSelected !==null){
        let mainElement = contextSelected.find((obj:any) => obj.key === contextName)
    if(mainElement !== undefined){
        for (let index = 0; index < mainElement.values.length; index++) {
            const element = mainElement.values[index];
            result.push(element)
        }}}
    return result
  } 
  let colors = ["#bad8f3", "#f5d5ce", "#cef5e5"];
  for (var i = 0; i < 100; i++) {
    colors.push("#bad8f3", "#f5d5ce", "#cef5e5");
  }
  const getContextValue = (contextName:any)=>{
    let result = []
    result.push({value:"ALL",id:0,color:"#e57373"})
    let mainElement:any = props.context.find((obj:any) => obj.name=== contextName)
    if(mainElement !== undefined){
        result = [{value:"ALL",id:0,color:"#e57373"},...mainElement.values]
    }
    return result
  }
  const updateContextSelected = (jsonData:any)=>{
    
    if((contextSelected === null)|| (contextSelected === undefined)){
      setContextSelected([jsonData])
    }else{
    if(contextSelected.length === 0){
      setContextSelected([jsonData])
    }
    else{
        if(contextSelected.find((item:any) => item.key === jsonData.key)!==undefined){
            let data = contextSelected
            let elementndex = contextSelected.findIndex(((item:any) => item.key === jsonData.key));
            data[elementndex].values = jsonData.values
            setContextSelected(data)
        }else{
            let data = contextSelected
            data.push(jsonData)
            setContextSelected(data)
        }
    }
    }
  
  }
  const handleDrop = (acceptedFiles:any) => {
    setFileNames(acceptedFiles)
  }
  
  return (
    <div className={classes.addContainer}>
      <Formik
        initialValues={{
          StrategyType: false,
          file: "",
          typeId:false,
          tag:false 
          }}
            validationSchema={ValidationForm}
            onSubmit={values => {
              let dataError:any = []
              let tagId:any = props.TagList.find((element:any)=> values.tag === element.name)
              
              let state:any = false
              if(tagId === undefined){
                dataError.push("Tag is required")
                setErrorForm({state:true,value:dataError})
                state = true
              }
              if(fileNames.length === 0){
                dataError.push("File is required")
                setErrorForm({state:true,value:dataError})
                state = true
              }
              for (let index = 0; index < contextSelected.length; index++) {
                let element:any = contextSelected[index];
                if(element.values.length === 0){
                  dataError.push(`Context ${element.key} is required`)
                  
                }
                
              }
              setErrorForm({state:true,value:dataError})
              
              if(state === false){
                let scopeData:any = contextSelected.filter((element:any)=> element.values.length !== 0)
                setErrorForm({state:true,value:[]})
                let strategy:any = values.StrategyType === true ? "SKIP" : "REPLACE";
                let typeData:any = values.typeId === true ? typeEnum.FUNCTIONAL : typeEnum.TECHNICAL
                let taskType:any = TaskTypeId.UPLOAD
                let bodyFormData = new FormData();
                bodyFormData.append("fileUploadTaskDTO.propertiesTypeId",typeData);
                bodyFormData.append("fileUploadTaskDTO.strategyType",strategy);
                bodyFormData.append("file",fileNames[0]);
                bodyFormData.append("typeId",taskType);
                bodyFormData.append("fileUploadTaskDTO.tagId",tagId.id);
                let scopeDataSorted = scopeData.sort(function(a:any, b:any){  
                  let elementA:any = props.context.find((element:any)=>element.name === a.key) 
                  let elementB:any = props.context.find((element:any)=>element.name === b.key)
                  return elementA.priority - elementB.priority
                });
                for (let index = 0; index < scopeDataSorted.length; index++) {
                  let element:any = scopeData[index];
                  let elementKeyId:any = props.context.find((obj:any)=> obj.name === element.key)
                  bodyFormData.append(`contextIdsMap[${elementKeyId.id}]`,element.values);
                }
                props.handleUpload(bodyFormData)
              } 
            }}
        >
          {(formik) => {const {values,setFieldValue} = formik;
          return (
            <>
              <Grid item xs={12} md={12} sm={12} style={{display:"flex"}}>
                <Grid item xs={3} md={3} sm={3} style={{display:"flex"}}>
                  <div className={classes.dragZone}>
                    <Dropzone
                      onDrop={handleDrop}
                    >
                      {({
                        getRootProps,
                        getInputProps,
                        isDragActive,
                        isDragAccept,
                        isDragReject
                      }) => {
                        const additionalClass = isDragAccept
                          ? "accept"
                          : isDragReject
                          ? "reject"
                          : "";

                        return (
                          <div
                            {...getRootProps({ id: 'Add_File_container',
                              className: `dropzone ${additionalClass} ${classes.dragZoneContainer}`
                            })}
                          >
                            <input id={`Add_File_input`} {...getInputProps()} />
                            <div  id={`Add_File_input`} className={classes.dragZone__icon}>
                              <FileUploadIcon/>
                            </div>
                            <div id={`Add_File_fileName`} style={{width:'100%',display:'flex',justifyContent:'flex-start'}}>
                              {fileNames.length === 0 ? "Click here to Select file":  fileNames[0].name}
                            </div>
                          </div>
                        );
                      }}
                    </Dropzone>
                  </div>
                </Grid>
                <Grid item xs={9} md={9} sm={9} style={{display:"flex",flexDirection:'row',padding: "13px 20px",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:'center',width:'100%',flexWrap:'wrap',justifyContent:'space-evenly'}}>
                    
                      <div className={classes.strategy__container}>
                        <div className={classes.strategy} style={labelField}>Strategy :</div>
                        <div className={classes.strategy__switch}>
                          <StrategySwitch 
                            id='strategy_file'
                            checked={strategie} 
                            onChange={(event: any ) => { 
                              event.preventDefault() 
                              setStrategie(event.target.checked)}} 
                            name="checkedT" 
                            value={strategie}/>
                        </div>
                        <div className={classes.strategy__value}>
                          {strategie === true ? "Skip" : "Replace"}
                        </div>
                      </div>
                    
                    
                      <div className={classes.type_container}>
                        <div className={classes.type} style={labelField}>Type:</div>
                          <div className={classes.type_switch}>
                            <AccessSwitch
                              actionType={ActionAccessMode.EXECUTE_MODE}
                              id='Type_file'
                              checked={values.typeId} 
                              handleChange={(event: any ) => { 
                                setFieldValue('typeId',event.target.checked)
                              }} 
                              name="checkedT" 
                              value={values.typeId}/>
                          </div>
                        <div className={classes.type_value}>
                          {values.typeId === true ? "FUNCTIONAL" : "TECHNICAL"}
                        </div>
                      </div>
                   
                  
                      <div className={classes.tag__container}>
                        <div className={classes.tag} style={labelField}>Tag :</div>
                        <div className={classes.tag__select}>
                          <Select 
                            id={'select_tag'}
                            labelId="select-label"
                            value={values.tag} 
                            className={classes.root} 
                            onChange={(newValue) => {
                              setFieldValue('tag',newValue.target.value)
                              setErrorForm({state:true,value:[]})
                            }}
                            variant="outlined" inputProps={{ "aria-label": "Without label", }}>
                              {props.TagList.map((tag: any, index: number) => (
                                <MenuItem key={tag.name} id={`MenuItem_tag_index_${index}`} value={tag.name}>
                                  {tag.name}
                                </MenuItem>
                              ))}
                            </Select>
                        </div>
                      </div>
                    
                  </div>
                  
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} sm={12} style={{display:"flex",justifyContent:'space-between',alignItems:'center',flexWrap:'wrap'}}>
                <div className={classes.contextContainer}>
                  {props.context.map((row:any,index:any)=>(
                    <div key={row.id} className={classes.upload__content__context}>
                      <SelectMultiple 
                        selectState={selectState}
                        selectedItem={getSelectedContext(row.name)}
                        context={getContextValue(row.name)}
                        disabled={false}
                        callback={updateContextSelected}
                        name={row.name}
                        updateSelectState={setSelectState}
                        resetState={resetState} 
                        selectId={`context_${index}`}/>
                    </div>
                  ))}
                </div>
                <div className={classes.upload__ations}>
                  { props.loading === false ?
                    <div className={classes.upload__ations}>
                      <IconButton id={`addFile_cancel`} className={classes.Add__btn} color="secondary" aria-label="cancelCreation" onClick={()=>{props.CancelUpload(false)}}>
                        <CloseIcon />
                      </IconButton>
                      <AccessButton 
                        taskName={ETask.UPLOAD}
                        id={`addFile_confirm`}
                        className={classes.Add__btn}
                        actionType={ActionAccessMode.EXECUTE_MODE} 
                        style={{marginRight:4}}
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
                    <div className={classes.progress}>
                      <CircularProgress disableShrink size={20}/>   
                    </div>
                  }
                </div>  
              </Grid>
              <Grid item xs={12} md={12} sm={12}>
                {errorForm.state &&
                  errorForm.value.map((row:any,index:any)=>
                    (
                    <Alert severity="error" className={classes.alert}>
                      {row}
                    </Alert>
                    )
                  )
                }
                {(props.errorAction !== null) &&
                  props.errorAction.map((row:any,index:any)=>
                    (<Alert severity="error" key={index} className={classes.alert}>
                      {row}
                      </Alert>)
                    )
                  }
                  </Grid>
            </>
          )}}  
      </Formik>
    </div>
  );
  
};
export default AddUpload;
