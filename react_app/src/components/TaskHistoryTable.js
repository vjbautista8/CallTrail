import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Wrapper from '../wrappers/BOMTAbleWrapper';
import HourGlass from './HourGlass';
import { handleInputChange } from '../redux/user/userSlice';
import noDataImg from '../no_data_found.png';
import moment from 'moment';
const TaskHistoryTable = () => {
  const dispatch = useDispatch();
  const { ACTIVITIES, META_DATA, FETCH_ACTIVITIES, HAS_TASK, DONE_ACTIVITIES } =
    useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (ACTIVITIES.length > 0) {
      setIsLoading(false);
      dispatch(handleInputChange({ name: 'FETCH_ACTIVITIES', value: false }));
      let activitiesData = ACTIVITIES;
      for (var i = 0; i < activitiesData.length; i++) {
        if (activitiesData[i]['Activity_Type'] == 'Tasks') {
          console.log('HAS_TASK');
          dispatch(handleInputChange({ name: 'HAS_TASK', value: true }));
        }
      }
    }
    if (ACTIVITIES.length == 0) {
      setIsLoading(true);
    }
  }, [ACTIVITIES]);
  if (isLoading && (!DONE_ACTIVITIES || FETCH_ACTIVITIES)) {
    return (
      <Wrapper>
        <HourGlass />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {HAS_TASK && (
        <>
          <table className='bom-table'>
            <tr className='thead-bom sticker-th'>
              <td>Subject</td>
              <td>Due Date</td>
              <td>Status</td>
              <td>Priority</td>
              {META_DATA?.Entity == 'Leads' && (
                <>
                  <td>Call To</td>
                </>
              )}
              {META_DATA?.Entity == 'Contacts' && (
                <>
                  <td>Call To</td>
                  <td>Related To</td>
                </>
              )}

              <td>Task Owner</td>
            </tr>

            {ACTIVITIES.map((field, i) => {
              if (field?.Activity_Type == 'Tasks') {
                return (
                  <tr className='item-bom' role='button'>
                    <td>{field?.Subject}</td>
                    <td>{moment(field?.Due_Date).format('ll')}</td>
                    <td>{field?.Status}</td>

                    <td>{field?.Priority}</td>
                    {META_DATA?.Entity == 'Leads' && (
                      <>
                        <td>{field?.What_Id?.name}</td>
                      </>
                    )}
                    {META_DATA?.Entity == 'Contacts' && (
                      <>
                        <td>{field?.Who_Id?.name}</td>
                        <td>{field?.What_Id?.name}</td>
                      </>
                    )}

                    <td>{field?.Owner?.name}</td>
                  </tr>
                );
              }
            })}
          </table>
        </>
      )}

      {!HAS_TASK && DONE_ACTIVITIES && (
        <>
          <div className='no-data-container'>
            <img src={noDataImg} alt='no-data' className='warehouse-img' />
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default TaskHistoryTable;
