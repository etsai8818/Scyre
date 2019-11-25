import React from 'react';
import firebase from '../../firebase';
import { Message } from 'semantic-ui-react';
import '../Images/companyAvatar.png';
import md5 from 'md5';
import './Auth.css';

export default class AutoComplete extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            suggestions: [], 
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            website: '',
            companyDescription: '',
            industry: '',
            fundingRaised: '',
            fundingRaisedType: '',
            teamSize: '',
            errors: [],
            loading: false,
            usersRef: firebase.database().ref('companies'),
            allUsersRef: firebase.database().ref('allUsers')
        };
    }

    onTextChanged = (e) => {
        const { items } = this.props;
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = items.sort().filter(v => regex.test(v));
        }
        this.setState (() => ({ suggestions, industry: value }));
    }

    suggestionSelected (value) {
        this.setState(() => ({
            industry: value,
            suggestions: [],
        }));
    }

    renderSuggestions () {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li key={item} onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        );
    }

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

    handleChangeFunding = event => {
        this.setState({ [event.target.name]: event.target.value.substr(0, 3)});
    };

    handleChangeDescription = event => {
        this.setState({ [event.target.name]: event.target.value.substr(0, 86)});
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
                    photoURL: `https://i.ibb.co/PgTsXZ1/company-Avatar.png/${md5(createdUser.user.email)}?d=identicon`,
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
            avatar: createdUser.user.photoURL,
            website: this.state.website,
            description: this.state.companyDescription,
            industryType: this.state.industry,
            totalFunding: this.state.fundingRaised,
            totalFundingType: this.state.fundingRaisedType,
            team: this.state.teamSize
        });
    }

    saveAllUsers = createdUser => {
        return this.state.allUsersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL,
            website: this.state.website,
            description: this.state.companyDescription,
            industryType: this.state.industry,
            totalFunding: this.state.fundingRaised,
            totalFundingType: this.state.fundingRaisedType,
            team: this.state.teamSize
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
            website,
            companyDescription, 
            industry, 
            fundingRaised,
            fundingRaisedType,
            teamSize,
            errors,
            loading
        } = this.state;
                return (
                <div>
                        <form onSubmit={this.handleSubmit} size="large" style={{ border: "1px solid #EAEAEA" }} >
                            <h1
                                style={{
                                    fontFamily: 'proxima-nova, sans-serif', 
                                    fontWeight: 700, 
                                    fontStyle: 'normal'
                                }}
                            >Create a Company Profile</h1>
                            <div className="formContent">
                            <div className="authLabelAndInput">
                                <label style={{
                                fontFamily: 'proxima-nova, sans-serif',
                                fontWeight: 400,
                                fontStyle: 'normal'
                            }}>Company Name</label>
                                <input 
                                    autoComplete="off"
                                    fluid 
                                    name="name" 
                                    iconPosition="left" 
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
                                    autoComplete="new-password"
                                    fluid 
                                    name="email" 
                                    iconPosition="left" 
                                    onChange={this.handleChange} 
                                    type="email" 
                                    value={email}
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
                                    iconPosition="left" 
                                    onChange={this.handleChange} 
                                    type="password" 
                                    value={password}
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
                                    iconPosition="left" 
                                    onChange={this.handleChange} 
                                    type="password" 
                                    value={passwordConfirmation}
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
                            }}>Website &nbsp;<h5>(If applicable)</h5></label>
                                <input
                                    autoComplete="new-password"
                                    fluid 
                                    name="website" 
                                    iconPosition="left" 
                                    onChange={this.handleChange} 
                                    type="text" 
                                    value={website}
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
                            }}>Company Description &nbsp;<h5>(85 characters or less)</h5></label>
                                <input 
                                    required
                                    autoComplete="new-password"
                                    fluid 
                                    name="companyDescription" 
                                    iconPosition="left" 
                                    onChange={this.handleChangeDescription} 
                                    type="text" 
                                    value={companyDescription}
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
                            }}>Industry</label>
                                <input 
                                    className="autoCompleteInputAuthForm"
                                    autoComplete="new-password"
                                    required
                                    type="text" 
                                    name="industry"
                                    onChange={this.onTextChanged}
                                    value={industry}
                                    style={{
                                        fontFamily: 'proxima-nova, sans-serif',
                                        fontWeight: 400,
                                        fontStyle: 'normal'
                                    }}
                                />
                                <div className="AutoCompleteText">
                                {this.renderSuggestions()}
                                </div>
                            </div>
                            <div className="authLabelAndInput totalFundingRaisedAuth">
                                <label style={{
                                fontFamily: 'proxima-nova, sans-serif',
                                fontWeight: 400,
                                fontStyle: 'normal'
                            }}>Total Funding Raised &nbsp;<h5>(USD)</h5></label>
                                <div className="fundingRaisedInputs">
                                <input 
                                    required
                                    autoComplete="new-password"
                                    fluid 
                                    name="fundingRaised" 
                                    onChange={this.handleChangeFunding} 
                                    type="number" 
                                    onDrop="return false;"
                                    onPaste="return false;"
                                    value={fundingRaised}
                                    className="fundingRaised"
                                    style={{
                                        fontFamily: 'proxima-nova, sans-serif',
                                        fontWeight: 400,
                                        fontStyle: 'normal'
                                    }}
                                />
                                <select 
                                    required 
                                    name="fundingRaisedType" 
                                    type="submit" 
                                    value={fundingRaisedType}
                                    onChange={this.handleChange}
                                    className="fundingRaisedType"
                                    style={{
                                        fontFamily: 'proxima-nova, sans-serif',
                                        fontWeight: 400,
                                        fontStyle: 'normal'
                                    }}
                                    >
                                        <option value="" defaultValue disabled hidden>Select</option>
                                        <option value="K">K</option>
                                        <option value="M">M</option>
                                        <option value="B">B</option>
                                </select>
                                </div>
                            </div>
                            <div className="authLabelAndInput">
                                <label style={{
                                fontFamily: 'proxima-nova, sans-serif',
                                fontWeight: 400,
                                fontStyle: 'normal'
                            }}>Team Size</label>
                                <select 
                                    required 
                                    name="teamSize" 
                                    type="submit" 
                                    value={teamSize}
                                    onChange={this.handleChange}
                                    style={{
                                        fontFamily: 'proxima-nova, sans-serif',
                                        fontWeight: 400,
                                        fontStyle: 'normal'
                                    }}>
                                        <option value="" defaultValue disabled hidden>Select an option</option>
                                        <option value="1-10">1-10</option>
                                        <option value="11-50">11-50</option>
                                        <option value="51-100">51-100</option>
                                        <option value="101-250">101-250</option>
                                        <option value="251-500">251-500</option>
                                        <option value="501-1000">501-1000</option>
                                        <option value="1001-5000">1001-5000</option>
                                        <option value="5000+">5000+</option>
                                    </select>
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
                                    width: "460px"
                                }}>
                                {this.displayErrors(errors)}
                                </Message> 
                            )}
                        </div>
                );
        }
    }