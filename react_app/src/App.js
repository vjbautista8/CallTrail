import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// @pages
import { BasePage } from './pages';
import {
  getCRMVariables,
  getLayoutFieldsData,
  getRelatedActivities,
  getSelectedRecordByID,
  handleInputChange,
} from './redux/user/userSlice';
import HourGlass from './components/HourGlass';

const App = ({ data }) => {
  const dispatch = useDispatch();

  // const [isLoading, setIsLoading] = useState(true);
  const { IS_LOADING, PAGE, FETCH_ACTIVITIES } = useSelector(
    (store) => store.user
  );
  useEffect(() => {
    console.log('APP DATA', data);
    const urlParams = new URLSearchParams(window.location.search);
    const pageQuery = urlParams.get('page');
    const serviceOrigin = urlParams.get('serviceOrigin');
    console.log('pageQuery', pageQuery);
    console.log('serviceOrigin', serviceOrigin);
    dispatch(handleInputChange({ name: 'PAGE', value: pageQuery }));
    dispatch(
      handleInputChange({ name: 'SERVICE_ORIGIN', value: serviceOrigin })
    );
    dispatch(handleInputChange({ name: 'META_DATA', value: data }));
    if (PAGE == 'calltrailbutton') {
      dispatch(
        getSelectedRecordByID({
          Entity: data.Entity,
          RecordID: data.EntityId[0],
        })
      ).then(() => {
        dispatch(handleInputChange({ name: 'IS_LOADING', value: false }));
        dispatch(getLayoutFieldsData()).then(() => {
          dispatch(
            getRelatedActivities({
              Entity: data.Entity,
              RecordID: data.EntityId[0],
              RelatedList: 'Activities_History',
            })
          ).then(() => {
            dispatch(
              getRelatedActivities({
                Entity: data.Entity,
                RecordID: data.EntityId[0],
                RelatedList: 'Activities',
              })
            ).then(() => {
              dispatch(
                handleInputChange({ name: 'DONE_ACTIVITIES', value: true })
              );
              dispatch(getCRMVariables({}));
            });
          });
        });
      });
    }
    console.log('APP DATA', data);
  }, [PAGE]);
  useEffect(() => {
    if (FETCH_ACTIVITIES) {
      dispatch(
        getRelatedActivities({
          Entity: data.Entity,
          RecordID: data.EntityId[0],
          RelatedList: 'Activities',
        })
      ).then(() => {
        dispatch(
          getRelatedActivities({
            Entity: data.Entity,
            RecordID: data.EntityId[0],
            RelatedList: 'Activities_History',
          })
        ).then(() => {
          //DONE_ACTIVITIES
          dispatch(handleInputChange({ name: 'DONE_ACTIVITIES', value: true }));
        });
      });
    }
  }, [FETCH_ACTIVITIES]);
  if (IS_LOADING) {
    return (
      <div>
        <HourGlass />
      </div>
    );
  }
  if (PAGE == 'calltrailbutton') {
    return (
      <div>
        <BasePage />
      </div>
    );
  }
  if (PAGE == 'settings') {
    return (
      <div>
        <h1>Welcome to Settings</h1>
      </div>
    );
  }
};

export default App;
