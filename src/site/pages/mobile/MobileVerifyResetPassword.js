import React, {useEffect} from 'react';
import VerifyResetPassword from '../newHome/VerifyResetPassword';
import { isAppEmbedWebview } from '../../../utils/utils';
const MobileVerifyResetPassword = (props) => {
    useEffect(() => {
        try {
            document.querySelector('body').style.marginTop = isAppEmbedWebview()? 10:0;
            document.querySelector('#root').style.height = '100%';
            document.querySelector('.content').style.height = '100%';
        } catch (e) {}
    });

    return (
        <div className="content">
            <VerifyResetPassword {...props} />
        </div>
    );
};

export default MobileVerifyResetPassword;
