import React, {useEffect} from 'react';

const MobileSuccessful = () => {
    useEffect(() => {
        try {
            document.querySelector('body').style.marginTop = 0;
            document.querySelector('#root').style.height = '100%';
            document.querySelector('.content').style.height = '100%';
        } catch (e) {}
    });

    return (
        <div className="content">
            DONE
        </div>
    );
};

export default MobileSuccessful;
