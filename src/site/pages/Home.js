import React, {useEffect, useState} from "react";
import { useSelector} from 'react-redux';
import {useLocation} from 'react-router';
import {TabContent, TabPane} from 'reactstrap';
import MapProvider from '../../common/contexts/MapContext/MapProvider';
import HomeLayout from '../layouts/HomeLayout';

import Showcase from './newHome/Showcase';
import Splash from './newHome/Splash';

// const Users = React.lazy(() => import('../../admin/views/users/Users'));
// const Properties = React.lazy(() => import('../../admin/views/properties/Properties'));





const Home = () => {
    const {pathname: location} = useLocation();


    const [activeTab, setActiveTab] = useState('');
    const [timeoutHandle, setTimeoutHandle] = useState(null);

    useEffect(() => {
        if (location === '/') {
            setActiveTab(location);
            const handle = setTimeout(() => {
                setActiveTab('_showcase');
            }, 1500);

            setTimeoutHandle(handle);
        } else {
            clearTimeout(timeoutHandle);
            setTimeoutHandle(null);
            setActiveTab(location);
        }
    }, [location]); // eslint-disable-line react-hooks/exhaustive-deps
    //check login
    const user = useSelector((state) => state.auth.user);
    if(user === null || user === undefined){
        // window.location.href = '/login';
        // return;
    }
    return (
        <HomeLayout>
            <TabContent activeTab={activeTab} className="home-tab-content">
                <TabPane tabId="_showcase" className="">
                    <MapProvider>
                        {activeTab === '_showcase' && <Showcase />}
                    </MapProvider>
                </TabPane>

                <TabPane tabId="/" className="">
                    <Splash />
                </TabPane>

                {/* <TabPane tabId="/admin/users" className="">
                    <Users />
                </TabPane>
                <TabPane tabId="/admin/properties" className="">
                    <Properties />
                </TabPane> */}


            </TabContent>
        </HomeLayout>
    );
};

export default Home;
