import React, {useEffect} from 'react';
import MapProvider from '../../../common/contexts/MapContext/MapProvider';
// import EditProperty from '../profile/EditProperty';
import EditInmate from '../profile/EditInmate';

const MobileResident = (props) => {
    useEffect(() => {
        try {
            document.querySelector('body').style.marginTop = 0;
            document.querySelector('#root').style.height = '100%';
            document.querySelector('.content').style.height = '100%';
        } catch (e) {}
    });

    return (
        <div className="content">
            <EditInmate {...props} />
        </div>
    );
};

export default MobileResident;
