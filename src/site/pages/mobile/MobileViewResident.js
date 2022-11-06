import React, {useEffect} from 'react';
import MapProvider from '../../../common/contexts/MapContext/MapProvider';
// import EditProperty from '../profile/EditProperty';
import ViewInmate from '../profile/ViewInmate';

const MobileViewResident = (props) => {
    useEffect(() => {
        try {
            document.querySelector('body').style.marginTop = 0;
            document.querySelector('#root').style.height = '100%';
            document.querySelector('.content').style.height = '100%';
        } catch (e) {}
    });

    return (
        <div className="content">
            <ViewInmate {...props} />
        </div>
    );
};

export default MobileViewResident;
