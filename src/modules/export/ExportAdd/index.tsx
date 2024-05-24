import * as React from "react";
import { IExportAdd } from "types/models/interface";
import useStyles from "./styles";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { Formik } from 'formik';
import { green } from '@material-ui/core/colors';
import {CircularProgress, createTheme, IconButton, ListItemText, TextField, Typography } from '@material-ui/core';
import { Alert, FormControl, MenuItem } from '@mui/material';
import { ActionAccessMode, ETask, TaskTypeId, typeStoreEnum } from "shared/constants/AppEnums";
import { labelField } from "shared/constants/AppCssCons";
import { TypeListEnum } from "shared/constants/AppConst";
import * as Yup from "yup";
import AccessButton from "shared/components/AccessButton";
import AccessCheckbox from "shared/components/AccessCheckbox";
import AccessSelect from "shared/components/AccessSelect";
import { Tooltip } from '@material-ui/core';


  const theme = createTheme({
    palette: {
    primary: green
    }
  });


const checkSelectedItem = (values:any,element:any) =>{
  if(values === undefined){
    return false
  }else{
    return values.indexOf(element) > -1
  }
}
  const ExportAdd: React.FC<IExportAdd> = (props) => {
    const classes = useStyles();
    const [errorAction,setErrorAction] = React.useState<any>([])
    const getContextValue = (contextId:any)=>{
      let result: any[] = []
      let mainElement:any = props.context.find((obj:any) => obj.name === contextId)
      if(mainElement !== undefined){
          result = [...mainElement.values]
      }
      return result
      
    }
    const handleContext = (value:any,contextName:any,contextValue:any)=>{
      let result = contextValue;
      let indexData:any = contextValue.findIndex((element:any) => element.key === contextName)
      if(indexData !== (-1)){
        result[indexData].value = value
      }
      return result
    } 
    const getSelectedValue = (context:any,name:any) =>{
      let data:any = context;
      let result:any = '';
      let found = data.find((element:any) => element.key === name)
      if(found !== undefined){
        result = found.value
      }
      return result
    }
    const getContextFormik = (listContext:any) => {
      let data:any = []
      listContext.forEach((element:any)=>{
        data.push({
          "key":element.name,
          "value": null
        })
      })
      return data
    }
    let type = props.store.typeId === typeStoreEnum.PROPERTIES ? ".properties" : ".yaml"
    

    const validationCreationPropertySchema = Yup.object({
      context: Yup.array().of(
          Yup.object().shape({
              key: Yup.string().required('Context key is required'),
              value: Yup.string().required('Context value is required'),
          })
      ).required('At least one context element is required'),
  });


  const truncateName  = (name: any) => name.length > 16 ? `${name.slice(0, 16)}...` : name;


    return (
      <React.Fragment>
        <Formik
            enableReinitialize={false}
            initialValues={{
              "store": props.store.id,
              "fileName":`${props.store.name}${type}`,
              "tag": "Latest",
              "outputType":"File",
              "typeId": [],
              "context":JSON.parse(JSON.stringify(getContextFormik(props.context)))
          }}
            validationSchema={validationCreationPropertySchema}
            onSubmit={(values:any) => {
              let requestData:any = {
                  "typeId":TaskTypeId.EXPORT,
                  "fileExportTaskDTO": {
                      "tagId":"Latest"
                  },  
                  "propertiesTypes":[] ,       
                  "contextIdMap":{}
                }
              requestData.propertiesTypes = values.typeId ;
              requestData.fileExportTaskDTO.tagId = values.tag
                const mapContext = new Map();
                for (let index = 0; index < values.context.length; index++) {
                  const element = values.context[index];
                  let elementKeyId:any = props.context.find((obj:any)=> obj.name === element.key)
                  mapContext.set(elementKeyId.id,element.value)
                }
                requestData.contextIdMap = Object.fromEntries(mapContext)
              props.action.add(requestData,values.fileName,setErrorAction)
            }}
        >
          {(formik) => {const {values,setFieldValue,errors,touched} = formik;
                return (
                  <div style={{display:'flex',width:'100%',flexDirection:'column'}} className={classes.containerForm}>
                    <div className={classes.container}>
                        <div className={classes.container_mainInformation_div}>
                          <div className={classes.container_mainInformation_body} style={{display:'flex',marginRight:16,alignItems:'center'}}>
                            <div className={classes.container_mainInformation_fileName}>
                              <TextField 
                                fullWidth 
                                id={`file_new_name`}
                                name="file_name" 
                                value={values.fileName} 
                                onChange={(event: any ) => { 
                                  setFieldValue('fileName',event.target.value );
                                }} 
                                size="small"  
                                label='File Name' 
                                variant='outlined' 
                                className={classes.textFiledKeyList }
                              />  
                            </div>
                            <div className={classes.container_mainInformation_child}>
                              <div className={classes.container_mainInformation_tag}>
                                <div className={classes.container_mainInformation_tag_label} style={labelField}>Tag</div>
                                <div className={classes.container_mainInformation_tag_select}>
                                  <FormControl size="small" style={{  paddingLeft: "4px",minWidth: "140px", maxWidth: "140px" }} >
                                    <AccessSelect 
                                      actionType={ActionAccessMode.EXECUTE_MODE}
                                      labelId="select-label" 
                                      id="select_new_tag" 
                                      value={values.tag} 
                                      className={classes.root} 
                                      handleChange={(event:any)=>{
                                        setFieldValue('tag',event.target.value)
                                        setErrorAction([])
                                      }} 
                                      variant="outlined" 
                                      inputProps={{ "aria-label": "Without label", }}
                                      children={props.tags.map((rowItem: any, index: number) => (
                                        <MenuItem id={`select_new_tag_menuItem_${index}`} key={rowItem.name} value={rowItem.name}>
                                          {rowItem.name}
                                        </MenuItem>
                                      ))}
                                    />
                                  </FormControl>
                                </div>
                              </div>
                              <div className={classes.container_mainInformation_type}>
                                <div className={classes.container_mainInformation_type_label} style={labelField}>Type</div>
                                <div className={classes.container_mainInformation_type_check}>
                                  <FormControl size="small" style={{  paddingLeft: "4px",minWidth: "140px", maxWidth: "140px" }} >
                                    <AccessSelect 
                                      actionType={ActionAccessMode.EXECUTE_MODE}
                                      id={`select_type`}
                                      multiple 
                                      displayEmpty 
                                      value={values.typeId} 
                                      className={classes.root} 
                                      handleChange={(event:any)=>{
                                        setFieldValue('typeId',event.target.value);
                                        setErrorAction([])
                                      }} 
                                      variant="outlined" 
                                      inputProps={{ "aria-label": "Without label" }}
                                      renderValue={(selecteds:any) => {
                                        if(selecteds === undefined){ return ""}
                                          else{
                                          if ((selecteds as string[]).length === 0) {
                                            return "";
                                          }
                                          let slectedData:any = selecteds.map((elementSelected:any)=>{
                                            let element:any =  TypeListEnum.find((obj)=> obj.key === elementSelected)
                                            return element.value
                                          })
                                          let data = (slectedData as string[]).join(", ");
                                          return data  
                                        }  
                                      }} 
                                      children={TypeListEnum.map((typeExport:any,indexType:any) => (
                                        <MenuItem id={`select_type_menuItem_${indexType}`} key={typeExport.key} value={typeExport.key}>
                                          <AccessCheckbox
                                            actionType={ActionAccessMode.EXECUTE_MODE}
                                            id={`select_type_menuItem_checkbox_${indexType}`}
                                            checked={checkSelectedItem(values.typeId,typeExport.key)}
                                            color="primary"  
                                            inputProps={{ "aria-label": "secondary checkbox", }} 
                                          />
                                          <ListItemText id={`select_type_menuItem_listItemText_${indexType}`} primary={typeExport.value} />
                                        </MenuItem>
                                      ))

                                      } 
                                    />
                                    </FormControl>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                        <div className={classes.container_mainInformation_context}>
                        {  props.context.map((elementContext:any,indexContext:any)=>(
                          <div key={indexContext} className={classes.export_selectMultiple}> 
                            <div style={{display:'flex',marginRight:4,alignItems:'center'}}>
                              <Typography style={labelField}>{truncateName(elementContext.name)}</Typography>
                            </div>
                            <FormControl size="small" style={{  paddingLeft: "4px",paddingRight:8,minWidth: "140px", maxWidth: "140px" }} >
                                <AccessSelect 
                                  actionType={ActionAccessMode.EXECUTE_MODE}
                                  labelId="select-label" 
                                  id={`select_elementContext_${indexContext}`}
                                  value={getSelectedValue(values.context,elementContext.name)} 
                                  className={classes.root} 
                                  handleChange={(event:any)=>{
                                    let data:any = handleContext(event.target.value ,elementContext.name,values.context)
                                    setFieldValue('context',data)
                                    setErrorAction([])
                                  }} 
                                  variant="outlined" 
                                  inputProps={{ "aria-label": "Without label", }}
                                  children={getContextValue(elementContext.name).map((rowItem: any, indexContextValue: number) => (
                                    rowItem.value.length>16 ?
                                    <Tooltip title={rowItem.value} arrow enterDelay={0} key={`tooltip${rowItem.id}_index_${indexContextValue}`}>
                                      <MenuItem id={`select_elementContext_${indexContext}_menuItem_${indexContextValue}`} key={rowItem.id} value={rowItem.id}>
                                        {truncateName(rowItem.value)}
                                      </MenuItem>
                                    </Tooltip>
                                    :
                                      <MenuItem id={`select_elementContext_${indexContext}_menuItem_${indexContextValue}`} key={rowItem.id} value={rowItem.id}>
                                        {rowItem.value}
                                      </MenuItem>
                                    
                                  ))}
                                />
                              </FormControl>
                          </div>    
                          ))}  
                        </div>
                          
                      </div>
                      <div className={classes.container_SecondaryInformation_action}>
                        { props.loading === false ?
                          <div className={classes.publish__ations}>
                            <IconButton id={`cancel_export_cancel`} className={classes.Add__btn} color="secondary" aria-label="cancelCreation" onClick={()=>{props.action.cancel()}}>
                                <CloseIcon />
                            </IconButton>
                            <AccessButton
                              taskName={ETask.EXPORT} 
                              id={`add_export_confirm`}
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
                    </div>
                    <div className={classes.PropertyKey_form_alert}>
                      {errors.context && touched.context && values.context.map((contextItem:any, index:any) => (
                          <div key={`context-error-${index}`}>
                            {contextItem.value === null && (
                                <Alert severity="error" className={classes.alert}>
                                    {`context ${truncateName(contextItem.key)} is required`}
                                </Alert>
                            )}
                          </div>
                      ))}
                      
                       
                      {(errorAction.length !== null) &&
                        errorAction.map((row:any,index:any)=>
                          (<Alert severity="error"  style={{width:'100%'}} key={index} className={classes.alert}>
                            {row}
                          </Alert>
                          )
                      )}
                    </div>
                  </div>
           )
          }}  
      </Formik> 
      </React.Fragment>
    )};
  export default ExportAdd;


  