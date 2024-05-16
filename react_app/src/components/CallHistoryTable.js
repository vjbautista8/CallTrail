import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Wrapper from '../wrappers/BOMTAbleWrapper';
import HourGlass from './HourGlass';
import { handleInputChange } from '../redux/user/userSlice';
import noDataImg from '../no_data_found.png';
import moment from 'moment';
const CallHistoryTable = () => {
  const dispatch = useDispatch();
  const { ACTIVITIES, META_DATA, FETCH_ACTIVITIES, HAS_CALL, DONE_ACTIVITIES } =
    useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (ACTIVITIES.length > 0) {
      setIsLoading(false);
      dispatch(handleInputChange({ name: 'FETCH_ACTIVITIES', value: false }));
      let activitiesData = ACTIVITIES;
      for (var i = 0; i < activitiesData.length; i++) {
        if (activitiesData[i]['Activity_Type'] == 'Calls') {
          console.log('HAS_CALL');
          dispatch(handleInputChange({ name: 'HAS_CALL', value: true }));
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
      {HAS_CALL && (
        <>
          <table className='bom-table'>
            <tr className='thead-bom sticker-th'>
              <td>Subject</td>
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

              <td>Call Type</td>
              <td>Call Purpose</td>
              <td>Call Start Time</td>
              <td>Call Duration</td>
              <td>Call Owner</td>
            </tr>

            {ACTIVITIES.map((field, i) => {
              if (field?.Activity_Type == 'Calls') {
                return (
                  <tr className='item-bom' role='button'>
                    <td>{field?.Subject}</td>
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

                    <td>{field?.Call_Type}</td>
                    <td>{field?.Call_Purpose}</td>
                    <td>{moment(field?.Call_Start_Time).format('llll')}</td>
                    <td>{field?.Call_Duration}</td>
                    <td>{field?.Owner?.name}</td>
                  </tr>
                );
              }
            })}
          </table>
        </>
      )}

      {!HAS_CALL && DONE_ACTIVITIES && (
        <>
          <div className='no-data-container'>
            <img src={noDataImg} alt='no-data' className='warehouse-img' />
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default CallHistoryTable;
