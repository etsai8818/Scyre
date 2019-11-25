import React from 'react';
import AutoComplete from './AutoComplete';
import '../Images/companyAvatar.png';
import industries from './industries';
import './Auth.css';
import Navbar from '../Layout/Navbar';

class CompanyForm extends React.Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep2();
    };

    render() {
                return (
                    <div className="authwrapper">
                    <Navbar  className="landNavIndex" />
                    <div className="authPageBg">
                        <div className="centerContainer">
                            <div className="formContainerForAuth">
                                <div style={{display: 'block'}}>
                            <AutoComplete  items={industries}/>
                            <h5 onClick={this.back}
                            className="goBack" 
                            style={{ 
                                fontFamily: 'proxima-nova, sans-serif',
                                fontWeight: 500,
                                fontStyle: 'normal', 
                                color: '#FF705A', 
                                cursor: 'pointer',
                                fontSize: '15px' 
                                }}>Go back</h5>
                                </div>
                                </div>
                        </div>
                    </div> 
                    </div>  
                );
        }
    }

export default CompanyForm;