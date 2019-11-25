import React from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Subheader from './Subheader';

import '../App.css';

class MessagesHeader extends React.Component {
    state = {
        channel: this.props.currentChannel,
        privateChannel: this.props.isPrivateChannel,
    }

    displayChannelDetails = channel => {
        return channel ? `${channel.details}` : '';
    }

    displayChannelCreatedBy = channel => {
        return channel ? `${channel.createdBy.name}` : '';
    }

    displayChannelCreatedByAvatar = channel => {
        return channel ? `${channel.createdBy.avatar}` : '';
    }

    render() {
        const { channelName, numUniqueUsers, handleSearchChange, isPrivateChannel, handleStar, isChannelStarred } = this.props;
        const { channel, privateChannel } = this.state;
        return (
            <div className="channelMainHeaderWrapped">
                <div className="channelHeaderWrapper">
                    <div 
                    fluid="true" 
                    as="h2" 
                    floated="left" 
                    style={{ 
                        padding: '0', 
                        borderRadius: '0', 
                        border: 'none',
                        display: 'flex', alignItems: 'center',
                    }}>

                        <span className="channelMessagesHeaderFont" style={{
                            fontFamily: 'proxima-nova, sans-serif',
                            fontWeight: 600,
                            fontStyle: 'normal',
                            fontSize: '17px',
                            color: '#5f5f5f',
                            minWidth: '300px',
                            display: 'flex', verticalAlign: 'bottom'}}>
                        {channelName}&nbsp;&nbsp;

                        {!isPrivateChannel && (
                            <Icon 
                                className="favoritedStarHeader"
                                onClick={handleStar}
                                name={isChannelStarred ? 'star' : 'star outline'} 
                                color={isChannelStarred ? 'yellow' : 'grey'}
                                style={{display: 'flex', alignItems: 'center' }} 
                            />
                        )}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {!isPrivateChannel && (<span 
                            className="subheader"
                            style={{
                                fontFamily: 'proxima-nova, sans-serif',
                                fontWeight: 500,
                                fontStyle: 'normal',
                                fontSize: '14px',
                                display: 'flex', alignItems: 'center',
                            }}>

                            <div 
                            className="uniqueUserCircleGreen" /> &nbsp;&nbsp;{numUniqueUsers}

                            </span>)}

                        </span>
                    </div>

                    {/* Channel Search Input */}
                    <div floated="right" style={{ borderRadius: '0', display: 'flex-end', alignItems: 'center', }} className="input-icons" >
                        <input
                            onChange={handleSearchChange}
                            autoComplete="new-password"
                            placeholder="Search Messages"
                            className="searchInput"
                            style={{
                                fontFamily: 'proxima-nova, sans-serif',
                                fontWeight: 400,
                                fontStyle: 'normal',
                                fontSize: '14px'
                            }}
                        />
                    </div>
                </div>

                {!isPrivateChannel && (<Subheader 
                    channel={channel}
                    channelCreatedBy={this.displayChannelCreatedBy(channel)}
                    channelCreatedByAvatar={this.displayChannelCreatedByAvatar(channel)}
                    channelDetails={this.displayChannelDetails(channel)}
                    isPrivateChannel={privateChannel}
                />)}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currrentUser,
    currentChannel: state.channel.currentChannel,
    isPrivateChannel: state.channel.isPrivateChannel
  });
  
  export default connect(mapStateToProps)(MessagesHeader);