import React from 'react';
import IntlMessages from '../../../app/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {grey} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppAnimate from 'app/components/AppAnimate';

const useStyles = makeStyles(() => {
  return {
    button: {
      fontWeight: Fonts.BOLD,
      fontSize: 16,
      textTransform: 'capitalize',
    },
    image: {
      width: '100%',
    },
  };
});
const Error403 = () => {

  const classes = useStyles();

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box
        py={{xl: 8}}
        flex={1}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        textAlign='center'>
        <Box
          mb={{xs: 4, xl: 8}}
          width='100%'
          maxWidth={{xs: 200, sm: 300, xl: 706}}>
          <img
            className={classes.image}
            src={'/assets/images/errorPageImages/403.png'}
            alt='404'
          />
        </Box>
        <Box mb={{xs: 4, xl: 5}}>
          <Box
            mb={{xs: 3, xl: 10}}
            fontSize={{xs: 20, md: 24}}
            fontWeight={Fonts.BOLD}>
            <IntlMessages id='error.404Error' />.
          </Box>
          <Box
            mb={{xs: 4, xl: 10}}
            color={grey[600]}
            fontSize={16}
            fontWeight={Fonts.MEDIUM}>
            <Typography>
              <IntlMessages id='error.message1' />
            </Typography>
            <Typography>
              <IntlMessages id='error.message2' />
            </Typography>
          </Box>
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default Error403;
