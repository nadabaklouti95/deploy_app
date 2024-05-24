import {CircularProgress, createTheme, Grid, IconButton } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import * as React from "react";
import useStyles from "./styles";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import SelectMultiple from "shared/components/SelectMultiple";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {green} from "@material-ui/core/colors";
import {Formik} from "formik";
import {Alert} from '@material-ui/lab';
import AccessButton from "shared/components/AccessButton";
import { ActionAccessMode } from "shared/constants/AppEnums";

interface IAddToken {
    stateAddToken: boolean,
    cancelTokenCreation: any,
    actionAddTokenMode: any,
    createToken: any,
    context: any,
    errorAction: any
}

const theme = createTheme({
    palette: {
        primary: green
    }
});


const AddToken: React.FC<IAddToken> = (AddTokenProps) => {
    const classes = useStyles();
    const [contextSelected, setContextSelected] = React.useState<any>([])
    const [selectState, setSelectState] = React.useState(false)
    const [resetState] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [errorContext,setErrorContext] = React.useState({state:false,value:[]})

    const getSelectedContext = (contextName: any) => {
        let result = []
        if (contextSelected !== null) {
            let mainElement = contextSelected.find((obj: any) => obj.key === contextName)
            if (mainElement !== undefined) {
                for (let index = 0; index < mainElement.values.length; index++) {
                    const element = mainElement.values[index];
                    result.push(element)
                }
            }
        }
        return result
    }

    let colors = ["#bad8f3", "#f5d5ce", "#cef5e5"];
    for (var i = 0; i < 100; i++) {
        colors.push("#bad8f3", "#f5d5ce", "#cef5e5");
    }
    // get context value from context and will return array of string ["ALL",.......]
    const getContextValue = (contextName: any) => {
        let result = []
        result.push({value: "ALL", id: 0, color: "#e57373"})
        let mainElement: any = AddTokenProps.context.find((obj: any) => obj.name === contextName)
        if (mainElement !== undefined) {
            result = [{value: "ALL", id: 0, color: "#e57373"}, ...mainElement.values]
        }
        return result
    }


    const updateContextSelected = (jsonData: any) => {
        if ((contextSelected === null) || (contextSelected === undefined)) {
            setContextSelected([jsonData])
        } else {
            if (contextSelected.length === 0) {
                setContextSelected([jsonData])
            } else {

                if (contextSelected.find((item: any) => item.key === jsonData.key) !== undefined) {
                    let data = contextSelected
                    let elementndex = contextSelected.findIndex(((item: any) => item.key === jsonData.key));
                    data[elementndex].values = jsonData.values
                    setContextSelected(data)
                } else {
                    let data = contextSelected
                    data.push(jsonData)
                    setContextSelected(data)
                }
            }
        }

    }

    const cancelCreation = () => {
        AddTokenProps.cancelTokenCreation(false)
    }

    return (
        <React.Fragment>
            <div className={classes.AddToken}>
                <div className={classes.AddToken__content}>
                    <Formik
                        initialValues={{
                            name: "",
                            expiration: new Date()
                        }}                
                        onSubmit={values => {
                            let dataError:any = []
                            const mapContext = new Map();
                            for (let index = 0; index < contextSelected.length; index++) {
                                const element = contextSelected[index];
                                if (element.values.length !== 0) {
                                    let elementKeyId: any = AddTokenProps.context.find((obj: any) => obj.name === element.key)
                                    mapContext.set(elementKeyId.id, element.values)
                                }else{
                                    dataError.push(`Context ${element.key} is required`)
                                }
                            }
                            if(values.name.length === 0){
                                dataError.push(`Name is required`)
                            }
                            if(dataError.length !== 0){
                                setErrorContext({state:true,value:dataError})
                            }
                            else{
                                setErrorContext({state:false,value:[]})
                                let jsonData = {
                                    "expiration": values.expiration,
                                    "name": values.name,
                                    "scope": Object.fromEntries(mapContext)
                                }
                                AddTokenProps.createToken(jsonData, setLoading)
                            }
                        }}
                    >
                        {(formik) => {
                            const {values, handleSubmit, handleBlur, setFieldValue} = formik;
                            return (
                                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', width: "100%"}}>
                                    <div className={classes.AddToken__content__contentToken}>
                                        <Grid container spacing={0} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                            <Grid item xs={12} md={12} sm={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                                <Grid item xs={4} md={4} sm={4} style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <div className={classes.AddToken__content__contentToken__name}>
                                                        <TextField
                                                            id={"token_Name_add"} value={values.name}
                                                            onChange={(event: { target: any }) => {
                                                                setFieldValue('name', event.target.value)
                                                                setSelectState(true)
                                                            }}
                                                            onBlur={handleBlur} key='token_Name' label="Name"
                                                            fullWidth variant="outlined"
                                                            className={classes.hover}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6} md={6} sm={6} style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <div
                                                        className={classes.AddToken__content__contentToken__expirationDate}>
                                                    </div>
                                                    <div
                                                        className={classes.AddToken__content__contentToken__datePIcker}>
                                                        <LocalizationProvider id={"Token_expirationDate"} dateAdapter={AdapterDateFns}>
                                                            <DatePicker
                                                                label="Expiration Date"
                                                                className={classes.datePicker}
                                                                value={values.expiration}
                                                                onChange={(newValue:any) => {
                                                                    setFieldValue('expiration', newValue)
                                                                }}
                                                                renderInput={(params:any) => <TextField
                                                                    id={"Token_input_expirationDate"}
                                                                    className={classes.datePicker} {...params} />}
                                                                minDate={new Date()}
                                                            />
                                                        </LocalizationProvider>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <Grid container spacing={0} className={classes.addTokenContainer} >
                                        {AddTokenProps.context.map((row: any, index: any) => (
                                            <div key={row.id} className={classes.AddToken__content__context}>
                                                <SelectMultiple
                                                    selectState={selectState}
                                                    selectedItem={getSelectedContext(row.name)}
                                                    context={getContextValue(row.name)}
                                                    disabled={false}
                                                    callback={updateContextSelected}
                                                    name={row.name}
                                                    updateSelectState={setSelectState}
                                                    resetState={resetState}
                                                    selectId={`context_${index}`}
                                                />
                                            </div>
                                        ))}
                                    </Grid>
                                    <Grid item xs={12} md={12} sm={12}>
                                        
                                        {(AddTokenProps.errorAction !== null) &&
                                        AddTokenProps.errorAction.map((row: any, index: any) =>
                                            (<Alert severity="error" key={index} className={classes.alert}>
                                                {row}
                                            </Alert>)
                                        )
                                        }
                                        {(errorContext.value.length !== 0) &&
                                        errorContext.value.map((row: any, index: any) =>
                                            (<Alert severity="error" key={index} className={classes.alert}>
                                                {row}
                                            </Alert>)
                                        )
                                        }       
                                    </Grid>
                                    <div className={classes.divider}/>
                                    <div className={classes.AddToken__content__CreateToken}>
                                        {loading === false ?
                                            <div className={classes.AddToken__content__CreateToken__createMode}>
                                                <IconButton id={"cancel__add"} className={classes.AddToken__btn}
                                                    color="secondary" aria-label="cancelCreation"
                                                    onClick={() => {
                                                        cancelCreation()
                                                    }}>
                                                    <CloseIcon/>
                                                </IconButton>
                                                <AccessButton 
                                                    id={`addFile_confirm`}
                                                    className={classes.AddToken__btn}
                                                    actionType={ActionAccessMode.WRITE_MODE} 
                                                    style={{marginRight:4}}
                                                    color="primary"
                                                    ariaLabel={"confirmCreation"}
                                                    handleClick={() => { formik.submitForm(); }}
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
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AddToken;
