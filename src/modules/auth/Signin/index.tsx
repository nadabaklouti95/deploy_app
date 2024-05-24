import React from "react";
import SigninJwtAuth from "./SigninJwtAuth";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import IntlMessages from "../../../app/utility/IntlMessages";
import useStyles from "./styles";
import { Fonts } from "../../../shared/constants/AppEnums";


const Signin: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <Box flex={1} display="flex" flexDirection="column" justifyContent="center">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        style={{height:"100%"}}
      >
        <Card className={classes.cardRoot}>
          <div className={classes.loginImg}>
            <img src={'/assets/images/loginImg/loginImg1.jpg'}  alt="Login Page" width="70%"/>
          </div>
          <div  className={classes.loginContent}>
            <div style={{width:"100%", height:"90%"}}>
              <div className={classes.logoTitle}>
                <h1 className={classes.title}><img
                    className={classes.imgRoot}
                    src="/assets/images/logo_small.png"
                    alt="readytotek-logo"
                /></h1>
              </div>
              <Box px={{ xs: 6, sm: 10, xl: 15 }} className={classes.loginTitle}>
                <Box
                    component="h2"
                    mb={{ xs: 3, xl: 6 }}
                    color="text.primary"
                    fontWeight={Fonts.REGULAR}
                    fontSize={{ xs: 24, xl: 26 }}
                >
                  <IntlMessages id="common.login" />
                </Box>
                <p>Please enter your username and password</p>
              </Box>
              <SigninJwtAuth />
            </div>
          </div>


        </Card>
      </Box>
    </Box>
  );
};

export default Signin;
