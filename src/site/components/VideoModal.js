import React from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import ReactPlayer from 'react-player';

const VideoModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={'video-modal-container'}>
            <ModalHeader toggle={props.onHide}></ModalHeader>
            <ModalBody className={'video-container'}>
                <ReactPlayer url={'https://youtu.be/Cp4CSOacwDw'} />
            </ModalBody>
        </Modal>
    );
};

export default VideoModal;
