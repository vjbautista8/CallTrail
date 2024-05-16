import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormInput from './FormInput';
import { FaCaretRight, FaCaretDown, FaAngleDoubleRight } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import moment from 'moment';
import {
  addRecord,
  handleCallFormData,
  handleInputChange,
  handleOpenDropdownShow,
  handleResetCallFormData,
} from '../redux/user/userSlice';
import HourGlass from './HourGlass';
import { toast } from 'react-toastify';
const LogCallForm = () => {
  const {
    FORM_LAYOUT,
    ON_CALL,
    META_DATA_CRM_VARIABLES,
    CALL_FORM,
    ON_CALL_SAVING,
    META_DATA,
    OPEN_DROPDOWN,
    ON_TIMER,
  } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  function isValidDurationFormat(text) {
    const regex = /^\d{1,3}:\d{2}$/;
    return regex.test(text);
  }
  const handleSave = () => {
    let data = {};

    let APIData = CALL_FORM;
    data.Entity = 'Calls';
    data.APIData = APIData;
    console.log('data >>>>', data);
    console.log(
      'APIData?.Call_Duration',
      APIData?.Call_Duration,
      isValidDurationFormat(APIData?.Call_Duration)
    );
    if (isValidDurationFormat(APIData?.Call_Duration)) {
      dispatch(addRecord(data));
    } else {
      toast.error('Invalid Call Duration Format.');
    }
  };
  const handleInputChangeData = (e) => {
    e.preventDefault();
    dispatch(
      handleCallFormData({ name: e.target.name, value: e.target.value })
    );
  };
  const handleDropdownItemClick = (api_name, value) => {
    dispatch(handleCallFormData({ name: api_name, value: value }));
    dispatch(
      handleOpenDropdownShow({
        name: api_name,
        value: !OPEN_DROPDOWN[api_name],
      })
    );
  };
  const handleStartTimerBtn = (e) => {
    e.preventDefault();
    dispatch(
      handleCallFormData({
        name: 'Call_Start_Time',
        value: moment().format('YYYY-MM-DDTHH:mm:ss'),
      })
    );
    dispatch(
      handleCallFormData({
        name: 'Call_Duration',
        value: '',
      })
    );
    dispatch(handleInputChange({ name: 'ON_TIMER', value: true }));
  };
  const handleStopTimerBtn = (e) => {
    e.preventDefault();
    let date1 = moment(CALL_FORM['Call_Start_Time']);
    let date2 = moment();
    console.log(date1, date2);
    // Calculate the difference in seconds
    let diffInSeconds = date2.diff(date1, 'seconds');

    // Convert seconds to minutes and seconds
    let minutes = Math.floor(diffInSeconds / 60);
    let seconds = diffInSeconds % 60;

    // Format the output as "Minutes:seconds"
    let formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    console.log(date1, date2, formattedTime);
    dispatch(
      handleCallFormData({
        name: 'Call_Duration',
        value: formattedTime,
      })
    );
    dispatch(handleInputChange({ name: 'ON_TIMER', value: false }));
  };
  return (
    <>
      {!ON_CALL && (
        <>
          <div className='big-btn-page'>
            <button
              className='lyte-button primarybtn lytePrimaryBtn newbutton big-btn-icon'
              onClick={() => {
                dispatch(
                  handleInputChange({
                    name: 'ON_CALL',
                    value: true,
                  })
                );
              }}
            >
              <FaPlus className='big-btn-icon-sub' />
            </button>
          </div>
        </>
      )}
      {ON_CALL_SAVING && (
        <>
          <div className='big-btn-page'>
            <HourGlass />
          </div>
        </>
      )}
      {ON_CALL && !ON_CALL_SAVING && (
        <>
          <div className='form-page-data'>
            <span className='f17 v_header_container_title_text '>
              <FaCaretDown /> Call Information
            </span>
            {META_DATA?.Entity == 'Contacts' && (
              <>
                <div className='crm-create-fields custabDivCreate'>
                  <div className='customfieldLabel'>Call To</div>
                  <div className='customfieldValue cxBoxInput horizontal lyteInputBox fieldContainer'>
                    <input
                      id='Who_Id'
                      type='text'
                      placeholder=''
                      value={
                        CALL_FORM?.['Who_Id']?.['name'] || CALL_FORM?.['Who_Id']
                      }
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className='crm-create-fields custabDivCreate'>
                  <div className='customfieldLabel'>Related To</div>
                  <div className='customfieldValue cxBoxInput horizontal lyteInputBox fieldContainer'>
                    <input
                      id='What_Id'
                      type='text'
                      placeholder=''
                      value={
                        CALL_FORM?.['What_Id']?.['name'] ||
                        CALL_FORM?.['What_Id']
                      }
                      readOnly={true}
                    />
                  </div>
                </div>
              </>
            )}
            {META_DATA?.Entity == 'Leads' && (
              <>
                <div className='crm-create-fields custabDivCreate'>
                  <div className='customfieldLabel'>Call To</div>
                  <div className='customfieldValue cxBoxInput horizontal lyteInputBox fieldContainer'>
                    <input
                      id='What_Id'
                      type='text'
                      placeholder=''
                      value={
                        CALL_FORM?.['What_Id']?.['name'] ||
                        CALL_FORM?.['What_Id']
                      }
                      readOnly={true}
                    />
                  </div>
                </div>
              </>
            )}
            <div className='section-page-data'>
              {FORM_LAYOUT?.Call[0].layouts[0]['sections'].map((section, i) => {
                return (
                  <>
                    {/* <span className='f17 v_header_container_title_text '>
                      <FaCaretDown /> {section?.display_label}
                    </span> */}
                    <div>
                      {section?.fields.map((field, f) => {
                        if (
                          META_DATA_CRM_VARIABLES?.calltrail__CALL_FORM_VISIBLE_FIELDS.includes(
                            field?.api_name
                          )
                        ) {
                          let properDataType = field?.data_type;
                          if (field?.data_type == 'datetime') {
                            properDataType = 'datetime-local';
                          }
                          if (field?.data_type == 'lookup') {
                            properDataType = 'text';
                          }
                          if (field?.data_type == 'picklist') {
                            properDataType = 'text';
                          }
                          return (
                            <>
                              <>
                                <div className='crm-create-fields custabDivCreate'>
                                  <div className='customfieldLabel'>
                                    {field?.field_label}{' '}
                                    {field?.required && (
                                      <>
                                        <span>*</span>
                                      </>
                                    )}
                                  </div>
                                  <div className='customfieldValue cxBoxInput horizontal lyteInputBox fieldContainer'>
                                    <input
                                      id={field?.api_name}
                                      type={properDataType}
                                      placeholder=''
                                      value={
                                        CALL_FORM?.[field?.api_name]?.[
                                          'name'
                                        ] || CALL_FORM?.[field?.api_name]
                                      }
                                      name={field?.api_name}
                                      onChange={handleInputChangeData}
                                      readOnly={
                                        field?.data_type == 'lookup' ||
                                        field?.data_type == 'picklist'
                                      }
                                      step='1'
                                      onClick={() => {
                                        dispatch(
                                          handleOpenDropdownShow({
                                            name: field?.api_name,
                                            value:
                                              !OPEN_DROPDOWN[field?.api_name],
                                          })
                                        );
                                      }}
                                    />
                                    {field?.data_type == 'picklist' &&
                                      OPEN_DROPDOWN[field?.api_name] && (
                                        <div
                                          className={`list-dropdown zcrmCard roof-dp `}
                                        >
                                          <>
                                            {field?.pick_list_values.map(
                                              (picklist_val, p) => {
                                                return (
                                                  <>
                                                    <div
                                                      className={`dropdown-item ${
                                                        CALL_FORM?.[
                                                          field?.api_name
                                                        ]?.['name'] ||
                                                        CALL_FORM?.[
                                                          field?.api_name
                                                        ] ==
                                                          picklist_val?.display_value
                                                          ? 'dropdown-active-select'
                                                          : ''
                                                      } `}
                                                      onClick={() => {
                                                        handleDropdownItemClick(
                                                          field?.api_name,
                                                          picklist_val?.actual_value
                                                        );
                                                      }}
                                                    >
                                                      {
                                                        picklist_val?.display_value
                                                      }
                                                    </div>
                                                  </>
                                                );
                                              }
                                            )}
                                          </>
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </>
                            </>
                          );
                        }
                      })}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className='footer-btn-data'>
            {/* /handleStopTimerBtn */}

            <div className='timer-part'>
              {!ON_TIMER && (
                <>
                  <button
                    className='lyte-button primarybtn lytePrimaryBtn newbutton '
                    onClick={handleStartTimerBtn}
                  >
                    Start Timer
                  </button>
                </>
              )}
              {ON_TIMER && (
                <>
                  <button
                    className='lyte-button primarybtn lytePrimaryBtn newbutton timer-btn '
                    onClick={handleStopTimerBtn}
                  >
                    Stop Timer
                  </button>
                </>
              )}
            </div>
            <div className='saving-part'>
              <button
                className='lyte-button outlineredlight'
                onClick={() => {
                  dispatch(
                    handleInputChange({
                      name: 'ON_CALL',
                      value: false,
                    })
                  );
                  dispatch(handleResetCallFormData());
                }}
              >
                Cancel
              </button>
              <button
                className='lyte-button primarybtn lytePrimaryBtn newbutton'
                onClick={handleSave}
              >
                Save Call
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );

  //   return <div>{JSON.stringify(FORM_LAYOUT?.Call?.layouts[0]['sections'])}</div>;
};

export default LogCallForm;
