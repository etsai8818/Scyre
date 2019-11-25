import React from 'react';import '../App.css';
import industryIcon from '../Images/industryIcon.png';
import teamIcon from '../Images/teamIcon.png';
import moneyIcon from '../Images/moneyIcon.png';

const ExploreSkeleton = () => (
            <div className="exploreSkeleton">
            <div className="companyDescContainer">
                        <div className="companyDescHeader">
                            <div className="compNameAvatar">
                                <div className="exploreNameSkeleton" />
                                <div className="exploreAvatarSkeleton" />
                            </div>
                            <div className="exploreDescSkeleton" />
                        </div>
                        <div className="companyDescBottom">
                            <div>
                            <div className="companyMoreExploreInfo" style={{ fontFamily: 'proxima-nova, sans-serif' }}>
                                <img
                                    src={industryIcon}
                                    alt="Icon"
                                    className="companyInfoIcon"
                                />
                                Industry
                            </div>  

                            <div className="companyMoreExploreInfo" style={{ fontFamily: 'proxima-nova, sans-serif', whiteSpace: 'nowrap' }}>
                                <img
                                    src={teamIcon}
                                    alt="Icon"
                                    className="companyInfoIcon"
                                />
                                Number of Employees
                            </div>   

                            <div className="companyMoreExploreInfo" style={{ fontFamily: 'proxima-nova, sans-serif' }}>
                                <img
                                    src={moneyIcon}
                                    alt="Icon"
                                    className="companyInfoIcon"
                                />
                                Amount Raised
                            </div>
                            </div>
                            <button className="messageExploreSkeleton">Message</button>
                        </div>
                    </div>
                </div>
        )
export default ExploreSkeleton;