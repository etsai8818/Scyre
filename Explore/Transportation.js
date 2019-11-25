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

class Transportation extends React.Component {
    state = {
    activeChannel: '',
    transportation: this.props.currentUser,
    artificial: this.props.currentUser,
    users: [],
    companyRef: firebase.database().ref('allUsers'),
}


componentDidMount() {
    if (this.state.transportation) {
        this.addListeners(this.state.transportation.uid);
    }
}

addListeners = currentUserUid => {
    let loadedUsers = [];
    // ****************** FOR TRANSPORTATION REF ********************************************************
    this.state.companyRef.orderByChild('industryType').equalTo('Aerospace').on('child_added', snap => {
        if (currentUserUid !== snap.key) {
            let transportation = snap.val();
            transportation['uid'] = snap.key;
            loadedUsers.push(transportation);
            this.setState({ users: loadedUsers });
        }
    });
    this.state.companyRef.orderByChild('industryType').equalTo('Automotive').on('child_added', snap => {
        if (currentUserUid !== snap.key) {
            let transportation = snap.val();
            transportation['uid'] = snap.key;
            loadedUsers.push(transportation);
            this.setState({ users: loadedUsers });
        }
    });
    this.state.companyRef.orderByChild('industryType').equalTo('Transportation').on('child_added', snap => {
        if (currentUserUid !== snap.key) {
            let transportation = snap.val();
            transportation['uid'] = snap.key;
            loadedUsers.push(transportation);
            this.setState({ users: loadedUsers });
        }
    });
    this.state.companyRef.orderByChild('industryType').equalTo('Drones').on('child_added', snap => {
        if (currentUserUid !== snap.key) {
            let transportation = snap.val();
            transportation['uid'] = snap.key;
            loadedUsers.push(transportation);
            this.setState({ users: loadedUsers });
        }
    });
    this.state.companyRef.orderByChild('industryType').equalTo('Navigation').on('child_added', snap => {
        if (currentUserUid !== snap.key) {
            let transportation = snap.val();
            transportation['uid'] = snap.key;
            loadedUsers.push(transportation);
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
    const currentUserUid = this.state.transportation.uid;
    return userId < currentUserUid ? 
    `${userId}/${currentUserUid}` : `${currentUserUid}/${userId}`;
};

setActiveChannel = userId => {
    this.setState({ activeChannel: userId });
}

render() {
    const { users, activeChannel } = this.state;

    return (
                <div className="industryTypeContainer">
                <h1 style={{ fontFamily: 'proxima-nova, sans-serif' }}>
                    Aerospace, Automotive, and Transportation</h1>
                <div className="industryCompanyFlex">
                {users.map(transportation => (
                    <div className="companyDescContainer">
                        <div className="companyDescHeader">
                            <div className="compNameAvatar">
                            <h2 style={{ fontFamily: 'proxima-nova, sans-serif' }}>{transportation.name}</h2>
                            <img 
                                className="exploreAvatar" 
                                src={transportation.avatar} 
                                alt="avatar">
                            </img>
                            </div>
                            <h3 style={{ fontFamily: 'proxima-nova, sans-serif' }}>{transportation.description}</h3>
                            <h4 style={{ fontFamily: 'proxima-nova, sans-serif' }}><Linkify properties={{ target: '_blank', style: { color: 'blue' } }}>{transportation.website}</Linkify></h4>
                        </div>
                        <div className="companyDescBottom">
                            <div>
                            <div className="companyMoreExploreInfo" style={{ fontFamily: 'proxima-nova, sans-serif' }}>
                                <img
                                    src={industryIcon}
                                    alt="Icon"
                                    className="companyInfoIcon"
                                />
                                {transportation.industryType}
                            </div>  

                            <div className="companyMoreExploreInfo" style={{ fontFamily: 'proxima-nova, sans-serif' }}>
                                <img
                                    src={teamIcon}
                                    alt="Icon"
                                    className="companyInfoIcon"
                                />
                                {transportation.team} Employees
                            </div>   

                            <div className="companyMoreExploreInfo" style={{ fontFamily: 'proxima-nova, sans-serif' }}>
                                <img
                                    src={moneyIcon}
                                    alt="Icon"
                                    className="companyInfoIcon"
                                />
                                ${transportation.totalFunding}{transportation.totalFundingType} Raised
                            </div>
                        </div>
                        <button key={transportation.uid}
                                active={transportation.uid === activeChannel}
                                onClick={() => this.changeChannel(transportation)}
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

export default connect(mapStateToProps, { setCurrentChannel, setPrivateChannel, setExplorePage })(Transportation);