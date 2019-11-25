import React from 'react'

import scyreLogo from '../Images/scyre-color.png';
import './Navbar.css';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    render () {
        return (
            <div className="navbarHeader">
                <div className="headerCont">
                <Link to="/welcome">
                    <img src={scyreLogo} className="mainLogo" alt="Scyre Logo"></img>
                </Link>
                <nav>
                    <ul className="navLinks">
                        {/*<li><a 
                                href="/" 
                                className="navLink-1" 
                                style={{
                                    fontFamily: 'proxima-nova, sans-serif',
                                    fontWeight: 400,
                                    fontStyle: 'normal'
                                }}>How it Works
                            </a></li>
                        <li><a 
                                href="/" 
                                className="navLink-2"
                                style={{
                                    fontFamily: 'proxima-nova, sans-serif',
                                    fontWeight: 400,
                                    fontStyle: 'normal'
                                }}>Enterprise</a></li>
                        <li><a 
                                href="/" 
                                className="navLink-3"
                                style={{
                                    fontFamily: 'proxima-nova, sans-serif',
                                    fontWeight: 400,
                                    fontStyle: 'normal'
                                }}>Pricing</a></li>
                        <li><a 
                            href="/" 
                            className="navLink-4"
                            style={{
                                fontFamily: 'proxima-nova, sans-serif',
                                fontWeight: 400,
                                fontStyle: 'normal'
                            }}>Solutions</a></li>
                        */}
                        <li className="getStartedLi"><Link 
                        to="/get-started" 
                        className="getStarted"
                        style={{
                            fontFamily: 'proxima-nova, sans-serif',
                            fontWeight: 600,
                            fontStyle: 'normal'
                        }}>GET STARTED</Link></li>
                    </ul>
                </nav>
                </div>
            </div>
        )
    }
}

export default Navbar;