import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import { Form, Formik, FormikConfig, FormikValues } from "formik";

import React, {useEffect, useRef, useState} from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchStart, fetchSuccess } from "redux/actions/Common";
import Alert from "@material-ui/lab/Alert";
import AccessButton from "shared/components/AccessButton";
import { ActionAccessMode } from "shared/constants/AppEnums";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  footer: {
    padding: theme.spacing(3, 12),
    marginTop: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  stepper: {
    paddingTop: 4,
    paddingBottom: 1,
    border: 1,
  },
  spreadBox: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  box: {
    height: 60,
    display: "flex",

    padding: 14,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 2, 2),
    display: "flex",
    flexDirection: "column",
  },
}));

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}
interface formmpicProps {
  // onCloseDialog: () => void;
  getref: (ref: any) => void;
  apiReturn: any;
}
export function FormikStepper({
  getref,
  children,
  apiReturn,
  ...props
}: FormikConfig<FormikValues> & formmpicProps & { children: React.ReactElement<FormikStepProps>[] }) {
  const childrenArray = children as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [errorContext, setErrorContext] = React.useState<any>(null);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }
  let history = useHistory();

  const formRef: any = useRef();
  React.useEffect(() => {
    getref(formRef);
  });

  const dispatch = useDispatch();

  const classes = useStyles();


  useEffect(() => {
    setErrorContext(apiReturn)
    const timeId = setTimeout(() => {
      setErrorContext([])
      setOpen(false)
    }, 5000)
    return () => {
      clearTimeout(timeId)
    }
  }, [apiReturn])

  return (
    <div className={classes.heroContent}>
      <Formik
        {...props}
        innerRef={formRef}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={async (values, helpers) => {
          if (isLastStep()) {
            values.name = values.name.trim()
            await props.onSubmit(values, helpers);
            setCompleted(true);
          } else {
            setStep((s) => s + 1);

            helpers.setTouched({});
          }
          setTimeout(() => {
            setOpen(true)
          }, 800);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form autoComplete="off">
            <Stepper
              alternativeLabel
              activeStep={step}
              className={classes.stepper}
            >
              {childrenArray.map((child, index) => (
                <Step
                  key={child.props.label}
                  completed={step > index || completed}
                >
                  <StepLabel>{child.props.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Card>{currentChild}</Card>

            {/*apiReturn.map((errApi: any, index: number) => {
              return (
                <Alert severity="error" style={{ width: "100%" }}>
                  {errApi}
                </Alert>
              );
            })*/}

            {errorContext?.length!==0 &&
                <Collapse in={open}>
                  <Alert
                      severity="error"
                      action={
                        <IconButton
                            aria-label="close"
                            size="small"
                            onClick={() => {
                              setOpen(false);
                              setErrorContext([])
                            }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                  >
                    {apiReturn.length===1?apiReturn[0]:"Please confirm the new context"}
                  </Alert>
                </Collapse>
            }

            <Paper>
              <Box
                component="span"
                m={1}
                className={`${classes.spreadBox} ${classes.box}`}
              >
                <Button
                  id="store_cancel"
                  disabled={isSubmitting}
                  variant="outlined"
                  color="secondary"
                  onClick={() => history.push("/store")}
                  style={{ fontSize: "12px" }}
                >
                  Cancel
                </Button>
                <Grid container spacing={1} className={classes.buttons} item xs={10}>
                  {step > 0 ? (
                    <Grid item={true}>
                      <Button
                        id="store_back_step"
                        disabled={isSubmitting}
                        variant="outlined"
                        color="primary"
                        style={{ fontSize: "12px" }}
                        onClick={() => {
                          setStep((s) => s - 1);
                          dispatch(fetchStart());
                          dispatch(fetchSuccess());
                        }}
                      >
                        Back
                      </Button>
                    </Grid>
                  ) : null}
                  <Grid item={true}>
                    <AccessButton 
                      id={`store_confirm`} 
                      disabled={isSubmitting}
                      style={{ fontSize: "12px" }}
                      color="primary"
                      actionType={ActionAccessMode.WRITE_MODE} 
                      type="submit"
                      startIcon={
                        isSubmitting ? <CircularProgress size="1rem" /> : null
                      }
                      variant="outlined"
                    >
                      {isSubmitting
                        ? "Submitting"
                        : isLastStep()
                        ? "Submit"
                        : "Next"}
                    </AccessButton>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Form>
        )}
      </Formik>
    </div>
  );
}
