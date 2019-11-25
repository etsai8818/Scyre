import React from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel, setPrivateChannel, setExplorePage } from '../../actions';
import '../App.css';
import industryIcon from '../Images/industryIcon.png';
import teamIcon from '../Images/teamIcon.png';
import moneyIcon from '../Images/moneyIcon.png';
import ExploreSkeleton from './ExploreSkeleton';
import Linkify from 'react-linkify';

class Banking extends React.Component {
    state = {
    activeChannel: '',
    company: this.props.currentUser,
    users: [],
    companyRef: firebase.database().ref('allUsers'),
}


componentDidMount() {
    if (this.state.company) {
        this.addListeners(this.state.company.uid);
    }
}

addListeners = currentUserUid => {
    let loadedUsers = [];
    // ****************** FOR TRANSPORTATION REF ********************************************************
    this.state.companyRef.orderByChild('industryType').equalTo('Banking').on('child_added', snap => {
        if (currentUserUid !== snap.key) {
            let company = snap.val();
            company['uid'] = snap.key;
            loadedUsers.push(company);
            this.setState({ users: loadedUsers });
        }
    });
    this.state.companyRef.orderByChild('industryType').equalTo('Blockchain').on('child_added', snap => {
        if (currentUserUid !== snap.key) {
            let company = snap.val();
            company['uid'] = snap.key;
            loadedUsers.push(company);
            this.setState({ users: loadedUsers });
        }
    });
    this.state.companyRef.orderByChild('industryType').equalTo('Finance').on('child_added', snap => {
        if (currentUserUid !== snap.key) {
            let company = snap.val();
            company['uid'] = snap.key;
            loadedUsers.push(company);
            this.setState({ users: loadedUsers });
        }
    });
    this.state.companyRef.orderByChild('industryType').equalTo('FinTech').on('child_added', snap => {
        if (currentUserUid !== snap.key) {
            let company = snap.val();
            company['uid'] = snap.key;
            loadedUsers.push(company);
            this.setState({ users: loadedUsers });
        }
    });
    this.state.companyRef.orderByChild('industryType').equalTo('Insurance').on('child_added', snap => {
        if (currentUserUid !== snap.key) {
            let company = snap.val();
            company['uid'] = snap.key;
            loadedUsers.push(company);
            this.setState({ users: loadedUsers });
        }
    });
    this.state.companyRef.orderByChild('industryType').equalTo('Payments').on('child_added', snap => {
        if (currentUserUid !== snap.key) {
            let company = snap.val();
            company['uid'] = snap.key;
            loadedUsers.push(company);
            this.setState({ users: loadedUsers });
        }
    });
    this.state.companyRef.orderByChild('industryType').equalTo('Lending').on('child_added', snap => {
        if (currentUserUid !== snap.key) {
            let company = snap.val();
            company['uid'] = snap.key;
            loadedUsers.push(company);
            this.setState({ users: loadedUsers });
        }
    });
    this.state.companyRef.orderByChild('industryType').equalTo('Trading Platform').on('child_added', snap => {
        if (currentUserUid !== snap.key) {
            let company = snap.val();
            company['uid'] = snap.key;
            loadedUsers.push(company);
            this.setState({ users: loadedUsers });
        }
    });
    this.state.companyRef.orderByChild('industryType').equalTo('Venture Capital').on('child_added', snap => {
        if (currentUserUid !== snap.key) {
            let company = snap.val();
            company['uid'] = snap.key;
            loadedUsers.push(company);
            this.setState({ users: loadedUsers });
        }
    });
}

changeChannel = user => {
    const channelId = this.getChannelId(user.uid);
    const channelData = {
        id: channelId,
        name: user.name
    };
    this.props.setCurrentChannel(channelData);
    this.props.setPrivateChannel(true);
    this.props.setExplorePage(false);
    this.setActiveChannel(user.uid);
};

getChannelId = userId => {
    const currentUserUid = this.state.company.uid;
    return userId < currentUserUid ? 
    `${userId}/${currentUserUid}` : `${currentUserUid}/${userId}`;
};

setActiveChannel = userId => {
    this.setState({ activeChannel: userId });
}

render() {
    const { users, activeChannel } = this.state;

    return (
                <div className="industryTypeContainer" style={{marginTop: '30px'}}>
                <h1 style={{ fontFamily: 'proxima-nova, sans-serif' }}>
                    Banking, Finance, and Insurance</h1>
                <div className="industryCompanyFlex">
                {users.map(company => (
                    <div className="companyDescContainer">
                        <div className="companyDescHeader">
                            <div className="compNameAvatar">
                            <h2 style={{ fontFamily: 'proxima-nova, sans-serif' }}>{company.name}</h2>
                            <img 
                                className="exploreAvatar" 
                                src={company.avatar} 
                                alt="avatar">
                            </img>
                            </div>
                            <h3 style={{ fontFamily: 'proxima-nova, sans-serif' }}>{company.description}</h3>
                            <h4 style={{ fontFamily: 'proxima-nova, sans-serif' }}><Linkify properties={{ target: '_blank', style: { color: 'blue' } }}>{company.website}</Linkify></h4>
                        </div>
                        <div className="companyDescBottom">
                            <div>
                            <div className="companyMoreExploreInfo" style={{ fontFamily: 'proxima-nova, sans-serif' }}>
                                <img
                                    src={industryIcon}
                                    alt="Icon"
                                    className="companyInfoIcon"
                                />
                                {company.industryType}
                            </div>  

                            <div className="companyMoreExploreInfo" style={{ fontFamily: 'proxima-nova, sans-serif' }}>
                                <img
                                    src={teamIcon}
                                    alt="Icon"
                                    className="companyInfoIcon"
                                />
                                {company.team} Employees
                            </div>   

                            <div className="companyMoreExploreInfo" style={{ fontFamily: 'proxima-nova, sans-serif' }}>
                                <img
                                    src={moneyIcon}
                                    alt="Icon"
                                    className="companyInfoIcon"
                                />
                                ${company.totalFunding}{company.totalFundingType} Raised
                            </div>
                        </div>
                        <button key={company.uid}
                                active={company.uid === activeChannel}
                                onClick={() => this.changeChannel(company)}
                                className="exploreMessageButton"
                            >Message</button>
                        </div>
                    </div>))}
                    <ExploreSkeleton />
                    </div>
                </div>
    );
}
}

const mapStateToProps = state => ({
currentUser: state.user.currentUser,
currentChannel: state.channel.currentChannel,
isExplorePage: state.channel.isExplorePage
});

export default connect(mapStateToProps, { setCurrentChannel, setPrivateChannel, setExplorePage })(Banking);