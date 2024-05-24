import React from "react";
import Step2 from "../Step2";
import Step1 from "../Step1";
import { FormikStep, FormikStepper } from "./stepper";

import {useDispatch, useSelector} from "react-redux";
import {  loadStore, saveStore } from "redux/actions/Store";

import { useHistory } from "react-router-dom";
import jwtAxios from "app/services/auth/jwt-auth/jwt-api";
import { fetchError, fetchStart, LoadCombo } from "redux/actions";
import { errorsType } from "modules/store/EditStore";

import {  toast } from 'react-toastify';
import {AppState} from "../../../../redux/store";
import { loadWorkspace } from "redux/actions/Workspace";




export default function GetStepContent() {
  const [reference, setReference] = React.useState([]);
  //const [stateErreur,setStateErreur] = React.useState<any>("")
  const [apiReturn, setApiErrors] = React.useState<errorsType[]>([]);

  const getrefdata = (refValue: any) => {
    setReference(refValue);
  };

  //console.log(stateErreur)

  const dispatch = useDispatch();

  let history = useHistory();

  const notify = (storeName : String) => toast.success("Store "+storeName+" is created",{autoClose: 3000,theme :"colored" });

  const workspaces = useSelector((state: AppState) => state.workspaces.workspaceslist);
  const cookieName = "selectedWorkspace";
  const initialValue = document.cookie.split("; ").reduce((acc, cur) =>cur.split("=")[0] === cookieName ? `${acc}${cur.split("=")[1]}` : acc,"");
  const selectedWS = workspaces.find((element: any) => element.workSpaceDTO.name === initialValue);

  return (
    <React.Fragment>
      <main>
        <FormikStepper
          initialValues={{
            name: "",
            type: "",
            version: "",
            description: "",
            priority: "",
            contextvalues: [],

            testingformik: [],
            cvalues: [],
          }}
          onSubmit={async (values) => {
            let Tbl = [];
            let err = [];
            for (var i = 0; i < values.testingformik.length; i++) {
              var CK = {
                description: values.description,
                id: null,
                name: values.testingformik[i].name,
                priority: i + 1,
                storeId: null,
                values: values.testingformik[i].value,
              };
              if (CK.values.length === 0) {
                err.push(CK);
              }
              Tbl.push(CK);
            }

            var myJSON:any = {
              contextKeys: Tbl,
              store: {
                description: values.description,
                id: null,
                name: values.name,
                typeId: values.type,
                version: 0,
                workspace: {id:selectedWS?.workSpaceDTO.id}
              },
            };
            /*console.log('myJSON ',myJSON)
            if (err.length > 0) {
              if (err.length === 1) {
                setStateErreur(`No context values were found for context key :${err[0].name}.`);
              }
              if (err.length > 1) {
                let arr = [];
                for (let i = 0; i < err.length; i++) {
                  arr.push(err[i].name);
                }
                var showKeysSpace = arr.join(", ");
                setStateErreur(`No context values were found for context keys : ${showKeysSpace}.`);
              }
            } else {
              console.log('before action ',myJSON)*/
              try {
                const res = await jwtAxios.post(
                  "cs-store/create-store",
                  myJSON
                );
                if (res && (res.status === 201 || res.status === 200)) {
                  //setStateErreur(``);
                  dispatch(saveStore());
                  dispatch(LoadCombo(myJSON.store.name));
                  dispatch(loadStore())
                  dispatch(loadWorkspace())

                  setTimeout(async () => {
                    await history.push("/store");

                    toast.dismiss();
                    notify(myJSON.store.name);

                  }, 500);
                  
                  // window.location.reload();
                }
              } catch (err:any) {
                if (err.response.data.status === 491 || err.response.data.status === 490 ) {
                  setApiErrors(err.response.data.errors);
                } else {
                  dispatch(fetchStart());
                  dispatch( fetchError( `  ${err.response.data.status} occurred, please contact your administrator.` as string ) );
                }
              }
          }}
          getref={getrefdata}
          apiReturn={apiReturn}
        >
          <FormikStep label="Store">
            <Step1 />
          </FormikStep>
          <FormikStep label="Context">
            <Step2 reference={reference} />
          </FormikStep>
        </FormikStepper>
      </main>
    </React.Fragment>
  );
}
