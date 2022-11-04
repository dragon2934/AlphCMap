import React from 'react';
import {useSelector} from 'react-redux';
import MessageStack from './MessageStack';

const Messaging = () => {
    const messageStacks = useSelector((state) => state.messaging);

    return (
        <div className={'messaging'}>
            {Object.keys(messageStacks).map((userAlertId) => {
                const messagingData = messageStacks[userAlertId];

                return (
                    <MessageStack
                        key={userAlertId}
                        messagingData={messagingData}
                        userAlertId={userAlertId}
                    />
                );
            })}
        </div>
    );
};

export default Messaging;
