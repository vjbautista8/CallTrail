import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCaretRight, FaCaretDown, FaAngleDoubleRight } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import {
  handleInputChange,
  handleTaskFormData,
  handleOpenDropdownShow,
  handleResetTaskFormData,
  addTaskRecord,
} from '../redux/user/userSlice';
const CreateTaskForm = () => {
  const {
    FORM_LAYOUT,
    ON_TASK,
    META_DATA_CRM_VARIABLES,
    TASK_FORM,
    ON_CALL_SAVING,
    META_DATA,
    OPEN_DROPDOWN,
  } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSave = () => {
    let data = {};

    let APIData = TASK_FORM;
    data.Entity = 'Tasks';
    data.APIData = APIData;
    console.log('data >>>>', data);

    dispatch(addTaskRecord(data));
  };
  const handleInputChangeData = (e) => {
    e.preventDefault();
    dispatch(
      handleTaskFormData({ name: e.target.name, value: e.target.value })
    );
  };
  const handleDropdownItemClick = (api_name, value) => {
    dispatch(handleTaskFormData({ name: api_name, value: value }));
    dispatch(
      handleOpenDropdownShow({
        name: api_name,
        value: !OPEN_DROPDOWN[api_name],
      })
    );
  };
  return (
    <>
      {!ON_TASK && (
        <>
          <div className='big-btn-page'>
            <button
              className='lyte-button primarybtn lytePrimaryBtn newbutton big-btn-icon'
              onClick={() => {
                dispatch(
                  handleInputChange({
                    name: 'ON_TASK',
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
      {ON_TASK && (
        <>
          <div className='form-page-data'>
            {FORM_LAYOUT?.Task[0].layouts[0]['sections'].map((section, i) => {
              return (
                <>
                  <div className='section-page-data'>
                    <span className='f17 v_header_container_title_text '>
                      <FaCaretDown /> {section?.display_label}
                    </span>
                    <div>
                      {section?.fields.map((field, f) => {
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
                                      TASK_FORM?.[field?.api_name]?.['name'] ||
                                      TASK_FORM?.[field?.api_name]
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
                                                      TASK_FORM?.[
                                                        field?.api_name
                                                      ]?.['name'] ||
                                                      TASK_FORM?.[
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
                      })}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className='footer-btn-data'>
            <button
              className='lyte-button outlineredlight'
              onClick={() => {
                dispatch(
                  handleInputChange({
                    name: 'ON_TASK',
                    value: false,
                  })
                );
                dispatch(handleResetTaskFormData());
              }}
            >
              Cancel
            </button>
            <button
              className='lyte-button primarybtn lytePrimaryBtn newbutton'
              onClick={handleSave}
            >
              Save Task
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CreateTaskForm;
