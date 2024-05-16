import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CallHistoryTable from './CallHistoryTable';
import TaskHistoryTable from './TaskHistoryTable';
const ReportDataPage = () => {
  const { CURRENT_TAB } = useSelector((store) => store.user);
  if (CURRENT_TAB == 'Call History') {
    return <CallHistoryTable />;
  }
  if (CURRENT_TAB == 'Tasks') {
    return <TaskHistoryTable />;
  }
  if (CURRENT_TAB == 'Meetings') {
    return <h1> Meetings</h1>;
  }
  if (CURRENT_TAB == 'Emails') {
    return <h1> Emails</h1>;
  }
};

export default ReportDataPage;
