import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Collapse,
    FormFeedback,
    Input,
    InputGroup,
    Label,
    Row,
    Spinner,
} from 'reactstrap';
import { resendMobileVerificationCode } from '../../../redux/actionCreators/appActionCreators';
import { verifyAccount } from '../../../redux/actionCreators/registrationActionCreators';

const MobileVerification = ({ currentUser }) => {
    const [error, setError] = useState(null);
    const [verificationCode, setVerificationCode] = useState();
    const [remainingTime, setRemainingTime] = useState(0);

    const [resendVisible, setResendVisible] = useState(false);
    const [pendingResend, setPendingResend] = useState(false);
    const [pendingVerify, setPendingVerify] = useState(false);

    const dispatch = useDispatch();

    let user = useSelector((state) => state.auth.user);
    const registrationUser = useSelector((state) => state.registerForm.user);
    if (currentUser === null || currentUser === undefined) {
        if (user === null || user === undefined) {
            user = registrationUser;
        }
    } else {
        user = currentUser;
    }

    const onClickVerify = useCallback(() => {
        setPendingVerify(true);
        dispatch(
            verifyAccount({
                userId: user.id,
                mobileVerificationCode: verificationCode,
            }),
        )
            .then(({ value: { user } }) => {
                if (!user.mobileVerified) setError('Invalid Verification Code');
                else {
                    setError(null);
                    console.log('mobile verfied...' + JSON.stringify(user));
                    if (currentUser != null || currentUser != undefined) {
                        window.location.reload();
                    }
                }
            })
            .finally(() => {
                setPendingVerify(false);
            });
    }, [dispatch, verificationCode, user]);

    const onClickResendVerificationCode = useCallback(() => {
        setPendingResend(true);

        dispatch(resendMobileVerificationCode()).finally(() => {
            setPendingResend(false);
        });
    }, [dispatch]);

    useEffect(() => {
        const calculateRemainingTime = () => {
            if (!user) return;

            const lastTimeAvail = moment(
                moment(user.lastMobileVerificationTime)
                    .add(10, 'minutes')
                    .format(),
            );
            const now = moment(moment().format());

            const diff = moment.duration(lastTimeAvail.diff(now)).asSeconds();

            if (diff < 0 || Number.isNaN(diff)) {
                clearInterval(handle);
                setRemainingTime(0);
            } else {
                setRemainingTime(diff);
            }
        };

        const handle = setInterval(calculateRemainingTime, 1000);

        return () => {
            clearInterval(handle);
        };
    }, [user]);

    if (user.mobileVerified)
        return (
            <div className="mb-4 d-flex flex-row align-items-center">
                <i className="fa fa-3x fa-check text-success" /> Mobile Number
                Verified
            </div>
        );

    return (
        <div className="mb-4">
            <Label for="verificationCode">Mobile Verification</Label>

            <InputGroup className="mb-3">
                <Input
                    type="text"
                    size={'lg'}
                    name="verificationCode"
                    invalid={!!error}
                    placeholder="Enter verification code sent to your mobile..."
                    onChange={(e) => setVerificationCode(e.currentTarget.value)}
                />
                <FormFeedback>{error}</FormFeedback>
            </InputGroup>

            <Row noGutters className="mt-2 mb-2 justify-content-end">
                <Button
                    className="btn-no-focus"
                    color={'link'}
                    tag={'a'}
                    onClick={() => setResendVisible(!resendVisible)}>
                    Did not Receive SMS
                </Button>

                <Button
                    className="btn-no-focus"
                    onClick={onClickVerify}
                    color={pendingVerify ? 'link' : 'primary'}>
                    {pendingVerify ? <Spinner size="sm" /> : 'Verify Mobile'}
                </Button>
            </Row>

            <Collapse isOpen={resendVisible}>
                <Row noGutters className="justify-content-end">
                    <Button
                        className="btn-no-focus"
                        size={'lg'}
                        disabled={remainingTime !== 0}
                        color={
                            pendingResend
                                ? 'link'
                                : remainingTime !== 0
                                    ? 'danger'
                                    : 'success'
                        }
                        onClick={onClickResendVerificationCode}>
                        {pendingResend ? (
                            <Spinner size="sm" />
                        ) : (
                            <>
                                Resend Verification Code{' '}
                                {remainingTime !== 0 && (
                                    <>
                                        {moment()
                                            .startOf('day')
                                            .seconds(remainingTime)
                                            .format('mm:ss')}
                                    </>
                                )}
                            </>
                        )}
                    </Button>
                </Row>
            </Collapse>
        </div>
    );
};

export default MobileVerification;
