import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogCallForm from './LogCallForm';
import CreateTaskForm from './CreateTaskForm';
import CreateMeetingForm from './CreateMeetingForm';
import HourGlass from './HourGlass';
import BookLoading from './BookLoading';
import SendEmailForm from './SendEmailForm';

const AddDataPage = () => {
  const { CURRENT_CREATION_TAB, DONE_FORM_LAYOUT } = useSelector(
    (store) => store.user
  );
  if (!DONE_FORM_LAYOUT) {
    return <BookLoading />;
  }
  if (CURRENT_CREATION_TAB == 'Log a Call') {
    return <LogCallForm />;
  }
  if (CURRENT_CREATION_TAB == 'Create Task') {
    return <CreateTaskForm />;
  }
  if (CURRENT_CREATION_TAB == 'Create Meeting') {
    return <CreateMeetingForm />;
  }
  if (CURRENT_CREATION_TAB == 'Send Email') {
    return <SendEmailForm />;
  }
};

export default AddDataPage;
