import React, {useEffect} from 'react';
import MapProvider from '../../../common/contexts/MapContext/MapProvider';
// import EditProperty from '../profile/EditProperty';
import EditUserProperty from '../profile/EditUserProperty';

const MobileEditUserProperty = (props) => {
    useEffect(() => {
        try {
            document.querySelector('body').style.marginTop = 0;
            document.querySelector('#root').style.height = '100%';
            document.querySelector('.content').style.height = '100%';
        } catch (e) {}
    });

    return (
        <div className="content">
            <EditUserProperty {...props} />
        </div>
    );
};

export default MobileEditUserProperty;
