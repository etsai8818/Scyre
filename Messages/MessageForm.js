import React from 'react';
import uuidv4 from 'uuid/v4';
import firebase from '../../firebase';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Picker, emojiIndex } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

import FileModal from './FileModal';
import ProgressBar from './ProgressBar';

import '../App.css';

class MessagesForm extends React.Component {
    state = {
        storageRef: firebase.storage().ref(),
        typingRef: firebase.database().ref('typing'),
        uploadTask: null,
        uploadState: '',
        percentUploaded: 0,
        message: '',
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        loading: false,
        errors: [],
        modal: false,
        emojiPicker: false
    };

    componentWillUnmount() {
        if (this.state.uploadTask !== null) {
            this.state.uploadTask.cancel();
            this.setState({ uploadTask: null });
        }
    }

    openModal = () => this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleKeyDown = () => {
        const { message, typingRef, channel, user } = this.state;

        if (message) {
            typingRef
                .child(channel.id)
                .child(user.uid)
                .set(user.displayName);
        } else {
            typingRef
                .child(channel.id)
                .child(user.uid)
                .remove();
        }
    };

    handleTogglePicker = () => {
        this.setState({ emojiPicker: !this.state.emojiPicker });
    };

    handleAddEmoji = emoji => {
        const oldMessage = this.state.message;
        const newMessage = this.colonToUnicode(` ${oldMessage} ${emoji.colons} `);
        this.setState({ message: newMessage, emojiPicker: false });
        setTimeout(() => this.messageInputRef.focus(), 0);
    }

    colonToUnicode = message => {
        return message.replace(/:[A-Za-z0-9_+-]+:/g, x => {
            x = x.replace(/:/g, "");
            let emoji = emojiIndex.emojis[x];
            if (typeof emoji !== "undefined") {
                let unicode = emoji.native;
                if (typeof unicode !== "undefined") {
                    return unicode;
                }
            }
            x = ":" + x + ":";
            return x;
        });
    };

    createMessage = (fileUrl = null) => {
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL
            },
        };
        if(fileUrl !== null) {
            message['image'] = fileUrl;
        } else {
            message['content'] = this.state.message;
        }
        return message;
    }

    sendMessage = () => {
        const { getMessagesRef } = this.props;
        const { message, channel, user, typingRef } = this.state;

        if (message) {
           this.setState({ loading: true });
           getMessagesRef()
            .child(channel.id)
            .push()
            .set(this.createMessage())
            .then(() => {
                this.setState({ loading: false, message: '', errors: [] });
                typingRef
                .child(channel.id)
                .child(user.uid)
                .remove();
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    loading: false,
                    errors: this.state.errors.concat(err)
                })
            })
        } else {
            this.setState({
                errors: this.state.errors.concat({ message: 'Add a message' })
            })
        }
    }

    enterPressed(event) {
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            //Do stuff in here
            this.sendMessage();
        } 
    };

    getPath = () => {
        if (this.props.isPrivateChannel) {
            return `chat/private/${this.state.channel.id}`;
        } else {
            return `chat/public`;
        }
    }

    uploadFile = (file, metadata) => {
        const pathToUpload = this.state.channel.id;
        const ref = this.props.getMessagesRef();
        const filePath = `${this.getPath()}/${uuidv4()}.jpg`;

        this.setState({
            uploadState: 'uploading',
            uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
        },
            () => {
                this.state.uploadTask.on('state_changed', snap => {
                    const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                    this.setState({ percentUploaded });
                },
                    err => {
                        console.error(err);
                        this.setState({
                            errors: this.state.errors.concat(err),
                            uploadState: 'error',
                            uploadTask: null
                        })
                    },
                    () => {
                        this.state.uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
                            this.sendFileMessage(downloadUrl, ref, pathToUpload);
                        })
                        .catch(err => {
                            console.error(err);
                            this.setState({
                                errors: this.state.errors.concat(err),
                                uploadState: 'error',
                                uploadTask: null
                            })
                        })
                    }
                )
            }
        )
    };

    sendFileMessage = (fileUrl, ref, pathToUpload) => {
        ref.child(pathToUpload)
            .push()
            .set(this.createMessage(fileUrl))
            .then(() => {
                this.setState({ uploadState: 'done' })
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    errors: this.state.errors.concat(err)
                })
            })
    }

    render() {
        // prettier-ignore
        const { errors, message, modal, uploadState, percentUploaded, emojiPicker } = this.state;

        return (
            <div  className="messformcont" style={{ display: 'block' }}>
            <div className="message__form" style={{ borderRadius: '4px', display: 'flex', alignItems: 'center'}}>
                {emojiPicker && (
                    <Picker
                        set="apple"
                        onSelect={this.handleAddEmoji}
                        className="emojiPicker"
                        title="Pick an emoji"
                        emoji="point_up"
                        style={{
                            position: "absolute",
                            background: "#fff",
                            zIndex: "1000",
                            marginTop: "-243px",
                            marginLeft: "-11px"
                        }}
                    />
                )}
                <Button
                        onClick={this.handleTogglePicker}
                        className="addButtonMessage"
                        icon={emojiPicker ? "close" : "add"}
                        style={{ 
                            border: '1px solid  #bcbcbc', 
                            borderRadius: '50px', 
                            backgroundColor: '#fff',
                            color: '#bcbcbc',
                        }}
                    />
                <input
                    autoComplete="off"
                    name="message"
                    placeholder="Message channel"
                    id="messageInput"
                    className={
                        errors.some(error => error.message.includes('message')) ? 'error' : ''
                    }
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    onKeyPress={this.enterPressed.bind(this)}
                    value={message}
                    ref={node => (this.messageInputRef = node)}
                    style={{
                        fontFamily: 'proxima-nova, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '14px',
                        borderRadius: '50px',
                    }}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/*<Button
                        onClick={this.sendMessage}
                        disabled={loading}
                        id="replyButton"
                        icon="edit"
                        style={{ 
                            border: '1px solid  #bcbcbc', 
                            borderRadius: '30px', 
                            backgroundColor: '#fff',
                            color: '#bcbcbc'
                        }}
                    />*/}

                    <Button
                        className="uploadButton"
                        disabled={uploadState === "uploading"}
                        onClick={this.openModal}
                        icon="cloud upload"
                        style={{ 
                            border: '1px solid  #bcbcbc', 
                            borderRadius: '100px', 
                            backgroundColor: '#fff',
                            color: '#bcbcbc'
                        }}
                    />
                </div>
                </div>
                <FileModal 
                        modal={modal}
                        closeModal={this.closeModal}
                        uploadFile={this.uploadFile}
                    />
                <ProgressBar 
                    uploadState={uploadState}
                    percentUploaded={percentUploaded}
                />
            
            </div>
        );
    }
}
  
const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    isPrivateChannel: state.channel.isPrivateChannel
});

export default connect(mapStateToProps)(MessagesForm);