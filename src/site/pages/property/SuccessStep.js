import React from 'react';
import {useDispatch} from 'react-redux';
import {Button, Form} from 'reactstrap';
import {toggleVerificationModal} from '../../../redux/actionCreators/appActionCreators';
import {resetRegistrationForm} from '../../../redux/actionCreators/registrationActionCreators';
import {useHistory} from 'react-router';
const SuccessStep = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <>
            <Form>
                <div className={'success mt-5 mb-3'}>
                    Registration Successful!
                </div>
                <Button
                    block
                    color={'success'}
                    onClick={() => {
                        
                        if (window.ReactNativeWebView)
                        //if(1===1)
                        {
                            //To Fix app no active window
                            setTimeout(
                            history.push(
                                `/mobile-verify`,
                            ),1000);
                        }else{
                            dispatch(resetRegistrationForm());
                            dispatch(toggleVerificationModal());
                        }
                    }}>
                    Verify your account
                </Button>
            </Form>
        </>
    );
};

export default SuccessStep;
