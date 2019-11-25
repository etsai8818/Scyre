import React from 'react';
import firebase from '../../firebase';
import { Message } from 'semantic-ui-react';
import '../Images/personalAvatar.png';
import md5 from 'md5';
import Navbar from '../Layout/Navbar';

class Register extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
        loading: false,
        usersRef: firebase.database().ref('users'),
        allUsersRef: firebase.database().ref('allUsers')
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    isFormValid = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            error = { message: 'Fill in all fields'};
            this.setState({ errors: errors.concat(error) });
            return false;
        } else if (!this.isPasswordValid(this.state)) {
            error = { message: 'Passwords do not match or must be at least 6 characters'};
            this.setState({ errors: errors.concat(error) });
            return false;
        } else {
            return true;
        }
    };

    isFormEmpty = ({ name, email, password, passwordConfirmation}) => {
        return !name.length || !email.length || !password.length || !passwordConfirmation.length;
    };

    isPasswordValid = ({ password, passwordConfirmation }) => {
        if (password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }
    };

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid()) {
            this.setState({ errors: [], loading: true });
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
                console.log(createdUser);
                createdUser.user.updateProfile({
                    displayName: this.state.name,
                    photoURL: `https://i.ibb.co/qFcNXjD/personal-Avatar.png/${md5(createdUser.user.email)}?d=identicon`
                })
                .then(() => {
                    this.saveUser(createdUser).then(() => {
                        console.log('user saved');
                    })

                    this.saveAllUsers(createdUser).then(() => {
                        console.log('user saved');
                    })
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ errors: this.state.errors.concat(err), loading: false });
                })
            })
            .catch(err => {
                console.error(err);
                this.setState({ errors: this.state.errors.concat(err), loading: false });
            });
        }
    };

    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        });
    }

    saveAllUsers = createdUser => {
        return this.state.allUsersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        });
    }

    handleInputError = (errors, inputName) => {
        return errors.some(error => 
            error.message.toLowerCase().includes(inputName)
        ) 
            ? "error" 
            : ""
    }

    render() {
        const { 
            name, 
            email, 
            password, 
            passwordConfirmation, 
            errors,
            loading
        } = this.state;

        return (
            <div className="authwrapper">
            <Navbar  className="landNavIndex" />
            <div className="authPageBg">
                <div className="centerContainer">
                    <div className="formContainerForAuth">
                        <div style={{ display: 'block' }} >
                        <form onSubmit={this.handleSubmit} size="large">
                        <h1 style={{
                                fontFamily: 'proxima-nova, sans-serif',
                            }}>Create a Personal Profile</h1>
                        <div className="formContent">
                        <div className="authLabelAndInput">
                            <label style={{
                                fontFamily: 'proxima-nova, sans-serif',
                                fontWeight: 400,
                                fontStyle: 'normal'
                            }}>Name</label>
                            <input 
                                autoComplete="off"
                                fluid 
                                name="name" 
                                onChange={this.handleChange} 
                                type="text" 
                                value={name}
                                style={{
                                    fontFamily: 'proxima-nova, sans-serif',
                                    fontWeight: 400,
                                    fontStyle: 'normal'
                                }}
                            />
                        </div>
                        <div className="authLabelAndInput">
                            <label style={{
                                fontFamily: 'proxima-nova, sans-serif',
                                fontWeight: 400,
                                fontStyle: 'normal'
                            }}>Email</label>
                            <input 
                                autoComplete="off"
                                fluid 
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
                            <label style={{
                                fontFamily: 'proxima-nova, sans-serif',
                                fontWeight: 400,
                                fontStyle: 'normal'
                            }}>Password</label>
                            <input 
                                autoComplete="new-password"
                                fluid 
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
                        <div className="authLabelAndInput">
                            <label style={{
                                fontFamily: 'proxima-nova, sans-serif',
                                fontWeight: 400,
                                fontStyle: 'normal'
                            }}>Confirm Password</label>
                            <input 
                                autoComplete="new-password"
                                fluid 
                                name="passwordConfirmation" 
                                onChange={this.handleChange} 
                                type="password" 
                                value={passwordConfirmation}
                                className={this.handleInputError(errors, 'password')}
                                style={{
                                    fontFamily: 'proxima-nova, sans-serif',
                                    fontWeight: 400,
                                    fontStyle: 'normal'
                                }}
                            />
                        </div>
                            <button id="authButton" disabled={loading} className={loading ? 'loading' : ''} style={{
                                fontFamily: 'proxima-nova, sans-serif',
                                fontWeight: 500,
                                fontStyle: 'normal'
                            }}>Sign Up</button>
                        </div>
                    </form>
                    <br />
                    {errors.length > 0 && (
                        <Message error
                        style={{
                            display: "inline-block",
                            width: "357px"
                        }}>
                        {this.displayErrors(errors)}
                        </Message> 
                    )}
                    <br/>
                    <h5 onClick={this.back} style={{ 
                                fontFamily: 'proxima-nova, sans-serif',
                                fontWeight: 500,
                                fontStyle: 'normal', 
                                color: '#FF705A', 
                                cursor: 'pointer', 
                                paddingBttom: '50px;',
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

export default Register;