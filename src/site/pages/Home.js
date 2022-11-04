import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import {TabContent, TabPane} from 'reactstrap';
import MapProvider from '../../common/contexts/MapContext/MapProvider';
import HomeLayout from '../layouts/HomeLayout';
import AboutUs from './newHome/AboutUs';
import ContactUs from './newHome/ContactUs';
import HowItWorks from './newHome/HowItWorks';
import NewsRelease from './newHome/NewsRelease';
import OurPromise from './newHome/OurPromise';
import OurStory from './newHome/OurStory';
import OurVideo from './newHome/OurVideo';
import Patents from './newHome/Patents';
import PrivacyPolicy from './newHome/PrivacyPolicy';
import Showcase from './newHome/Showcase';
import Splash from './newHome/Splash';
import TermsOfUse from './newHome/TermsOfUse';
import AppLanding from './newHome/AppLanding';

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

                <TabPane tabId="/about-us" className="">
                    <AboutUs />
                </TabPane>
                <TabPane tabId="/how-it-works" className="">
                    <HowItWorks />
                </TabPane>
                <TabPane tabId="/patents" className="">
                    <Patents />
                </TabPane>
                <TabPane tabId="/contact-us" className="">
                    <ContactUs />
                </TabPane>
                <TabPane tabId="/app-introduction" className="">
                    <AppLanding />
                </TabPane>
                <TabPane tabId="/our-story" className="">
                    <OurStory />
                </TabPane>
                <TabPane tabId="/our-promise" className="">
                    <OurPromise />
                </TabPane>
                <TabPane tabId="/news-release" className="">
                    <NewsRelease />
                </TabPane>
                <TabPane tabId="/our-video" className="">
                    <OurVideo />
                </TabPane>
                <TabPane tabId="/privacy-policy" className="">
                    <PrivacyPolicy />
                </TabPane>
                <TabPane tabId="/terms-of-use" className="">
                    <TermsOfUse />
                </TabPane>
            </TabContent>
        </HomeLayout>
    );
};

export default Home;
