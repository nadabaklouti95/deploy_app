import React, {CSSProperties, ReactNode} from 'react';
import Scrollbar from '../Scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {alpha} from '@material-ui/core';
import {AppTheme} from 'types/AppContextPropsType';

export const useAppsContentStyles = makeStyles((theme: AppTheme) => ({
  appsContentContainer: (props: {
    isDetailView: boolean;
    fullView: boolean;
  }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100% - ${props.isDetailView ? 60 : 115}px)`,
    [theme.breakpoints.up('sm')]: {
      height: `calc(100% - ${props.fullView ? 0 : 60}px)`,
    },
    [theme.breakpoints.up('xl')]: {
      height: `calc(100% - ${props.fullView ? 0 : 77}px)`,
    },
    '& .scrum-absolute': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    },
    '& .scrum-row': {
      display: 'inline-flex',
      minWidth: '100%',
      height: '100%',
      marginLeft: '-10px',
      marginRight: '-10px',
    },
    '& .scrum-col': {
      minWidth: '280px',
      maxWidth: '280px',
      marginLeft: '10px',
      marginRight: '10px',
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      backgroundColor: alpha(theme.palette.background.paper, 0.45),
      height: '100% !important',
      [theme.breakpoints.up('md')]: {
        minWidth: '354px',
        maxWidth: '354px',
      },
    },
    '& .scroll-scrum-item': {
      height: 'auto !important',
    },
  }),
}));

interface AppsContentProps {
  isDetailView?: boolean;
  fullView?: boolean;
  style?: CSSProperties;
  children: ReactNode;

  [x: string]: any;
}

const AppsContent: React.FC<AppsContentProps> = ({
  isDetailView = false,
  fullView = false,
  style = {},
  children,
}) => {
  const classes = useAppsContentStyles({
    isDetailView,
    fullView,
  });
  return (
    <Scrollbar className={classes.appsContentContainer} style={style}>
      {children}
    </Scrollbar>
  );
};

export default AppsContent;
