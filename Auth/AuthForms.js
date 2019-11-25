import React from 'react';
import GetStartedDetails from './GetStartedDetails';
import Register from './Register';
import InvestorRegister from './InvestorRegister';
import CompanyForm from './CompanyForm';

class AuthForms extends React.Component {
    state = {
        step: 1
    };

    // Proceed to the next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };

    nextStep2 = () => {
        const { step } = this.state;
        this.setState({
            step: step + 2
        });
    };

    nextStep3 = () => {
        const { step } = this.state;
        this.setState({
            step: step + 3
        });
    };

    // Back to the previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    prevStep2 = () => {
        const { step } = this.state;
        this.setState({
            step: step - 2
        });
    };

    prevStep3 = () => {
        const { step } = this.state;
        this.setState({
            step: step - 3
        });
    };

    // Handle fields change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    render() {
        const { step } = this.state;
        // eslint-disable-next-line
        switch(step) {
            case 1:
                return (
                    <GetStartedDetails
                        nextStep={this.nextStep}
                        nextStep2={this.nextStep2}
                        nextStep3={this.nextStep3}
                    />
                );
            case 2:
                return (
                    <Register
                        prevStep={this.prevStep}
                    />
                );
            case 3:
                return (
                    <CompanyForm
                        prevStep2={this.prevStep2}
                    />
                );
            case 4:
                return (
                    <InvestorRegister
                        prevStep3={this.prevStep3}

                    />
                );
        }
    }
}

export default AuthForms;