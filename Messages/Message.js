import React from 'react';
import moment from  'moment';
import { connect } from 'react-redux';
import { setCurrentChannel, setPrivateChannel, setExplorePage} from '../../actions';
import { Comment, Image } from 'semantic-ui-react';
import Linkify from 'react-linkify';

const isOwnMessage = ( message, user ) => {
    return message.user.id === user.uid ? 'message__self' : '';
}

const isImage = (message) => {
    return message.hasOwnProperty('image') && !message.hasOwnProperty('content');
}

const timeFromNow = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user }) => (
    <Comment style={{ paddingBottom: '20px'}}>
        <div style={{ display: 'flex' }}>
        <img src={message.user.avatar} alt="avatar" className="messageUserAvatar" />
        <Comment.Content className={isOwnMessage(message, user)} id="commentContent" >
            <div className="userAndTimeContainer">
            <h2 as="a" className="userMessagesName" style={{
                        fontFamily: 'proxima-nova, sans-serif',
                        fontWeight: 600,
                        fontStyle: 'normal',
                    }}>
                {message.user.name}
            </h2>
            <Comment.Metadata style={{
                        paddingLeft: '10px',
                        fontFamily: 'proxima-nova, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '13px',
                        color: '#6F6F6F'
                    }} >
                {timeFromNow(message.timestamp)}
            </Comment.Metadata>
            </div>
            <div className="messageContentStyles">
            {isImage(message) ? 
                <Image src={message.image} className="message__image" style={{ width: '65%' }} /> :
                <Comment.Text className="messageContentFont">
                    <Linkify properties={{ target: '_blank', style: { color: 'blue' } }}>
                    {message.content}
                    </Linkify>
                </Comment.Text>
            }
            </div>
        </Comment.Content>
        </div>
    </Comment>
);
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps, { setCurrentChannel, setPrivateChannel, setExplorePage })(Message);