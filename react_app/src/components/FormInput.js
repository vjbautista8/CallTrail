import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';
const FormInput = () => {
  return (
    <div>
      <div className='crm-create-fields custabDivCreate'>
        <div className='customfieldLabel'>Name</div>
        <div className='customfieldValue cxBoxInput w100per horizontal lyteInputBox fieldContainer'>
          <input type='text' placeholder='Enter Text' value={'Nice'} />
        </div>
      </div>
      <div className='crm-create-fields custabDivCreate'>
        <div className='customfieldLabel'>Language</div>
        <div className='customfieldValue cxBoxInput w100per horizontal lyteInputBox fieldContainer'>
          <input type='text' placeholder='Enter Text' value={'Nice'} />
        </div>
      </div>
    </div>
  );
};

export default FormInput;
