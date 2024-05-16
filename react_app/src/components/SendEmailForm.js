import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCaretRight, FaCaretDown, FaAngleDoubleRight } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import {
  handleInputChange,
  handleEmailFormData,
  handleOpenDropdownShow,
  handleResetEmailFormData,
  addTaskRecord,
  sendEmail,
} from '../redux/user/userSlice';
const SendEmailForm = () => {
  const {
    FORM_LAYOUT,
    ON_EMAIL,
    META_DATA_CRM_VARIABLES,
    SENDMAIL_FORM,
    ON_CALL_SAVING,
    META_DATA,
    OPEN_DROPDOWN,
  } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSave = () => {
    dispatch(sendEmail(SENDMAIL_FORM));
  };
  const handleInputChangeData = (e) => {
    e.preventDefault();
    dispatch(
      handleEmailFormData({ name: e.target.name, value: e.target.value })
    );
  };
  const handleDropdownItemClick = (api_name, value) => {
    dispatch(handleEmailFormData({ name: api_name, value: value }));
    dispatch(
      handleOpenDropdownShow({
        name: api_name,
        value: !OPEN_DROPDOWN[api_name],
      })
    );
  };
  return (
    <>
      {!ON_EMAIL && (
        <>
          <div className='big-btn-page'>
            <button
              className='lyte-button primarybtn lytePrimaryBtn newbutton big-btn-icon'
              onClick={() => {
                dispatch(
                  handleInputChange({
                    name: 'ON_EMAIL',
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
      {ON_EMAIL && (
        <>
          <div className='form-page-data'>
            <div className='section-page-data'>
              <span className='f17 v_header_container_title_text '>
                <FaCaretDown /> Email Information
              </span>
              <div>
                <div className='crm-create-fields custabDivCreate'>
                  <div className='customfieldLabel'>Send To</div>
                  <div className='customfieldValue cxBoxInput horizontal lyteInputBox fieldContainer'>
                    <input
                      id='to_email'
                      type='email'
                      placeholder='Enter Email'
                      value={SENDMAIL_FORM['to_email']}
                      name='to_email'
                      //   onChange={handleInputChangeData}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className='crm-create-fields custabDivCreate'>
                  <div className='customfieldLabel'>Subject</div>
                  <div className='customfieldValue cxBoxInput horizontal lyteInputBox fieldContainer'>
                    <input
                      id='subject'
                      type='text'
                      placeholder=''
                      value={SENDMAIL_FORM['subject']}
                      name='subject'
                      onChange={handleInputChangeData}
                    />
                  </div>
                </div>
                <div className='crm-create-fields custabDivCreate'>
                  <div className='customfieldLabel'>Message</div>
                  <div className='customfieldValue cxBoxInput horizontal lyteInputBox fieldContainer'>
                    <textarea
                      type='text'
                      placeholder=''
                      name='message'
                      value={SENDMAIL_FORM['message']}
                      onChange={handleInputChangeData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='footer-btn-data'>
            <button
              className='lyte-button outlineredlight'
              onClick={() => {
                dispatch(
                  handleInputChange({
                    name: 'ON_EMAIL',
                    value: false,
                  })
                );
                dispatch(handleResetEmailFormData());
              }}
            >
              Cancel
            </button>
            <button
              className='lyte-button primarybtn lytePrimaryBtn newbutton'
              onClick={handleSave}
            >
              Send Email
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default SendEmailForm;
