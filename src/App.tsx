import React from 'react';
import {Provider} from 'react-redux';
//import {ConnectedRouter} from 'connected-react-router';
import AppLayout from 'app/components/AppLayout';
import AuthRoutes from 'app/utility/AuthRoutes';
import LocaleProvider from 'app/utility/LocaleProvider';
import AppThemeProvider from 'app/utility/AppThemeProvider';
import AppStyleProvider from 'app/utility/AppStyleProvider';
import ContextProvider from 'app/utility/ContextProvider';

import configureStore, {history} from './redux/store';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Router } from 'react-router-dom';
import RouteGuard from 'shared/components/RouteGuard';
import { UserProvider } from 'shared/hooks/UserContext';
import AxiosErrorHandler from 'shared/hooks/AxiosErrorHandler';

const store = configureStore();

const App = () => (
  
  <ContextProvider>
    <Provider store={store}>
      <AppThemeProvider>
        <AppStyleProvider>
          <LocaleProvider>
            {/*
            <ConnectedRouter history={history}>
              <AuthRoutes>
                <CssBaseline />
                <AppLayout />
              </AuthRoutes>
            </ConnectedRouter>*/}

            <Router history={history}>
              <AuthRoutes>
                <UserProvider>
                  <AxiosErrorHandler>
                  <RouteGuard>
                  </RouteGuard>
                  <CssBaseline />
                  <AppLayout />
                  </AxiosErrorHandler>
                  </UserProvider>
              </AuthRoutes>
            </Router>

          </LocaleProvider>
        </AppStyleProvider>
      </AppThemeProvider>
    </Provider>
  </ContextProvider>
  
);

export default App;
