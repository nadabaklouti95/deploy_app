import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {IDropdownfilter} from "types/models/interface";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Checkbox, Icon, TextField, Typography} from "@material-ui/core";
import useStyles from "./styles";
import DatePicker, {CalendarContainer} from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import {filterTypeEnum} from "shared/constants/AppEnums";
//import {green, grey} from "@material-ui/core/colors";

const checkSelectedItems = (label: any, typeFilter: any, context: any, ContextName: any, listValue: any, values: any) => {
    try {
        let labelValue:any = label.toLowerCase()
        let element: any = labelValue.includes('tag') ? values.name : values.value
        let result = false;
        if (typeFilter === filterTypeEnum.SELECT_MULTI) {
            if (context) {
                if (listValue.length !== 0) {
                    let indexKeyElement: any = listValue.findIndex((obj: any) => obj.key === ContextName)
                    if (indexKeyElement !== (-1)) {
                        let searchValueElement: any = listValue[indexKeyElement].values.find((obj: any) => obj === values)
                        if (searchValueElement !== undefined) {
                            result = true;
                        }
                    }
                }
            }
            if (!context) {
                if (listValue.length !== 0) {
                    let valueElement: any = listValue.find((obj: any) => obj === element)
                    if (valueElement !== undefined) {
                        result = true;
                    }
                }
            }
        } else if (typeFilter === filterTypeEnum.SELECT_ONE || typeFilter === filterTypeEnum.SELECT_ONLY_ONE) {
            if (context) {
                if (listValue.length !== 0) {
                    let indexKeyElement: any = listValue.findIndex((obj: any) => obj.key === ContextName)
                    if (indexKeyElement !== (-1)) {
                        let searchValueElement: any = listValue[indexKeyElement].values.find((obj: any) => obj === element)
                        if (searchValueElement !== undefined) {
                            result = true;
                        }
                    }
                }
            }
            if (!context) {
                if (listValue.length !== 0) {
                    let valueElement: any = listValue.find((obj: any) => obj === element)
                    if (valueElement !== undefined) {
                        result = true;
                    }
                }
            }
        }
        return result
    } catch (error) {
            return false
    }
}
const handleValueState = (label: any, typeFilter: any, context: any, ContextName: any, listValue: any, values: any, checked: any) => {
    let labelValue:any = label.toLowerCase()
    let element: any = labelValue.includes('tag')  ? values.name : values.value

    let prevState = [...listValue];
    if (typeFilter === filterTypeEnum.SELECT_MULTI) {
        if (context) {
            if (listValue.length === 0) {
                prevState = [{'key': ContextName, 'values': [values]}]
            } else {
                let elementIndex = listValue.findIndex((item: any) => item.key === ContextName)
                if (elementIndex !== (-1)) {
                    let dataset = listValue
                    let elementValue = listValue[elementIndex].values.find((item: any) => item === values);

                    if (elementValue === undefined) {
                        dataset[elementIndex].values.push(values)
                    } else {
                        dataset[elementIndex].values = dataset[elementIndex].values.filter((obj: any) => obj !== values)
                    }

                    prevState = dataset
                } else {
                    prevState.push({'key': ContextName, 'values': [values]})
                }
            }
        } else {
            if (listValue.length === 0) {
                prevState = [element]
            } else {

                let dataset = listValue
                let elementValue = dataset.find((item: any) => item === element);

                if (elementValue === undefined) {
                    dataset.push(element)
                } else {
                    dataset = dataset.filter((obj: any) => obj !== element)
                }
                prevState = dataset
            }
        }
    } else {
        if (context) {
            if (listValue.length === 0) {
                prevState = [{'key': ContextName, 'values': [element]}]
            } else {
                let elementIndex = listValue.findIndex((item: any) => item.key === ContextName)
                if (elementIndex !== (-1)) {
                    let dataset = listValue
                    let elementValue = listValue[elementIndex].values.find((item: any) => item === element);

                    if (elementValue === undefined) {
                        dataset[elementIndex].values = [element]
                    } else {
                        dataset[elementIndex].values = dataset[elementIndex].values.filter((obj: any) => obj !== element)
                    }

                    prevState = dataset
                } else {
                    prevState = [{'key': ContextName, 'values': [element]}]
                }
            }
        } else {
            if (listValue.length === 0) {
                prevState = [element]
            } else {

                let dataset = listValue
                let elementValue = dataset.find((item: any) => item === element);

                if (elementValue === undefined) {
                    dataset = [element]
                } else {
                    if (typeFilter === filterTypeEnum.SELECT_ONE) {
                        dataset = dataset.filter((obj: any) => obj !== element)
                    }
                }
                prevState = dataset
            }
        }
    }
    return prevState
}
const MyContainer: React.FC<any> = ({className, children}) => {
    return (
        <div style={{color: "#fff"}}>
            <CalendarContainer className={className}>
                <div style={{display: 'flex'}}>{children}</div>
            </CalendarContainer>
        </div>
    );
};

const DropdownFilter: React.FC<IDropdownfilter> = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState<any>("")
    const [valuesList, setValuesList] = useState<any>([]);
    const [showCntxtValues, setShowCntxtValues] = useState<any>([]);

    let menuRef: any = useRef();

  const handleClick = (indexContext:any) => {
    if (showCntxtValues.includes(indexContext)) {
      const updatedValues = showCntxtValues.filter((value:any) => value !== indexContext);
      setShowCntxtValues(updatedValues);
    } else {
      const updatedValues = [...showCntxtValues, indexContext];
      setShowCntxtValues(updatedValues);
    }
  }


  const handleSearch = (context: any, values: any) => {
        setSearch(values)
        let dataList = JSON.parse(JSON.stringify(props.values))
        console.log(dataList)
        let label:any = props.label.toLowerCase()
        if (label.includes('tag')) {
            let result = dataList.filter((obj: any) => obj.name.toUpperCase().includes(values.toUpperCase()))
            setValuesList(result)
        } else {
            let result = dataList.filter((obj: any) => obj.value.includes(values))
            setValuesList(result)
        }
    }


    const getItemName = (value:any,elementFilter:any) =>{
        if(value !== null && value !== undefined){
            let label:any = props.label.toLowerCase()
            return label.includes('tag') ? elementFilter.name : elementFilter.value
        }
        return ""
    }

    const getNumberSelectedItem = () => {
        if(props.selectedValues === undefined){
            return 0
        }else{
        if (props.label !== 'Context') {
            if (props.label === 'Date') {
                if (props.selectedValues[0]  && props.selectedValues[1] ) {
                    return 2
                } else if (props.selectedValues[0]  && !props.selectedValues[1] ) {
                    return 1
                } else if (!props.selectedValues[0]  && props.selectedValues[1] ) {
                    return 1
                } else {
                    return 0
                }
            } else {
                return props.selectedValues.length > 9 ? '+9' : props.selectedValues.length

            }
        } else {
            if (props.selectedValues.length !== 0) {
                let result = 0;
                for (let index = 0; index < props.selectedValues.length; index++) {
                    const element = props.selectedValues[index];
                    result = result + element.values.length
                }
                return result === 0 ? 0 : result
            } else {
                return 0
            }
        }
    }
    }

    useEffect(() => {
        let handler = (e: any) => {
            if(menuRef.current !== null){
                if (!menuRef.current.contains(e.target)) {
                    setOpen(false);
                }
            }
        };

        document.addEventListener("mousedown", handler);


        return () => {
            document.removeEventListener("mousedown", handler);
        }

    });

    useEffect(() => {
        let handler = (e: any) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);


        return () => {
            document.removeEventListener("mousedown", handler);
        }

    });

    useEffect(() => {
        if (props.values.length !== 0) {
            setValuesList(props.values)
        }
    }, [props.values])

    const handleOpen = () => {
        if (props.disabled) {
            setOpen(false)
        } else {
            setOpen(!open)
        }
    }


    useEffect(() => {
        if (props.disabled) {
            setOpen(false)
        }
    }, [props.disabled])


  useEffect(() => {
    if (props.context) {
      setShowCntxtValues(props.context.map((val:any, index:any) => index));
    }
  }, [props.context]);

    return (
        <div style={{display: 'block'}} ref={menuRef}>
            <div id={`menu_filter_${props.name}`} className={open ? classes.menu_trigger_active : classes.menu_trigger}
                 onClick={handleOpen}>
                <div className={classes.dropdownLabel}>
                    <div className={classes.dropdownLabel_value}>
                        {props.label}
                    </div>
                    {getNumberSelectedItem() !== 0 &&
                    <div className={classes.dropdown_nbr_selectedItem}>
                        <Typography style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 300,
                            fontSize: "0.75rem"
                        }}> {getNumberSelectedItem()} </Typography>
                    </div>
                    }

                </div>
                <div className={classes.dropdownIcon}>
                    {!open && <KeyboardArrowDownIcon/>}
                    {open && <KeyboardArrowUpIcon/>}
                </div>
            </div>

            <div style={{width: props.type === filterTypeEnum.DATE_RANGE ? '280px' : '200px'}}
                 className={open ? classes.dropdown_menu_active : classes.dropdown_menu_inactive}>
                <div className={classes.dropdown_container}>

                    {props.search &&
                    <div className={classes.dropdown_container_mainInfo}>

                        <TextField value={search} fullWidth={true} id={`menu_filter_search_${props.label}`}
                                   key='searchFilter' placeholder="Search" variant="outlined"
                                   style={{display: "flex", alignItems: "center", minWidth: 160}}
                                   className={classes.FilterName}
                                   onChange={(event: any) => {
                                       handleSearch(false, event.target.value)

                                   }}
                        />
                    </div>
                    }
                    {props.type === filterTypeEnum.DATE_RANGE &&
                    <div className={classes.dropdown_container_mainInfo_date} style={{marginTop: 8}}>
                        <div className={classes.date_container}>
                            <div className={classes.label_date}>From :</div>
                            <div className={classes.input_date}>
                                <DatePicker
                                    id={`date_picker_fromDate`}
                                    className={classes.datePicker}
                                    selected={props.values[0]}
                                    onChange={(date) => props.handleValue('fromDate', date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    calendarContainer={MyContainer}
                                    wrapperClassName="DatePicker"
                                />
                            </div>
                        </div>
                        <div className={classes.date_container}>
                            <div className={classes.label_date}>To :</div>
                            <div className={classes.input_date}>
                                <DatePicker
                                    id={`date_picker_toDate`}
                                    className={classes.datePicker}
                                    selected={props.values[1]}
                                    onChange={(date) => {
                                        props.handleValue('toDate', date)}}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    calendarContainer={MyContainer}
                                    minDate={props.values[0]}
                                />
                            </div>
                        </div>
                        <div></div>
                    </div>
                    }
                    {props.type !== filterTypeEnum.DATE_RANGE &&
                    <div className={classes.dropdown_container_mainInfo}>
                        {(props.context !== null && props.context !== undefined) &&
                        <div className={classes.dropdown_context}>
                            {props.context.map((context: any, indexContext: number) => {

                              return(
                                <div key={indexContext}>
                                    <div className={classes.dropdown_context_key}
                                         style={{marginTop: indexContext !== 0 ? "10px" : "0px"}}>
                                      <div style={{display:"flex", alignItems:"center"}}>
                                        <Icon onClick={() => handleClick(indexContext)}  style={{ color: "rgba(10, 143, 220, 0.75)" , fontSize: "18px", cursor:"pointer" } }
                                        >
                                          {showCntxtValues.includes(indexContext) ? "remove_circle" : "add_circle_outline"}

                                        </Icon>

                                        <div style={{marginLeft:"10px"}}>{context.name}</div>

                                      </div>

                                    </div>

                                  {showCntxtValues.includes(indexContext) &&
                                  <div>
                                    {context.values.map((contextKey: any, indexContextKey: any) => (
                                        <div key={indexContextKey} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                          <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Checkbox
                                                id={`menu_filter_${indexContext}_index_${indexContextKey}`}
                                                color="primary"
                                                checked={checkSelectedItems(props.label, props.typeFilter, true, context.name, props.selectedValues, contextKey.value)}
                                                value={checkSelectedItems(props.label, props.typeFilter, true, context.name, props.selectedValues, contextKey.value)}
                                                size='small'
                                                className={classes.checkbox}
                                                onChange={(event: any) => {
                                                  let data: any = handleValueState(props.label, props.typeFilter, true, context.name, props.selectedValues, contextKey.value, event.target.checked)
                                                  props.handleValue(`${props.name}`, data)
                                                }}
                                            />
                                          </div>
                                          <div style={{width: '100%', padding: 4}}>
                                            {contextKey.value}
                                          </div>
                                        </div>

                                    ))}</div>
                                  }
                                </div>
                            )})}
                        </div>
                        }
                        {props.context === null &&
                        <div>
                            {valuesList.map((elementFilter: any, indexContext: number) => (
                                <div key={indexContext} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <Checkbox
                                            id={`menu_filter_${props.label}_index_${indexContext}`}
                                            color="primary"
                                            checked={checkSelectedItems(props.label, props.typeFilter, false, null, props.selectedValues, elementFilter)}
                                            value={checkSelectedItems(props.label, props.typeFilter, false, null, props.selectedValues, elementFilter)}
                                            className={classes.checkbox} size='small'
                                            onChange={(event: any) => {
                                                let data: any = handleValueState(props.label, props.typeFilter, false, null, props.selectedValues, elementFilter, event.target.checked)
                                                props.handleValue(`${props.name}`, data)
                                            }}
                                        />
                                    </div>
                                    <div style={{width: '100%', padding: 4}}>
                                        {getItemName(props.label,elementFilter)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        }
                    </div>
                    }
                </div>

            </div>
        </div>

    )
};


export default DropdownFilter;
