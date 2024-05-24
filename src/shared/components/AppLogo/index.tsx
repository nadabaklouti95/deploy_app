import React, { useContext } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../../../app/utility/AppContext";
import { ThemeMode } from "../../constants/AppEnums";
import Hidden from '@mui/material/Hidden';
import AppContextPropsType from "../../../types/AppContextPropsType";

const AppLogo = () => {
  const { themeMode } = useContext<AppContextPropsType>(AppContext);
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

      <Hidden xsDown>
        <img
          className={classes.logo}
          src={
            themeMode === ThemeMode.DARK
              ? "/assets/images/logo_small.png"
              : "/assets/images/logo_small.png"
          }
          alt="configstore-logo"
        />
      </Hidden>
    </Box>
  );
};

export default AppLogo;
