import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCaretRight, FaCaretDown, FaAngleDoubleRight } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { handleInputChange } from '../redux/user/userSlice';
const CreateMeetingForm = () => {
  const { FORM_LAYOUT, ON_MEETING } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <>
      {!ON_MEETING && (
        <>
          <div className='big-btn-page'>
            <button
              className='lyte-button primarybtn lytePrimaryBtn newbutton big-btn-icon'
              onClick={() => {
                dispatch(
                  handleInputChange({
                    name: 'ON_MEETING',
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
      {ON_MEETING && (
        <>
          <div className='form-page-data'>
            {FORM_LAYOUT?.Meeting[0].layouts[0]['sections'].map(
              (section, i) => {
                return (
                  <>
                    <div className='section-page-data'>
                      <span className='f17 v_header_container_title_text '>
                        <FaCaretDown /> {section?.display_label}
                      </span>
                      <div>
                        {section?.fields.map((field, f) => {
                          return (
                            <>
                              <>
                                <div className='crm-create-fields custabDivCreate'>
                                  <div className='customfieldLabel'>
                                    {field?.field_label}
                                  </div>
                                  <div className='customfieldValue cxBoxInput horizontal lyteInputBox fieldContainer'>
                                    <input
                                      type='text'
                                      placeholder='Enter Text'
                                    />
                                  </div>
                                </div>
                              </>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </>
                );
              }
            )}
          </div>
          <div className='footer-btn-data'>
            <button
              className='lyte-button outlineredlight'
              onClick={() => {
                dispatch(
                  handleInputChange({
                    name: 'ON_MEETING',
                    value: false,
                  })
                );
              }}
            >
              Cancel
            </button>
            <button className='lyte-button primarybtn lytePrimaryBtn newbutton'>
              Save Meeting
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CreateMeetingForm;
