import React, {useEffect} from 'react';
import MapProvider from '../../../common/contexts/MapContext/MapProvider';
import TermsOfUse from '../newHome/TermsOfUse';

const MobileTermsOfUse = () => {
    useEffect(() => {
        try {
            document.querySelector('body').style.marginTop = 0;
            document.querySelector('#root').style.height = '100%';
            document.querySelector('.content').style.height = '100%';
        } catch (e) {}
    });

    return (
        <div className="content">
            <MapProvider>
                <TermsOfUse />
            </MapProvider>
        </div>
    );
};

export default MobileTermsOfUse;
