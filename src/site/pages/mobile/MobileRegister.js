import React, {useEffect} from 'react';
import MapProvider from '../../../common/contexts/MapContext/MapProvider';
import AccountVerification from '../AccountVerification';
import Showcase from '../newHome/Showcase';

const MobileRegister = () => {
    useEffect(() => {
        try {
            document.querySelector('body').style.marginTop = 0;
            document.querySelector('#root').style.height = '100%';
            document.querySelector('.content').style.height = '100%';
            document.querySelector(
                '.showcase-map-top-actions-mobile',
            ).style.top = '44px';
        } catch (e) {}
    });

    return (
        <div className="content">
            <MapProvider>
                <Showcase />
                <AccountVerification />
            </MapProvider>
        </div>
    );
};

export default MobileRegister;
