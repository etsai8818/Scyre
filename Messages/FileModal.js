import React from 'react';
import mime from 'mime-types';
import { Modal } from 'semantic-ui-react';
import '../App.css';

class FileModal extends React.Component {
    state = {
        file: null,
        authorized: ['image/jpeg', 'image/png']
    }

    addFile = event => {
        const file = event.target.files[0];
        if (file) {
            this.setState({ file });
        }
    };

    sendFile = () => {
        const { file } = this.state;
        const { uploadFile, closeModal } = this.props;

        if (file !== null) {
            if (this.isAuthorized(file.name)) {
                const metadata = { contentType: mime.lookup(file.name) };
                uploadFile(file, metadata);
                closeModal();
                this.clearFile();
            }
        }
    }

    isAuthorized = filename => this.state.authorized.includes(mime.lookup(filename));

    clearFile = () => this.setState({ file: null });

    render() {
        const { modal, closeModal } = this.props;

        return (
            <Modal basic open={modal} onClose={closeModal}>
                <Modal.Header>Select an Image File</Modal.Header>
                <Modal.Content className="modalContent">
                    <label 
                        style={{
                            fontFamily: 'proxima-nova, sans-serif',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            fontSize: '13.5px',
                            color: '#F0F0F0'
                        }}
                        className="modalLabel fileUploadLabel"
                        >File types: JPG, PNG
                    </label>
                    <input
                        onChange={this.addFile}
                        name="file"
                        type="file"
                        style={{
                            fontFamily: 'proxima-nova, sans-serif',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            opacity: '1',
                            color: '#4c4c4c',
                            paddingTop: '6px'
                        }}
                        className="modalInput fileUploadInput"
                    />
                </Modal.Content>
                <Modal.Actions>
                    <button
                        onClick={this.sendFile}
                        className="addButton" 
                        style={{
                            fontFamily: 'proxima-nova, sans-serif',
                            fontWeight: 600,
                            fontStyle: 'normal'
                        }}
                    >Send</button>

                    <button
                        className="cancelButton" 
                        style={{
                            fontFamily: 'proxima-nova, sans-serif',
                            fontWeight: 600,
                            fontStyle: 'normal'
                        }}
                        onClick={closeModal}
                    >Cancel</button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default FileModal;