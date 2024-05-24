import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import InfoView from 'app/components/InfoView';
import {onJwtSignIn} from '../../../redux/actions';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../app/utility/IntlMessages';
import {useIntl} from 'react-intl';
import { useUser } from 'shared/hooks/UserContext';
import useStyles from "./styles";

const MyTextField = (props: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  username: yup.string().required('username required'),
  password: yup.string().required('Password required'),
});

interface UserSigninProps {}

const SigninJwtAuth: React.FC<UserSigninProps> = props => {
  const dispatch = useDispatch();
  const {messages} = useIntl();
  const classes = useStyles(props);
  
// Use the useUser hook within the component
const userProvider = useUser();

  const updateUserProvider = (userData:any) => {
    if (userProvider && userProvider.updateUser) {
      userProvider.updateUser(userData);
    }
  };

  return (
    <Box flex={1} display='flex' flexDirection='column' padding="40px">
      <Box
        px={{xs: 6, sm: 10, xl: 15}}
        pt={8}
        flex={1}
        display='flex'
        flexDirection='column'>
        <Formik
          validateOnChange={true}
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (data, {setSubmitting}) => {
            setSubmitting(true);
          try {
            const response = await dispatch(onJwtSignIn({username: data.username, password: data.password, rememberMe:false}));
            // Assuming the response contains user data after a successful login
            console.log(response)
            if (response !== undefined) {
              updateUserProvider(response); // Update UserProvider
            }
          } catch (error) {
            // Handle login error
          } finally {
            setSubmitting(false);
          }
          }}>
          {({isSubmitting}) => (
            <Form className={classes.formRoot} noValidate autoComplete='off'>
              <Box marginBottom={20} mb={{xs: 5, xl: 8}}>
                <MyTextField
                  placeholder={messages['common.email']}
                  name='username'
                  label={<IntlMessages id='common.email' />}
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
              </Box>

              <Box style={{marginBottom:20}} mb={{xs: 3, lg: 4}}>
                <MyTextField
                  type='password'
                  placeholder={messages['common.password']}
                  label={<IntlMessages id='common.password' />}
                  name='password'
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
              </Box>

              <Box marginBottom={20}
                mb={6}
                display='flex'
                flexDirection={{xs: 'column', sm: 'row'}}
                alignItems={{sm: 'center'}}
                justifyContent={{sm: 'space-between'}}>
                <Button
                  id="login"
                  variant='contained'
                  color='secondary'
                  type='submit'
                  disabled={isSubmitting}
                  className={classes.btnRoot}>
                  <IntlMessages id='common.login' />
                </Button>

              </Box>
            </Form>
          )}
        </Formik>
      </Box>

      <InfoView />
    </Box>
  );
};

export default SigninJwtAuth;
