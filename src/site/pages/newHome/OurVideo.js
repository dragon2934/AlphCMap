import React, {useCallback, useEffect, useState} from 'react';
import ReactPlayer from 'react-player';
import {useHistory, useLocation} from 'react-router';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';

const OurVideo = () => {
    const {pathname: location} = useLocation();
    const history = useHistory();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (location === '/our-video') setIsOpen(true);

        return () => setIsOpen(false);
    }, [location]);

    const toggle = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={true}
            onClosed={() => history.push('/')}
            className={'video-modal-container'}>
            <ModalHeader toggle={toggle} />
            <ModalBody className={'video-container'}>
                <ReactPlayer
                    width={'100%'}
                    height={'80vh'}
                    url={'https://youtu.be/Cp4CSOacwDw'}
                />
            </ModalBody>
        </Modal>
    );
};

export default OurVideo;
