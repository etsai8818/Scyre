import React from 'react';
import firebase from '../../firebase';
import { Helmet } from 'react-helmet';
import favicon from '../Images/favicon.png';
import { Link } from 'react-router-dom';
import './Auth.css';
import { Message } from 'semantic-ui-react';
import Navbar from '../Layout/Navbar';

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errors: [],
        loading: false,
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };


    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true });
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    console.log(signedInUser);
                })
                .catch(err => {
                    console.error(err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: false
                    });
                });
        }
    };

    isFormValid = ({ email, password }) => email && password;

    handleInputError = (errors, inputName) => {
        return errors.some(error => 
            error.message.toLowerCase().includes(inputName)
        ) 
            ? "error" 
            : ""
    }

    render() {
        const {  
            email, 
            password, 
            errors,
            loading
        } = this.state;

        return (
            <div className="authwrapper">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login - Scyre</title>
                <link rel="shortcut icon" type="image/png" href={favicon}></link>
            </Helmet>
            <Navbar  className="landNavIndex" />
            <div className="authPageBg">
                    <div className="centerContainer">
                    <div className="formContainerForAuth">
                                <div style={{display: 'block'}}>
                    {/*
                    <img 
                        className="scyreLogoAuth"
                        src={scyreLogo}
                        alt="Scyre Logo"
                    />
                    */}
                    <br />
                    <form onSubmit={this.handleSubmit} size="large">
                        <h1 style={{
                            fontFamily: 'proxima-nova, sans-serif', 
                            fontWeight: 700, 
                            fontStyle: 'normal'
                        }}>Log in to Scyre.</h1>
                        <div className="formContent">
                            <div className="authLabelAndInput">
                            <label
                            style={{
                                fontFamily: 'proxima-nova, sans-serif',
                                fontWeight: 400,
                                fontStyle: 'normal'
                            }}
                            >Email</label>
                            <input 
                                required
                                autoComplete="off"
                                name="email" 
                                onChange={this.handleChange} 
                                type="email" 
                                value={email}
                                className={this.handleInputError(errors, 'email')}
                                style={{
                                    fontFamily: 'proxima-nova, sans-serif',
                                    fontWeight: 400,
                                    fontStyle: 'normal'
                                }}
                            />
                            </div>
                            <div className="authLabelAndInput">
                            <label>Password</label>
                            <input
                                required 
                                autoComplete="new-password"
                                name="password" 
                                onChange={this.handleChange} 
                                type="password" value={password}
                                className={this.handleInputError(errors, 'password')}
                                style={{
                                    fontFamily: 'proxima-nova, sans-serif',
                                    fontWeight: 400,
                                    fontStyle: 'normal'
                                }}
                            />
                            </div>
                            <div className="authButton">
                            <button 
                            style={{
                                fontFamily: 'proxima-nova, sans-serif',
                                fontWeight: 500,
                                fontStyle: 'normal'
                            }}
                            disabled={loading} className={loading ? 'loading' : ''} id="authButton">Log In</button>
                            </div>
                        </div>
                    </form>
                    <br />
                    {errors.length > 0 && (
                        <Message error
                        style={{
                            display: "inline-block",
                            width: "462px"
                        }}
                        >
                        {this.displayErrors(errors)}
                        </Message> 
                    )}
                    <div className="accountFormPage"
                    style={{
                        fontFamily: 'proxima-nova, sans-serif',
                        fontWeight: 500,
                        fontStyle: 'normal'
                    }}
                    >
                    Don't have an account? <Link to="/get-started" style={{ color: '#FF705A', cursor: 'pointer' }}>Sign up.</Link>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Login;