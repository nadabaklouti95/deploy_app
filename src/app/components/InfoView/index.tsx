import React from 'react';
import {useSelector} from 'react-redux';
import {AppState} from 'redux/store';
import Loader from "../Loader"
import MessageView from "../MessageView"


interface InfoViewProps {}

const InfoView: React.FC<InfoViewProps> = () => {
  const {error, loading, message} = useSelector<AppState, AppState['common']>(
    ({common}) => common,
  );

  const showMessage = () => {
    return <MessageView variant='success' message={message.toString()} />;
  };

  const showError = () => {
    return <MessageView variant='error' message={error.toString()} />;
  };

  return (
    <>
      {loading && <Loader />}

      {message && showMessage()}
      {error && showError()}
    </>
  );
};

export default InfoView;
