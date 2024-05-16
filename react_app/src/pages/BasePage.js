import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, PageHeader, Buttons, FormInput, Tables } from '../components';
import { FaCaretRight, FaCaretDown, FaAngleDoubleRight } from 'react-icons/fa';
import { handleInputChange } from '../redux/user/userSlice';
import LogCallForm from '../components/LogCallForm';
import AddDataPage from '../components/AddDataPage';
import CallHistoryTable from '../components/CallHistoryTable';
import ReportDataPage from '../components/ReportDataPage';

const ReportsPart = () => {
  const dispatch = useDispatch();
  const { CURRENT_TAB, TABS } = useSelector((store) => store.user);

  return (
    <>
      <div className='darkMainHead '>
        <div className='buttons-tab'>
          {TABS.map((tab, i) => {
            return (
              <>
                <button
                  className={`lyte-button outlineprimary  newbutton rounded ${
                    CURRENT_TAB === tab ? 'active-rounded' : 'in-active'
                  }`}
                  onClick={() => {
                    dispatch(
                      handleInputChange({ name: 'CURRENT_TAB', value: tab })
                    );
                  }}
                >
                  {tab}
                </button>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
const CreationParts = () => {
  const dispatch = useDispatch();
  const {
    CURRENT_CREATION_TAB,
    CREATION_TABS,
    ON_CALL,
    ON_TASK,
    ON_MEETING,
    ON_EMAIL,
  } = useSelector((store) => store.user);

  return (
    <>
      <div className='darkMainHead '>
        <div className='buttons-tab'>
          <button
            className={`lyte-button outlineprimary  newbutton rounded force-dflex ${
              CURRENT_CREATION_TAB === 'Log a Call'
                ? 'active-rounded'
                : 'in-active'
            }`}
            onClick={() => {
              dispatch(
                handleInputChange({
                  name: 'CURRENT_CREATION_TAB',
                  value: 'Log a Call',
                })
              );
              // CHANGE_TAB('CURRENT_TAB', tab);
            }}
          >
            <div>Log a Call</div>

            {ON_CALL && (
              <>
                <div class='loader-pulse'></div>
              </>
            )}
          </button>
          <button
            className={`lyte-button outlineprimary  newbutton rounded force-dflex ${
              CURRENT_CREATION_TAB === 'Create Task'
                ? 'active-rounded'
                : 'in-active'
            }`}
            onClick={() => {
              dispatch(
                handleInputChange({
                  name: 'CURRENT_CREATION_TAB',
                  value: 'Create Task',
                })
              );
              // CHANGE_TAB('CURRENT_TAB', tab);
            }}
          >
            <div>Create Task</div>

            {ON_TASK && (
              <>
                <div class='loader-pulse'></div>
              </>
            )}
          </button>
          <button
            className={`lyte-button outlineprimary  newbutton rounded force-dflex ${
              CURRENT_CREATION_TAB === 'Create Meeting'
                ? 'active-rounded'
                : 'in-active'
            }`}
            onClick={() => {
              dispatch(
                handleInputChange({
                  name: 'CURRENT_CREATION_TAB',
                  value: 'Create Meeting',
                })
              );
              // CHANGE_TAB('CURRENT_TAB', tab);
            }}
          >
            <div>Create Meeting</div>

            {ON_MEETING && (
              <>
                <div class='loader-pulse'></div>
              </>
            )}
          </button>
          <button
            className={`lyte-button outlineprimary  newbutton rounded force-dflex ${
              CURRENT_CREATION_TAB === 'Send Email'
                ? 'active-rounded'
                : 'in-active'
            }`}
            onClick={() => {
              dispatch(
                handleInputChange({
                  name: 'CURRENT_CREATION_TAB',
                  value: 'Send Email',
                })
              );
              // CHANGE_TAB('CURRENT_TAB', tab);
            }}
          >
            <div>Send Email</div>

            {ON_EMAIL && (
              <>
                <div class='loader-pulse'></div>
              </>
            )}
          </button>
          {/* {CREATION_TABS.map((tab, i) => {
            return (
              <>
                <button
                  className={`lyte-button outlineprimary  newbutton rounded force-dflex ${
                    CURRENT_CREATION_TAB === tab
                      ? 'active-rounded'
                      : 'in-active'
                  }`}
                  onClick={() => {
                    dispatch(
                      handleInputChange({
                        name: 'CURRENT_CREATION_TAB',
                        value: tab,
                      })
                    );
                    // CHANGE_TAB('CURRENT_TAB', tab);
                  }}
                >
                  <div>{tab}</div>
                  
                  <div class='loader-pulse'></div>
                </button>
              </>
            );
          })} */}
        </div>
      </div>
    </>
  );
};

const BasePage = () => {
  return (
    <>
      <PageHeader />
      <div className='widget_data'>
        <Card
          data={{
            title: <CreationParts />,
            content: <AddDataPage />,
            className: 'zcrmCard bom-card mr-0_5',
          }}
        />
        <Card
          data={{
            title: <ReportsPart />,
            content: <ReportDataPage />,
            className: 'zcrmCard bom-card ml-0_5',
          }}
        />
      </div>
    </>
  );
};

export default BasePage;
