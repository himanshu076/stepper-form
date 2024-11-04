import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextStep, previousStep, updatePersonalInfo, updateCompanyInfo, updatePlanSelection } from '../slices/formSlice';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Box,
  FormHelperText,
} from '@mui/material';

import { STATES, INDUSTRIES, EMPLOYEE_RANGES, PLANS } from '../constants/constants';


// Validation schemas for each step
const personalInfoSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  companyName: Yup.string().required('Required'),
  companyWebsite: Yup.string().url('Invalid URL'),
  state: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
});

const companyInfoSchema = Yup.object({
  fields: Yup.array().min(1, 'Select at least one field'),
  employees: Yup.string().required('Required'),
  wfhPolicy: Yup.string().required('Required'),
});

const planSelectionSchema = Yup.object({
  startDate: Yup.date().required('Required'),
  plan: Yup.string().required('Required'),
  planDuration: Yup.string().required('Required'),
  userCount: Yup.number().required('Required').min(1, 'Must select at least 1 user'),
});

const StepperForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.form.currentStep);
  const personalInfo = useSelector((state) => state.form.personalInfo);
  const companyInfo = useSelector((state) => state.form.companyInfo);
  const planSelection = useSelector((state) => state.form.planSelection);

  const handleFinish = (values) => {
    dispatch(updatePlanSelection(values));
    setSuccessMessage('Your form has been submitted successfully!');
  };

  const handleNext = (values) => {
    if (currentStep === 1) {
      dispatch(updatePersonalInfo(values));
    } else if (currentStep === 2) {
      dispatch(updateCompanyInfo(values));
    } else if (currentStep === 3) {
      handleFinish(values);
    }
    dispatch(nextStep());
  };

  const handlePrevious = () => {
    dispatch(previousStep());
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Multi-Step Form
      </Typography>
      {/* Render success message */}
      {successMessage && (
        <Typography variant="h6" color="green" align="center" gutterBottom>
          {successMessage}
        </Typography>
      )}
      {currentStep === 1 && (
        <Formik
          initialValues={personalInfo}
          validationSchema={personalInfoSchema}
          onSubmit={handleNext}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <Typography variant="h6" gutterBottom>
                Step 1: Personal Information
              </Typography>
              <TextField
                fullWidth
                name="firstName"
                label="First Name"
                variant="outlined"
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                margin="normal"
              />
              <TextField
                fullWidth
                name="lastName"
                label="Last Name"
                variant="outlined"
                value={values.lastName}
                onChange={handleChange}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                margin="normal"
              />
              <TextField
                fullWidth
                name="email"
                label="Email"
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                margin="normal"
              />
              <TextField
                fullWidth
                name="companyName"
                label="Company Name"
                variant="outlined"
                value={values.companyName}
                onChange={handleChange}
                error={touched.companyName && Boolean(errors.companyName)}
                helperText={touched.companyName && errors.companyName}
                margin="normal"
              />
              <TextField
                fullWidth
                name="companyWebsite"
                label="Company Website"
                variant="outlined"
                value={values.companyWebsite}
                onChange={handleChange}
                error={touched.companyWebsite && Boolean(errors.companyWebsite)}
                helperText={touched.companyWebsite && errors.companyWebsite}
                margin="normal"
              />
              <FormControl fullWidth variant="outlined" margin="normal">
                <Select
                  name="state"
                  value={values.state || ''}
                  onChange={handleChange}
                  error={touched.state && Boolean(errors.state)}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Select State</em>
                  </MenuItem>
                  {STATES.map((state) => (
                    <MenuItem key={state.value} value={state.value}>
                      {state.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched.state && errors.state}</FormHelperText>
              </FormControl>
              <TextField
                fullWidth
                name="zipCode"
                label="Zip Code"
                variant="outlined"
                value={values.zipCode}
                onChange={handleChange}
                error={touched.zipCode && Boolean(errors.zipCode)}
                helperText={touched.zipCode && errors.zipCode}
                margin="normal"
              />
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Next
              </Button>
            </Form>
          )}
        </Formik>
      )}
      {currentStep === 2 && (
        <Formik
          initialValues={companyInfo}
          validationSchema={companyInfoSchema}
          onSubmit={handleNext}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <Typography variant="h6" gutterBottom>
                Step 2: Company Information
              </Typography>
              <FormGroup>
                {INDUSTRIES?.map((field) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="fields"
                        value={field}
                        checked={values.fields.includes(field)}
                        onChange={handleChange}
                      />
                    }
                    label={field}
                    key={field}
                  />
                ))}
                <FormHelperText error>{touched.fields && errors.fields}</FormHelperText>
              </FormGroup>
              <FormControl fullWidth variant="outlined" margin="normal">
                <Select
                  name="employees"
                  value={values.employees || ''}
                  onChange={handleChange}
                  error={touched.employees && Boolean(errors.employees)}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Select number of employees</em>
                  </MenuItem>
                  {EMPLOYEE_RANGES.map((range) => (
                    <MenuItem key={range.value} value={range.value}>
                      {range.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched.employees && errors.employees}</FormHelperText>
              </FormControl>
              <FormControl component="fieldset" margin="normal">
                <Typography component="legend">WFH Policy</Typography>
                <RadioGroup name="wfhPolicy" value={values.wfhPolicy} onChange={handleChange}>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                <FormHelperText error>{touched.wfhPolicy && errors.wfhPolicy}</FormHelperText>
              </FormControl>
              <Box display="flex"  justifyContent="space-between" mt={2} >
                <Button variant="contained" color="primary" onClick={handlePrevious}>
                  Previous
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Next
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}
      {currentStep === 3 && (
        <Formik
          initialValues={planSelection}
          validationSchema={planSelectionSchema}
          onSubmit={handleNext}
        >
          {({ values, errors, touched, handleChange }) => {
            // Calculate plan price and total price
            const planPrice = values.plan ? (values.plan === 'gold' ? (values.planDuration === 'monthly' ? PLANS.gold.monthly : PLANS.gold.yearly) : (values.planDuration === 'monthly' ? PLANS.titanium.monthly : PLANS.titanium.yearly)) : 0;
            const totalPrice = planPrice * (values.userCount || 0);
            return (
              <Form>
                <Typography variant="h6" gutterBottom>
                  Step 3: Plan Selection
                </Typography>
                <TextField
                  fullWidth
                  name="startDate"
                  label="Start Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={values.startDate}
                  onChange={handleChange}
                  error={touched.startDate && Boolean(errors.startDate)}
                  helperText={touched.startDate && errors.startDate}
                  margin="normal"
                />

                <FormControl component="fieldset" margin="normal" sx={{ mr: 3 }}>
                  <Typography component="legend">Select Duration</Typography>
                  <RadioGroup name="planDuration" value={values.planDuration} onChange={handleChange}>
                    <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
                    <FormControlLabel value="yearly" control={<Radio />} label="Yearly" />
                  </RadioGroup>
                </FormControl>

                <FormControl component="fieldset" margin="normal" sx={{ mr: 3 }}>
                  <Typography component="legend">Select a Plan</Typography>
                  <RadioGroup name="plan" value={values.plan} onChange={handleChange}>
                    <FormControlLabel value="gold" control={<Radio />} label="Gold Plan" />
                    <FormControlLabel value="titanium" control={<Radio />} label="Titanium Plan" />
                  </RadioGroup>
                  <FormHelperText error>{touched.plan && errors.plan}</FormHelperText>
                </FormControl>

                <FormControl fullWidth variant="outlined" margin="normal">
                  <Field
                    name="userCount"
                    type="number"
                    as={TextField}
                    variant="outlined"
                    label="Number of Users"
                    error={touched.userCount && Boolean(errors.userCount)}
                    helperText={touched.userCount && errors.userCount}
                  />
                </FormControl>

                {/* Order Summary */}
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Typography>
                  Selected Plan: {values.plan} ({values.planDuration === 'monthly' ? 'Monthly' : 'Yearly'})
                </Typography>
                <Typography>
                  Price per User: ${planPrice}
                </Typography>
                <Typography variant="h6">
                  Total Price: ${totalPrice}
                </Typography>

                <Box display="flex"  justifyContent="space-between" mt={2} >
                  <Button variant="contained" color="primary" onClick={handlePrevious}>
                    Previous
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Finish
                  </Button>
                </Box>
              </Form>
            )}
          }
        </Formik>
      )}
    </Container>
  );
};

export default StepperForm;
