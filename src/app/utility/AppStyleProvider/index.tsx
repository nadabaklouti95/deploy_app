import React from 'react';
import {create} from 'jss';
import rtl from 'jss-rtl';
import {jssPreset, StylesProvider} from '@material-ui/core/styles';
// Configure JSS
const jss = create({plugins: [...jssPreset().plugins, rtl()]});

//const AppStyleProvider: React.FC<React.ReactNode> = props => {
const AppStyleProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <StylesProvider jss={jss}>{/*props.children*/}{children}</StylesProvider>;
};
export default AppStyleProvider;
