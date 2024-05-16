import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import { toast } from 'react-toastify';
const ZOHO = window.ZOHO;
const initialState = {
  SERVICE_ORIGIN: '',
  PAGE: '',
  IS_LOADING: true,
  CURRENT_RECORD_DATA: {},
  TABS: ['Call History', 'Tasks', 'Meetings'],
  CREATION_TABS: ['Log a Call', 'Create Task', 'Send Email'],
  CURRENT_CREATION_TAB: 'Log a Call',
  CURRENT_TAB: 'Call History',
  META_DATA: {},
  FORM_LAYOUT: {},
  ON_CALL_SAVING: false,
  ON_CALL: false,
  ON_TASK: false,
  ON_MEETING: false,
  ON_EMAIL: false,
  ON_TIMER: false,
  ACTIVITIES: [],
  EMAILS: [],
  CALL_FORM: {},
  TASK_FORM: {},
  MEETING_FORM: {},
  SENDMAIL_FORM: {},
  META_DATA_CRM_VARIABLES: {},
  FETCH_ACTIVITIES: false,
  HAS_CALL: false,
  HAS_TASK: false,
  HAS_MEETING: false,
  HAS_EMAIL: false,
  DONE_ACTIVITIES: false,
  DONE_FORM_LAYOUT: false,
  OPEN_DROPDOWN: {},
};

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const getRelatedActivities = createAsyncThunk(
  'user/getRelatedActivities',
  async (data, thunkAPI) => {
    try {
      const response = ZOHO.CRM.API.getRelatedRecords({
        Entity: data.Entity,
        RecordID: data.RecordID,
        RelatedList: data.RelatedList,
        page: 1,
        per_page: 200,
        // sort_order: 'asc',
        // sort_by: 'Equipment_Type',
      });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getSelectedRecordByID = createAsyncThunk(
  'user/getSelectedRecordByID',
  async (data, thunkAPI) => {
    try {
      if (data?.delayVal) {
        await delay(data?.delayVal);
      }

      const response = ZOHO.CRM.API.getRecord({
        Entity: data.Entity,
        RecordID: data.RecordID,
      });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const sendEmail = createAsyncThunk(
  'user/sendEmail',
  async (data, thunkAPI) => {
    try {
      var func_name = 'calltrail__sendemails';
      var req_data = {
        arguments: JSON.stringify({
          crmAPIRequest: {
            to_email: data?.to_email,
            subject: data?.subject,
            message: data?.message,
          },
        }),
      };
      const response = ZOHO.CRM.FUNCTIONS.execute(func_name, req_data);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const getLayoutFieldsData = createAsyncThunk(
  'user/getLayoutFieldsData',
  async (data, thunkAPI) => {
    try {
      var func_name = 'calltrail__getlayoutfieldsdata';
      var req_data = {
        arguments: JSON.stringify({}),
      };
      const response = ZOHO.CRM.FUNCTIONS.execute(func_name, req_data);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getCRMVariables = createAsyncThunk(
  'user/getCRMVariables',
  async (data, thunkAPI) => {
    try {
      var keys = {
        apiKeys: [
          'calltrail__CALL_FORM_VISIBLE_FIELDS',
          'calltrail__CALL_REPORTS_VISIBLE_COLUMN',
          'calltrail__MEETING_FORM_VISIBLE_FIELDS',
          'calltrail__MEETING_REPORTS_VISIBLE_COLUMN',
          'calltrail__TASK_FORM_VISIBLE_FIELDS',
          'calltrail__TASK_REPORTS_VISIBLE_COLUMN',
        ],
      };
      const response = ZOHO.CRM.API.getOrgVariable(keys);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const addRecord = createAsyncThunk(
  'user/addRecord',
  async (data, thunkAPI) => {
    try {
      console.log('data Call', data);
      const response = ZOHO.CRM.API.insertRecord({
        Entity: data.Entity,
        APIData: data.APIData,
        Trigger: ['workflow'],
      });

      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const addTaskRecord = createAsyncThunk(
  'user/addTaskRecord',
  async (data, thunkAPI) => {
    try {
      console.log('data Call', data);
      const response = ZOHO.CRM.API.insertRecord({
        Entity: data.Entity,
        APIData: data.APIData,
        Trigger: ['workflow'],
      });

      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
//getLayoutInformationFields
const convertToArray = (listString) => {
  listString = listString.replace(/'/g, '"'); // Replace single quotes with double quotes
  return JSON.parse(listString); // Parse the JSON string into an array
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleInputChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    handleCallFormData: (state, { payload: { name, value } }) => {
      state.CALL_FORM[name] = value;
    },
    handleTaskFormData: (state, { payload: { name, value } }) => {
      state.TASK_FORM[name] = value;
    },

    handleResetCallFormData: (state) => {
      state.CALL_FORM = {};
      state.ON_TIMER = false;
      if (state.META_DATA?.Entity == 'Contacts') {
        state.CALL_FORM.Who_Id = {
          name: state.CURRENT_RECORD_DATA?.['Full_Name'],
          id: state.CURRENT_RECORD_DATA?.['id'],
        };
        state.CALL_FORM.What_Id = {
          name: state.CURRENT_RECORD_DATA?.['Account_Name']?.['name'],
          id: state.CURRENT_RECORD_DATA?.['Account_Name']?.['id'],
        };
        state.CALL_FORM.$se_module = 'Accounts';
      }
      if (state.META_DATA?.Entity == 'Leads') {
        state.CALL_FORM.What_Id = {
          name: state.CURRENT_RECORD_DATA?.['Full_Name'],
          id: state.CURRENT_RECORD_DATA?.['id'],
        };

        state.CALL_FORM.$se_module = 'Leads';
      }
    },
    handleResetTaskFormData: (state) => {
      state.TASK_FORM = {};

      if (state.META_DATA?.Entity == 'Contacts') {
        state.TASK_FORM.Who_Id = {
          name: state.CURRENT_RECORD_DATA?.['Full_Name'],
          id: state.CURRENT_RECORD_DATA?.['id'],
        };
        state.TASK_FORM.What_Id = {
          name: state.CURRENT_RECORD_DATA?.['Account_Name']?.['name'],
          id: state.CURRENT_RECORD_DATA?.['Account_Name']?.['id'],
        };
        state.TASK_FORM.$se_module = 'Accounts';
      }
      if (state.META_DATA?.Entity == 'Leads') {
        state.TASK_FORM.What_Id = {
          name: state.CURRENT_RECORD_DATA?.['Full_Name'],
          id: state.CURRENT_RECORD_DATA?.['id'],
        };

        state.TASK_FORM.$se_module = 'Leads';
      }
    },
    handleEmailFormData: (state, { payload: { name, value } }) => {
      state.SENDMAIL_FORM[name] = value;
    },
    handleResetEmailFormData: (state) => {
      state.SENDMAIL_FORM = {};
      state.SENDMAIL_FORM.to_email = state.CURRENT_RECORD_DATA?.['Email'];
    },
    handleOpenDropdownShow: (state, { payload: { name, value } }) => {
      state.OPEN_DROPDOWN = {};
      state.OPEN_DROPDOWN[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      //sendEmail
      .addCase(sendEmail.pending, (state, { meta }) => {
        state.LOADING = true;
        console.log('sendEmail pending => ', meta);
      })
      .addCase(sendEmail.fulfilled, (state, { payload }) => {
        console.log('sendEmail fulfilled => ', payload);
        toast.success('Successfully sent.');

        //RESET CALL FORM
        state.SENDMAIL_FORM = {};
        state.SENDMAIL_FORM.to_email = state.CURRENT_RECORD_DATA?.['Email'];
        state.ON_EMAIL = false;
      })
      .addCase(sendEmail.rejected, (state, { payload, meta }) => {
        console.log('sendEmail ERROR => ', payload, meta);
        state.ON_EMAIL = false;
        state.LOADING = false;
        toast.error(
          'Something went wrong. Please fill-up the required fields.'
        );
      })
      //addTaskRecord
      .addCase(addTaskRecord.pending, (state, { meta }) => {
        state.LOADING = true;
        state.ON_TASK_SAVING = true;
        console.log('addTaskRecord pending => ', meta);
      })
      .addCase(addTaskRecord.fulfilled, (state, { payload }) => {
        console.log('addTaskRecord fulfilled => ', payload);
        state.ON_TASK = false;
        state.ON_TASK_SAVING = false;
        toast.success('Successfully created.');
        state.FETCH_ACTIVITIES = true;
        state.ACTIVITIES = [];
        //RESET CALL FORM
        state.TASK_FORM = {};
        if (state.META_DATA?.Entity == 'Contacts') {
          state.TASK_FORM.Who_Id = {
            name: state.CURRENT_RECORD_DATA?.['Full_Name'],
            id: state.CURRENT_RECORD_DATA?.['id'],
          };
          state.TASK_FORM.What_Id = {
            name: state.CURRENT_RECORD_DATA?.['Account_Name']?.['name'],
            id: state.CURRENT_RECORD_DATA?.['Account_Name']?.['id'],
          };
          state.TASK_FORM.$se_module = 'Accounts';
        }
        if (state.META_DATA?.Entity == 'Leads') {
          state.TASK_FORM.What_Id = {
            name: state.CURRENT_RECORD_DATA?.['Full_Name'],
            id: state.CURRENT_RECORD_DATA?.['id'],
          };

          state.TASK_FORM.$se_module = 'Leads';
        }
      })
      .addCase(addTaskRecord.rejected, (state, { payload, meta }) => {
        console.log('addTaskRecord ERROR => ', payload, meta);
        state.FETCH_ACTIVITIES = false;
        state.ON_TASK_SAVING = false;
        state.LOADING = false;
        state.ON_TASK = true;
        toast.error(
          'Something went wrong. Please fill-up the required fields.'
        );
      })
      //addRecord
      .addCase(addRecord.pending, (state, { meta }) => {
        state.LOADING = true;
        state.ON_CALL_SAVING = true;
        console.log('addRecord pending => ', meta);
      })
      .addCase(addRecord.fulfilled, (state, { payload }) => {
        console.log('addRecord fulfilled => ', payload);
        state.ON_CALL = false;
        state.ON_CALL_SAVING = false;
        toast.success('Successfully created.');
        state.FETCH_ACTIVITIES = true;
        state.ACTIVITIES = [];
        //RESET CALL FORM
        state.CALL_FORM = {};
        if (state.META_DATA?.Entity == 'Contacts') {
          state.CALL_FORM.Who_Id = {
            name: state.CURRENT_RECORD_DATA?.['Full_Name'],
            id: state.CURRENT_RECORD_DATA?.['id'],
          };
          state.CALL_FORM.What_Id = {
            name: state.CURRENT_RECORD_DATA?.['Account_Name']?.['name'],
            id: state.CURRENT_RECORD_DATA?.['Account_Name']?.['id'],
          };
          state.CALL_FORM.$se_module = 'Accounts';
        }
        if (state.META_DATA?.Entity == 'Leads') {
          state.CALL_FORM.What_Id = {
            name: state.CURRENT_RECORD_DATA?.['Full_Name'],
            id: state.CURRENT_RECORD_DATA?.['id'],
          };

          state.CALL_FORM.$se_module = 'Leads';
        }
      })
      .addCase(addRecord.rejected, (state, { payload, meta }) => {
        console.log('addRecord ERROR => ', payload, meta);
        state.FETCH_ACTIVITIES = false;
        state.ON_CALL_SAVING = false;
        state.LOADING = false;
        state.ON_CALL = true;
        toast.error(
          'Something went wrong. Please fill-up the required fields.'
        );
      })
      //getCRMVariables
      .addCase(getCRMVariables.pending, (state) => {
        state.LOADING = true;
      })
      .addCase(getCRMVariables.fulfilled, (state, { payload }) => {
        console.log('getCRMVariables fulfilled => ', payload);
        if (payload?.Success.Content) {
          const resultCRMVariables = {};
          resultCRMVariables.calltrail__CALL_FORM_VISIBLE_FIELDS =
            convertToArray(
              payload?.Success?.Content?.calltrail__CALL_FORM_VISIBLE_FIELDS
                ?.value
            );
          resultCRMVariables.calltrail__CALL_REPORTS_VISIBLE_COLUMN =
            convertToArray(
              payload?.Success?.Content?.calltrail__CALL_REPORTS_VISIBLE_COLUMN
                ?.value
            );
          resultCRMVariables.calltrail__MEETING_FORM_VISIBLE_FIELDS =
            convertToArray(
              payload?.Success?.Content?.calltrail__MEETING_FORM_VISIBLE_FIELDS
                ?.value
            );
          resultCRMVariables.calltrail__MEETING_REPORTS_VISIBLE_COLUMN =
            convertToArray(
              payload?.Success?.Content
                ?.calltrail__MEETING_REPORTS_VISIBLE_COLUMN?.value
            );
          resultCRMVariables.calltrail__TASK_FORM_VISIBLE_FIELDS =
            convertToArray(
              payload?.Success?.Content?.calltrail__TASK_FORM_VISIBLE_FIELDS
                ?.value
            );
          resultCRMVariables.calltrail__TASK_REPORTS_VISIBLE_COLUMN =
            convertToArray(
              payload?.Success?.Content?.calltrail__TASK_REPORTS_VISIBLE_COLUMN
                ?.value
            );
          state.META_DATA_CRM_VARIABLES = resultCRMVariables;
        }
      })
      .addCase(getCRMVariables.rejected, (state, { payload }) => {
        console.log('getCRMVariables ERROR => ', payload);
        state.LOADING = false;
      })
      //getRelatedActivities
      .addCase(getRelatedActivities.pending, (state) => {
        state.LOADING = true;
      })
      .addCase(getRelatedActivities.fulfilled, (state, { payload }) => {
        console.log('getRelatedActivities fulfilled => ', payload);

        if (payload?.data) {
          const currentActivities = state.ACTIVITIES;
          state.ACTIVITIES = currentActivities.concat(payload?.data);
        }
      })
      .addCase(getRelatedActivities.rejected, (state, { payload }) => {
        console.log('getRelatedActivities ERROR => ', payload);
        state.LOADING = false;
      })
      //getLayoutFieldsData
      .addCase(getLayoutFieldsData.pending, (state) => {
        state.LOADING = true;
        state.DONE_FORM_LAYOUT = false;
      })
      .addCase(getLayoutFieldsData.fulfilled, (state, { payload }) => {
        console.log('getLayoutFieldsData fulfilled => ', payload);
        const result = payload?.details?.output;
        state.FORM_LAYOUT = JSON.parse(result);
        state.LOADING = false;
        state.DONE_FORM_LAYOUT = true;
      })
      .addCase(getLayoutFieldsData.rejected, (state, { payload }) => {
        console.log('getLayoutFieldsData ERROR => ', payload);
        state.LOADING = false;
        state.DONE_FORM_LAYOUT = true;
      })
      //getSelectedRecord
      .addCase(getSelectedRecordByID.pending, (state) => {
        state.LOADING = true;
      })
      .addCase(getSelectedRecordByID.fulfilled, (state, { payload }) => {
        console.log('getSelectedRecordByID fulfilled => ', payload);
        const response = payload;
        state.CURRENT_RECORD_DATA = response?.data[0];
        if (state.META_DATA?.Entity == 'Contacts') {
          state.CALL_FORM.Who_Id = {
            name: response?.data[0]?.['Full_Name'],
            id: response?.data[0]?.['id'],
          };
          state.CALL_FORM.What_Id = {
            name: response?.data[0]?.['Account_Name']?.['name'],
            id: response?.data[0]?.['Account_Name']?.['id'],
          };
          state.CALL_FORM.$se_module = 'Accounts';
          //
          state.TASK_FORM.Who_Id = {
            name: response?.data[0]?.['Full_Name'],
            id: response?.data[0]?.['id'],
          };
          state.TASK_FORM.What_Id = {
            name: response?.data[0]?.['Account_Name']?.['name'],
            id: response?.data[0]?.['Account_Name']?.['id'],
          };
          state.TASK_FORM.$se_module = 'Accounts';
        }
        if (state.META_DATA?.Entity == 'Leads') {
          state.CALL_FORM.What_Id = {
            name: response?.data[0]?.['Full_Name'],
            id: response?.data[0]?.['id'],
          };

          state.CALL_FORM.$se_module = 'Leads';
          //
          state.TASK_FORM.What_Id = {
            name: response?.data[0]?.['Full_Name'],
            id: response?.data[0]?.['id'],
          };

          state.TASK_FORM.$se_module = 'Leads';
        }
        state.SENDMAIL_FORM.to_email = state.CURRENT_RECORD_DATA?.['Email'];

        // state.CALL_FORM.Call_Type = 'Outbound';
        //state.CALL_FORM.Call_Start_Time = '2024-05-13T15:16:00+08:00';
        // state.CALL_FORM.Call_Start_Time = '2024-05-13T15:16:00';
        // state.CALL_FORM.Call_Duration = '45:00';
        // state.CALL_FORM.Subject = 'Via Widget';
        // state.CALL_FORM.Call_Purpose = 'Prospecting';

        state.LOADING = false;
      })
      .addCase(getSelectedRecordByID.rejected, (state, { payload }) => {
        console.log('getSelectedRecordByID ERROR => ', payload);
        state.LOADING = false;
      });
    //
  },
});
export const {
  handleInputChange,
  handleCallFormData,
  handleResetCallFormData,
  handleOpenDropdownShow,
  handleTaskFormData,
  handleResetTaskFormData,
  handleEmailFormData,
  handleResetEmailFormData,
} = userSlice.actions;
export default userSlice.reducer;
