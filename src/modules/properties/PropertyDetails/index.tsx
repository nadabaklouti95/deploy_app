import * as React from 'react';
import {useEffect, useState} from 'react';
import useStyles from "./styles"
import {ActionMode} from 'shared/constants/AppEnums';
import { PropertyDetailsProps } from 'types/models/interface';
import PropertyKey from '../PropertyKey';
import PropertyValue from '../PropertyValue';
import ConfirmPopup from 'shared/components/ConfirmPopup';

import {Button, Divider, Icon} from "@material-ui/core";
import { green } from '@material-ui/core/colors';


let colors = ["#bad8f3", "#f5d5ce", "#cef5e5"];
    for (var i = 0; i < 100; i++) {
        colors.push("#bad8f3", "#f5d5ce", "#cef5e5");
    }

const PropertyDetails : React.FC<PropertyDetailsProps>= (props) => {
    const classes = useStyles();
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [headerDialog,setHeaderDialog]= useState<string>("");
    const [contentDialog,setContentDialog] = useState<string>("");
    const [addStatus,setAddStatus] = useState<boolean>(false)
    const [addValueStatus,setAddValueStatus] = useState<any>(props.addValueState)
    const [cancelValueState,setCancelValueState] = useState<any>(true)





    const getAllContext = (arrayList:any)=>{
        let indexColor = 0;
        let newResult:any = arrayList.map((element:any)=>{
            element.values = element.values.map((elementContext:any)=>{
                elementContext.color = colors[indexColor]
                indexColor++;
                return elementContext
            })
            return element
        })
        return newResult
    }

    const handleOpenConfirmPopup = () => {
        setHeaderDialog("Delete Property")
        setContentDialog("Are u sure u want to delete this key?")
        setOpenConfirmDialog(true);
    };
    const handleCloseConfirmPopup = () => {
        handleOpenConfirmPopup()
        setOpenConfirmDialog(false);
    };
    const addNewValue = ()=>{
        setTimeout(() => {
            if(props.addValueState===false){
                setAddValueStatus(false)
            }
        }, 800)
    }
    const add = ()=>{

        if(props.addValueState===false || props.addValueState===null){
            setAddValueStatus(true)
        }
        setAddStatus(true);
        props.changeStatusValue(true)
        setCancelValueState(true)

    }
    const deleteAccordion = ()=>{   
    }

    const cancelCreation = ()=>{
        setAddValueStatus(false)
        setAddStatus(false);
        setAddValueStatus(false)
        props.changeStatusValue(false)
        setCancelValueState(false)
    }

    useEffect(() => {

        setCancelValueState(props.addValueState)
        setAddValueStatus(props.addValueState)
    }, [props.addValueState]);


    return(
        <div className={props.headerActionState === ActionMode.DISPLAY_MODE ? classes.propertiesDetails_dispaly : classes.propertiesDetails_create} style={{display:'flex',width:'100%'}}>
            <div className={classes.ProportyDetails}>
                <div className={classes.ProportyDetails__header} style={{display:'flex',flexDirection:'column'}}>
                    <PropertyKey
                        handleCreate={props.handleKey} 
                        handleUpdate={props.handleKey} 
                        handleDelete={handleOpenConfirmPopup}
                        propertyKey={props.csPropertyKey}
                        Loading={false} 
                        state={props.headerActionState} 
                        cancelCreate={props.cancelCreationAction} 
                        storeType={props.storeType} 
                        selectedTag={props.selectedTag} 
                        handleNewPropertyKey={props.handleNewPropertyKey}  
                        handlePropertyFiler={props.handlePropertyFiler}   
                        modeView={props.modeView}  
                        indexProperty={props.indexElement}
                        publishProperty={props.publishProperty}
                        updateValue={props.updateValue}
                    />
                </div>
                <Divider className={classes.divider}/>
                <div className={classes.csPropertyKey__contextKeys}>
                    <div className={classes.ProportyDetails__values}>
                        {props.csPropertyKey.contextKeys.length === 0 ? 
                            <></>
                            : <>
                                {props.csPropertyKey.contextKeys.map((row:any,index:any)=>(
                                    <div key={row.id}>
                                        <PropertyValue
                                            value={row}
                                            context={getAllContext(props.initialContext)}
                                            key={row.id}
                                            headerMode={props.headerActionState}
                                            actionMode={ActionMode.DISPLAY_MODE}
                                            deletePropertyValue={props.deleteValue}
                                            handleAction={props.handleValue}
                                            cancelCreation={cancelCreation}
                                            updateActionMode={addNewValue} KeyId={props.csPropertyKey.keyID}   
                                            storeType={props.storeType}    
                                            indexProperty={props.indexElement}
                                            publishProperty={props.publishProperty}
                                            updateValue={props.updateValue}
                                            indexValue={index}
                                        />

                                        {(props.csPropertyKey.contextKeys.length !== index ? true : false ) && <Divider className={classes.divider} />  }
                                    </div>      
                                ))}
                            </>
                        }
                        </div>


                    {props.csPropertyKey.fullIdList!==null && props.modeView?
                        <>
                            {((props.addValueState && cancelValueState )|| addValueStatus) &&
                                <div className={classes.ProportyDetails__values}>
                                    <PropertyValue
                                        value={{ context: [], value: "", id: null }}
                                        context={getAllContext(props.initialContext)}
                                        key={props.csPropertyKey.keyID}
                                        headerMode={props.headerActionState}
                                        actionMode={ActionMode.CREATION_MODE}
                                        deletePropertyValue={props.deleteValue}
                                        handleAction={props.handleValue}
                                        cancelCreation={cancelCreation}
                                        updateActionMode={addNewValue}
                                        KeyId={props.csPropertyKey.keyID}
                                        storeType={props.storeType}
                                        indexProperty={props.indexElement}
                                        publishProperty={props.publishProperty}
                                        updateValue={props.updateValue}
                                        indexValue={null}
                                    />
                                </div>
                            }
                        </>

                        :
                        <>
                        {addStatus && props.stateValue  &&
                            <div className={classes.ProportyDetails__values}>
                                <PropertyValue
                                    value={{ context: [], value: "", id: null }}
                                    context={getAllContext(props.initialContext)}
                                    key={props.csPropertyKey.keyID}
                                    headerMode={props.headerActionState}
                                    actionMode={ActionMode.CREATION_MODE}
                                    deletePropertyValue={props.deleteValue}
                                    handleAction={props.handleValue}
                                    cancelCreation={cancelCreation}
                                    updateActionMode={addNewValue}
                                    KeyId={props.csPropertyKey.keyID}
                                    storeType={props.storeType}
                                    indexProperty={props.indexElement}
                                    publishProperty={props.publishProperty}
                                    updateValue={props.updateValue}
                                    indexValue={null}
                                />     
                            </div>
                        }
                        </>

                    }

                        <div className={classes.ProportyDetails__action}>
                            <Button id={`add_value_${props.indexElement}`} fullWidth  className={classes.boardStylekey} disabled={(props.headerActionState === ActionMode.CREATION_MODE) ? true: false} onClick={add}>
                                <Icon style={ { color: green[500] }}>add_circle</Icon>
                                Add new Value
                            </Button>
                        </div>
            </div>
                <ConfirmPopup opendialog={openConfirmDialog} headerContent={headerDialog} contentMessage={contentDialog} handleAccordion={deleteAccordion} handleClose={handleCloseConfirmPopup} popupMainAction={props.deleteKey(props.csPropertyKey.keyID,ActionMode.DELETE_MODE)}/>

            </div>
        </div>
        
    )
}
export default PropertyDetails
