import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import personalPageIcon from '../Images/personalPageIcon.png';
import companyPageIcon from '../Images/companyPageIcon.png';
import investorPageIcon from '../Images/investorPageIcon.png';
import Navbar from '../Layout/Navbar';

export class GetStartedDetails extends Component {
    personal = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    company = e => {
        e.preventDefault();
        this.props.nextStep2();
    };

    investor = e => {
        e.preventDefault();
        this.props.nextStep3();
    };

    render() {
        return (
            <div className="authwrapper">
            <Navbar  className="landNavIndex" />
            <div className="authPageBg">
                <div className="centerContainer">
                <div className="formContainerForAuth">
                    <br />
                        <div className="centerForm getStartedForm">
                            <h2 
                            style={{
                                fontFamily: 'proxima-nova, sans-serif', 
                                fontWeight: 700, 
                                fontStyle: 'normal'
                            }}>Get started with Scyre.</h2>
                            <div className="formContent formAuthContentPages">
                            <p className="connectWithOthers"
                            style={{
                                fontFamily: 'proxima-nova, sans-serif', 
                                fontWeight: 400, 
                                fontStyle: 'normal',
                                color: '#818181'
                            }}>Connect and work with other companies and investors to build the ultimate product.</p>
                            <hr />
                            <div className="personal-auth authLocation" onClick={this.personal}>
                                <div className="pageIconContainer">
                                    <img 
                                        src={personalPageIcon}
                                        alt="Personal Icon"
                                    />
                                </div>
                                <div className="headerAndParagraph">
                                    <h3 style={{
                                        fontFamily: 'proxima-nova, sans-serif', 
                                        fontWeight: 600, 
                                        fontStyle: 'normal'
                                    }}>Search with a Personal Account</h3>
                                    <p 
                                    style={{
                                        fontFamily: 'proxima-nova, sans-serif', 
                                        fontWeight: 400, 
                                        fontStyle: 'normal'
                                    }}>Join Scyre's community and collaborate with others.</p>
                                </div>
                            </div>
                            <hr />
                            <div className="company-auth authLocation" onClick={this.company}>
                            <div className="pageIconContainer">
                                    <img 
                                        src={companyPageIcon}
                                        alt="Company Icon"
                                    />
                                </div>
                                <div className="headerAndParagraph">
                                        <h3 style={{
                                            fontFamily: 'proxima-nova, sans-serif', 
                                            fontWeight: 600, 
                                            fontStyle: 'normal'
                                        }}>Create a Company Profile</h3>
                                        <p 
                                        style={{
                                            fontFamily: 'proxima-nova, sans-serif', 
                                            fontWeight: 400, 
                                            fontStyle: 'normal'
                                        }}>Get recognized by other companies and investors. </p>
                                </div>
                            </div>
                            <hr />
                            <div className="investor-auth authLocation" onClick={this.investor}>
                            <div className="pageIconContainer">
                                    <img 
                                        src={investorPageIcon}
                                        alt="Investor Icon"
                                    />
                                </div>
                                <div className="headerAndParagraph">
                                <h3 
                                style={{
                                    fontFamily: 'proxima-nova, sans-serif', 
                                    fontWeight: 600, 
                                    fontStyle: 'normal'
                                }}>Join as an Investor</h3>
                                <p 
                                style={{
                                    fontFamily: 'proxima-nova, sans-serif', 
                                    fontWeight: 400, 
                                    fontStyle: 'normal'
                                }}>Find the next unicorn and instantly connect with them.</p>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <br />
                        <div style={{ width: '100%', textAlign: 'center'}}>
                        <h3 style={{ 
                                fontFamily: 'proxima-nova, sans-serif',
                                fontWeight: 500,
                                fontStyle: 'normal', 
                                color: '#777777', 
                                cursor: 'pointer',
                                fontSize: '15px',
                                paddingTop: '20px' 
                                }}>Already a user? <Link to="/login" style={{ 
                                    fontFamily: 'proxima-nova, sans-serif',
                                    fontWeight: 500,
                                    fontStyle: 'normal', 
                                    color: '#FF705A', 
                                    cursor: 'pointer', 
                                    fontSize: '15px' 
                                    }}>Log in.</Link>
                            </h3>
                            </div>
                    </div>
                    <br />
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GetStartedDetails;