import * as React from "react";
import {useState} from "react";
import {IFilter} from "types/models/interface";
import useStyles from "./styles";
import {Formik} from "formik";
import {Box, Button, CircularProgress, IconButton, MenuItem, TextField} from "@material-ui/core";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {SearchOutlined} from "@material-ui/icons";
import DropdownFilter from "../DropdownFilter";
import {filterTypeEnum} from "shared/constants/AppEnums";
import Autocomplete from '@mui/material/Autocomplete';
import { Tooltip } from "@mui/material";



const Filter: React.FC<IFilter> = (props) => {
    const classes = useStyles()
    const [loading, setLoading] = useState<any>(false)
    const [selectedName, setSelectedName] = useState<any>(null);
    const [autoCompleteName, setAutoCompleteName] = useState<string>("null");
    let autoCompleteList = props.list? props.list : []

    const foundDateFilter = (date:any) => {
        let foundDate:any = props.filterData.find((obj:any)=> obj.type === filterTypeEnum.DATE_RANGE)
        if(foundDate !== undefined){
            const originalDateFrom = new Date(date);
            // Get the local timezone offset in minutes
            const timezoneOffsetFrom = originalDateFrom.getTimezoneOffset();
            // Convert to local timezone
            const localDateFrom = new Date(originalDateFrom.getTime() - timezoneOffsetFrom * 60 * 1000);
            // Output the local date
            localDateFrom.setMilliseconds(0);
            return localDateFrom.toISOString()
        }
    }

    const handleChangeName = (newValue:any) => {
        setSelectedName(newValue)
        setAutoCompleteName(newValue)
    }
    const handleInputChange  =  (event:any, newInputValue:any) => {
        if(newInputValue.length >=3){
            props.handleAutocomplete(newInputValue)
        } else {
            autoCompleteList = []
        }
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{...props.stateFilter}}
            onSubmit={(values) => {
                setLoading(true)
                let requestData:any = JSON.parse(JSON.stringify(values))
                if(requestData.fromDate) {
                    requestData.fromDate = foundDateFilter(requestData.fromDate)
                }
                if(requestData.toDate) {
                    requestData.toDate = foundDateFilter(requestData.toDate)
                }
                if(autoCompleteName!==""){
                    requestData.textSearch=autoCompleteName;
                    setAutoCompleteName("")
                }
                props.handleSearch(requestData, setLoading)

            }}
        >
            {(formik) => {
                const {values, setFieldValue, setValues} = formik;
                return (
                    <div className={classes.filterContainer}>
                        <div className={classes.filterContainer_form_element}>
                            {props.filterData.map((elementFilter: any, indexElement: any) => (
                                <div key={indexElement} style={{display: "flex", alignItems: 'center', paddingRight: 8, paddingBottom: 4}}>
                                    {elementFilter.type === filterTypeEnum.TEXT &&
                                        <TextField
                                            size="small"
                                            key={`filter_name`}
                                            id={`textField_filter_${elementFilter.label}`}
                                            disabled={props.stateComponent || props.disabled || elementFilter.disabled}
                                            className={classes.hover}
                                            value={values[elementFilter.name]}
                                            onChange={(event: any) => {
                                                setFieldValue(elementFilter.name, event.target.value)
                                            }}
                                            label={elementFilter.label}
                                            fullWidth
                                            variant="outlined"
                                        />
                                    }
                                    {elementFilter.type === filterTypeEnum.AUTOCOMPLETE &&
                                        <Autocomplete
                                            fullWidth
                                            id="search_name"
                                            options={autoCompleteList}
                                            value={selectedName}
                                            onChange={(event, newValue) => handleChangeName(newValue)}
                                            onInputChange={handleInputChange}
                                            freeSolo
                                            disableClearable
                                            className={classes.autocomplete}
                                            renderInput={(params) => (
                                                <TextField
                                                    className={classes.hover}
                                                    {...params}
                                                    name="name"
                                                    variant="outlined"
                                                    label="Name"
                                                    value={values[elementFilter.name]}
                                                    onChange={(event: any) => {
                                                        setFieldValue(elementFilter.name, event.target.value)
                                                    }}

                                                />
                                            )}
                                            renderOption={(props, option) => (
                                                <MenuItem key={option} {...props} value={option}>
                                                    {option}
                                                </MenuItem>
                                            )}
                                        />
                                    }
                                    {elementFilter.type === filterTypeEnum.TEXT_VERSION &&
                                    <TextField
                                        size="small"
                                        key={`filter_Version`}
                                        id={`textVersion_filter_${elementFilter.label}`}
                                        disabled={props.stateComponent || props.disabled || elementFilter.disabled}
                                        className={classes.hover}
                                        style={{width:100}}
                                        value={values[elementFilter.name]}
                                        onChange={(event: any) => {
                                            const newValue = event.target.value.replace(/[^0-9]/g, "");
                                            if (newValue === "" || parseInt(newValue) > 0) {
                                                setFieldValue(elementFilter.name, newValue);
                                            }
                                        }}
                                        label={elementFilter.label}
                                        fullWidth
                                        variant="outlined"
                                    />

                                    }
                                    {elementFilter.type === filterTypeEnum.TEXT_KEY &&
                                    <TextField
                                        size="small"
                                        key={`filter_Key`}
                                        id={`textKey_filter_${elementFilter.label}`}
                                        disabled={props.stateComponent || props.disabled || elementFilter.disabled}
                                        className={classes.hover}
                                        style={{width:400}}
                                        value={values[elementFilter.name]}
                                        onChange={(event: any) => {
                                            setFieldValue(elementFilter.name, event.target.value)
                                        }}
                                        label={elementFilter.label}
                                        fullWidth
                                        variant="outlined"
                                    />
                                    }
                                    {(elementFilter.type === filterTypeEnum.SELECT_MULTI) &&
                                    <DropdownFilter
                                        key={indexElement}
                                        name={elementFilter.name}
                                        label={elementFilter.label}
                                        handleValue={setFieldValue}
                                        values={elementFilter.values}
                                        selectedValues={values[`${elementFilter.name}`]}
                                        type={elementFilter.type}
                                        search={elementFilter.search}
                                        context={elementFilter.context}
                                        typeFilter={'select-multi'}
                                        disabled={elementFilter.disabled}
                                    />

                                    }
                                    {(elementFilter.type === filterTypeEnum.DATE_RANGE) &&
                                    <DropdownFilter
                                        key={indexElement}
                                        name={elementFilter.name}
                                        label={elementFilter.label}
                                        handleValue={setFieldValue}
                                        values={[values[`fromDate`], values[`toDate`]]}
                                        selectedValues={[values[`fromDate`], values[`toDate`]]}
                                        type={elementFilter.type}
                                        search={elementFilter.search}
                                        context={elementFilter.context}
                                        typeFilter={'select-multi'}
                                        disabled={elementFilter.disabled}
                                    />

                                    }
                                    {(elementFilter.type === filterTypeEnum.SELECT_ONLY_ONE || elementFilter.type === filterTypeEnum.SELECT_ONE) &&
                                    <DropdownFilter
                                        key={indexElement}
                                        name={elementFilter.name}
                                        label={elementFilter.label}
                                        handleValue={setFieldValue}
                                        values={elementFilter.values}
                                        selectedValues={values[`${elementFilter.name}`]}
                                        type={elementFilter.type}
                                        search={elementFilter.search}
                                        context={elementFilter.context}
                                        typeFilter={elementFilter.type}
                                        disabled={elementFilter.disabled}
                                    />

                                    }

                                </div>
                            ))}
                        </div>
                        <div className={classes.filterContainer_action}>
                            {loading &&
                            <div className={classes.progress}>
                                <CircularProgress disableShrink size={20}/>
                            </div>
                            }
                            {!loading &&
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Tooltip title={"Reset Filter"} arrow enterDelay={0} leaveDelay={100}>
                                    <span>
                                        <IconButton id={`btn_reset_filter`}
                                                    disabled={props.stateComponent || props.disabled}
                                                    className={classes.reset} onClick={() => {
                                            setValues(props.resetForm)
                                        }}>
                                        <FilterAltOffIcon fontSize='small' style={{color: '#0A8FDC'}}/>
                                    </IconButton>
                                    </span>

                                </Tooltip>
                                <Box component="div" m={0} className={`${classes.spreadBox}`}
                                     style={{alignItems: "center", justifyContent: 'flex-end', margin: 0, padding: 0,}}>
                                    <Button id={`btn_find_filter`} disabled={props.stateComponent || props.disabled}
                                            startIcon={<SearchOutlined/>} onClick={() => {
                                        formik.submitForm();
                                    }} className={classes.buttonFind}>Find</Button>
                                </Box>
                            </div>
                            }
                        </div>
                    </div>
                )
            }}
        </Formik>
    );
};

export default Filter;


