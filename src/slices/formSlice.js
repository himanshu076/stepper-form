import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  currentStep: 1,
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    companyWebsite: '',
    state: '',
    zipCode: '',
  },
  companyInfo: {
    fields: [],
    employees: '',
    wfhPolicy: '',
  },
  planSelection: {
    startDate: '',
    plan: '',
    planDuration: '',
    userCount: 0,
    price: 0,
  },
};


const formSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    previousStep: (state) => {
      state.currentStep -= 1;
    },
    updatePersonalInfo: (state, action) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateCompanyInfo: (state, action) => {
      state.companyInfo = { ...state.companyInfo, ...action.payload };
    },
    updatePlanSelection: (state, action) => {
      state.planSelection = { ...state.planSelection, ...action.payload };
    },
    resetForm: (state) => {
      return initialState;
    },
  },
});

export const {
  nextStep,
  previousStep,
  updatePersonalInfo,
  updateCompanyInfo,
  updatePlanSelection,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
