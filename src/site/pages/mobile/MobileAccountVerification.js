import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {Button, Modal, ModalBody, Row} from 'reactstrap';
import {toggleVerificationModal} from '../../../redux/actionCreators/appActionCreators';
import EmailVerification from '../accountVerification/EmailVerification';
import MobileVerification from '../accountVerification/MobileVerification';
import {resetRegistrationForm} from '../../../redux/actionCreators/registrationActionCreators';

const MobileAccountVerification = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            document.querySelector('body').style.marginTop = 0;
            document.querySelector('#root').style.height = '100%';
            document.querySelector('.content').style.height = '100%';
        } catch (e) {}
    });

    // const showVerificationModal = useSelector(
    //     (state) => state.app.showVerificationModal,
    // );

    const registrationUser = useSelector((state) => state.registerForm.user);
    // console.log('registrationUser=' + JSON.stringify(registrationUser));
    let user = useSelector((state) => state.auth.user);

    // if (registrationUser) return (
    //     <div className="content ml-1 mr-1 mt-5 mb-3">
    //     <label >Registration user is null</label>
    //     </div>
    //    );
    // if (!user) return  (
    //     <div className="content ml-1 mr-1 mt-5 mb-3">
    //     <label >User is null</label>
    //     </div>
    // );
    if( user === null || user === undefined){
        user = registrationUser;
    }

    const userHasEmail = user.email!=null && user.email!=undefined && user.email.length >4 && user.username !== user.email;

    const userVerified =
        (userHasEmail && user.emailVerified && user.mobileVerified) ||
        (!userHasEmail && user.mobileVerified);

    // if (!showVerificationModal) return null;

    if(!userVerified){ 
        return  (
        <div className="content ml-1 mr-1 mt-5 mb-3">
              
                <EmailVerification />
                <MobileVerification />                
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
                
        </div>
       );
    }else{
        return (
            <>
             <div className="content ml-1 mr-1 mt-5 mb-3">
                <div className={'success mt-5 mb-3'}>
                    Verification Successful!
                </div>
                <Button
                    block
                    color={'success'}
                    onClick={() => {
                        try {
                            if (window.ReactNativeWebView){
                                dispatch(resetRegistrationForm());
                                window.ReactNativeWebView.postMessage(
                                    JSON.stringify({action: 'goBack'}),
                                );
                            }
                        } catch (e) {

                        }
                        dispatch(resetRegistrationForm());
                        setTimeout( () => {
                            history.push("/");
                        },500);
                        
                        
                    }}>
                    Start Using Website
                </Button>
                </div>
            </>
        );

    };
};

export default MobileAccountVerification;
