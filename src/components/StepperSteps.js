import React from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useSelector } from 'react-redux';

const steps = ['First step', 'Second step', 'Third step'];

function StepperSteps() {
    const currentStep = useSelector((state) => state.form.currentStep);

    const renderIcon = (stepIndex) => {
        if (stepIndex < currentStep) {
            return <CheckCircleIcon color="success" />;
        } else if (stepIndex === currentStep) {
            return <RadioButtonCheckedIcon color="primary" />;
        } else {
            return <RadioButtonUncheckedIcon color="disabled" />;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper alternativeLabel activeStep={currentStep} connector={null}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={() => renderIcon(index + 1)}>
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

export default StepperSteps;