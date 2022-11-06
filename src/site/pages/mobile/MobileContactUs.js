import React, {useEffect} from 'react';
import MapProvider from '../../../common/contexts/MapContext/MapProvider';
import ContactUs from '../newHome/ContactUs';

const MobileContactUs = () => {
    useEffect(() => {
        try {
            document.querySelector('body').style.marginTop = 0;
            document.querySelector('#root').style.height = '100%';
            document.querySelector('.content').style.height = '100%';

            const styleFix = document.head.appendChild(
                document.createElement('style'),
            );

            styleFix.innerHTML = `
            .contact-us:before {
                top: 0; 
                visible: false;
                background: unset;
            }
            `;
        } catch (e) {
            console.log('e: ', e);
        }
    });

    return (
        <div className="content">
            <MapProvider>
                <ContactUs />
            </MapProvider>
        </div>
    );
};

export default MobileContactUs;
