import React from "react";
import { Helmet } from 'react-helmet';
import favicon from '../Images/favicon.png';
import Navbar from '../Layout/Navbar';
import { Link } from 'react-router-dom';
import groupPic from '../Images/GroupChatImage.png';
import computers from '../Images/computers.png';
import profileImage from '../Images/profileImage.png';
import fingerprint from '../Images/fingerprint.png';
import hologram from '../Images/hologram.png';
import piggyBank from '../Images/piggyBank.png';
import mgDiagram from '../Images/mgDiagram.png';
import groupPicV2 from '../Images/groupChatImage-mobile.png';
import './LandingPage.css';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-149273294-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class LandingPage extends React.Component {

    render() {
        return (
            <div className="landingWrapper">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Scyre</title>
                    <link rel="shortcut icon" type="image/png" href={favicon}></link>
                    <link rel="stylesheet" href="https://use.typekit.net/mup7xxt.css"></link>
                </Helmet>
                <Navbar  className="landNavIndex" />
                
                <div className="firstSlide">
                    <div className="firstSlide-content">
                        <h1 style={{ fontFamily: 'proxima-nova, sans-serif' }}>Connect with others in the startup community.</h1>
                        <p style={{ fontFamily: 'proxima-nova, sans-serif' }}>Scyre is a messaging platform for startups and investors that allows you to combine your creative processes.</p>
                        <Link to="/get-started"><button className="landingPageButton" style={{ fontFamily: 'proxima-nova, sans-serif' }}><div className="button-circle" /><div className="buttonHoverText">GET STARTED</div></button></Link>
                        <h5 style={{ fontFamily: 'proxima-nova, sans-serif' }}>Already using Scyre?<Link to="/login" className="loginLinkHome"> Log in.</Link></h5>
                    </div>
                    <img src={groupPic} alt="group" className="imageV1" />
                    <img src={groupPicV2} alt="group"  className="imageV2"/>
                </div>

                <div className="secondSlide">
                    <div className="discoverCont">
                            <h1 style={{ fontFamily: 'proxima-nova, sans-serif' }}>Discover and collaborate with upcoming companies.</h1>
                            <p style={{ fontFamily: 'proxima-nova, sans-serif' }}>With Scyre, you can explore new startups, view their current status, and message them directly. Also, create public messaging channels with topics to connect with others who share the same interests.</p>
                    </div>
                    <img src={computers} alt="computers" />
                </div>

                <div className="thirdSlide">
                    <img src={profileImage} alt="profileImage" />
                    <div className="build-cont">
                        <h1 style={{ fontFamily: 'proxima-nova, sans-serif' }}>Build your profile</h1>
                        <div className="profileTypes">
                            <div className="profileDescription">
                               <div className="profileName">
                                   <img src={fingerprint} alt="fingerprint" />
                                   <h2 style={{ fontFamily: 'proxima-nova, sans-serif' }}>Personal</h2>
                                </div> 
                                <p style={{ fontFamily: 'proxima-nova, sans-serif' }}>Whether you are a founder, engineer, designer, or any other profession, you can join in to help create and be part of a motivating community in the startup world.</p>
                            </div>

                            <div className="profileDescription">
                               <div className="profileName">
                                   <img src={hologram} alt="fingerprint" />
                                   <h2 style={{ fontFamily: 'proxima-nova, sans-serif' }}>Company</h2>
                                </div> 
                                <p style={{ fontFamily: 'proxima-nova, sans-serif' }}>Get your company displayed and recognized by potential talent and investors. Collaborate with other startups to help build and test your product.</p>
                            </div>
                            
                            <div className="profileDescription">
                               <div className="profileName">
                                   <img src={piggyBank} alt="fingerprint" />
                                   <h2 style={{ fontFamily: 'proxima-nova, sans-serif' }}>Investor</h2>
                                </div> 
                                <p style={{ fontFamily: 'proxima-nova, sans-serif' }}>Find the next startup that will provide that 10x return. Utilize Scyre’s “Explore” page to stay updated on companies and connect with them instantly.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fourthSlide">
                <img src={mgDiagram} alt="diagram" className="diagramV1" />
                    <div className="feature-cont">
                        <div className="featureDesc">
                            <h2 style={{ fontFamily: 'proxima-nova, sans-serif' }}>Create any channel for any reason</h2>
                            <p style={{ fontFamily: 'proxima-nova, sans-serif' }}>In Scyre, we want you to feel connected to others in the startup community. Create public channels for any topic — it could be for any event, product launch, feedback, or anything else.</p>
                        </div>

                        <div className="featureDesc">
                            <h2 style={{ fontFamily: 'proxima-nova, sans-serif' }}>Upload media and share your product</h2>
                            <p style={{ fontFamily: 'proxima-nova, sans-serif' }}>An important action for startups is to get their product out into the hands of users and get feedback. Upload media to share demos of your product or just share your product directly.</p>
                        </div>

                        <div className="featureDesc">
                            <h2 style={{ fontFamily: 'proxima-nova, sans-serif' }}>Find founders in similar industries</h2>
                            <p style={{ fontFamily: 'proxima-nova, sans-serif' }}>Here at Scyre, we know startups can be challenging. Discover other founders working in your industry to share experiences, products, advice, and more.</p>
                        </div>
                    </div>

                    <img src={mgDiagram} alt="diagram"  className="diagramV2" />
                </div>

                <div className="fifthSlide">
                    <h1 style={{ fontFamily: 'proxima-nova, sans-serif' }}>stay connected.</h1>
                    <Link to="/get-started"><button className="tryFree" style={{ fontFamily: 'proxima-nova, sans-serif' }}>try scyre free</button></Link>
                </div>

                <div className="page-footer">
                  <h6 style={{ fontFamily: 'proxima-nova, sans-serif' }}>© 2019 Scyre. All rights reserved.</h6>
                  <a href="mailto: contact@scyre.com" style={{ fontFamily: 'proxima-nova, sans-serif' }}>contact@scyre.com</a>  
                </div>

            </div>
        );
    }
}

export default LandingPage;