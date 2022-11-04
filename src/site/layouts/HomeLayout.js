import React from 'react';
import AccountVerification from '../pages/AccountVerification';
import Footer from '../pages/newHome/Footer';
import Header from '../pages/newHome/Header';

const HomeLayout = ({children}) => {
    return (
        <main>
            <Header />
            <div className="content">{children}</div>
            <Footer />
            <AccountVerification />
        </main>
    );
};

export default HomeLayout;
