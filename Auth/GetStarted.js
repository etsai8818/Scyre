import React from 'react';
import { Helmet } from 'react-helmet';
import favicon from '../Images/favicon.png';
import AuthForms from './AuthForms';
import './Auth.css';

class GetStarted extends React.Component {
    render() {
        return (
            <div className="authwrapper">
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, height=device-height"></meta>
                <title>Get Started - Scyre</title>
                <link rel="shortcut icon" type="image/png" href={favicon}></link>
            </Helmet>
            <AuthForms />
            </div>
        )
    }
}

export default GetStarted;