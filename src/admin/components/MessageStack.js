import {CButton, CTextarea} from '@coreui/react';
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from 'react-redux';
import {
    closeMessageStack,
    getUserAlertMessages,
    sendMessage,
    setUserAlertMessagesRead,
    toggleMaximizeMessageStack,
    toggleMinimizeMessageStack,
} from '../../redux/actionCreators/messagingActionCreators';

const MessageStack = ({messagingData, userAlertId}) => {
    const messagesContainerRef = useRef(null);
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');

    // With interval
    useEffect(() => {
        const fetchMessages = () => {
            dispatch(getUserAlertMessages(userAlertId)).then(() => {
                dispatch(setUserAlertMessagesRead(userAlertId));
            });
        };

        const handle = setInterval(fetchMessages, 10000);

        return () => {
            clearInterval(handle);
        };
    }, [dispatch, userAlertId]);

    // On mount
    useEffect(() => {
        dispatch(getUserAlertMessages(userAlertId)).then(() => {
            if (messagesContainerRef.current) {
                messagesContainerRef.current.scrollTop =
                    messagesContainerRef.current.scrollHeight;
            }
        });
    }, [dispatch, userAlertId]);

    const onClickSendMessage = useCallback(() => {
        dispatch(sendMessage(userAlertId, message));
        setMessage('');

        setTimeout(() => {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }, 30);
    }, [dispatch, message, userAlertId]);

    if (!messagingData) return null;

    const {minimized, maximized, user} = messagingData;

    const classNames = ['message-stack'];

    if (minimized) classNames.push('message-stack-minimized');
    if (maximized) classNames.push('message-stack-full');

    return (
        <div className={classNames.join(' ')}>
            <div
                className={'message-stack-header'}
                onClick={(e) => {
                    e.stopPropagation();
                    maximized
                        ? dispatch(toggleMaximizeMessageStack(userAlertId))
                        : dispatch(toggleMinimizeMessageStack(userAlertId));
                }}>
                <div title={`${user.email}`}>
                    {user.firstName} {user.lastName}
                </div>
                <CButton
                    className="btn-pill btn-no-focus"
                    size={'sm'}
                    alt={'Minimize'}
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(toggleMinimizeMessageStack(userAlertId));
                    }}>
                    <i className="fa fa-window-minimize" />
                </CButton>
                <CButton
                    className="btn-pill btn-no-focus"
                    size={'sm'}
                    alt={'Maximize'}
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(toggleMaximizeMessageStack(userAlertId));
                    }}>
                    <i className="fa fa-window-maximize" />
                </CButton>
                <CButton
                    className="btn-pill btn-no-focus"
                    size={'sm'}
                    alt={'Close'}
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(closeMessageStack(userAlertId));
                    }}>
                    <i className="fa fa-close" />
                </CButton>
            </div>
            {!minimized && (
                <>
                    <div
                        className={'message-stack-container'}
                        ref={messagesContainerRef}>
                        {messagingData.messages.map((message) => {
                            return (
                                <div
                                    style={{
                                        opacity: message.temporary ? 0.3 : 1,
                                    }}
                                    className={
                                        message.to ? 'outgoing' : 'incoming'
                                    }>
                                    {message.text}
                                </div>
                            );
                        })}
                    </div>
                    <div className="message-stack-send-container">
                        <CTextarea
                            name="textarea-input"
                            id="textarea-input"
                            rows="2"
                            value={message}
                            onChange={(e) => {
                                setMessage(e.currentTarget.value);
                            }}
                            placeholder="Write your message..."
                        />
                        <CButton
                            className="btn-pill btn-no-focus"
                            size={'sm'}
                            alt={'Send'}
                            onClick={onClickSendMessage}>
                            <i className="fa fa-send" />
                        </CButton>
                    </div>
                </>
            )}
        </div>
    );
};

export default MessageStack;
