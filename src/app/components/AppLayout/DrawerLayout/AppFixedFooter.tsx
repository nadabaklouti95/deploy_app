import React, {useContext} from 'react';
import AppContext from '../../../utility/AppContext';
import Box from '@material-ui/core/Box';
import {Button, makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import AppContextPropsType, {AppTheme} from '../../../../types/AppContextPropsType';

interface AppFixedFooterProps {}

const AppFixedFooter: React.FC<AppFixedFooterProps> = () => {
  const {footer, footerType} = useContext<AppContextPropsType>(AppContext);

  const useStyles = makeStyles((theme: AppTheme) => ({
    footer: {
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      zIndex: 99,
      margin: '0',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      '& .footerContainer': {
        padding: '5px 20px',
        [theme.breakpoints.up('md')]: {
          paddingLeft: 32,
          paddingRight: 32,
        },
        [theme.breakpoints.up('xl')]: {
          padding: '10px 32px',
        },
      },
    },
    btnRoot: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  }));

  const classes = useStyles();

  return (
    <>
      {footer && footerType === 'fixed' ? (
        <Box className={clsx(classes.footer, 'footer fixed-footer')}>
          <Box
            className='footerContainer'
            alignItems='center'
            flexDirection='row'
            display='flex'>
            <Box></Box>
            <Box ml='auto'>
              <Button className={classes.btnRoot} color='primary'>
                Buy Now
              </Button>
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default AppFixedFooter;
