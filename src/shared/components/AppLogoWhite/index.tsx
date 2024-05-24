import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from '@mui/material/Hidden';

const AppLogoWhite = () => {
  const useStyles = makeStyles(() => ({
    logoRoot: {
      display: "flex",
      flexDirection: "row",
      cursor: "pointer",
      alignItems: "center",
    },
    logo: {
      height: 36,
      marginRight: 10,
    },
  }));
  const classes = useStyles();
  return (
      <Box className={classes.logoRoot}>
        <Hidden smUp>
          <img
              className={classes.logo}
              src={"/assets/images/logo_small.png"}
              alt="readytotek-logo"
          />
        </Hidden>
        <Hidden xsDown>
          <img
              className={classes.logo}
              src={"/assets/images/logo_small.png"}
              alt="readytotek-logo"
          />
        </Hidden>
      </Box>
  );
};

export default AppLogoWhite;