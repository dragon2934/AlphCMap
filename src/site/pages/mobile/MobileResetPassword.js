import React, {useEffect} from 'react';
import ResetPassword from '../newHome/ResetPassword';
import { isAppEmbedWebview } from '../../../utils/utils';
const MobileResetPassword = () => {
    useEffect(() => {
        try {
            document.querySelector('body').style.marginTop = isAppEmbedWebview()? 10:0 ;
            document.querySelector('#root').style.height = '100%';
            document.querySelector('.content').style.height = '100%';
        } catch (e) {}
    });

    return (
        <div className="content">
            <ResetPassword />
        </div>
    );
};

export default MobileResetPassword;
