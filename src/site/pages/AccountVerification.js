import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Modal, ModalBody, Row } from 'reactstrap';
import { toggleVerificationModal } from '../../redux/actionCreators/appActionCreators';
import EmailVerification from './accountVerification/EmailVerification';
import MobileVerification from './accountVerification/MobileVerification';

const AccountVerification = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const showVerificationModal = useSelector(
        (state) => state.app.showVerificationModal,
    );

    const registrationUser = useSelector((state) => state.registerForm.user);
    const user = useSelector((state) => state.auth.me);

    if (registrationUser) return null;
    if (!user) return null;

    const userHasEmail = user.username !== user.email;

    const userVerified =
        (userHasEmail && user.emailVerified && user.mobileVerified) ||
        (!userHasEmail && user.mobileVerified);

    if (!showVerificationModal) return null;

    return (
        <Modal
            size="lg"
            isOpen={true}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <ModalBody>
                {!userVerified && (
                    <div className="pb-3">
                        Please verify your email and mobile phone to start using
                        website.
                    </div>
                )}
                <EmailVerification />
                <MobileVerification />
                {userVerified && (
                    <>
                        <div className={'success mt-5 mb-3'}>
                            Verification Successful!
                        </div>
                        <Button
                            block
                            color={'success'}
                            onClick={() => {
                                try {
                                    window.ReactNativeWebView.postMessage(
                                        JSON.stringify({ action: 'goBack' }),
                                    );
                                } catch (e) { }

                                dispatch(toggleVerificationModal());
                                setTimeout(function () {
                                    location.reload(true);
                                }, 500)
                            }}>
                            Start Using Website
                        </Button>
                    </>
                )}

                {!userVerified && (
                    <Row noGutters className="justify-content-end">
                        <Button
                            color={'link'}
                            size={'sm'}
                            onClick={() => {
                                history.push('/logout');
                            }}>
                            Logout
                        </Button>
                    </Row>
                )}
            </ModalBody>
        </Modal>
    );
};

export default AccountVerification;
